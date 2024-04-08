import { extend } from "lodash";
import mongoose from "mongoose";

export interface IQuizItem extends mongoose.Document {
  question: string;
  answer: string;
  correct: boolean;
}

export const QuizItemSchema = new mongoose.Schema<IQuizItem>({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  correct: { type: Boolean, default: false },
});

export const QuizItemModel = mongoose.model<IQuizItem>(
  "QuizItem",
  QuizItemSchema
);

export const getQuizItemByQuizId = (quiz_id: string) =>
  QuizItemModel.find({ quiz: quiz_id });
export const createQuizItem = (values: Record<string, any>) =>
  new QuizItemModel(values).save().then((quizItem) => quizItem.toObject());
