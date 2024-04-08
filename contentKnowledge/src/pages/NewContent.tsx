import { Separator } from "@radix-ui/themes";
import axios from "axios";
import { FormEvent, useContext, useEffect, useState } from "react";
import { ContentType } from "../assets/types";
import { useNavigate } from "react-router";
import { ContentContext } from "../App";

export default function NewContent() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState<ContentType>();
  const contentContext = useContext(ContentContext);
  const navigate = useNavigate();
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const addContent = async () => {
        axios.defaults.withCredentials = true;
        await axios
          .post(`${import.meta.env.VITE_BASE_URL}contents`, {
            title: title,
            type: type,
            category: [category],
          })
          .then((res) => {
            setContent(res.data);
            contentContext(res.data);
          });
      };
      addContent();
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if (content) {
      navigate("/contents/" + content!._id);
    }
  }, [content, navigate]);
  return (
    <div className="w-3/4 mx-auto mt-3">
      <p className="text-xl">Create a new content</p>
      <Separator size="4" />
      <form className="content-form" onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          className="w-3/4 rounded-md"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <div className="type-category">
          <div className="type-type">
            <label htmlFor="type">Type</label>
            <select
              id="type"
              className="w-20 rounded-md"
              onChange={(e) => setType(e.target.value)}
              value={type}
            >
              <option value="" disabled hidden>
                Choose here
              </option>
              <option value="Video">Video</option>
              <option value="Book">Book</option>
              <option value="Article">Article</option>
              <option value="Lecture">Lecture</option>
              <option value="Podcast">Podcast</option>
              <option value="Movie">Movie</option>
              <option value="Paper">Paper</option>
            </select>
          </div>
          <div className="category-category">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              className="rounded-md "
              onChange={(e) => setCategory(e.target.value)}
              value={category}
            />
          </div>
        </div>

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
