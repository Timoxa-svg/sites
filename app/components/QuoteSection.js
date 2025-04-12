import { motion } from "framer-motion";

export default function QuoteSection({ quote }) {
  return (
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
          {quote.text}
        </h3>
        <motion.span
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-5xl text-cyan-400 font-playfair inline-block ml-2"
        >
          "
        </motion.span>
        <p className="text-gray-200 text-lg mt-4 font-inter">— {quote.author}</p>
      </motion.div>
    </section>
  );
}