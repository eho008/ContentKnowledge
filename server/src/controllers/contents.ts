import { getUserBySessionToken } from "../db/users";
import {
  getContents,
  createContent,
  getContent,
  deleteContent,
} from "../db/contents";
import express from "express";

export const getAllContents = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = await getUserBySessionToken(req.cookies["ANDONIO-AUTH"]);
    const contents = await getContents(user._id);
    return res.status(200).json(contents);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const createNewContent = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { title, type, category } = req.body;
    const user = await getUserBySessionToken(req.cookies["ANDONIO-AUTH"]);
    const id = user._id;

    if (!title || !type || !id) return res.sendStatus(400);

    const content = await createContent({ title, type, user: id, category });
    return res.status(200).json(content).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getContentById = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const content = await getContent(req.params.id);
    if (!content) return res.sendStatus(400);

    return res.status(200).json(content);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const deleteSpecificContent = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const content = await deleteContent(req.params.id);

    if (!content) return res.sendStatus(400);

    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
