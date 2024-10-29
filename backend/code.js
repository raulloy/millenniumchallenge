// Function to aggregate responses by question
const aggregateResponsesByQuestion = async (surveyId) => {
  try {
    // Fetch the survey details
    const survey = await Survey.findOne({ id: surveyId });
    if (!survey) {
      throw new Error(`Survey with ID ${surveyId} not found`);
    }

    // Fetch all the response details for the survey
    const responses = await ResponseDetails.find({ survey_id: surveyId });

    // Initialize a summary object to store aggregated data
    const summary = {
      surveyId: surveyId, // Add the survey ID to the summary
      questions: {}, // This will store the questions and their responses
    };

    // Loop over each page and question in the survey
    survey.pages.forEach((page) => {
      page.questions.forEach((question) => {
        const questionId = question.id;
        const questionType = question.family;

        // Initialize the summary for the current question
        summary.questions[questionId] = {
          question: question.headings[0].heading,
          type: questionType,
          responses: {},
        };

        // If it's a choice-based question, initialize choice counts
        if (question.answers.choices) {
          question.answers.choices.forEach((choice) => {
            summary.questions[questionId].responses[choice.text] = 0;
          });
        }

        // If it's an open-ended question, initialize an array for text responses
        if (questionType === "open_ended") {
          summary.questions[questionId].responses.text = [];
        }
      });
    });

    // Loop through each response and aggregate answers
    responses.forEach((response) => {
      response.pages.forEach((responsePage) => {
        responsePage.questions.forEach((responseQuestion) => {
          const questionId = responseQuestion.id;
          const questionSummary = summary.questions[questionId];

          // Skip if the question wasn't part of the survey
          if (!questionSummary) return;

          // Loop over the answers for the current question in the response
          responseQuestion.answers.forEach((answer) => {
            if (answer.choice_id) {
              // It's a choice-based answer, increment the count for the choice
              const choice = survey.pages
                .flatMap((page) => page.questions)
                .find((q) => q.id === questionId)
                ?.answers.choices.find((choice) => choice.id === answer.choice_id);

              if (choice && choice.text) {
                questionSummary.responses[choice.text]++;
              }
            } else if (answer.text) {
              // It's a text-based answer, make sure the text array is initialized
              if (!Array.isArray(questionSummary.responses.text)) {
                questionSummary.responses.text = [];
              }
              questionSummary.responses.text.push(answer.text);
            }
          });
        });
      });
    });

    return summary;
  } catch (err) {
    throw new Error(`Error aggregating responses: ${err.message}`);
  }
};

// Endpoint to return aggregated responses by question
resultsRouter.get(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;

    try {
      const getAggregatedSurvey = await AggregatedSurvey.findOne({ surveyId });

      if (getAggregatedSurvey) {
        res.send(getAggregatedSurvey);
      } else {
        const summary = await aggregateResponsesByQuestion(surveyId);
        await saveAggregatedSurvey(summary);

        getAggregatedSurvey = await AggregatedSurvey.findOne({ surveyId });
        res.send(getAggregatedSurvey);
      }
    } catch (err) {
      console.error(err);
      res.status(500).send(`Error fetching response summary: ${err.message}`);
    }
  })
);

// Endpoint to return aggregated responses by category
resultsRouter.get(
  "/category/:id",
  expressAsyncHandler(async (req, res) => {
    const surveyId = req.params.id;

    const summary = await aggregateResponsesByCategory(surveyId);
    // await saveAggregatedSurvey(summary);
    // getAggregatedSurvey = await AggregatedSurvey.findOne({ surveyId });
    res.send(summary);
  })
);

export const aggregateResponsesByCategory2 = (responses, surveyDetails) => {
  // Create a map of question details by ID
  const questionMap = {};
  surveyDetails.pages.forEach((page) => {
    page.questions.forEach((question) => {
      questionMap[question.id] = {
        text: question.headings[0].heading,
        type: question.family,
        category: question.category,
        choices: {},
      };
      // Map choice ID to text for each question's choices
      if (question.answers && question.answers.choices) {
        question.answers.choices.forEach((choice) => {
          questionMap[question.id].choices[choice.id] = choice.text;
        });
      }
    });
  });

  // Initialize the result structure
  const aggregatedResults = {
    surveyId: surveyDetails.id,
    categories: [],
  };

  // Category map for grouping questions by category
  const categoryMap = {};

  // Iterate over each response and categorize answers by question
  responses.forEach((response) => {
    response.pages.forEach((page) => {
      page.questions.forEach((question) => {
        const questionData = questionMap[question.id];
        if (!questionData) return;

        // Initialize category in the category map if not present
        if (!categoryMap[questionData.category]) {
          categoryMap[questionData.category] = { questions: [] };
        }

        // Find or initialize the question entry in the category
        let questionEntry = categoryMap[questionData.category].questions.find(
          (q) => q.question === questionData.text
        );
        if (!questionEntry) {
          questionEntry = {
            question: questionData.text,
            type: questionData.type,
            responses: {},
          };
          categoryMap[questionData.category].questions.push(questionEntry);
        }

        // Aggregate responses by choice
        question.answers.forEach((answer) => {
          const choiceText = questionData.choices[answer.choice_id] || answer.text || "No answer";
          if (!questionEntry.responses[choiceText]) {
            questionEntry.responses[choiceText] = 0;
          }
          questionEntry.responses[choiceText] += 1;
        });
      });
    });
  });

  // Format results to include categories and questions
  for (const [category, data] of Object.entries(categoryMap)) {
    aggregatedResults.categories.push({
      [category]: data,
    });
  }

  return aggregatedResults;
};
