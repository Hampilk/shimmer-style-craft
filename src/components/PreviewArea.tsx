
import React from 'react';

interface PreviewAreaProps {
  previewBg: string;
  previewRadius: number;
  previewOpacity: number;
  previewWidth: number;
  previewHeight: number;
  isGlassmorphism: boolean;
  activeEffects: string[];
}

const PreviewArea: React.FC<PreviewAreaProps> = ({
  previewBg,
  previewRadius,
  previewOpacity,
  previewWidth,
  previewHeight,
  isGlassmorphism,
  activeEffects,
}) => {
  const getBackgroundStyles = () => {
    let background = previewBg;
    
    if (activeEffects.includes('noise')) {
      background = `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
                   radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 1px, transparent 1px),
                   ${previewBg}`;
    }
    
    if (activeEffects.includes('texture')) {
      background = `repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px),
                   ${previewBg}`;
    }
    
    if (activeEffects.includes('pattern')) {
      background = `radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 2px, transparent 2px),
                   ${previewBg}`;
    }
    
    return background;
  };

  const getBackgroundSize = () => {
    if (activeEffects.includes('pattern')) {
      return '12px 12px, cover';
    }
    return 'auto, cover';
  };

  return (
    <div
      className={`
        absolute right-5 top-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out
        ${isGlassmorphism ? 'backdrop-blur-3xl border border-white/10' : ''}
        ${activeEffects.includes('glow') ? 'shadow-2xl shadow-indigo-500/30' : 'shadow-2xl shadow-black/30'}
        hidden md:block
      `}
      style={{
        width: `${previewWidth}px`,
        height: `${previewHeight}px`,
        background: getBackgroundStyles(),
        backgroundSize: getBackgroundSize(),
        borderRadius: `${previewRadius}px`,
        opacity: previewOpacity / 100,
      }}
    />
  );
};

export default PreviewArea;
