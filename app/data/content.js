import {
  CheckCircleIcon,
  ClockIcon,
  UsersIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

export const stats = [
  { number: 150, unit: "+", description: "Реализованных проектов", icon: <CheckCircleIcon className="w-12 h-12 text-cyan-400" /> },
  { number: 3, unit: "недели", description: "Максимальный срок разработки", icon: <ClockIcon className="w-12 h-12 text-cyan-400" /> },
  { number: 2022, unit: "", description: "Работаем с этого года", icon: <UsersIcon className="w-12 h-12 text-cyan-400" /> },
];

export const chartDataRevenue = [
  { name: "1 месяц", revenue: 50 },
  { name: "2 месяц", revenue: 150 },
  { name: "3 месяц", revenue: 300 },
];

export const testimonials = [
  { name: "Анна Ковалёва", role: "Владелец интернет-магазина", text: "Бот увеличил мои продажи на 30%! Клиенты теперь заказывают прямо в Telegram.", avatar: "/avatars/anna.jpg", rating: 5 },
  { name: "Роман Одуванов", role: "Дизайнер", text: "У нас было 300 участников и каждому надо было выдать именной сертификат, не знаю как бы без бота мы справились, спасибо вам", avatar: "/avatars/roman.jpg", rating: 5 },
  { name: "Мария Петрова", role: "Руководитель образовательного центра", text: "Автоматизация тестов и уведомлений сэкономила нам кучу времени!", avatar: "/avatars/maria.jpg", rating: 4 },
];

export const caseStudies = [
  {
    title: "Интернет-магазин одежды",
    description: "Автоматизировали процесс заказов и увеличили конверсию на 40%.",
    image: "/case-studies/clothing-store.jpg",
    stats: [
      { label: "Рост продаж", value: "+40%" },
      { label: "Срок разработки", value: "2 недели" },
    ],
  },
  {
    title: "Фитнес-клуб",
    description: "Создали бота для записи на тренировки, что сократило время администратора на 70%.",
    image: "/case-studies/fitness-club.jpg",
    stats: [
      { label: "Экономия времени", value: "70%" },
      { label: "Срок разработки", value: "10 дней" },
    ],
  },
];

export const quotes = [
  { text: "Чат-боты — это будущее автоматизации. Мы делаем это будущее доступным уже сегодня.", author: "Команда Tecnobot" },
  { text: "Автоматизация должна быть простой, но мощной. Tecnobot воплощает это в жизнь.", author: "Роман Одуванов, клиент" },
];

export const benefits = [
  { title: "Экономия времени", description: "Автоматизация рутинных задач позволяет сосредоточиться на главном.", icon: <ClockIcon className="w-8 h-8 text-cyan-400" /> },
  { title: "Рост продаж", description: "Чат-боты увеличивают конверсию и удержание клиентов.", icon: <SparklesIcon className="w-8 h-8 text-cyan-400" /> },
  { title: "Простота интеграции", description: "Наши решения легко интегрируются в ваш бизнес.", icon: <CheckCircleIcon className="w-8 h-8 text-cyan-400" /> },
];