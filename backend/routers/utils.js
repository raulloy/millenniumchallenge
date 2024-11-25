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
//     title: surveyDetails.title,
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
//             relative_frequency: {},
//           };
//           categoryMap[questionData.category].questions.push(questionEntry);
//         }

//         // Ensure questionEntry.responses is an object before using it
//         if (typeof questionEntry.responses !== "object" || questionEntry.responses === null) {
//           questionEntry.responses = {};
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
//               questionEntry.responses[choiceText] = (questionEntry.responses[choiceText] || 0) + 1;
//             } else {
//               // Row-specific aggregation if meaningful row text exists
//               if (typeof questionEntry.responses[rowText] !== "object") {
//                 questionEntry.responses[rowText] = {};
//               }
//               const choiceText =
//                 questionData.choices[answer.choice_id] || answer.text || "No answer";
//               questionEntry.responses[rowText][choiceText] =
//                 (questionEntry.responses[rowText][choiceText] || 0) + 1;
//             }
//           } else {
//             // General aggregation for non-matrix or matrix without meaningful rows
//             const choiceText = questionData.choices[answer.choice_id] || "Otros";
//             questionEntry.responses[choiceText] = (questionEntry.responses[choiceText] || 0) + 1;
//           }
//         });

//         // Calculate relative frequencies for the question
//         const totalResponses = Object.values(questionEntry.responses).reduce((acc, val) => {
//           if (typeof val === "number") return acc + val;
//           if (typeof val === "object") return acc + Object.values(val).reduce((a, b) => a + b, 0);
//           return acc;
//         }, 0);

//         if (totalResponses > 0) {
//           questionEntry.relative_frequency = Object.fromEntries(
//             Object.entries(questionEntry.responses).map(([key, value]) => {
//               if (typeof value === "number") {
//                 return [key, `${((value / totalResponses) * 100).toFixed(2)}%`];
//               } else if (typeof value === "object") {
//                 const rowTotalResponses = Object.values(value).reduce((a, b) => a + b, 0);
//                 return [
//                   key,
//                   Object.fromEntries(
//                     Object.entries(value).map(([subKey, subValue]) => [
//                       subKey,
//                       `${((subValue / rowTotalResponses) * 100).toFixed(2)}%`,
//                     ])
//                   ),
//                 ];
//               }
//               return [key, "0.00%"];
//             })
//           );
//         }
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

// decimal values
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
            relative_frequency: {},
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
              questionEntry.responses[choiceText] = (questionEntry.responses[choiceText] || 0) + 1;
            } else {
              // Row-specific aggregation if meaningful row text exists
              if (typeof questionEntry.responses[rowText] !== "object") {
                questionEntry.responses[rowText] = {};
              }
              const choiceText =
                questionData.choices[answer.choice_id] || answer.text || "No answer";
              questionEntry.responses[rowText][choiceText] =
                (questionEntry.responses[rowText][choiceText] || 0) + 1;
            }
          } else {
            // General aggregation for non-matrix or matrix without meaningful rows
            const choiceText = questionData.choices[answer.choice_id] || "Otros";
            questionEntry.responses[choiceText] = (questionEntry.responses[choiceText] || 0) + 1;
          }
        });

        // Remove "Otros" from responses before calculating relative frequencies
        const filteredResponses = Object.fromEntries(
          Object.entries(questionEntry.responses).filter(([key]) => key !== "Otros")
        );

        // Calculate relative frequencies for the question
        const totalResponses = Object.values(filteredResponses).reduce((acc, val) => {
          if (typeof val === "number") return acc + val;
          if (typeof val === "object") return acc + Object.values(val).reduce((a, b) => a + b, 0);
          return acc;
        }, 0);

        if (totalResponses > 0) {
          questionEntry.relative_frequency = Object.fromEntries(
            Object.entries(filteredResponses).map(([key, value]) => {
              if (typeof value === "number") {
                return [key, (value / totalResponses).toFixed(4)];
              } else if (typeof value === "object") {
                const rowTotalResponses = Object.values(value).reduce((a, b) => a + b, 0);
                return [
                  key,
                  Object.fromEntries(
                    Object.entries(value).map(([subKey, subValue]) => [
                      subKey,
                      (subValue / rowTotalResponses).toFixed(4),
                    ])
                  ),
                ];
              }
              return [key, 0];
            })
          );
        }
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
