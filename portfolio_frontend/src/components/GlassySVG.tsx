const GlassySVG = ({
  viewBox = "0 0 128 128",
  width = 100,
  height = 100,
  children,
}) => {
  const id = Math.random().toString(36).substring(2, 9);

  return (
    <svg viewBox={viewBox} width={width} height={height}>
      <defs>
        <filter
          id={`glass-blur-${id}`}
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <linearGradient
          id={`glass-gradient-${id}`}
          x1="0%"
          y1="0%"
          x2="100%"
          y2="100%"
        >
          <stop offset="0%" stopColor="white" stopOpacity="0.4" />
          <stop offset="100%" stopColor="white" stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <g
        filter={`url(#glass-blur-${id})`}
        fill={`url(#glass-gradient-${id})`}
        stroke="rgba(255, 255, 255, 0.4)"
        strokeWidth="1"
      >
        {children}
      </g>
    </svg>
  );
};

export default GlassySVG;
