'use client';

import React, { useState } from 'react';
import {
  Search,
  Play,
  Pause,
  Calendar,
  CheckCircle2,
  ShoppingCart,
  Plus,
  Minus,
  TrendingUp,
  MapPin,
  BedDouble,
  Bath,
  BookOpen,
  Award,
  Stethoscope,
  Sparkles,
  ArrowRight,
  Send,
  Globe,
  Terminal,
  Copy,
  Check,
  Heart,
  Users,
  Utensils,
  Building2,
  BarChart3,
  Briefcase,
  Volume2,
  ShieldCheck,
  Clock,
  Star,
  Phone,
  Layers,
  Activity,
} from 'lucide-react';
import { Project } from '../types/portfolio';

interface LiveSiteRendererProps {
  project: Project;
  imageSrc: string;
  compact?: boolean;
}

export const LiveSiteRenderer: React.FC<LiveSiteRendererProps> = ({
  project,
  imageSrc,
}) => {
  const id = (project.id || '').toLowerCase();
  const titleLower = (project.title || '').toLowerCase();

  // Al-Quran state
  const [quranTab, setQuranTab] = useState<'home' | 'recitations' | 'tafseer' | 'memorization' | 'daily'>('home');
  const [quranFilter, setQuranFilter] = useState<'all' | 'makki' | 'madani'>('all');
  const [quranPlaying, setQuranPlaying] = useState(false);
  const [quranSurahIdx, setQuranSurahIdx] = useState(0);
  const [quranSearch, setQuranSearch] = useState('');

  // Maison Gourmet state
  const [gourmetTab, setGourmetTab] = useState<'home' | 'menu' | 'reservations' | 'events'>('home');
  const [menuTab, setMenuTab] = useState<'starters' | 'mains' | 'desserts'>('mains');
  const [bookingGuestCount, setBookingGuestCount] = useState(4);
  const [bookingTime, setBookingTime] = useState('08:00 PM');
  const [bookingName, setBookingName] = useState('');
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // Store state
  const [cartItems, setCartItems] = useState<Record<string, number>>({ item1: 1 });
  const [selectedCurrency, setSelectedCurrency] = useState<'PKR' | 'USD'>('PKR');
  const [storeCategory, setStoreCategory] = useState('All');
  const [checkoutDone, setCheckoutDone] = useState(false);

  // CloudPulse API state
  const [apiEndpointIdx, setApiEndpointIdx] = useState(0);
  const [apiResponseMs, setApiResponseMs] = useState<number>(14);
  const [copiedCode, setCopiedCode] = useState(false);

  // FinEdge VaultPay state
  const [tradeAmount, setTradeAmount] = useState('25000');
  const [tradeTab, setTradeTab] = useState<'overview' | 'assets' | 'transfers'>('overview');

  // Healthcare state
  const [appointmentSubmitted, setAppointmentSubmitted] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('Dr. Aqsa Ramzan — Senior Consultant');
  const [selectedSlot, setSelectedSlot] = useState('04:30 PM');

  // Real Estate state
  const [propertyFilter, setPropertyFilter] = useState<'all' | 'villa' | 'penthouse'>('all');
  const [likedIds, setLikedIds] = useState<string[]>(['p1']);

  // Grand Pavilion state
  const [hallSelected, setHallSelected] = useState('Royal Crystal Ballroom');
  const [hallBooked, setHallBooked] = useState(false);

  // MBA Academy state
  const [activeLesson, setActiveLesson] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0]);
  const [enrolledCourse, setEnrolledCourse] = useState(false);

  // Quaid Tribute state
  const [tributeEra, setTributeEra] = useState(0);
  const [tributePlaying, setTributePlaying] = useState(false);

  // BizTop & Generic state
  const [bizTab, setBizTab] = useState<'advisory' | 'analytics' | 'quote'>('advisory');
  const [consultSubmitted, setConsultSubmitted] = useState(false);

  // 1. AL-QURAN INTERACTIVE PORTAL (Full faithful multi-section site)
  if (id === 'proj-7' || titleLower.includes('quran')) {
    const surahs = [
      { num: 1, name: 'Al-Fatihah', arabicName: 'الفاتحة', type: 'makki', ayahs: 7, arabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ', translation: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. All praise is due to Allah, Lord of the worlds.', tafseer: 'Al-Fatihah summarizes the core message of the Quran: gratitude, worship of the One Creator, and guidance onto the straight path.' },
      { num: 2, name: 'Al-Baqarah', arabicName: 'البقرة', type: 'madani', ayahs: 286, arabic: 'ذَٰلِكَ الْكِتَابُ لَا رَيْبَ ۛ فِيهِ ۛ هُدًى لِّلْمُتَّقِينَ', translation: 'This is the Book about which there is no doubt, a guidance for those conscious of Allah.', tafseer: 'The longest Surah of the Quran containing foundational principles of faith, law, ethics, and community.' },
      { num: 3, name: 'Al-Imran', arabicName: 'آل عمران', type: 'madani', ayahs: 200, arabic: 'رَبَّنَا مَا خَلَقْتَ هَٰذَا بَاطِلًا سُبْحَانَكَ فَقِنَا عَذَابَ النَّارِ', translation: 'Our Lord, You did not create this aimlessly; exalted are You above such a thing; then protect us from the punishment of the Fire.', tafseer: 'Ayah 191 inspires deep reflection on the creation of the heavens and the earth.' },
      { num: 4, name: 'An-Nisa', arabicName: 'النساء', type: 'madani', ayahs: 176, arabic: 'يَا أَيُّهَا النَّاسُ اتَّقُوا رَبَّكُمُ الَّذِي خَلَقَكُم مِّن نَّفْسٍ وَاحِدَةٍ', translation: 'O mankind, fear your Lord, who created you from one soul.', tafseer: 'Emphasizes social justice, family rights, inheritance fairness, and compassion.' },
      { num: 55, name: 'Ar-Rahman', arabicName: 'الرحمن', type: 'madani', ayahs: 78, arabic: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ', translation: 'So which of the favors of your Lord would you deny?', tafseer: 'Reminds believers of the countless spiritual and earthly blessings granted by The Most Merciful.' },
    ].filter((s) => {
      const matchesType = quranFilter === 'all' || s.type === quranFilter;
      const matchesSearch = !quranSearch || s.name.toLowerCase().includes(quranSearch.toLowerCase());
      return matchesType && matchesSearch;
    });

    const activeSurah = surahs[quranSurahIdx] || surahs[0];

    return (
      <div className="bg-[#FAF8F2] text-[#0E291C] min-h-full font-sans">
        {/* Top Green Header matching original site */}
        <header className="bg-[#0B2B1B] text-white px-6 py-4 border-b-2 border-[#C5A059] sticky top-0 z-20 shadow-md">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#DFC285]">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-bold text-lg text-[#F3DFAD] leading-none">Al-Quran</div>
                <div className="text-[11px] text-[#A3B8A8]">Interactive Portal</div>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-1 sm:gap-2">
              {[
                { id: 'home', label: 'Home' },
                { id: 'recitations', label: 'Recitations' },
                { id: 'tafseer', label: 'Tafseer' },
                { id: 'memorization', label: 'Memorization' },
                { id: 'daily', label: 'Daily Ayah' },
              ].map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setQuranTab(item.id as any)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    quranTab === item.id
                      ? 'bg-[#C5A059] text-[#0B2B1B]'
                      : 'text-[#E3ECE6] hover:text-[#DFC285] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="relative w-full sm:w-56">
              <Search className="w-3.5 h-3.5 text-[#DFC285] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={quranSearch}
                onChange={(e) => { setQuranSearch(e.target.value); setQuranSurahIdx(0); }}
                placeholder="Search all Surahs, Ayahs..."
                className="w-full pl-8 pr-3 py-1.5 rounded-full bg-white/10 border border-[#C5A059]/40 text-xs text-white placeholder-white/60 focus:outline-none focus:border-[#DFC285]"
              />
            </div>
          </div>
        </header>

        {/* Ornamental Hero Calligraphy Banner */}
        <section className="bg-gradient-to-b from-[#0E3622] to-[#FAF8F2] pt-6 pb-8 px-6">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-[#0A291A] via-[#113D27] to-[#082115] border-4 border-[#C5A059] p-6 sm:p-10 text-center text-[#F3DFAD] shadow-2xl relative overflow-hidden">
            <div className="text-sm sm:text-base text-[#DFC285] mb-2 font-serif">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
            {activeSurah && (
              <>
                <p className="text-2xl sm:text-4xl font-bold leading-relaxed tracking-wide my-4" dir="rtl">
                  {activeSurah.arabic}
                </p>
                <div className="text-xs sm:text-sm font-semibold text-[#C5A059] uppercase tracking-widest">
                  (Surah {activeSurah.name} · Verse #{activeSurah.num})
                </div>
              </>
            )}
          </div>
        </section>

        {/* Daily Ayah + Recitation Audio Player */}
        <section className="max-w-6xl mx-auto px-6 pb-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7 space-y-2">
            <div className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">
              {quranTab === 'tafseer' ? 'Authentic Tafseer Insight' : quranTab === 'memorization' ? 'Hifz & Revision Mode' : 'Daily Ayah & Translation'}
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-[#0E291C]">
              {activeSurah ? `Surah ${activeSurah.name} (${activeSurah.arabicName})` : 'No matching Surah found'}
            </h2>
            {activeSurah && (
              <p className="text-sm sm:text-base text-[#40594B] leading-relaxed">
                {quranTab === 'tafseer' ? activeSurah.tafseer : `"${activeSurah.translation}"`}
              </p>
            )}
          </div>

          <div className="lg:col-span-5 bg-[#0B2B1B] text-white rounded-2xl p-5 border border-[#C5A059]/50 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-bold text-sm text-[#F3DFAD]">Sheikh Mishary Rashid Alafasy</div>
                <div className="text-xs text-[#A3B8A8]">
                  {quranPlaying ? 'Now Playing HD Tilawat (Offline Sync Ready)' : 'High-Bitrate Recitation Stream'}
                </div>
              </div>
              <Volume2 className="w-5 h-5 text-[#C5A059]" />
            </div>
            <div className="w-full h-1.5 bg-white/15 rounded-full overflow-hidden">
              <div className={`h-full bg-[#C5A059] transition-all duration-500 ${quranPlaying ? 'w-3/5 animate-pulse' : 'w-1/4'}`} />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono text-[#A3B8A8]">{quranPlaying ? '01:30 / 03:15' : '00:45 / 03:15'}</span>
              <button
                type="button"
                onClick={() => setQuranPlaying(!quranPlaying)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5A059] hover:bg-[#DFC285] text-[#0B2B1B] font-bold text-xs cursor-pointer transition-all"
              >
                {quranPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{quranPlaying ? 'Pause Tilawat' : 'Play Recitation'}</span>
              </button>
            </div>
          </div>
        </section>

        {/* Explore Surahs Grid */}
        <section className="max-w-6xl mx-auto px-6 pb-12 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="font-display text-2xl font-bold text-[#0E291C]">Explore Surahs</h3>
            <div className="flex gap-2">
              {(['all', 'makki', 'madani'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => { setQuranFilter(f); setQuranSurahIdx(0); }}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize cursor-pointer border ${
                    quranFilter === f
                      ? 'bg-[#0B2B1B] text-[#DFC285] border-[#0B2B1B]'
                      : 'bg-white text-[#40594B] border-[#0E291C]/15 hover:border-[#C5A059]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {surahs.map((s, idx) => (
              <button
                key={s.num}
                type="button"
                onClick={() => setQuranSurahIdx(idx)}
                className={`p-5 rounded-2xl border-2 text-center transition-all cursor-pointer ${
                  quranSurahIdx === idx
                    ? 'bg-[#0B2B1B] text-white border-[#C5A059] shadow-xl -translate-y-1'
                    : 'bg-[#0E3622] text-white border-[#C5A059]/35 hover:border-[#C5A059]'
                }`}
              >
                <div className="text-2xl font-serif text-[#F3DFAD] mb-2">{s.arabicName}</div>
                <div className="font-bold text-sm">{s.num}. {s.name}</div>
                <div className="text-[11px] text-[#A3B8A8] capitalize mt-1">{s.type} · {s.ayahs} Ayahs</div>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // 2. MAISON GOURMET / SAFFRON LOUNGE
  if (id === 'proj-12' || titleLower.includes('gourmet') || titleLower.includes('restaurant') || titleLower.includes('saffron')) {
    const menus = {
      starters: [
        { name: 'Truffle Burrata Bruschetta', price: '$18', desc: 'Heirloom tomatoes, aged balsamic glaze & grilled sourdough' },
        { name: 'Saffron Lobster Bisque', price: '$22', desc: 'Slow-simmered saffron cream & warm herb brioche' },
      ],
      mains: [
        { name: 'Saffron Spiced Tagine', price: '$38', desc: 'Signature braised lamb shank, preserved lemon & saffron couscous' },
        { name: 'Herb-Crusted Wagyu Ribeye', price: '$54', desc: 'Black truffle jus, charred asparagus & smoked butter' },
        { name: 'Pan-Seared Wild Salmon', price: '$34', desc: 'Fennel puree, saffron emulsion & crispy capers' },
      ],
      desserts: [
        { name: 'Gold Leaf Pistachio Baklava', price: '$16', desc: 'Crispy phyllo, rosewater syrup & cardamom gelato' },
        { name: 'Dark Chocolate Fondant', price: '$15', desc: 'Molten 70% Valrhona ganache & Madagascar vanilla bean' },
      ],
    };

    return (
      <div className="bg-[#FAF6EE] text-[#1A1410] min-h-full">
        <header className="bg-[#18120E] text-white px-6 py-4 border-b border-[#C5A059]/30 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <Utensils className="w-5 h-5 text-[#DFC285]" />
              <span className="font-display font-bold text-xl text-[#F3DFAD]">Saffron Lounge · Maison Gourmet</span>
            </div>
            <div className="flex items-center gap-2">
              {(['home', 'menu', 'reservations', 'events'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setGourmetTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider cursor-pointer ${
                    gourmetTab === tab ? 'bg-[#991B1B] text-white' : 'text-stone-300 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Full Hero */}
        <section className="relative bg-gradient-to-r from-[#1A130F] via-[#2B1D14] to-[#1A130F] text-white py-14 px-6">
          <div className="max-w-5xl mx-auto text-center space-y-4">
            <span className="px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#DFC285] text-xs font-bold uppercase tracking-widest">
               Michelin-Inspired Dining & Live Booking
            </span>
            <h1 className="font-display text-3xl sm:text-5xl font-bold">Experience Saffron Lounge: Elevated Dining, Exquisite Flavors.</h1>
            <p className="text-sm sm:text-base text-stone-300 max-w-2xl mx-auto">
              Artisanal tasting menus crafted daily with hand-harvested saffron, wood-fired specialties, and private VIP chef tables.
            </p>
            <div className="flex justify-center gap-3 pt-2">
              <button type="button" onClick={() => setGourmetTab('menu')} className="px-6 py-2.5 rounded-xl bg-[#991B1B] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase cursor-pointer">
                Explore Menu
              </button>
              <button type="button" onClick={() => setGourmetTab('reservations')} className="px-6 py-2.5 rounded-xl bg-[#C5A059] hover:bg-[#DFC285] text-[#1A130F] font-bold text-xs uppercase cursor-pointer">
                Reserve Table
              </button>
            </div>
          </div>
        </section>

        {/* Menu + Reservation Grid */}
        <section className="max-w-6xl mx-auto p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h2 className="font-display text-2xl font-bold">Chef's Signature Creations</h2>
              <div className="flex gap-1.5 bg-[#EFE8DA] p-1 rounded-xl">
                {(['starters', 'mains', 'desserts'] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setMenuTab(t)}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize cursor-pointer ${
                      menuTab === t ? 'bg-[#18120E] text-[#DFC285]' : 'text-stone-600'
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {menus[menuTab].map((dish) => (
                <div key={dish.name} className="bg-white p-5 rounded-2xl border border-stone-200 shadow-xs flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-bold text-base">{dish.name}</h3>
                    <p className="text-xs text-stone-500 mt-1">{dish.desc}</p>
                  </div>
                  <span className="text-xl font-bold text-[#991B1B] shrink-0">{dish.price}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#18120E] text-white rounded-3xl p-6 sm:p-7 space-y-5 shadow-xl h-fit">
            <h2 className="font-display text-2xl font-bold text-[#F3DFAD] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#C5A059]" />
              <span>Book Your Table Live</span>
            </h2>
            {bookingSubmitted ? (
              <div className="p-6 rounded-2xl bg-emerald-500/15 border border-emerald-400/40 text-center space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <div className="font-bold text-lg">Reservation Confirmed!</div>
                <p className="text-xs text-emerald-200">
                  {bookingName || 'VIP Guest'} · Table for {bookingGuestCount} at {bookingTime}
                </p>
                <button type="button" onClick={() => setBookingSubmitted(false)} className="text-xs font-bold text-[#DFC285] underline cursor-pointer pt-2">
                  Modify Reservation
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-stone-400 block mb-1">Guest Name</label>
                  <input
                    type="text"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    placeholder="Enter your name..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/10 border border-white/15 text-xs text-white placeholder-stone-400"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-stone-400 block mb-1">Party Size</label>
                  <div className="flex items-center justify-between bg-white/10 p-2 rounded-xl border border-white/15">
                    <button type="button" onClick={() => setBookingGuestCount(Math.max(1, bookingGuestCount - 1))} className="p-1.5 rounded-lg bg-white/10 cursor-pointer"><Minus className="w-4 h-4" /></button>
                    <span className="font-bold text-sm">{bookingGuestCount} Guests</span>
                    <button type="button" onClick={() => setBookingGuestCount(Math.min(16, bookingGuestCount + 1))} className="p-1.5 rounded-lg bg-white/10 cursor-pointer"><Plus className="w-4 h-4" /></button>
                  </div>
                </div>
                <div>
                  <label className="text-[11px] uppercase tracking-wider text-stone-400 block mb-1">Evening Seating</label>
                  <div className="grid grid-cols-3 gap-2">
                    {['07:00 PM', '08:00 PM', '09:30 PM'].map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setBookingTime(slot)}
                        className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                          bookingTime === slot ? 'bg-[#C5A059] text-[#18120E] border-[#C5A059]' : 'bg-white/5 border-white/15 text-stone-300'
                        }`}
                      >
                        {slot}
                      </button>
                    ))}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingSubmitted(true)}
                  className="w-full py-3 rounded-xl bg-[#991B1B] hover:bg-[#B91C1C] text-white font-bold text-xs uppercase tracking-wider cursor-pointer transition-all"
                >
                  Confirm Reservation Now
                </button>
              </div>
            )}
          </div>
        </section>
      </div>
    );
  }

  // 3. MBA ACADEMY & LEARNING HUB
  if (id === 'proj-8' || titleLower.includes('mba') || titleLower.includes('academy')) {
    const lessons = [
      { title: '01. Strategic Corporate Finance & Valuation', duration: '24 mins', instructor: 'Prof. Hamza Tariq' },
      { title: '02. Full-Stack Digital Product Architecture', duration: '32 mins', instructor: 'Mushahid Hussain' },
      { title: '03. Data Analytics & Market Scaling Systems', duration: '28 mins', instructor: 'Dr. Ayesha Malik' },
    ];
    return (
      <div className="bg-[#F4F7FB] text-[#0F172A] min-h-full">
        <header className="bg-white border-b border-slate-200 px-6 py-4 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#2563EB] text-white flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-xl">MBA Academy</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">
                Progress: {Math.round((completedLessons.length / lessons.length) * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setEnrolledCourse(!enrolledCourse)}
                className="px-4 py-2 rounded-xl bg-[#2563EB] text-white text-xs font-bold cursor-pointer"
              >
                {enrolledCourse ? '✓ Enrolled in Cohort' : 'Enroll Now'}
              </button>
            </div>
          </div>
        </header>

        <section className="bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] py-12 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="px-3 py-1 rounded-full bg-white text-[#2563EB] text-xs font-bold uppercase shadow-2xs">
                Verified Certificate Track
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight text-[#0F172A]">
                Master Business Administration. Accelerate Your Career.
              </h1>
              <p className="text-sm sm:text-base text-slate-600">
                Interactive video modules, executive case studies, progress certificates, and live cohort mentorship.
              </p>
            </div>

            <div className="lg:col-span-6 bg-[#0F172A] text-white rounded-3xl p-6 shadow-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-1 rounded-lg bg-[#2563EB]/25 text-blue-300 text-[11px] font-bold uppercase">
                  Now Streaming Lesson
                </span>
                <span className="text-xs text-slate-400">{lessons[activeLesson].duration}</span>
              </div>
              <h2 className="text-xl font-bold">{lessons[activeLesson].title}</h2>
              <p className="text-xs text-slate-300">Instructor: {lessons[activeLesson].instructor}</p>
              <button
                type="button"
                onClick={() => {
                  if (!completedLessons.includes(activeLesson)) setCompletedLessons([...completedLessons, activeLesson]);
                }}
                className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-blue-500 text-white font-bold text-xs uppercase cursor-pointer transition-all"
              >
                {completedLessons.includes(activeLesson) ? '✓ Module Completed' : 'Complete & Earn Credit'}
              </button>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto p-6 sm:p-10 space-y-5">
          <h3 className="font-display text-2xl font-bold">Popular Specializations & Modules</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {lessons.map((l, idx) => (
              <button
                key={l.title}
                type="button"
                onClick={() => setActiveLesson(idx)}
                className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeLesson === idx
                    ? 'bg-[#0F172A] text-white border-[#2563EB] shadow-lg'
                    : 'bg-white border-slate-200 hover:border-blue-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-bold text-[#2563EB]">{l.duration}</span>
                  <span>{completedLessons.includes(idx) ? '✓ Done' : 'Play ▶'}</span>
                </div>
                <div className="font-bold text-base">{l.title}</div>
                <div className="text-xs opacity-75 mt-1">{l.instructor}</div>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  // 4. 25TH DECEMBER — QUAID-E-AZAM NATIONAL TRIBUTE PORTAL
  if (id === 'proj-6' || titleLower.includes('quaid') || titleLower.includes('25th')) {
    const timeline = [
      { year: '1876', title: 'Birth in Karachi', desc: 'Born on 25 December 1876 at Wazir Mansion, Karachi — beginning the journey of the Father of the Nation.' },
      { year: '1913', title: 'Joining All-India Muslim League', desc: 'Championing constitutional unity, minority safeguards, and historic political awakening.' },
      { year: '1940', title: 'Lahore Resolution', desc: 'Delivering the historic March 23 address articulating the vision of an independent sovereign state.' },
      { year: '1947', title: '14 August — Creation of Pakistan', desc: 'Sworn in as the First Governor-General of Pakistan — "Faith, Unity, Discipline".' },
    ];

    return (
      <div className="bg-[#F4F7F5] text-[#0E291C] min-h-full">
        <header className="bg-[#083D22] text-white px-6 py-4 border-b-2 border-[#C5A059] sticky top-0 z-20">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/10 border border-[#C5A059] flex items-center justify-center font-bold text-[#F3DFAD]">
                ☪
              </div>
              <div>
                <div className="font-bold text-sm sm:text-base tracking-wide">QUAID-E-AZAM DAY</div>
                <div className="text-[10px] text-[#A3B8A8] tracking-widest">25TH DECEMBER NATIONAL ARCHIVE</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setTributePlaying(!tributePlaying)}
              className="px-4 py-2 rounded-full bg-[#C5A059] text-[#083D22] text-xs font-bold flex items-center gap-2 cursor-pointer"
            >
              {tributePlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{tributePlaying ? 'Playing 1947 Speech...' : 'Listen 1947 Address'}</span>
            </button>
          </div>
        </header>

        <section className="bg-gradient-to-br from-[#0A4627] via-[#062C18] to-[#083D22] text-white py-14 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-7 space-y-4">
              <span className="px-3 py-1 rounded-full bg-white/10 border border-[#C5A059]/40 text-[#DFC285] text-xs font-bold uppercase tracking-widest">
                National Heritage Archive
              </span>
              <h1 className="font-display text-3xl sm:text-5xl font-bold leading-tight">
                A Tribute to Quaid-e-Azam Muhammad Ali Jinnah
              </h1>
              <p className="text-sm sm:text-base text-[#D3E3D8] italic">
                "With faith, discipline and selfless devotion to duty, there is nothing worthwhile that you cannot achieve."
              </p>
            </div>
            <div className="md:col-span-5 bg-white/10 backdrop-blur-md border border-[#C5A059]/40 rounded-2xl p-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-widest text-[#DFC285]">Historical Audio Archive</div>
              <div className="p-3 rounded-xl bg-black/30 flex items-center justify-between">
                <span className="text-xs font-semibold">1. Constituent Assembly Address (1947)</span>
                <span className="text-xs font-mono text-[#DFC285]">03:03</span>
              </div>
              <div className="p-3 rounded-xl bg-black/30 flex items-center justify-between">
                <span className="text-xs font-semibold">2. Radio Pakistan Independence Broadcast</span>
                <span className="text-xs font-mono text-[#DFC285]">03:40</span>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-5xl mx-auto p-6 sm:p-10 space-y-6">
          <div className="text-center space-y-2">
            <h2 className="font-display text-2xl sm:text-3xl font-bold">Historical Timeline: 1876 – 1948</h2>
            <p className="text-xs text-[#40594B]">Select a milestone year below to explore the historical archive</p>
          </div>
          <div className="flex justify-center gap-2 flex-wrap">
            {timeline.map((t, idx) => (
              <button
                key={t.year}
                type="button"
                onClick={() => setTributeEra(idx)}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all ${
                  tributeEra === idx ? 'bg-[#083D22] text-[#DFC285] shadow-md scale-105' : 'bg-white border border-gray-200 text-[#0E291C]'
                }`}
              >
                {t.year}
              </button>
            ))}
          </div>
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#083D22]/15 shadow-sm text-center space-y-2">
            <div className="text-2xl font-bold text-[#083D22]">
              {timeline[tributeEra].year} — {timeline[tributeEra].title}
            </div>
            <p className="text-sm text-[#40594B] max-w-2xl mx-auto leading-relaxed">{timeline[tributeEra].desc}</p>
          </div>
        </section>
      </div>
    );
  }

  // 5. FINEDGE VAULTPAY DASHBOARD
  if (id === 'proj-13' || titleLower.includes('finedge') || titleLower.includes('wealth') || titleLower.includes('vault')) {
    const balance = 148920 + Number(tradeAmount || 0);
    return (
      <div className="bg-[#06130D] text-white min-h-full">
        <header className="px-6 py-4 bg-[#081A12] border-b border-emerald-500/20 sticky top-0 z-20">
          <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-white">FinEdge · VaultPay</h2>
                <p className="text-[11px] text-emerald-400">&lt; 15ms European Fintech Ecosystem</p>
              </div>
            </div>
            <div className="flex gap-1.5 bg-white/5 p-1 rounded-xl">
              {(['overview', 'assets', 'transfers'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setTradeTab(tab)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold capitalize cursor-pointer ${
                    tradeTab === tab ? 'bg-emerald-500 text-[#06130D]' : 'text-gray-300 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-6 rounded-2xl bg-[#0C2117] border border-emerald-500/25">
              <div className="text-xs text-emerald-300">Total Liquidity Balance</div>
              <div className="text-3xl font-bold mt-1 font-mono">${balance.toLocaleString()}</div>
              <div className="text-xs text-emerald-400 mt-1">+18.4% this quarter</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0C2117] border border-emerald-500/25">
              <div className="text-xs text-emerald-300">Instant Settlement Latency</div>
              <div className="text-3xl font-bold mt-1 font-mono">12 ms</div>
              <div className="text-xs text-emerald-400 mt-1">EU SEPA Instant Verified</div>
            </div>
            <div className="p-6 rounded-2xl bg-[#0C2117] border border-emerald-500/25">
              <label className="text-xs text-emerald-300 block mb-2">Simulate Deposit ($)</label>
              <input
                type="number"
                value={tradeAmount}
                onChange={(e) => setTradeAmount(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-black/40 border border-emerald-500/30 text-sm font-mono text-white"
              />
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0C2117] border border-white/10 space-y-3">
            <h3 className="font-bold text-sm uppercase tracking-wider text-emerald-300">
              {tradeTab === 'overview' && 'Live Market & Asset Allocation'}
              {tradeTab === 'assets' && 'European Treasury Holdings'}
              {tradeTab === 'transfers' && 'Recent Instant Settlements'}
            </h3>
            {[
              { name: 'EUR Treasury Yield Fund', change: '+4.82%', val: '$64,200', status: 'Active' },
              { name: 'Global Tech Equity Basket', change: '+12.14%', val: '$52,400', status: 'Gaining' },
              { name: 'Automated FX Liquidity Pool', change: '+2.35%', val: '$32,320', status: 'Synced' },
            ].map((row) => (
              <div key={row.name} className="flex items-center justify-between p-4 rounded-xl bg-black/30 border border-white/5">
                <div>
                  <div className="font-bold text-sm">{row.name}</div>
                  <div className="text-[11px] text-gray-400">{row.status}</div>
                </div>
                <div className="text-right font-mono">
                  <div className="font-bold text-sm">{row.val}</div>
                  <div className="text-xs text-emerald-400">{row.change}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 6. CLOUDPULSE API & MICROSERVICES HUB
  if (id === 'proj-14' || titleLower.includes('cloudpulse') || titleLower.includes('microservice') || titleLower.includes('api')) {
    const endpoints = [
      { method: 'GET', path: '/v2/clusters/health', latency: 14, payload: '{\n  "status": "operational",\n  "uptime": "99.99%",\n  "activeNodes": 47,\n  "region": "eu-central-1"\n}' },
      { method: 'POST', path: '/v2/webhooks/dispatch', latency: 29, payload: '{\n  "delivered": true,\n  "queueDepth": 0,\n  "retryPolicy": "exponential"\n}' },
      { method: 'GET', path: '/v2/metrics/throughput', latency: 19, payload: '{\n  "requestsPerSec": 18420,\n  "errorRate": "0.002%",\n  "p99LatencyMs": 58\n}' },
    ];
    const activeEp = endpoints[apiEndpointIdx];

    return (
      <div className="bg-[#0B1220] text-slate-100 min-h-full p-6 sm:p-8 font-mono">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-700/60 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center text-cyan-400">
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-bold text-lg text-white font-sans">CloudPulse Live API Dashboard</h2>
                <p className="text-xs text-cyan-400">Interactive Microservice Telemetry & Runner</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
              100% Uptime · {apiResponseMs}ms Avg
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 space-y-2.5">
              {endpoints.map((ep, idx) => (
                <button
                  key={ep.path}
                  type="button"
                  onClick={() => { setApiEndpointIdx(idx); setApiResponseMs(ep.latency); }}
                  className={`w-full p-4 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                    apiEndpointIdx === idx ? 'bg-cyan-500/15 border-cyan-400 text-white' : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">{ep.method}</span>
                    <span className="text-xs">{ep.path}</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                </button>
              ))}
            </div>

            <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-cyan-300 font-bold">200 OK JSON Output</span>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(activeEp.payload);
                      setCopiedCode(true);
                      setTimeout(() => setCopiedCode(false), 1800);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs flex items-center gap-1 cursor-pointer"
                  >
                    {copiedCode ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setApiResponseMs(Math.floor(11 + Math.random() * 18))}
                    className="px-3 py-1 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs cursor-pointer"
                  >
                    Test Live ▶
                  </button>
                </div>
              </div>
              <pre className="p-4 rounded-xl bg-black/60 text-emerald-300 text-xs overflow-x-auto leading-relaxed">
                {activeEp.payload}
              </pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 7. E-COMMERCE STORES (Meer Royal Decor, Novara Store, Al-Noor Textiles, ShopNova)
  if (id === 'proj-2' || id === 'proj-4' || id === 'proj-10' || id === 'proj-16' || titleLower.includes('decor') || titleLower.includes('novara') || titleLower.includes('textile') || titleLower.includes('shopnova')) {
    const isShopNova = id === 'proj-16' || titleLower.includes('shopnova');
    const isTextile = titleLower.includes('textile');
    const isDecor = titleLower.includes('decor');
    const storeProducts = isShopNova
      ? [
          { id: 'item1', name: 'NovaSound Pro Wireless Headphones', pkr: 14999, usd: 54, cat: 'Electronics' },
          { id: 'item2', name: 'Chronos Automatic Steel Watch', pkr: 24500, usd: 88, cat: 'Watches' },
          { id: 'item3', name: 'AirFlex Runner Sneakers', pkr: 9800, usd: 35, cat: 'Footwear' },
        ]
      : isDecor
      ? [
          { id: 'item1', name: 'Royal Velvet Tufted Sofa', pkr: 145000, usd: 520, cat: 'Living Room' },
          { id: 'item2', name: 'Imperial Gold Console Table', pkr: 68000, usd: 245, cat: 'Bespoke' },
          { id: 'item3', name: 'Chandelier Crystal Heritage', pkr: 92000, usd: 330, cat: 'Lighting' },
        ]
      : isTextile
      ? [
          { id: 'item1', name: 'Egyptian Cotton Roll (100m)', pkr: 85000, usd: 305, cat: 'Bulk Wholesale' },
          { id: 'item2', name: 'Organic Linen Suiting Fabric', pkr: 62000, usd: 225, cat: 'Export' },
          { id: 'item3', name: 'Jacquard Woven Brocade Lot', pkr: 112000, usd: 400, cat: 'Factory Direct' },
        ]
      : [
          { id: 'item1', name: 'Minimalist Wool Overcoat', pkr: 18500, usd: 66, cat: 'Outerwear' },
          { id: 'item2', name: 'Tailored Merino Blazer', pkr: 14900, usd: 54, cat: 'Tailored' },
          { id: 'item3', name: 'Heavyweight Fleece Hoodie', pkr: 6800, usd: 25, cat: 'Essentials' },
        ];

    const visibleItems = storeProducts.filter((p) => storeCategory === 'All' || p.cat === storeCategory);
    const totalCartCount = Object.values(cartItems).reduce((a, b) => a + b, 0);
    const totalAmount = storeProducts.reduce((sum, p) => sum + (cartItems[p.id] || 0) * (selectedCurrency === 'PKR' ? p.pkr : p.usd), 0);

    return (
      <div className="bg-[#FAF7F0] text-[#11261B] min-h-full p-6 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#11261B]/10">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">Live E-Commerce Storefront</span>
              <h2 className="font-display text-2xl sm:text-3xl font-bold">{project.title}</h2>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex bg-white border border-[#11261B]/15 rounded-xl p-1 text-xs font-bold">
                {(['PKR', 'USD'] as const).map((cur) => (
                  <button
                    key={cur}
                    type="button"
                    onClick={() => setSelectedCurrency(cur)}
                    className={`px-3 py-1 rounded-lg cursor-pointer ${selectedCurrency === cur ? 'bg-[#11261B] text-[#DFC285]' : 'text-[#5C6E61]'}`}
                  >
                    {cur}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setCheckoutDone(true)}
                className="px-4 py-2 rounded-xl bg-[#11261B] text-white text-xs font-bold flex items-center gap-2 cursor-pointer"
              >
                <ShoppingCart className="w-4 h-4 text-[#C5A059]" />
                <span>{totalCartCount} Items · {selectedCurrency === 'PKR' ? `₨ ${totalAmount.toLocaleString()}` : `$${totalAmount.toLocaleString()}`}</span>
              </button>
            </div>
          </div>

          <div className="flex gap-2 flex-wrap">
            {['All', ...storeProducts.map((p) => p.cat)].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setStoreCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold cursor-pointer ${
                  storeCategory === cat ? 'bg-[#11261B] text-[#DFC285]' : 'bg-white border border-[#11261B]/15 text-[#5C6E61]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {checkoutDone && (
            <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-900">✓ Express Checkout Demo Triggered ({totalCartCount} items)!</span>
              <button type="button" onClick={() => setCheckoutDone(false)} className="text-xs font-bold underline text-emerald-700 cursor-pointer">Dismiss</button>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {visibleItems.map((item) => {
              const qty = cartItems[item.id] || 0;
              return (
                <div key={item.id} className="bg-white rounded-2xl p-5 border border-[#11261B]/10 shadow-xs flex flex-col justify-between gap-4">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#F2EDE2] text-[#11261B] text-[10px] font-bold uppercase">{item.cat}</span>
                    <h3 className="font-bold text-lg mt-2">{item.name}</h3>
                    <div className="text-2xl font-bold text-[#C5A059] mt-1">
                      {selectedCurrency === 'PKR' ? `₨ ${item.pkr.toLocaleString()}` : `$${item.usd}`}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-gray-100">
                    {qty > 0 ? (
                      <div className="flex items-center justify-between bg-[#F2EDE2] rounded-xl p-1">
                        <button type="button" onClick={() => setCartItems({ ...cartItems, [item.id]: qty - 1 })} className="p-1.5 rounded-lg bg-white cursor-pointer"><Minus className="w-3.5 h-3.5" /></button>
                        <span className="text-xs font-bold">{qty} in Cart</span>
                        <button type="button" onClick={() => setCartItems({ ...cartItems, [item.id]: qty + 1 })} className="p-1.5 rounded-lg bg-white cursor-pointer"><Plus className="w-3.5 h-3.5" /></button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCartItems({ ...cartItems, [item.id]: 1 })}
                        className="w-full py-2.5 rounded-xl bg-[#11261B] hover:bg-[#1A3828] text-white text-xs font-bold cursor-pointer"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 8. HEALTHCARE PORTALS (Raheem Rehab)
  if (id === 'proj-9' || titleLower.includes('rehab') || titleLower.includes('manshiyat')) {
    return (
      <div className="bg-[#F4FAF6] text-[#0E2A1E] min-h-full p-6 sm:p-8">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 flex flex-wrap items-center justify-between gap-4 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold">{project.title}</h2>
                <p className="text-xs text-emerald-700 font-semibold">Online Medical Consultation & Appointment Scheduling</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold">Doctors Available Today</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 space-y-3">
              <h3 className="font-bold text-base">Select Specialist</h3>
              {['Dr. Aqsa Ramzan — Senior Consultant', 'Dr. Tariq Mehmood — Rehab Therapy', 'Dr. Sara Khan — Family Medicine'].map((doc) => (
                <button
                  key={doc}
                  type="button"
                  onClick={() => { setSelectedDoctor(doc); setAppointmentSubmitted(false); }}
                  className={`w-full p-3.5 rounded-xl border text-left text-xs font-bold cursor-pointer transition-all ${
                    selectedDoctor === doc ? 'bg-[#11261B] text-[#DFC285] border-[#11261B]' : 'bg-gray-50 border-gray-200 hover:border-emerald-400'
                  }`}
                >
                  {doc}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 border border-emerald-900/10 space-y-4">
              <h3 className="font-bold text-base">Select Consultation Slot</h3>
              <div className="grid grid-cols-3 gap-2">
                {['11:00 AM', '04:30 PM', '07:00 PM'].map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setSelectedSlot(s); setAppointmentSubmitted(false); }}
                    className={`py-2 rounded-xl text-xs font-bold border cursor-pointer ${
                      selectedSlot === s ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-gray-50 border-gray-200'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {appointmentSubmitted ? (
                <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 text-center space-y-1">
                  <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                  <div className="font-bold text-sm">Appointment Confirmed!</div>
                  <p className="text-xs text-emerald-800">{selectedDoctor} at {selectedSlot}</p>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setAppointmentSubmitted(true)}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer"
                >
                  Book Instant Consultation
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 9. HORIZON LUXURY REAL ESTATE
  if (id === 'proj-11' || titleLower.includes('estate') || titleLower.includes('horizon')) {
    const listings = [
      { id: 'p1', type: 'villa', title: 'Emerald Hills Signature Villa', loc: 'DHA Phase 8, Lahore', price: '₨ 14.5 Cr', beds: 6, baths: 7, area: '2 Kanal' },
      { id: 'p2', type: 'penthouse', title: 'Skyline Sovereign Penthouse', loc: 'Clifton Block 4, Karachi', price: '₨ 9.8 Cr', beds: 4, baths: 5, area: '5,200 Sq Ft' },
      { id: 'p3', type: 'villa', title: 'Margalla View Contemporary Estate', loc: 'F-7/2, Islamabad', price: '₨ 22.0 Cr', beds: 7, baths: 8, area: '3 Kanal' },
    ].filter((l) => propertyFilter === 'all' || l.type === propertyFilter);

    return (
      <div className="bg-[#F8F5EE] text-[#11261B] min-h-full p-6 sm:p-8">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#11261B]/10 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C5A059]">Live Property Portal</span>
              <h2 className="font-display text-3xl font-bold">Horizon Luxury Real Estate</h2>
            </div>
            <div className="flex gap-2">
              {(['all', 'villa', 'penthouse'] as const).map((f) => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setPropertyFilter(f)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold capitalize cursor-pointer ${
                    propertyFilter === f ? 'bg-[#11261B] text-[#DFC285]' : 'bg-white border border-[#11261B]/15 text-[#5C6E61]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {listings.map((item) => {
              const isLiked = likedIds.includes(item.id);
              return (
                <div key={item.id} className="bg-white rounded-2xl p-6 border border-[#11261B]/10 shadow-xs space-y-3">
                  <div className="flex items-start justify-between">
                    <span className="px-2.5 py-1 rounded-lg bg-[#11261B] text-[#DFC285] text-[10px] font-bold uppercase">{item.type}</span>
                    <button
                      type="button"
                      onClick={() => setLikedIds(isLiked ? likedIds.filter((x) => x !== item.id) : [...likedIds, item.id])}
                      className="p-1.5 rounded-full hover:bg-rose-50 cursor-pointer"
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'text-rose-500 fill-rose-500' : 'text-gray-400'}`} />
                    </button>
                  </div>
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#5C6E61]">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>{item.loc}</span>
                  </div>
                  <div className="text-2xl font-bold text-[#11261B]">{item.price}</div>
                  <div className="flex items-center gap-4 text-xs text-[#5C6E61] pt-3 border-t border-gray-100">
                    <span className="flex items-center gap-1"><BedDouble className="w-3.5 h-3.5" /> {item.beds}</span>
                    <span className="flex items-center gap-1"><Bath className="w-3.5 h-3.5" /> {item.baths}</span>
                    <span>{item.area}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 10. GRAND PAVILION
  if (id === 'proj-5' || titleLower.includes('pavilion')) {
    return (
      <div className="bg-[#121D16] text-[#F8F5EE] min-h-full p-6 sm:p-10">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2 pb-4 border-b border-[#C5A059]/25">
            <Building2 className="w-9 h-9 text-[#C5A059] mx-auto" />
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#F3DFAD]">The Grand Pavilion</h2>
            <p className="text-xs text-[#A3B8A8]">Interactive Convention & Luxury Event Venue Booking</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { name: 'Royal Crystal Ballroom', cap: '1,200 Guests', price: '₨ 450,000' },
              { name: 'Emerald Garden Courtyard', cap: '600 Guests', price: '₨ 280,000' },
              { name: 'Executive Summit Hall', cap: '300 Guests', price: '₨ 160,000' },
            ].map((hall) => (
              <button
                key={hall.name}
                type="button"
                onClick={() => { setHallSelected(hall.name); setHallBooked(false); }}
                className={`p-5 rounded-2xl border text-left cursor-pointer transition-all ${
                  hallSelected === hall.name ? 'bg-[#C5A059] text-[#11261B] border-[#F3DFAD]' : 'bg-white/5 border-white/10 hover:border-[#C5A059]/50'
                }`}
              >
                <div className="font-bold text-base">{hall.name}</div>
                <div className="text-xs opacity-80 mt-1 flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {hall.cap}</div>
                <div className="font-bold text-sm mt-3">{hall.price}</div>
              </button>
            ))}
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-[#C5A059]/30 flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-xs text-[#DFC285]">Selected Venue</div>
              <div className="font-bold text-lg">{hallSelected}</div>
            </div>
            <button
              type="button"
              onClick={() => setHallBooked(true)}
              className="px-5 py-2.5 rounded-xl bg-[#C5A059] text-[#11261B] font-bold text-xs uppercase cursor-pointer"
            >
              {hallBooked ? '✓ Date Availability Reserved!' : 'Check & Reserve Date'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 11. BIZTOP ENTERPRISE PORTAL & DEFAULT FULL-SITE TEMPLATE
  return (
    <div className="bg-[#F8F5EE] text-[#11261B] min-h-full">
      <div className="bg-gradient-to-br from-[#0B2016] via-[#11261B] to-[#1A3828] text-white p-6 sm:p-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-7 space-y-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C5A059]/20 border border-[#C5A059]/40 text-[#DFC285] text-[11px] font-bold uppercase tracking-widest">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{project.categoryLabel || 'Live Web Application'}</span>
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold leading-tight">{project.title}</h2>
            <p className="text-sm text-[#D6E2DA] leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {(['advisory', 'analytics', 'quote'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setBizTab(t)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase cursor-pointer ${
                    bizTab === t ? 'bg-[#C5A059] text-[#0F1B14]' : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-[#C5A059]/40 shadow-2xl bg-[#07130A]">
              <img
                src={imageSrc}
                alt={project.title}
                referrerPolicy="no-referrer"
                className="w-full h-52 object-cover object-top"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="md:col-span-7 bg-white rounded-2xl p-6 border border-[#11261B]/10 space-y-4 shadow-xs">
          <h3 className="font-bold text-lg text-[#11261B] flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-[#C5A059]" />
            <span>{bizTab === 'analytics' ? 'Enterprise Metrics & Performance' : 'Production Features & Live Architecture'}</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(project.features && project.features.length > 0
              ? project.features
              : [
                  'Responsive Desktop & Mobile Layout',
                  'High-Speed SSR & Asset Caching',
                  'Clean Modular TypeScript Codebase',
                  'Real-Time Cloud & Database Sync',
                ]
            ).map((feat) => (
              <div key={feat} className="p-3 rounded-xl bg-[#F8F5EE] border border-[#11261B]/10 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 bg-white rounded-2xl p-6 border border-[#11261B]/10 space-y-4 shadow-xs">
          <h3 className="font-bold text-lg text-[#11261B]">Interactive Consultation Test</h3>
          {consultSubmitted ? (
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-bold">
              ✓ Demo inquiry submitted! Our engineering team will reach out shortly.
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-[#5C6E61]">Test the live inquiry workflow or contact Mushahid for a custom build like {project.title}.</p>
              <button
                type="button"
                onClick={() => setConsultSubmitted(true)}
                className="w-full py-2.5 rounded-xl bg-[#11261B] hover:bg-[#1A3828] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>Trigger Live Inquiry</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
