import mongoose from "mongoose";

const NotesSchema = new mongoose.Schema({
  text: { type: String, required: true },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
    required: true,
  },
});

export const NotesModel = mongoose.model("Notes", NotesSchema);

export const getNoteById = (note_id: string) =>
  NotesModel.findOne({ _id: note_id });
export const getNotes = (content_id: string) =>
  NotesModel.find({ content: content_id });
export const createNote = (values: Record<string, any>) =>
  new NotesModel(values).save().then((note) => note.toObject());
