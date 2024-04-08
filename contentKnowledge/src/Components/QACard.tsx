export default function QACard({
  quizitem,
}: {
  quizitem: { question: string; answer: string };
}) {
  return (
    <div className="w-96 mx-auto my-4">
      <div className="rounded-t-lg bg-emerald-500 indigo-500 flex justify-center py-4">
        <p>Q: {quizitem.question}</p>
      </div>
      <div className="rounded-b-lg flex justify-center bg-indigo-500 py-4">
        <p>A: {quizitem.answer}</p>
      </div>
    </div>
  );
}
