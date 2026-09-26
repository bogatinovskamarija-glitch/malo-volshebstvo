"use client";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";

export function AboutContent() {
  const { t } = useLang();
  return (
    <article className="about-letter">
      <Sparkles className="letter-star" size={28} strokeWidth={1} aria-hidden="true" />
      <p className="eyebrow">{t.about.eyebrow}</p>
      <h1 className="heading-main about-letter-heading">
        <span className="drop-letter-heading">{t.about.h1[0][0]}</span>{t.about.h1[0].slice(1)}<br /><em>{t.about.h1[1]}</em>
      </h1>

      <div className="about-photo-wrap">
        <img
          src="/images/maria-headshot.png"
          alt="Марија Богатиновска"
          className="about-photo"
        />
      </div>

      <div className="letter-body">
        <p>{t.about.p1}</p>
        <p>{t.about.p2}</p>
        <p>{t.about.p3}</p>
      </div>

      <p className="signature">
        <span>{t.about.signOff}</span>
        <em className="signature-name">
          <span className="drop-letter">{t.about.signature[0]}</span>{t.about.signature.slice(1)}
        </em>
      </p>

      <a href="/books" className="text-link">
        {t.about.cta} <ArrowRight size={16} strokeWidth={1.4} />
      </a>
    </article>
  );
}
