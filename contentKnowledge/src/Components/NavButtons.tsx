import { QuizItem } from "../assets/types";

export default function NavButtons({
  handleDec,
  handleInc,
  quizitem,
  correct,
  wrong,
}: {
  handleDec: () => void;
  handleInc: () => void;
  quizitem: QuizItem;
  correct: (id: string) => void;
  wrong: (id: string) => void;
}) {
  return (
    <>
      <div className="flex gap-2 justify-center mt-2">
        <button
          onClick={handleDec}
          className="rounded-full h-8 w-8 bg-sky-300 flex justify-center items-center text-black growss"
        >
          <i className="fa-solid fa-backward-step"></i>
        </button>
        <button
          className="rounded bg-green-400 w-8 h-8 text-black growss"
          onClick={() => correct(quizitem._id)}
        >
          <i className="fa-solid fa-check"></i>
        </button>
        <button
          className="rounded bg-red-400 w-8 h-8 text-black growss"
          onClick={() => wrong(quizitem._id)}
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <button
          onClick={handleInc}
          className="rounded-full h-8 w-8 bg-sky-300 flex justify-center items-center text-black growss"
        >
          <i className="fa-solid fa-forward-step"></i>
        </button>
      </div>
    </>
  );
}
