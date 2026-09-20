import React, { useState } from 'react';
import {
  X,
  Github,
  Check,
  User,
  Shield,
  Sparkles,
  Zap,
  Lock,
  Mail,
  LogOut,
} from 'lucide-react';
import { ANIME_CHARACTERS } from '../../data/animeCharacters';
import { useGame } from '../../context/GameContext';
import { playPowerUpSound, playClickSound } from '../../utils/audio';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { soundEnabled, level, xp } = useGame();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('gitquest_logged_in') === 'true';
  });

  const [username, setUsername] = useState<string>(() => {
    return localStorage.getItem('gitquest_username') || 'yahoshuva138';
  });

  const [email, setEmail] = useState<string>(() => {
    return localStorage.getItem('gitquest_user_email') || 'yahoshuva@gitquest.dev';
  });

  const [selectedAvatar, setSelectedAvatar] = useState<string>(() => {
    return localStorage.getItem('gitquest_anime_char') || 'sakura-coder';
  });

  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  if (!isOpen) return null;

  const getNinjaRank = (lvl: number) => {
    if (lvl >= 12) return { title: 'HOKAGE / PIRATE KING', badge: '👑', color: 'text-amber-400 border-amber-500/50 bg-amber-950/40' };
    if (lvl >= 8) return { title: 'JONIN / FIRST MATE', badge: '🗡️', color: 'text-purple-400 border-purple-500/50 bg-purple-950/40' };
    if (lvl >= 4) return { title: 'CHUNIN / PIRATE WARRIOR', badge: '⚡', color: 'text-sky-400 border-sky-500/50 bg-sky-950/40' };
    return { title: 'GENIN / CABIN BOY', badge: '🍃', color: 'text-emerald-400 border-emerald-500/50 bg-emerald-950/40' };
  };

  const rank = getNinjaRank(level);

  const handleGitHubAuth = () => {
    if (soundEnabled) playPowerUpSound();
    localStorage.setItem('gitquest_logged_in', 'true');
    localStorage.setItem('gitquest_username', username);
    localStorage.setItem('gitquest_user_email', email);
    localStorage.setItem('gitquest_anime_char', selectedAvatar);
    setIsLoggedIn(true);
    onClose();
  };

  const handleLogout = () => {
    if (soundEnabled) playClickSound();
    localStorage.removeItem('gitquest_logged_in');
    setIsLoggedIn(false);
  };

  const handleClose = () => {
    if (soundEnabled) playClickSound();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#0d121c] border-2 border-rpg-gold/70 rounded-2xl shadow-pixelGold overflow-hidden flex flex-col">
        {/* Header */}
        <div className="px-5 py-4 bg-[#141b29] border-b-2 border-rpg-gold/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rpg-gold/20 border-2 border-rpg-gold flex items-center justify-center text-xl">
              🥷
            </div>
            <div>
              <h2 className="font-pixel text-xs sm:text-sm text-rpg-gold tracking-wide">
                ANIME DEVELOPER ACCOUNT
              </h2>
              <p className="text-xs text-dev-subtext font-mono">
                {isLoggedIn ? 'Manage your sync & developer rank' : 'Join the GitQuest Developer Guild'}
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-dev-subtext hover:text-white hover:bg-white/10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          {isLoggedIn ? (
            /* Logged in state */
            <div className="space-y-4 font-mono text-xs">
              <div className="p-4 rounded-xl bg-black/40 border border-dev-border/70 flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-900/50 to-pink-900/50 border-2 border-rpg-gold flex items-center justify-center text-3xl shadow-inner">
                  {ANIME_CHARACTERS.find((c) => c.id === selectedAvatar)?.avatar || '🌸'}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-dev-heading">
                      {username}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border font-bold ${rank.color}`}>
                      {rank.badge} {rank.title}
                    </span>
                  </div>
                  <div className="text-[11px] text-dev-subtext">{email}</div>
                  <div className="text-[11px] text-rpg-xp font-bold">
                    Level {level} • {xp} XP Earned
                  </div>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Account synced to local browser storage with 100% privacy.</span>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={handleLogout}
                  className="flex-1 py-2.5 rounded-xl bg-rose-950/40 hover:bg-rose-900/50 border border-rose-600/40 text-rose-300 font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Log Out</span>
                </button>
                <button
                  onClick={handleClose}
                  className="flex-1 py-2.5 rounded-xl bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-dev-heading font-bold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Login / Sign Up Form */
            <div className="space-y-4 font-mono text-xs">
              {/* GitHub OAuth Button */}
              <button
                onClick={handleGitHubAuth}
                className="w-full py-3 rounded-xl bg-[#24292e] hover:bg-[#2f363d] text-white font-sans font-bold flex items-center justify-center gap-2.5 shadow-md border border-white/10 active:scale-95 transition-all"
              >
                <Github className="w-4 h-4" />
                <span>Sign in with GitHub (Instant Sync)</span>
              </button>

              <div className="flex items-center gap-3 text-dev-subtext text-[11px]">
                <div className="flex-1 h-[1px] bg-dev-border" />
                <span>OR ENTER DEVELOPER HANDLE</span>
                <div className="flex-1 h-[1px] bg-dev-border" />
              </div>

              {/* Input Fields */}
              <div className="space-y-3">
                <div>
                  <label className="text-[10px] uppercase text-dev-subtext font-bold block mb-1">
                    Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-dev-subtext absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/50 border border-dev-border text-dev-heading focus:outline-none focus:border-rpg-gold"
                      placeholder="e.g. naruto_coder"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] uppercase text-dev-subtext font-bold block mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-dev-subtext absolute left-3 top-2.5" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 rounded-lg bg-black/50 border border-dev-border text-dev-heading focus:outline-none focus:border-rpg-gold"
                      placeholder="ninja@konoha.dev"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                onClick={handleGitHubAuth}
                className="w-full py-3 rounded-xl bg-rpg-gold hover:bg-amber-400 text-black font-pixel text-xs font-bold border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 transition-all shadow-pixelGold flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>ACTIVATE ANIME ACCOUNT</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
