import { getNote, patchNote } from "../controllers/notes";
import express from "express";
import { isAuthenticated, isOwnerOfNote } from "../middlewares/index";

export default (router: express.Router) => {
  router.get("/notes/:id", isAuthenticated, isOwnerOfNote, getNote);
  router.patch("/notes/:id", isAuthenticated, isOwnerOfNote, patchNote);
};
