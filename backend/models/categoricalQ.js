import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    heading: { type: String, required: true },
    choices: { type: [String], required: true },
    label: { type: String },
  },
  { _id: false }
);

const categoricalQuestionsSchema = new mongoose.Schema({
  surveyId: { type: String, required: true, unique: true },
  categoricalQuestions: { type: [questionSchema], required: true },
});

const CategoricalQuestions = mongoose.model("CategoricalQuestions", categoricalQuestionsSchema);

export default CategoricalQuestions;
