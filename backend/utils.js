import axios from "axios";
import dotenv from "dotenv";

import Survey from "./models/surveyModel.js";
import Response from "./models/responsesModel.js";
import ResponseDetails from "./models/responseDetailsModel.js";
import AggregatedSurvey from "./models/aggregatedSurveyModel.js";

dotenv.config();

// Function to remove HTML tags from a string
export const stripHtmlTags = (str) => {
  return str.replace(/<[^>]*>?/gm, "");
};

export const saveOrUpdateSurvey = async (surveyData) => {
  const surveyToSave = {
    id: surveyData.id,
    title: surveyData.title,
    category: surveyData.category,
    pages: surveyData.pages.map((page) => ({
      id: page.id,
      position: page.position,
      question_count: page.question_count,
      questions: page.questions.map((question) => ({
        id: question.id,
        position: question.position,
        visible: question.visible,
        family: question.family,
        subtype: question.subtype,
        layout: question.layout,
        sorting: question.sorting,
        required: question.required,
        validation: question.validation,
        forced_ranking: question.forced_ranking,
        headings: question.headings.map((heading) => ({
          heading: stripHtmlTags(heading.heading),
          _id: heading._id,
        })),
        href: question.href,
        display_options: question.display_options,
        answers: {
          choices:
            question.answers?.choices?.map((choice) => ({
              position: choice.position,
              visible: choice.visible,
              text: stripHtmlTags(choice.text),
              quiz_options: choice.quiz_options,
              id: choice.id,
            })) || [],
          other: question.answers?.other
            ? {
                position: question.answers.other.position,
                visible: question.answers.other.visible,
                text: question.answers.other.text,
                id: question.answers.other.id,
                num_lines: question.answers.other.num_lines,
                num_chars: question.answers.other.num_chars,
                is_answer_choice: question.answers.other.is_answer_choice,
                apply_all_rows: question.answers.other.apply_all_rows,
                error_text: question.answers.other.error_text,
              }
            : null,
          rows:
            question.answers?.rows?.map((row) => ({
              position: row.position,
              visible: row.visible,
              text: stripHtmlTags(row.text),
              id: row.id,
              is_na: row.is_na,
              weight: row.weight,
              description: row.description,
            })) || [],
        },
      })),
    })),
  };

  // Check if the survey already exists
  let existingSurvey = await Survey.findOne({ id: surveyData.id });

  if (existingSurvey) {
    // If the survey already exists, update it
    await Survey.updateOne({ id: surveyData.id }, surveyToSave);
    return "Survey updated successfully";
  } else {
    // If the survey doesn't exist, save a new one
    const newSurvey = new Survey(surveyToSave);
    await newSurvey.save();
    return "Survey saved successfully";
  }
};

// Save responses to the database function
export const saveResponses = async (responseData, surveyId) => {
  try {
    for (const item of responseData) {
      await Response.updateOne(
        { id: item.id }, // Search by response ID
        { id: item.id, href: item.href, surveyId }, // Upsert data with surveyId
        { upsert: true } // Create if it doesn't exist
      );
    }

    console.log("All responses saved or updated successfully.");
  } catch (error) {
    console.error("Error saving responses to the database:", error);
    throw new Error("Failed to save responses to the database");
  }
};

