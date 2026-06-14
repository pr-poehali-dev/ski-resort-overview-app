import { useState } from "react";
import Icon from "@/components/ui/icon";

interface Excursion {
  name: string;
  price: string;
  duration: string;
  icon: string;
}

interface Rental {
  name: string;
  price: string;
  beds: number;
  icon: string;
}

interface Resort {
  id: string;
  name: string;
  location: string;
  difficulty: number;
  popularity: number;
  rating: number;
  runs: number;
  liftCount: number;
  altitude: string;
  season: string;
  tag: string;
  tagColor: string;
  image: string;
  description: string;
  excursions: Excursion[];
  rentals: Rental[];
}

const REGIONS = [
  {
    id: "caucasus",
    name: "Северный Кавказ",
    emoji: "🏔️",
    resortCount: 3,
    description: "Главный горнолыжный регион России",
  },
  {
    id: "siberia",
    name: "Сибирь",
    emoji: "🌲",
    resortCount: 1,
    description: "Нетронутая природа и пухляк",
  },
  {
    id: "ural",
    name: "Урал",
    emoji: "⛰️",
    resortCount: 1,
    description: "Близко к Москве и Питеру",
  },
  {
    id: "fareast",
    name: "Дальний Восток",
    emoji: "🌊",
    resortCount: 1,
    description: "Сахалин и Камчатка",
  },
];

