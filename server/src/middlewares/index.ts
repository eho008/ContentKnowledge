import express from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";
import { getContent } from "../db/contents";
import { getNoteById } from "../db/notes";

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, "identity._id") as string;
    if (!currentUserId) return res.sendStatus(403);
    if (currentUserId.toString() !== id) return res.sendStatus(403);
    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["ANDONIO-AUTH"];

    if (!sessionToken) return res.sendStatus(403);

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) return res.sendStatus(403);
    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwnerOfContent = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["ANDONIO-AUTH"];
    const existingUser = await getUserBySessionToken(sessionToken);
    const content = await getContent(req.params.id);
    if (!content) return res.sendStatus(400);
    if (content.user.toString() !== existingUser._id.toString())
      return res.sendStatus(401);
    next();
  } catch (error) {
    console.log(error);
  }
};

export const isOwnerOfNote = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["ANDONIO-AUTH"];
    const existingUser = await getUserBySessionToken(sessionToken);
    const note = await getNoteById(req.params.id);
    if (!note) return res.sendStatus(400);
    const content = await getContent(note.content.toString());
    if (content.user.toString() !== existingUser._id.toString())
      return res.sendStatus(401);
    next();
  } catch (error) {}
};
