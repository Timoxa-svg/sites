import { motion } from "framer-motion";
import { benefits } from "../data/content";

export default function BenefitsSection() {
  return (
    <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/70 to-gray-900/70">
      <div className="absolute bottom-0 right-0 w-1/3 h-1/2 bg-gradient-to-tl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10" />
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl lg:text-5xl font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-12 font-playfair text-right tracking-tight"
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
              <p className="text-gray-200 font-inter leading-relaxed">{benefit.description}</p>
            </div>
            <motion.div
              className="lg:w-1/2 h-48 bg-gray-800/50 backdrop-blur-2xl rounded-2xl border border-cyan-500/30 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}