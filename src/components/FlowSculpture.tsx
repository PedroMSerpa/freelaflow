import { useRef, type PointerEvent } from 'react';

/** Original procedural artwork. No assets from the reference website are used. */
export default function FlowSculpture({ compact = false }: { compact?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    ref.current?.style.setProperty(
      '--pointer-x',
      `${((event.clientX - rect.left) / rect.width) * 12 - 6}deg`,
    );
    ref.current?.style.setProperty(
      '--pointer-y',
      `${((event.clientY - rect.top) / rect.height) * -12 + 6}deg`,
    );
  }
  return (
    <div
      className={`flow-sculpture ${compact ? 'compact' : ''}`}
      onPointerMove={move}
      onPointerLeave={() => {
        ref.current?.style.setProperty('--pointer-x', '0deg');
        ref.current?.style.setProperty('--pointer-y', '0deg');
      }}
      ref={ref}
      aria-hidden="true"
    >
      <div className="sculpture-grid" />
      <div className="sculpture-object">
        <svg viewBox="0 0 640 640" fill="none">
          <defs>
            <linearGradient
              id={compact ? 'flow-gradient-small' : 'flow-gradient'}
              x1="100"
              y1="100"
              x2="550"
              y2="550"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#fdcdeb" />
              <stop offset=".45" stopColor="#ff488b" />
              <stop offset="1" stopColor="#e33adb" />
            </linearGradient>
          </defs>
          {Array.from({ length: 36 }, (_, i) => (
            <ellipse
              key={i}
              cx="320"
              cy="320"
              rx={125 + i * 2.4}
              ry={210 - i * 2.8}
              transform={`rotate(${i * 5} 320 320)`}
              stroke={`url(#${compact ? 'flow-gradient-small' : 'flow-gradient'})`}
              strokeWidth={i % 6 === 0 ? 1.8 : 0.8}
              opacity={0.42 + i / 70}
            />
          ))}
        </svg>
      </div>
      <span className="sculpture-coord coord-one">FF / CREATIVE SYSTEM</span>
      <span className="sculpture-coord coord-two">INDEPENDENT BY DESIGN</span>
      <span className="sculpture-cross cross-one">+</span>
      <span className="sculpture-cross cross-two">+</span>
      {!compact && (
        <>
          <div className="sculpture-tag tag-top">
            <span className="pink-dot" />
            Uma ideia em movimento<span>↗</span>
          </div>
          <div className="sculpture-tag tag-bottom">
            <span>✳</span>Seu próximo grande trabalho.
          </div>
        </>
      )}
    </div>
  );
}
