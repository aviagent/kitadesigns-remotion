import React from 'react';
import {Composition} from 'remotion';
import {DynamicScene} from './DynamicScene';
import scene from '../scene.json';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="DynamicScene"
      component={DynamicScene}
      durationInFrames={scene.durationInFrames ?? 300}
      fps={scene.fps ?? 30}
      width={scene.width ?? 1080}
      height={scene.height ?? 1920}
      defaultProps={{scene}}
    />
  );
};
