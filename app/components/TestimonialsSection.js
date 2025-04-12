import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/24/solid";
import { testimonials } from "../data/content";

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTestimonialPaused, setIsTestimonialPaused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTestimonialPaused) {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [isTestimonialPaused]);

  return (
    <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-800/70 to-gray-900/70">
      <motion.div
        className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10"
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <div className="flex flex-col lg:flex-row items-start gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="lg:w-1/2"
        >
          <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-6 font-playfair tracking-tight">
            Отзывы наших клиентов
          </h2>
          <p className="text-gray-200 text-lg font-inter mb-8 leading-relaxed">
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
              whileHover={{ y: -10 }}
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
                  <StarIcon key={i} className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                ))}
              </div>
              <p className="text-gray-200 font-inter italic leading-relaxed">"{testimonials[currentTestimonial].text}"</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex justify-center mt-6">
            {testimonials.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                onMouseEnter={() => setIsTestimonialPaused(true)}
                onMouseLeave={() => setIsTestimonialPaused(false)}
                className={`w-3 h-3 rounded-full mx-1 ${
                  currentTestimonial === index ? "bg-cyan-400" : "bg-gray-500"
                } hover:bg-cyan-300 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}