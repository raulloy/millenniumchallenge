import mongoose from "mongoose";

const ResponseSchema = new mongoose.Schema({
  id: { type: String, required: true },
  href: { type: String, required: true },
  surveyId: {
    type: mongoose.Schema.Types.String,
    ref: "Survey",
    required: true,
  }, // Foreign key to link to the Survey model
});

// Create the model from the schema
const Response = mongoose.model("Response", ResponseSchema);

export default Response;
