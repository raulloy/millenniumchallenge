import Survey from "../models/surveyModel.js";
import ResponseDetails from "../models/responseDetailsModel.js";
import { aggregateResponsesByCategory } from "./utils.js";
import CategoricalQuestions from "../models/categoricalQ.js";

export const resultsProcessed = async (surveyId, queryFilters) => {
  // Fetch categorical questions for the survey
  const categoricalQuestions = await CategoricalQuestions.findOne({ surveyId });
  if (!categoricalQuestions) {
    return res.status(404).send({ message: "Categorical questions not found for this survey." });
  }

  // Fetch survey details for choice IDs
  const surveyDetails = await Survey.findOne({ id: surveyId });
  if (!surveyDetails) {
    return res.status(404).send({ message: "Survey details not found." });
  }

  // Map filter values to arrays of choice IDs
  const filterChoiceIds = {};
  Object.entries(queryFilters).forEach(([label, values]) => {
    const question = categoricalQuestions.categoricalQuestions.find((q) => q.label === label);
    if (question) {
      // Support multiple values for each parameter (split by commas)
      const choiceIds = values.split(",").flatMap((value) => {
        const choice = surveyDetails.pages
          .flatMap((page) => page.questions)
          .find((q) => q.id === question.questionId)
          .answers.choices.find((choice) => choice.text === value);
        return choice ? choice.id : [];
      });

      if (choiceIds.length > 0) {
        filterChoiceIds[question.questionId] = choiceIds;
      }
    }
  });

  // Fetch all responses for the survey
  const responses = await ResponseDetails.find({ survey_id: surveyId });

  // Apply filters based on choice IDs
  const filteredResponses = responses.filter((response) => {
    return Object.entries(filterChoiceIds).every(([questionId, choiceIds]) => {
      const questionResponse = response.pages
        .flatMap((page) => page.questions)
        .find((q) => q.id === questionId);

      return (
        questionResponse &&
        questionResponse.answers.some((answer) => choiceIds.includes(answer.choice_id))
      );
    });
  });

  // Aggregate the filtered responses
  const results = aggregateResponsesByCategory(filteredResponses, surveyDetails);

  return results;
};

export const categoricalFilters = async (surveyId) => {
  try {
    const existingSurvey = await CategoricalQuestions.findOne({ surveyId });

    return existingSurvey;
  } catch (err) {
    console.error("Error saving categories:", err);
    res.status(500).send("An error occurred while saving categories.");
  }
};
