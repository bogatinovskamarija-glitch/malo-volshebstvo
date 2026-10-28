export const strings = {
  mk: {
    nav: { home: "Почетна", library: "Библиотека", about: "За мене" },
    skipLink: "Оди до содржината",
    pauseAnim: "Паузирај ги анимациите",
    playAnim: "Вклучи ги анимациите",
    home: {
      eyebrow: "МАЛА БИБЛИОТЕКА НА МАКЕДОНСКИ",
      h1: ["Секое детство заслужува", "волшебство."],
      subtitle: "Приказни на нашиот јазик, каде и да растеме.",
      cta: "Отвори ја библиотеката",
      ctaNote: "Бесплатни приказни. За мали и големи.",
    },
    library: {
      eyebrow: "ПО ЕДНА ПРИКАЗНА",
      h1: ["Мала библиотека.", "Големи светови."],
      subtitle: "Изберете возраст. Пронајдете ја следната омилена приказна.",
      tabs: {
        all: "Сите приказни",
        "0-2": "0–2 години",
        "2-5": "2–5 години",
        "6-10": "6–10 години",
      },
      empty: {
        title: "Приказните растат со нас.",
        body: "Книгите за поголемите читатели ќе пристигнат наскоро.",
      },
    },
    about: {
      eyebrow: "ЕДНА МАЛА ЖЕЛБА",
      h1: ["Да растеме со приказни.", "Да го чуваме јазикот."],
      p1: "Јас сум Марија. Родена и израсната во Македонија — мала земја со голема душа, богата со приказни, песни и еден вид тивка магија, предавана низ генерации. Иако поголемиот дел од мојот возрасен живот го поминав во Соединетите Американски Држави, Македонија никогаш не ме напуштила.",
      p2: "Не сум писател. Но имам широка имагинација и уште поширока љубов кон децата. Ова мало катче беше родено од една едноставна желба: децата кои растат далеку од Македонија — и оние кои сè уште се таму — да се вљубат во нашиот јазик преку приказни, чудо и малку волшебство.",
      p3: "Сите книги тука се бесплатни. Библиотеката ќе расте полека, со грижа и љубов, по една приказна истовремено.",
      signOff: "Со љубов,",
      signature: "Марија",
      cta: "Кон приказните",
    },
    reader: {
      back: "Библиотека",
      loading: "Ја отвораме приказната…",
      error: "Приказната не може да се вчита. Обидете се повторно.",
    },
    footer: {
      love: "Со љубов, за малите читатели.",
      copyright: "© 2026 Марија Богат. Сите права задржани.",
      disclaimer: "Неовластено копирање и дистрибуција е строго забрането.",
    },
  },
  en: {
    nav: { home: "Home", library: "Library", about: "About" },
    skipLink: "Skip to content",
    pauseAnim: "Pause animations",
    playAnim: "Play animations",
    home: {
      eyebrow: "A SMALL LIBRARY IN MACEDONIAN",
      h1: ["Every childhood deserves", "a little magic."],
      subtitle: "Stories in our language, wherever we grow up.",
      cta: "Open the library",
      ctaNote: "Free stories. For little ones and big ones alike.",
    },
    library: {
      eyebrow: "ONE STORY AT A TIME",
      h1: ["A small library.", "Great big worlds."],
      subtitle: "Choose an age. Find your next favourite story.",
      tabs: {
        all: "All stories",
        "0-2": "Ages 0–2",
        "2-5": "Ages 2–5",
        "6-10": "Ages 6–10",
      },
      empty: {
        title: "Stories grow with us.",
        body: "Books for older readers are on their way.",
      },
    },
    about: {
      eyebrow: "A SMALL WISH",
      h1: ["To grow up with stories.", "To keep the language alive."],
      p1: "I'm Maria. Born and raised in Macedonia — a small country with a big heart, rich in stories, songs, and a quiet kind of magic passed gently between generations. Though I've spent most of my adult life in the United States, Macedonia has never really left me.",
      p2: "I'm not a writer. But I have a wide imagination and an even wider love for children. This little library was born from a simple wish: that children growing up far from Macedonia — and those still there — might fall in love with our language through stories, wonder, and just a little magic.",
      p3: "Every book here is free. The library will grow slowly, with care and love, one story at a time.",
      signOff: "With love,",
      signature: "Maria",
      cta: "To the stories",
    },
    reader: {
      back: "Library",
      loading: "Opening the story…",
      error: "The story could not load. Please try again.",
    },
    footer: {
      love: "With love, for little readers.",
      copyright: "© 2026 Maria Bogat. All rights reserved.",
      disclaimer: "Unauthorized copying and distribution is strictly prohibited.",
    },
  },
};

export type Lang = keyof typeof strings;
