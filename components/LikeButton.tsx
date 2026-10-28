"use client";
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { supabase } from "@/lib/supabase";

const LS_KEY = "mv_liked_books";

function getLiked(): Set<string> {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function setLiked(set: Set<string>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify([...set]));
  } catch {}
}

interface Props {
  bookId: string;
  className?: string;
}

export function LikeButton({ bookId, className = "" }: Props) {
  const [liked, setLikedState] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setLikedState(getLiked().has(bookId));
  }, [bookId]);

  const toggle = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (busy) return;
    setBusy(true);

    const next = !liked;
    setLikedState(next);

    const set = getLiked();
    next ? set.add(bookId) : set.delete(bookId);
    setLiked(set);

    if (supabase) {
      await supabase.rpc("toggle_book_like", {
        p_book_id: bookId,
        p_delta: next ? 1 : -1,
      });
    }

    setBusy(false);
  };

  return (
    <button
      className={`like-btn${liked ? " liked" : ""}${className ? " " + className : ""}`}
      onClick={toggle}
      aria-label={liked ? "Отстрани од омилени" : "Додај во омилени"}
      aria-pressed={liked}
    >
      <Heart size={15} strokeWidth={liked ? 0 : 1.6} fill={liked ? "currentColor" : "none"} />
    </button>
  );
}
