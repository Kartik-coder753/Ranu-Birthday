import React, { useState, useEffect } from 'react';
import { Camera, Heart, Plus, ZoomIn, X, Clock, Grid } from 'lucide-react';
import { soundEngine } from '../utils/soundEffects';

interface MemoryItem {
  id: string;
  title: string;
  date: string;
  category: 'Childhood' | 'Family' | 'Funny Moments' | 'Special' | 'Recent';
  caption: string;
  image: string;
  likes: number;
  rotation: number;
}

const DEFAULT_MEMORIES: MemoryItem[] = [
  {
    id: 'mem-1',
    title: 'The Golden Childhood Days',
    date: 'Summer 2008',
    category: 'Childhood',
    caption: 'When our biggest worry was who got the bigger slice of mango or the remote! Running around with boundless laughter.',
    image: '/src/assets/images/memory_polaroid_family_1793698842635.jpg',
    likes: 42,
    rotation: -2,
  },
  {
    id: 'mem-2',
    title: 'The Great Ice Cream Robbery',
    date: 'June 2015',
    category: 'Funny Moments',
    caption: 'You swore you didn\'t eat my chocolate bar from the fridge, while chocolate syrup was literally on your chin! 😂',
    image: '/src/assets/images/birthday_cake_deluxe_1793698841440.jpg',
    likes: 38,
    rotation: 3,
  },
  {
    id: 'mem-3',
    title: 'Diwali Sparklers & Smiles',
    date: 'Diwali 2021',
    category: 'Family',
    caption: 'All dressed up in bright traditional clothes, lighting sparklers and taking 100 selfies until you approved one!',
    image: '/src/assets/images/magic_secret_room_1793698843668.jpg',
    likes: 56,
    rotation: -1.5,
  },
  {
    id: 'mem-4',
    title: 'Your Big Graduation Day',
    date: 'Recent',
    category: 'Special',
    caption: 'Seeing you succeed and achieve big milestones. Nobody in that hall was cheering louder than your brother!',
    image: '/src/assets/images/gift_luxury_present_1793698842519.jpg',
    likes: 71,
    rotation: 2.5,
  },
];

