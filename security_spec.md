# Security Specification & Threat Model for ST Trading

This document details the Security Invariants, threat model, and validation tests for the Firestore database of ST Trading.

## 1. Data Invariants

1. **Inquiry Ownership**: An inquiry can be submitted by anyone (guests or authenticated users). If created by an authenticated user, `userId` must match `request.auth.uid`.
2. **Read Restrictiveness**: Inquiries can only be read by the owner of the inquiry (`resource.data.userId == request.auth.uid`) or by an administrator. Guest/Anonymous inquiries (which don't have a `userId`) can only be read by an administrator.
3. **Immutability of Key Fields**: Once an inquiry is submitted, fields like `companyName`, `name`, `email`, `productName`, `message`, `createdAt`, and `userId` are immutable. They cannot be altered by anyone (including the user or admin), maintaining audit trails.
4. **Status Lifecycle Transitions**: Only administrators can modify `status` and `adminResponse`.
5. **No Self-Appointed Admins**: The `/admins` collection can only be modified by existing administrators. Users cannot write to `/admins/{auth.uid}` to grant themselves permissions.

---

## 2. The "Dirty Dozen" Payloads

Here are 12 specific payloads designed to violate the security laws of the application:

1. **Self-Appointed Admin Payload** (Identity Escalation)
   - *Target*: `create /admins/attacker_uid`
   - *Payload*: `{ "email": "attacker@hacker.com" }` by an unauthenticated or non-admin user.
   - *Result*: `PERMISSION_DENIED`

2. **Inquiry Impersonation Payload** (Identity Spoofing)
   - *Target*: `create /inquiries/inq_1`
   - *Payload*: `{ "companyName": "Fake Corp", "name": "Fake Name", "email": "fake@gmail.com", "productName": "Dye", "message": "Hi", "status": "pending", "createdAt": "2026-07-08T19:00:00Z", "userId": "victim_uid" }` by `attacker_uid`.
   - *Result*: `PERMISSION_DENIED` (userId doesn't match request.auth.uid).

3. **Status Hijack on Create** (State Injection)
   - *Target*: `create /inquiries/inq_2`
   - *Payload*: `{ "companyName": "Fake Corp", "name": "Fake Name", "email": "fake@gmail.com", "productName": "Dye", "message": "Hi", "status": "completed", "createdAt": "2026-07-08T19:00:00Z", "userId": "attacker_uid" }` by `attacker_uid`.
   - *Result*: `PERMISSION_DENIED` (Guests/new inquiries must default to "pending").

4. **Response Injection on Create** (State Injection)
   - *Target*: `create /inquiries/inq_3`
   - *Payload*: `{ "companyName": "Fake Corp", "name": "Fake Name", "email": "fake@gmail.com", "productName": "Dye", "message": "Hi", "status": "pending", "createdAt": "2026-07-08T19:00:00Z", "userId": "attacker_uid", "adminResponse": "Auto-approved!" }` by `attacker_uid`.
   - *Result*: `PERMISSION_DENIED` (adminResponse cannot be set on creation by non-admin).

5. **Inquiry Mutability - Altering Email** (Integrity Violation)
   - *Target*: `update /inquiries/inq_submitted`
   - *Payload*: Changing `"email"` to `"hacker@hacker.com"`.
   - *Result*: `PERMISSION_DENIED` (Only admin status and adminResponse are mutable).

6. **Inquiry Mutability - Altering Message** (Integrity Violation)
   - *Target*: `update /inquiries/inq_submitted`
   - *Payload*: Changing `"message"` to `"Malicious message contents"`.
   - *Result*: `PERMISSION_DENIED` (Only admin status and adminResponse are mutable).

7. **Admin Privilege Spoofing - Direct Edit** (Identity Escalation)
   - *Target*: `update /admins/some_admin`
   - *Payload*: Altering admin document email.
   - *Result*: `PERMISSION_DENIED`

8. **Read Other User's Inquiry** (PII Exposure)
   - *Target*: `get /inquiries/victim_inquiry`
   - *Payload*: Attempt to read `victim_inquiry` (owned by `victim_uid`) as `attacker_uid`.
   - *Result*: `PERMISSION_DENIED`

9. **Blanket Inquiry Read Request** (PII Exposure)
   - *Target*: `list /inquiries`
   - *Payload*: Querying all inquiries without being an admin.
   - *Result*: `PERMISSION_DENIED`

10. **SQL-Injection / Shell Command in Doc ID** (Resource Exhaustion / ID Poisoning)
    - *Target*: `create /inquiries/inq;DROP TABLE inquiries;`
    - *Payload*: Valid inquiry payload.
    - *Result*: `PERMISSION_DENIED` (via `isValidId` checking regex).

11. **Excessive Field Size Injection** (Denial of Wallet)
    - *Target*: `create /inquiries/inq_4`
    - *Payload*: `{ "companyName": "A".repeat(10000), ... }`
    - *Result*: `PERMISSION_DENIED` (size constraints enforced).

12. **Unauthorized Status Update** (State Transition Violation)
    - *Target*: `update /inquiries/inq_submitted`
    - *Payload*: Altering `status` to `"completed"` as the inquiry owner (`victim_uid`) who is not an admin.
    - *Result*: `PERMISSION_DENIED`.

---

## 3. The Test Runner

A conceptual test runner setup using the Firebase Rules Testing library:

```typescript
import { initializeTestEnvironment, RulesTestEnvironment } from "@firebase/rules-unit-testing";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

let testEnv: RulesTestEnvironment;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "influential-photon-qsjh2",
    firestore: {
      rules: require("fs").readFileSync("firestore.rules", "utf8"),
    },
  });
});

afterAll(async () => {
  await testEnv.cleanup();
});

test("Dirty Dozen #1: Self-Appointed Admin fails", async () => {
  const context = testEnv.authenticatedContext("attacker_uid");
  const db = context.firestore();
  const adminDoc = doc(db, "admins/attacker_uid");
  await expect(setDoc(adminDoc, { email: "attacker@hacker.com" })).rejects.toThrow();
});

test("Dirty Dozen #2: Inquiry Impersonation fails", async () => {
  const context = testEnv.authenticatedContext("attacker_uid");
  const db = context.firestore();
  const inquiryDoc = doc(db, "inquiries/inq_1");
  await expect(setDoc(inquiryDoc, {
    companyName: "Fake Corp",
    name: "Fake Name",
    email: "fake@gmail.com",
    productName: "Dye",
    message: "Hi",
    status: "pending",
    createdAt: "2026-07-08T19:00:00Z",
    userId: "victim_uid"
  })).rejects.toThrow();
});
```
