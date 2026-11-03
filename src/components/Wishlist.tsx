import React, { useState, useEffect } from 'react';
import { 
  HeartHandshake, 
  Plus, 
  Trash2, 
  Share2, 
  Send, 
  Check, 
  Sparkles, 
  ShoppingBag, 
  Plane, 
  Utensils, 
  Smile, 
  Smartphone, 
  Sparkle
} from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';
import { triggerConfettiExplosion } from '../utils/confetti';

interface WishItem {
  id: string;
  name: string;
  category: string;
  priority: 'High' | 'Medium' | 'Dream';
  notes?: string;
  createdAt: string;
}

const INITIAL_WISHES: WishItem[] = [
  {
    id: 'w-1',
    name: 'A full-day luxury spa and relaxation package',
    category: 'Beauty',
    priority: 'High',
    notes: 'No interruptions or work calls allowed!',
    createdAt: '2026-11-03',
  },
  {
    id: 'w-2',
    name: 'Next-gen wireless noise-cancelling headphones',
    category: 'Gadgets',
    priority: 'Medium',
    notes: 'In rose gold or lavender color',
    createdAt: '2026-11-03',
  },
  {
    id: 'w-3',
    name: 'Weekend getaway trip with 5-star mountain view',
    category: 'Travel',
    priority: 'Dream',
    notes: 'Kartik sponsors the hotel stay',
    createdAt: '2026-11-03',
  },
];

