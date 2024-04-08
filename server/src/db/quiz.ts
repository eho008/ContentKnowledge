import mongoose, { HydratedDocument, Model, Schema, Types } from "mongoose";
import {
  IQuizItem,
  QuizItemModel,
  QuizItemSchema,
  createQuizItem,
} from "./quizItem";

export interface IQuiz extends mongoose.Document {
  quizitems: Types.DocumentArray<IQuizItem>;
}

export const QuizSchema: Schema<IQuiz> = new mongoose.Schema({
  quizitems: [QuizItemSchema],
});

export const QuizModel: Model<IQuiz> = mongoose.model("Quiz", QuizSchema);

export const getQuizByContentId = (content_id: string) =>
  QuizModel.findOne({ content: content_id });

export const getQuiz = (quiz_id: string) => QuizModel.findOne({ _id: quiz_id });
export const createQuiz = async (values: Record<string, any>) => {
  const quiz: HydratedDocument<IQuizItem> = await new QuizItemModel(
    values
  ).save();
  return new QuizModel({
    quizitems: [quiz],
  })
    .save()
    .then((quiz) => quiz.toObject());
};
export const patchQuiz = async (
  values: Types.DocumentArray<IQuizItem>,
  id: string
) => {
  const quiz = await QuizModel.findById(id);
  quiz.quizitems = values;
  return quiz.save().then((quiz) => quiz.toObject());
};

export const addQuizItem = async (values: Record<string, any>, id: string) => {
  const quiz = await QuizModel.findById(id);
  console.log(values);
  quiz.quizitems.push(await createQuizItem(values));
  return quiz.save().then((quiz) => quiz.toObject());
};
