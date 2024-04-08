import { QuizItem } from "../assets/types";

export default function Progress({
  quizitems,
}: {
  quizitems: QuizItem[] | undefined;
}) {
  function getFraction() {
    const total = quizitems?.length;
    const correct = quizitems?.filter((item) => item.correct).length;

    return 125 - (correct! / total!) * 125;
  }
  return (
    <div className="flex flex-col items-center">
      <div className="text-sm">
        {Math.floor(((125 - getFraction()) / 125) * 100)}%
      </div>
      <svg height="50" width="50">
        <circle id="whole" cx="25" cy="25" r="20" />
        <circle
          id="fractional"
          cx="25"
          cy="25"
          r="20"
          transform="rotate(-90 25 25)"
          style={
            {
              "--variable-to": getFraction(),
            } as React.CSSProperties
          }
        />
      </svg>
    </div>
  );
}
