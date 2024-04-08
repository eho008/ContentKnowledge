import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { UpdateContentContext } from "../App";

export default function QuizNew() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const UpdateContent = useContext(UpdateContentContext);
  const id = useParams();
  const navigate = useNavigate();
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const addQuiz = async () => {
        axios.defaults.withCredentials = true;
        await axios
          .post(`${import.meta.env.VITE_BASE_URL}${id.id}/quiz`, {
            question: question,
            answer: answer,
          })
          .then((res) => {
            UpdateContent(res.data);
          });
      };
      addQuiz();
    } catch (error) {
      console.log(error);
    }
    navigate("/content/" + id.id + "/quiz/");
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Question</label>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <label>Answer</label>
      <textarea value={answer} onChange={(e) => setAnswer(e.target.value)} />

      <button type="submit">Add</button>
    </form>
  );
}
