import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

export default function Footer() {
  const linkVariants = {
    hover: { x: 10, color: "#22D3EE", transition: { duration: 0.3 } },
  };

  const iconVariants = {
    hover: { scale: 1.2, transition: { duration: 0.3 } },
  };

  return (
    <footer className="relative py-16 px-6 lg:px-12 bg-gray-950 text-gray-200 z-10 border-t border-cyan-500/30">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-start gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/3"
        >
          <div className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent font-playfair">
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
          {[
            { href: "/about", label: "О нас" },
            { href: "/кейсы", label: "Кейсы" },
            { href: "/блог", label: "Блог" },
            { href: "/контакты", label: "Контакты" },
          ].map((link) => (
            <motion.div key={link.href} whileHover="hover" variants={linkVariants}>
              <Link href={link.href} className="flex items-center font-inter">
                <ChevronRightIcon className="w-4 h-4 mr-2" /> {link.label}
              </Link>
            </motion.div>
          ))}
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
            {[
              { href: "https://t.me/tecnobot", icon: "telegram" },
              { href: "https://instagram.com/tecnobot", icon: "instagram" },
            ].map((social) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover="hover"
                variants={iconVariants}
                className="text-gray-400 hover:text-cyan-300 transition-colors"
              >
                {social.icon === "telegram" ? (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.896 17.294c-.356.998-1.942 1.497-2.982.873l-1.92-1.413c-.84-.618-1.664-.43-2.173.124l-.84.827c-.31.305-.72.472-1.156.472-.856 0-1.576-.67-1.576-1.576v-1.89c0-.905.735-1.64 1.64-1.64h2.22c.505 0 .966.246 1.24.648l1.414-1.414c-.618-.84-.43-1.664.124-2.173l1.413-1.92c.624-1.04 1.976-1.626 2.982-.873l.305.228c1.006.752 1.24 2.13.548 3.135l-2.13 3.104 2.13 3.104c.692 1.005.458 2.383-.548 3.135l-.305.228z" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8c4.14 0 7.2 3.06 7.2 7.2s-3.06 7.2-7.2 7.2-7.2-3.06-7.2-7.2 3.06-7.2 7.2-7.2zm0 11.88c2.64 0 4.8-2.16 4.8-4.8s-2.16-4.8-4.8-4.8-4.8 2.16-4.8 4.8 2.16 4.8 4.8 4.8zm5.28-9.48c0 .66-.54 1.2-1.2 1.2s-1.2-.54-1.2-1.2.54-1.2 1.2-1.2 1.2.54 1.2 1.2z" />
                  </svg>
                )}
              </motion.a>
            ))}
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
  );
}