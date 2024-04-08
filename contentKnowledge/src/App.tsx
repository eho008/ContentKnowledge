import { createContext, useEffect, useState } from "react";

import Home from "./pages/Home";
import About from "./pages/About";
import { Route, Routes } from "react-router";

import Navbar from "./Components/Navbar";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Register from "./pages/Register";
import axios from "axios";
import Content from "./pages/Content";

import { ContentType } from "./assets/types";
import { Spinner } from "@radix-ui/themes";
import QuizEdit from "./pages/QuizEdit";
import QuizNew from "./pages/QuizNew";
import QuizDisplay from "./pages/QuizDisplay";
import NewContent from "./pages/NewContent";
export const ContentContext = createContext<(content: ContentType) => void>(
  () => {}
);
export const UpdateContentContext = createContext<
  (content: ContentType) => void
>(() => {});

export const DeleteContentContext = createContext<(id: string) => void>(
  () => {}
);

function App() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [loggingIn, setLoggingIn] = useState(true);
  const [contents, setContents] = useState<ContentType[]>([]);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleContentNew(content: ContentType) {
    setContents([...contents, content]);
  }

  function handleContentUpdate(update: ContentType) {
    setContents((contents) =>
      contents.map((content) => (content._id === update._id ? update : content))
    );
  }
  function handleContentDelete(id: string) {
    try {
      const checkLogin = async () => {
        axios.defaults.withCredentials = true;

        await axios.delete(`${import.meta.env.VITE_BASE_URL}${id}`).then(() => {
          setContents((contents) =>
            contents.filter((content) => content._id !== id)
          );
        });
      };
      checkLogin();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    try {
      const checkLogin = async () => {
        axios.defaults.withCredentials = true;

        await axios
          .get(`${import.meta.env.VITE_BASE_URL}contents`)
          .then((res) => {
            setContents([...res.data]);
          });
      };
      checkLogin();
      setLoggingIn(false);
      setLoggedIn(true);
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      {loggingIn ? (
        <Spinner size="3" />
      ) : isLoggedIn ? (
        <>
          <Navbar isLoggedIn={isLoggedIn} />
          <ContentContext.Provider value={handleContentNew}>
            <UpdateContentContext.Provider value={handleContentUpdate}>
              <DeleteContentContext.Provider value={handleContentDelete}>
                <Routes>
                  <Route path="/" element={<Home contents={contents} />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/contents/new" element={<NewContent />} />
                  <Route path="/contents/:id" element={<Content />}></Route>
                  <Route path="/contents/:id/quiz" element={<QuizDisplay />} />
                  <Route path="/contents/:id/quiz/new" element={<QuizNew />} />
                  <Route
                    path="/contents/:id/quiz/edit"
                    element={<QuizEdit />}
                  />
                  <Route
                    path="/contents/:id/notes/:noteid"
                    element={<Content />}
                  />
                  <Route path="*" element={<Home contents={contents} />} />
                </Routes>
              </DeleteContentContext.Provider>
            </UpdateContentContext.Provider>
          </ContentContext.Provider>
        </>
      ) : (
        <>
          <Navbar isLoggedIn={isLoggedIn} />
          <Routes>
            <Route
              path="/login"
              element={<Login handleLogin={handleLogin} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Login handleLogin={handleLogin} />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
