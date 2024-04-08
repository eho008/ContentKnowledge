import mongoose, { Model, Schema, Types } from "mongoose";
import { IQuiz, QuizModel, QuizSchema } from "./quiz";
import { createQuizItem } from "./quizItem";

export interface IContent {
  title: string;
  type: string;
  category: string[];
  user: Types.ObjectId;
  quiz: IQuiz;
  notes: string[];
}

const ContentSchema: Schema<IContent> = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, required: true },
  category: [{ type: String, required: true }],
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  quiz: QuizSchema,
  notes: [{ type: Schema.Types.ObjectId, ref: "Note" }],
});

export const ContentModel: Model<IContent> = mongoose.model(
  "Content",
  ContentSchema
);

export const getContents = (user_id: Types.ObjectId) =>
  ContentModel.find({ user: user_id });
export const createContent = (values: Record<string, any>) =>
  new ContentModel(values).save().then((content) => content.toObject());
export const getContent = (content_id: string) =>
  ContentModel.findOne({ _id: content_id });
export const deleteContent = (content_id: string) =>
  ContentModel.deleteOne({ _id: content_id });
