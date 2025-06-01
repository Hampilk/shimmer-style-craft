
import React, { useRef } from 'react';
import BackgroundSection from './sections/BackgroundSection';
import AppearanceSection from './sections/AppearanceSection';
import DimensionsSection from './sections/DimensionsSection';

interface ControlPanelProps {
  isPanelVisible: boolean;
  setIsPanelVisible: (visible: boolean) => void;
  previewBg: string;
  setPreviewBg: (bg: string) => void;
  previewRadius: number;
  setPreviewRadius: (radius: number) => void;
  previewOpacity: number;
  setPreviewOpacity: (opacity: number) => void;
  previewWidth: number;
  setPreviewWidth: (width: number) => void;
  previewHeight: number;
  setPreviewHeight: (height: number) => void;
  activeBgType: 'solid' | 'gradient';
  setActiveBgType: (type: 'solid' | 'gradient') => void;
  selectedPaletteColor: string;
  setSelectedPaletteColor: (color: string) => void;
  customColor: string;
  setCustomColor: (color: string) => void;
  isGlassmorphism: boolean;
  setIsGlassmorphism: (enabled: boolean) => void;
  activeEffects: string[];
  setActiveEffects: (effects: string[]) => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  isPanelVisible,
  setIsPanelVisible,
  previewBg,
  setPreviewBg,
  previewRadius,
  setPreviewRadius,
  previewOpacity,
  setPreviewOpacity,
  previewWidth,
  setPreviewWidth,
  previewHeight,
  setPreviewHeight,
  activeBgType,
  setActiveBgType,
  selectedPaletteColor,
  setSelectedPaletteColor,
  customColor,
  setCustomColor,
  isGlassmorphism,
  setIsGlassmorphism,
  activeEffects,
  setActiveEffects,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      className={`
        w-96 bg-slate-900/95 backdrop-blur-3xl rounded-3xl border border-white/8 
        shadow-2xl shadow-black/40 overflow-hidden relative transition-all duration-300 ease-out
        animate-enter max-w-[95vw] md:max-w-96
        ${isPanelVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-5 opacity-0'}
      `}
      style={{
        boxShadow: '0 32px 64px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
      }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 p-6 flex items-center justify-between relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shine"></div>
        
        <div className="flex items-center gap-3 z-10">
          <div className="w-8 h-8 bg-white/15 rounded-xl flex items-center justify-center text-base backdrop-blur-sm animate-pulse">
            🎨
          </div>
          <div>
            <h3 className="text-lg font-bold mb-0.5 drop-shadow-md">Style Controls</h3>
            <p className="text-sm opacity-90">Testre szabás élő előnézettel</p>
          </div>
        </div>
        
        <button
          onClick={() => setIsPanelVisible(false)}
          className="w-8 h-8 bg-white/10 border-0 text-white text-xl cursor-pointer rounded-lg 
                   flex items-center justify-center backdrop-blur-sm z-10 transition-all duration-200
                   hover:bg-white/20 hover:scale-110"
        >
          ×
        </button>
      </div>

      {/* Content */}
      <div 
        ref={contentRef}
        className="p-6 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-gradient-to-r scrollbar-thumb-from-indigo-500 scrollbar-thumb-to-purple-600"
      >
        <BackgroundSection
          activeBgType={activeBgType}
          setActiveBgType={setActiveBgType}
          selectedPaletteColor={selectedPaletteColor}
          setSelectedPaletteColor={setSelectedPaletteColor}
          customColor={customColor}
          setCustomColor={setCustomColor}
          setPreviewBg={setPreviewBg}
          previewOpacity={previewOpacity}
          setPreviewOpacity={setPreviewOpacity}
        />
        
        <AppearanceSection
          previewRadius={previewRadius}
          setPreviewRadius={setPreviewRadius}
          isGlassmorphism={isGlassmorphism}
          setIsGlassmorphism={setIsGlassmorphism}
          activeEffects={activeEffects}
          setActiveEffects={setActiveEffects}
        />
        
        <DimensionsSection
          previewWidth={previewWidth}
          setPreviewWidth={setPreviewWidth}
          previewHeight={previewHeight}
          setPreviewHeight={setPreviewHeight}
        />
      </div>
    </div>
  );
};

export default ControlPanel;
