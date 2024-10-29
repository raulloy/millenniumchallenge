export const aggregateResponsesByCategory = (responses, surveyDetails) => {
  // Create a map of question details by ID
  const questionMap = {};
  surveyDetails.pages.forEach((page) => {
    page.questions.forEach((question) => {
      questionMap[question.id] = {
        text: question.headings[0].heading,
        type: question.family,
        category: question.category || "Sin categoría",
        choices: {},
        hasRows: question.answers && question.answers.rows && question.answers.rows.length > 0,
      };
      // Map choice ID to text for each question's choices
      if (question.answers && question.answers.choices) {
        question.answers.choices.forEach((choice) => {
          questionMap[question.id].choices[choice.id] = choice.text;
        });
      }
      // Map row ID to text for each question's rows (for matrix questions)
      if (question.answers && question.answers.rows) {
        questionMap[question.id].rows = {};
        question.answers.rows.forEach((row) => {
          questionMap[question.id].rows[row.id] = row.text;
        });
      }
    });
  });

  // Initialize the result structure
  const aggregatedResults = {
    surveyId: surveyDetails.id,
    title: surveyDetails.title,
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
          categoryMap[questionData.category] = { name: questionData.category, questions: [] };
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

        // Ensure questionEntry.responses is an object before using it
        if (typeof questionEntry.responses !== "object" || questionEntry.responses === null) {
          questionEntry.responses = {};
        }

        // Handle matrix questions: Aggregate as general if rows are empty or not meaningful
        question.answers.forEach((answer) => {
          if (
            questionData.type === "matrix" &&
            questionData.hasRows &&
            questionData.rows[answer.row_id]
          ) {
            const rowText = questionData.rows[answer.row_id]?.toString() || "";
            if (!rowText || rowText === "") {
              // Treat as general if row text is empty
              const choiceText =
                questionData.choices[answer.choice_id]?.toString() || answer.text || "No answer";
              // Ensure responses[choiceText] is a number (default to 0 if not)
              if (typeof questionEntry.responses[choiceText] !== "number") {
                questionEntry.responses[choiceText] = 0;
              }
              questionEntry.responses[choiceText] += 1;
            } else {
              // Row-specific aggregation if meaningful row text exists
              if (typeof questionEntry.responses[rowText] !== "object") {
                questionEntry.responses[rowText] = {};
              }
              const choiceText =
                questionData.choices[answer.choice_id] || answer.text || "No answer";
              // Ensure responses[rowText][choiceText] is a number
              if (typeof questionEntry.responses[rowText][choiceText] !== "number") {
                questionEntry.responses[rowText][choiceText] = 0;
              }
              questionEntry.responses[rowText][choiceText] += 1;
            }
          } else {
            // General aggregation for non-matrix or matrix without meaningful rows
            const choiceText = questionData.choices[answer.choice_id] || "Otros";
            // Ensure responses[choiceText] is a number
            if (typeof questionEntry.responses[choiceText] !== "number") {
              questionEntry.responses[choiceText] = 0;
            }
            questionEntry.responses[choiceText] += 1;
          }
        });
      });
    });
  });

  // Format results to include categories and questions
  for (const [category, data] of Object.entries(categoryMap)) {
    aggregatedResults.categories.push({
      name: category,
      questions: data.questions,
    });
  }

  return aggregatedResults;
};

// export const aggregateResponsesByCategory = (responses, surveyDetails) => {
//   // Create a map of question details by ID
//   const questionMap = {};
//   surveyDetails.pages.forEach((page) => {
//     page.questions.forEach((question) => {
//       questionMap[question.id] = {
//         text: question.headings[0].heading,
//         type: question.family,
//         category: question.category || "Sin categoría",
//         choices: {},
//         hasRows: question.answers && question.answers.rows && question.answers.rows.length > 0,
//       };
//       // Map choice ID to text for each question's choices
//       if (question.answers && question.answers.choices) {
//         question.answers.choices.forEach((choice) => {
//           questionMap[question.id].choices[choice.id] = choice.text;
//         });
//       }
//       // Map row ID to text for each question's rows (for matrix questions)
//       if (question.answers && question.answers.rows) {
//         questionMap[question.id].rows = {};
//         question.answers.rows.forEach((row) => {
//           questionMap[question.id].rows[row.id] = row.text;
//         });
//       }
//     });
//   });

//   // Initialize the result structure
//   const aggregatedResults = {
//     surveyId: surveyDetails.id,
//     categories: [],
//   };

//   // Category map for grouping questions by category
//   const categoryMap = {};

//   // Iterate over each response and categorize answers by question
//   responses.forEach((response) => {
//     response.pages.forEach((page) => {
//       page.questions.forEach((question) => {
//         const questionData = questionMap[question.id];
//         if (!questionData) return;

//         // Initialize category in the category map if not present
//         if (!categoryMap[questionData.category]) {
//           categoryMap[questionData.category] = { name: questionData.category, questions: [] };
//         }

//         // Find or initialize the question entry in the category
//         let questionEntry = categoryMap[questionData.category].questions.find(
//           (q) => q.question === questionData.text
//         );
//         if (!questionEntry) {
//           questionEntry = {
//             question: questionData.text,
//             type: questionData.type,
//             responses: {},
//           };
//           categoryMap[questionData.category].questions.push(questionEntry);
//         }

//         // Handle matrix questions: Aggregate as general if rows are empty or not meaningful
//         question.answers.forEach((answer) => {
//           if (
//             questionData.type === "matrix" &&
//             questionData.hasRows &&
//             questionData.rows[answer.row_id]
//           ) {
//             const rowText = questionData.rows[answer.row_id]?.toString() || "";
//             if (!rowText || rowText === "") {
//               // Treat as general if row text is empty
//               const choiceText =
//                 questionData.choices[answer.choice_id]?.toString() || answer.text || "No answer";
//               if (!questionEntry.responses[choiceText]) {
//                 questionEntry.responses[choiceText] = 0;
//               }
//               questionEntry.responses[choiceText] += 1;
//             } else {
//               // Row-specific aggregation if meaningful row text exists
//               if (!questionEntry.responses[rowText]) {
//                 questionEntry.responses[rowText] = {};
//               }
//               const choiceText =
//                 questionData.choices[answer.choice_id] || answer.text || "No answer";
//               if (!questionEntry.responses[rowText][choiceText]) {
//                 questionEntry.responses[rowText][choiceText] = 0;
//               }
//               questionEntry.responses[rowText][choiceText] += 1;
//             }
//           } else {
//             // General aggregation for non-matrix or matrix without meaningful rows
//             const choiceText = questionData.choices[answer.choice_id] || "Otros";
//             if (!questionEntry.responses[choiceText]) {
//               questionEntry.responses[choiceText] = 0;
//             }
//             questionEntry.responses[choiceText] += 1;
//           }
//         });
//       });
//     });
//   });

//   // Format results to include categories and questions
//   for (const [category, data] of Object.entries(categoryMap)) {
//     aggregatedResults.categories.push({
//       name: category,
//       questions: data.questions,
//     });
//   }

//   return aggregatedResults;
// };
