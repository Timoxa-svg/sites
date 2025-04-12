"use client";

import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircleIcon,
  StarIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ClockIcon,
  UsersIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const Particles = dynamic(() => import("react-tsparticles").then((mod) => mod.default), { ssr: false });
const loadStarsPreset = dynamic(() => import("tsparticles-preset-stars").then((mod) => mod.loadStarsPreset), { ssr: false });
const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), { ssr: false });

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const phrases = ["вашего бизнеса", "увеличения продаж", "автоматизации задач"];
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    telegram: "",
    message: "",
    file: null,
  });
  const [formErrors, setFormErrors] = useState({});
  const [formProgress, setFormProgress] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0);

  useEffect(() => {
    setIsClient(true);
    const phraseInterval = setInterval(() => {
      setCurrentPhrase((prev) => (prev + 1) % phrases.length);
    }, 3000);
    const testimonialInterval = setInterval(() => {
      if (!isTestimonialPaused) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);
    const caseStudyInterval = setInterval(() => {
      setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length);
    }, 7000);
    return () => {
      clearInterval(phraseInterval);
      clearInterval(testimonialInterval);
      clearInterval(caseStudyInterval);
    };
  }, [phrases.length, isTestimonialPaused]);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
    calculateProgress();
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Имя обязательно";
    if (!formData.phone.trim()) {
      errors.phone = "Номер телефона обязателен";
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      errors.phone = "Некорректный номер телефона";
    }
    if (!formData.message.trim()) errors.message = "Сообщение обязательно";
    if (formData.file && formData.file.size > 5 * 1024 * 1024) {
      errors.file = "Файл не должен превышать 5 МБ";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const calculateProgress = () => {
    let filledFields = 0;
    if (formData.name.trim()) filledFields++;
    if (formData.phone.trim()) filledFields++;
    if (formData.telegram.trim()) filledFields++;
    if (formData.message.trim()) filledFields++;
    if (formData.file) filledFields++;
    setFormProgress((filledFields / 5) * 100);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitMessage("");

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("phone", formData.phone);
    formDataToSend.append("telegram", formData.telegram);
    formDataToSend.append("message", formData.message);
    if (formData.file) formDataToSend.append("file", formData.file);

    try {
      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSuccess(true);
        setSubmitMessage("Анкета успешно отправлена!");
        setFormData({ name: "", phone: "", telegram: "", message: "", file: null });
        setFormProgress(0);
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        setSubmitMessage("Ошибка при отправке анкеты.");
      }
    } catch (error) {
      setSubmitMessage("Ошибка при отправке анкеты.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const phraseVariants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const renderTextWithSpaces = (text) => {
    return text.split("").map((char, index) => (
      <motion.span
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="inline-block"
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, delay: i * 0.2, ease: "easeOut" },
    }),
  };

  const stats = [
    { number: 150, unit: "+", description: "Реализованных проектов", icon: <CheckCircleIcon className="w-12 h-12 text-cyan-400" /> },
    { number: 3, unit: "недели", description: "Максимальный срок разработки", icon: <ClockIcon className="w-12 h-12 text-cyan-400" /> },
    { number: 2022, unit: "", description: "Работаем с этого года", icon: <UsersIcon className="w-12 h-12 text-cyan-400" /> },
  ];

  const chartDataRevenue = [
    { name: "1 месяц", revenue: 50 },
    { name: "2 месяц", revenue: 150 },
    { name: "3 месяц", revenue: 300 },
  ];

  const testimonials = [
    { name: "Анна Ковалёва", role: "Владелец интернет-магазина", text: "Бот увеличил мои продажи на 30%! Клиенты теперь заказывают прямо в Telegram.", avatar: "/avatars/anna.jpg", rating: 5 },
    { name: "Роман Одуванов", role: "Дизайнер", text: "У нас было 300 участников и каждому надо было выдать именной сертификат, не знаю как бы без бота мы справились, спасибо вам", avatar: "/avatars/roman.jpg", rating: 5 },
    { name: "Мария Петрова", role: "Руководитель образовательного центра", text: "Автоматизация тестов и уведомлений сэкономила нам кучу времени!", avatar: "/avatars/maria.jpg", rating: 4 },
  ];

  const caseStudies = [
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

  const quotes = [
    { text: "Чат-боты — это будущее автоматизации. Мы делаем это будущее доступным уже сегодня.", author: "Команда Tecnobot" },
    { text: "Автоматизация должна быть простой, но мощной. Tecnobot воплощает это в жизнь.", author: "Роман Одуванов, клиент" },
  ];

  const benefits = [
    { title: "Экономия времени", description: "Автоматизация рутинных задач позволяет сосредоточиться на главном.", icon: <ClockIcon className="w-8 h-8 text-cyan-400" /> },
    { title: "Рост продаж", description: "Чат-боты увеличивают конверсию и удержание клиентов.", icon: <SparklesIcon className="w-8 h-8 text-cyan-400" /> },
    { title: "Простота интеграции", description: "Наши решения легко интегрируются в ваш бизнес.", icon: <CheckCircleIcon className="w-8 h-8 text-cyan-400" /> },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800">
      <Head>
        <title>Tecnobot - Премиум чат-боты для бизнеса</title>
        <meta name="description" content="Tecnobot - премиум решения для автоматизации бизнеса с помощью Telegram-ботов. Увеличиваем продажи и экономим ваше время." />
        <meta name="keywords" content="премиум чат-боты, Telegram боты, автоматизация бизнеса, разработка ботов, Tecnobot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Tecnobot - Премиум чат-боты для бизнеса" />
        <meta property="og:description" content="Автоматизируем бизнес-процессы с помощью Telegram-ботов премиум-класса. Увеличиваем продажи и экономим ваше время." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://tecnobot.ru" />
        <meta name="twitter:card" content="summary_large_image" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Частицы с улучшенной анимацией */}
      {isClient && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2 }}
        >
          <Particles
            id="tsparticles"
            init={loadStarsPreset}
            options={{
              preset: "stars",
              background: { color: "transparent" },
              particles: {
                number: { value: 150 },
                move: { speed: 1 },
                size: { value: { min: 1, max: 5 } },
                opacity: { value: { min: 0.3, max: 1 }, animation: { enable: true, speed: 2 } },
              },
            }}
            className="absolute inset-0 z-0"
          />
        </motion.div>
      )}

      {/* Навигация с эффектом свечения */}
      <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-2xl shadow-xl py-4 px-6 lg:px-12 flex justify-between items-center border-b border-cyan-500/30">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-playfair"
        >
          <Link href="/">Tecnobot</Link>
        </motion.div>
