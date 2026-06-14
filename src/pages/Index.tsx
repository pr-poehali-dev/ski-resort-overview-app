import { useState, useEffect } from "react";
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

interface Webcam {
  name: string;
  location: string;
  url: string;
  preview: string;
}

interface Skipass {
  name: string;
  price: string;
  duration: string;
  includes: string;
  popular?: boolean;
}

interface HowToGet {
  icon: string;
  type: string;
  from: string;
  duration: string;
  price: string;
  detail: string;
}

interface TrailZone {
  name: string;
  color: string;
  bgColor: string;
  count: number;
  lengthKm: string;
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
  trailMap: TrailZone[];
  webcams: Webcam[];
  skipasses: Skipass[];
  howToGet: HowToGet[];
}

const IMG_ROSA = "https://cdn.poehali.dev/projects/018be92d-2460-4dcc-b0d4-3dbb7a348bfa/files/e772d704-f2d9-4e38-8306-9046215c286e.jpg";
const IMG_ELBRUS = "https://cdn.poehali.dev/projects/018be92d-2460-4dcc-b0d4-3dbb7a348bfa/files/1b9580fc-99c6-4da2-b1da-aa97c10b636a.jpg";
const IMG_SHER = "https://cdn.poehali.dev/projects/018be92d-2460-4dcc-b0d4-3dbb7a348bfa/files/df32f326-7588-4cdf-ad74-4186ae73b689.jpg";

const ADS = [
  { id: 1, emoji: "🏂", title: "Скипасс Роза Хутор", sub: "Скидка 20% при бронировании до 1 декабря", color: "#FFDD2D", textColor: "#1A1400" },
  { id: 2, emoji: "🏨", title: "Жильё у склона", sub: "Найди лучшие апартаменты от 2 500 ₽/ночь", color: "#3B82F6", textColor: "#fff" },
  { id: 3, emoji: "🎿", title: "Аренда снаряжения", sub: "Комплект лыж + ботинки от 1 200 ₽/день", color: "#10B981", textColor: "#fff" },
  { id: 4, emoji: "🚁", title: "Хелиски на Эльбрусе", sub: "Уникальный спуск с высоты 4 200 м", color: "#8B5CF6", textColor: "#fff" },
  { id: 5, emoji: "🌡️", title: "Погода онлайн", sub: "Следи за снежным покровом на курортах", color: "#EC4899", textColor: "#fff" },
  { id: 6, emoji: "🎒", title: "Туры под ключ", sub: "Перелёт + отель + скипасс в одном пакете", color: "#F97316", textColor: "#fff" },
];

const REGIONS = [
  { id: "caucasus", name: "Северный Кавказ", emoji: "🏔️", resortCount: 3, description: "Главный горнолыжный регион России" },
  { id: "northwest", name: "Северо-Западный", emoji: "🌊", resortCount: 2, description: "Карелия, Мурманск — снег с октября" },
  { id: "siberia", name: "Сибирь", emoji: "🌲", resortCount: 1, description: "Нетронутая природа и пухляк" },
  { id: "moscow", name: "Подмосковье", emoji: "🏙️", resortCount: 2, description: "Горнолыжные комплексы близ Москвы" },
  { id: "spb", name: "Санкт-Петербург", emoji: "🏛️", resortCount: 2, description: "Курорты в Ленинградской области" },
  { id: "ural", name: "Урал", emoji: "⛰️", resortCount: 1, description: "Близко к Москве и Питеру" },
  { id: "fareast", name: "Дальний Восток", emoji: "🌏", resortCount: 1, description: "Сахалин и Камчатка" },
];