export const MemoryGallery: React.FC = () => {
  const [memories, setMemories] = useState<MemoryItem[]>(() => {
    const saved = localStorage.getItem('ranu_birthday_memories');
    return saved ? JSON.parse(saved) : DEFAULT_MEMORIES;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedMemory, setSelectedMemory] = useState<MemoryItem | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'timeline'>('grid');
  const [showUploadModal, setShowUploadModal] = useState(false);

  // New photo upload state
  const [newTitle, setNewTitle] = useState('');
  const [newDate, setNewDate] = useState('');
  const [newCategory, setNewCategory] = useState<MemoryItem['category']>('Special');
  const [newCaption, setNewCaption] = useState('');
  const [newImagePreview, setNewImagePreview] = useState<string>('');

  useEffect(() => {
    localStorage.setItem('ranu_birthday_memories', JSON.stringify(memories));
  }, [memories]);

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playCatchDing();
    setMemories((prev) =>
      prev.map((m) => (m.id === id ? { ...m, likes: m.likes + 1 } : m))
    );
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setNewImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImagePreview) return;

    const newMem: MemoryItem = {
      id: `mem-${Date.now()}`,
      title: newTitle,
      date: newDate || '2026',
      category: newCategory,
      caption: newCaption || 'A cherished memory!',
      image: newImagePreview,
      likes: 1,
      rotation: (Math.random() - 0.5) * 6,
    };

    setMemories([newMem, ...memories]);
    soundEngine.playSparkle();
    setShowUploadModal(false);
    // Reset form
    setNewTitle('');
    setNewDate('');
    setNewCaption('');
    setNewImagePreview('');
  };

  const categories = ['All', 'Childhood', 'Family', 'Funny Moments', 'Special', 'Recent'];

  const filteredMemories =
    activeCategory === 'All'
      ? memories
      : memories.filter((m) => m.category === activeCategory);

  return (
    <section id="memories" className="py-14 px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-xs sm:text-sm font-semibold tracking-wider text-pink-500 uppercase mb-1">
          Moments That Never Fade 📸
        </p>
        <h2 className="font-display text-2xl sm:text-4xl font-bold text-slate-800">
          Our Cherished Memory Album
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
          From childhood sibling chaos to golden life milestones. Tap to zoom in, react with hearts, or upload real photos!
        </p>
      </div>

      {/* Control Strip: Categories & View Mode & Upload */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-8 pb-4 border-b border-pink-100">
        
        {/* Category Filters (interactive segmented buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 bg-pink-50/80 rounded-2xl border border-pink-200/60">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat
                  ? 'bg-white text-pink-600 shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* View mode toggle + Upload button */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'timeline' : 'grid')}
            className="p-2 rounded-xl bg-white border border-pink-200 text-slate-600 hover:text-pink-600 text-xs flex items-center gap-1 shadow-sm transition-colors cursor-pointer"
          >
            {viewMode === 'grid' ? <Clock className="w-3.5 h-3.5" /> : <Grid className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{viewMode === 'grid' ? 'Timeline View' : 'Grid View'}</span>
          </button>

          <button
            onClick={() => setShowUploadModal(true)}
            className="px-3 py-2 rounded-xl bg-pink-500 hover:bg-pink-600 text-white text-xs font-medium flex items-center gap-1.5 shadow-sm transition-colors cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Photo</span>
          </button>
        </div>

      </div>

      {/* GRID OR TIMELINE VIEW */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              onClick={() => setSelectedMemory(memory)}
              style={{
                transform: `rotate(${memory.rotation}deg)`,
              }}
              className="group select-none bg-white p-3.5 sm:p-4 rounded-2xl border border-pink-100 shadow-lg hover:shadow-2xl hover:scale-105 hover:z-20 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Polaroid Photo Frame */}
              <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 mb-3">
                <img
                  src={memory.image}
                  alt={memory.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Vintage Washi Tape Top Accent */}
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-16 h-3 bg-pink-200/80 -rotate-2 rounded-sm pointer-events-none shadow-xs" />

                <div className="absolute top-2 right-2 bg-black/40 backdrop-blur-xs text-white p-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Polaroid Bottom Notes */}
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium mb-1">
                  <span>{memory.date}</span>
                  <span className="text-pink-500 font-semibold">{memory.category}</span>
                </div>

                <h4 className="font-display font-bold text-sm text-slate-800 line-clamp-1 group-hover:text-pink-600 transition-colors">
                  {memory.title}
                </h4>

                <p className="mt-1 text-xs text-slate-500 font-sans line-clamp-2 leading-relaxed">
                  {memory.caption}
                </p>
              </div>

              {/* Heart Reaction Footer */}
              <div className="mt-3 pt-2 border-t border-pink-50 flex items-center justify-between">
                <button
                  onClick={(e) => handleLike(memory.id, e)}
                  className="flex items-center gap-1.5 text-xs text-pink-600 hover:text-pink-700 transition-colors active:scale-125"
                >
                  <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                  <span className="font-semibold">{memory.likes}</span>
                </button>

                <span className="text-[11px] text-slate-400 hover:underline">
                  View story →
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* HORIZONTAL TIMELINE VIEW */
        <div className="space-y-6 max-w-2xl mx-auto border-l-2 border-pink-200 pl-6 ml-4 sm:ml-auto">
          {filteredMemories.map((memory) => (
            <div
              key={memory.id}
              onClick={() => setSelectedMemory(memory)}
              className="relative bg-white rounded-2xl p-4 sm:p-5 border border-pink-100 shadow-md hover:shadow-lg transition-all cursor-pointer"
            >
              {/* Timeline dot */}
              <div className="absolute -left-[31px] top-5 w-4 h-4 rounded-full bg-pink-500 border-4 border-white shadow" />
              
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <img
                  src={memory.image}
                  alt={memory.title}
                  referrerPolicy="no-referrer"
                  className="w-full sm:w-28 h-28 object-cover rounded-xl shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 text-xs text-pink-600 font-medium mb-1">
                    <span>{memory.date}</span>
                    <span>·</span>
                    <span>{memory.category}</span>
                  </div>
                  <h4 className="font-display font-bold text-base text-slate-800">
                    {memory.title}
                  </h4>
                  <p className="mt-1 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {memory.caption}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={(e) => handleLike(memory.id, e)}
                      className="text-xs text-pink-600 font-semibold flex items-center gap-1 hover:underline"
                    >
                      <Heart className="w-3.5 h-3.5 fill-pink-500 text-pink-500" />
                      <span>{memory.likes} loves</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* LIGHTBOX MODAL */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl relative">
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="aspect-[4/3] w-full bg-slate-900">
              <img
                src={selectedMemory.image}
                alt={selectedMemory.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between text-xs text-pink-600 font-medium mb-1">
                <span>{selectedMemory.date}</span>
                <span>{selectedMemory.category}</span>
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                {selectedMemory.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed font-sans">
                {selectedMemory.caption}
              </p>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={(e) => handleLike(selectedMemory.id, e)}
                  className="px-4 py-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 text-xs font-semibold flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Heart className="w-4 h-4 fill-pink-500" />
                  <span>Send Love ({selectedMemory.likes})</span>
                </button>

                <button
                  onClick={() => setSelectedMemory(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD CUSTOM PHOTO MODAL */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full glass-panel-elevated p-6 rounded-3xl border border-pink-200 shadow-2xl relative">
            <button
              onClick={() => setShowUploadModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="font-display text-lg font-bold text-slate-800 mb-1">
              Add Personal Memory 📸
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Upload a real photo of Ranu or both of you to add to this memory wall.
            </p>

            <form onSubmit={handleAddMemory} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Select Photo</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  required
                  className="w-full text-xs text-slate-500 file:mr-2 file:py-2 file:px-3 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-pink-50 file:text-pink-700 hover:file:bg-pink-100"
                />
              </div>

              {newImagePreview && (
                <div className="h-32 w-full rounded-xl overflow-hidden border border-pink-200 bg-slate-50">
                  <img src={newImagePreview} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Memory Title</label>
                <input
                  type="text"
                  placeholder="e.g. Picnic in 2018"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Date / Year</label>
                  <input
                    type="text"
                    placeholder="e.g. Dec 2023"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as MemoryItem['category'])}
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                  >
                    <option value="Childhood">Childhood</option>
                    <option value="Family">Family</option>
                    <option value="Funny Moments">Funny Moments</option>
                    <option value="Special">Special</option>
                    <option value="Recent">Recent</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Caption / Story</label>
                <textarea
                  rows={2}
                  placeholder="What made this moment unforgettable?"
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-pink-500 hover:bg-pink-600 text-white font-semibold text-xs transition-colors cursor-pointer"
              >
                Save to Memory Wall
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
