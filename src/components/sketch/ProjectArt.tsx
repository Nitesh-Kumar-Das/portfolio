import { cn } from "@/lib/cn";
import type { ProjectArt as ArtKey } from "@/lib/content";

/**
 * One hand-drawn diagram per project, showing its actual mechanism rather than
 * a generic icon.
 *
 * Same stroke idiom as Sketch.tsx on purpose — one SVG language across the
 * site, not two. Every stroked path carries `.sketch-path` so anime.js can
 * draw it on; moving parts carry `.art-move` so they can be animated after the
 * lines land. Both are inert without JS, which is how these render under
 * reduced motion and before hydration.
 */

const stroke = {
  fill: "none",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: "currentColor",
} as const;

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <svg
      viewBox="0 0 200 160"
      aria-hidden="true"
      className={cn("h-full w-full text-pencil", className)}
    >
      {children}
    </svg>
  );
}

/** AgroAI: a leaf feeding four ML services, each with its measured accuracy. */
function AgroArt() {
  const services: Array<[number, string]> = [
    [26, "99.5"],
    [62, "98.2"],
    [98, "97.8"],
    [134, "XGB"],
  ];
  return (
    <Frame>
      {/* leaf: pointed at both ends, with a midrib and two side veins */}
      <path
        className="sketch-path"
        d="M32 82C36 46 58 22 92 16 90 52 66 80 32 82Z"
        strokeWidth={2.5}
        {...stroke}
      />
      <path className="sketch-path" d="M32 82C50 66 72 42 90 18" strokeWidth={2} {...stroke} />
      <path className="sketch-path" d="M46 62l16 4M60 44l16 4" strokeWidth={1.75} {...stroke} />
      {/* trunk down to the fan */}
      <path className="sketch-path" d="M62 82v20" strokeWidth={2.5} {...stroke} />
      <path className="sketch-path" d="M34 102h134" strokeWidth={2.5} {...stroke} />
      {services.map(([x, label]) => (
        <g key={label} className="art-move" style={{ transformOrigin: `${x + 16}px 120px` }}>
          <path className="sketch-path" d={`M${x + 16} 102v12`} strokeWidth={2} {...stroke} />
          <rect
            className="sketch-path"
            x={x}
            y={114}
            width={32}
            height={22}
            rx={5}
            strokeWidth={2.5}
            {...stroke}
          />
          <text
            x={x + 16}
            y={129}
            textAnchor="middle"
            className="fill-pencil font-body"
            style={{ fontSize: 11 }}
          >
            {label}
          </text>
        </g>
      ))}
    </Frame>
  );
}

/** AI StudY Bot: a PDF turning into generated quiz cards. */
function StudyArt() {
  return (
    <Frame>
      {/* source document with a folded corner */}
      <path className="sketch-path" d="M22 22h44l16 16v62H22z" strokeWidth={2.5} {...stroke} />
      <path className="sketch-path" d="M66 22v16h16" strokeWidth={2} {...stroke} />
      <path className="sketch-path" d="M32 52h34M32 64h34M32 76h22" strokeWidth={2} {...stroke} />
      {/* arrow across */}
      <path className="sketch-path" d="M96 66h26" strokeWidth={2.5} strokeDasharray="6 5" {...stroke} />
      <path className="sketch-path" d="M116 60l8 6-8 6" strokeWidth={2.5} {...stroke} />
      {/* quiz cards, each flips up in sequence */}
      {[0, 1, 2].map((i) => (
        <g key={i} className="art-move" style={{ transformOrigin: `162px ${104 - i * 26}px` }}>
          <rect
            className="sketch-path"
            x={134}
            y={88 - i * 26}
            width={54}
            height={30}
            rx={6}
            strokeWidth={2.5}
            {...stroke}
          />
          <path className="sketch-path" d={`M144 ${100 - i * 26}h22`} strokeWidth={2} {...stroke} />
          <text
            x={176}
            y={{ 0: 104, 1: 78, 2: 52 }[i as 0 | 1 | 2]}
            textAnchor="middle"
            className="fill-accent font-hand"
            style={{ fontSize: 13 }}
          >
            ?
          </text>
        </g>
      ))}
    </Frame>
  );
}

/** AI Money Management: a receipt scanned by OCR, resolving into a budget chart. */
function MoneyArt() {
  return (
    <Frame>
      {/* receipt with a torn bottom edge */}
      <path
        className="sketch-path"
        d="M26 18h62v104l-10-7-10 7-11-7-10 7-11-7-10 7z"
        strokeWidth={2.5}
        {...stroke}
      />
      <path className="sketch-path" d="M38 40h38M38 54h38M38 68h24" strokeWidth={2} {...stroke} />
      {/* OCR scan line sweeps down the receipt */}
      <g className="art-scan">
        <path className="sketch-path" d="M22 46h70" strokeWidth={3} stroke="var(--color-accent)" fill="none" strokeLinecap="round" />
      </g>
      {/* resolved bar chart */}
      <path className="sketch-path" d="M116 122h64" strokeWidth={2.5} {...stroke} />
      {[
        [122, 44],
        [140, 68],
        [158, 30],
      ].map(([x, h], i) => (
        <rect
          key={i}
          className="art-bar sketch-path"
          x={x}
          y={122 - h}
          width={14}
          height={h}
          strokeWidth={2.5}
          style={{ transformOrigin: `${x + 7}px 122px` }}
          {...stroke}
        />
      ))}
      <text x={148} y={140} textAnchor="middle" className="fill-pencil font-hand" style={{ fontSize: 13 }}>
        ₹
      </text>
    </Frame>
  );
}

