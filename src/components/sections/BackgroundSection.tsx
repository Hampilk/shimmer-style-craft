
import React, { useRef } from 'react';
import GenericSlider from '../ui/GenericSlider';

interface BackgroundSectionProps {
  activeBgType: 'solid' | 'gradient';
  setActiveBgType: (type: 'solid' | 'gradient') => void;
  selectedPaletteColor: string;
  setSelectedPaletteColor: (color: string) => void;
  customColor: string;
  setCustomColor: (color: string) => void;
  setPreviewBg: (bg: string) => void;
  previewOpacity: number;
  setPreviewOpacity: (opacity: number) => void;
}

const BackgroundSection: React.FC<BackgroundSectionProps> = ({
  activeBgType,
  setActiveBgType,
  selectedPaletteColor,
  setSelectedPaletteColor,
  customColor,
  setCustomColor,
  setPreviewBg,
  previewOpacity,
  setPreviewOpacity,
}) => {
  const customColorInputRef = useRef<HTMLInputElement>(null);
  
  const colorPaletteData = [
    "linear-gradient(135deg, #ff6b9d, #c44569)",
    "linear-gradient(135deg, #667eea, #764ba2)",
    "linear-gradient(135deg, #f093fb, #f5576c)",
    "linear-gradient(135deg, #4facfe, #00f2fe)",
    "linear-gradient(135deg, #43e97b, #38f9d7)",
    "linear-gradient(135deg, #fa709a, #fee140)",
  ];

  const handleCustomColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const color = event.target.value;
    setCustomColor(color);
    const gradient = `linear-gradient(135deg, ${color}, ${color}dd)`;
    setPreviewBg(gradient);
    setSelectedPaletteColor('');
  };

  return (
    <div className="mb-8 opacity-0 translate-y-2.5 animate-fade-in" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center gap-3 mb-5 text-sm font-semibold">
        <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-xs shadow-lg shadow-indigo-500/30">
          🎭
        </div>
        <span>Háttér & Színek</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div 
          className={`
            bg-white/3 border-2 rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 
            relative overflow-hidden hover:translate-y-[-2px] hover:shadow-lg hover:shadow-indigo-500/20
            ${activeBgType === 'solid' ? 'border-indigo-500 bg-indigo-500/8 shadow-lg shadow-indigo-500/30' : 'border-transparent'}
          `}
          onClick={() => setActiveBgType('solid')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg mx-auto mb-3 relative z-10"></div>
          <h4 className="text-sm font-semibold mb-1 relative z-10">Egyszínű</h4>
          <p className="text-xs opacity-70 relative z-10">Sima háttér</p>
        </div>
        
        <div 
          className={`
            bg-white/3 border-2 rounded-2xl p-5 text-center cursor-pointer transition-all duration-300 
            relative overflow-hidden hover:translate-y-[-2px] hover:shadow-lg hover:shadow-indigo-500/20
            ${activeBgType === 'gradient' ? 'border-indigo-500 bg-indigo-500/8 shadow-lg shadow-indigo-500/30' : 'border-transparent'}
          `}
          onClick={() => setActiveBgType('gradient')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          <div className="w-6 h-6 bg-gradient-to-r from-red-400 via-teal-400 via-blue-500 to-pink-400 rounded-lg mx-auto mb-3 relative z-10 animate-gradient"></div>
          <h4 className="text-sm font-semibold mb-1 relative z-10">Gradiens</h4>
          <p className="text-xs opacity-70 relative z-10">Színátmenet</p>
        </div>
      </div>

      <div className="grid grid-cols-6 md:grid-cols-8 gap-2 mb-5">
        {colorPaletteData.map(color => (
          <div
            key={color}
            className={`
              w-8 h-8 rounded-lg cursor-pointer border-2 transition-all duration-200 
              hover:scale-110 hover:shadow-md hover:shadow-black/30
              ${selectedPaletteColor === color ? 'border-white shadow-lg shadow-white/30' : 'border-transparent'}
            `}
            style={{ background: color }}
            onClick={() => setSelectedPaletteColor(color)}
          />
        ))}
      </div>

      <div className="flex justify-between items-center mb-5">
        <div className="flex items-center gap-3">
          <span className="text-sm opacity-90 font-medium">Egyedi szín</span>
          <div
            className="w-12 h-8 rounded-lg cursor-pointer border-2 border-white/20 transition-all duration-200 
                     hover:scale-105 hover:border-white/40 relative overflow-hidden"
            style={{ background: customColor }}
            onClick={() => customColorInputRef.current?.click()}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                          -translate-x-full hover:translate-x-full transition-transform duration-300"></div>
          </div>
          <input 
            type="color" 
            ref={customColorInputRef} 
            value={customColor}
            onChange={handleCustomColorChange}
            className="hidden" 
          />
        </div>
        
        <div className="flex-1 ml-6">
          <GenericSlider
            value={previewOpacity}
            onChange={setPreviewOpacity}
            min={0}
            max={100}
            unit="%"
            label="Átlátszóság"
          />
        </div>
      </div>
    </div>
  );
};

export default BackgroundSection;
