export default function GrainTexture() {
  return (
    <svg className="fixed inset-0 w-full h-full opacity-[0.05] pointer-events-none z-0">
      <filter id="noiseFilter">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncR type="discrete" tableValues="0 0.5 1"/>
          <feFuncG type="discrete" tableValues="0 0.5 1"/>
          <feFuncB type="discrete" tableValues="0 0.5 1"/>
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}