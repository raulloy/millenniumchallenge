import express from "express";
import expressAsyncHandler from "express-async-handler";
import Survey from "../models/surveyModel.js";
import ResponseDetails from "../models/responseDetailsModel.js";
import { aggregateResponsesByCategory } from "./utils.js";
import SurveyResults from "../models/SurveyResults.js";
import CategoricalQuestions from "../models/categoricalQ.js";

const resultsRouter = express.Router();

const saveSurveyResults = async (resultsData) => {
  try {
    // Create a new SurveyResults document based on the input data
    const surveyResults = new SurveyResults({
      surveyId: resultsData.surveyId,
      categories: resultsData.categories.map((category) => ({
        name: Object.keys(category)[0],
        questions: category[Object.keys(category)[0]].questions.map((question) => ({
          question: question.question,
          type: question.type,
          responses: question.responses,
        })),
      })),
    });

    // Save the survey results document to the database
    const savedResults = await surveyResults.save();
    console.log("Survey results saved successfully:", savedResults);

    return savedResults;
  } catch (error) {
    console.error("Error saving survey results:", error);
    throw new Error("Failed to save survey results");
  }
};

const getResponses = async (surveyId) => {
  try {
    // Fetch all the response details for the survey
    const responses = await ResponseDetails.find({ survey_id: surveyId });

    console.log(responses.length);
    return responses;
  } catch (err) {
    throw new Error(`Error aggregating responses: ${err.message}`);
  }
};

resultsRouter.get(
  "/all/:id",
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;
    const queryFilters = req.query;

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
    res.send(results);
  })
);

export default resultsRouter;

// resultsRouter.get(
//   "/all/:id",
//   expressAsyncHandler(async (req, res) => {
//     const surveyId = req.params.id;

//     const existingResults = await SurveyResults.findOne({ surveyId });

//     if (existingResults) {
//       console.log("Results found in database, retrieving...");
//       return res.send(existingResults);
//     }

//     const responses = await getResponses(surveyId);
//     const surveyDetails = await Survey.findOne({ id: surveyId });

//     const results = aggregateResponsesByCategory(responses, surveyDetails);

//     await saveSurveyResults(results);

//     console.log("Results generated and saved.");
//     res.send(results);
//   })
// );
