// Gráfico de teia (radar) do placar de maturidade — SVG puro, sem libs.
// Genérico: adapta ao número de áreas (4 hoje; 5 quando entrar o Financeiro).
// Cada eixo é uma área; o valor é o nível (Crítico=1 … Maduro=4).

const NIVEL_VAL: Record<string, number> = { "Crítico": 1, "Atenção": 2, "Bom": 3, "Maduro": 4 };
const NIVEL_COR: Record<string, string> = {
  "Crítico": "#e5484d", "Atenção": "#f4a52a", "Bom": "#39b3a6", "Maduro": "#2f9e44",
};
const MAX = 4;

export default function RadarPlacar({ placar }: { placar: Record<string, string> }) {
  const areas = Object.keys(placar);
  const n = areas.length;
  if (n < 3) return null; // radar precisa de 3+ eixos

  const cx = 215, cy = 162, R = 102;
  const ang = (i: number) => -Math.PI / 2 + (i / n) * 2 * Math.PI;
  const pt = (i: number, r: number): [number, number] => [
    cx + r * Math.cos(ang(i)),
    cy + r * Math.sin(ang(i)),
  ];
  const poly = (r: number) => areas.map((_, i) => pt(i, r).map((v) => v.toFixed(1)).join(",")).join(" ");

  const dataPts = areas.map((a, i) => pt(i, ((NIVEL_VAL[placar[a]] ?? 1) / MAX) * R));
  const dataStr = dataPts.map((p) => p.map((v) => v.toFixed(1)).join(",")).join(" ");

  return (
    <svg viewBox="0 0 430 335" className="w-full max-w-[400px]" role="img" aria-label="Radar de maturidade por área">
      {/* anéis de nível */}
      {[1, 2, 3, 4].map((lvl) => (
        <polygon key={lvl} points={poly((lvl / MAX) * R)} fill="none" stroke="#232a33" strokeWidth={1} />
      ))}
      {/* raios */}
      {areas.map((_, i) => {
        const [x, y] = pt(i, R);
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke="#232a33" strokeWidth={1} />;
      })}
      {/* polígono de dados */}
      <polygon points={dataStr} fill="#f4a52a" fillOpacity={0.14} stroke="#f4a52a" strokeWidth={2} strokeLinejoin="round" />
      {/* pontos coloridos por nível */}
      {dataPts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={5} fill={NIVEL_COR[placar[areas[i]]] ?? "#8b94a3"} stroke="#0e1116" strokeWidth={1.5} />
      ))}
      {/* rótulos das áreas */}
      {areas.map((a, i) => {
        const [x, y] = pt(i, R + 18);
        const c = Math.cos(ang(i));
        const anchor = c > 0.3 ? "start" : c < -0.3 ? "end" : "middle";
        return (
          <text key={i} x={x} y={y} textAnchor={anchor} dominantBaseline="middle" fontSize="12.5" fontWeight={600} fill="#f5f2ec">
            {a}
          </text>
        );
      })}
    </svg>
  );
}