<ul className="hidden lg:flex space-x-10 items-center">
  {["Главная", "Разработка чат-ботов под ключ", "Кейсы", "Блог", "Контакты"].map((item, index) => (
    <motion.li
      key={item}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link
        href={
          item === "Главная"
            ? "/"
            : item === "Разработка чат-ботов под ключ"
            ? "/chat-bot-development"
            : `/${item.toLowerCase().replace(/\s+/g, "-")}`
        }
        className="text-gray-200 hover:text-cyan-300 font-medium transition-colors duration-300 font-inter relative group"
      >
        {item}
        <motion.div
          className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400"
          initial={{ scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      </Link>
    </motion.li>
  ))}
</ul>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.8)" }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-cyan-500/60 transition-all font-medium font-inter"
        >
          Заказать бота
        </motion.button>
      </nav>

      {/* Геройская секция с асимметричным расположением */}
      <section className="relative py-24 lg:py-40 px-6 lg:px-12 max-w-7xl mx-auto z-10">
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-40 -z-10" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-tl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-40 -z-10" />
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white font-playfair leading-tight tracking-tight">
              Боты для{" "}
              <motion.span
                key={currentPhrase}
                variants={phraseVariants}
                initial="initial"
                animate="animate"
                className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent inline-block"
                style={{ whiteSpace: "nowrap" }}
              >
                {renderTextWithSpaces(phrases[currentPhrase])}
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-300 text-lg sm:text-xl mt-6 mb-8 font-inter max-w-md leading-relaxed"
            >
              Автоматизируем бизнес-процессы, увеличиваем продажи и экономим ваше время с помощью Telegram-ботов премиум-класса.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.8)" }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-cyan-500/60 transition-all font-inter"
              >
                Заказать бота
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border border-cyan-400 text-cyan-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-400/15 transition-all font-inter"
              >
                Узнать больше
              </motion.button>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:w-1/2 flex justify-end relative"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full blur-3xl opacity-25 -z-10"
                animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.35, 0.25] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Player loop autoplay src="/animations/telegram-bot.json" style={{ height: 450, width: 450 }} />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <ChevronDownIcon className="w-12 h-12 text-cyan-400 animate-bounce" />
        </motion.div>
      </section>

      {/* Секция "Почему мы?" с асимметричным расположением */}
      <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-900/70 to-gray-800/70">
        <div className="absolute top-0 left-0 w-1/4 h-1/3 bg-gradient-to-br from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="flex flex-col lg:flex-row items-start gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/3"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 font-playfair tracking-tight">
              Почему мы?
            </h2>
            <p className="text-gray-300 text-lg mb-8 font-inter leading-relaxed">
              Мы создаём решения, которые выделяют ваш бизнес на рынке и помогают вам расти с помощью передовых технологий.
            </p>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </motion.div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                variants={cardVariants}
                viewport={{ once: true }}
                className="relative bg-gray-800/50 backdrop-blur-2xl rounded-2xl p-6 text-left shadow-2xl hover:shadow-cyan-500/50 transition-all duration-500 border border-cyan-500/30 group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-cyan-400/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="mb-4"
                >
                  {stat.icon}
                </motion.div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2 font-playfair">
                  {stat.number} <span className="text-lg text-gray-300">{stat.unit}</span>
                </h3>
                <p className="text-gray-300 font-inter leading-relaxed">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Секция "Преимущества" с волнообразным расположением */}
      <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/70 to-gray-900/70">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-12 font-playfair text-right tracking-tight"
        >
          Преимущества работы с нами
        </motion.h2>
        <div className="space-y-16">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
            >
              <div className="lg:w-1/2">
                <div className="flex items-center mb-4">
                  {benefit.icon}
                  <h3 className="text-2xl font-semibold text-white ml-4 font-playfair">{benefit.title}</h3>
                </div>
                <p className="text-gray-300 font-inter leading-relaxed">{benefit.description}</p>
              </div>
              <motion.div
                className="lg:w-1/2 h-48 bg-gray-800/50 backdrop-blur-2xl rounded-2xl border border-cyan-500/30 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Здесь можно добавить изображение или анимацию, связанную с преимуществом */}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Секция "Чат-бот — это выгодно!" с центрированным контентом */}
      <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-900/70 to-gray-800/70">
        <div className="absolute top-0 left-0 w-1/2 h-1/3 bg-gradient-to-br from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-tl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 font-playfair text-center tracking-tight"
        >
          Чат-бот — это выгодно!
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-gray-300 text-lg lg:text-xl text-center mb-12 font-inter max-w-3xl mx-auto leading-relaxed"
        >
          Доход наших клиентов растёт в среднем на 200% за 3 месяца после внедрения чат-бота.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="relative w-full max-w-4xl mx-auto h-[350px] bg-gray-800/50 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-cyan-500/30"
        >
          {isClient ? (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartDataRevenue} margin={{ top: 40, right: 40, left: 40, bottom: 40 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.9} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.7} />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
                      <feBlend in="SourceGraphic" in2="glow" mode="screen" />
                    </filter>
                  </defs>
                  <XAxis dataKey="name" stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 14 }} />
                  <YAxis stroke="#9CA3AF" tick={{ fill: "#9CA3AF", fontSize: 14 }} />
                  <Tooltip contentStyle={{ backgroundColor: "#1F2937", border: "none", borderRadius: "8px", color: "#fff" }} />
                  <Line
                    type="monotone"
                    dataKey="revenue"
                    stroke="url(#colorRevenue)"
                    strokeWidth={5}
                    dot={{ r: 8, fill: "#22D3EE", stroke: "#3B82F6", strokeWidth: 3, filter: "url(#glow)" }}
                    activeDot={false}
                    animationDuration={2000}
                    animationEasing="ease-in-out"
                    filter="url(#glow)"
                  />
                </LineChart>
              </ResponsiveContainer>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="absolute bottom-12 left-8 bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 shadow-2xl max-w-[180px] text-gray-200 text-sm border border-cyan-500/30 font-inter"
              >
                <p className="text-cyan-400">Зачем мне нужен чат-бот?</p>
                <div className="absolute bottom-[-10px] left-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[10px] border-t-gray-800" />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="absolute top-8 right-8 bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 shadow-2xl max-w-[220px] text-gray-200 text-sm border border-cyan-500/30 font-inter"
              >
                <p className="text-cyan-400">Конверсия увеличилась на 200%!</p>
                <div className="absolute top-[-10px] right-10 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-b-[10px] border-b-gray-800" />
              </motion.div>
            </>
          ) : (
            <div className="w-full h-[350px] flex items-center justify-center text-gray-300 font-inter">
              График загружается... Доход вырос с 50 тыс. руб. до 300 тыс. руб.
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-cyan-500/60 transition-all font-inter"
          >
            Заказать чат-бота
          </motion.button>
        </motion.div>
      </section>

      {/* Секция "Кейсы" с асимметричным расположением */}
      <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/70 to-gray-900/70">
        <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-12 font-playfair text-left tracking-tight"
        >
          Наши кейсы
        </motion.h2>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCaseStudy}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col lg:flex-row items-start gap-12"
          >
            <div className="lg:w-1/2">
              <Image
                src={caseStudies[currentCaseStudy].image}
                alt={caseStudies[currentCaseStudy].title}
                width={600}
                height={400}
                className="w-full h-80 object-cover rounded-2xl border border-cyan-500/30 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
                loading="lazy"
              />
            </div>
            <div className="lg:w-1/2">
              <h3 className="text-3xl font-semibold text-white font-playfair mb-4">{caseStudies[currentCaseStudy].title}</h3>
              <p className="text-gray-300 font-inter mb-6 leading-relaxed">{caseStudies[currentCaseStudy].description}</p>
              <div className="grid grid-cols-2 gap-4">
                {caseStudies[currentCaseStudy].stats.map((stat, index) => (
                  <div key={index} className="bg-gray-800/50 backdrop-blur-2xl rounded-xl p-4 border border-cyan-500/30 shadow-lg">
                    <p className="text-cyan-400 font-inter">{stat.label}</p>
                    <p className="text-white text-lg font-semibold font-playfair">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="flex justify-center mt-8">
          {caseStudies.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => setCurrentCaseStudy(index)}
              className={`w-3 h-3 rounded-full mx-1 ${currentCaseStudy === index ? "bg-cyan-400" : "bg-gray-500"} hover:bg-cyan-300 transition-colors duration-300`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
          ))}
        </div>
      </section>

      {/* Секция "Цитата 1" с центрированным контентом */}
      <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-900/70 to-gray-800/70">
        <div className="absolute top-0 left-0 w-1/4 h-1/3 bg-gradient-to-br from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/3 bg-gradient-to-tl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl text-cyan-400 font-playfair inline-block mr-2"
          >
            "
          </motion.span>
          <h3 className="text-3xl lg:text-4xl font-semibold text-white italic font-playfair inline leading-relaxed">
            {quotes[0].text}
          </h3>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl text-cyan-400 font-playfair inline-block ml-2"
          >
            "
          </motion.span>
          <p className="text-gray-300 text-lg mt-4 font-inter">
            — {quotes[0].author}
          </p>
        </motion.div>
      </section>

      {/* Секция "Отзывы клиентов" с асимметричным расположением */}
      <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/70 to-gray-900/70">
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="flex flex-col lg:flex-row items-start gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 font-playfair tracking-tight">
              Отзывы наших клиентов
            </h2>
            <p className="text-gray-300 text-lg font-inter mb-8 leading-relaxed">
              Узнайте, что говорят те, кто уже доверил нам автоматизацию своего бизнеса.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                onMouseEnter={() => setIsTestimonialPaused(true)}
                onMouseLeave={() => setIsTestimonialPaused(false)}
                className="relative bg-gray-800/50 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl border border-cyan-500/30 group hover:shadow-cyan-500/50 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-cyan-400/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonials[currentTestimonial].avatar}
                    alt={testimonials[currentTestimonial].name}
                    width={56}
                    height={56}
                    className="w-14 h-14 rounded-full mr-4 object-cover border-2 border-cyan-500/50 shadow-lg"
                    loading="lazy"
                  />
                  <div>
                    <h3 className="text-xl font-semibold text-white font-playfair">{testimonials[currentTestimonial].name}</h3>
                    <p className="text-gray-400 text-sm font-inter">{testimonials[currentTestimonial].role}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-cyan-400" />
                  ))}
                </div>
                <p className="text-gray-300 font-inter italic leading-relaxed">"{testimonials[currentTestimonial].text}"</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex justify-center mt-6">
              {testimonials.map((_, index) => (
                <motion.button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  onMouseEnter={() => setIsTestimonialPaused(true)}
                  onMouseLeave={() => setIsTestimonialPaused(false)}
                  className={`w-3 h-3 rounded-full mx-1 ${currentTestimonial === index ? "bg-cyan-400" : "bg-gray-500"} hover:bg-cyan-300 transition-colors duration-300`}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Секция "Цитата 2" с центрированным контентом */}
      <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-900/70 to-gray-800/70">
        <div className="absolute top-0 left-0 w-1/4 h-1/3 bg-gradient-to-br from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="absolute bottom-0 right-0 w-1/4 h-1/3 bg-gradient-to-tl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl text-cyan-400 font-playfair inline-block mr-2"
          >
            "
          </motion.span>
          <h3 className="text-3xl lg:text-4xl font-semibold text-white italic font-playfair inline leading-relaxed">
            {quotes[1].text}
          </h3>
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-5xl text-cyan-400 font-playfair inline-block ml-2"
          >
            "
          </motion.span>
          <p className="text-gray-300 text-lg mt-4 font-inter">
            — {quotes[1].author}
          </p>
        </motion.div>
      </section>

      {/* Секция "Свяжитесь с нами" с асимметричным расположением */}
      <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/70 to-gray-900/70" id="contact-form">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
        <div className="flex flex-col lg:flex-row items-start gap-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 font-playfair tracking-tight">
              Свяжитесь с нами
            </h2>
            <p className="text-gray-300 text-lg font-inter mb-8 leading-relaxed">
              Заполните форму, и мы свяжемся с вами в кратчайшие сроки для обсуждения вашего проекта.
            </p>
            <motion.div
              className="w-24 h-1 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:w-1/2 max-w-xl"
          >
            <div className="bg-gray-800/50 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl border border-cyan-500/30 relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-cyan-400/15 rounded-2xl blur-xl opacity-50 -z-10" />
              <div className="mb-6">
                <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${formProgress}%` }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                <p className="text-gray-400 text-sm mt-2 font-inter">Прогресс заполнения: {Math.round(formProgress)}%</p>
              </div>
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 flex items-center justify-center bg-gray-900/90 rounded-2xl z-50"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
                      transition={{ duration: 1.5 }}
                      className="flex flex-col items-center"
                    >
                      <CheckCircleIcon className="w-16 h-16 text-cyan-400" />
                      <p className="text-white text-lg mt-4 font-inter">Анкета успешно отправлена!</p>
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              <form onSubmit={handleFormSubmit}>
                <div className="mb-6">
                  <label htmlFor="name" className="block text-gray-200 font-semibold mb-2 font-inter">
                    Имя
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    whileFocus={{ scale: 1.02, borderColor: "#22D3EE" }}
                    className={`w-full px-4 py-3 bg-gray-700/50 text-gray-200 rounded-xl border ${formErrors.name ? "border-red-500" : "border-cyan-500/30"} focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-inter`}
                    required
                  />
                  {formErrors.name && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center font-inter"
                    >
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      {formErrors.name}
                    </motion.p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="phone" className="block text-gray-200 font-semibold mb-2 font-inter">
                    Номер телефона
                  </label>
                  <motion.input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleFormChange}
                    whileFocus={{ scale: 1.02, borderColor: "#22D3EE" }}
                    className={`w-full px-4 py-3 bg-gray-700/50 text-gray-200 rounded-xl border ${formErrors.phone ? "border-red-500" : "border-cyan-500/30"} focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-inter`}
                    required
                  />
                  {formErrors.phone && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center font-inter"
                    >
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      {formErrors.phone}
                    </motion.p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="telegram" className="block text-gray-200 font-semibold mb-2 font-inter">
                    Telegram (опционально)
                  </label>
                  <motion.input
                    type="text"
                    id="telegram"
                    name="telegram"
                    value={formData.telegram}
                    onChange={handleFormChange}
                    whileFocus={{ scale: 1.02, borderColor: "#22D3EE" }}
                    className="w-full px-4 py-3 bg-gray-700/50 text-gray-200 rounded-xl border border-cyan-500/30 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-inter"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-gray-200 font-semibold mb-2 font-inter">
                    Какой у вас запрос?
                  </label>
                  <motion.textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleFormChange}
                    whileFocus={{ scale: 1.02, borderColor: "#22D3EE" }}
                    className={`w-full px-4 py-3 bg-gray-700/50 text-gray-200 rounded-xl border ${formErrors.message ? "border-red-500" : "border-cyan-500/30"} focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-inter`}
                    rows="5"
                    required
                  />
                  {formErrors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center font-inter"
                    >
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      {formErrors.message}
                    </motion.p>
                  )}
                </div>
                <div className="mb-6">
                  <label htmlFor="file" className="block text-gray-200 font-semibold mb-2 font-inter">
                    Прикрепить файл (до 5 МБ)
                  </label>
                  <motion.input
                    type="file"
                    id="file"
                    name="file"
                    onChange={handleFormChange}
                    whileFocus={{ scale: 1.02, borderColor: "#22D3EE" }}
                    className={`w-full px-4 py-3 bg-gray-700/50 text-gray-200 rounded-xl border ${formErrors.file ? "border-red-500" : "border-cyan-500/30"} focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-inter file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-cyan-500 file:text-white hover:file:bg-cyan-600`}
                  />
                  {formErrors.file && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center font-inter"
                    >
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      {formErrors.file}
                    </motion.p>
                  )}
                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(34, 211, 238, 0.8)" }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-4 py-3 rounded-full font-semibold shadow-lg hover:shadow-cyan-500/60 transition-all font-inter ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? "Отправка..." : "Отправить"}
                </motion.button>
                {submitMessage && !isSuccess && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`mt-4 text-center ${submitMessage.includes("успешно") ? "text-green-400" : "text-red-400"} font-inter`}
                  >
                    {submitMessage}
                  </motion.p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Футер с улучшенным дизайном */}
      <footer className="relative py-16 px-6 lg:px-12 bg-gray-950 text-gray-300 z-10 border-t border-cyan-500/30">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:w-1/3"
          >
            <div className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent font-playfair">
              Tecnobot
            </div>
            <p className="text-gray-400 mt-4 font-inter leading-relaxed">
              Мы создаём премиум чат-боты для автоматизации вашего бизнеса, помогая вам расти и достигать новых высот.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:w-1/3 flex flex-col gap-4"
          >
            <h3 className="text-xl font-semibold text-white font-playfair">Навигация</h3>
            <Link href="/about" className="hover:text-cyan-300 transition-colors font-inter flex items-center">
              <ChevronRightIcon className="w-4 h-4 mr-2" /> О нас
            </Link>
            <Link href="/кейсы" className="hover:text-cyan-300 transition-colors font-inter flex items-center">
              <ChevronRightIcon className="w-4 h-4 mr-2" /> Кейсы
            </Link>
            <Link href="/блог" className="hover:text-cyan-300 transition-colors font-inter flex items-center">
              <ChevronRightIcon className="w-4 h-4 mr-2" /> Блог
            </Link>
            <Link href="/контакты" className="hover:text-cyan-300 transition-colors font-inter flex items-center">
              <ChevronRightIcon className="w-4 h-4 mr-2" /> Контакты
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:w-1/3"
          >
            <h3 className="text-xl font-semibold text-white font-playfair">Связаться с нами</h3>
            <p className="text-gray-400 mt-4 font-inter">info@tecnobot.ru</p>
            <p className="text-gray-400 font-inter">+7 (999) 123-45-67</p>
            <div className="flex space-x-4 mt-4">
              <a href="https://t.me/tecnobot" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.896 17.294c-.356.998-1.942 1.497-2.982.873l-1.92-1.413c-.84-.618-1.664-.43-2.173.124l-.84.827c-.31.305-.72.472-1.156.472-.856 0-1.576-.67-1.576-1.576v-1.89c0-.905.735-1.64 1.64-1.64h2.22c.505 0 .966.246 1.24.648l1.414-1.414c-.618-.84-.43-1.664.124-2.173l1.413-1.92c.624-1.04 1.976-1.626 2.982-.873l.305.228c1.006.752 1.24 2.13.548 3.135l-2.13 3.104 2.13 3.104c.692 1.005.458 2.383-.548 3.135l-.305.228z" />
                </svg>
              </a>
              <a href="https://instagram.com/tecnobot" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-300 transition-colors">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8c4.14 0 7.2 3.06 7.2 7.2s-3.06 7.2-7.2 7.2-7.2-3.06-7.2-7.2 3.06-7.2 7.2-7.2zm0 11.88c2.64 0 4.8-2.16 4.8-4.8s-2.16-4.8-4.8-4.8-4.8 2.16-4.8 4.8 2.16 4.8 4.8 4.8zm5.28-9.48c0 .66-.54 1.2-1.2 1.2s-1.2-.54-1.2-1.2.54-1.2 1.2-1.2 1.2.54 1.2 1.2z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-12 font-inter text-gray-400"
        >
          © 2025 Tecnobot. Все права защищены.
        </motion.p>
      </footer>
    </div>
  );
}