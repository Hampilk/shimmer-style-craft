
import React, { useState, useEffect } from 'react';
import ParticleBackground from './ParticleBackground';
import PreviewArea from './PreviewArea';
import ControlPanel from './ControlPanel';

const StyleControls: React.FC = () => {
  const [isPanelVisible, setIsPanelVisible] = useState(true);
  const [previewBg, setPreviewBg] = useState('linear-gradient(135deg, #ff6b9d, #c44569)');
  const [previewRadius, setPreviewRadius] = useState(16);
  const [previewOpacity, setPreviewOpacity] = useState(100);
  const [previewWidth, setPreviewWidth] = useState(200);
  const [previewHeight, setPreviewHeight] = useState(200);
  const [activeBgType, setActiveBgType] = useState<'solid' | 'gradient'>('solid');
  const [selectedPaletteColor, setSelectedPaletteColor] = useState('linear-gradient(135deg, #ff6b9d, #c44569)');
  const [customColor, setCustomColor] = useState('#ff6b9d');
  const [isGlassmorphism, setIsGlassmorphism] = useState(true);
  const [activeEffects, setActiveEffects] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPanelVisible(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    setPreviewBg(selectedPaletteColor);
  }, [selectedPaletteColor]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-violet-800 flex items-center justify-center text-white overflow-hidden">
      <ParticleBackground />
      
      <PreviewArea
        previewBg={previewBg}
        previewRadius={previewRadius}
        previewOpacity={previewOpacity}
        previewWidth={previewWidth}
        previewHeight={previewHeight}
        isGlassmorphism={isGlassmorphism}
        activeEffects={activeEffects}
      />
      
      <ControlPanel
        isPanelVisible={isPanelVisible}
        setIsPanelVisible={setIsPanelVisible}
        previewBg={previewBg}
        setPreviewBg={setPreviewBg}
        previewRadius={previewRadius}
        setPreviewRadius={setPreviewRadius}
        previewOpacity={previewOpacity}
        setPreviewOpacity={setPreviewOpacity}
        previewWidth={previewWidth}
        setPreviewWidth={setPreviewWidth}
        previewHeight={previewHeight}
        setPreviewHeight={setPreviewHeight}
        activeBgType={activeBgType}
        setActiveBgType={setActiveBgType}
        selectedPaletteColor={selectedPaletteColor}
        setSelectedPaletteColor={setSelectedPaletteColor}
        customColor={customColor}
        setCustomColor={setCustomColor}
        isGlassmorphism={isGlassmorphism}
        setIsGlassmorphism={setIsGlassmorphism}
        activeEffects={activeEffects}
        setActiveEffects={setActiveEffects}
      />
    </div>
  );
};

export default StyleControls;
