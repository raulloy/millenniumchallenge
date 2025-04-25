import express from "express";
import expressAsyncHandler from "express-async-handler";
import Survey from "../models/surveyModel.js";
import ResponseDetails from "../models/responseDetailsModel.js";
import { aggregateResponsesByCategory, saveDynamicTableToDB } from "./utils.js";
import SurveyResults from "../models/SurveyResults.js";
import CategoricalQuestions from "../models/categoricalQ.js";
import { categoricalFilters, resultsProcessed } from "./resultsUtils.js";
import SurveyResponses from "../models/surveyResponses.js";

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

// resultsRouter.get(
//   "/dynamic-table/:id",
//   expressAsyncHandler(async (req, res) => {
//     const surveyId = req.params.id;

//     try {
//       // Fetch survey details and responses
//       const surveyDetails = await Survey.findOne({ id: surveyId });
//       if (!surveyDetails) {
//         return res.status(404).send({ message: "Survey details not found." });
//       }

//       const responses = await ResponseDetails.find({ survey_id: surveyId });
//       if (!responses) {
//         return res.status(404).send({ message: "Survey responses not found." });
//       }

//       // Generate survey results from responses
//       const surveyResults = aggregateResponsesByCategory(responses, surveyDetails);

//       // Fetch categorical questions
//       const categoricalQuestions = await CategoricalQuestions.findOne({ surveyId });
//       if (!categoricalQuestions) {
//         return res.status(404).send("Categorical questions not found");
//       }

//       // Filter out unwanted categories
//       const filteredCategories = surveyResults.categories.filter(
//         (category) => category.name !== "Datos Demográficos" && category.name !== "Sin categoría"
//       );

//       // Extract categorical question labels
//       const categoricalFilters = {};
//       categoricalQuestions.categoricalQuestions.forEach((q) => {
//         categoricalFilters[q.label] = q.choices;
//       });

//       // Initialize structure for pivot table data
//       const pivotTableData = {};

//       filteredCategories.forEach((category) => {
//         const categoryName = category.name;
//         pivotTableData[categoryName] = {};

//         // Initialize keys for each categorical filter
//         Object.keys(categoricalFilters).forEach((filter) => {
//           pivotTableData[categoryName][filter] = {};
//           categoricalFilters[filter].forEach((choice) => {
//             pivotTableData[categoryName][filter][choice] = 0;
//           });
//         });

//         // Aggregate responses for each question in the category
//         category.questions.forEach((question) => {
//           if (question.relative_frequency) {
//             Object.entries(question.relative_frequency).forEach(([choice, frequency]) => {
//               Object.keys(categoricalFilters).forEach((filter) => {
//                 // Ensure the choice exists in the filter
//                 if (categoricalFilters[filter].includes(choice.trim())) {
//                   pivotTableData[categoryName][filter][choice.trim()] += parseFloat(frequency);
//                 }
//               });
//             });
//           }
//         });

//         // Calculate relative frequencies for each filter and choice
//         Object.keys(pivotTableData[categoryName]).forEach((filter) => {
//           const totalResponses = Object.values(pivotTableData[categoryName][filter]).reduce(
//             (acc, val) => acc + val,
//             0
//           );

//           if (totalResponses > 0) {
//             Object.keys(pivotTableData[categoryName][filter]).forEach((choice) => {
//               pivotTableData[categoryName][filter][choice] = parseFloat(
//                 ((pivotTableData[categoryName][filter][choice] / totalResponses) * 100).toFixed(2)
//               );
//             });
//           }
//         });
//       });

//       res.send(pivotTableData);
//     } catch (err) {
//       console.error("Error generating pivot table data:", err);
//       res.status(500).send("An error occurred while generating the pivot table.");
//     }
//   })
// );

resultsRouter.get(
  "/dynamic-table/:id",
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
        const choiceIds = values.split(",").flatMap((value) => {
          const choice = surveyDetails.pages
            .flatMap((page) => page.questions)
            .find((q) => q.id === question.questionId)
            ?.answers.choices.find((choice) => choice.text === value);
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

    // Aggregate responses by categorical questions
    const groupedResults = [];
    for (const question of categoricalQuestions.categoricalQuestions) {
      const possibleValues =
        surveyDetails.pages
          .flatMap((page) => page.questions)
          .find((q) => q.id === question.questionId)
          ?.answers.choices.map((choice) => choice.text) || [];

      const values = {};
      for (const value of possibleValues) {
        const responsesForValue = filteredResponses.filter((response) => {
          return response.pages
            .flatMap((page) => page.questions)
            .some(
              (q) =>
                q.id === question.questionId &&
                q.answers.some((answer) => {
                  const choice = surveyDetails.pages
                    .flatMap((page) => page.questions)
                    .find((surveyQuestion) => surveyQuestion.id === q.id)
                    ?.answers.choices.find((choice) => choice.text === value);
                  return choice && answer.choice_id === choice.id;
                })
            );
        });

        const sanitizeKey = (key) => key.replace(/\./g, "·");

        values[sanitizeKey(value)] = aggregateResponsesByCategory(responsesForValue, surveyDetails);
      }

      groupedResults.push({
        key: question.label,
        values,
      });
    }

    // Save groupedResults to the database
    try {
      const saveGroupedResults = await saveDynamicTableToDB(surveyId, groupedResults);
      console.log(saveGroupedResults);
      res.send({ surveyId, groupedResults, saved: true });
    } catch (error) {
      res
        .status(500)
        .send({ message: "Failed to save data to the database.", error: error.message });
    }
  })
);

resultsRouter.get(
  "/ttb-categories/:id",
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;

    try {
      // Find the saved data in the database by surveyId
      const surveyData = await SurveyResponses.findOne({ surveyId });

      if (!surveyData) {
        return res.status(404).send({ message: "Survey results not found." });
      }

      // Return the saved data
      res.send(surveyData);
    } catch (error) {
      console.error("Error retrieving survey results:", error);
      res.status(500).send({ message: "Failed to retrieve survey results.", error: error.message });
    }
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
