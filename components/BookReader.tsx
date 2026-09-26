"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { Book } from "@/lib/books";

interface Props { book: Book; }

const BURST: { x: number; y: number; ch: string }[] = [
  { x: 0, y: -95, ch: "✦" }, { x: 67, y: -67, ch: "✧" }, { x: 95, y: 0, ch: "⋆" },
  { x: 67, y: 67, ch: "✦" }, { x: 0, y: 95, ch: "✧" }, { x: -67, y: 67, ch: "⋆" },
  { x: -95, y: 0, ch: "✦" }, { x: -67, y: -67, ch: "✧" },
  { x: 0, y: -130, ch: "·" }, { x: 92, y: -92, ch: "·" }, { x: 130, y: 0, ch: "·" },
  { x: -130, y: 0, ch: "·" },
];

function SparkBurst() {
  return (
    <div className="spark-burst" aria-hidden="true">
      {BURST.map((p, i) => (
        <span key={i} className="spark-particle"
          style={{ "--tx": `${p.x}px`, "--ty": `${p.y}px`, "--delay": `${i * 18}ms` } as React.CSSProperties}>
          {p.ch}
        </span>
      ))}
    </div>
  );
}

const MOTES = [[8,15,22,-5],[22,72,26,-12],[67,8,20,-8],[45,90,28,-3],[85,30,24,-15],[91,75,21,-9]];

interface FlipAnim {
  active: boolean;
  dir: "fwd" | "bwd";
  prevLeft: number;
  prevCover: boolean;
}

