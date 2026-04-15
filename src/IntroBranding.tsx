import {useCurrentFrame, interpolate, AbsoluteFill, spring, useVideoConfig} from 'remotion';

export const IntroBranding: React.FC<{tagline: string}> = ({tagline}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const logoScale = spring({frame, fps, config: {damping: 12}, from: 0.6, to: 1});
  const textOpacity = interpolate(frame, [20, 40], [0, 1], {extrapolateRight: 'clamp'});
  const lineWidth = interpolate(frame, [30, 60], [0, 280], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #2a0a1e 0%, #3d1230 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 24,
      }}
    >
      <p
        style={{
          color: '#e8cc85',
          fontSize: 80,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 700,
          margin: 0,
          transform: `scale(${logoScale})`,
          letterSpacing: 2,
        }}
      >
        Kita Designs
      </p>
      <div style={{width: lineWidth, height: 2, background: 'linear-gradient(90deg, #c9a84c, #b83e7a)'}} />
      <p
        style={{
          color: '#f5f0ff',
          fontSize: 40,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 400,
          margin: 0,
          opacity: textOpacity,
          letterSpacing: 1,
        }}
      >
        {tagline}
      </p>
    </AbsoluteFill>
  );
};
