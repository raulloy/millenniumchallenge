import mongoose from "mongoose";

// Define the schema for answers inside each question
const AnswerSchema = new mongoose.Schema({
  position: { type: Number },
  visible: { type: Boolean },
  text: { type: String },
  quiz_options: {
    score: { type: Number },
  },
  id: { type: String },
  is_na: { type: Boolean }, // For matrix type questions, `is_na` may exist
  weight: { type: Number }, // For matrix type questions with weights
  description: { type: String }, // Descriptions for matrix-type questions
});

// Define the schema for questions inside each page
const QuestionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  category: { type: String },
  subcategory: { type: String },
  position: { type: Number },
  visible: { type: Boolean },
  family: { type: String },
  subtype: { type: String },
  layout: {
    bottom_spacing: { type: Number, default: 0 },
    col_width: { type: Number, default: null },
    col_width_format: { type: String, default: null },
    left_spacing: { type: Number, default: 0 },
    num_chars: { type: Number, default: null },
    num_lines: { type: Number, default: null },
    position: { type: String, default: "new_row" },
    right_spacing: { type: Number, default: 0 },
    top_spacing: { type: Number, default: 0 },
    width: { type: Number, default: null },
    width_format: { type: String, default: null },
  },
  sorting: { type: String, default: null },
  required: {
    text: { type: String },
    type: { type: String },
    amount: { type: String },
  },
  validation: { type: String, default: null },
  forced_ranking: { type: Boolean, default: false },
  headings: [
    {
      heading: { type: String },
    },
  ],
  href: { type: String },
  display_options: {
    show_display_number: { type: Boolean, default: false },
  },
  answers: {
    choices: [AnswerSchema], // Array of answer choices
    other: {
      position: { type: Number, default: 0 },
      visible: { type: Boolean, default: false },
      text: { type: String },
      id: { type: String },
      num_lines: { type: Number },
      num_chars: { type: Number },
      is_answer_choice: { type: Boolean },
      apply_all_rows: { type: Boolean },
      error_text: { type: String },
    },
    rows: [AnswerSchema], // For matrix-type questions that use rows
  },
});

// Define the schema for pages in the survey
const PageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  position: { type: Number },
  question_count: { type: Number },
  questions: [QuestionSchema], // Embed the QuestionSchema here
});

// Define the survey schema
const SurveySchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String },
  category: { type: String },
  pages: [PageSchema], // Embed the PageSchema here
});

// Create the Survey model
const Survey = mongoose.model("Survey", SurveySchema);

export default Survey;
