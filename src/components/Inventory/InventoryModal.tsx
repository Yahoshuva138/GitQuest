import React, { useState } from 'react';
import { X, Sparkles, Shield, Compass, Check, Lock, Award, Package } from 'lucide-react';
import { useGame } from '../../context/GameContext';
import { INVENTORY_ITEMS, InventoryItem } from '../../data/inventory';
import { REGIONS } from '../../data/regions';
import { playClickSound } from '../../utils/audio';

interface InventoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const RARITY_STYLES = {
  common: {
    border: 'border-slate-700',
    bg: 'bg-slate-900/60',
    badge: 'bg-slate-800 text-slate-300 border-slate-700',
    glow: 'hover:border-slate-500',
  },
  rare: {
    border: 'border-blue-500/50',
    bg: 'bg-blue-950/30',
    badge: 'bg-blue-900/60 text-blue-300 border-blue-500/40',
    glow: 'hover:border-blue-400 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)]',
  },
  epic: {
    border: 'border-purple-500/50',
    bg: 'bg-purple-950/30',
    badge: 'bg-purple-900/60 text-purple-300 border-purple-500/40',
    glow: 'hover:border-purple-400 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]',
  },
  legendary: {
    border: 'border-amber-500/60',
    bg: 'bg-amber-950/30',
    badge: 'bg-amber-900/60 text-amber-300 border-amber-500/50',
    glow: 'hover:border-amber-400 hover:shadow-[0_0_20px_rgba(245,158,11,0.4)]',
  },
};

