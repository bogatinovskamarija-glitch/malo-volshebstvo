"use client";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export default function Home() {
  const { t } = useLang();
  return (
    <main id="main-content" className="home-page">
      <div className="home-intro">
        <p className="eyebrow">{t.home.eyebrow}</p>
        <h1 className="heading-main">
          <span className="drop-letter-heading">{t.home.h1[0][0]}</span>{t.home.h1[0].slice(1)} <em>{t.home.h1[1]}</em>
        </h1>
        <p className="home-subtitle">{t.home.subtitle}</p>
      </div>
      <figure className="hero-art">
        <video
          src="/hero-animation.mp4"
          autoPlay
          loop
          muted
          playsInline
          poster="/images/woodland-story.png"
          className="hero-video"
          aria-label="Анимирана илустрација со ликовите од приказните"
        />
      </figure>
      <div className="home-action">
        <a className="primary-link" href="/books">{t.home.cta} <ArrowRight size={17} strokeWidth={1.5} /></a>
        <p>{t.home.ctaNote}</p>
      </div>
    </main>
  );
}
