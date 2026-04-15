import {useCurrentFrame, interpolate, AbsoluteFill, spring, useVideoConfig} from 'remotion';

export const CTAOutro: React.FC<{cta: string; price: string}> = ({cta, price}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const cardY = spring({frame, fps, config: {damping: 14}, from: 80, to: 0});
  const opacity = interpolate(frame, [0, 20], [0, 1], {extrapolateRight: 'clamp'});

  return (
    <AbsoluteFill
      style={{
        background: 'linear-gradient(180deg, #2a0a1e 0%, #3d1230 100%)',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 32,
        opacity,
      }}
    >
      <p style={{color: '#e8cc85', fontSize: 44, fontFamily: 'Inter, sans-serif', fontWeight: 700, margin: 0, textAlign: 'center', letterSpacing: 1}}>
        Kita Designs
      </p>
      <div
        style={{
          background: 'linear-gradient(135deg, #c9a84c, #e8cc85)',
          borderRadius: 20,
          padding: '28px 56px',
          transform: `translateY(${cardY}px)`,
          textAlign: 'center',
        }}
      >
        <p style={{color: '#2a0a1e', fontSize: 48, fontFamily: 'Inter, sans-serif', fontWeight: 700, margin: 0}}>{cta}</p>
        <p style={{color: '#3d1230', fontSize: 32, fontFamily: 'Inter, sans-serif', fontWeight: 400, margin: '12px 0 0'}}>{price}</p>
      </div>
    </AbsoluteFill>
  );
};
