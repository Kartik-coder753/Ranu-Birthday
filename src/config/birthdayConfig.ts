export interface BirthdayConfig {
  sisterName: string;
  nickname: string;
  brotherName: string;
  tagline: string;
  letter: {
    title: string;
    salutation: string;
    paragraphs: string[];
    closing: string;
    signOff: string;
  };
  secretGiftMessage: string;
  secretRoomQuiz: {
    question: string;
    options: string[];
    brotherReveal: string;
    secretNote: string;
  };
  funnyGiftResponses: string[];
  brotherQuizQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  balloonMessages: string[];
}

export const BIRTHDAY_CONFIG: BirthdayConfig = {
  sisterName: "Kritika",
  nickname: "Ranu",
  brotherName: "Kartik",
  tagline: "A little world created just for you.",
  letter: {
    title: "A Little Something From Your Brother",
    salutation: "Dear Ranu,",
    paragraphs: [
      "Today is all about you! ✨",
      "You are not just my sister, but one of the most special people in my life. I may tease you, irritate you, and fight with you over the smallest things, but that is just my way of showing how much you mean to me.",
      "I hope your life is filled with happiness, success, laughter, endless opportunities, and everything your heart wishes for.",
      "Never stop smiling, never stop dreaming, and never forget that your brother will always be there for you."
    ],
    closing: "Happy Birthday, Kritika aka Ranu!",
    signOff: "Lots of love ❤️ — Your brother, Kartik"
  },
  secretGiftMessage: "Your biggest gift is having a brother who will always stand by you, protect you, support your crazy dreams, and always be there for you no matter what! ❤️",
  secretRoomQuiz: {
    question: "Who is your absolute favourite brother in the entire universe?",
    options: [
      "Kartik (The most awesome brother)",
      "Obviously Kartik, no competition",
      "Kartik, without a single doubt",
      "The smartest, coolest Kartik"
    ],
    brotherReveal: "Correct answer! Obviously, it's Kartik! 😂❤️ Did you really think there was any other choice?",
    secretNote: "Jokes aside, Ranu... watching you grow and shine makes me prouder than words can ever say. Whenever you need advice, a late-night talk, someone to take your side against the world, or just a plate of food — remember your brother's door is always wide open. Love you always, sister!"
  },
  funnyGiftResponses: [
    "Areyyy Ranu, itna expensive? 😂",
    "Gift toh milega... par sapne mein! 🤣",
    "Nice try, Rani Sahiba! 👑",
    "Papa se approval leke aao! 😂",
    "Error 404: Gift Not Found! 💸",
    "Yeh gift tumhare liye nahi, tumhare sapno ke liye hai! 🤭",
    "Abhi budget review meeting pending hai! 📉😂",
    "Ek selfie lelo is gift ke saath, bas vahi milega! 📸🤣",
    "Main itna ameer lagta hoon kya? 😭💸"
  ],
  brotherQuizQuestions: [
    {
      question: "When Kartik agrees with your opinion, what actually happened?",
      options: [
        "He actually realized you were right",
        "He is too tired to argue further",
        "He wants you to bring him food or snacks",
        "It's a glitch in the matrix"
      ],
      correctIndex: 2,
      explanation: "Classic Kartik move! Whenever peace is made, snacks are usually involved! 😂"
    },
    {
      question: "Who is the undisputed remote-control / TV dictator at home?",
      options: [
        "Ranu (because of drama skills)",
        "Kartik (supreme commander)",
        "Mummy (ultimate boss)",
        "Whoever reaches the sofa first"
      ],
      correctIndex: 1,
      explanation: "No matter who holds it, Kartik will always claim TV rights! 📺🤣"
    },
    {
      question: "What is Kartik's top reaction when you ask for money or gifts?",
      options: [
        "Immediately hands over his credit card",
        "Acts like he suddenly forgot Hindi and English",
        "Says: 'Arey abhi abhi toh pocket money di thi!'",
        "Tells you to ask Papa instead"
      ],
      correctIndex: 3,
      explanation: "Redirecting traffic to Papa is the sacred bro-code rule! 💸😂"
    },
    {
      question: "What is Ranu's greatest superpower according to Kartik?",
      options: [
        "Winning arguments out of thin air",
        "Finding things lost for 5 years",
        "Shopping online for 8 hours straight",
        "Making puppy eyes to escape chores"
      ],
      correctIndex: 0,
      explanation: "Supreme debating skills! Can prove 2+2=5 if it suits the drama! 💅✨"
    },
    {
      question: "What will Kartik ALWAYS do if someone messes with his sister Ranu?",
      options: [
        "Tell them to deal with her wrath themselves",
        "Stand right in front of her like an unbreakable shield",
        "Offer moral support via WhatsApp sticker",
        "Tease her first, then solve it in 5 seconds"
      ],
      correctIndex: 1,
      explanation: "100% Truth! He may irritate you, but nobody else in the world is allowed to! ❤️🛡️"
    }
  ],
  balloonMessages: [
    "You bring so much laughter and joy to our home! 🌸",
    "May all your wildest dreams and goals come true this year! 🌟",
    "Warning: You are officially one year older and still annoying! 😜",
    "You have the kindest heart, never lose your sparkle! 💖",
    "May your shopping cart never face card declined! 🛍️✨",
    "Proud of the amazing woman you are becoming every day! 🏆",
    "A free coupon for 1 glass of cold water brought to you by brother! 🥤",
    "Keep smiling Ranu, your smile lights up every room! ☀️",
    "Don't worry, you are still younger than me! 🎂",
    "Forever grateful to have you as my little sister! ❤️"
  ]
};
