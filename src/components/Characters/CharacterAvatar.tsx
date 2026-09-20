import React from 'react';
import { Sparkles, Terminal, Code2, ShieldAlert, Check, Lightbulb } from 'lucide-react';
import { Character } from '../../data/characters';

interface CharacterAvatarProps {
  character: Character;
  mood?: 'greeting' | 'explaining' | 'warning' | 'cheering' | 'hint';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showStatus?: boolean;
}

export const CharacterAvatar: React.FC<CharacterAvatarProps> = ({
  character,
  mood = 'greeting',
  size = 'md',
  className = '',
  showStatus = true,
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-11 h-11 text-sm',
    lg: 'w-14 h-14 text-base',
  };

  const getStatusColor = (status: Character['status']) => {
    switch (status) {
      case 'online': return 'bg-emerald-400';
      case 'coding': return 'bg-blue-400';
      case 'reviewing': return 'bg-purple-400';
      default: return 'bg-dev-subtext';
    }
  };

  const renderAvatarSvg = () => {
    switch (character.id) {
      case 'maya':
        // Maya: Frontend Dev with glasses & purple streak
        return (
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <circle cx="20" cy="20" r="18" fill="#10B981" fillOpacity="0.2" stroke="#10B981" strokeWidth="1.5" />
            {/* Hair */}
            <path d="M12 22C12 14 16 10 20 10C24 10 28 14 28 22" fill="#064E3B" />
            {/* Face */}
            <circle cx="20" cy="21" r="7" fill="#FDE68A" />
            {/* Glasses */}
            <rect x="15" y="19" width="4.5" height="3" rx="1" stroke="#047857" strokeWidth="1" fill="none" />
            <rect x="20.5" y="19" width="4.5" height="3" rx="1" stroke="#047857" strokeWidth="1" fill="none" />
            <line x1="19.5" y1="20.5" x2="20.5" y2="20.5" stroke="#047857" strokeWidth="1" />
            {/* Smile */}
            <path d="M18.5 24.5Q20 26 21.5 24.5" stroke="#B45309" strokeWidth="1" strokeLinecap="round" />
            {/* Headphone band */}
            <path d="M10 19C10 13 14 9 20 9C26 9 30 13 30 19" stroke="#34D399" strokeWidth="2" strokeLinecap="round" fill="none" />
            <rect x="9" y="18" width="2" height="5" rx="1" fill="#34D399" />
            <rect x="29" y="18" width="2" height="5" rx="1" fill="#34D399" />
          </svg>
        );

      case 'arjun':
        // Arjun: Backend dev with hoodie & headphones
        return (
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <circle cx="20" cy="20" r="18" fill="#3B82F6" fillOpacity="0.2" stroke="#3B82F6" strokeWidth="1.5" />
            {/* Hoodie */}
            <path d="M11 25C11 16 15 11 20 11C25 11 29 16 29 25" fill="#1E3A8A" />
            {/* Face */}
            <circle cx="20" cy="21" r="7" fill="#FCD34D" />
            {/* Beard */}
            <path d="M16 22C16 26 24 26 24 22" fill="#78350F" />
            {/* Eyes */}
            <circle cx="17.5" cy="20" r="1" fill="#1F2937" />
            <circle cx="22.5" cy="20" r="1" fill="#1F2937" />
            {/* Smile */}
            <path d="M18.5 23Q20 24.5 21.5 23" stroke="#FDE68A" strokeWidth="0.8" strokeLinecap="round" />
          </svg>
        );

      case 'sam':
        // Sam: Senior Staff Tech Lead
        return (
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <circle cx="20" cy="20" r="18" fill="#A855F7" fillOpacity="0.2" stroke="#A855F7" strokeWidth="1.5" />
            {/* Hair */}
            <path d="M13 19C13 12 17 9 20 9C23 9 27 12 27 19" fill="#581C87" />
            {/* Face */}
            <circle cx="20" cy="21" r="7" fill="#FED7AA" />
            {/* Eyebrows (focused) */}
            <line x1="16" y1="18" x2="19" y2="19" stroke="#451A03" strokeWidth="1" strokeLinecap="round" />
            <line x1="24" y1="18" x2="21" y2="19" stroke="#451A03" strokeWidth="1" strokeLinecap="round" />
            {/* Eyes */}
            <circle cx="17.5" cy="20.5" r="1" fill="#1F2937" />
            <circle cx="22.5" cy="20.5" r="1" fill="#1F2937" />
            {/* Subtle smile */}
            <line x1="18.5" y1="24.5" x2="21.5" y2="24.5" stroke="#78350F" strokeWidth="1" strokeLinecap="round" />
          </svg>
        );

      case 'byte':
      default:
        // Byte: The GitBot Robot Companion
        return (
          <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
            <circle cx="20" cy="20" r="18" fill="#F97316" fillOpacity="0.2" stroke="#F97316" strokeWidth="1.5" />
            {/* Antenna */}
            <line x1="20" y1="11" x2="20" y2="7" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="20" cy="6" r="2" fill="#FBBF24" />
            {/* Head */}
            <rect x="12" y="12" width="16" height="15" rx="4" fill="#1E293B" stroke="#F97316" strokeWidth="1.5" />
            {/* Screen eyes */}
            <rect x="15" y="16" width="3" height="4" rx="1" fill="#38BDF8" className="animate-pulse" />
            <rect x="22" y="16" width="3" height="4" rx="1" fill="#38BDF8" className="animate-pulse" />
            {/* Smile / sound wave */}
            <path d="M16 23C18 24.5 22 24.5 24 23" stroke="#FBBF24" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            {/* Ear bolts */}
            <rect x="10" y="16" width="2" height="6" rx="1" fill="#94A3B8" />
            <rect x="28" y="16" width="2" height="6" rx="1" fill="#94A3B8" />
          </svg>
        );
    }
  };

  const getMoodBadge = () => {
    switch (mood) {
      case 'cheering':
        return <Sparkles className="w-3 h-3 text-git-yellow animate-bounce" />;
      case 'warning':
        return <ShieldAlert className="w-3 h-3 text-git-orange animate-pulse" />;
      case 'hint':
        return <Lightbulb className="w-3 h-3 text-amber-300" />;
      case 'explaining':
        return <Code2 className="w-3.5 h-3.5 text-git-blue" />;
      default:
        return null;
    }
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${sizeClasses[size]} ${className}`}>
      {/* Avatar Graphic */}
      <div className="w-full h-full rounded-full overflow-hidden shadow-subtle hover:scale-105 transition-transform duration-200">
        {renderAvatarSvg()}
      </div>

      {/* Status Dot */}
      {showStatus && (
        <span
          className={`absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-dev-bg ${getStatusColor(
            character.status
          )}`}
          title={`${character.name} is ${character.status}`}
        />
      )}

      {/* Mood Badge */}
      {mood !== 'greeting' && (
        <span className="absolute -top-1 -right-1 p-0.5 rounded-full bg-dev-panel border border-dev-border shadow-sm">
          {getMoodBadge()}
        </span>
      )}
    </div>
  );
};
