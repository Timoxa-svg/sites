import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import GradientButton from "./GradientButton";
import { chartDataRevenue } from "../data/content";

export default function RevenueSection() {
  const [isClient, setIsClient] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Подготовка данных для SVG
  const data = chartDataRevenue;
  const width = 800;
  const height = 350;
  const padding = 40;
  const maxRevenue = Math.max(...data.map((d) => d.revenue));
  const points = data.map((d, i) => {
    const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
    const y = height - padding - (d.revenue / maxRevenue) * (height - 2 * padding);
    return { x, y, revenue: d.revenue, name: d.name };
  });

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x},${p.y}`).join(" ");

  const scrollToForm = () => {
    const formSection = document.getElementById("contact-form");
    if (formSection) {
      formSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative py-24 px-6 lg:px-12 max-w-7xl mx-auto z-10 bg-gradient-to-b from-gray-900/70 to-gray-800/70">
      <motion.div
        className="absolute top-0 left-0 w-1/2 h-1/3 bg-gradient-to-br from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10"
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-tl from-blue-500/15 to-cyan-400/15 rounded-full blur-3xl opacity-30 -z-10"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl lg:text-5xl font-extrabold bg-gradient-primary bg-clip-text text-transparent mb-6 font-playfair text-center tracking-tight"
      >
        Чат-боты — ваш ключ к максимальной выгоде и эффективности бизнеса
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-gray-200 text-lg lg:text-xl text-center mb-12 font-inter max-w-3xl mx-auto leading-relaxed"
      >
        Доход наших клиентов растёт в среднем на 200% за 3 месяца после внедрения чат-бота.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        viewport={{ once: true }}
        className="relative w-full max-w-4xl mx-auto h-[350px] bg-gray-900/80 backdrop-blur-2xl rounded-2xl p-6 shadow-2xl border border-cyan-500/30"
      >
        {isClient ? (
          <div className="relative w-full h-full">
            <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} preserveAspectRatio="xMidYMid meet">
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="5%" stopColor="#22D3EE" stopOpacity={0.9} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.7} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
                  <feBlend in="SourceGraphic" in2="glow" mode="screen" />
                </filter>
                <filter id="pulseGlow">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="glow" />
                  <feBlend in="SourceGraphic" in2="glow" mode="screen" />
                </filter>
              </defs>
              <rect x={padding} y={padding} width={width - 2 * padding} height={height - 2 * padding} fill="#1F2937" fillOpacity={0.3} />
              {[...Array(5)].map((_, i) => {
                const y = padding + (i / 4) * (height - 2 * padding);
                return (
                  <line
                    key={`grid-h-${i}`}
                    x1={padding}
                    y1={y}
                    x2={width - padding}
                    y2={y}
                    stroke="#2D3748"
                    strokeDasharray="3 3"
                  />
                );
              })}
              {data.map((_, i) => {
                const x = padding + (i / (data.length - 1)) * (width - 2 * padding);
                return (
                  <line
                    key={`grid-v-${i}`}
                    x1={x}
                    y1={padding}
                    x2={x}
                    y2={height - padding}
                    stroke="#2D3748"
                    strokeDasharray="3 3"
                  />
                );
              })}
              <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="#4B5563" />
              {points.map((point, i) => (
                <g key={`x-label-${i}`}>
                  <text
                    x={point.x}
                    y={height - padding + 25}
                    fill="#D1D5DB"
                    fontSize="14"
                    fontFamily="Inter"
                    textAnchor="middle"
                  >
                    {point.name}
                  </text>
                </g>
              ))}
              <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="#4B5563" />
              {[...Array(5)].map((_, i) => {
                const y = padding + (i / 4) * (height - 2 * padding);
                const value = Math.round(((4 - i) / 4) * maxRevenue);
                return (
                  <g key={`y-label-${i}`}>
                    <text
                      x={padding - 20}
                      y={y + 5}
                      fill="#D1D5DB"
                      fontSize="14"
                      fontFamily="Inter"
                      textAnchor="end"
                    >
                      {value}
                    </text>
                  </g>
                );
              })}
              <text
                x={padding - 40}
                y={padding + (height - 2 * padding) / 2}
                fill="#9CA3AF"
                fontSize="14"
                fontFamily="Inter"
                textAnchor="middle"
                transform={`rotate(-90, ${padding - 40}, ${padding + (height - 2 * padding) / 2})`}
              >
                Доход (тыс. ₽)
              </text>
              <motion.path
                d={linePath}
                fill="none"
                stroke="url(#colorRevenue)"
                strokeWidth={5}
                filter="url(#glow)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 2, ease: "easeInOut" }}
              />
              {points.map((point, i) => (
                <g
                  key={`point-${i}`}
                  onMouseEnter={() => setHoveredPoint(i)}
                  onMouseLeave={() => setHoveredPoint(null)}
                >
                  <motion.circle
                    cx={point.x}
                    cy={point.y}
                    r={hoveredPoint === i ? 10 : 8}
                    fill="#22D3EE"
                    stroke="#3B82F6"
                    strokeWidth={3}
                    filter="url(#pulseGlow)"
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                  />
                  {hoveredPoint === i && (
                    <g>
                      <rect
                        x={point.x - 60}
                        y={point.y - 50}
                        width={120}
                        height={40}
                        rx={8}
                        fill="#1F2937"
                        stroke="#22D3EE"
                        strokeWidth={1}
                      />
                      <text
                        x={point.x}
                        y={point.y - 35}
                        fill="#D1D5DB"
                        fontSize="12"
                        fontFamily="Inter"
                        textAnchor="middle"
                      >
                        {point.name}
                      </text>
                      <text
                        x={point.x}
                        y={point.y - 20}
                        fill="#22D3EE"
                        fontSize="12"
                        fontFamily="Inter"
                        textAnchor="middle"
                      >
                        {point.revenue} тыс. ₽
                      </text>
                    </g>
                  )}
                </g>
              ))}
            </svg>
          </div>
        ) : (
          <div className="w-full h-[350px] flex items-center justify-center text-gray-200 font-inter">
            График загружается... Доход вырос с 50 тыс. руб. до 300 тыс. руб.
          </div>
        )}
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        viewport={{ once: true }}
        className="flex justify-center mt-12"
      >
        <GradientButton onClick={scrollToForm} className="animate-pulse-slow">
          Заказать чат-бота
        </GradientButton>
      </motion.div>
    </section>
  );
}