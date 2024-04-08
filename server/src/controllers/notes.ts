import { createNote, getNoteById, getNotes } from "../db/notes";
import express from "express";
import { getContent } from "../db/contents";
import mongoose from "mongoose";

export const getAllNotes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const notes = await getNotes(req.params.id);
    if (!notes) return res.sendStatus(400);
    return res.status(200).json(notes);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getNote = async (req: express.Request, res: express.Response) => {
  try {
    const note = await getNoteById(req.params.id);
    if (!note) return res.sendStatus(400);

    return res.status(200).json(note);
  } catch (error) {
    console.log(error);
  }
};

export const createNewNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const content = getContent(req.params.id);

    if (!content) return res.sendStatus(401);

    const newNote = await createNote({
      content: new mongoose.Types.ObjectId(req.params.id),

      text: req.body.text,
    });
    return res.status(200).json(newNote).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const patchNote = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const note = await getNoteById(req.params.id);
    if (!note) return res.sendStatus(400);
    note.text = req.body.text;
    await note.save();
    return res.status(200).json(note).end();
  } catch (error) {
    console.log(error);
  }
};
