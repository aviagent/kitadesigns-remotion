import React from 'react';
import {AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig} from 'remotion';

/*
  DynamicScene renders whatever ChatGPT writes into scene.json.

  scene.json shape:
  {
    "durationInFrames": 300,
    "fps": 30,
    "width": 1080,
    "height": 1920,
    "background": "#2a0a1e",
    "layers": [
      {
        "type": "text",
        "text": "Hello world",
        "startFrame": 0,
        "endFrame": 90,
        "style": { "fontSize": 60, "color": "#fff", "top": "50%", "left": "10%" },
        "animation": "fadeIn"
      },
      {
        "type": "rect",
        "startFrame": 0,
        "endFrame": 300,
        "style": { "background": "#c9a84c", "width": "100%", "height": 4, "bottom": 120 }
      },
      {
        "type": "image",
        "src": "./assets/hero.jpg",
        "startFrame": 0,
        "endFrame": 300,
        "style": { "width": "100%", "height": "100%", "objectFit": "cover" },
        "opacity": 0.6
      }
    ]
  }

  ChatGPT writes scene.json. Remotion renders it. Cody calls:
    npx remotion render src/index.ts DynamicScene out/video.mp4 --gl=swangle
*/

type Layer =
  | {type: 'text'; text: string; startFrame: number; endFrame: number; style?: React.CSSProperties; animation?: 'fadeIn' | 'slideUp' | 'none'}
  | {type: 'rect'; startFrame: number; endFrame: number; style?: React.CSSProperties}
  | {type: 'image'; src: string; startFrame: number; endFrame: number; style?: React.CSSProperties; opacity?: number};

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
  return (
    <img
      src={layer.src}
      style={{position: 'absolute', opacity: layer.opacity ?? 1, ...layer.style}}
    />
  );
};

export const DynamicScene: React.FC<{scene: Scene}> = ({scene}) => {
  return (
    <AbsoluteFill style={{background: scene.background ?? '#000'}}>
      {scene.layers.map((layer, i) => {
        if (layer.type === 'text') return <TextLayer key={i} layer={layer} />;
        if (layer.type === 'rect') return <RectLayer key={i} layer={layer} />;
        if (layer.type === 'image') return <ImageLayer key={i} layer={layer} />;
        return null;
      })}
    </AbsoluteFill>
  );
};
