import { HydratedDocument } from "mongoose";
import { IContent, getContent } from "../db/contents";
import { IQuiz, addQuizItem, getQuizByContentId } from "../db/quiz";
import { createQuiz, patchQuiz } from "../db/quiz";

import { Request, Response } from "express";

export const getQuiz = async (req: Request, res: Response) => {
  try {
    const quiz = await getQuizByContentId(req.params.id);
    if (!quiz) return res.sendStatus(400);
    return res.status(200).json(quiz);
  } catch (error) {}
};

export const createNewQuiz = async (req: Request, res: Response) => {
  try {
    const content = await getContent(req.params.id);

    if (!content) return res.sendStatus(400);
    if (content.quiz) return res.sendStatus(400);
    const newQuiz: HydratedDocument<IQuiz> = await createQuiz(req.body);
    content.quiz = newQuiz;
    await content.save();
    return res.status(200).json(content).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const editQuiz = async (req: Request, res: Response) => {
  try {
    const content: HydratedDocument<IContent> = await getContent(req.params.id);

    const quiz = await patchQuiz(req.body.quizitems, content.quiz._id);

    if (!quiz) return res.sendStatus(400);
    content.quiz = quiz;
    await content.save();
    return res.status(200).json(quiz);
  } catch (error) {
    console.log(error);
  }
};

export const addNewQuizItem = async (req: Request, res: Response) => {
  try {
    const content: HydratedDocument<IContent> = await getContent(req.params.id);

    const quiz = await addQuizItem(req.body, content.quiz._id);
    console.log(quiz);
    if (!quiz) return res.sendStatus(400);
    content.quiz = quiz;
    await content.save();
    return res.status(200).json(quiz);
  } catch (error) {
    console.log(error);
  }
};

export const getSpecificQuiz = async (req: Request, res: Response) => {
  try {
    const content: HydratedDocument<IContent> = await getContent(req.params.id);
    if (!content.quiz) return res.sendStatus(400);

    return res.status(200).json(content.quiz);
  } catch (error) {
    console.log(error);
  }
};
