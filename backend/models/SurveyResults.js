import mongoose from "mongoose";

// Define the schema for individual responses
const ResponseSchema = new mongoose.Schema(
  {
    key: { type: String, required: true }, // E.g., 'Hombre', 'Mujer'
    value: { type: mongoose.Schema.Types.Mixed, required: true }, // Either a number or nested object for matrix questions
  },
  { _id: false }
);

// Define the schema for questions
const QuestionSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    type: { type: String, required: true, enum: ["single_choice", "matrix"] },
    responses: { type: Map, of: mongoose.Schema.Types.Mixed, required: true }, // Map to hold either numeric values or nested response objects
  },
  { _id: false }
);

// Define the schema for categories
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Name of the category, e.g., 'Datos Demográficos'
    questions: [QuestionSchema], // Array of questions in this category
  },
  { _id: false }
);

// Define the main schema for the survey results
const SurveyResultsSchema = new mongoose.Schema({
  surveyId: { type: String, required: true },
  categories: [CategorySchema], // Array of categories in this survey
});

// Create the model
const SurveyResults = mongoose.model("SurveyResults", SurveyResultsSchema);

export default SurveyResults;