const RESORTS: Record<string, Resort[]> = {
  caucasus: [
    {
      id: "rosa",
      name: "Роза Хутор",
      location: "Сочи",
      difficulty: 4,
      popularity: 5,
      rating: 4.9,
      runs: 102,
      liftCount: 26,
      altitude: "560–2320 м",
      season: "Дек — Апр",
      tag: "Топ выбор",
      tagColor: "#FFDD2D",
      image: "https://cdn.poehali.dev/projects/018be92d-2460-4dcc-b0d4-3dbb7a348bfa/files/e772d704-f2d9-4e38-8306-9046215c286e.jpg",
      description: "Олимпийский курорт мирового уровня с самой развитой инфраструктурой в России. Более 100 трасс для любого уровня, современные гондолы, богатый апре-ски.",
      excursions: [
        { name: "Ски-сафари по всем трассам", price: "3 500 ₽", duration: "4 ч", icon: "Mountain" },
        { name: "Вечерний горнолыжный тур", price: "2 800 ₽", duration: "3 ч", icon: "Moon" },
        { name: "Снегоходные прогулки", price: "5 000 ₽", duration: "2 ч", icon: "Zap" },
        { name: "Хелиски — вертолётный спуск", price: "28 000 ₽", duration: "5 ч", icon: "Wind" },
      ],
      rentals: [
        { name: "Апартаменты у подъёмника", price: "8 500 ₽/ночь", beds: 2, icon: "Home" },
        { name: "Шале с сауной", price: "15 000 ₽/ночь", beds: 4, icon: "Home" },
        { name: "Студия в горном отеле", price: "5 200 ₽/ночь", beds: 1, icon: "Building2" },
        { name: "Премиум-люкс с видом", price: "22 000 ₽/ночь", beds: 3, icon: "Sparkles" },
      ],
    },
    {
      id: "elbrus",
      name: "Эльбрус",
      location: "Кабардино-Балкария",
      difficulty: 5,
      popularity: 4,
      rating: 4.7,
      runs: 35,
      liftCount: 12,
      altitude: "2300–3847 м",
      season: "Нояб — Май",
      tag: "Высокогорный",
      tagColor: "#60A5FA",
      image: "https://cdn.poehali.dev/projects/018be92d-2460-4dcc-b0d4-3dbb7a348bfa/files/1b9580fc-99c6-4da2-b1da-aa97c10b636a.jpg",
      description: "Высочайшая вершина Европы. Катание на высотах, недоступных больше нигде в России. Уникальный фрирайд, мощные виды и настоящий горный дух.",
      excursions: [
        { name: "Восхождение на вершину 5642м", price: "12 000 ₽", duration: "1 день", icon: "Mountain" },
        { name: "Фрирайд по целине", price: "8 000 ₽", duration: "6 ч", icon: "Zap" },
        { name: "Экскурсия в Приэльбрусье", price: "2 500 ₽", duration: "3 ч", icon: "Map" },
        { name: "Канатная дорога на 3847м", price: "1 800 ₽", duration: "2 ч", icon: "Wind" },
      ],
      rentals: [
        { name: "Гостиница у подножия", price: "3 800 ₽/ночь", beds: 2, icon: "Home" },
        { name: "Базовый лагерь (домик)", price: "2 200 ₽/ночь", beds: 1, icon: "Home" },
        { name: "Горный отель Азау", price: "6 500 ₽/ночь", beds: 2, icon: "Building2" },
      ],
    },
    {
      id: "arkhyz",
      name: "Архыз",
      location: "Карачаево-Черкессия",
      difficulty: 3,
      popularity: 4,
      rating: 4.5,
      runs: 58,
      liftCount: 14,
      altitude: "1450–2240 м",
      season: "Дек — Апр",
      tag: "Для семей",
      tagColor: "#34D399",
      image: "https://cdn.poehali.dev/projects/018be92d-2460-4dcc-b0d4-3dbb7a348bfa/files/e772d704-f2d9-4e38-8306-9046215c286e.jpg",
      description: "Молодой курорт с отличными трассами для начинающих и семейного отдыха. Доступные цены и развивающаяся инфраструктура.",
      excursions: [
        { name: "Урок для начинающих", price: "2 000 ₽", duration: "2 ч", icon: "Star" },
        { name: "Детская горнолыжная школа", price: "1 500 ₽", duration: "3 ч", icon: "Heart" },
        { name: "Тур к Архызским водопадам", price: "3 000 ₽", duration: "4 ч", icon: "Map" },
      ],
      rentals: [
        { name: "Квартира в Романтике", price: "4 500 ₽/ночь", beds: 2, icon: "Home" },
        { name: "Коттедж для семьи", price: "9 000 ₽/ночь", beds: 5, icon: "Home" },
      ],
    },
  ],
  siberia: [
    {
      id: "sheregesh",
      name: "Шерегеш",
      location: "Кемеровская обл.",
      difficulty: 3,
      popularity: 5,
      rating: 4.8,
      runs: 39,
      liftCount: 18,
      altitude: "440–1270 м",
      season: "Нояб — Май",
      tag: "Гик-фрирайд",
      tagColor: "#A78BFA",
      image: "https://cdn.poehali.dev/projects/018be92d-2460-4dcc-b0d4-3dbb7a348bfa/files/df32f326-7588-4cdf-ad74-4186ae73b689.jpg",
      description: "Легенда сибирского катания. Уникальный «гик» — изморозь на деревьях — и атмосферный посёлок с насыщенной après-ski жизнью.",
      excursions: [
        { name: "Фрирайд в сибирской тайге", price: "4 500 ₽", duration: "5 ч", icon: "Zap" },
        { name: "Банный тур с катанием", price: "3 500 ₽", duration: "4 ч", icon: "Flame" },
        { name: "Снегоходы по тайге", price: "6 000 ₽", duration: "3 ч", icon: "Wind" },
      ],
      rentals: [
        { name: "Апартаменты в посёлке", price: "3 200 ₽/ночь", beds: 2, icon: "Home" },
        { name: "Хостел у трассы", price: "1 200 ₽/ночь", beds: 1, icon: "Building2" },
        { name: "Гостевой дом с баней", price: "7 000 ₽/ночь", beds: 4, icon: "Home" },
      ],
    },
  ],
  ural: [
    {
      id: "abzakovo",
      name: "Абзаково",
      location: "Башкортостан",
      difficulty: 2,
      popularity: 3,
      rating: 4.3,
      runs: 18,
      liftCount: 9,
      altitude: "450–742 м",
      season: "Дек — Март",
      tag: "Рядом с Уфой",
      tagColor: "#FB923C",
      image: "https://cdn.poehali.dev/projects/018be92d-2460-4dcc-b0d4-3dbb7a348bfa/files/df32f326-7588-4cdf-ad74-4186ae73b689.jpg",
      description: "Популярный уральский курорт с развитой инфраструктурой и доступными ценами. Отличный выбор для первого знакомства с горными лыжами.",
      excursions: [
        { name: "Тюбинг и сноутюбинг", price: "800 ₽", duration: "2 ч", icon: "Circle" },
        { name: "Ночное катание", price: "1 500 ₽", duration: "3 ч", icon: "Moon" },
      ],
      rentals: [
        { name: "Номер в санатории", price: "2 800 ₽/ночь", beds: 2, icon: "Building2" },
        { name: "Коттедж на базе", price: "5 500 ₽/ночь", beds: 4, icon: "Home" },
      ],
    },
  ],
  fareast: [
    {
      id: "gorny",
      name: "Горный воздух",
      location: "Сахалин",
      difficulty: 3,
      popularity: 3,
      rating: 4.4,
      runs: 25,
      liftCount: 8,
      altitude: "50–601 м",
      season: "Нояб — Май",
      tag: "Тихоокеанский снег",
      tagColor: "#22D3EE",
      image: "https://cdn.poehali.dev/projects/018be92d-2460-4dcc-b0d4-3dbb7a348bfa/files/e772d704-f2d9-4e38-8306-9046215c286e.jpg",
      description: "Уникальный курорт у Тихого океана с японским влиянием в кухне и культуре. Снег выпадает раньше и тает позже, чем где-либо в России.",
      excursions: [
        { name: "Японские термальные источники", price: "3 000 ₽", duration: "3 ч", icon: "Droplets" },
        { name: "Рыбалка на Сахалине", price: "5 000 ₽", duration: "6 ч", icon: "Fish" },
      ],
      rentals: [
        { name: "Апартаменты в Ю-Сахалинске", price: "4 000 ₽/ночь", beds: 2, icon: "Home" },
        { name: "Отель у склона", price: "6 500 ₽/ночь", beds: 2, icon: "Building2" },
      ],
    },
  ],
};

