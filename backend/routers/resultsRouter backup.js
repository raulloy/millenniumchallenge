import express from "express";
import expressAsyncHandler from "express-async-handler";
import Survey from "../models/surveyModel.js";
import ResponseDetails from "../models/responseDetailsModel.js";
import { aggregateResponsesByCategory } from "./utils.js";
import SurveyResults from "../models/SurveyResults.js";

const resultsRouter = express.Router();

const getResponses = async (surveyId) => {
  try {
    // Fetch all the response details for the survey
    const responses = await ResponseDetails.find({ survey_id: surveyId });

    // console.log(responses.length);

    return responses;
  } catch (err) {
    throw new Error(`Error aggregating responses: ${err.message}`);
  }
};

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

resultsRouter.get(
  "/all/:id",
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;

    const existingResults = await SurveyResults.findOne({ surveyId });

    if (existingResults) {
      console.log("Results found in database, retrieving...");
      return res.send(existingResults);
    }

    const responses = await getResponses(surveyId);
    const surveyDetails = await Survey.findOne({ id: surveyId });

    const results = aggregateResponsesByCategory(responses, surveyDetails);

    await saveSurveyResults(results);

    console.log("Results generated and saved.");
    res.send(results);
  })
);

export default resultsRouter;