const RESORTS: Record<string, Resort[]> = {
  caucasus: [
    {
      id: "rosa", name: "Роза Хутор", location: "Сочи",
      difficulty: 4, popularity: 5, rating: 4.9, runs: 102, liftCount: 26,
      altitude: "560–2320 м", season: "Дек — Апр", tag: "Топ выбор", tagColor: "#FFDD2D",
      image: IMG_ROSA,
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
      trailMap: [
        { name: "Зелёные", color: "#34D399", bgColor: "#0D2B1F", count: 18, lengthKm: "23 км" },
        { name: "Синие", color: "#60A5FA", bgColor: "#0D1B2B", count: 34, lengthKm: "47 км" },
        { name: "Красные", color: "#F87171", bgColor: "#2B0D0D", count: 31, lengthKm: "41 км" },
        { name: "Чёрные", color: "#CBD5E1", bgColor: "#1E2433", count: 19, lengthKm: "29 км" },
      ],
      webcams: [
        { name: "Вершина Роза Пик", location: "2320 м", url: "#", preview: IMG_ROSA },
        { name: "Нижняя станция", location: "560 м", url: "#", preview: IMG_ELBRUS },
        { name: "Склон Запад", location: "1600 м", url: "#", preview: IMG_SHER },
      ],
      skipasses: [
        { name: "Дневной", price: "3 800 ₽", duration: "1 день", includes: "Все подъёмники 9:00–17:00" },
        { name: "Недельный", price: "18 500 ₽", duration: "7 дней", includes: "Все подъёмники + приоритетный вход", popular: true },
        { name: "Утренний", price: "2 200 ₽", duration: "До 13:00", includes: "Все подъёмники 9:00–13:00" },
        { name: "Сезонный", price: "65 000 ₽", duration: "Весь сезон", includes: "Неограниченный доступ + паркинг" },
      ],
      howToGet: [
        { icon: "Plane", type: "Самолёт", from: "Москва (SVO)", duration: "2 ч 20 мин", price: "от 4 500 ₽", detail: "Аэропорт Сочи + трансфер 50 мин" },
        { icon: "Train", type: "Поезд", from: "Москва (Казанский)", duration: "24 ч", price: "от 3 200 ₽", detail: "До ст. Адлер, затем трансфер 40 мин" },
        { icon: "Car", type: "На автомобиле", from: "Краснодар", duration: "3 ч 30 мин", price: "платная трасса", detail: "Трасса А-147, парковка у подъёмника" },
      ],
    },
    {
      id: "elbrus", name: "Эльбрус", location: "Кабардино-Балкария",
      difficulty: 5, popularity: 4, rating: 4.7, runs: 35, liftCount: 12,
      altitude: "2300–3847 м", season: "Нояб — Май", tag: "Высокогорный", tagColor: "#60A5FA",
      image: IMG_ELBRUS,
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
      trailMap: [
        { name: "Синие", color: "#60A5FA", bgColor: "#0D1B2B", count: 8, lengthKm: "12 км" },
        { name: "Красные", color: "#F87171", bgColor: "#2B0D0D", count: 14, lengthKm: "22 км" },
        { name: "Чёрные", color: "#CBD5E1", bgColor: "#1E2433", count: 13, lengthKm: "19 км" },
      ],
      webcams: [
        { name: "Приют 11 (4130 м)", location: "4130 м", url: "#", preview: IMG_ELBRUS },
        { name: "Поляна Азау", location: "2350 м", url: "#", preview: IMG_SHER },
      ],
      skipasses: [
        { name: "Дневной", price: "2 500 ₽", duration: "1 день", includes: "Все подъёмники зоны Эльбрус" },
        { name: "3 дня", price: "6 500 ₽", duration: "3 дня", includes: "Все подъёмники", popular: true },
        { name: "Сезонный", price: "42 000 ₽", duration: "Весь сезон", includes: "Полный доступ" },
      ],
      howToGet: [
        { icon: "Plane", type: "Самолёт", from: "Москва (VKO)", duration: "2 ч", price: "от 5 200 ₽", detail: "Аэропорт Минеральные Воды, затем 3 ч на авто" },
        { icon: "Car", type: "На автомобиле", from: "Нальчик", duration: "2 ч 30 мин", price: "бесплатно", detail: "Трасса через Баксанское ущелье" },
        { icon: "Bus", type: "Автобус", from: "Нальчик (автовокзал)", duration: "3 ч", price: "от 400 ₽", detail: "Прямой рейс до Терскола" },
      ],
    },
    {
      id: "arkhyz", name: "Архыз", location: "Карачаево-Черкессия",
      difficulty: 3, popularity: 4, rating: 4.5, runs: 58, liftCount: 14,
      altitude: "1450–2240 м", season: "Дек — Апр", tag: "Для семей", tagColor: "#34D399",
      image: IMG_ROSA,
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
      trailMap: [
        { name: "Зелёные", color: "#34D399", bgColor: "#0D2B1F", count: 22, lengthKm: "18 км" },
        { name: "Синие", color: "#60A5FA", bgColor: "#0D1B2B", count: 20, lengthKm: "24 км" },
        { name: "Красные", color: "#F87171", bgColor: "#2B0D0D", count: 16, lengthKm: "21 км" },
      ],
      webcams: [
        { name: "Склон Архыз-1", location: "1900 м", url: "#", preview: IMG_ROSA },
        { name: "Горная деревня", location: "1450 м", url: "#", preview: IMG_SHER },
      ],
      skipasses: [
        { name: "Дневной", price: "2 200 ₽", duration: "1 день", includes: "Все подъёмники" },
        { name: "Детский", price: "1 100 ₽", duration: "1 день", includes: "До 12 лет, все трассы", popular: true },
        { name: "Семейный (2+2)", price: "6 800 ₽", duration: "1 день", includes: "2 взрослых + 2 ребёнка" },
      ],
      howToGet: [
        { icon: "Plane", type: "Самолёт", from: "Москва (VKO)", duration: "2 ч", price: "от 4 800 ₽", detail: "Аэропорт Минводы, затем 2 ч на авто" },
        { icon: "Car", type: "На автомобиле", from: "Черкесск", duration: "2 ч 20 мин", price: "бесплатно", detail: "Трасса А-155, горная дорога" },
      ],
    },
  ],
  northwest: [
    {
      id: "khibiny", name: "Хибины", location: "Мурманская обл.",
      difficulty: 3, popularity: 4, rating: 4.6, runs: 35, liftCount: 15,
      altitude: "320–1100 м", season: "Окт — Май", tag: "Полярный день", tagColor: "#22D3EE",
      image: IMG_SHER,
      description: "Самый северный горнолыжный курорт России. Катание при полярном сиянии, рекордно длинный сезон — с октября по май, уникальная арктическая природа.",
      excursions: [
        { name: "Тур за полярным сиянием", price: "4 000 ₽", duration: "4 ч", icon: "Sparkles" },
        { name: "Снегоходы по тундре", price: "6 500 ₽", duration: "3 ч", icon: "Wind" },
        { name: "Рыбалка на замёрзшем озере", price: "3 500 ₽", duration: "5 ч", icon: "Fish" },
      ],
      rentals: [
        { name: "Апартаменты в Кировске", price: "3 500 ₽/ночь", beds: 2, icon: "Home" },
        { name: "Горная база с сауной", price: "7 000 ₽/ночь", beds: 4, icon: "Home" },
      ],
      trailMap: [
        { name: "Зелёные", color: "#34D399", bgColor: "#0D2B1F", count: 6, lengthKm: "8 км" },
        { name: "Синие", color: "#60A5FA", bgColor: "#0D1B2B", count: 14, lengthKm: "19 км" },
        { name: "Красные", color: "#F87171", bgColor: "#2B0D0D", count: 15, lengthKm: "23 км" },
      ],
      webcams: [
        { name: "Вершина Айкуайвенчорр", location: "1100 м", url: "#", preview: IMG_SHER },
        { name: "База Большой Вудъявр", location: "320 м", url: "#", preview: IMG_ELBRUS },
      ],
      skipasses: [
        { name: "Дневной", price: "2 800 ₽", duration: "1 день", includes: "Все подъёмники" },
        { name: "Многодневный 5 дней", price: "11 000 ₽", duration: "5 дней", includes: "Все подъёмники", popular: true },
        { name: "Сезонный", price: "38 000 ₽", duration: "Весь сезон", includes: "Окт — Май, полный доступ" },
      ],
      howToGet: [
        { icon: "Plane", type: "Самолёт", from: "Москва (SVO)", duration: "2 ч 10 мин", price: "от 5 500 ₽", detail: "Аэропорт Хибины (Апатиты), 30 мин до курорта" },
        { icon: "Train", type: "Поезд", from: "Москва (Ленинградский)", duration: "28 ч", price: "от 2 800 ₽", detail: "До ст. Апатиты, затем 30 мин маршрутка" },
      ],
    },
    {
      id: "pahta", name: "Пахта", location: "Карелия",
      difficulty: 2, popularity: 3, rating: 4.2, runs: 12, liftCount: 5,
      altitude: "100–320 м", season: "Дек — Март", tag: "Карелия", tagColor: "#34D399",
      image: IMG_SHER,
      description: "Небольшой уютный курорт в Карелии среди сосновых лесов. Идеально для семейного отдыха и первых шагов в горных лыжах.",
      excursions: [
        { name: "Экскурсия на Кижи", price: "3 000 ₽", duration: "6 ч", icon: "Map" },
        { name: "Карельская баня у озера", price: "2 500 ₽", duration: "3 ч", icon: "Flame" },
      ],
      rentals: [
        { name: "Коттедж у леса", price: "5 000 ₽/ночь", beds: 4, icon: "Home" },
        { name: "Гостиница на курорте", price: "2 800 ₽/ночь", beds: 2, icon: "Building2" },
      ],
      trailMap: [
        { name: "Зелёные", color: "#34D399", bgColor: "#0D2B1F", count: 5, lengthKm: "4 км" },
        { name: "Синие", color: "#60A5FA", bgColor: "#0D1B2B", count: 7, lengthKm: "8 км" },
      ],
      webcams: [
        { name: "Главный склон", location: "320 м", url: "#", preview: IMG_SHER },
      ],
      skipasses: [
        { name: "Дневной", price: "1 600 ₽", duration: "1 день", includes: "Все подъёмники", popular: true },
        { name: "Выходного дня", price: "2 800 ₽", duration: "2 дня", includes: "Пт–Вс" },
      ],
      howToGet: [
        { icon: "Car", type: "На автомобиле", from: "Санкт-Петербург", duration: "5 ч", price: "бесплатно", detail: "Трасса Е-105, поворот на Пряжу" },
        { icon: "Train", type: "Поезд", from: "СПб (Ладожский)", duration: "5 ч 30 мин", price: "от 900 ₽", detail: "До Петрозаводска, затем такси 1 ч" },
      ],
    },
  ],
  siberia: [
    {
      id: "sheregesh", name: "Шерегеш", location: "Кемеровская обл.",
      difficulty: 3, popularity: 5, rating: 4.8, runs: 39, liftCount: 18,
      altitude: "440–1270 м", season: "Нояб — Май", tag: "Гик-фрирайд", tagColor: "#A78BFA",
      image: IMG_SHER,
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
      trailMap: [
        { name: "Зелёные", color: "#34D399", bgColor: "#0D2B1F", count: 8, lengthKm: "10 км" },
        { name: "Синие", color: "#60A5FA", bgColor: "#0D1B2B", count: 16, lengthKm: "22 км" },
        { name: "Красные", color: "#F87171", bgColor: "#2B0D0D", count: 15, lengthKm: "20 км" },
      ],
      webcams: [
        { name: "Вершина горы Зелёная", location: "1270 м", url: "#", preview: IMG_SHER },
        { name: "Посёлок Шерегеш", location: "540 м", url: "#", preview: IMG_ROSA },
        { name: "Трасса Б", location: "900 м", url: "#", preview: IMG_ELBRUS },
      ],
      skipasses: [
        { name: "Дневной будни", price: "2 400 ₽", duration: "Пн–Пт", includes: "Все подъёмники 9:00–18:00" },
        { name: "Дневной выходные", price: "2 900 ₽", duration: "Сб–Вс", includes: "Все подъёмники", popular: true },
        { name: "Сезонный", price: "45 000 ₽", duration: "Нояб — Май", includes: "Полный доступ + парковка" },
      ],
      howToGet: [
        { icon: "Plane", type: "Самолёт", from: "Москва (DME)", duration: "4 ч", price: "от 6 500 ₽", detail: "Аэропорт Новокузнецк, 1.5 ч до курорта" },
        { icon: "Train", type: "Поезд", from: "Москва (Казанский)", duration: "48 ч", price: "от 4 200 ₽", detail: "До Новокузнецка, маршрутка 1.5 ч" },
        { icon: "Car", type: "На автомобиле", from: "Новокузнецк", duration: "1 ч 30 мин", price: "бесплатно", detail: "Трасса Р-255, хорошее покрытие" },
      ],
    },
  ],
  moscow: [
    {
      id: "stepanovo", name: "Степаново", location: "Дмитровский р-н",
      difficulty: 2, popularity: 4, rating: 4.3, runs: 14, liftCount: 11,
      altitude: "30–165 м", season: "Дек — Март", tag: "Близко к Москве", tagColor: "#FB923C",
      image: IMG_ROSA,
      description: "Один из крупнейших горнолыжных комплексов Подмосковья. Освещённые трассы для ночного катания, прокат снаряжения, кафе.",
      excursions: [
        { name: "Тюбинг-парк для детей", price: "700 ₽", duration: "2 ч", icon: "Circle" },
        { name: "Ночное катание на лыжах", price: "1 200 ₽", duration: "3 ч", icon: "Moon" },
        { name: "Урок с инструктором", price: "2 500 ₽", duration: "1.5 ч", icon: "Star" },
      ],
      rentals: [
        { name: "Апартаменты на базе", price: "4 500 ₽/ночь", beds: 2, icon: "Building2" },
        { name: "Коттедж в посёлке", price: "8 000 ₽/ночь", beds: 4, icon: "Home" },
      ],
      trailMap: [
        { name: "Зелёные", color: "#34D399", bgColor: "#0D2B1F", count: 5, lengthKm: "3 км" },
        { name: "Синие", color: "#60A5FA", bgColor: "#0D1B2B", count: 6, lengthKm: "5 км" },
        { name: "Красные", color: "#F87171", bgColor: "#2B0D0D", count: 3, lengthKm: "4 км" },
      ],
      webcams: [
        { name: "Главный склон (ночью)", location: "165 м", url: "#", preview: IMG_ROSA },
        { name: "Трасса 3 (освещение)", location: "120 м", url: "#", preview: IMG_SHER },
      ],
      skipasses: [
        { name: "Дневной", price: "1 800 ₽", duration: "8:00–17:00", includes: "Все подъёмники" },
        { name: "Вечерний", price: "1 200 ₽", duration: "17:00–22:00", includes: "Освещённые трассы", popular: true },
        { name: "Суточный", price: "2 500 ₽", duration: "8:00–22:00", includes: "Все подъёмники день+вечер" },
      ],
      howToGet: [
        { icon: "Car", type: "На автомобиле", from: "Москва (МКАД)", duration: "1 ч 20 мин", price: "платная трасса", detail: "Дмитровское шоссе, поворот на Якоть" },
        { icon: "Train", type: "Электричка", from: "Савёловский вокзал", duration: "1 ч 10 мин", price: "от 200 ₽", detail: "До ст. Дмитров, маршрутка 20 мин" },
      ],
    },
    {
      id: "sorochany", name: "Сорочаны", location: "Клинский р-н",
      difficulty: 2, popularity: 3, rating: 4.1, runs: 9, liftCount: 7,
      altitude: "30–140 м", season: "Дек — Март", tag: "Семейный", tagColor: "#34D399",
      image: IMG_SHER,
      description: "Семейный курорт в Клинском районе. Трассы для начинающих и средних лыжников, детские секции, удобная развязка с трассой М10.",
      excursions: [
        { name: "Мастер-класс по слалому", price: "2 000 ₽", duration: "2 ч", icon: "Zap" },
        { name: "Прогулка на снегоступах", price: "1 500 ₽", duration: "2 ч", icon: "Mountain" },
      ],
      rentals: [
        { name: "Номер в гостинице курорта", price: "3 800 ₽/ночь", beds: 2, icon: "Building2" },
        { name: "Дом в СНТ рядом", price: "6 500 ₽/ночь", beds: 5, icon: "Home" },
      ],
      trailMap: [
        { name: "Зелёные", color: "#34D399", bgColor: "#0D2B1F", count: 4, lengthKm: "2.5 км" },
        { name: "Синие", color: "#60A5FA", bgColor: "#0D1B2B", count: 5, lengthKm: "4 км" },
      ],
      webcams: [
        { name: "Склон 1", location: "140 м", url: "#", preview: IMG_SHER },
      ],
      skipasses: [
        { name: "Дневной", price: "1 500 ₽", duration: "1 день", includes: "Все подъёмники", popular: true },
        { name: "Семейный", price: "4 200 ₽", duration: "1 день", includes: "2+2 на все трассы" },
      ],
      howToGet: [
        { icon: "Car", type: "На автомобиле", from: "Москва (МКАД)", duration: "1 ч 40 мин", price: "платная трасса", detail: "Ленинградское шоссе, М-10, поворот Клин" },
        { icon: "Train", type: "Электричка", from: "Ленинградский вокзал", duration: "1 ч 20 мин", price: "от 180 ₽", detail: "До Клина, такси 15 мин" },
      ],
    },
  ],
  spb: [
    {
      id: "igora", name: "Игора", location: "Ленинградская обл.",
      difficulty: 2, popularity: 4, rating: 4.4, runs: 12, liftCount: 8,
      altitude: "40–100 м", season: "Дек — Март", tag: "Лучший в СЗФО", tagColor: "#FFDD2D",
      image: IMG_ROSA,
      description: "Главный горнолыжный курорт Ленинградской области — всесезонный курорт с катком, бассейном и развитой инфраструктурой.",
      excursions: [
        { name: "Ночное катание на склонах", price: "1 500 ₽", duration: "3 ч", icon: "Moon" },
        { name: "Тюбинг и сноубординг", price: "900 ₽", duration: "2 ч", icon: "Circle" },
        { name: "СПА-программа после лыж", price: "4 000 ₽", duration: "3 ч", icon: "Droplets" },
      ],
      rentals: [
        { name: "Номер в отеле Игора", price: "7 500 ₽/ночь", beds: 2, icon: "Building2" },
        { name: "Шале у склона", price: "14 000 ₽/ночь", beds: 4, icon: "Home" },
      ],
      trailMap: [
        { name: "Зелёные", color: "#34D399", bgColor: "#0D2B1F", count: 4, lengthKm: "3 км" },
        { name: "Синие", color: "#60A5FA", bgColor: "#0D1B2B", count: 5, lengthKm: "5 км" },
        { name: "Красные", color: "#F87171", bgColor: "#2B0D0D", count: 3, lengthKm: "4 км" },
      ],
      webcams: [
        { name: "Главный склон Игора", location: "100 м", url: "#", preview: IMG_ROSA },
        { name: "Каток и парк", location: "40 м", url: "#", preview: IMG_SHER },
      ],
      skipasses: [
        { name: "Дневной", price: "2 000 ₽", duration: "1 день", includes: "Все подъёмники", popular: true },
        { name: "Вечерний", price: "1 300 ₽", duration: "16:00–22:00", includes: "Освещённые трассы" },
        { name: "Выходного дня", price: "3 500 ₽", duration: "Сб–Вс", includes: "2 дня + СПА-зона" },
      ],
      howToGet: [
        { icon: "Car", type: "На автомобиле", from: "Санкт-Петербург", duration: "1 ч 10 мин", price: "бесплатно", detail: "Трасса Е-18 (Скандинавия), выезд Першино" },
        { icon: "Bus", type: "Автобус-шатл", from: "м. Парнас, СПб", duration: "1 ч 20 мин", price: "от 300 ₽", detail: "Расписание шатлов на сайте курорта" },
      ],
    },
    {
      id: "tuutari", name: "Туутари-парк", location: "Ломоносовский р-н",
      difficulty: 2, popularity: 3, rating: 4.0, runs: 8, liftCount: 5,
      altitude: "30–80 м", season: "Дек — Март", tag: "Финский стиль", tagColor: "#60A5FA",
      image: IMG_SHER,
      description: "Курорт в финском стиле в 30 км от Петербурга. Компактные трассы, уютная атмосфера, финская сауна и ресторан с видом на склон.",
      excursions: [
        { name: "Экскурсия в усадьбу Кикенберг", price: "2 000 ₽", duration: "3 ч", icon: "Map" },
        { name: "Прокат финских саней", price: "800 ₽", duration: "1 ч", icon: "Wind" },
      ],
      rentals: [
        { name: "Финский коттедж", price: "9 000 ₽/ночь", beds: 6, icon: "Home" },
        { name: "Номер в гостинице", price: "4 500 ₽/ночь", beds: 2, icon: "Building2" },
      ],
      trailMap: [
        { name: "Зелёные", color: "#34D399", bgColor: "#0D2B1F", count: 3, lengthKm: "2 км" },
        { name: "Синие", color: "#60A5FA", bgColor: "#0D1B2B", count: 5, lengthKm: "4 км" },
      ],
      webcams: [
        { name: "Финская сауна и склон", location: "80 м", url: "#", preview: IMG_SHER },
      ],
      skipasses: [
        { name: "Дневной", price: "1 700 ₽", duration: "1 день", includes: "Все подъёмники", popular: true },
        { name: "Семейный", price: "4 500 ₽", duration: "1 день", includes: "2 взр. + 2 дет." },
      ],
      howToGet: [
        { icon: "Car", type: "На автомобиле", from: "Санкт-Петербург", duration: "45 мин", price: "бесплатно", detail: "Петергофское шоссе, поворот на Лопухинку" },
      ],
    },
  ],
  ural: [
    {
      id: "abzakovo", name: "Абзаково", location: "Башкортостан",
      difficulty: 2, popularity: 3, rating: 4.3, runs: 18, liftCount: 9,
      altitude: "450–742 м", season: "Дек — Март", tag: "Рядом с Уфой", tagColor: "#FB923C",
      image: IMG_SHER,
      description: "Популярный уральский курорт с развитой инфраструктурой и доступными ценами. Отличный выбор для первого знакомства с горными лыжами.",
      excursions: [
        { name: "Тюбинг и сноутюбинг", price: "800 ₽", duration: "2 ч", icon: "Circle" },
        { name: "Ночное катание", price: "1 500 ₽", duration: "3 ч", icon: "Moon" },
      ],
      rentals: [
        { name: "Номер в санатории", price: "2 800 ₽/ночь", beds: 2, icon: "Building2" },
        { name: "Коттедж на базе", price: "5 500 ₽/ночь", beds: 4, icon: "Home" },
      ],
      trailMap: [
        { name: "Зелёные", color: "#34D399", bgColor: "#0D2B1F", count: 6, lengthKm: "5 км" },
        { name: "Синие", color: "#60A5FA", bgColor: "#0D1B2B", count: 8, lengthKm: "9 км" },
        { name: "Красные", color: "#F87171", bgColor: "#2B0D0D", count: 4, lengthKm: "6 км" },
      ],
      webcams: [
        { name: "Склон Абзаково", location: "742 м", url: "#", preview: IMG_SHER },
      ],
      skipasses: [
        { name: "Дневной", price: "1 500 ₽", duration: "1 день", includes: "Все подъёмники", popular: true },
        { name: "Ночной", price: "900 ₽", duration: "17:00–22:00", includes: "Освещённые трассы" },
        { name: "Недельный", price: "7 500 ₽", duration: "7 дней", includes: "Все подъёмники" },
      ],
      howToGet: [
        { icon: "Car", type: "На автомобиле", from: "Уфа", duration: "2 ч 30 мин", price: "бесплатно", detail: "Трасса М-5 Урал, поворот на Магнитогорск" },
        { icon: "Train", type: "Поезд", from: "Уфа (ж/д вокзал)", duration: "4 ч", price: "от 600 ₽", detail: "До ст. Белорецк, такси 40 мин" },
      ],
    },
  ],
  fareast: [
    {
      id: "gorny", name: "Горный воздух", location: "Сахалин",
      difficulty: 3, popularity: 3, rating: 4.4, runs: 25, liftCount: 8,
      altitude: "50–601 м", season: "Нояб — Май", tag: "Тихоокеанский снег", tagColor: "#22D3EE",
      image: IMG_ROSA,
      description: "Уникальный курорт у Тихого океана с японским влиянием в кухне и культуре. Снег выпадает раньше и тает позже, чем где-либо в России.",
      excursions: [
        { name: "Японские термальные источники", price: "3 000 ₽", duration: "3 ч", icon: "Droplets" },
        { name: "Рыбалка на Сахалине", price: "5 000 ₽", duration: "6 ч", icon: "Fish" },
      ],
      rentals: [
        { name: "Апартаменты в Ю-Сахалинске", price: "4 000 ₽/ночь", beds: 2, icon: "Home" },
        { name: "Отель у склона", price: "6 500 ₽/ночь", beds: 2, icon: "Building2" },
      ],
      trailMap: [
        { name: "Зелёные", color: "#34D399", bgColor: "#0D2B1F", count: 7, lengthKm: "8 км" },
        { name: "Синие", color: "#60A5FA", bgColor: "#0D1B2B", count: 10, lengthKm: "14 км" },
        { name: "Красные", color: "#F87171", bgColor: "#2B0D0D", count: 8, lengthKm: "11 км" },
      ],
      webcams: [
        { name: "Вершина Горного воздуха", location: "601 м", url: "#", preview: IMG_ROSA },
        { name: "Ю-Сахалинск панорама", location: "50 м", url: "#", preview: IMG_SHER },
      ],
      skipasses: [
        { name: "Дневной", price: "2 100 ₽", duration: "1 день", includes: "Все подъёмники" },
        { name: "Многодневный 3 дня", price: "5 500 ₽", duration: "3 дня", includes: "Все подъёмники", popular: true },
        { name: "Сезонный", price: "35 000 ₽", duration: "Нояб — Май", includes: "Полный доступ" },
      ],
      howToGet: [
        { icon: "Plane", type: "Самолёт", from: "Москва (SVO)", duration: "8 ч 30 мин", price: "от 14 000 ₽", detail: "Аэропорт Южно-Сахалинск, трансфер 20 мин" },
        { icon: "Car", type: "На автомобиле", from: "Южно-Сахалинск", duration: "20 мин", price: "бесплатно", detail: "Курорт находится прямо в черте города" },
      ],
    },
  ],
};