type View = "regions" | "resorts" | "resort";
type ResortTab = "info" | "excursions" | "rental";

function DifficultyBadge({ level }: { level: number }) {
  const labels = ["", "Зелёные", "Синие", "Красные", "Чёрные", "Внетрасс."];
  const colors = ["", "#34D399", "#60A5FA", "#F87171", "#e2e8f0", "#A78BFA"];
  const bgColors = ["", "#0D2B1F", "#0D1B2B", "#2B0D0D", "#1f2937", "#1A1030"];
  return (
    <span
      className="text-xs font-semibold px-2.5 py-0.5 rounded-full"
      style={{ color: colors[level], background: bgColors[level], border: `1px solid ${colors[level]}44` }}
    >
      {labels[level]}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1">
      <span style={{ color: "#FFDD2D" }} className="text-sm leading-none">★</span>
      <span className="text-sm font-bold text-white">{rating}</span>
    </span>
  );
}

function PopularityDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="w-2 h-2 rounded-full"
          style={{ background: i <= level ? "#FFDD2D" : "#2A2D35" }}
        />
      ))}
    </div>
  );
}

export default function Index() {
  const [view, setView] = useState<View>("regions");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);
  const [activeTab, setActiveTab] = useState<ResortTab>("info");
  const [searchQuery, setSearchQuery] = useState("");

  const resorts = selectedRegion ? RESORTS[selectedRegion] || [] : [];

  const filteredRegions = REGIONS.filter(r =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRegionClick = (regionId: string) => {
    setSelectedRegion(regionId);
    setView("resorts");
    setSearchQuery("");
  };

  const handleResortClick = (resort: Resort) => {
    setSelectedResort(resort);
    setActiveTab("info");
    setView("resort");
  };

  const goBack = () => {
    if (view === "resort") {
      setView("resorts");
      setSelectedResort(null);
    } else {
      setView("regions");
      setSelectedRegion(null);
    }
    setSearchQuery("");
  };

  return (
    <div className="min-h-screen font-['Golos_Text',sans-serif]" style={{ background: "var(--tbank-dark)", color: "#F0F2F5" }}>

      {/* Header */}
      <div
        className="sticky top-0 z-50"
        style={{ background: "var(--tbank-dark)", borderBottom: "1px solid var(--tbank-border)" }}
      >
        <div className="max-w-md mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            {view !== "regions" && (
              <button
                onClick={goBack}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95"
                style={{ background: "var(--tbank-card2)" }}
              >
                <Icon name="ChevronLeft" size={20} className="text-white" />
              </button>
            )}
            <div className="flex-1">
              {view === "regions" && (
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎿</span>
                  <span className="text-lg font-bold text-white">СкиРоссия</span>
                </div>
              )}
              {view === "resorts" && (
                <div>
                  <p className="text-xs" style={{ color: "var(--tbank-muted)" }}>Регион</p>
                  <h1 className="text-base font-bold text-white">
                    {REGIONS.find(r => r.id === selectedRegion)?.name}
                  </h1>
                </div>
              )}
              {view === "resort" && (
                <div>
                  <p className="text-xs" style={{ color: "var(--tbank-muted)" }}>Курорт</p>
                  <h1 className="text-base font-bold text-white">{selectedResort?.name}</h1>
                </div>
              )}
            </div>
            {view === "regions" && (
              <button
                className="w-9 h-9 rounded-full flex items-center justify-center"
                style={{ background: "var(--tbank-card2)" }}
              >
                <Icon name="Bell" size={18} className="text-white" />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pb-24">

        {/* ─── REGIONS VIEW ─── */}
        {view === "regions" && (
          <div className="animate-slide-up">
            {/* Hero banner */}
            <div
              className="mt-4 rounded-2xl p-5 relative overflow-hidden"
              style={{ background: "linear-gradient(135deg, #FFDD2D 0%, #FFB800 100%)" }}
            >
              <div className="relative z-10">
                <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "rgba(30,25,0,0.55)" }}>
                  Сезон 2024–2025
                </p>
                <h2 className="text-2xl font-black mt-1 leading-tight" style={{ color: "#1A1400" }}>
                  Горнолыжные<br />курорты России
                </h2>
                <p className="text-sm mt-2 font-medium" style={{ color: "rgba(30,25,0,0.6)" }}>
                  6 курортов · 4 региона
                </p>
              </div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-6xl opacity-25 select-none">⛷️</div>
            </div>

            {/* Search */}
            <div className="mt-4 relative">
              <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--tbank-muted)" }} />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск региона..."
                className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all placeholder:text-gray-500"
                style={{
                  background: "var(--tbank-card)",
                  border: "1px solid var(--tbank-border)",
                  color: "#F0F2F5",
                }}
              />
            </div>

            {/* Stats row */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: "Курортов", value: "6+", icon: "Mountain" },
                { label: "Трасс", value: "277+", icon: "GitBranch" },
                { label: "Подъёмников", value: "87+", icon: "ArrowUp" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-3 text-center"
                  style={{ background: "var(--tbank-card)", border: "1px solid var(--tbank-border)" }}
                >
                  <Icon name={stat.icon} size={16} className="mx-auto mb-1.5" style={{ color: "#FFDD2D" }} />
                  <p className="text-lg font-black text-white">{stat.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--tbank-muted)" }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Region cards */}
            <h3 className="text-xs font-semibold mt-6 mb-3 tracking-wider" style={{ color: "var(--tbank-muted)" }}>
              ВЫБЕРИТЕ РЕГИОН
            </h3>
            <div className="space-y-3">
              {filteredRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleRegionClick(region.id)}
                  className="w-full rounded-2xl p-4 text-left transition-all active:scale-[0.98] hover-lift"
                  style={{
                    background: "var(--tbank-card)",
                    border: "1px solid var(--tbank-border)",
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: "var(--tbank-card2)" }}
                    >
                      {region.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-white">{region.name}</p>
                      <p className="text-sm mt-0.5 truncate" style={{ color: "var(--tbank-muted)" }}>
                        {region.description}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{ background: "rgba(255,221,45,0.12)", color: "#FFDD2D" }}
                      >
                        {region.resortCount} курорта
                      </span>
                      <Icon name="ChevronRight" size={16} style={{ color: "var(--tbank-muted)" }} />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── RESORTS VIEW ─── */}
        {view === "resorts" && (
          <div className="animate-slide-up">
            <div className="mt-4 space-y-4">
              {resorts.map((resort) => (
                <button
                  key={resort.id}
                  onClick={() => handleResortClick(resort)}
                  className="w-full rounded-2xl overflow-hidden text-left transition-all active:scale-[0.98] hover-lift"
                  style={{ border: "1px solid var(--tbank-border)" }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={resort.image}
                      alt={resort.name}
                      className="w-full h-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "linear-gradient(to top, rgba(18,20,24,0.95) 0%, transparent 50%)" }}
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{
                          background: resort.tagColor,
                          color: resort.tagColor === "#FFDD2D" ? "#1A1400" : "#fff",
                        }}
                      >
                        {resort.tag}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div
                        className="px-2 py-1 rounded-full flex items-center gap-1"
                        style={{ background: "rgba(18,20,24,0.7)", backdropFilter: "blur(8px)" }}
                      >
                        <StarRating rating={resort.rating} />
                      </div>
                    </div>
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="text-xl font-black text-white">{resort.name}</h3>
                      <p className="text-sm flex items-center gap-1 mt-0.5" style={{ color: "rgba(240,242,245,0.65)" }}>
                        <Icon name="MapPin" size={12} />
                        {resort.location}
                      </p>
                    </div>
                  </div>

                  <div className="p-4" style={{ background: "var(--tbank-card)" }}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs mb-1.5" style={{ color: "var(--tbank-muted)" }}>Сложность</p>
                        <DifficultyBadge level={resort.difficulty} />
                      </div>
                      <div>
                        <p className="text-xs mb-1.5" style={{ color: "var(--tbank-muted)" }}>Популярность</p>
                        <PopularityDots level={resort.popularity} />
                      </div>
                      <div className="text-right">
                        <p className="text-xs mb-1.5" style={{ color: "var(--tbank-muted)" }}>Трасс</p>
                        <p className="text-sm font-bold text-white">{resort.runs}</p>
                      </div>
                    </div>
                    <div
                      className="w-full py-2.5 rounded-xl text-sm font-bold text-center"
                      style={{ background: "#FFDD2D", color: "#1A1400" }}
                    >
                      Подробнее →
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ─── RESORT DETAIL VIEW ─── */}
        {view === "resort" && selectedResort && (
          <div className="animate-scale-in">
            {/* Hero */}
            <div className="mt-4 rounded-2xl overflow-hidden relative h-56">
              <img src={selectedResort.image} alt={selectedResort.name} className="w-full h-full object-cover" />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(18,20,24,0.92) 0%, transparent 45%)" }}
              />
              <div className="absolute top-3 left-3">
                <span
                  className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{
                    background: selectedResort.tagColor,
                    color: selectedResort.tagColor === "#FFDD2D" ? "#1A1400" : "#fff",
                  }}
                >
                  {selectedResort.tag}
                </span>
              </div>
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-end justify-between">
                  <div>
                    <h2 className="text-2xl font-black text-white">{selectedResort.name}</h2>
                    <p className="text-sm flex items-center gap-1 mt-0.5" style={{ color: "rgba(240,242,245,0.65)" }}>
                      <Icon name="MapPin" size={12} />
                      {selectedResort.location}
                    </p>
                  </div>
                  <div
                    className="px-2.5 py-1.5 rounded-full flex items-center gap-1"
                    style={{ background: "rgba(18,20,24,0.7)", backdropFilter: "blur(8px)" }}
                  >
                    <StarRating rating={selectedResort.rating} />
                  </div>
                </div>
              </div>
            </div>

            {/* Stats grid */}
            <div className="mt-3 grid grid-cols-4 gap-2">
              {[
                { label: "Трасс", value: String(selectedResort.runs) },
                { label: "Подъёмн.", value: String(selectedResort.liftCount) },
                { label: "Высота", value: selectedResort.altitude },
                { label: "Сезон", value: selectedResort.season },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl p-2.5 text-center"
                  style={{ background: "var(--tbank-card)", border: "1px solid var(--tbank-border)" }}
                >
                  <p className="text-xs font-bold text-white leading-tight">{s.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--tbank-muted)" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Difficulty & Popularity bar */}
            <div
              className="mt-3 rounded-2xl p-4 flex items-center gap-4"
              style={{ background: "var(--tbank-card)", border: "1px solid var(--tbank-border)" }}
            >
              <div className="flex-1">
                <p className="text-xs mb-2" style={{ color: "var(--tbank-muted)" }}>Уровень трасс</p>
                <DifficultyBadge level={selectedResort.difficulty} />
              </div>
              <div className="w-px h-8" style={{ background: "var(--tbank-border)" }} />
              <div className="flex-1">
                <p className="text-xs mb-2" style={{ color: "var(--tbank-muted)" }}>Популярность</p>
                <PopularityDots level={selectedResort.popularity} />
              </div>
              <div className="w-px h-8" style={{ background: "var(--tbank-border)" }} />
              <div>
                <p className="text-xs mb-2" style={{ color: "var(--tbank-muted)" }}>Рейтинг</p>
                <StarRating rating={selectedResort.rating} />
              </div>
            </div>

            {/* Tabs */}
            <div
              className="mt-4 rounded-2xl p-1 flex gap-1"
              style={{ background: "var(--tbank-card)", border: "1px solid var(--tbank-border)" }}
            >
              {(["info", "excursions", "rental"] as ResortTab[]).map((tab) => {
                const labels: Record<ResortTab, string> = { info: "О курорте", excursions: "Экскурсии", rental: "Жильё" };
                const icons: Record<ResortTab, string> = { info: "Info", excursions: "Compass", rental: "Home" };
                const isActive = activeTab === tab;
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className="flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    style={{
                      background: isActive ? "#FFDD2D" : "transparent",
                      color: isActive ? "#1A1400" : "var(--tbank-muted)",
                    }}
                  >
                    <Icon name={icons[tab]} size={13} />
                    {labels[tab]}
                  </button>
                );
              })}
            </div>

            {/* Tab: Info */}
            {activeTab === "info" && (
              <div className="mt-4 space-y-3 animate-fade-in">
                <div
                  className="rounded-2xl p-4"
                  style={{ background: "var(--tbank-card)", border: "1px solid var(--tbank-border)" }}
                >
                  <h4 className="font-bold text-white mb-2">О курорте</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "rgba(240,242,245,0.7)" }}>
                    {selectedResort.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div
                    className="rounded-2xl p-4"
                    style={{ background: "var(--tbank-card)", border: "1px solid var(--tbank-border)" }}
                  >
                    <Icon name="TrendingUp" size={20} style={{ color: "#FFDD2D" }} />
                    <p className="font-bold text-white mt-2 text-sm">{selectedResort.altitude}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--tbank-muted)" }}>Перепад высот</p>
                  </div>
                  <div
                    className="rounded-2xl p-4"
                    style={{ background: "var(--tbank-card)", border: "1px solid var(--tbank-border)" }}
                  >
                    <Icon name="Calendar" size={20} style={{ color: "#60A5FA" }} />
                    <p className="font-bold text-white mt-2 text-sm">{selectedResort.season}</p>
                    <p className="text-xs mt-0.5" style={{ color: "var(--tbank-muted)" }}>Горнолыжный сезон</p>
                  </div>
                </div>
                <button
                  className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]"
                  style={{ background: "#FFDD2D", color: "#1A1400" }}
                >
                  Забронировать поездку
                </button>
              </div>
            )}

            {/* Tab: Excursions */}
            {activeTab === "excursions" && (
              <div className="mt-4 space-y-3 animate-fade-in">
                {selectedResort.excursions.map((exc: Excursion, i: number) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4 flex items-center gap-4"
                    style={{ background: "var(--tbank-card)", border: "1px solid var(--tbank-border)" }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(255,221,45,0.1)" }}
                    >
                      <Icon name={exc.icon} size={20} style={{ color: "#FFDD2D" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm leading-tight">{exc.name}</p>
                      <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "var(--tbank-muted)" }}>
                        <Icon name="Clock" size={11} />
                        {exc.duration}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-white text-sm">{exc.price}</p>
                      <p className="text-xs" style={{ color: "var(--tbank-muted)" }}>с чел.</p>
                    </div>
                  </div>
                ))}
                <button
                  className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]"
                  style={{ background: "#FFDD2D", color: "#1A1400" }}
                >
                  Все экскурсии
                </button>
              </div>
            )}

            {/* Tab: Rental */}
            {activeTab === "rental" && (
              <div className="mt-4 space-y-3 animate-fade-in">
                {selectedResort.rentals.map((rent: Rental, i: number) => (
                  <div
                    key={i}
                    className="rounded-2xl p-4 flex items-center gap-4"
                    style={{ background: "var(--tbank-card)", border: "1px solid var(--tbank-border)" }}
                  >
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(96,165,250,0.1)" }}
                    >
                      <Icon name={rent.icon} size={20} style={{ color: "#60A5FA" }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white text-sm leading-tight">{rent.name}</p>
                      <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: "var(--tbank-muted)" }}>
                        <Icon name="Users" size={11} />
                        до {rent.beds} гостей
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-white text-sm">{rent.price}</p>
                    </div>
                  </div>
                ))}
                <button
                  className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]"
                  style={{ background: "#FFDD2D", color: "#1A1400" }}
                >
                  Найти жильё
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: "var(--tbank-dark)",
          borderTop: "1px solid var(--tbank-border)",
        }}
      >
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-1">
            {[
              { icon: "Mountain", label: "Курорты", active: true },
              { icon: "Map", label: "Карта", active: false },
              { icon: "Heart", label: "Избранное", active: false },
              { icon: "User", label: "Профиль", active: false },
            ].map((item) => (
              <button
                key={item.label}
                className="flex flex-col items-center gap-1 py-1 transition-all active:scale-95"
              >
                <Icon
                  name={item.icon}
                  size={22}
                  style={{ color: item.active ? "#FFDD2D" : "var(--tbank-muted)" }}
                />
                <span
                  className="text-xs font-medium"
                  style={{ color: item.active ? "#FFDD2D" : "var(--tbank-muted)" }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
