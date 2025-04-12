import './styles/globals.css'; // Исправленный путь
import { Inter, Playfair_Display, Roboto_Mono } from 'next/font/google';

// Инициализация шрифтов
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
});

// Метаданные для приложения
export const metadata = {
  title: 'Tecnobot - Премиум чат-боты для бизнеса',
  description: 'Tecnobot - премиум решения для автоматизации бизнеса с помощью Telegram-ботов.',
};

// Корневой layout
export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} ${playfair.variable} ${robotoMono.variable}`}>
        {children}
      </body>
    </html>
  );
}