import { motion } from "framer-motion";

export default function GradientButton({ children, className = "", ...props }) {
  return (
    <motion.button
      whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(34, 211, 238, 0.8)" }}
      whileTap={{ scale: 0.95 }}
      className={`bg-gradient-primary text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-cyan-500/60 transition-all font-inter focus:ring-2 focus:ring-cyan-500 focus:outline-none ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}