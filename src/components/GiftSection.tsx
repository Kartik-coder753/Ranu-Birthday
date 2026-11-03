import React, { useState, useRef } from 'react';
import { 
  Gift, 
  Smartphone, 
  Sparkles, 
  ShoppingBag, 
  Heart, 
  Plane, 
  Watch, 
  Headphones, 
  Gem, 
  Crown, 
  CreditCard, 
  Utensils, 
  Smile, 
  X, 
  Edit3, 
  Check, 
  RotateCcw
} from 'lucide-react';
import { BIRTHDAY_CONFIG } from '../config/birthdayConfig';
import { soundEngine } from '../utils/soundEffects';
import { triggerConfettiExplosion, triggerHeartConfetti } from '../utils/confetti';

interface GiftItem {
  id: string;
  name: string;
  icon: string;
  desc: string;
  priceTag: string;
  category: string;
}

const GIFTS_LIST: GiftItem[] = [
  { id: 'iphone', name: 'New iPhone 16 Pro Max', icon: '📱', desc: 'Titanium finish, 1TB storage', priceTag: '₹1,59,900', category: 'Gadgets' },
  { id: 'dresses', name: 'Designer Dresses Collection', icon: '👗', desc: 'Haute couture ethnic & modern outfits', priceTag: '₹45,000', category: 'Fashion' },
  { id: 'makeup', name: 'Luxury Makeup Vanity Kit', icon: '💄', desc: 'Sephora, Charlotte Tilbury, Rare Beauty', priceTag: '₹35,000', category: 'Beauty' },
  { id: 'handbag', name: 'Luxury Handbag', icon: '👜', desc: 'Italian leather designer tote', priceTag: '₹65,000', category: 'Luxury' },
  { id: 'shopping', name: 'Unlimited Shopping Spree', icon: '👠', desc: '3 hours at the best mall with zero budget limit', priceTag: 'Priceless', category: 'Spree' },
  { id: 'jewellery', name: 'Diamond & Rose Gold Jewellery', icon: '💍', desc: 'Sparkling diamond necklace & bracelet', priceTag: '₹85,000', category: 'Jewels' },
  { id: 'headphones', name: 'AirPods Max / Headphones', icon: '🎧', desc: 'Active noise cancellation for ignoring brother', priceTag: '₹59,900', category: 'Audio' },
  { id: 'chocolates', name: 'Imported Belgian Chocolates Box', icon: '🍫', desc: 'Artisan truffles & dark chocolate ganache', priceTag: '₹8,500', category: 'Food' },
  { id: 'teddy', name: 'Giant 6ft Fluffy Teddy Bear', icon: '🧸', desc: 'Bigger than you, warm hugs 24/7', priceTag: '₹12,000', category: 'Cute' },
  { id: 'vacation', name: 'Dream Vacation to Switzerland/Bali', icon: '✈️', desc: 'First class flights & 5-star mountain chalet', priceTag: '₹3,50,000', category: 'Travel' },
  { id: 'salon', name: 'Luxury Spa & Salon Day', icon: '💅', desc: 'Full body massage, facial, manicure & pedicure', priceTag: '₹22,000', category: 'Wellness' },
  { id: 'cake_huge', name: '3-Tier Custom Birthday Cake', icon: '🍰', desc: 'Rich Belgian chocolate with edible 24k gold', priceTag: '₹15,000', category: 'Dessert' },
  { id: 'credit_card', name: 'Unlimited Black Card', icon: '💳', desc: 'Direct access to brother\'s bank savings (LOL)', priceTag: '₹99,99,999', category: 'Fantasy' },
  { id: 'princess', name: 'Princess Treatment Package', icon: '👑', desc: 'Nobody can say no to you for 1 whole month', priceTag: 'Out of Stock', category: 'Royalty' }
];

