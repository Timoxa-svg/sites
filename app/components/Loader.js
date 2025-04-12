import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Loader({ onLoadingComplete }) {
  const [isLoading, setIsLoading] = useState(true);
  const text = "Tecnobot";

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      if (onLoadingComplete) onLoadingComplete();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-gray-950 to-gray-900"
          aria-busy="true"
          aria-label="Страница загружается"
        >
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative flex">
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-playfair"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(34, 211, 238, 0.5))",
                  }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                    ease: "easeOut",
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.div
              className="absolute flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              {text.split("").map((char, index) => (
                <motion.span
                  key={index}
                  className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600 font-playfair"
                  initial={{ opacity: 1, filter: "blur(0px)" }}
                  animate={{
                    opacity: 0,
                    y: -20,
                    filter: "blur(10px)",
                    scale: 1.1,
                    transition: {
                      duration: 0.8,
                      delay: 1.5 + index * 0.05,
                      ease: "easeOut",
                    },
                  }}
                >
                  {char}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}