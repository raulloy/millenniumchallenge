import express from "express";
import axios from "axios";
import expressAsyncHandler from "express-async-handler";
import {
  fetchAndProcessAllResponses,
  saveOrUpdateResponseDetails,
  saveResponses,
} from "../utils.js";

const responsesRouter = express.Router();

responsesRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;

    try {
      const response = await axios({
        url: `https://api.surveymonkey.com/v3/surveys/${surveyId}/responses?per_page=200`,
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.SURVEY_MONKEY_ACCESS_TOKEN}`,
        },
      });

      await saveResponses(response.data.data, surveyId);

      // Fetch and process detailed responses for each response ID
      const result = await fetchAndProcessAllResponses(surveyId);
      console.log(result);

      res.send(response.data);
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while fetching surveys from SurveyMonkey.");
    }
  })
);

responsesRouter.get(
  "/:id/responses/:response",
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;
    const responseId = req.params.response;

    try {
      const response = await axios({
        url: `https://api.surveymonkey.com/v3/surveys/${surveyId}/responses/${responseId}/details`,
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.SURVEY_MONKEY_ACCESS_TOKEN}`,
        },
      });

      await saveOrUpdateResponseDetails(response.data);

      res.send(response.data);
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while fetching surveys from SurveyMonkey.");
    }
  })
);

export default responsesRouter;
