"use client";

import { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircleIcon, ChevronRightIcon, ClockIcon, SparklesIcon, UsersIcon } from "@heroicons/react/24/solid";

export default function ChatBotDevelopment() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    telegram: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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

    try {
      const response = await fetch("/api/send-to-telegram", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setIsSuccess(true);
        setSubmitMessage("Заявка успешно отправлена!");
        setFormData({ name: "", phone: "", telegram: "", message: "" });
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      } else {
        setSubmitMessage("Ошибка при отправке заявки.");
      }
    } catch (error) {
      setSubmitMessage("Ошибка при отправке заявки.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const features = [
    { 
      title: "Индивидуальный подход", 
      description: "Каждый бот создаётся с учётом уникальных потребностей вашего бизнеса.", 
      icon: <UsersIcon className="w-8 h-8 text-cyan-400" /> 
    },
    { 
      title: "Быстрая разработка", 
      description: "Создаём бота за 1-3 недели, чтобы вы могли начать автоматизацию как можно скорее.", 
      icon: <ClockIcon className="w-8 h-8 text-cyan-400" /> 
    },
    { 
      title: "Полная поддержка", 
      description: "Предоставляем обучение и поддержку после запуска бота для вашего успеха.", 
      icon: <SparklesIcon className="w-8 h-8 text-cyan-400" /> 
    },
  ];

  const processSteps = [
    { step: "Анализ потребностей", description: "Мы изучаем ваш бизнес и определяем, как бот может помочь." },
    { step: "Разработка прототипа", description: "Создаём прототип бота и согласовываем его с вами." },
    { step: "Финальная разработка", description: "Дорабатываем бота и интегрируем его в ваш бизнес." },
    { step: "Запуск и поддержка", description: "Запускаем бота и оказываем поддержку на всех этапах." },
  ];

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800">
      <Head>
        <title>Разработка чат-ботов под ключ - Tecnobot</title>
        <meta name="description" content="Профессиональная разработка Telegram-ботов под ключ для автоматизации бизнеса." />
        <meta name="keywords" content="разработка чат-ботов, Telegram боты, автоматизация бизнеса, Tecnobot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      {/* Навигация */}
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
                href={item === "Главная" ? "/" : `/${item.toLowerCase().replace(/\s+/g, "-")}`}
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

      {/* Геройская секция */}
      <section className="relative py-24 lg:py-32 px-6 lg:px-12 max-w-7xl mx-auto z-10">
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-40 -z-10" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-tl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-40 -z-10" />
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl lg:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-6 font-playfair text-center tracking-tight"
        >
          Разработка чат-ботов под ключ
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-300 text-lg lg:text-xl text-center mb-12 font-inter max-w-3xl mx-auto leading-relaxed"
        >
          Мы создаём Telegram-ботов премиум-класса, которые автоматизируют ваш бизнес, увеличивают продажи и экономят ваше время.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center"
        >
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.8)" }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-cyan-500/60 transition-all font-inter"
          >
            Заказать бота
          </motion.button>
        </motion.div>
      </section>

      {/* Секция "Что мы предлагаем" */}
      <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-900/70 to-gray-800/70">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-12 font-playfair text-center tracking-tight"
        >
          Что мы предлагаем
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative bg-gray-800/50 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-cyan-500/30 group hover:shadow-cyan-500/50 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-cyan-400/15 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
              <div className="flex items-center mb-4">
                {feature.icon}
                <h3 className="text-2xl font-semibold text-white ml-4 font-playfair">{feature.title}</h3>
              </div>
              <p className="text-gray-300 font-inter leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Секция "Процесс разработки" */}
      <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/70 to-gray-900/70">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-12 font-playfair text-center tracking-tight"
        >
          Процесс разработки
        </motion.h2>
        <div className="space-y-8">
          {processSteps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-8`}
            >
              <div className="lg:w-1/2">
                <h3 className="text-2xl font-semibold text-white mb-2 font-playfair">{step.step}</h3>
                <p className="text-gray-300 font-inter leading-relaxed">{step.description}</p>
              </div>
              <motion.div
                className="lg:w-1/2 h-40 bg-gray-800/50 backdrop-blur-2xl rounded-2xl border border-cyan-500/30 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-cyan-400 text-3xl font-playfair">{index + 1}</span>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Секция "Заказать бота" */}
      <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-900/70 to-gray-800/70">
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-40 -z-10" />
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-12 font-playfair text-center tracking-tight"
        >
          Заказать бота
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-gray-800/50 backdrop-blur-2xl rounded-2xl p-8 shadow-2xl border border-cyan-500/30 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/15 to-cyan-400/15 rounded-2xl blur-xl opacity-50 -z-10" />
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
                    <p className="text-white text-lg mt-4 font-inter">Заявка успешно отправлена!</p>
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
      </section>

      {/* Футер */}
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