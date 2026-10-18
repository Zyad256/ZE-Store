import React from 'react';
import { Timer, Compass, Camera, Music, Shield, Terminal, Smartphone } from 'lucide-react';

interface AppIconProps {
  symbol: 'timer' | 'compass' | 'camera' | 'music' | 'shield' | 'terminal';
  bgGradient: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export const AppIcon: React.FC<AppIconProps> = ({
  symbol,
  bgGradient,
  size = 'md',
  className = '',
}) => {
  const sizeMap = {
    sm: 'w-10 h-10 rounded-xl p-2',
    md: 'w-14 h-14 rounded-2xl p-3',
    lg: 'w-20 h-20 rounded-3xl p-4.5',
    xl: 'w-24 h-24 rounded-3xl p-5',
  };

  const iconSizeMap = {
    sm: 20,
    md: 28,
    lg: 40,
    xl: 48,
  };

  const renderIcon = () => {
    const iconProps = {
      size: iconSizeMap[size],
      className: 'text-white drop-shadow-md transition-transform duration-300 group-hover:scale-110',
    };

    switch (symbol) {
      case 'timer':
        return <Timer {...iconProps} />;
      case 'compass':
        return <Compass {...iconProps} />;
      case 'camera':
        return <Camera {...iconProps} />;
      case 'music':
        return <Music {...iconProps} />;
      case 'shield':
        return <Shield {...iconProps} />;
      case 'terminal':
        return <Terminal {...iconProps} />;
      default:
        return <Smartphone {...iconProps} />;
    }
  };

  return (
    <div
      className={`relative flex items-center justify-center bg-gradient-to-br ${bgGradient} shadow-lg shadow-black/40 ring-1 ring-white/20 select-none flex-shrink-0 ${sizeMap[size]} ${className}`}
    >
      {renderIcon()}
      {/* Subtle Android glossy reflection corner */}
      <div className="absolute inset-0 rounded-[inherit] bg-gradient-to-t from-transparent via-transparent to-white/15 pointer-events-none" />
    </div>
  );
};
