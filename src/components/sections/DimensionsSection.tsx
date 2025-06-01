
import React from 'react';
import GenericSlider from '../ui/GenericSlider';

interface DimensionsSectionProps {
  previewWidth: number;
  setPreviewWidth: (width: number) => void;
  previewHeight: number;
  setPreviewHeight: (height: number) => void;
}

const DimensionsSection: React.FC<DimensionsSectionProps> = ({
  previewWidth,
  setPreviewWidth,
  previewHeight,
  setPreviewHeight,
}) => {
  return (
    <div className="mb-8 opacity-0 translate-y-2.5 animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <div className="flex items-center gap-3 mb-5 text-sm font-semibold">
        <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-xs shadow-lg shadow-indigo-500/30">
          📐
        </div>
        <span>Méretek</span>
      </div>
      
      <div className="flex justify-between gap-6">
        <div className="flex-1 bg-white/3 p-4 rounded-xl border border-white/5">
          <div className="text-sm font-medium opacity-90 mb-3">Szélesség</div>
          <GenericSlider
            value={previewWidth}
            onChange={setPreviewWidth}
            min={100}
            max={500}
            unit="px"
            compact
          />
        </div>
        
        <div className="flex-1 bg-white/3 p-4 rounded-xl border border-white/5">
          <div className="text-sm font-medium opacity-90 mb-3">Magasság</div>
          <GenericSlider
            value={previewHeight}
            onChange={setPreviewHeight}
            min={100}
            max={500}
            unit="px"
            compact
          />
        </div>
      </div>
    </div>
  );
};

export default DimensionsSection;
