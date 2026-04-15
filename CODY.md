# Remotion Video Engine — Cody's Guide

## How it works
1. You tell ChatGPT what video you want
2. ChatGPT writes 
3. You run the render command
4. Video drops in 

## Render command
```bash
cd /home/node/remotion
npx remotion render src/index.ts DynamicScene out/my-video.mp4 --gl=swangle
```

## scene.json format — give this to ChatGPT
```json
{
  "durationInFrames": 300,
  "fps": 30,
  "width": 1080,
  "height": 1920,
  "background": "#2a0a1e",
  "layers": [
    {
      "type": "text",
      "text": "Your text here",
      "startFrame": 0,
      "endFrame": 90,
      "animation": "fadeIn",
      "style": {
        "fontSize": 60,
        "color": "#fff",
        "fontFamily": "Inter, sans-serif",
        "top": "40%",
        "left": "5%",
        "right": "5%",
        "textAlign": "center"
      }
    },
    {
      "type": "rect",
      "startFrame": 0,
      "endFrame": 300,
      "style": {
        "background": "#c9a84c",
        "width": "100%",
        "height": "3px",
        "bottom": "100px"
      }
    },
    {
      "type": "image",
      "src": "./assets/your-image.jpg",
      "startFrame": 0,
      "endFrame": 300,
      "opacity": 0.5,
      "style": {
        "width": "100%",
        "height": "100%",
        "objectFit": "cover"
      }
    }
  ]
}
```

## Layer types
| type | required fields | optional |
|------|----------------|---------|
|  | text, startFrame, endFrame | style, animation (fadeIn / slideUp / none) |
|  | startFrame, endFrame | style |
|  | src, startFrame, endFrame | style, opacity |

## Kita brand colors
- Background: 
- Gold: 
- Pink: 
- Text: 
- Gold light: 

## TikTok specs
- 1080 × 1920, 30fps
- Keep text away from top 150px and bottom 150px (UI overlap)

## Drop assets here

