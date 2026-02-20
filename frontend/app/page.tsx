"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const CATEGORIES = [
  "All",
  "Today\u2019s Deals",
  "Electronics",
  "Home & Kitchen",
  "Fashion",
  "Books",
  "Toys & Games",
  "Grocery",
  "Health",
  "Sports",
  "Automotive",
];

const HERO_SLIDES = [
  { bg: "from-sky-700 to-indigo-900", title: "Members-only exclusive", subtitle: "Save up to 30% on top deals", badge: "VeloCart+" },
  { bg: "from-amber-600 to-orange-800", title: "New arrivals in Electronics", subtitle: "Shop the latest gadgets and gear", badge: "Trending" },
  { bg: "from-emerald-700 to-teal-900", title: "Home & Kitchen essentials", subtitle: "Refresh your space for less", badge: "Top Picks" },
  { bg: "from-fuchsia-700 to-purple-900", title: "Fashion forward", subtitle: "Spring styles starting at $19.99", badge: "Season Sale" },
];

type Product = {
  id: number;
  name: string;
  price: string;
  oldPrice?: string;
  rating: number;
  reviews: number;
  badge?: string;
  color: string;
  icon: string;
  category: string;
};

const PRODUCT_NAMES = [
  "Wireless Bluetooth Headphones", "Smart Home Speaker", "USB-C Fast Charger",
  "Stainless Steel Water Bottle", "LED Desk Lamp", "Mechanical Keyboard",
  "Portable Power Bank 20000mAh", "Noise Cancelling Earbuds", "Webcam HD 1080p",
  "Fitness Tracker Band", "Laptop Stand Adjustable", "Wireless Mouse Ergonomic",
  "Phone Case Premium", "HDMI Cable 6ft", "Microfiber Cleaning Cloth Set",
  "Smart Watch Series 5", "Air Purifier HEPA", "Electric Kettle 1.7L",
  "Yoga Mat Premium", "Backpack Travel 40L", "Ring Light 10 inch",
  "Bluetooth Car Adapter", "Desk Organizer Wood", "Screen Protector 3-Pack",
];
const PRODUCT_CATS = [
  "Electronics", "Electronics", "Electronics",
  "Home & Kitchen", "Home & Kitchen", "Electronics",
  "Electronics", "Electronics", "Electronics",
  "Health", "Electronics", "Electronics",
  "Electronics", "Electronics", "Home & Kitchen",
  "Electronics", "Home & Kitchen", "Home & Kitchen",
  "Sports", "Fashion", "Electronics",
  "Automotive", "Home & Kitchen", "Electronics",
];
const COLORS = ["bg-blue-100", "bg-amber-100", "bg-emerald-100", "bg-rose-100", "bg-violet-100", "bg-cyan-100", "bg-orange-100", "bg-pink-100"];
const ICONS = ["\u{1F4F1}", "\u{1F3A7}", "\u2328\uFE0F", "\u{1F4A1}", "\u{1F50B}", "\u{1F392}", "\u231A", "\u{1F5A5}\uFE0F", "\u{1F3CB}\uFE0F", "\u{1F9F4}", "\u{1F4F7}", "\u{1F3AE}"];

function makeProducts(offset: number, count: number, badge?: string): Product[] {
  const out: Product[] = [];
  for (let i = 0; i < count; i++) {
    const idx = (offset + i) % PRODUCT_NAMES.length;
    const base = 9.99 + ((idx * 7 + 3) % 90);
    const hasOld = i % 3 === 0;
    out.push({
      id: offset + i,
      name: PRODUCT_NAMES[idx],
      price: `$${base.toFixed(2)}`,
      oldPrice: hasOld ? `$${(base + 15 + (i % 20)).toFixed(2)}` : undefined,
      rating: 3.5 + ((idx * 3) % 15) / 10,
      reviews: 120 + idx * 47,
      badge,
      color: COLORS[idx % COLORS.length],
      icon: ICONS[idx % ICONS.length],
      category: PRODUCT_CATS[idx],
    });
  }
  return out;
}

const ALL_PRODUCTS = makeProducts(0, 24);
const DEALS = makeProducts(0, 8, "Deal");
const RECOMMENDED = makeProducts(8, 8);
const RECENTLY_VIEWED = makeProducts(16, 8);
const BUY_AGAIN = makeProducts(4, 6);

