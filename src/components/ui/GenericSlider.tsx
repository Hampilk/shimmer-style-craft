
import React, { useRef, useCallback, useEffect } from 'react';

interface SliderProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  unit?: string;
  label?: string;
  compact?: boolean;
}

const GenericSlider: React.FC<SliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  unit = '%',
  label,
  compact = false,
}) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  const getPercentage = useCallback(() => {
    if (max === min) return 0;
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const handleInteraction = useCallback((clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      let newPercent = ((clientX - rect.left) / rect.width) * 100;
      newPercent = Math.max(0, Math.min(100, newPercent));
      const newValue = Math.round(min + (newPercent / 100) * (max - min));
      onChange(newValue);
    }
  }, [min, max, onChange]);

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    handleInteraction(event.clientX);
    event.preventDefault();
  }, [handleInteraction]);

  const handleTouchStart = useCallback((event: React.TouchEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    handleInteraction(event.touches[0].clientX);
  }, [handleInteraction]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isDraggingRef.current) {
        handleInteraction(event.clientX);
      }
    };
    
    const handleTouchMove = (event: TouchEvent) => {
      if (isDraggingRef.current) {
        handleInteraction(event.touches[0].clientX);
      }
    };
    
    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('touchend', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [handleInteraction]);

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div
          ref={sliderRef}
          className="flex-1 h-1.5 bg-white/8 rounded-full cursor-pointer relative"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full relative"
            style={{ width: `${getPercentage()}%` }}
          >
            <div className="w-4 h-4 bg-white rounded-full absolute -right-2 -top-1 cursor-grab shadow-md shadow-black/30 
                          hover:scale-110 transition-transform duration-200" />
          </div>
        </div>
        <span className="text-indigo-400 font-bold text-sm min-w-[45px] text-right">
          {value}{unit}
        </span>
      </div>
    );
  }

  return (
    <div className="flex justify-between items-center mb-5">
      {label && <span className="text-sm opacity-90 font-medium">{label}</span>}
      <div
        ref={sliderRef}
        className="flex-1 mx-4 h-1.5 bg-white/8 rounded-full cursor-pointer relative"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div 
          className="h-full bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full relative"
          style={{ width: `${getPercentage()}%` }}
        >
          <div className="w-4.5 h-4.5 bg-white rounded-full absolute -right-2.25 -top-1.5 cursor-grab shadow-md shadow-black/30 
                        hover:scale-120 hover:shadow-lg hover:shadow-black/40 transition-all duration-200" />
        </div>
      </div>
      <span className="text-indigo-400 font-bold text-sm min-w-[35px] text-right">
        {value}{unit}
      </span>
    </div>
  );
};

export default GenericSlider;