export const Wishlist: React.FC = () => {
  const [wishes, setWishes] = useState<WishItem[]>(() => {
    const saved = localStorage.getItem('ranu_birthday_wishlist');
    return saved ? JSON.parse(saved) : INITIAL_WISHES;
  });

  const [name, setName] = useState('');
  const [category, setCategory] = useState('Fashion');
  const [priority, setPriority] = useState<WishItem['priority']>('High');
  const [notes, setNotes] = useState('');
  const [submittedModalOpen, setSubmittedModalOpen] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  useEffect(() => {
    localStorage.setItem('ranu_birthday_wishlist', JSON.stringify(wishes));
  }, [wishes]);

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newWish: WishItem = {
      id: `wish-${Date.now()}`,
      name: name.trim(),
      category,
      priority,
      notes: notes.trim(),
      createdAt: new Date().toISOString().split('T')[0],
    };

    setWishes([newWish, ...wishes]);
    soundEngine.playCatchDing();
    triggerConfettiExplosion();

    // Reset inputs
    setName('');
    setNotes('');
  };

  const handleDeleteWish = (id: string) => {
    setWishes(wishes.filter((w) => w.id !== id));
  };

  const handleSubmitDemands = () => {
    soundEngine.playCelebrationFanfare();
    setSubmittedModalOpen(true);
  };

  const handleCopyShare = () => {
    const textLines = [
      "✨ RANU'S OFFICIAL BIRTHDAY WISHLIST FOR KARTIK ✨",
      "----------------------------------------------",
      ...wishes.map((w, i) => `${i + 1}. [${w.category}] ${w.name} (${w.priority} Priority)${w.notes ? ` - Note: ${w.notes}` : ''}`),
      "----------------------------------------------",
      "Kindly approve all demands immediately! 👑😂"
    ];
    navigator.clipboard.writeText(textLines.join('\n'));
    setCopiedShare(true);
    soundEngine.playSparkle();
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const categories = ['Fashion', 'Beauty', 'Gadgets', 'Travel', 'Food', 'Experiences'];

  const getCategoryIcon = (cat: string) => {
    switch (cat) {
      case 'Fashion': return '👗';
      case 'Beauty': return '💄';
      case 'Gadgets': return '📱';
      case 'Travel': return '✈️';
      case 'Food': return '🍰';
      case 'Experiences': return '🎟️';
      default: return '✨';
    }
  };

  return (
    <section id="wishlist" className="py-14 px-4 sm:px-6 md:px-8 max-w-4xl mx-auto">
      <div className="glass-panel-elevated rounded-3xl p-6 sm:p-10 border border-pink-200/90 shadow-2xl relative">
        
        {/* Header */}
        <div className="text-center mb-8">
          <p className="text-xs sm:text-sm font-semibold tracking-wider text-pink-500 uppercase mb-1">
            Official Birthday Registry ✨
          </p>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-800">
            WHAT DOES RANU WANT THIS YEAR?
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Log all your wishes, demands, and royal requirements. Stored safely in your browser!
          </p>
        </div>

        {/* Add Wish Form */}
        <form onSubmit={handleAddWish} className="bg-pink-50/70 p-4 sm:p-6 rounded-2xl border border-pink-100 mb-8 space-y-3">
          <div className="text-xs font-bold text-pink-900 flex items-center gap-1.5 uppercase tracking-wide">
            <Plus className="w-4 h-4 text-pink-600" />
            <span>Add A New Birthday Wish</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="What item or experience do you want?"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              />
            </div>

            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>
                    {getCategoryIcon(c)} {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder="Special notes (e.g. color, size, brand, etc.)"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              />
            </div>

            <div className="flex gap-2">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as WishItem['priority'])}
                className="flex-1 px-3 py-2.5 text-xs sm:text-sm rounded-xl border border-pink-200 focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white"
              >
                <option value="High">🔥 High Priority</option>
                <option value="Medium">⚡ Medium</option>
                <option value="Dream">🌟 Dream Wish</option>
              </select>

              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs sm:text-sm shadow-sm transition-colors cursor-pointer whitespace-nowrap"
              >
                Add Wish
              </button>
            </div>
          </div>
        </form>

        {/* Wishes List */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 px-1">
            <span>Ranu&apos;s Active Demands ({wishes.length})</span>
            <span>Priority</span>
          </div>

          {wishes.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs bg-white/60 rounded-2xl border border-dashed border-pink-200">
              Your wishlist is empty! Add your first birthday wish above. 🌸
            </div>
          ) : (
            wishes.map((wish) => (
              <div
                key={wish.id}
                className="p-3.5 sm:p-4 rounded-2xl bg-white border border-pink-100 shadow-sm flex items-start justify-between gap-3 group hover:border-pink-300 transition-all"
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl shrink-0 mt-0.5">
                    {getCategoryIcon(wish.category)}
                  </span>
                  <div>
                    <h4 className="font-semibold text-xs sm:text-sm text-slate-800">
                      {wish.name}
                    </h4>
                    {wish.notes && (
                      <p className="text-[11px] text-slate-500 mt-0.5 font-sans">
                        Note: {wish.notes}
                      </p>
                    )}
                    <span className="text-[10px] text-pink-500 font-medium mt-1 inline-block">
                      {wish.category} · Added {wish.createdAt}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                      wish.priority === 'High'
                        ? 'bg-rose-100 text-rose-700'
                        : wish.priority === 'Dream'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-amber-100 text-amber-700'
                    }`}
                  >
                    {wish.priority}
                  </span>

                  <button
                    onClick={() => handleDeleteWish(wish.id)}
                    className="p-1.5 rounded-lg text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                    title="Remove wish"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Action Buttons: Submit to Brother + Copy Share */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 border-t border-pink-100">
          <button
            onClick={handleSubmitDemands}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold text-xs sm:text-sm shadow-md hover:from-pink-600 hover:to-rose-600 active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>SUBMIT YOUR DEMANDS TO KARTIK 😂</span>
          </button>

          <button
            onClick={handleCopyShare}
            className="w-full sm:w-auto px-5 py-3.5 rounded-2xl bg-white hover:bg-pink-50 text-pink-700 border border-pink-200 font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            {copiedShare ? <Check className="w-4 h-4 text-green-600" /> : <Share2 className="w-4 h-4 text-pink-500" />}
            <span>{copiedShare ? 'Copied to Clipboard!' : 'Share / Copy List 📋'}</span>
          </button>
        </div>

      </div>

      {/* SUBMITTED DEMANDS FUNNY MODAL */}
      {submittedModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel-elevated p-6 sm:p-8 rounded-3xl border border-pink-200 shadow-2xl text-center animate-fade-in">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center text-3xl">
              🤣
            </div>

            <p className="text-xs font-semibold text-pink-600 uppercase tracking-widest mb-1">
              Brotherhood Ministry of Finance
            </p>
            <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-800">
              Demands Received!
            </h3>

            <div className="mt-4 p-4 rounded-2xl bg-pink-50 border border-pink-200 text-pink-900 text-sm font-medium leading-relaxed">
              &ldquo;Your demands have officially reached the brother&apos;s department. <br />
              <strong>Processing time: 100 business years!</strong> 🤣&rdquo;
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Estimated Delivery Date: November 2126. Please check your spam folder!
            </p>

            <button
              onClick={() => setSubmittedModalOpen(false)}
              className="mt-6 w-full py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs sm:text-sm shadow transition-colors cursor-pointer"
            >
              Okay, I Will Keep Waiting! 😂
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
