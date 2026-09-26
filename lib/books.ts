export interface Book {
  id: string;
  title: string;
  titleShort: string[];
  ageGroup: "0-2" | "2-5" | "6-10";
  agesLabel: string;
  agesLabelEn: string;
  detail: string;
  detailEn: string;
  color: "honey" | "rose" | "blue" | "sage";
  art: "bear" | "friends" | "rabbit" | "girl";
  pdfPath: string;
  pageCount: number;
}

export const books: Book[] = [
  {
    id: "mile",
    title: "Миле го бара патот до дома",
    titleShort: ["Миле го бара", "патот до дома"],
    ageGroup: "2-5",
    agesLabel: "2–5 години",
    agesLabelEn: "Ages 2–5",
    detail: "За малите авантуристи",
    detailEn: "For little adventurers",
    color: "honey",
    art: "bear",
    pdfPath: "/books/mile.pdf",
    pageCount: 19,
  },
  {
    id: "golemata-prosetka",
    title: "Големата прошетка низ градот",
    titleShort: ["Големата прошетка", "низ градот"],
    ageGroup: "2-5",
    agesLabel: "2–5 години",
    agesLabelEn: "Ages 2–5",
    detail: "За радознали мали срца",
    detailEn: "For curious little hearts",
    color: "rose",
    art: "friends",
    pdfPath: "/books/golemata-prosetka.pdf",
    pageCount: 17,
  },
  {
    id: "zlatnata-avantura",
    title: "Златната авантура на Боцко",
    titleShort: ["Златната авантура", "на Боцко"],
    ageGroup: "2-5",
    agesLabel: "2–5 години",
    agesLabelEn: "Ages 2–5",
    detail: "За прекрасни нови откритија",
    detailEn: "For wonderful new discoveries",
    color: "blue",
    art: "rabbit",
    pdfPath: "/books/zlatnata-avantura.pdf",
    pageCount: 19,
  },
];

export const ageGroups = [
  { id: "all" },
  { id: "0-2" },
  { id: "2-5" },
  { id: "6-10" },
] as const;
