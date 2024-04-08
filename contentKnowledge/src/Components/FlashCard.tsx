import { QuizItem } from "../assets/types";

export default function FlashCard({
  quizitem,
  flipped,
  handleFlip,
}: {
  quizitem: QuizItem;
  flipped: boolean;
  handleFlip: () => void;
}) {
  return (
    <div
      className="flash-card
    "
    >
      <div className="bg-emerald-300 py-8 flex justify-center rounded-t-xl text-black">
        {quizitem.question}
      </div>
      <div className="h-3"></div>
      <div className="relative">
        <button
          onClick={handleFlip}
          className={`${
            flipped ? "backside-open" : "backside-closed"
          } bg-indigo-200 py-8 flex justify-center rounded-b-xl w-full text-black `}
          tabIndex={-2}
        >
          {quizitem.answer}
        </button>
        <button
          onClick={handleFlip}
          className={`${
            flipped ? "frontside-closed" : "frontside-open"
          } flex justify-center bg-emerald-300 py-8 rounded-b-xl w-full text-black absolute top-0 left-0 h-full`}
        >
          Click to see answer
        </button>
      </div>
    </div>
  );
}
