import { motion } from "framer-motion";
import { stats } from "../data/content";

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.8, delay: i * 0.2, ease: "easeOut" },
  }),
};

export default function StatsSection() {
  return (
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
          <h2 className="text-4xl lg:text-5xl font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-6 font-playfair tracking-tight">
            Почему мы?
          </h2>
          <p className="text-gray-200 text-lg mb-8 font-inter leading-relaxed">
            Мы создаём решения, которые выделяют ваш бизнес на рынке и помогают вам расти с помощью передовых технологий.
          </p>
          <motion.div
            className="w-24 h-1 bg-gradient-primary rounded-full"
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
              <motion.div whileHover={{ scale: 1.1, rotate: 5 }} className="mb-4">
                {stat.icon}
              </motion.div>
              <h3 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2 font-playfair">
                {stat.number} <span className="text-lg text-gray-200">{stat.unit}</span>
              </h3>
              <p className="text-gray-200 font-inter leading-relaxed">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}