function Stars({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  return (
    <span className="inline-flex items-center gap-px text-amber-500">
      {Array.from({ length: 5 }, (_, i) => (
        <svg key={i} viewBox="0 0 20 20" className="h-3.5 w-3.5" fill={i < full ? "currentColor" : i === full && half ? "url(#half)" : "#d1d5db"}>
          <defs>
            <linearGradient id="half">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#d1d5db" />
            </linearGradient>
          </defs>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </span>
  );
}

function ProductCard({ product, onAddToCart, signedIn }: { product: Product; onAddToCart: (p: Product) => void; signedIn: boolean }) {
  return (
    <div className="group flex min-w-[180px] flex-shrink-0 flex-col rounded-lg border border-gray-200 bg-white p-3 shadow-sm transition hover:shadow-md">
      <Link href={signedIn ? "#" : "/signin"} className={`relative mb-3 flex h-36 items-center justify-center rounded-md ${product.color} transition-transform group-hover:scale-[1.02]`}>
        <span className="text-5xl">{product.icon}</span>
        {product.badge && (
          <span className="absolute left-1.5 top-1.5 rounded bg-red-600 px-1.5 py-0.5 text-[10px] font-bold text-white">
            {product.badge}
          </span>
        )}
      </Link>
      <Link href={signedIn ? "#" : "/signin"} className="mb-1 line-clamp-2 text-sm font-medium leading-tight text-gray-900 group-hover:text-orange-700">
        {product.name}
      </Link>
      <div className="mb-1 flex items-center gap-1">
        <Stars rating={product.rating} />
        <span className="text-xs text-cyan-700">{product.reviews.toLocaleString()}</span>
      </div>
      <div className="mb-2 mt-auto flex items-baseline gap-1.5">
        <span className="text-lg font-bold text-gray-900">{product.price}</span>
        {product.oldPrice && (
          <span className="text-xs text-gray-500 line-through">{product.oldPrice}</span>
        )}
      </div>
      <button
        type="button"
        onClick={() => onAddToCart(product)}
        className="w-full rounded-full bg-gradient-to-b from-yellow-300 to-yellow-400 py-1 text-xs font-bold text-gray-900 shadow-sm transition hover:from-yellow-400 hover:to-yellow-500"
      >
        Add to Cart
      </button>
    </div>
  );
}

function Carousel({ title, products, accent, onAddToCart, signedIn }: { title: string; products: Product[]; accent?: string; onAddToCart: (p: Product) => void; signedIn: boolean }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };
  return (
    <section className="mb-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className={`text-xl font-bold ${accent ?? "text-gray-900"}`}>{title}</h2>
        <span className="text-sm font-medium text-cyan-700">See all</span>
      </div>
      <div className="relative">
        <button type="button" onClick={() => scroll(-1)} className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md hover:bg-gray-50" aria-label="Scroll left">
          <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
        </button>
        <div ref={scrollRef} className="flex gap-4 overflow-x-auto scroll-smooth pb-2" style={{ scrollbarWidth: "none" }}>
          {products.map((p) => <ProductCard key={p.id} product={p} onAddToCart={onAddToCart} signedIn={signedIn} />)}
        </div>
        <button type="button" onClick={() => scroll(1)} className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-300 bg-white shadow-md hover:bg-gray-50" aria-label="Scroll right">
          <svg className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </section>
  );
}

function GridSection({ title, products, signedIn }: { title: string; products: Product[]; signedIn: boolean }) {
  return (
    <section className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-xl font-bold text-gray-900">{title}</h2>
      <div className="grid grid-cols-2 gap-3">
        {products.slice(0, 4).map((p) => (
          <Link key={p.id} href={signedIn ? "#" : "/signin"} className="group cursor-pointer">
            <div className={`mb-2 flex h-28 items-center justify-center rounded-md transition-transform group-hover:scale-[1.03] ${p.color}`}>
              <span className="text-4xl">{p.icon}</span>
            </div>
            <p className="line-clamp-2 text-sm text-gray-800 group-hover:text-orange-700">{p.name}</p>
            <p className="text-xs text-gray-500">{p.price}</p>
          </Link>
        ))}
      </div>
      <span className="mt-3 inline-block text-sm font-medium text-cyan-700">See more</span>
    </section>
  );
}

export default function StorePage() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [cartFlash, setCartFlash] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [activeCat, setActiveCat] = useState("All");
  const [signedIn, setSignedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const name = typeof window !== "undefined" ? localStorage.getItem("velocart_user") : null;
    if (name) {
      setSignedIn(true);
      setUserName(name);
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startAutoplay();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [startAutoplay]);

  const heroNav = (dir: number) => {
    setHeroIdx((prev) => (prev + dir + HERO_SLIDES.length) % HERO_SLIDES.length);
    startAutoplay();
  };

  const handleAddToCart = useCallback((p: Product) => {
    void p;
    setCartCount((c) => c + 1);
    setCartFlash(true);
    setTimeout(() => setCartFlash(false), 400);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) { setSearchResults(null); return; }
    const q = searchQuery.toLowerCase();
    setSearchResults(ALL_PRODUCTS.filter((p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)));
  };

  const handleCatClick = (cat: string) => {
    setActiveCat(cat);
    setSearchResults(null);
    setSearchQuery("");
  };

  const handleSignOut = () => {
    localStorage.removeItem("velocart_user");
    setSignedIn(false);
    setUserName("");
    setShowAccountMenu(false);
  };

  const filteredDeals = activeCat === "All" ? DEALS : DEALS.filter((p) => p.category === activeCat);
  const filteredRec = activeCat === "All" ? RECOMMENDED : RECOMMENDED.filter((p) => p.category === activeCat);

  const slide = HERO_SLIDES[heroIdx];

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-gray-900 text-white">
        <div className="mx-auto flex h-[60px] max-w-[1500px] items-center gap-4 px-4">
          <Link href="/" className="flex items-center gap-1 text-xl font-extrabold tracking-tight text-white hover:text-orange-300">
            <span className="text-orange-400">Velo</span>Cart
          </Link>
          <div className="hidden text-xs leading-tight md:block">
            <span className="text-gray-400">Deliver to</span>
            <p className="font-bold">{"\u{1F4CD}"} Your City</p>
          </div>
          <form onSubmit={handleSearch} className="flex flex-1 items-center">
            <select className="hidden h-[38px] rounded-l-md bg-gray-200 px-2 text-xs text-gray-800 focus:outline-none lg:block">
              {CATEGORIES.slice(0, 6).map((c) => <option key={c}>{c}</option>)}
            </select>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search VeloCart"
              className="h-[38px] flex-1 border-0 px-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-400 lg:rounded-none"
            />
            <button type="submit" className="flex h-[38px] w-11 items-center justify-center rounded-r-md bg-orange-400 hover:bg-orange-500">
              <svg className="h-5 w-5 text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </form>
          <button type="button" className="hidden items-center gap-1 text-sm font-bold hover:text-orange-300 lg:flex">{"\u{1F310}"} EN</button>

          {signedIn ? (
            <div className="relative hidden md:block">
              <button type="button" onClick={() => setShowAccountMenu(!showAccountMenu)} className="flex flex-col text-xs leading-tight hover:text-orange-300">
                <span className="text-gray-400">Hello, {userName}</span>
                <span className="font-bold">Account &amp; Lists</span>
              </button>
              {showAccountMenu && (
                <div className="absolute right-0 top-full mt-1 w-48 rounded-md border border-gray-200 bg-white py-1 text-sm text-gray-800 shadow-lg">
                  <p className="border-b border-gray-100 px-4 py-2 font-bold">Your Account</p>
                  <button type="button" className="w-full px-4 py-2 text-left hover:bg-gray-100">Your Orders</button>
                  <button type="button" className="w-full px-4 py-2 text-left hover:bg-gray-100">Your Lists</button>
                  <button type="button" onClick={handleSignOut} className="w-full border-t border-gray-100 px-4 py-2 text-left text-red-600 hover:bg-gray-100">Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            <Link href="/signin" className="hidden flex-col text-xs leading-tight hover:text-orange-300 md:flex">
              <span className="text-gray-400">Hello, Sign in</span>
              <span className="font-bold">Account &amp; Lists</span>
            </Link>
          )}

          <Link href={signedIn ? "#" : "/signin"} className="hidden flex-col text-xs leading-tight hover:text-orange-300 md:flex">
            <span className="text-gray-400">Returns</span>
            <span className="font-bold">&amp; Orders</span>
          </Link>
          <button type="button" className={`relative flex items-center gap-1 text-sm font-bold hover:text-orange-300 transition-transform ${cartFlash ? "scale-110" : ""}`}>
            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121 0 2.002-.881 2.002-2V6.75H5.625M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
            </svg>
            <span className={`absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-bold text-white transition-colors ${cartCount > 0 ? "bg-orange-500" : "bg-gray-600"}`}>{cartCount}</span>
            Cart
          </button>

          {/* Mobile hamburger */}
          <button type="button" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex items-center md:hidden" aria-label="Menu">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="border-t border-gray-700 bg-gray-800 px-4 py-3 md:hidden">
            <div className="space-y-2 text-sm">
              {signedIn ? (
                <p className="font-bold text-orange-300">Hello, {userName}</p>
              ) : (
                <Link href="/signin" className="block font-bold text-orange-300" onClick={() => setMobileMenuOpen(false)}>Sign in</Link>
              )}
              <Link href={signedIn ? "#" : "/signin"} className="block text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Your Orders</Link>
              <Link href={signedIn ? "#" : "/signin"} className="block text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(false)}>Your Lists</Link>
              {signedIn && (
                <button type="button" onClick={() => { handleSignOut(); setMobileMenuOpen(false); }} className="block text-red-400 hover:text-red-300">Sign Out</button>
              )}
              <div className="border-t border-gray-700 pt-2">
                {CATEGORIES.map((cat) => (
                  <button key={cat} type="button" onClick={() => { handleCatClick(cat); setMobileMenuOpen(false); }} className="block w-full py-1 text-left text-gray-300 hover:text-white">{cat}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Category nav */}
        <nav className="border-t border-gray-700 bg-gray-800">
          <div className="mx-auto flex max-w-[1500px] items-center gap-1 overflow-x-auto px-4 py-1 text-sm">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCatClick(cat)}
                className={`whitespace-nowrap rounded px-2 py-1 transition ${activeCat === cat ? "bg-gray-600 font-bold" : "hover:bg-gray-700"}`}
              >
                {cat === "All" && (
                  <svg className="mr-1 inline h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
                )}
                {cat}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* Search results */}
      {searchResults !== null ? (
        <main className="mx-auto max-w-[1500px] px-4 py-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">
              {searchResults.length > 0 ? `Results for "${searchQuery}"` : `No results for "${searchQuery}"`}
            </h2>
            <button type="button" onClick={() => { setSearchResults(null); setSearchQuery(""); }} className="text-sm text-cyan-700 hover:underline">Clear search</button>
          </div>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {searchResults.map((p) => <ProductCard key={p.id} product={p} onAddToCart={handleAddToCart} signedIn={signedIn} />)}
            </div>
          ) : (
            <p className="text-gray-500">Try a different search term or browse categories above.</p>
          )}
        </main>
      ) : (
        <>
          {/* Hero carousel */}
          <div className="relative">
            <div className={`flex h-[320px] items-center bg-gradient-to-r ${slide.bg} px-8 transition-all duration-500 md:h-[380px] md:px-16`}>
              <div className="mx-auto w-full max-w-[1500px]">
                <span className="mb-2 inline-block rounded bg-white/20 px-3 py-1 text-xs font-bold text-white backdrop-blur-sm">{slide.badge}</span>
                <h2 className="mb-2 text-3xl font-extrabold text-white md:text-4xl">{slide.title}</h2>
                <p className="text-lg text-white/80">{slide.subtitle}</p>
                <Link href={signedIn ? "#" : "/signin"} className="mt-4 inline-block rounded-full bg-white px-6 py-2 text-sm font-bold text-gray-900 shadow hover:bg-gray-100">Shop now</Link>
              </div>
            </div>
            <button type="button" onClick={() => heroNav(-1)} className="absolute left-2 top-1/2 flex h-14 w-10 -translate-y-1/2 items-center justify-center rounded-sm border border-gray-300 bg-white/80 shadow hover:bg-white" aria-label="Previous slide">
              <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button type="button" onClick={() => heroNav(1)} className="absolute right-2 top-1/2 flex h-14 w-10 -translate-y-1/2 items-center justify-center rounded-sm border border-gray-300 bg-white/80 shadow hover:bg-white" aria-label="Next slide">
              <svg className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
            </button>
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              {HERO_SLIDES.map((_, i) => (
                <button key={i} type="button" onClick={() => { setHeroIdx(i); startAutoplay(); }} className={`h-2 rounded-full transition-all ${i === heroIdx ? "w-6 bg-white" : "w-2 bg-white/50"}`} aria-label={`Slide ${i + 1}`} />
              ))}
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-gray-100 to-transparent" />
          </div>

          {/* Content */}
          <main className="mx-auto -mt-10 max-w-[1500px] px-4 pb-12">
            <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <GridSection title="Pick up where you left off" products={RECENTLY_VIEWED} signedIn={signedIn} />
              <GridSection title="Buy again" products={BUY_AGAIN} signedIn={signedIn} />
              <GridSection title="Top deals for you" products={DEALS} signedIn={signedIn} />
              <GridSection title="Recommended" products={RECOMMENDED} signedIn={signedIn} />
            </div>

            {filteredDeals.length > 0 && (
              <Carousel title={activeCat === "All" ? "Deals of the Day" : `Deals in ${activeCat}`} products={filteredDeals} accent="text-red-700" onAddToCart={handleAddToCart} signedIn={signedIn} />
            )}
            {filteredRec.length > 0 && (
              <Carousel title={activeCat === "All" ? "Recommended for You" : `${activeCat} Picks`} products={filteredRec} onAddToCart={handleAddToCart} signedIn={signedIn} />
            )}
            <Carousel title="Recently Viewed" products={RECENTLY_VIEWED} onAddToCart={handleAddToCart} signedIn={signedIn} />

            {!signedIn && (
              <div className="my-8 rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
                <p className="mb-3 text-lg text-gray-700">See personalized recommendations</p>
                <Link href="/signin" className="inline-block rounded-full bg-yellow-400 px-8 py-2.5 text-sm font-bold text-gray-900 shadow hover:bg-yellow-500">Sign in</Link>
                <p className="mt-2 text-xs text-gray-500">New customer?{" "}<Link href="/register" className="text-cyan-700 hover:text-orange-700 hover:underline">Start here.</Link></p>
              </div>
            )}

            <Carousel title="Best Sellers in Electronics" products={makeProducts(20, 8)} onAddToCart={handleAddToCart} signedIn={signedIn} />
            <Carousel title="Trending in Home & Kitchen" products={makeProducts(12, 8)} onAddToCart={handleAddToCart} signedIn={signedIn} />
          </main>
        </>
      )}

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300">
        <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="block w-full bg-gray-700 py-3 text-center text-sm font-medium text-white hover:bg-gray-600">Back to top</button>
        <div className="mx-auto grid max-w-[1500px] gap-8 px-6 py-10 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h4 className="mb-3 font-bold text-white">Get to Know Us</h4>
            <ul className="space-y-2 text-gray-400"><li>Careers</li><li>About VeloCart</li><li>Investor Relations</li><li>VeloCart Devices</li></ul>
          </div>
          <div>
            <h4 className="mb-3 font-bold text-white">Make Money with Us</h4>
            <ul className="space-y-2 text-gray-400"><li>Sell products on VeloCart</li><li>Become an Affiliate</li><li>Advertise Your Products</li><li>Self-Publish with Us</li></ul>
          </div>
          <div>
            <h4 className="mb-3 font-bold text-white">Payment Products</h4>
            <ul className="space-y-2 text-gray-400"><li>VeloCart Rewards Card</li><li>Shop with Points</li><li>Reload Your Balance</li><li>VeloCart Currency Converter</li></ul>
          </div>
          <div>
            <h4 className="mb-3 font-bold text-white">Let Us Help You</h4>
            <ul className="space-y-2 text-gray-400"><li>Your Account</li><li>Your Orders</li><li>Shipping Rates &amp; Policies</li><li>Returns &amp; Replacements</li><li>Help</li></ul>
          </div>
        </div>
        <div className="border-t border-gray-700 py-6 text-center text-xs text-gray-500">
          <Link href="/" className="mb-2 inline-block text-lg font-extrabold text-white"><span className="text-orange-400">Velo</span>Cart</Link>
          <p className="mt-1">&copy; 2026 VeloCart, Inc. or its affiliates.</p>
        </div>
      </footer>
    </div>
  );
}
