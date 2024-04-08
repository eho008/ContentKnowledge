import { useEffect, useState } from "react";
import { Quiz, QuizItem } from "../assets/types";
import { useParams } from "react-router";
import axios from "axios";
import { Spinner } from "@radix-ui/themes";
import FlashCard from "../Components/FlashCard";
import NavButtons from "../Components/NavButtons";
import Progress from "../Components/Progress";

export default function QuizDisplay() {
  const [quiz, setQuiz] = useState<Quiz>();
  const id = useParams();
  const [fetching, setFetching] = useState<boolean>(true);
  const [index, setIndex] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);

  useEffect(() => {
    try {
      const getQuizItem = async () => {
        axios.defaults.withCredentials = true;
        await axios
          .get(`http://localhost:8080/contents/${id.id}/quiz`)
          .then((res) => {
            setQuiz(res.data);

            setFetching(false);
          });
      };
      getQuizItem();
    } catch (error) {
      console.log(error);
    }
  }, [id.id]);

  function updateBackend(quizitems: QuizItem[]) {
    try {
      const postQuizItem = async () => {
        axios.defaults.withCredentials = true;
        await axios.patch(
          `${import.meta.env.VITE_BASE_URL}${id.id}/quiz/${quiz?._id}/new`,
          { quizitems }
        );
      };
      postQuizItem();
    } catch (error) {
      console.log(error);
    }
  }

  function handleFlip() {
    setFlipped((prev) => !prev);
  }

  function handleInc() {
    if (index === quiz!.quizitems.length - 1) setIndex(0);
    else setIndex((prev) => prev + 1);
    setFlipped(false);
  }
  function handleDec() {
    if (index === 0) setIndex(quiz!.quizitems.length - 1);
    else setIndex((prev) => prev - 1);
    setFlipped(false);
  }

  function correct(id: string) {
    const newQuizItems = quiz?.quizitems.map((item) =>
      item._id === id ? { ...item, correct: true } : item
    );
    updateBackend(newQuizItems!);
    setQuiz((prev) => ({ ...prev!, quizitems: newQuizItems! }));
  }
  function wrong(id: string) {
    const newQuizItems = quiz?.quizitems.map((item) =>
      item._id === id ? { ...item, correct: false } : item
    );
    updateBackend(newQuizItems!);
    setQuiz((prev) => ({ ...prev!, quizitems: newQuizItems! }));
  }

  return (
    <div className="w-3/4 mx-auto flex justify-center mt-3">
      {fetching ? (
        <Spinner />
      ) : (
        <div>
          <div className="flex justify-between items-end">
            <p className="text-slate-400 opacity-80">
              {index + 1}/{quiz?.quizitems.length}
            </p>
            <Progress quizitems={quiz?.quizitems} />
          </div>
          <FlashCard
            quizitem={quiz!.quizitems[index]}
            flipped={flipped}
            handleFlip={handleFlip}
          />
          <NavButtons
            handleInc={handleInc}
            handleDec={handleDec}
            quizitem={quiz!.quizitems[index]}
            correct={correct}
            wrong={wrong}
          />
        </div>
      )}
    </div>
  );
}
