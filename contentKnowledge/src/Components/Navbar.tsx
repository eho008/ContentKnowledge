import { Flex, Separator } from "@radix-ui/themes";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [, setCurrentPath] = useState(window.location.pathname);
  return (
    <>
      <Flex className="p-2">
        <div className="grow w-0">
          <img
            src="../../public/logo-no-background.svg"
            alt="some"
            className="h-8
        "
          />
        </div>
        {isLoggedIn ? (
          <>
            <Flex
              gap="3"
              justify="center"
              align="center"
              className="h-8 grow w-0 "
            >
              <Link
                to="/"
                className={
                  window.location.pathname === "/"
                    ? "bg-white text-black px-2 rounded-full py-0.5"
                    : `hover:bg-slate-800 px-2 rounded-full py-0.5 hover:text-white text-slate-300`
                }
                onClick={() => setCurrentPath("/")}
              >
                Home
              </Link>
              <Link
                to="/about"
                className={
                  window.location.pathname === "/about"
                    ? "bg-white text-black px-2 rounded-full py-0.5"
                    : `hover:bg-slate-800 hover:text-white px-2 rounded-full py-0.5 text-slate-300`
                }
                onClick={() => setCurrentPath("/about")}
              >
                About
              </Link>
            </Flex>
            <Flex justify="end" className="grow w-0">
              <Link to="/profile">
                <img
                  src="../../public/default_avatar.svg"
                  alt="avatar"
                  className={
                    window.location.pathname === "/profile"
                      ? "h-8 bg-white border-2 border-white rounded-full"
                      : "h-8 bg-slate-500 rounded-full hover:bg-slate-400"
                  }
                  onClick={() => setCurrentPath("/profile")}
                />
              </Link>
            </Flex>
          </>
        ) : (
          <>
            <Flex
              gap="3"
              justify="end"
              align="center"
              className="h-8 grow w-0 "
            >
              <Link
                to="/login"
                className={
                  window.location.pathname === "/login"
                    ? "bg-white text-black px-2 rounded-full py-0.5"
                    : `hover:bg-slate-800 px-2 rounded-full py-0.5 hover:text-white text-slate-300`
                }
                onClick={() => setCurrentPath("/login")}
              >
                Login
              </Link>
              <Link
                to="/register"
                className={
                  window.location.pathname === "/register"
                    ? "bg-white text-black px-2 rounded-full py-0.5"
                    : `hover:bg-slate-800 hover:text-white px-2 rounded-full py-0.5 text-slate-300`
                }
                onClick={() => setCurrentPath("/register")}
              >
                Register
              </Link>
            </Flex>
          </>
        )}
      </Flex>
      <Separator size="4" />
    </>
  );
}
