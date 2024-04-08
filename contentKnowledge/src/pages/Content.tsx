import { Badge, Button, Flex, Separator, Spinner } from "@radix-ui/themes";
import { FormEvent, createContext, useEffect, useState } from "react";
import { ContentType, Note } from "../assets/types";
import axios from "axios";
import { useParams } from "react-router";

import Tiles from "../Components/Tiles";
import { Link } from "react-router-dom";
export const SomeContext = createContext<(item: Note) => void>(() => {});

export default function Content({ blur }: { blur?: boolean }) {
  const [content, setContent] = useState<ContentType | null>(null);
  const { id } = useParams();
  const [feching, setFetching] = useState<boolean>(true);
  const [note, setNote] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>([]);
  const [fechNotes, setFechNotes] = useState<boolean>(true);

  function itemChange(item: Note) {
    const index = notes.findIndex((note) => note._id === item._id);
    const newNotes = [...notes];
    newNotes[index] = item;
    setNotes(newNotes);
  }

  useEffect(() => {
    try {
      const checkLogin = async () => {
        axios.defaults.withCredentials = true;
        await axios.get(`http://localhost:8080/contents/${id}`).then((res) => {
          setContent({ ...res.data });
          setFetching(false);
        });
      };
      checkLogin();

      setFechNotes(false);
    } catch (error) {
      console.log(error);
    }
    try {
      const getNotes = async () => {
        await axios
          .get(`http://localhost:8080/contents/${id}/notes`)
          .then((res) => {
            setNotes(res.data);
          });
      };
      getNotes();
    } catch (error) {
      console.log(error);
    }
  }, [blur, id]);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const addNewNote = async () => {
        axios.defaults.withCredentials = true;
        await axios
          .post(`${import.meta.env.VITE_BASE_URL}/contents/${id}/notes`, {
            text: note,
          })
          .then((res) => {
            setNotes((prev) => [...prev, { ...res.data }]);
          });
      };

      addNewNote();
    } catch (error) {
      console.log(error);
    }
    setNote("");
  }

  return (
    <SomeContext.Provider value={itemChange}>
      <div className="w-3/4 mx-auto content-container px-3 rounded-md py-2">
        {feching ? (
          <Spinner size="3" />
        ) : (
          <>
            <h2 className="text-lg">{content?.title}</h2>
            <Flex justify="between" align="end">
              <Flex gap="2">
                {content?.category.map((category) => (
                  <Badge key={category} color="blue" radius="none">
                    {category}
                  </Badge>
                ))}
              </Flex>
              {content?.quiz ? (
                <Flex gap="2">
                  <Link to={`/contents/${id}/quiz`}>
                    <Button
                      variant="soft"
                      color="indigo"
                      radius="large"
                      className="growss"
                    >
                      Play
                    </Button>
                  </Link>
                  <Link to={`/contents/${id}/quiz/edit`}>
                    <Button variant="soft" radius="large" className="growss">
                      Edit Quiz
                    </Button>
                  </Link>
                </Flex>
              ) : (
                <Link to={`/contents/${id}/quiz/new`}>
                  <Button
                    color="green"
                    radius="large"
                    className="growss"
                    variant="outline"
                  >
                    Create Quiz
                  </Button>
                </Link>
              )}
            </Flex>
            <Separator my="3" size="4" />

            <form
              className="mb-3 w-full flex justify-center"
              onSubmit={(e) => handleSubmit(e)}
            >
              <input
                type="text"
                className="w-2/3 border-1 rounded-lg"
                placeholder=" Add a note..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </form>
            {fechNotes ? <Spinner size="3" /> : <Tiles items={notes} />}
          </>
        )}
      </div>
    </SomeContext.Provider>
  );
}