type View = "regions" | "resorts" | "resort";
type ResortTab = "info" | "excursions" | "rental" | "trails" | "webcams" | "skipass" | "howto";

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
      <span style={{ color: "var(--tbank-accent)" }} className="text-sm leading-none">★</span>
      <span className="text-sm font-bold" style={{ color: "var(--tbank-fg)" }}>{rating}</span>
    </span>
  );
}

function PopularityDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5 items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="w-2 h-2 rounded-full"
          style={{ background: i <= level ? "var(--tbank-accent)" : "var(--tbank-border)" }} />
      ))}
    </div>
  );
}

function Snowflakes() {
  const flakes = [
    { left: "8%",  delay: "0s",   dur: "8s",  size: "10px", opacity: 0.6 },
    { left: "20%", delay: "1.5s", dur: "11s", size: "8px",  opacity: 0.4 },
    { left: "35%", delay: "3s",   dur: "9s",  size: "12px", opacity: 0.5 },
    { left: "50%", delay: "0.5s", dur: "13s", size: "7px",  opacity: 0.35 },
    { left: "65%", delay: "2s",   dur: "10s", size: "9px",  opacity: 0.5 },
    { left: "78%", delay: "4s",   dur: "7s",  size: "11px", opacity: 0.45 },
    { left: "90%", delay: "1s",   dur: "12s", size: "8px",  opacity: 0.4 },
  ];
  return (
    <>
      {flakes.map((f, i) => (
        <div
          key={i}
          className="snowflake select-none pointer-events-none"
          style={{
            left: f.left,
            fontSize: f.size,
            opacity: f.opacity,
            animationDuration: f.dur,
            animationDelay: f.delay,
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
}

function AdsBanner() {
  const doubled = [...ADS, ...ADS];
  return (
    <div className="mt-4 overflow-hidden" style={{ mask: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)" }}>
      <div className="flex gap-3 ads-scroll" style={{ width: "max-content" }}>
        {doubled.map((ad, i) => (
          <div
            key={i}
            className="flex-shrink-0 w-44 h-24 rounded-2xl p-3 flex flex-col justify-between cursor-pointer transition-all active:scale-95 relative overflow-hidden"
            style={{ background: ad.color }}
          >
            <div className="absolute inset-0 opacity-20"
              style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.3) 0%, transparent 60%)" }} />
            <span className="text-2xl relative z-10">{ad.emoji}</span>
            <div className="relative z-10">
              <p className="text-xs font-black leading-tight" style={{ color: ad.textColor }}>{ad.title}</p>
              <p className="text-xs mt-0.5 leading-tight opacity-75" style={{ color: ad.textColor }}>{ad.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  const [view, setView] = useState<View>("regions");
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);
  const [activeTab, setActiveTab] = useState<ResortTab>("info");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
  }, [isDark]);

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

  const fg = "var(--tbank-fg)";
  const fg2 = "var(--tbank-fg2)";
  const dark = "var(--tbank-dark)";
  const card = "var(--tbank-card)";
  const card2 = "var(--tbank-card2)";
  const border = "var(--tbank-border)";
  const muted = "var(--tbank-muted)";
  const accent = "var(--tbank-accent)";

  return (
    <div className="min-h-screen font-['Golos_Text',sans-serif] relative" style={{ background: dark, color: fg }}>
      <Snowflakes />

      {/* Header */}
      <div className="sticky top-0 z-50" style={{ background: `${dark}E8`, backdropFilter: "blur(16px)", borderBottom: `1px solid ${border}` }}>
        <div className="max-w-md mx-auto px-4 py-3.5">
          <div className="flex items-center gap-3">
            {view !== "regions" && (
              <button onClick={goBack} className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95" style={{ background: card2, border: `1px solid ${border}` }}>
                <Icon name="ChevronLeft" size={20} style={{ color: fg }} />
              </button>
            )}
            <div className="flex-1">
              {view === "regions" && (
                <div className="flex items-center gap-2">
                  <span className="text-lg">❄️</span>
                  <span className="text-lg font-black tracking-tight" style={{ color: fg }}>СкиРоссия</span>
                </div>
              )}
              {view === "resorts" && (
                <div>
                  <p className="text-xs" style={{ color: muted }}>Регион</p>
                  <h1 className="text-base font-bold" style={{ color: fg }}>
                    {REGIONS.find(r => r.id === selectedRegion)?.name}
                  </h1>
                </div>
              )}
              {view === "resort" && (
                <div>
                  <p className="text-xs" style={{ color: muted }}>Курорт</p>
                  <h1 className="text-base font-bold" style={{ color: fg }}>{selectedResort?.name}</h1>
                </div>
              )}
            </div>

            {/* Theme toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all active:scale-95"
              style={{ background: card2, border: `1px solid ${border}` }}
              title={isDark ? "Светлая тема" : "Тёмная тема"}
            >
              <Icon name={isDark ? "Sun" : "Moon"} size={17} style={{ color: accent }} />
            </button>

            {view === "regions" && (
              <button className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: card2, border: `1px solid ${border}` }}>
                <Icon name="Bell" size={18} style={{ color: fg }} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 pb-24">

        {/* ─── REGIONS VIEW ─── */}
        {view === "regions" && (
          <div className="animate-slide-up">
            {/* Hero */}
            <div
              className="mt-4 rounded-2xl relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #0A2040 0%, #0D3060 50%, #0F4080 100%)",
                border: "1px solid rgba(77,184,255,0.2)",
                boxShadow: "0 0 40px rgba(77,184,255,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              {/* Ice crystal overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{ background: "radial-gradient(ellipse at 80% 20%, rgba(77,184,255,0.6) 0%, transparent 60%)" }} />
              <div className="absolute top-0 right-0 bottom-0 w-1/2 flex items-center justify-center text-8xl select-none"
                style={{ opacity: 0.15, transform: "rotate(-15deg) scale(1.2)" }}>
                ❄️
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(77,184,255,0.5), transparent)" }} />
              <div className="relative z-10 p-5">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--tbank-accent)" }} />
                  <p className="text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--tbank-accent)" }}>
                    Сезон 2024–2025 · Открыт
                  </p>
                </div>
                <h2 className="text-2xl font-black leading-tight text-white">
                  Горнолыжные<br />
                  <span style={{ color: "var(--tbank-accent)" }}>курорты</span> России
                </h2>
                <p className="text-sm mt-2 font-medium" style={{ color: "rgba(180,210,255,0.7)" }}>
                  12 курортов · 7 регионов · от −5°C до −25°C
                </p>
                <div className="mt-3 flex gap-2">
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: "rgba(77,184,255,0.15)", color: "var(--tbank-accent)", border: "1px solid rgba(77,184,255,0.25)" }}>
                    🏔 Кавказ
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: "rgba(77,184,255,0.15)", color: "var(--tbank-accent)", border: "1px solid rgba(77,184,255,0.25)" }}>
                    🌲 Сибирь
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full font-semibold"
                    style={{ background: "rgba(77,184,255,0.15)", color: "var(--tbank-accent)", border: "1px solid rgba(77,184,255,0.25)" }}>
                    ❄ СЗФО
                  </span>
                </div>
              </div>
            </div>

            {/* Ads scroll */}
            <AdsBanner />

            {/* Search */}
            <div className="mt-4 relative">
              <Icon name="Search" size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: muted }} />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Поиск региона..."
                className="w-full pl-9 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={{ background: card, border: `1px solid ${border}`, color: fg }}
              />
            </div>

            {/* Stats */}
            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                { label: "Курортов", value: "12+", icon: "Mountain" },
                { label: "Трасс", value: "340+", icon: "GitBranch" },
                { label: "Подъёмников", value: "100+", icon: "ArrowUp" },
              ].map((stat) => (
                <div key={stat.label} className="rounded-xl p-3 text-center ice-glow" style={{ background: card, border: `1px solid ${border}` }}>
                  <Icon name={stat.icon} size={16} className="mx-auto mb-1.5" style={{ color: accent }} />
                  <p className="text-lg font-black" style={{ color: fg }}>{stat.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: muted }}>{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Region cards */}
            <h3 className="text-xs font-semibold mt-6 mb-3 tracking-wider" style={{ color: muted }}>ВЫБЕРИТЕ РЕГИОН</h3>
            <div className="space-y-3">
              {filteredRegions.map((region) => (
                <button
                  key={region.id}
                  onClick={() => handleRegionClick(region.id)}
                  className="w-full rounded-2xl p-4 text-left transition-all active:scale-[0.98] hover-lift"
                  style={{ background: card, border: `1px solid ${border}` }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0" style={{ background: card2 }}>
                      {region.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold" style={{ color: fg }}>{region.name}</p>
                      <p className="text-sm mt-0.5 truncate" style={{ color: muted }}>{region.description}</p>
                    </div>
                    <div className="flex flex-col items-end gap-2 flex-shrink-0">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap"
                        style={{ background: "rgba(77,184,255,0.12)", color: accent }}>
                        {region.resortCount} курорта
                      </span>
                      <Icon name="ChevronRight" size={16} style={{ color: muted }} />
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
                  style={{ border: `1px solid ${border}` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={resort.image} alt={resort.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,20,24,0.95) 0%, transparent 50%)" }} />
                    <div className="absolute top-3 left-3">
                      <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: resort.tagColor, color: resort.tagColor === "#FFDD2D" ? "#1A1400" : "#fff" }}>
                        {resort.tag}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <div className="px-2 py-1 rounded-full flex items-center gap-1"
                        style={{ background: "rgba(18,20,24,0.7)", backdropFilter: "blur(8px)" }}>
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
                  <div className="p-4" style={{ background: card }}>
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-xs mb-1.5" style={{ color: muted }}>Сложность</p>
                        <DifficultyBadge level={resort.difficulty} />
                      </div>
                      <div>
                        <p className="text-xs mb-1.5" style={{ color: muted }}>Популярность</p>
                        <PopularityDots level={resort.popularity} />
                      </div>
                      <div className="text-right">
                        <p className="text-xs mb-1.5" style={{ color: muted }}>Трасс</p>
                        <p className="text-sm font-bold" style={{ color: fg }}>{resort.runs}</p>
                      </div>
                    </div>
                    <div className="w-full py-2.5 rounded-xl text-sm font-bold text-center"
                      style={{ background: "linear-gradient(135deg, #1A6FA8 0%, #4DB8FF 100%)", color: "#fff" }}>
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
            <div className="mt-4 rounded-2xl overflow-hidden relative h-56">
              <img src={selectedResort.image} alt={selectedResort.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(18,20,24,0.92) 0%, transparent 45%)" }} />
              <div className="absolute top-3 left-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full"
                  style={{ background: selectedResort.tagColor, color: selectedResort.tagColor === "#FFDD2D" ? "#1A1400" : "#fff" }}>
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
                  <div className="px-2.5 py-1.5 rounded-full flex items-center gap-1"
                    style={{ background: "rgba(18,20,24,0.7)", backdropFilter: "blur(8px)" }}>
                    <StarRating rating={selectedResort.rating} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 grid grid-cols-4 gap-2">
              {[
                { label: "Трасс", value: String(selectedResort.runs) },
                { label: "Подъёмн.", value: String(selectedResort.liftCount) },
                { label: "Высота", value: selectedResort.altitude },
                { label: "Сезон", value: selectedResort.season },
              ].map((s) => (
                <div key={s.label} className="rounded-xl p-2.5 text-center" style={{ background: card, border: `1px solid ${border}` }}>
                  <p className="text-xs font-bold leading-tight" style={{ color: fg }}>{s.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: muted }}>{s.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-3 rounded-2xl p-4 flex items-center gap-4" style={{ background: card, border: `1px solid ${border}` }}>
              <div className="flex-1">
                <p className="text-xs mb-2" style={{ color: muted }}>Уровень трасс</p>
                <DifficultyBadge level={selectedResort.difficulty} />
              </div>
              <div className="w-px h-8" style={{ background: border }} />
              <div className="flex-1">
                <p className="text-xs mb-2" style={{ color: muted }}>Популярность</p>
                <PopularityDots level={selectedResort.popularity} />
              </div>
              <div className="w-px h-8" style={{ background: border }} />
              <div>
                <p className="text-xs mb-2" style={{ color: muted }}>Рейтинг</p>
                <StarRating rating={selectedResort.rating} />
              </div>
            </div>

            {/* Tabs row 1 */}
            <div className="mt-4 rounded-2xl p-1 flex gap-1" style={{ background: card, border: `1px solid ${border}` }}>
              {(["info", "excursions", "rental"] as ResortTab[]).map((tab) => {
                const labels: Record<string, string> = { info: "О курорте", excursions: "Экскурсии", rental: "Жильё" };
                const icons: Record<string, string> = { info: "Info", excursions: "Compass", rental: "Home" };
                const isActive = activeTab === tab;
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="flex-1 py-2.5 px-2 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1.5"
                    style={{ background: isActive ? "linear-gradient(135deg, #1A6FA8, #4DB8FF)" : "transparent", color: isActive ? "#fff" : muted }}>
                    <Icon name={icons[tab]} size={13} />
                    {labels[tab]}
                  </button>
                );
              })}
            </div>

            {/* Tabs row 2 */}
            <div className="mt-2 rounded-2xl p-1 flex gap-1" style={{ background: card, border: `1px solid ${border}` }}>
              {(["trails", "webcams", "skipass", "howto"] as ResortTab[]).map((tab) => {
                const labels: Record<string, string> = { trails: "Трассы", webcams: "Камеры", skipass: "Скипасс", howto: "Как добраться" };
                const icons: Record<string, string> = { trails: "GitBranch", webcams: "Video", skipass: "Ticket", howto: "Navigation" };
                const isActive = activeTab === tab;
                return (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className="flex-1 py-2.5 px-1 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-1"
                    style={{ background: isActive ? "linear-gradient(135deg, #1A6FA8, #4DB8FF)" : "transparent", color: isActive ? "#fff" : muted }}>
                    <Icon name={icons[tab]} size={12} />
                    <span className="truncate">{labels[tab]}</span>
                  </button>
                );
              })}
            </div>

            {/* Info */}
            {activeTab === "info" && (
              <div className="mt-4 space-y-3 animate-fade-in">
                <div className="rounded-2xl p-4" style={{ background: card, border: `1px solid ${border}` }}>
                  <h4 className="font-bold mb-2" style={{ color: fg }}>О курорте</h4>
                  <p className="text-sm leading-relaxed" style={{ color: fg2 }}>{selectedResort.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl p-4" style={{ background: card, border: `1px solid ${border}` }}>
                    <Icon name="TrendingUp" size={20} style={{ color: accent }} />
                    <p className="font-bold mt-2 text-sm" style={{ color: fg }}>{selectedResort.altitude}</p>
                    <p className="text-xs mt-0.5" style={{ color: muted }}>Перепад высот</p>
                  </div>
                  <div className="rounded-2xl p-4" style={{ background: card, border: `1px solid ${border}` }}>
                    <Icon name="Calendar" size={20} style={{ color: "#60A5FA" }} />
                    <p className="font-bold mt-2 text-sm" style={{ color: fg }}>{selectedResort.season}</p>
                    <p className="text-xs mt-0.5" style={{ color: muted }}>Горнолыжный сезон</p>
                  </div>
                </div>
                <button className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, #0F5FA0 0%, #4DB8FF 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(77,184,255,0.25)" }}>
                  Забронировать поездку
                </button>
              </div>
            )}

            {/* Excursions */}
            {activeTab === "excursions" && (
              <div className="mt-4 space-y-3 animate-fade-in">
                {selectedResort.excursions.map((exc: Excursion, i: number) => (
                  <div key={i} className="rounded-2xl p-4 flex items-center gap-4" style={{ background: card, border: `1px solid ${border}` }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(77,184,255,0.1)" }}>
                      <Icon name={exc.icon} size={20} style={{ color: accent }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-tight" style={{ color: fg }}>{exc.name}</p>
                      <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: muted }}>
                        <Icon name="Clock" size={11} />{exc.duration}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-sm" style={{ color: fg }}>{exc.price}</p>
                      <p className="text-xs" style={{ color: muted }}>с чел.</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, #0F5FA0 0%, #4DB8FF 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(77,184,255,0.25)" }}>
                  Все экскурсии
                </button>
              </div>
            )}

            {/* Rental */}
            {activeTab === "rental" && (
              <div className="mt-4 space-y-3 animate-fade-in">
                {selectedResort.rentals.map((rent: Rental, i: number) => (
                  <div key={i} className="rounded-2xl p-4 flex items-center gap-4" style={{ background: card, border: `1px solid ${border}` }}>
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(77,184,255,0.08)" }}>
                      <Icon name={rent.icon} size={20} style={{ color: accent }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm leading-tight" style={{ color: fg }}>{rent.name}</p>
                      <p className="text-xs mt-0.5 flex items-center gap-1" style={{ color: muted }}>
                        <Icon name="Users" size={11} />до {rent.beds} гостей
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="font-bold text-sm" style={{ color: fg }}>{rent.price}</p>
                    </div>
                  </div>
                ))}
                <button className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, #0F5FA0 0%, #4DB8FF 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(77,184,255,0.25)" }}>
                  Найти жильё
                </button>
              </div>
            )}

            {/* Trail Map */}
            {activeTab === "trails" && (
              <div className="mt-4 animate-fade-in space-y-3">
                {/* Visual trail map placeholder */}
                <div className="rounded-2xl overflow-hidden relative" style={{ background: "linear-gradient(160deg, #0A2040 0%, #0D3A60 100%)", border: `1px solid ${border}`, height: 180 }}>
                  <div className="absolute inset-0 flex items-center justify-center flex-col gap-2">
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
                      <span className="text-xs font-bold" style={{ color: accent }}>{selectedResort.name}</span>
                      <span className="text-xs" style={{ color: muted }}>{selectedResort.altitude}</span>
                    </div>
                    {/* Схематичные трассы */}
                    <svg width="240" height="100" viewBox="0 0 240 100" className="opacity-70">
                      <path d="M120,5 Q90,30 70,55 Q55,70 40,90" stroke="#34D399" strokeWidth="3" fill="none" strokeLinecap="round"/>
                      <path d="M120,5 Q115,35 105,60 Q95,75 80,90" stroke="#60A5FA" strokeWidth="3" fill="none" strokeLinecap="round"/>
                      <path d="M120,5 Q130,30 140,55 Q148,72 155,90" stroke="#60A5FA" strokeWidth="3" fill="none" strokeLinecap="round"/>
                      <path d="M120,5 Q145,25 165,50 Q178,65 190,90" stroke="#F87171" strokeWidth="3" fill="none" strokeLinecap="round"/>
                      <path d="M120,5 Q155,20 185,40 Q205,55 215,90" stroke="#CBD5E1" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeDasharray="6,3"/>
                      <circle cx="120" cy="5" r="5" fill="#FFDD2D"/>
                      <text x="125" y="9" fill="#FFDD2D" fontSize="8" fontWeight="bold">{selectedResort.altitude.split('–')[1]}</text>
                    </svg>
                    <p className="text-xs" style={{ color: muted }}>Схема трасс курорта</p>
                  </div>
                </div>

                {/* Trail zones */}
                <div className="space-y-2">
                  {selectedResort.trailMap.map((zone: TrailZone, i: number) => (
                    <div key={i} className="rounded-xl p-3 flex items-center gap-3" style={{ background: card, border: `1px solid ${border}` }}>
                      <div className="w-3 h-10 rounded-full flex-shrink-0" style={{ background: zone.color }} />
                      <div className="flex-1">
                        <p className="font-semibold text-sm" style={{ color: fg }}>{zone.name} трассы</p>
                        <p className="text-xs mt-0.5" style={{ color: muted }}>{zone.lengthKm} суммарно</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-black" style={{ color: zone.color }}>{zone.count}</p>
                        <p className="text-xs" style={{ color: muted }}>трасс</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="rounded-xl p-3 flex items-center justify-between" style={{ background: card, border: `1px solid ${border}` }}>
                  <span className="text-sm font-bold" style={{ color: fg }}>Итого трасс</span>
                  <span className="text-xl font-black" style={{ color: accent }}>{selectedResort.runs}</span>
                </div>
                <button className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, #0F5FA0 0%, #4DB8FF 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(77,184,255,0.25)" }}>
                  Скачать карту трасс PDF
                </button>
              </div>
            )}

            {/* Webcams */}
            {activeTab === "webcams" && (
              <div className="mt-4 animate-fade-in space-y-3">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-semibold" style={{ color: muted }}>ПРЯМОЙ ЭФИР</span>
                </div>
                {selectedResort.webcams.map((cam: Webcam, i: number) => (
                  <div key={i} className="rounded-2xl overflow-hidden" style={{ border: `1px solid ${border}` }}>
                    <div className="relative h-36 overflow-hidden">
                      <img src={cam.preview} alt={cam.name} className="w-full h-full object-cover" style={{ filter: "brightness(0.7)" }} />
                      <div className="absolute inset-0 flex flex-col justify-between p-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full" style={{ background: "rgba(220,38,38,0.85)" }}>
                            <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            <span className="text-white text-xs font-bold">LIVE</span>
                          </div>
                          <span className="text-xs px-2 py-1 rounded-full" style={{ background: "rgba(0,0,0,0.6)", color: "#fff" }}>{cam.location}</span>
                        </div>
                        <div>
                          <p className="text-white font-bold text-sm">{cam.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: "rgba(255,255,255,0.6)" }}>{selectedResort.name}</p>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: "rgba(77,184,255,0.25)", border: "2px solid rgba(77,184,255,0.5)" }}>
                          <Icon name="Play" size={20} style={{ color: "#fff" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <p className="text-xs text-center" style={{ color: muted }}>Камеры обновляются каждые 30 секунд</p>
              </div>
            )}

            {/* Skipass */}
            {activeTab === "skipass" && (
              <div className="mt-4 animate-fade-in space-y-3">
                {selectedResort.skipasses.map((sp: Skipass, i: number) => (
                  <div key={i} className="rounded-2xl p-4 relative overflow-hidden"
                    style={{ background: sp.popular ? "linear-gradient(135deg, #0F3D6A 0%, #174E87 100%)" : card, border: sp.popular ? "1px solid rgba(77,184,255,0.4)" : `1px solid ${border}` }}>
                    {sp.popular && (
                      <div className="absolute top-3 right-3">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: accent, color: "#0A0F1E" }}>
                          Популярный
                        </span>
                      </div>
                    )}
                    {sp.popular && (
                      <div className="absolute inset-0 opacity-10" style={{ background: "radial-gradient(ellipse at top left, rgba(77,184,255,0.6), transparent 60%)" }} />
                    )}
                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="font-bold" style={{ color: fg }}>{sp.name}</p>
                          <p className="text-xs mt-0.5" style={{ color: muted }}>{sp.duration}</p>
                        </div>
                        <p className="text-xl font-black" style={{ color: sp.popular ? accent : fg }}>{sp.price}</p>
                      </div>
                      <p className="text-xs" style={{ color: muted }}>{sp.includes}</p>
                      <button className="mt-3 w-full py-2.5 rounded-xl text-sm font-bold transition-all active:scale-[0.98]"
                        style={{ background: sp.popular ? "linear-gradient(135deg, #0F5FA0, #4DB8FF)" : "rgba(77,184,255,0.1)", color: sp.popular ? "#fff" : accent, boxShadow: sp.popular ? "0 4px 16px rgba(77,184,255,0.25)" : "none" }}>
                        Купить скипасс
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* How To Get */}
            {activeTab === "howto" && (
              <div className="mt-4 animate-fade-in space-y-3">
                {selectedResort.howToGet.map((route: HowToGet, i: number) => (
                  <div key={i} className="rounded-2xl p-4" style={{ background: card, border: `1px solid ${border}` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: "rgba(77,184,255,0.1)" }}>
                        <Icon name={route.icon} size={18} style={{ color: accent }} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm" style={{ color: fg }}>{route.type}</p>
                        <p className="text-xs" style={{ color: muted }}>из: {route.from}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="rounded-xl p-2.5" style={{ background: "rgba(77,184,255,0.06)", border: `1px solid ${border}` }}>
                        <p className="text-xs" style={{ color: muted }}>Время в пути</p>
                        <p className="text-sm font-bold mt-0.5" style={{ color: fg }}>{route.duration}</p>
                      </div>
                      <div className="rounded-xl p-2.5" style={{ background: "rgba(77,184,255,0.06)", border: `1px solid ${border}` }}>
                        <p className="text-xs" style={{ color: muted }}>Стоимость</p>
                        <p className="text-sm font-bold mt-0.5" style={{ color: accent }}>{route.price}</p>
                      </div>
                    </div>
                    <p className="text-xs leading-relaxed" style={{ color: muted }}>{route.detail}</p>
                  </div>
                ))}
                <button className="w-full py-4 rounded-2xl font-bold text-base transition-all active:scale-[0.98]"
                  style={{ background: "linear-gradient(135deg, #0F5FA0 0%, #4DB8FF 100%)", color: "#fff", boxShadow: "0 4px 20px rgba(77,184,255,0.25)" }}>
                  Построить маршрут
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 z-50" style={{ background: `${dark}F0`, backdropFilter: "blur(16px)", borderTop: `1px solid ${border}` }}>
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="grid grid-cols-4 gap-1">
            {[
              { icon: "Mountain", label: "Курорты", active: true },
              { icon: "Map", label: "Карта", active: false },
              { icon: "Heart", label: "Избранное", active: false },
              { icon: "User", label: "Профиль", active: false },
            ].map((item) => (
              <button key={item.label} className="flex flex-col items-center gap-1 py-1 transition-all active:scale-95">
                <Icon name={item.icon} size={22} style={{ color: item.active ? accent : muted }} />
                <span className="text-xs font-medium" style={{ color: item.active ? accent : muted }}>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}