import express from "express";
import {
  getAllContents,
  createNewContent,
  getContentById,
  deleteSpecificContent,
} from "../controllers/contents";
import { isAuthenticated, isOwnerOfContent } from "../middlewares";
import { getAllNotes, createNewNote } from "../controllers/notes";
import {
  editQuiz,
  createNewQuiz,
  getSpecificQuiz,
  addNewQuizItem,
} from "../controllers/quiz";

export default (router: express.Router) => {
  router.get("/contents", isAuthenticated, getAllContents);
  router.post("/contents", isAuthenticated, createNewContent);
  router.get(
    "/contents/:id",
    isAuthenticated,
    isOwnerOfContent,
    getContentById
  );
  router.patch(
    "/contents/:id",
    isAuthenticated,
    isOwnerOfContent,
    createNewNote
  );
  router.get(
    "/contents/:id/notes",
    isAuthenticated,
    isOwnerOfContent,
    getAllNotes
  );
  router.post(
    "/contents/:id/notes",
    isAuthenticated,
    isOwnerOfContent,
    createNewNote
  );
  router.post(
    "/contents/:id/quiz",
    isAuthenticated,
    isOwnerOfContent,
    createNewQuiz
  );
  router.patch(
    "/contents/:id/quiz",
    isAuthenticated,
    isOwnerOfContent,
    addNewQuizItem
  );

  router.get(
    "/contents/:id/quiz",
    isAuthenticated,
    isOwnerOfContent,
    getSpecificQuiz
  );
  router.delete(
    "/contents/:id",
    isAuthenticated,
    isOwnerOfContent,
    deleteSpecificContent
  );
  router.patch(
    "/contents/:id/quiz/:quizId/new",
    isAuthenticated,
    isOwnerOfContent,
    editQuiz
  );
};