export const InventoryModal: React.FC<InventoryModalProps> = ({ isOpen, onClose }) => {
  const { inventory, soundEnabled } = useGame();
  const [selectedItem, setSelectedItem] = useState<InventoryItem | null>(
    INVENTORY_ITEMS[0] || null
  );
  const [filterCategory, setFilterCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'tool', label: 'Tools' },
    { id: 'artifact', label: 'Artifacts' },
    { id: 'companion', label: 'Companions' },
    { id: 'badge', label: 'Badges' },
  ];

  const filteredItems = INVENTORY_ITEMS.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  const unlockedCount = INVENTORY_ITEMS.filter((item) =>
    inventory.includes(item.id)
  ).length;

  const handleSelectItem = (item: InventoryItem) => {
    if (soundEnabled) playClickSound();
    setSelectedItem(item);
  };

  const handleClose = () => {
    if (soundEnabled) playClickSound();
    onClose();
  };

  const getRegionName = (regionId: string) => {
    const region = REGIONS.find((r) => r.id === regionId);
    return region ? region.name : 'Unknown Realm';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-4xl bg-[#0d121c] border-2 border-rpg-gold/70 rounded-xl shadow-pixelGold overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-5 py-4 bg-[#141b29] border-b-2 border-rpg-gold/40 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-rpg-gold/20 border-2 border-rpg-gold flex items-center justify-center text-xl">
              🎒
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-pixel text-sm sm:text-base text-rpg-gold tracking-wide">
                  ADVENTURER'S BACKPACK
                </h2>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-rpg-gold/20 text-rpg-gold border border-rpg-gold/40 font-bold">
                  {unlockedCount}/{INVENTORY_ITEMS.length} DISCOVERED
                </span>
              </div>
              <p className="text-xs text-dev-subtext font-mono">
                Legendary Git artifacts and companions gathered across your journey
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-lg text-dev-subtext hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="px-5 py-2.5 bg-[#0a0e17] border-b border-dev-border/60 flex items-center gap-1.5 overflow-x-auto text-xs font-mono">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                if (soundEnabled) playClickSound();
                setFilterCategory(cat.id);
              }}
              className={`px-3 py-1.5 rounded-md transition-all uppercase tracking-wider ${
                filterCategory === cat.id
                  ? 'bg-rpg-gold text-black font-bold shadow-pixel'
                  : 'text-dev-subtext hover:text-dev-heading hover:bg-dev-surface/50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Content Body: Grid + Details Split */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 md:grid-cols-12 gap-5">
          {/* Item Slots Grid (7 cols) */}
          <div className="md:col-span-7 space-y-3">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {filteredItems.map((item) => {
                const isUnlocked = inventory.includes(item.id);
                const isSelected = selectedItem?.id === item.id;
                const rarityStyle = RARITY_STYLES[item.rarity];

                return (
                  <button
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className={`relative p-3 rounded-lg border-2 flex flex-col items-center justify-center gap-1.5 transition-all aspect-square text-center ${
                      isSelected
                        ? 'border-rpg-gold bg-rpg-gold/10 scale-105 shadow-pixelGold z-10'
                        : isUnlocked
                        ? `${rarityStyle.border} ${rarityStyle.bg} ${rarityStyle.glow}`
                        : 'border-slate-800 bg-slate-950/40 opacity-45'
                    }`}
                  >
                    <div className="text-3xl filter drop-shadow">
                      {isUnlocked ? item.icon : '🔒'}
                    </div>
                    <span className="text-[10px] font-mono font-medium text-dev-heading line-clamp-1">
                      {isUnlocked ? item.name : 'Unknown'}
                    </span>
                    {isUnlocked && (
                      <span
                        className={`text-[8px] font-mono uppercase px-1 py-0.2 rounded border ${rarityStyle.badge}`}
                      >
                        {item.rarity}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Item Details Card (5 cols) */}
          <div className="md:col-span-5 bg-[#141b29] border-2 border-dev-border rounded-xl p-5 flex flex-col justify-between">
            {selectedItem ? (
              (() => {
                const isUnlocked = inventory.includes(selectedItem.id);
                const rarityStyle = RARITY_STYLES[selectedItem.rarity];

                return (
                  <div className="space-y-4">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center text-4xl shadow-inner ${
                          isUnlocked
                            ? `${rarityStyle.border} ${rarityStyle.bg}`
                            : 'border-slate-800 bg-slate-900'
                        }`}
                      >
                        {isUnlocked ? selectedItem.icon : '🔒'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-[9px] font-mono uppercase px-1.5 py-0.5 rounded border font-bold ${
                              isUnlocked ? rarityStyle.badge : 'bg-slate-800 text-slate-400 border-slate-700'
                            }`}
                          >
                            {selectedItem.rarity}
                          </span>
                          <span className="text-[9px] font-mono text-dev-subtext uppercase">
                            {selectedItem.category}
                          </span>
                        </div>
                        <h3 className="font-pixel text-xs sm:text-sm text-dev-heading mt-1 font-bold">
                          {isUnlocked ? selectedItem.name : 'Undiscovered Relic'}
                        </h3>
                        <p className="text-[11px] font-mono text-dev-subtext mt-0.5">
                          Found in: {getRegionName(selectedItem.unlockedRegionId)}
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-lg bg-black/40 border border-dev-border/70 space-y-2">
                      <div className="text-xs text-dev-text leading-relaxed font-sans">
                        {isUnlocked
                          ? selectedItem.description
                          : 'Complete missions in this realm to unlock and claim this sacred artifact.'}
                      </div>

                      {isUnlocked && (
                        <div className="pt-2 border-t border-dev-border/40 flex items-start gap-2 text-xs font-mono text-rpg-gold">
                          <Sparkles className="w-4 h-4 shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">Active Passive:</span>{' '}
                            <span>{selectedItem.effect}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="p-3 rounded-lg bg-dev-surface/40 border border-dev-border/40 space-y-1">
                      <span className="text-[10px] font-mono text-dev-subtext uppercase font-bold">
                        Codédex Lore
                      </span>
                      <p className="text-xs text-dev-subtext italic">
                        {isUnlocked
                          ? `Artifact #${selectedItem.id.toUpperCase()} resonates with the power of standard version control.`
                          : 'Clear the region quests to awaken the dormant Git enchantment.'}
                      </p>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-center p-6 text-dev-subtext font-mono">
                <Package className="w-12 h-12 mb-2 text-dev-subtext/40" />
                <p>Select an item to view details</p>
              </div>
            )}

            <div className="pt-4 border-t border-dev-border/60">
              <button
                onClick={handleClose}
                className="w-full py-2.5 rounded-lg bg-dev-surface hover:bg-dev-surface/80 border border-dev-border text-xs font-mono font-bold text-dev-heading transition-colors"
              >
                Close Backpack
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
