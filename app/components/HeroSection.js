import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Head from "next/head";
import GradientButton from "./GradientButton";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Player = dynamic(() => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player), { ssr: false });

const phrases = ["вашего бизнеса", "увеличения продаж", "автоматизации задач"];

export default function HeroSection() {
  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isPhrasePaused, setIsPhrasePaused] = useState(false);
  const [typedText, setTypedText] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPhrasePaused) {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isPhrasePaused]);

  // Эффект печатной машинки
  useEffect(() => {
    const text = phrases[currentPhrase];
    let index = 0;
    setTypedText("");
    const typeInterval = setInterval(() => {
      if (index < text.length) {
        setTypedText((prev) => prev + text[index]);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, 100);
    return () => clearInterval(typeInterval);
  }, [currentPhrase]);

  // Функция для плавной прокрутки к форме
  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Инициализация частиц
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <>
      <Head>
        <title>Создание премиум Telegram-ботов для бизнеса | Tecnobot</title>
        <meta
          name="description"
          content="Автоматизируйте бизнес-процессы и увеличьте продажи с помощью Telegram-ботов премиум-класса от Tecnobot. Закажите бота прямо сейчас!"
        />
        <meta name="keywords" content="Telegram-боты, автоматизация бизнеса, чат-боты, Tecnobot, увеличение продаж" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Создание премиум Telegram-ботов для бизнеса | Tecnobot" />
        <meta
          property="og:description"
          content="Автоматизируйте бизнес-процессы и увеличьте продажи с помощью Telegram-ботов премиум-класса от Tecnobot."
        />
        <meta property="og:image" content="/images/hero-image.jpg" />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <section className="relative py-24 lg:py-40 px-6 lg:px-12 max-w-7xl mx-auto z-10">
        {/* Частицы на фоне */}
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: { color: { value: "transparent" } },
            fpsLimit: 120,
            interactivity: {
              events: {
                onHover: { enable: true, mode: "repulse" },
                onClick: { enable: true, mode: "push" },
                resize: true,
              },
              modes: {
                repulse: { distance: 100, duration: 0.4 },
                push: { quantity: 4 },
              },
            },
            particles: {
              color: { value: "#22D3EE" },
              links: { color: "#22D3EE", distance: 150, enable: true, opacity: 0.3, width: 1 },
              collisions: { enable: true },
              move: {
                direction: "none",
                enable: true,
                outModes: { default: "bounce" },
                random: false,
                speed: 1,
                straight: false,
              },
              number: { density: { enable: true, area: 800 }, value: 80 },
              opacity: { value: 0.5 },
              shape: { type: "circle" },
              size: { value: { min: 1, max: 5 } },
            },
            detectRetina: true,
          }}
          className="absolute inset-0 z-0"
        />
        <div className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-40 -z-10" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-tl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-40 -z-10" />
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1 }} className="lg:w-1/2">
            <h1
              className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white font-playfair leading-tight tracking-tight"
              onMouseEnter={() => setIsPhrasePaused(true)}
              onMouseLeave={() => setIsPhrasePaused(false)}
            >
              Боты для{" "}
              <motion.span
                className="bg-gradient-primary bg-clip-text text-transparent inline-block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {typedText}
                <span className="animate-blink">|</span>
              </motion.span>
            </h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-gray-200 text-lg sm:text-xl mt-6 mb-8 font-inter max-w-md leading-relaxed"
            >
              Автоматизируем бизнес-процессы, увеличиваем продажи и экономим ваше время с помощью Telegram-ботов премиум-класса.
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4">
              <GradientButton
                onClick={scrollToForm}
                className="animate-pulse-slow"
              >
                Заказать бота
              </GradientButton>
              <motion.button
                onClick={scrollToForm}
                whileHover={{ scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
                className="border border-cyan-400 text-cyan-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-cyan-400/15 transition-all font-inter focus:ring-2 focus:ring-cyan-500 focus:outline-none"
              >
                Узнать больше
              </motion.button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: 50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="lg:w-1/2 flex justify-end relative"
          >
            <div className="relative">
              <motion.div
                className="absolute inset-0 bg-gradient-primary rounded-full blur-3xl opacity-25 -z-10"
                animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.35, 0.25] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <Player
                loop
                autoplay
                src="/animations/telegram-bot.json"
                style={{ height: 450, width: 450 }}
                aria-label="Анимация Telegram-бота для автоматизации бизнеса"
              />
            </div>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex justify-center mt-12"
        >
          <button onClick={scrollToForm}>
            <ChevronDownIcon className="w-12 h-12 text-cyan-400 animate-bounce cursor-pointer" />
          </button>
        </motion.div>
      </section>
    </>
  );
}