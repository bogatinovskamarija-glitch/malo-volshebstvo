import { books } from "@/lib/books";
import { BookReader } from "@/components/BookReader";
import { notFound } from "next/navigation";

export default async function BookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = books.find((b) => b.id === id);
  if (!book) notFound();
  return <BookReader key={book.id} book={book} />;
}

export function generateStaticParams() {
  return books.map((b) => ({ id: b.id }));
}
