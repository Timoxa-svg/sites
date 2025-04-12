import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "../data/content";

export default function CaseStudiesSection() {
  const [currentCaseStudy, setCurrentCaseStudy] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentCaseStudy((prev) => (prev + 1) % caseStudies.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/70 to-gray-900/70">
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl lg:text-5xl font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-12 font-playfair text-left tracking-tight"
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
          <motion.div
            className="lg:w-1/2"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={caseStudies[currentCaseStudy].image}
              alt={caseStudies[currentCaseStudy].title}
              width={600}
              height={400}
              className="w-full h-80 object-cover rounded-2xl border border-cyan-500/30 shadow-2xl hover:shadow-cyan-500/50 transition-all duration-300"
              loading="lazy"
            />
          </motion.div>
          <div className="lg:w-1/2">
            <h3 className="text-3xl font-semibold text-white font-playfair mb-4">{caseStudies[currentCaseStudy].title}</h3>
            <p className="text-gray-200 font-inter mb-6 leading-relaxed">{caseStudies[currentCaseStudy].description}</p>
            <div className="grid grid-cols-2 gap-4">
              {caseStudies[currentCaseStudy].stats.map((stat, index) => (
                <motion.div
                  key={index}
                  className="bg-gray-800/50 backdrop-blur-2xl rounded-xl p-4 border border-cyan-500/30 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-cyan-400 font-inter">{stat.label}</p>
                  <p className="text-white text-lg font-semibold font-playfair">{stat.value}</p>
                </motion.div>
              ))}
            </div>
            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href={`/case-studies/${currentCaseStudy}`}>
                <button className="bg-gradient-primary text-white px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:shadow-cyan-500/60 transition-all font-inter">
                  Подробнее
                </button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-center mt-8">
        {caseStudies.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentCaseStudy(index)}
            className={`w-3 h-3 rounded-full mx-1 ${
              currentCaseStudy === index ? "bg-cyan-400" : "bg-gray-500"
            } hover:bg-cyan-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  );
}