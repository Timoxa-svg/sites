"use client";

import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";
import StatsSection from "./components/StatsSection";
import BenefitsSection from "./components/BenefitsSection";
import RevenueSection from "./components/RevenueSection";
import CaseStudiesSection from "./components/CaseStudiesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import QuoteSection from "./components/QuoteSection";
import ContactFormSection from "./components/ContactFormSection";
import Footer from "./components/Footer";
import GradientButton from "./components/GradientButton";
import Loader from "./components/Loader"; // Импортируем новый компонент
import { quotes } from "./data/content";

const Particles = dynamic(() => import("react-tsparticles").then((mod) => mod.default), { ssr: false });
const loadStarsPreset = dynamic(() => import("tsparticles-preset-stars").then((mod) => mod.loadStarsPreset), { ssr: false });

export default function Home() {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Новое состояние для загрузки
  const prefersReducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    setIsClient(true);
  }, []);

  const particleOptions = prefersReducedMotion
    ? { preset: "stars", particles: { number: { value: 20 }, move: { speed: 0.5 } } }
    : { preset: "stars", particles: { number: { value: 50 }, move: { speed: 1 } } };

  // Функция, которая вызывается, когда загрузка завершена
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-900 to-gray-800">
      <Head>
        <title>Tecnobot - Премиум чат-боты для бизнеса</title>
        <meta name="description" content="Tecnobot - премиум решения для автоматизации бизнеса с помощью Telegram-ботов. Увеличиваем продажи и экономим ваше время." />
        <meta name="keywords" content="премиум чат-боты, Telegram боты, автоматизация бизнеса, разработка ботов, Tecnobot" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Tecnobot - Премиум чат-боты для бизнеса" />
        <meta property="og:description" content="Автоматизируем бизнес-процессы с помощью Telegram-ботов премиум-класса. Увеличиваем продажи и экономим ваше время." />
        <meta property="og:image" content="/og-image.jpg" />
        <meta property="og:url" content="https://tecnobot.ru" />
        <meta name="twitter:card" content="summary_large_image" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@300;400;600&family=Roboto+Mono:wght@400;700&display=swap" rel="stylesheet" />
      </Head>

      {/* Добавляем Loader */}
      <Loader onLoadingComplete={handleLoadingComplete} />

      {/* Основной контент отображается только после завершения загрузки */}
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isClient && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }}>
              <Particles
                id="tsparticles"
                init={loadStarsPreset}
                options={particleOptions}
                className="absolute inset-0 z-0"
              />
            </motion.div>
          )}

          <nav className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-2xl shadow-xl py-4 px-6 lg:px-12 flex justify-between items-center border-b border-cyan-500/30">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent font-playfair"
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
                    className="text-gray-200 hover:text-cyan-300 font-medium transition-colors duration-300 font-inter relative group focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  >
                    {item}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-primary"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.li>
              ))}
            </ul>
            <GradientButton className="text-base px-6 py-3">Заказать бота</GradientButton>
          </nav>

          <HeroSection />
          <StatsSection />
          <BenefitsSection />
          <RevenueSection />
          <CaseStudiesSection />
          <QuoteSection quote={quotes[0]} />
          <TestimonialsSection />
          <QuoteSection quote={quotes[1]} />
          <ContactFormSection />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}