import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig, Sequence, OffthreadVideo} from 'remotion';

type Layer =
  | {type: 'text'; text: string; startFrame: number; endFrame: number; style?: React.CSSProperties; animation?: 'fadeIn' | 'slideUp' | 'none'}
  | {type: 'rect'; startFrame: number; endFrame: number; style?: React.CSSProperties}
  | {type: 'image'; src: string; startFrame: number; endFrame: number; style?: React.CSSProperties; opacity?: number}
  | {type: 'video'; src: string; startFrame: number; endFrame: number; style?: React.CSSProperties; volume?: number; opacity?: number}
  | {type: 'number-flash'; number: string; startFrame: number; endFrame: number};

type Scene = {
  background?: string;
  layers: Layer[];
  durationInFrames?: number;
  fps?: number;
  width?: number;
  height?: number;
};

const TextLayer: React.FC<{layer: Extract<Layer, {type: 'text'}>}> = ({layer}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < layer.startFrame || frame >= layer.endFrame) return null;
  const localFrame = frame - layer.startFrame;
  let opacity = 1;
  let translateY = 0;
  if (layer.animation === 'fadeIn') {
    opacity = interpolate(localFrame, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
  } else if (layer.animation === 'slideUp') {
    opacity = interpolate(localFrame, [0, 15], [0, 1], {extrapolateRight: 'clamp'});
    translateY = spring({frame: localFrame, fps, config: {damping: 14}, from: 40, to: 0});
  }
  return (
    <div style={{position: 'absolute', opacity, transform: `translateY(${translateY}px)`, ...layer.style}}>
      {layer.text}
    </div>
  );
};

const RectLayer: React.FC<{layer: Extract<Layer, {type: 'rect'}>}> = ({layer}) => {
  const frame = useCurrentFrame();
  if (frame < layer.startFrame || frame >= layer.endFrame) return null;
  return <div style={{position: 'absolute', ...layer.style}} />;
};

const ImageLayer: React.FC<{layer: Extract<Layer, {type: 'image'}>}> = ({layer}) => {
  const frame = useCurrentFrame();
  if (frame < layer.startFrame || frame >= layer.endFrame) return null;
  return <img src={layer.src} style={{position: 'absolute', opacity: layer.opacity ?? 1, ...layer.style}} />;
};

// Wraps in <Sequence> so the video always plays from frame 0 of the source file
// when the layer begins, regardless of its position in the composition timeline.
const VideoLayer: React.FC<{layer: Extract<Layer, {type: 'video'}>}> = ({layer}) => {
  const frame = useCurrentFrame();
  if (frame < layer.startFrame || frame >= layer.endFrame) return null;
  const duration = layer.endFrame - layer.startFrame;
  return (
    <Sequence from={layer.startFrame} durationInFrames={duration}>
      <OffthreadVideo
        src={layer.src}
        volume={layer.volume ?? 0}
        style={{position: 'absolute', opacity: layer.opacity ?? 1, ...layer.style}}
      />
    </Sequence>
  );
};

const NumberFlashLayer: React.FC<{layer: Extract<Layer, {type: 'number-flash'}>}> = ({layer}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < layer.startFrame || frame >= layer.endFrame) return null;
  const localFrame = frame - layer.startFrame;
  const scale = spring({frame: localFrame, fps, config: {damping: 10, stiffness: 300}, from: 0.2, to: 1});
  const opacity = interpolate(localFrame, [0, 6], [0, 1], {extrapolateRight: 'clamp'});
  return (
    <AbsoluteFill style={{background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{
        fontSize: 320,
        fontWeight: '900',
        color: '#fff',
        fontFamily: 'Inter, sans-serif',
        transform: `scale(${scale})`,
        opacity,
        lineHeight: 1,
        userSelect: 'none',
      }}>
        {layer.number}
      </div>
    </AbsoluteFill>
  );
};

export const DynamicScene: React.FC<{scene: Scene}> = ({scene}) => {
  return (
    <AbsoluteFill style={{background: scene.background ?? '#000'}}>
      {scene.layers.map((layer, i) => {
        if (layer.type === 'text')         return <TextLayer        key={i} layer={layer} />;
        if (layer.type === 'rect')         return <RectLayer        key={i} layer={layer} />;
        if (layer.type === 'image')        return <ImageLayer       key={i} layer={layer} />;
        if (layer.type === 'video')        return <VideoLayer       key={i} layer={layer} />;
        if (layer.type === 'number-flash') return <NumberFlashLayer key={i} layer={layer} />;
        return null;
      })}
    </AbsoluteFill>
  );
};
