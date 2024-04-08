export interface QuizItem {
  question: string;
  answer: string;
  quiz: string;
  correct: boolean;
  _id: string;
}

export interface Note {
  _id: string;
  text: string;
  content: string;
}

export interface Quiz {
  _id: string;
  quizitems: QuizItem[];
}

export interface ContentType {
  title: string;
  type:
    | "Video"
    | "Book"
    | "Article"
    | "Lecture"
    | "Podcast"
    | "Movie"
    | "Paper";

  category: Array<string>;
  quiz?: Quiz;
  _id?: string;
  userId?: string;
  notes?: Note[];
  image?: string;
}

export interface CardType {
  title: string;
  type: "Video" | "Book" | "Article";
}
