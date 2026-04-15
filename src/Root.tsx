import {Composition} from 'remotion';
import {CaptionOverlay} from './CaptionOverlay';
import {IntroBranding} from './IntroBranding';
import {CTAOutro} from './CTAOutro';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="CaptionOverlay"
        component={CaptionOverlay}
        durationInFrames={300}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          captions: [
            {text: 'Your caption here', startFrame: 0, endFrame: 90},
            {text: 'Next caption line', startFrame: 90, endFrame: 180},
          ],
        }}
      />
      <Composition
        id="IntroBranding"
        component={IntroBranding}
        durationInFrames={90}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          tagline: 'AI Avatar Videos for Business',
        }}
      />
      <Composition
        id="CTAOutro"
        component={CTAOutro}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          cta: 'Get your video → kitadesigns.shop',
          price: '$150 · Only 3 spots/month',
        }}
      />
    </>
  );
};
