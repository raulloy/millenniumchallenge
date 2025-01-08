import mongoose from "mongoose";

// Schema for matrix questions
const MatrixResponsesSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    responses: {
      type: Map,
      of: mongoose.Schema.Types.Mixed, // Supports nested objects for matrix responses
    },
    relative_frequency: {
      type: Map,
      of: mongoose.Schema.Types.Mixed,
    },
  },
  { _id: false }
);

// Schema for single-choice questions
const SingleChoiceResponsesSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    type: { type: String, required: true, enum: ["single_choice"] },
    responses: {
      type: Map,
      of: Number, // Maps response options to counts
    },
    relative_frequency: {
      type: Map,
      of: String, // Maps response options to their relative frequency
    },
  },
  { _id: false }
);

// Schema for categories
const CategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    questions: {
      type: [
        {
          type: new mongoose.Schema(
            {
              question: { type: String, required: true },
              type: { type: String, required: true, enum: ["matrix", "single_choice"] },
              responses: {
                type: Map,
                of: mongoose.Schema.Types.Mixed,
              },
              relative_frequency: {
                type: Map,
                of: mongoose.Schema.Types.Mixed,
              },
            },
            { _id: false }
          ),
        },
      ],
    },
  },
  { _id: false }
);

// Schema for grouped results by demographic attributes
const GroupedResultsSchema = new mongoose.Schema(
  {
    key: { type: String, required: true }, // e.g., gender, age_group, etc.
    values: {
      type: Map,
      of: new mongoose.Schema(
        {
          surveyId: { type: String, required: true },
          title: { type: String, required: true },
          categories: [CategorySchema],
        },
        { _id: false }
      ),
    },
  },
  { _id: false }
);

// Final schema for the entire survey response structure
const SurveyResponseSchema = new mongoose.Schema({
  surveyId: { type: String, required: true },
  groupedResults: [GroupedResultsSchema],
});

const SurveyResponses = mongoose.model("SurveyResponses", SurveyResponseSchema);

export default SurveyResponses;
