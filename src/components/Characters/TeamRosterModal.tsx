import React from 'react';
import { Users, X, CheckCircle2, MessageSquare, Terminal, GitBranch, ShieldCheck } from 'lucide-react';
import { TEAM_CHARACTERS } from '../../data/characters';
import { CharacterAvatar } from './CharacterAvatar';

interface TeamRosterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TeamRosterModal: React.FC<TeamRosterModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-stage-in">
      <div className="dev-panel w-full max-w-2xl bg-[#121720] border-dev-border shadow-2xl p-5 space-y-4 font-mono">
        <div className="flex items-center justify-between pb-3 border-b border-dev-border">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-git-blue" />
            <h2 className="text-sm font-bold text-dev-heading font-sans uppercase tracking-wider">
              Your Software Development Team
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-dev-subtext hover:text-dev-heading hover:bg-dev-surface transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-dev-subtext font-sans leading-relaxed">
          You are pair-programming with a collaborative team of engineers. Each member guides you through their specialized domain of Git and GitHub.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.values(TEAM_CHARACTERS).map((member) => (
            <div
              key={member.id}
              className="p-3.5 rounded-lg border border-dev-border bg-dev-surface/40 hover:bg-dev-surface/70 transition-all space-y-2.5"
            >
              <div className="flex items-center gap-3">
                <CharacterAvatar character={member} size="lg" mood="greeting" />
                <div>
                  <h3 className="font-bold text-dev-heading font-sans text-xs">
                    {member.name}
                  </h3>
                  <div className="text-[11px] text-git-blue font-medium">
                    {member.role}
                  </div>
                  <div className="text-[10px] text-dev-subtext uppercase font-mono">
                    {member.status}
                  </div>
                </div>
              </div>

              <p className="text-[11px] text-dev-text font-sans leading-relaxed">
                {member.bio}
              </p>

              <div className="pt-2 border-t border-dev-border/50 text-[10.5px]">
                <div className="text-dev-subtext/70 uppercase text-[9.5px]">Specialty:</div>
                <div className="text-emerald-400 font-semibold">{member.specialty}</div>
                <div className="text-dev-subtext italic mt-1 font-sans text-[10.5px]">
                  "{member.quote}"
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2 border-t border-dev-border">
          <button onClick={onClose} className="dev-button px-4 py-1.5 text-xs">
            Back to Missions
          </button>
        </div>
      </div>
    </div>
  );
};
