import React, { useEffect, useState } from 'react';
import { X, Sparkles, Award, Zap, CheckCircle2, Trophy, Terminal } from 'lucide-react';
import { playNotificationSound } from '../../utils/audio';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'xp' | 'level-up' | 'mission' | 'badge' | 'hacker' | 'info';
  icon?: string;
  duration?: number;
}

interface AnimeNotificationProps {
  notification: NotificationItem | null;
  onDismiss: () => void;
}

export const AnimeNotification: React.FC<AnimeNotificationProps> = ({
  notification,
  onDismiss,
}) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    if (!notification) return;

    setProgress(100);
    const duration = notification.duration || 4000;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev <= step) {
          clearInterval(timer);
          onDismiss();
          return 0;
        }
        return prev - step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [notification, onDismiss]);

  if (!notification) return null;

  const getStyle = () => {
    switch (notification.type) {
      case 'level-up':
        return {
          border: 'border-rpg-gold',
          bg: 'bg-[#151205]/95',
          glow: 'anime-aura-gold',
          text: 'text-rpg-gold',
          icon: '👑',
        };
      case 'xp':
        return {
          border: 'border-purple-500/60',
          bg: 'bg-[#130d22]/95',
          glow: 'anime-aura-purple',
          text: 'text-purple-300',
          icon: '✨',
        };
      case 'mission':
        return {
          border: 'border-emerald-500/60',
          bg: 'bg-[#0a1813]/95',
          glow: 'shadow-[0_0_15px_rgba(16,185,129,0.3)]',
          text: 'text-emerald-300',
          icon: '🏆',
        };
      case 'badge':
        return {
          border: 'border-amber-500/60',
          bg: 'bg-[#181309]/95',
          glow: 'anime-aura-gold',
          text: 'text-yellow-300',
          icon: '🎖️',
        };
      case 'hacker':
        return {
          border: 'border-cyan-500/60',
          bg: 'bg-[#09151e]/95',
          glow: 'anime-aura-cyan',
          text: 'text-cyan-300',
          icon: '⚡',
        };
      default:
        return {
          border: 'border-dev-border',
          bg: 'bg-[#0e1320]/95',
          glow: 'shadow-lg',
          text: 'text-dev-heading',
          icon: '🔔',
        };
    }
  };

  const style = getStyle();

  return (
    <div className="fixed top-16 right-4 z-50 max-w-sm w-full animate-fadeIn select-none">
      <div
        className={`relative p-4 rounded-2xl border-2 ${style.border} ${style.bg} ${style.glow} backdrop-blur-md shadow-2xl overflow-hidden`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="text-2xl shrink-0 mt-0.5 animate-bounce">
              {notification.icon || style.icon}
            </div>
            <div>
              <div className={`font-pixel text-xs font-bold ${style.text}`}>
                {notification.title}
              </div>
              <p className="text-xs font-mono text-dev-text mt-1 leading-relaxed">
                {notification.message}
              </p>
            </div>
          </div>

          <button
            onClick={onDismiss}
            className="p-1 rounded text-dev-subtext hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Auto-dismiss progress bar */}
        <div className="absolute bottom-0 inset-x-0 h-1 bg-black/40">
          <div
            className={`h-full transition-all ease-linear ${
              notification.type === 'level-up'
                ? 'bg-rpg-gold'
                : notification.type === 'hacker'
                ? 'bg-cyan-400'
                : 'bg-git-blue'
            }`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
};
