"use client";
import { useState } from "react";
import { ArrowRight, BookOpen, Search, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { books, ageGroups, type Book } from "@/lib/books";
import { useLang } from "@/lib/LanguageContext";

function Cover({ book }: { book: Book }) {
  return (
    <div className="book-cover">
      <img
        src={`/books/${book.id}/page-01.jpeg`}
        alt={book.title}
        className={`book-cover-photo${book.ageGroup === "0-2" ? " spread-cover" : ""}`}
      />
      <div className="book-cover-title" aria-hidden="true">
        <span>{book.title}</span>
      </div>
    </div>
  );
}

function BookCard({ book }: { book: Book }) {
  const { lang } = useLang();
  return (
    <a href={`/books/${book.id}`} className="book-card" aria-label={`${lang === "mk" ? "Читај" : "Read"}: ${book.title}`}>
      <Cover book={book} />
      <div className="book-meta">
        <span>{lang === "mk" ? book.agesLabel : book.agesLabelEn}</span>
      </div>
      {book.goal && (
        <div className="book-goal">{book.goal}</div>
      )}
      {book.tags && book.tags.length > 0 && (
        <div className="book-tags">
          {book.tags.map((tag) => (
            <span key={tag} className="book-tag">{tag}</span>
          ))}
        </div>
      )}
      <div className="book-caption">
        <span>{lang === "mk" ? book.detail : book.detailEn}</span>
        <ArrowRight size={16} strokeWidth={1.3} />
      </div>
    </a>
  );
}

export function LibraryCollection() {
  const [activeAge, setActiveAge] = useState("all");
  const [query, setQuery] = useState("");
  const { t, lang } = useLang();

  const tabLabel: Record<string, string> = {
    all: t.library.tabs.all,
    "0-2": t.library.tabs["0-2"],
    "2-5": t.library.tabs["2-5"],
    "6-10": t.library.tabs["6-10"],
  };

  const handleAgeChange = (age: string) => {
    setActiveAge(age);
    setQuery("");
  };

  const ageBooks = (ageId: string) => ageId === "all" ? books : books.filter(b => b.ageGroup === ageId);

  const applyQuery = (pool: Book[]) => {
    const q = query.trim().toLowerCase();
    if (!q) return pool;
    return pool.filter(b =>
      b.title.toLowerCase().includes(q) ||
      b.goal?.toLowerCase().includes(q) ||
      b.tags?.some(t => t.toLowerCase().includes(q))
    );
  };

  const placeholder = lang === "mk" ? "Пребарај книги…" : "Search books…";

  return (
    <>
      <header className="page-intro">
        <p className="eyebrow">{t.library.eyebrow}</p>
        <h1 className="heading-main">
          <span className="drop-letter-heading">{t.library.h1[0][0]}</span>{t.library.h1[0].slice(1)}<br /><em>{t.library.h1[1]}</em>
        </h1>
        <p>{t.library.subtitle}</p>
      </header>
      <section className="collection" aria-label="Книги според возраст">
        <Tabs value={activeAge} onValueChange={handleAgeChange} className="age-tabs">
          <TabsList className="age-list" aria-label="Возраст на читателот">
            {ageGroups.map((age) => (
              <TabsTrigger key={age.id} value={age.id}>
                {tabLabel[age.id]}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="book-search-wrap">
            <Search size={15} strokeWidth={1.8} className="book-search-icon" />
            <input
              type="search"
              className="book-search"
              placeholder={placeholder}
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label={placeholder}
            />
            {query && (
              <button className="book-search-clear" onClick={() => setQuery("")} aria-label="Исчисти пребарување">
                <X size={13} strokeWidth={2} />
              </button>
            )}
          </div>

          {ageGroups.map((age) => {
            const filtered = applyQuery(ageBooks(age.id));

            return (
              <TabsContent key={age.id} value={age.id} className="book-panel">
                {filtered.length === 0 ? (
                  <div className="empty-collection">
                    <BookOpen size={34} strokeWidth={1} />
                    <h2>{t.library.empty.title}</h2>
                    <p>{t.library.empty.body}</p>
                  </div>
                ) : (
                  <div className="book-grid">
                    {filtered.map((book) => (
                      <BookCard key={book.id} book={book} />
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </section>
    </>
  );
}
