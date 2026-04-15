import {useCurrentFrame, interpolate, AbsoluteFill} from 'remotion';

interface Caption {
  text: string;
  startFrame: number;
  endFrame: number;
}

export const CaptionOverlay: React.FC<{captions: Caption[]}> = ({captions}) => {
  const frame = useCurrentFrame();
  const activeCaption = captions.find(
    (c) => frame >= c.startFrame && frame < c.endFrame
  );

  if (!activeCaption) return <AbsoluteFill />;

  const progress = interpolate(
    frame,
    [activeCaption.startFrame, activeCaption.startFrame + 6],
    [0, 1],
    {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}
  );

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 120,
        background: 'transparent',
      }}
    >
      <div
        style={{
          background: 'rgba(42,10,30,0.82)',
          border: '1.5px solid #c9a84c',
          borderRadius: 16,
          padding: '18px 36px',
          maxWidth: 900,
          opacity: progress,
          transform: `translateY(${interpolate(progress, [0, 1], [24, 0])}px)`,
        }}
      >
        <p
          style={{
            color: '#f5f0ff',
            fontSize: 52,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 700,
            textAlign: 'center',
            margin: 0,
            lineHeight: 1.3,
            textShadow: '0 2px 8px rgba(0,0,0,0.7)',
          }}
        >
          {activeCaption.text}
        </p>
      </div>
    </AbsoluteFill>
  );
};
