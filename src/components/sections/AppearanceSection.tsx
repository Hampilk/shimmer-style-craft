
import React from 'react';
import GenericSlider from '../ui/GenericSlider';

interface AppearanceSectionProps {
  previewRadius: number;
  setPreviewRadius: (radius: number) => void;
  isGlassmorphism: boolean;
  setIsGlassmorphism: (enabled: boolean) => void;
  activeEffects: string[];
  setActiveEffects: React.Dispatch<React.SetStateAction<string[]>>;
}

const AppearanceSection: React.FC<AppearanceSectionProps> = ({
  previewRadius,
  setPreviewRadius,
  isGlassmorphism,
  setIsGlassmorphism,
  activeEffects,
  setActiveEffects,
}) => {
  const handleEffectToggle = (effect: string) => {
    setActiveEffects(prev => 
      prev.includes(effect) ? prev.filter(e => e !== effect) : [...prev, effect]
    );
  };

  const effects = [
    { 
      name: 'Zaj', 
      effectKey: 'noise', 
      bgClass: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      extraBg: 'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 1px, transparent 1px), radial-gradient(circle at 80% 50%, rgba(255,255,255,0.1) 1px, transparent 1px)'
    },
    { 
      name: 'Textúra', 
      effectKey: 'texture', 
      bgClass: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      extraBg: 'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)'
    },
    { 
      name: 'Ragyogás', 
      effectKey: 'glow', 
      bgClass: 'bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg shadow-indigo-500/60'
    },
    { 
      name: 'Minta', 
      effectKey: 'pattern', 
      bgClass: 'bg-gradient-to-br from-indigo-500 to-purple-600',
      extraBg: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 2px, transparent 2px)',
      bgSize: '8px 8px'
    },
  ];

  return (
    <div className="mb-8 opacity-0 translate-y-2.5 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center gap-3 mb-5 text-sm font-semibold">
        <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-xs shadow-lg shadow-indigo-500/30">
          ✨
        </div>
        <span>Megjelenés & Effektek</span>
      </div>
      
      <GenericSlider
        value={previewRadius}
        onChange={setPreviewRadius}
        min={0}
        max={50}
        unit="px"
        label="Lekerekítés"
      />

      <div className="flex justify-between items-center mb-6 p-4 bg-white/3 rounded-xl border border-white/5 
                    transition-all duration-300 hover:bg-white/5 hover:border-indigo-500/30">
        <div className="flex items-center gap-3">
          <span className="text-lg animate-sparkle">✨</span>
          <div>
            <h4 className="text-sm font-semibold mb-0.5">Glassmorphism</h4>
            <p className="text-xs opacity-70">Üveg effekt háttérrel</p>
          </div>
        </div>
        <div 
          className={`
            w-13 h-7 rounded-full cursor-pointer transition-all duration-300 relative
            ${isGlassmorphism ? 'bg-indigo-500' : 'bg-white/20'}
          `}
          style={{ boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)' }}
          onClick={() => setIsGlassmorphism(!isGlassmorphism)}
        >
          <div 
            className={`
              w-5.5 h-5.5 bg-white rounded-full absolute top-0.75 transition-all duration-300 shadow-md shadow-black/30
              ${isGlassmorphism ? 'right-0.75' : 'right-6.75'}
            `}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        {effects.map(({ name, effectKey, bgClass, extraBg, bgSize }) => (
          <div 
            key={effectKey}
            className={`
              p-3 rounded-xl cursor-pointer transition-all duration-300 text-center
              ${activeEffects.includes(effectKey) 
                ? 'bg-indigo-500/12 border-2 border-indigo-500' 
                : 'bg-white/3 border-2 border-transparent hover:border-indigo-500 hover:bg-indigo-500/8'
              }
            `}
            onClick={() => handleEffectToggle(effectKey)}
          >
            <div 
              className={`w-6 h-6 rounded-md mx-auto mb-2 ${bgClass}`}
              style={{ 
                background: extraBg ? `${extraBg}, linear-gradient(135deg, #667eea, #764ba2)` : undefined,
                backgroundSize: bgSize || 'auto'
              }}
            />
            <div className="text-xs font-medium">{name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppearanceSection;