export const GiftSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTeaseMessage, setActiveTeaseMessage] = useState<string | null>(null);
  const [teaseCount, setTeaseCount] = useState(0);
  const [showSecretModal, setShowSecretModal] = useState(false);
  const [secretGiftAvailable, setSecretGiftAvailable] = useState(false);
  const [customSecretMessage, setCustomSecretMessage] = useState(BIRTHDAY_CONFIG.secretGiftMessage);
  const [isEditingSecret, setIsEditingSecret] = useState(false);

  // Offset map for cards escaping
  const [escapeOffsets, setEscapeOffsets] = useState<Record<string, { x: number; y: number; r: number; s: number }>>({});

  // Trigger escape when hovering (desktop) or tapping (mobile)
  const handleGiftEvade = (giftId: string) => {
    soundEngine.playWhoosh();

    // Random displacement between 40px and 90px
    const randomSignX = Math.random() > 0.5 ? 1 : -1;
    const randomSignY = Math.random() > 0.5 ? 1 : -1;
    const dx = randomSignX * (40 + Math.random() * 50);
    const dy = randomSignY * (35 + Math.random() * 45);
    const dr = (Math.random() - 0.5) * 24; // rotate -12deg to +12deg
    const ds = 0.92 + Math.random() * 0.12;

    setEscapeOffsets(prev => ({
      ...prev,
      [giftId]: { x: dx, y: dy, r: dr, s: ds }
    }));

    // Pick random teasing message
    const msgs = BIRTHDAY_CONFIG.funnyGiftResponses;
    const randomMsg = msgs[Math.floor(Math.random() * msgs.length)];
    setActiveTeaseMessage(randomMsg);

    const newCount = teaseCount + 1;
    setTeaseCount(newCount);

    // After 4 attempts, unlock the secret gift
    if (newCount >= 4) {
      setSecretGiftAvailable(true);
    }
  };

  const handleOpenSecretGift = () => {
    soundEngine.playSparkle();
    triggerHeartConfetti();
    setShowSecretModal(true);
  };

  return (
    <section id="gifts" className="py-12 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      {/* Teaser / Entry Callout */}
      <div className="glass-panel rounded-3xl p-6 sm:p-10 border border-pink-200/90 shadow-xl text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto">
          <span className="text-4xl sm:text-5xl inline-block animate-bounce mb-3">🎁</span>
          
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-800">
            Special Gift Counter for Rani Sahiba
          </h2>
          
          <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
            Welcome to Kartik&apos;s Virtual Gift Emporium! Choose any luxurious gift your heart desires. Everything is ready for you... or is it? 😉
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                setIsOpen(true);
                soundEngine.playSparkle();
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 text-white font-bold text-base sm:text-lg shadow-xl shadow-pink-500/25 hover:shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Gift className="w-5 h-5 animate-pulse" />
              <span>🎁 GIFT CHAHIYE? CLICK HERE!</span>
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-400 italic">
            *Warning: Sibling physics may apply.
          </p>
        </div>
      </div>

      {/* FULL SCREEN / EXPANDED GIFT SCREEN MODAL */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col p-3 sm:p-6 overflow-y-auto">
          
          {/* Header Bar */}
          <div className="max-w-6xl w-full mx-auto flex items-center justify-between pb-4 border-b border-pink-200/40 shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎁</span>
              <div>
                <h3 className="font-display font-bold text-lg sm:text-xl text-white">
                  Pick Your Birthday Gift, Ranu!
                </h3>
                <p className="text-xs text-pink-200">
                  Tap any card to claim it. Attempts: {teaseCount}
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors cursor-pointer"
              title="Close Gift Shop"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Funny Teasing Toast / Banner */}
          {activeTeaseMessage && (
            <div className="max-w-md mx-auto my-3 px-4 py-2.5 rounded-2xl bg-white/95 text-pink-700 shadow-xl border border-pink-300 font-semibold text-xs sm:text-sm text-center flex items-center justify-center gap-2 animate-bounce">
              <span>{activeTeaseMessage}</span>
            </div>
          )}

          {/* Secret Gift Highlight Bar (appears after 4 attempts) */}
          {secretGiftAvailable && (
            <div className="max-w-md mx-auto mb-4 p-3 rounded-2xl bg-gradient-to-r from-amber-200 via-pink-200 to-rose-200 border border-amber-300 shadow-lg text-slate-900 text-center flex items-center justify-between gap-3 animate-pulse">
              <div className="text-left text-xs">
                <span className="font-bold text-pink-900">✨ A Rare Secret Gift has appeared!</span>
                <p className="text-[11px] text-slate-700">This one won&apos;t run away!</p>
              </div>
              <button
                onClick={handleOpenSecretGift}
                className="px-3.5 py-1.5 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow cursor-pointer whitespace-nowrap"
              >
                OPEN SECRET GIFT 💝
              </button>
            </div>
          )}

          {/* Escaping Gifts Grid */}
          <div className="max-w-6xl w-full mx-auto flex-1 py-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            
            {/* The Special Secret Gift Card (if unlocked or can always be spotted as a lucky tile) */}
            {secretGiftAvailable && (
              <div
                onClick={handleOpenSecretGift}
                className="relative rounded-2xl p-4 bg-gradient-to-br from-amber-100 via-pink-100 to-rose-100 border-2 border-amber-400 shadow-xl cursor-pointer hover:scale-105 transition-all text-center flex flex-col items-center justify-between"
              >
                <div className="w-12 h-12 rounded-full bg-amber-400/30 flex items-center justify-center text-2xl mb-1 animate-spin" style={{ animationDuration: '8s' }}>
                  🎁
                </div>
                <div className="font-display font-bold text-sm text-pink-900">
                  SECRET GIFT
                </div>
                <p className="text-[11px] text-pink-700 font-medium mt-1">
                  Click to open the one real gift from Kartik ❤️
                </p>
                <span className="mt-2 text-[10px] font-bold text-amber-800 bg-amber-200/80 px-2 py-0.5 rounded-full">
                  Guaranteed Delivery ✨
                </span>
              </div>
            )}

            {/* Standard 14 Playful Escaping Gifts */}
            {GIFTS_LIST.map((gift) => {
              const offset = escapeOffsets[gift.id] || { x: 0, y: 0, r: 0, s: 1 };
              return (
                <div
                  key={gift.id}
                  onMouseEnter={() => handleGiftEvade(gift.id)}
                  onClick={() => handleGiftEvade(gift.id)}
                  onTouchStart={() => handleGiftEvade(gift.id)}
                  style={{
                    transform: `translate3d(${offset.x}px, ${offset.y}px, 0) rotate(${offset.r}deg) scale(${offset.s})`,
                    transition: 'transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                  }}
                  className="group relative select-none rounded-2xl p-3 sm:p-4 bg-white/90 backdrop-blur border border-pink-100 shadow-md hover:shadow-xl hover:border-pink-300 flex flex-col justify-between text-left cursor-pointer active:scale-90"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl filter drop-shadow">{gift.icon}</span>
                      <span className="text-[10px] font-semibold text-pink-700 bg-pink-50 border border-pink-200 px-2 py-0.5 rounded-full">
                        {gift.priceTag}
                      </span>
                    </div>

                    <h4 className="font-semibold text-xs sm:text-sm text-slate-800 group-hover:text-pink-600 transition-colors leading-tight">
                      {gift.name}
                    </h4>

                    <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">
                      {gift.desc}
                    </p>
                  </div>

                  <div className="mt-3 pt-2 border-t border-pink-50 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">{gift.category}</span>
                    <span className="text-pink-600 font-bold group-hover:underline">
                      Claim Gift →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Back Button */}
          <div className="max-w-6xl w-full mx-auto pt-4 flex justify-center shrink-0">
            <button
              onClick={() => setIsOpen(false)}
              className="px-6 py-2.5 rounded-xl bg-white/90 hover:bg-white text-slate-800 text-xs sm:text-sm font-semibold shadow-md transition-all cursor-pointer"
            >
              Back to Birthday Dashboard
            </button>
          </div>
        </div>
      )}

      {/* THE SECRET GIFT MODAL */}
      {showSecretModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-2xl text-center relative animate-fade-in">
            
            <button
              onClick={() => setShowSecretModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-3xl shadow-md">
              💖
            </div>

            <p className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1">
              Your True Birthday Gift
            </p>
            <h3 className="font-display text-2xl font-bold text-slate-800">
              Priceless & Forever
            </h3>

            {/* Editable or Display View of Secret Gift */}
            <div className="mt-4 p-4 rounded-2xl bg-pink-50/80 border border-pink-200 text-slate-700 text-sm sm:text-base leading-relaxed">
              {isEditingSecret ? (
                <div>
                  <textarea
                    rows={4}
                    value={customSecretMessage}
                    onChange={(e) => setCustomSecretMessage(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
                  />
                  <button
                    onClick={() => setIsEditingSecret(false)}
                    className="mt-2 px-3 py-1 bg-pink-500 text-white rounded-lg text-xs font-medium flex items-center gap-1 mx-auto"
                  >
                    <Check className="w-3.5 h-3.5" /> Save Message
                  </button>
                </div>
              ) : (
                <p className="font-serif italic font-medium text-pink-900">
                  &ldquo;{customSecretMessage}&rdquo;
                </p>
              )}
            </div>

            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setIsEditingSecret(!isEditingSecret)}
                className="text-[11px] text-slate-400 hover:text-slate-700 flex items-center gap-1 transition-colors"
              >
                <Edit3 className="w-3 h-3" />
                <span>{isEditingSecret ? 'Done Editing' : 'Personalize note'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                setShowSecretModal(false);
                setIsOpen(false);
              }}
              className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-sm shadow-md hover:from-pink-600 hover:to-rose-600 active:scale-95 transition-all cursor-pointer"
            >
              I Love This Gift! ❤️
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
