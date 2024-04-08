import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Quiz } from "../assets/types";
import { Spinner } from "@radix-ui/themes";
import QACard from "../Components/QACard";

export default function QuizEdit() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [quiz, setQuiz] = useState<Quiz>();
  const id = useParams();
  const [fetching, setFetching] = useState<boolean>(true);
  useEffect(() => {
    try {
      const getQuizItem = async () => {
        axios.defaults.withCredentials = true;
        await axios
          .get(`http://localhost:8080/contents/${id.id}/quiz`)
          .then((res) => {
            setQuiz(res.data);
            2;
            setFetching(false);
          });
      };
      getQuizItem();
    } catch (error) {
      console.log(error);
    }
  }, [id.id]);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const addQuizItem = async () => {
        axios.defaults.withCredentials = true;
        await axios
          .patch(`${import.meta.env.VITE_BASE_URL}${id.id}/quiz`, {
            question: question,
            answer: answer,
          })
          .then((res) => {
            console.log(res.data);
            setQuiz(res.data);
            setAnswer("");
            setQuestion("");
          });
      };
      addQuizItem();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="mx-auto w-3/4 mt-3">
      <form
        onSubmit={handleSubmit}
        className="form-styles w-96 mx-auto p-2 rounded-lg"
      >
        <label htmlFor="quest">Question</label>
        <input
          type="text"
          id="quest"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="rounded-lg"
        />
        <label htmlFor="answer">Answer</label>
        <textarea
          id="answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="rounded-lg"
        />

        <button type="submit" className="rounded-lg bg-slate-600 my-3">
          Add
        </button>
      </form>

      {fetching ? (
        <Spinner />
      ) : (
        quiz?.quizitems.map((quizitem) => (
          <QACard key={quizitem.answer} quizitem={quizitem} />
        ))
      )}
    </div>
  );
}
