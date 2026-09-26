"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Sparkles, Pause, Play } from "lucide-react";
import { LanguageProvider, useLang } from "@/lib/LanguageContext";

const points = [[7,22,18,-3],[18,63,23,-9],[31,18,20,-14],[46,83,25,-2],[61,12,21,-11],[78,29,27,-18],[88,61,22,-8],[93,16,24,-16],[12,88,29,-21],[69,78,26,-5],[39,48,24,-19],[83,88,28,-12]];

// [left%, top%, animDuration, animDelay, layer(1=far 2=mid 3=near)]
const WHITE_MOTES = [
  [3,12,5.2,0.0,1],[11,78,4.8,1.3,1],[19,28,6.1,0.6,1],[27,55,5.5,2.1,1],
  [35,88,4.9,1.8,1],[44,7,5.8,0.4,1],[53,44,6.3,3.0,1],[62,92,5.1,1.5,1],
  [71,18,4.7,2.4,1],[80,66,5.4,0.9,1],[88,38,6.0,2.7,1],[96,80,4.6,1.1,1],
  [8,47,3.4,0.7,2],[24,71,3.8,2.0,2],[40,15,3.2,1.4,2],
  [57,62,3.6,0.3,2],[74,33,4.0,2.5,2],[90,55,3.3,1.7,2],
  [17,60,2.3,1.0,3],[48,34,2.1,0.5,3],[78,76,2.5,1.9,3],
] as const;

function Shell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [paused, setPaused] = useState(false);
  const { lang, toggle, t } = useLang();
  const isReader = path.startsWith("/books/") && path.split("/").length > 2;
  if (isReader) return <>{children}</>;
  return (
    <div className={`story-shell ${path !== "/" ? "inner-page" : "cover-page"} ${paused ? "motion-paused" : ""}`}>
      <a href="#main-content" className="skip-link">{t.skipLink}</a>
      {path !== "/" && <div className="background-art" aria-hidden="true"><img src="/images/woodland-story.png" alt="" /></div>}
      <div className="magic-layer" aria-hidden="true">
        {points.map(([x, y, duration, delay], i) => (
          <span key={i} className={`magic-mote ${i % 4 === 0 ? "mote-star" : i % 4 === 1 ? "mote-seed" : "mote-light"}`}
            style={{ left: `${x}%`, top: `${y}%`, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}>
            {i % 4 === 0 && <Sparkles size={15} strokeWidth={1} />}
          </span>
        ))}
      </div>
      <div className="white-sparkle-layer" aria-hidden="true">
        {WHITE_MOTES.map(([x, y, dur, delay, layer], i) => (
          <span key={i} className={`wstar wstar-${layer}`}
            style={{ left: `${x}%`, top: `${y}%`, animationDuration: `${dur}s`, animationDelay: `${delay}s` }} />
        ))}
      </div>
      <header className="site-header">
        <a href="/" className="wordmark" aria-label="Мало волшебство — почетна">
          <Sparkles size={26} strokeWidth={1.15} />
          <span>мало <em>волшебство</em></span>
        </a>
        <div className="header-end">
          <nav aria-label="Главна навигација">
            <a href="/" aria-current={path === "/" ? "page" : undefined}>{t.nav.home}</a>
            <a href="/books" aria-current={path === "/books" ? "page" : undefined}>{t.nav.library}</a>
            <a href="/about" aria-current={path === "/about" ? "page" : undefined}>{t.nav.about}</a>
          </nav>
          <button className="lang-toggle" onClick={toggle} aria-label={lang === "mk" ? "Switch to English" : "Префрли на македонски"}>
            {lang === "mk" ? "EN" : "МК"}
          </button>
        </div>
      </header>
      {children}
      <footer className="site-footer">
        <span>{t.footer.love}</span>
        <span className="footer-flourish" aria-hidden="true">✧</span>
        <button className="motion-button" onClick={() => setPaused(!paused)}
          aria-label={paused ? t.playAnim : t.pauseAnim} aria-pressed={paused}
          title={paused ? t.playAnim : t.pauseAnim}>
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </footer>
      <p className="site-copyright">{t.footer.copyright}</p>
    </div>
  );
}

export function StoryShell({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider>
      <Shell>{children}</Shell>
    </LanguageProvider>
  );
}
