import mongoose from "mongoose";

// Define the schema for answers inside each question
const AnswerSchema = new mongoose.Schema(
  {
    choice_id: { type: String }, // Choice-based answers
    row_id: { type: String }, // For matrix-type questions with rows
    text: { type: String }, // For open-ended text responses
    // tag_data: { type: Array, default: [] }, // For any tag-related data (if applicable)
    choice_metadata: {
      weight: { type: String }, // For matrix-type questions with weight
    },
  },
  { _id: false }
);

// Define the schema for questions inside each page
const QuestionSchema = new mongoose.Schema(
  {
    id: { type: String, required: true }, // Question ID
    answers: [AnswerSchema], // Array of answers for each question
  },
  { _id: false }
);

// Define the schema for pages in the survey response
const PageSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Page ID
  questions: [QuestionSchema], // Array of questions on the page
});

// Define the survey response details schema
const ResponseDetailsSchema = new mongoose.Schema({
  id: { type: String, required: true }, // Response ID
  recipient_id: { type: String, default: "" }, // Optional recipient ID
  collection_mode: { type: String, default: "default" }, // Collection mode
  response_status: { type: String, required: true }, // Status of the response
  // custom_value: { type: String, default: "" }, // Custom value if provided
  // first_name: { type: String, default: "" }, // Respondent's first name
  // last_name: { type: String, default: "" }, // Respondent's last name
  email_address: { type: String, default: "" }, // Respondent's email address
  ip_address: { type: String }, // IP address of the respondent
  // logic_path: { type: Object, default: {} }, // Logic path (if applicable)
  // metadata: {
  //   respondent: {
  //     language: {
  //       type: Object, // Change this to an object instead of a string
  //       default: { type: "string", value: "" }, // Default structure
  //     },
  //   },
  //   contact: { type: Object, default: {} }, // Additional contact metadata (if any)
  // },
  // page_path: { type: Array, default: [] }, // Page path (if applicable)
  collector_id: { type: String, required: true }, // Collector ID
  survey_id: { type: String, required: true }, // Survey ID
  custom_variables: { type: Object, default: {} }, // Custom variables (if any)
  // edit_url: { type: String }, // Edit URL
  // analyze_url: { type: String }, // Analyze URL
  total_time: { type: Number }, // Total time spent on the survey
  // date_modified: { type: Date }, // Last modification date
  date_created: { type: Date }, // Creation date
  // href: { type: String }, // Link to the response details
  pages: [PageSchema], // Array of pages in the response, each containing questions
});

// Create the ResponseDetails model
const ResponseDetails = mongoose.model("ResponseDetails", ResponseDetailsSchema);

export default ResponseDetails;
