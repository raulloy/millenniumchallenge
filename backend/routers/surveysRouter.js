import express from "express";
import axios from "axios";
import expressAsyncHandler from "express-async-handler";
import { saveOrUpdateSurvey } from "../utils.js";
import Survey from "../models/surveyModel.js";

const surveysRouter = express.Router();

// Helper function to determine survey status
const getSurveyStatus = (statusObj) => {
  if (!statusObj || Object.keys(statusObj).length === 0) return "Draft"; // Default to "Draft" if empty
  if (statusObj.open) return "Open";
  if (statusObj.closed) return "Closed";
  if (statusObj.new) return "Open";
  return "Draft"; // Default to "Draft" if no other status is found
};

surveysRouter.get(
  "/",
  expressAsyncHandler(async (req, res) => {
    try {
      const response = await axios({
        url: "https://api.surveymonkey.com/v3/surveys?per_page=50",
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.SURVEY_MONKEY_ACCESS_TOKEN}`,
        },
        params: {
          include: "date_created,question_count,response_count,preview,collect_stats",
        },
      });

      res.send(response.data);
    } catch (err) {
      console.error("Error Details:", err.response?.data || err.message);
      res.status(err.response?.status || 500).send(err.response?.data || "An error occurred.");
    }
  })
);

surveysRouter.get(
  "/summary",
  expressAsyncHandler(async (req, res) => {
    try {
      const response = await axios({
        url: "https://api.surveymonkey.com/v3/surveys?per_page=50",
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.SURVEY_MONKEY_ACCESS_TOKEN}`,
        },
        params: {
          include: "collect_stats",
        },
      });

      const surveys = response.data.data;

      // Initialize counters
      let totalSurveys = surveys.length;
      let statusCounts = {
        Draft: 0,
        Open: 0,
        Closed: 0,
      };

      // Count surveys by status
      surveys.forEach((survey) => {
        const status = getSurveyStatus(survey.collect_stats?.status);
        if (statusCounts[status] !== undefined) {
          statusCounts[status]++;
        } else {
          statusCounts[status] = 1;
        }
      });

      // Prepare the summary response
      const summary = {
        totalSurveys,
        statusCounts,
      };

      res.send(summary);
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while fetching survey summary from SurveyMonkey.");
    }
  })
);

surveysRouter.get(
  "/:id/details",
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;

    // Check if the survey already exists
    const existingSurvey = await Survey.findOne({ id: surveyId });

    if (existingSurvey) {
      res.send({ ...existingSurvey._doc, exists: true });
    } else {
      try {
        const response = await axios({
          url: `https://api.surveymonkey.com/v3/surveys/${surveyId}/details`,
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.SURVEY_MONKEY_ACCESS_TOKEN}`,
          },
        });

        const saveDataMessage = await saveOrUpdateSurvey(response.data);
        console.log(saveDataMessage);

        res.send({ exists: false });
      } catch (err) {
        console.error(err.message);
        res.status(500).send(`An error occurred while fetching details for survey ${surveyId}.`);
      }
    }
  })
);
surveysRouter.get(
  "/:id/check",
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;

    const existingSurvey = await Survey.findOne({ id: surveyId });

    if (existingSurvey) {
      res.send({ exists: true });
    } else {
      res.send({ exists: false });
    }
  })
);

export default surveysRouter;
