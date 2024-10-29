import mongoose from "mongoose";

// Define the schema for individual response choices (without _id)
const ResponseSchema = new mongoose.Schema(
  {
    choice: { type: String, required: true },
    count: { type: Number, required: true },
  },
  { _id: false } // Disable _id for this subdocument schema
);

// Define the schema for questions (without _id)
const QuestionSchema = new mongoose.Schema(
  {
    questionId: { type: String, required: true },
    question: { type: String, required: true },
    type: { type: String, required: true },
    responses: [ResponseSchema], // Array of response choices
    textResponses: { type: [String], default: [] }, // Array of text responses
  },
  { _id: false } // Disable _id for this subdocument schema
);

// Define the aggregated survey schema
const AggregatedSurveySchema = new mongoose.Schema({
  surveyId: { type: String, required: true },
  questions: [QuestionSchema], // Array of questions
});

// Create the AggregatedSurvey model
const AggregatedSurvey = mongoose.model("AggregatedSurvey", AggregatedSurveySchema);

export default AggregatedSurvey;
