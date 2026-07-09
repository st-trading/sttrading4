import { Product, HistoryItem, CEOMessage } from "../types";

export const PRODUCTS: Product[] = [
  // 1. DYE / 염료
  {
    id: "dye-01",
    name: "P-Phenylenediamine",
    englishName: "P-PHENYLENEDIAMINE",
    category: "dye",
    description: "염모제에 가장 널리 사용되는 핵심 염료 원료로서 뛰어난 침투력과 지속성 높은 흑갈색 계열 색상 발현을 제공합니다.",
    applications: ["염모제"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.5%",
    casNumber: "106-50-3",
    packing: "25KG"
  },
  {
    id: "dye-02",
    name: "M-Aminophenol",
    englishName: "M-AMINOPHENOL",
    category: "dye",
    description: "염모용 산성 및 알칼리성 제형 내에서 산화 중합을 유도하여 다양한 색조를 부여하는 필수 조색 원료입니다.",
    applications: ["염모제"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.5%",
    casNumber: "591-27-5",
    packing: "25KG"
  },
  {
    id: "dye-03",
    name: "P-Aminophenol",
    englishName: "P-AMINOPHENOL",
    category: "dye",
    description: "우수한 용해성과 산화 안정성을 바탕으로 자연스러운 갈색 및 황색 톤의 색조를 선사하는 고순도 산화 염모 원료입니다.",
    applications: ["염모제"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.5%",
    casNumber: "123-30-8",
    packing: "25KG"
  },
  {
    id: "dye-04",
    name: "Resorcinol",
    englishName: "RESORCINOL",
    category: "dye",
    description: "다양한 유효 성분 및 산화염료와 결합하여 풍부하고 다채로운 컬러 톤을 형성하는 커플러(Coupler) 역할의 핵심 성분입니다.",
    applications: ["염모제"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.5%",
    casNumber: "108-46-3",
    packing: "25KG"
  },
  {
    id: "dye-05",
    name: "P-AMINO-O-CRESOL",
    englishName: "4-Amino-2-Hydroxytoluene",
    category: "dye",
    description: "적갈색 및 붉은색 계열의 생생하고 깊이 있는 색조를 구현하기 위해 필수적으로 사용되는 염모 조색 원료입니다.",
    applications: ["염모제"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.5%",
    casNumber: "2835-95-2",
    packing: "25KG"
  },
  {
    id: "dye-06",
    name: "2.5-DIAMINOTOLUENE SULFATE",
    englishName: "TOLUENE-2,5-DIAMINE SULFATE",
    category: "dye",
    description: "PPD 대체 혹은 혼용 원료로서 안정적이고 자극이 적은 고순도 염모 활성 베이스 성분입니다.",
    applications: ["염모제"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.5%",
    casNumber: "615-50-9",
    packing: "25KG"
  },
  {
    id: "dye-07",
    name: "2,4-DIAMINO PHENOXY ETHANOL DIHYDROCHLORIDE",
    englishName: "2,4-Diaminophenoxyethanol HCL",
    category: "dye",
    description: "선명한 청색 및 흑색 톤 조율에 탁월하며, 균일하고 탁월한 밀착력을 확보해 주는 산화 염료입니다.",
    applications: ["염모제"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.5%",
    casNumber: "66422-95-5",
    packing: "25KG"
  },

  // 2. COLOR / 색소
  {
    id: "color-01",
    name: "ACID ORANGE 7 (ORANGE 205)",
    englishName: "Acid Orange 7 (CI 15510)",
    category: "color",
    description: "선명하고 맑은 오렌지빛 컬러를 내는 산성계 타르 색소로, 일시적 및 반영구 헤어 컬러 제형에서 우수한 침투력과 지속적인 발색력을 보입니다.",
    applications: ["COLORANTS"],
    origin: "중국 (China)",
    casNumber: "633-96-5",
    packing: "1KG"
  },
  {
    id: "color-02",
    name: "ACID BLACK (BLACK 401)",
    englishName: "Acid Black 1 (CI 20470)",
    category: "color",
    description: "짙고 차분한 블랙 및 푸른 빛 색조의 완벽한 밸런스를 조율하는 친수성 산성 색소로서 선명한 톤을 연출합니다.",
    applications: ["COLORANTS"],
    origin: "중국 (China)",
    casNumber: "1064-48-8",
    packing: "1KG"
  },
  {
    id: "color-03",
    name: "HC VIOLET 2",
    englishName: "HC Violet No. 2",
    category: "color",
    description: "반영구 염모제 및 헤어 트리트먼트 제형에 이상적인 직접 염색 색소로서, 모발 깊숙이 조화롭고 따뜻한 보라색 컬러를 발현합니다.",
    applications: ["COLORANTS"],
    origin: "중국 (China)",
    casNumber: "104226-21-3",
    packing: "1KG"
  },
  {
    id: "color-04",
    name: "HC BLUE 2",
    englishName: "HC Blue No. 2",
    category: "color",
    description: "손상을 유발하지 않는 다이렉트 염모 활성 성분으로, 매혹적이고 딥한 블루 및 카키 컬러 구현에 필수로 적용되는 원료입니다.",
    applications: ["COLORANTS"],
    origin: "중국 (China)",
    casNumber: "33229-34-4",
    packing: "1KG"
  },
  {
    id: "color-05",
    name: "ACID RED 18(RED 102)",
    englishName: "Acid Red 18 (CI 16255)",
    category: "color",
    description: "수용성이 우수한 산성 적색 타르 색소로서 높은 발색 안정도를 가지고 있어 선명한 레드 및 웜톤 헤어 조색을 가능하게 합니다.",
    applications: ["COLORANTS"],
    origin: "중국 (China)",
    casNumber: "2611-82-7",
    packing: "1KG"
  },
  {
    id: "color-06",
    name: "ACID VIOLET 43(VIOLET 401)",
    englishName: "Acid Violet 43 (CI 60730)",
    category: "color",
    description: "황색 톤의 보색 대비에 필수적인 보라색 계열 산성 색소로, 황색을 효과적으로 중화하여 우아한 애쉬 실버 톤을 선사합니다.",
    applications: ["COLORANTS"],
    origin: "중국 (China)",
    casNumber: "4430-18-6",
    packing: "1KG"
  },
  {
    id: "color-07",
    name: "RED 201",
    englishName: "CI 15850 / D&C Red No. 6",
    category: "color",
    description: "안정성 높은 붉은색 타르 색소로서, 화려하고 강렬한 색조 화장품이나 전문 헤어 디자이너용 염모제 제형의 색 조율에 널리 쓰입니다.",
    applications: ["COLORANTS"],
    origin: "중국 (China)",
    casNumber: "5858-81-1",
    packing: "1KG"
  },
  {
    id: "color-08",
    name: "ACID YELLOW 11(YELLOW 407)",
    englishName: "Acid Yellow 11 (CI 18820)",
    category: "color",
    description: "제형 내 안정적인 용해도와 조색 능력을 자랑하는 옐로우 컬러 산성 성분으로, 자연스러운 모발의 골드브라운 톤을 보조합니다.",
    applications: ["COLORANTS"],
    origin: "중국 (China)",
    casNumber: "6359-82-6",
    packing: "1KG"
  },
  {
    id: "color-09",
    name: "ACID BLUE 9(BLUE 1)",
    englishName: "Acid Blue 9 (CI 42090)",
    category: "color",
    description: "맑고 투명한 하늘빛 블루 컬러를 구현하는 대표적 타르 색소로, 소량만으로도 제형의 완성도 있는 발색을 유지해 줍니다.",
    applications: ["COLORANTS"],
    origin: "중국 (China)",
    casNumber: "3844-45-9",
    packing: "1KG"
  },
  {
    id: "color-10",
    name: "ACID RED 52(RED 106)",
    englishName: "Acid Red 52 (CI 45100)",
    category: "color",
    description: "시선을 사로잡는 선명하고 세련된 형광 핑크 및 로즈빛 톤을 발현하여 모발에 강렬한 영감을 불어넣는 고급 색소 성분입니다.",
    applications: ["COLORANTS"],
    origin: "중국 (China)",
    casNumber: "3520-42-1",
    packing: "1KG"
  },

  // 3. HUMECTANT / 보습제
  {
    id: "hum-01",
    name: "고분자 Sodium Hyaluronate",
    englishName: "Sodium Hyaluronate (High Molecular)",
    category: "humectant",
    description: "모발 및 피부 표면에 조밀한 수분막을 형성하여 뛰어난 보습 효과와 실키한 사용감을 부여하는 고분자 히알루론산입니다.",
    applications: ["스킨케어", "헤어케어"],
    origin: "중국 (China)",
    specification: "1.3m Da / 2.6m Da",
    casNumber: "9004-61-9",
    packing: "1KG"
  },
  {
    id: "hum-02",
    name: "중분자 Sodium Hyaluronate",
    englishName: "Sodium Hyaluronate (Medium Molecular)",
    category: "humectant",
    description: "피부 및 모발 내부로 촉촉하게 스며들어 뛰어난 수분 고정 효과와 탄탄한 장벽 케어를 돕는 중분자 히알루론산입니다.",
    applications: ["스킨케어", "헤어케어"],
    origin: "중국 (China)",
    specification: "10k Da ~ 100k Da",
    casNumber: "9004-61-9",
    packing: "1KG"
  },
  {
    id: "hum-03",
    name: "저분자 Sodium Hyaluronate",
    englishName: "Sodium Hyaluronate (Low Molecular)",
    category: "humectant",
    description: "우수한 침투력으로 깊숙한 보습과 영양을 공급하고 제형의 끈적임을 최소화하여 산뜻함을 더하는 저분자 히알루론산입니다.",
    applications: ["스킨케어", "헤어케어"],
    origin: "중국 (China)",
    specification: "10k Da 미만",
    casNumber: "9004-61-9",
    packing: "1KG"
  },
  {
    id: "hum-04",
    name: "Lanolin Alcohol",
    englishName: "Lanolin Alcohol",
    category: "humectant",
    description: "천연 라놀린에서 유래하여 모발과 피부에 깊은 영양과 보습 장벽을 형성하며, 우수한 에몰리언트 및 유화 보조 능력을 가집니다.",
    applications: ["스킨케어", "헤어케어"],
    origin: "중국 (China)",
    specification: "Cosmetic Grade",
    casNumber: "8027-33-6",
    packing: "20KG"
  },
  {
    id: "hum-05",
    name: "DL-Panthenol",
    englishName: "DL-Panthenol",
    category: "humectant",
    description: "피부와 모발에 비타민 B5를 공급하여 손상 방지 및 보습력을 극대화하고 자극받은 두피와 피부를 편안하게 진정시킵니다.",
    applications: ["스킨케어", "헤어케어"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.0%",
    casNumber: "16485-10-2"
  },
  {
    id: "hum-06",
    name: "Silk Powder",
    englishName: "Hydrolyzed Silk",
    category: "humectant",
    description: "천연 실크 단백질을 가수분해하여 얻은 성분으로 모발과 피부에 실키하고 부드러운 감촉을 주며 아미노산 공급을 통해 컨디셔닝을 극대화합니다.",
    applications: ["스킨케어", "헤어케어"],
    origin: "중국 (China)",
    specification: "INCI: Hydrolyzed silk",
    casNumber: "96690-41-4",
    packing: "30KG"
  },

  // 4. ACTIVE / 기능성 원료
  {
    id: "act-01",
    name: "COQ10",
    englishName: "Coenzyme Q10",
    category: "active",
    description: "강력한 항산화 활성 성분으로 모발과 피부의 노화를 예방하고 건강한 에너지와 탄력을 선사합니다.",
    applications: ["안티에이징", "스킨케어"],
    origin: "중국 (China)",
    specification: "Purity ≥ 98.0%",
    casNumber: "303-98-0",
    packing: "1KG"
  },
  {
    id: "act-02",
    name: "Adenosine",
    englishName: "Adenosine",
    category: "active",
    description: "진피층 콜라겐 합성을 촉진하여 우수한 주름 개선 효능과 두피 모발 케어 안티에이징 시너지를 발휘하는 대표 기능성 원료입니다.",
    applications: ["안티에이징", "스킨케어"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.0%",
    casNumber: "58-61-7",
    packing: "1KG"
  },
  {
    id: "act-03",
    name: "D-Biotin",
    englishName: "D-Biotin",
    category: "active",
    description: "두피와 모근을 튼튼하게 강화하고 모발 탄력 및 윤기 회복에 도움을 주는 고순도 바이오틴 성분입니다.",
    applications: ["두피케어", "헤어케어"],
    origin: "중국 (China)",
    specification: "Purity ≥ 98.0%",
    casNumber: "58-85-5",
    packing: "1KG"
  },
  {
    id: "act-04",
    name: "Salicylic Acid",
    englishName: "Salicylic Acid",
    category: "active",
    description: "각질 제거 및 피지 조절, 항염 작용이 뛰어나 트러블성 스킨케어와 비듬 방지 두피 케어 제품에 핵심으로 적용됩니다.",
    applications: ["스킨케어", "두피케어"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.0%",
    casNumber: "69-72-7",
    packing: "25KG"
  },
  {
    id: "act-05",
    name: "Cysteamine HCL",
    englishName: "Cysteamine HCL",
    category: "active",
    description: "펌제 및 모발 구조 개선 포뮬러 등에 필수적으로 작용하여 안전하고 부드러운 웨이브 연출과 모발 관리를 보조합니다.",
    applications: ["헤어케어", "펌제"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.0%",
    casNumber: "156-57-0",
    packing: "25KG"
  },
  {
    id: "act-06",
    name: "4-Hydroxyacetophenone",
    englishName: "4-Hydroxyacetophenone",
    category: "active",
    description: "자극이 적은 안전한 방부 대체 보존 활성 원료이자 항산화, 항염 효과가 뛰어난 멀티 기능성 안정제 성분입니다.",
    applications: ["스킨케어", "제품안정화"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.5%",
    casNumber: "99-93-4",
    packing: "25KG"
  },
  {
    id: "act-07",
    name: "Phenacetin",
    englishName: "Phenacetin",
    category: "active",
    description: "제형 내에서 산화 반응을 안정화하고 조절하는 역할을 수행하며, 주로 산화 염화 제형 및 과산화수소수 처방에 쓰이는 보조 원료입니다.",
    applications: ["염모제", "제품안정화"],
    origin: "중국 (China)",
    specification: "Purity ≥ 99.0%",
    casNumber: "62-44-2",
    packing: "25KG"
  },
  {
    id: "act-08",
    name: "Gallic Acid",
    englishName: "Gallic Acid",
    category: "active",
    description: "식물 유래 천연 폴리페놀 항산화 성분으로 우수한 활성 산소 제거 및 산화 방지 능력을 자랑하며, 톤 개선과 보존력 향상에 기여합니다.",
    applications: ["스킨케어", "헤어케어"],
    origin: "중국 (China)",
    specification: "Purity ≥ 98.0%",
    casNumber: "149-91-7",
    packing: "25KG"
  },
  {
    id: "act-09",
    name: "DPG",
    englishName: "Dipotassium Glycyrrhizate",
    category: "active",
    description: "감초 뿌리에서 추출한 천연 유래 감초산칼륨 성분으로, 매우 뛰어난 항염, 진정 작용 및 두피와 피부의 자극 완화 효과를 제공하는 고기능성 활성 원료입니다.",
    applications: ["스킨케어", "두피케어"],
    origin: "중국 (China)",
    specification: "Purity ≥ 98.0%",
    casNumber: "68797-35-3",
    packing: "1KG"
  },
  {
    id: "act-10",
    name: "AMG",
    englishName: "Ammonium Glycyrrhizate",
    category: "active",
    description: "감초 진액에서 얻은 고순도 감초산암모늄 원료로, 두피 컨디셔닝 강화, 자극 예방 및 강력한 피부 항염·진정 작용을 돕습니다.",
    applications: ["스킨케어", "두피케어"],
    origin: "중국 (China)",
    specification: "Purity ≥ 98.0%",
    casNumber: "53956-04-0",
    packing: "1KG"
  }
];

export const CEO_MESSAGE: CEOMessage = {
  title: "더 깨끗하고 우수한 원료로,\nK-Beauty의 글로벌 도약을 함께합니다.",
  subtitle: "에스티트레이딩은 정직함과 정밀함을 바탕으로 최고의 화장품 원료를 공급합니다.",
  content: [
    "안녕하십니까. 에스티트레이딩 대표이사입니다.",
    "급변하는 글로벌 화장품 시장 속에서 한국의 화장품 브랜드와 화장품 제조사들은 기술력과 기획력을 입증하며 세계 시장을 리드하고 있습니다. 이에 발맞춰 에스티트레이딩은 고순도 염료, 안료, 보습 성분 및 검증된 고기능성 원료를 세계 각국의 전문 제조 파트너로부터 엄선하여 고객사 여러분께 제공하고 있습니다.",
    "저희는 단순히 원료를 유통하는 단계를 넘어, 고객사가 기획하시는 최상의 품질과 텍스처를 구현할 수 있도록 '기술 지원'과 '규제 컨설팅'을 포함한 원스톱 솔루션을 제공하는 비즈니스 파트너가 되고자 합니다.",
    "정직과 신뢰, 철저한 품질 관리 시스템을 기업 경영의 최우선 가치로 여기고, 친환경 원재료 도입과 글로벌 안전 기준 통과 등 지속 가능한 화장품 생태계에 기여할 수 있도록 끊임없이 정진하겠습니다.",
    "화장품 원료의 표준을 세워가는 에스티트레이딩과 함께 안전하고 차별화된 제품 개발의 기쁨을 만나보시길 바랍니다. 감사합니다."
  ],
  signature: "에스티트레이딩 대표이사 드림"
};

export const COMPANY_HISTORY: HistoryItem[] = [
  {
    year: "2026",
    events: [
      { month: "02", description: "2026년 경기도 성실납세자 선정" }
    ]
  },
  {
    year: "2023",
    events: [
      { month: "07", description: "사무실 이전 (경기도 안양시 만안구 덕천로152번길 25, 안양ISBIZ 729A호, B148호)" }
    ]
  },
  {
    year: "2013",
    events: [
      { month: "12", description: "사무실 이전 (경기도 안산시 단원구 풍전로 37-9, 222호, 지118호)" }
    ]
  },
  {
    year: "2006",
    events: [
      { month: "03", description: "에스티트레이딩 설립" }
    ]
  }
];
