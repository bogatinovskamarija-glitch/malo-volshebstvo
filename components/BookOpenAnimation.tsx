"use client";
import { useState, useRef, useEffect } from "react";

interface Props {
  onDone: () => void;
}

export function BookOpenAnimation({ onDone }: Props) {
  const [fading, setFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const dismiss = () => {
    setFading(true);
    setTimeout(onDone, 600);
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {});
    const onEnd = () => dismiss();
    v.addEventListener("ended", onEnd);
    return () => v.removeEventListener("ended", onEnd);
  }, []);

  return (
    <div
      className={`book-open-anim${fading ? " book-open-anim--out" : ""}`}
      onClick={dismiss}
      aria-hidden="true"
    >
      <video
        ref={videoRef}
        src="/animations/book-open.mp4"
        muted
        playsInline
        className="book-open-anim__video"
      />
    </div>
  );
}
