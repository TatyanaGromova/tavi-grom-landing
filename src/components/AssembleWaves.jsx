export default function AssembleWaves() {
  return (
    <div className="assemble-waves" aria-hidden="true">
      <svg
        className="assemble-waves__svg"
        viewBox="0 0 480 520"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMaxYMid slice"
      >
        <defs>
          <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(168, 52, 68, 0.35)" />
            <stop offset="50%" stopColor="rgba(140, 38, 52, 0.2)" />
            <stop offset="100%" stopColor="rgba(201, 130, 85, 0.15)" />
          </linearGradient>
          <linearGradient id="waveGrad2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(120, 32, 48, 0.28)" />
            <stop offset="100%" stopColor="rgba(168, 52, 68, 0.12)" />
          </linearGradient>
          <filter id="waveBlur" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="assemble-waves__group assemble-waves__group--1" filter="url(#waveBlur)">
          <path
            className="assemble-wave-path"
            d="M 40 120 C 120 80, 200 160, 280 120 S 440 80, 460 140"
            stroke="url(#waveGrad1)"
            strokeWidth="1.2"
          />
          <path
            className="assemble-wave-path"
            d="M 60 220 C 150 180, 240 260, 330 220 S 450 180, 470 240"
            stroke="url(#waveGrad1)"
            strokeWidth="1"
          />
          <path
            className="assemble-wave-path"
            d="M 20 320 C 110 280, 210 360, 300 320 S 420 280, 460 340"
            stroke="url(#waveGrad2)"
            strokeWidth="1.1"
          />
          <path
            className="assemble-wave-path"
            d="M 80 400 C 170 360, 260 440, 350 400 S 440 360, 480 420"
            stroke="url(#waveGrad2)"
            strokeWidth="0.9"
          />
        </g>

        <g className="assemble-waves__group assemble-waves__group--2" opacity="0.7">
          <path
            className="assemble-wave-path assemble-wave-path--soft"
            d="M 100 80 C 180 120, 260 40, 340 90 S 460 50, 480 110"
            stroke="rgba(168, 52, 68, 0.18)"
            strokeWidth="0.8"
          />
          <path
            className="assemble-wave-path assemble-wave-path--soft"
            d="M 50 440 C 140 400, 230 480, 320 440 S 430 400, 470 460"
            stroke="rgba(201, 130, 85, 0.14)"
            strokeWidth="0.7"
          />
        </g>
      </svg>

      <div className="assemble-waves__glow" />
    </div>
  )
}