export function BookReader({ book }: Props) {
  // leftPage=1 → cover alone; leftPage=2,4,6,… → two-page spread
  const [leftPage, setLeftPage] = useState(1);
  const [flip, setFlip] = useState<FlipAnim>({ active: false, dir: "fwd", prevLeft: 1, prevCover: true });
  const [sparkKey, setSparkKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const total = book.pageCount;

  const isCover = leftPage === 1;
  const rightPage = leftPage + 1;
  const totalViews = 1 + Math.ceil((total - 1) / 2);
  const currentView = isCover ? 1 : 1 + Math.ceil((leftPage - 1) / 2);

  const pageUrl = (n: number) => `/books/${book.id}/page-${String(n).padStart(2, "0")}.jpeg`;

  // Preload adjacent pages
  useEffect(() => {
    const pre = (n: number) => { if (n >= 1 && n <= total) { new Image().src = pageUrl(n); } };
    if (isCover) { pre(2); pre(3); }
    else { pre(leftPage + 2); pre(leftPage + 3); pre(leftPage - 2); pre(leftPage - 1); }
  }, [leftPage, total, book.id]);

  const navigate = useCallback((target: number) => {
    if (flip.active || target < 1 || target > total) return;
    const dir = target > leftPage ? "fwd" : "bwd";
    setSparkKey(k => k + 1);
    // Save current state for the outgoing animation overlay, then immediately switch content
    setFlip({ active: true, dir, prevLeft: leftPage, prevCover: isCover });
    setLeftPage(target);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setFlip(f => ({ ...f, active: false })), 440);
  }, [leftPage, isCover, total, flip.active]);

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const prev = useCallback(() => navigate(leftPage === 2 ? 1 : leftPage - 2), [navigate, leftPage]);
  const next = useCallback(() => navigate(isCover ? 2 : leftPage + 2), [navigate, isCover, leftPage]);
  const prevDisabled = leftPage <= 1;
  const nextDisabled = !isCover && leftPage + 2 > total;

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && !prevDisabled) prev();
      if (e.key === "ArrowRight" && !nextDisabled) next();
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [prev, next, prevDisabled, nextDisabled]);

  // ── Render helpers ────────────────────────────────────────

  function spreadContent(lp: number, cover: boolean) {
    if (cover) return (
      <div className="reader-cover-single">
        <img src={pageUrl(1)} alt={book.title} className="reader-cover-img" draggable={false} />
      </div>
    );
    const rp = lp + 1;
    return (
      <div className="reader-spread-pages">
        <img src={pageUrl(lp)} alt={`Страница ${lp}`} className="reader-page-img" draggable={false} />
        {rp <= total && <img src={pageUrl(rp)} alt={`Страница ${rp}`} className="reader-page-img" draggable={false} />}
      </div>
    );
  }

  function outgoingOverlay() {
    const { dir, prevLeft: pl, prevCover: pc } = flip;
    // What images were in the left and right halves of the outgoing spread?
    const leftImg  = pc ? null : pageUrl(pl);
    const rightImg = pc ? pageUrl(1) : (pl + 1 <= total ? pageUrl(pl + 1) : null);

    if (dir === "fwd") {
      // Forward: right half folds leftward around spine; left half fades
      return <>
        <div className="reader-anim-half reader-anim-left anim-fade">
          {leftImg && <img src={leftImg} className="reader-page-img" draggable={false} />}
        </div>
        <div className="reader-anim-half reader-anim-right anim-fold-fwd">
          {rightImg && <img src={rightImg} className="reader-page-img" draggable={false} />}
        </div>
      </>;
    } else {
      // Backward: left half folds rightward around spine; right half fades
      return <>
        <div className="reader-anim-half reader-anim-left anim-fold-bwd">
          {leftImg && <img src={leftImg} className="reader-page-img" draggable={false} />}
        </div>
        <div className="reader-anim-half reader-anim-right anim-fade">
          {rightImg && <img src={rightImg} className="reader-page-img" draggable={false} />}
        </div>
      </>;
    }
  }

  return (
    <div className="reader-shell">
      <div className="reader-magic" aria-hidden="true">
        {MOTES.map(([x, y, dur, delay], i) => (
          <span key={i} className="reader-mote"
            style={{ left: `${x}%`, top: `${y}%`, animationDuration: `${dur}s`, animationDelay: `${delay}s` }}>
            {i % 2 === 0 && <Sparkles size={11} strokeWidth={1} />}
          </span>
        ))}
      </div>

      <header className="reader-header">
        <a href="/books" className="reader-back" aria-label="Назад кон библиотеката">
          <ArrowLeft size={17} strokeWidth={1.5} />
          Библиотека
        </a>
        <span className="reader-title">{book.title}</span>
        <span className="reader-pages">{currentView} / {totalViews}</span>
      </header>

      <main className="reader-main" id="main-content">
        <div className="reader-canvas-wrap">
          {sparkKey > 0 && <SparkBurst key={sparkKey} />}
          <div className="reader-spread-wrap">
            {/* Bottom layer: incoming (new) spread — always visible */}
            <div className="reader-layer">
              {spreadContent(leftPage, isCover)}
            </div>
            {/* Top layer: outgoing halves — only shown during the fold animation */}
            {flip.active && (
              <div className="reader-layer reader-layer-top" aria-hidden="true">
                {outgoingOverlay()}
              </div>
            )}
          </div>
        </div>

        <button className="reader-zone reader-zone-left" onClick={prev} disabled={prevDisabled} aria-label="Претходна страница">
          <ChevronLeft size={32} strokeWidth={1.2} />
        </button>
        <button className="reader-zone reader-zone-right" onClick={next} disabled={nextDisabled} aria-label="Следна страница">
          <ChevronRight size={32} strokeWidth={1.2} />
        </button>
      </main>

      <nav className="reader-nav" aria-label="Навигација низ страниците">
        <button onClick={prev} disabled={prevDisabled} className="reader-btn" aria-label="Претходна">
          <ArrowLeft size={18} strokeWidth={1.4} />
        </button>
        <div className="reader-dots" aria-hidden="true">
          {Array.from({ length: Math.min(totalViews, 9) }, (_, i) => {
            const vIdx = totalViews <= 9 ? i + 1 : Math.round((i / 8) * (totalViews - 1)) + 1;
            const dot = vIdx === 1 ? 1 : (vIdx - 1) * 2;
            return (
              <button key={i}
                className={`reader-dot${currentView === vIdx ? " active" : ""}`}
                onClick={() => navigate(dot)}
                aria-label={`Страница ${dot}`} />
            );
          })}
        </div>
        <button onClick={next} disabled={nextDisabled} className="reader-btn" aria-label="Следна">
          <ArrowRight size={18} strokeWidth={1.4} />
        </button>
      </nav>
    </div>
  );
}
