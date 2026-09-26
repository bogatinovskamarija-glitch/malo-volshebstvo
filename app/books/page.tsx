import type { Metadata } from "next";
import { LibraryCollection } from "./library-collection";
export const metadata: Metadata = { title: "Библиотека" };
export default function BooksPage() {
  return (
    <main id="main-content" className="library-page">
      <LibraryCollection />
    </main>
  );
}