/** Web-Chat: two clients exchanging messages over a live socket. */
function ChatArt() {
  return (
    <Frame>
      {/* incoming bubble */}
      <g className="art-move" style={{ transformOrigin: "60px 44px" }}>
        <path
          className="sketch-path"
          d="M22 24h72c5 0 8 3 8 8v22c0 5-3 8-8 8H40l-12 12v-12h-6c-5 0-8-3-8-8V32c0-5 3-8 8-8z"
          strokeWidth={2.5}
          {...stroke}
        />
        <path className="sketch-path" d="M34 40h44M34 52h28" strokeWidth={2} {...stroke} />
      </g>
      {/* outgoing bubble */}
      <g className="art-move" style={{ transformOrigin: "140px 116px" }}>
        <path
          className="sketch-path"
          d="M178 92h-72c-5 0-8 3-8 8v22c0 5 3 8 8 8h54l12 12v-12h6c5 0 8-3 8-8v-22c0-5-3-8-8-8z"
          strokeWidth={2.5}
          {...stroke}
        />
        <path className="sketch-path" d="M116 108h44M116 120h28" strokeWidth={2} {...stroke} />
      </g>
      {/* socket pulse travelling between them */}
      <circle className="art-pulse" cx={100} cy={78} r={5} fill="var(--color-accent)" />
    </Frame>
  );
}

/** Tic Tac Toe Ultimate: the board, and the minimax tree the AI searches. */
function GameArt() {
  return (
    <Frame>
      {/* 3x3 grid */}
      <path className="sketch-path" d="M46 14v66M76 12v68" strokeWidth={2.5} {...stroke} />
      <path className="sketch-path" d="M18 40h88M16 66h90" strokeWidth={2.5} {...stroke} />
      {/* X and O landing on the board */}
      <g className="art-move" style={{ transformOrigin: "32px 27px" }}>
        <path className="sketch-path" d="M24 20l16 15M40 20L24 35" strokeWidth={3} stroke="var(--color-accent)" fill="none" strokeLinecap="round" />
      </g>
      <g className="art-move" style={{ transformOrigin: "61px 53px" }}>
        <circle className="sketch-path" cx={61} cy={53} r={9} strokeWidth={3} {...stroke} />
      </g>
      <g className="art-move" style={{ transformOrigin: "91px 79px" }}>
        <path className="sketch-path" d="M83 72l16 15M99 72L83 87" strokeWidth={3} stroke="var(--color-accent)" fill="none" strokeLinecap="round" />
      </g>
      {/* minimax search tree */}
      <path className="sketch-path" d="M150 20v14M150 34l-26 18M150 34l26 18" strokeWidth={2} {...stroke} />
      <path className="sketch-path" d="M124 58l-12 16M124 58l12 16M176 58l-12 16M176 58l12 16" strokeWidth={2} {...stroke} />
      <circle className="sketch-path" cx={150} cy={16} r={6} strokeWidth={2.5} {...stroke} />
      {[124, 176].map((x) => (
        <circle key={x} className="sketch-path" cx={x} cy={55} r={5} strokeWidth={2.5} {...stroke} />
      ))}
      {[112, 136, 164, 188].map((x) => (
        <circle
          key={x}
          className="art-move sketch-path"
          cx={x}
          cy={80}
          r={4}
          strokeWidth={2.5}
          style={{ transformOrigin: `${x}px 80px` }}
          {...stroke}
        />
      ))}
      <text x={150} y={112} textAnchor="middle" className="fill-pencil font-body" style={{ fontSize: 11 }}>
        minimax
      </text>
      <text x={150} y={128} textAnchor="middle" className="fill-pencil/70 font-body" style={{ fontSize: 10 }}>
        alpha-beta
      </text>
    </Frame>
  );
}

const ART: Record<ArtKey, () => React.JSX.Element> = {
  agro: AgroArt,
  study: StudyArt,
  money: MoneyArt,
  chat: ChatArt,
  game: GameArt,
};

export function ProjectArt({ art, className }: { art: ArtKey; className?: string }) {
  const Art = ART[art];
  return (
    <div
      aria-hidden="true"
      className={cn("project-art w-full max-w-[260px] shrink-0", className)}
    >
      <Art />
    </div>
  );
}