export const saveOrUpdateResponseDetails = async (responseData) => {
  const responseToSave = {
    id: responseData.id,
    recipient_id: responseData.recipient_id,
    collection_mode: responseData.collection_mode,
    response_status: responseData.response_status,
    // custom_value: responseData.custom_value,
    // first_name: responseData.first_name,
    // last_name: responseData.last_name,
    email_address: responseData.email_address,
    ip_address: responseData.ip_address,
    // logic_path: responseData.logic_path,
    // metadata: responseData.metadata,
    // page_path: responseData.page_path,
    collector_id: responseData.collector_id,
    survey_id: responseData.survey_id,
    custom_variables: responseData.custom_variables,
    // edit_url: responseData.edit_url,
    // analyze_url: responseData.analyze_url,
    total_time: responseData.total_time,
    // date_modified: responseData.date_modified,
    date_created: responseData.date_created,
    // href: responseData.href,
    pages: responseData.pages.map((page) => ({
      id: page.id,
      questions: page.questions.map((question) => ({
        id: question.id,
        answers: question.answers.map((answer) => ({
          choice_id: answer.choice_id,
          row_id: answer.row_id,
          text: answer.text,
          // tag_data: answer.tag_data,
          choice_metadata: answer.choice_metadata,
        })),
      })),
    })),
  };

  // Check if the response already exists
  let existingResponse = await ResponseDetails.findOne({ id: responseData.id });

  if (existingResponse) {
    // If the response already exists, update it
    await ResponseDetails.updateOne({ id: responseData.id }, responseToSave);
    // console.log("All responses saved or updated successfully.");
    return "Response updated successfully";
  } else {
    // If the response doesn't exist, save a new one
    const newResponse = new ResponseDetails(responseToSave);
    await newResponse.save();
    // console.log("All responses saved or updated successfully.");
    return "Response saved successfully";
  }
};

// Function to fetch all responses by surveyId and process each response's details
export const fetchAndProcessAllResponses = async (surveyId) => {
  try {
    // Fetch responses for the surveyId from the database
    const responses = await Response.find({ surveyId: surveyId });

    console.log(`Total responses found: ${responses.length}`);

    // Initialize a counter
    let counter = 0;

    // Loop over each response to fetch detailed data
    for (const response of responses) {
      const responseId = response.id;
      counter++; // Increment the counter at the start of each loop

      // Check if response details already exist in the database
      const existingDetail = await ResponseDetails.findOne({ id: responseId });

      if (existingDetail) {
        console.log(
          `Response ${counter} of ${responses.length} (ID: ${responseId}) already exists, skipping API request.`
        );
        continue; // Skip to the next response
      }

      try {
        // Fetch detailed response data from the SurveyMonkey API
        const detailedResponse = await axios({
          url: `https://api.surveymonkey.com/v3/surveys/${surveyId}/responses/${responseId}/details`,
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.SURVEY_MONKEY_ACCESS_TOKEN}`,
          },
        });

        // Assuming the `saveOrUpdateResponseDetails` function saves the detailed data
        await saveOrUpdateResponseDetails(detailedResponse.data);

        // Log with the current counter value
        console.log(
          `Successfully processed response ${counter} of ${responses.length}, ID: ${responseId}`
        );
      } catch (err) {
        console.error(`Error fetching details for response ${counter} (ID: ${responseId}):`, err);
      }
    }

    // return "All responses processed successfully.";
  } catch (err) {
    console.error("Error fetching responses from database:", err);
    throw new Error("Failed to fetch or process responses.");
  }
};

// Function to save aggregated survey data
export const saveAggregatedSurvey = async (surveyData) => {
  try {
    // Create an instance of AggregatedSurvey with the survey data
    const aggregatedSurvey = new AggregatedSurvey({
      surveyId: surveyData.surveyId, // Set the surveyId
      questions: Object.keys(surveyData.questions).map((questionId) => ({
        questionId, // Set the question ID
        question: surveyData.questions[questionId].question, // Set the question text
        type: surveyData.questions[questionId].type, // Set the question type
        responses: Object.entries(surveyData.questions[questionId].responses)
          .filter(([key]) => key !== "text") // Exclude text responses for now
          .map(([choice, count]) => ({
            choice, // Set the choice text
            count, // Set the number of responses for the choice
          })),
        textResponses: surveyData.questions[questionId].responses.text || [], // Set text responses if they exist
      })),
    });

    // Save the aggregated survey to the database
    await aggregatedSurvey.save();

    console.log(`Aggregated survey data saved for survey ID: ${surveyData.surveyId}`);
    return "Aggregated survey data saved successfully";
  } catch (error) {
    console.error("Error saving aggregated survey data:", error);
    throw new Error("Failed to save aggregated survey data");
  }
};

export const baseUrl = () =>
  process.env.BASE_URL ? process.env.BASE_URL : "http://localhost:3000";
