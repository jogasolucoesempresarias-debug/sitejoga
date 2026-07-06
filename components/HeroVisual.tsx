"use client";

import { motion } from "framer-motion";

// Motivo próprio: dados dispersos (pontos) convergindo numa direção que sobe (linha + seta).
const dots = [
  [40, 250], [70, 300], [55, 190], [95, 240], [110, 320],
  [130, 200], [150, 280], [90, 150], [175, 230], [40, 130],
];

export default function HeroVisual() {
  return (
    <svg viewBox="0 0 520 420" className="h-full w-full" role="img" aria-label="Dados convergindo em direção">
      {/* pontos dispersos */}
      {dots.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={4}
          fill="#8b94a3"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
        />
      ))}

      {/* linhas finas dos pontos para o nó de convergência */}
      {dots.map(([x, y], i) => (
        <motion.line
          key={`l${i}`}
          x1={x}
          y1={y}
          x2={215}
          y2={250}
          stroke="#8b94a3"
          strokeWidth={1}
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.18 }}
          transition={{ duration: 0.6, delay: 0.5 + i * 0.05 }}
        />
      ))}

      {/* linha-resultado que sobe */}
      <motion.path
        d="M215 250 L300 210 L350 235 L430 120"
        fill="none"
        stroke="#f4a52a"
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, delay: 1, ease: "easeInOut" }}
      />
      {/* cabeça da seta */}
      <motion.path
        d="M445 108 L418 116 L432 138 Z"
        fill="#f4a52a"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 2 }}
        style={{ transformOrigin: "432px 120px" }}
      />
      {/* nó de convergência */}
      <motion.circle
        cx={215}
        cy={250}
        r={8}
        fill="#f4a52a"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.4, delay: 0.9 }}
      />
    </svg>
  );
}
