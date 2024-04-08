import { useNavigate } from "react-router";
import { Note } from "../assets/types";
import { FormEvent, useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { SomeContext } from "../pages/Content";

export default function NotePopup({ iteme }: { iteme: Note }) {
  const navigate = useNavigate();
  const ref = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState<string>(iteme.text);
  const itemsEdit = useContext(SomeContext);

  const handleOutsideClick = (e) => {
    if (ref.current && !ref.current.contains(e.target)) {
      handleSubmit(e);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const patchInput = async () => {
        axios.defaults.withCredentials = true;
        await axios
          .patch(`${import.meta.env.VITE_BASE_URL}notes/${iteme._id}`, {
            text: input,
          })
          .then((res) => {
            itemsEdit(res.data);
            navigate(-1);
          });
      };
      patchInput();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="note-popup-container">
      <div className="note-popup" ref={ref}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input
            type="text"
            defaultValue={input}
            className="p-3 rounded-xl"
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
        </form>
      </div>
    </div>
  );
}
