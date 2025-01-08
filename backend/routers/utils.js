import SurveyResponses from "../models/surveyResponses.js";

export const aggregateResponsesByCategory = (responses, surveyDetails) => {
  const questionMap = {};
  surveyDetails.pages.forEach((page) => {
    page.questions.forEach((question) => {
      questionMap[question.id] = {
        text: question.headings[0].heading,
        type: question.family,
        category: question.category || "Sin categoría",
        choices: {},
        rows: {},
        hasRows: question.answers && question.answers.rows && question.answers.rows.length > 0,
      };
      if (question.answers?.choices) {
        question.answers.choices.forEach((choice) => {
          questionMap[question.id].choices[choice.id] = choice.text.trim();
        });
      }
      if (question.answers?.rows) {
        question.answers.rows.forEach((row) => {
          questionMap[question.id].rows[row.id] = row.text.trim();
        });
      }
    });
  });

  const aggregatedResults = {
    surveyId: surveyDetails.id,
    title: surveyDetails.title,
    categories: [],
  };

  const categoryMap = {};

  responses.forEach((response) => {
    response.pages.forEach((page) => {
      page.questions.forEach((question) => {
        const questionData = questionMap[question.id];
        if (!questionData) return;

        if (!categoryMap[questionData.category]) {
          categoryMap[questionData.category] = { name: questionData.category, questions: [] };
        }

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

        question.answers.forEach((answer) => {
          if (
            questionData.type === "matrix" &&
            questionData.hasRows &&
            questionData.rows[answer.row_id]
          ) {
            const rowText = questionData.rows[answer.row_id].trim();
            const choiceText = questionData.choices[answer.choice_id]?.trim() || answer.text.trim();
            if (!rowText) {
              questionEntry.responses[choiceText] = (questionEntry.responses[choiceText] || 0) + 1;
            } else {
              if (!questionEntry.responses[rowText]) questionEntry.responses[rowText] = {};
              questionEntry.responses[rowText][choiceText] =
                (questionEntry.responses[rowText][choiceText] || 0) + 1;
            }
          } else {
            const choiceText = questionData.choices[answer.choice_id]?.trim() || "Otros";
            questionEntry.responses[choiceText] = (questionEntry.responses[choiceText] || 0) + 1;
          }
        });

        // Remove "Otros" from responses
        if (questionEntry.responses["Otros"]) {
          delete questionEntry.responses["Otros"];
        }

        // Trim keys in responses
        questionEntry.responses = Object.fromEntries(
          Object.entries(questionEntry.responses).map(([key, value]) => {
            if (typeof value === "object") {
              return [
                key.trim(),
                Object.fromEntries(Object.entries(value).map(([k, v]) => [k.trim(), v])),
              ];
            }
            return [key.trim(), value];
          })
        );

        // Calculate relative frequencies
        if (questionData.category !== "Sin categoría") {
          const totalResponses = Object.values(questionEntry.responses).reduce((acc, val) => {
            if (typeof val === "number") return acc + val;
            if (typeof val === "object") return acc + Object.values(val).reduce((a, b) => a + b, 0);
            return acc;
          }, 0);

          if (totalResponses > 0) {
            questionEntry.relative_frequency = Object.fromEntries(
              Object.entries(questionEntry.responses).map(([key, value]) => {
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
        }
      });
    });
  });

  for (const [category, data] of Object.entries(categoryMap)) {
    aggregatedResults.categories.push({
      name: category,
      questions: data.questions,
    });
  }

  return aggregatedResults;
};

export const saveDynamicTableToDB = async (surveyId, groupedResults) => {
  try {
    const existingEntry = await SurveyResponses.findOne({ surveyId });
    if (existingEntry) {
      // Update the existing document
      existingEntry.groupedResults = groupedResults;
      await existingEntry.save();
      return existingEntry;
    } else {
      // Create a new document
      const newEntry = new SurveyResponses({ surveyId, groupedResults });
      await newEntry.save();
      return newEntry;
    }
  } catch (error) {
    console.error("Error saving dynamic table results to DB:", error);
    throw new Error("Failed to save dynamic table results to the database.");
  }
};

const calculateTTB = (type, responses, relativeFrequency, exceptions = {}) => {
  // Determine TTB options based on the type and rules
  const rules = TTB_RULES[type] || {};
  const keys = Object.keys(responses);

  for (const key of keys) {
    // Check if there is an exception for this specific question
    const ttbOptions = exceptions[key] || rules[key] || rules.default;

    if (ttbOptions) {
      const ttbSum = ttbOptions?.reduce(
        (sum, option) => sum + parseFloat(relativeFrequency[option] || 0),
        0
      );
      return Math.round(ttbSum * 100); // Convert to percentage
    }
  }

  return null; // No matching rule
};

export const TTB_RULES = {
  single_choice: {
    default: ["De acuerdo", "Muy de acuerdo"], // Fallback for unknown matrix types
    "De acuerdo": ["De acuerdo", "Muy de acuerdo"],
    Bueno: ["Bueno", "Excelente"],
    Regular: ["Bueno", "Excelente"],
    "Nunca se ha dado": ["Nunca se ha dado", "Casi nunca se da"],
    "Algo comprometida": ["Algo comprometida", "Totalmente comprometida"],
    "Sí, siempre lo hace": ["Sí, siempre lo hace", "Sí, aunque pocas veces lo hace"],
    Frecuentemente: ["Frecuentemente", "Siempre"],
    Satisfecho: ["Totalmente satisfecho", "Satisfecho"],
    Insatisfecho: ["Totalmente satisfecho", "Satisfecho"],
    "Totalmente de acuerdo": ["Totalmente de acuerdo", "De acuerdo"],
    No: ["Si"],
    Si: ["Si"],
    Mucho: ["Mucho"],
    "No se han aplicado sanciones disciplinarias": ["Apropiadas", "Algo apropiadas"],
    "Algo fácil": ["Muy fácil", "Algo fácil"],
    Nunca: ["Nunca", "Pocas veces"],
    Moderada: ["Suficiente", "Moderada"],
    Buenas: ["Excelentes", "Buenas"],
    "Algo Probable": ["Algo Probable", "Muy Probable"],
    "Bastante probable": ["Bastante probable", "Algo probable"],
    "Nada probable": ["Nada probable", "Poco probable"],
    "Muy motivado(a)": ["Muy motivado(a)", "Moderadamente motivado(a)"],
    "Son buenos": ["Son excelentes", "Son buenos"],
  },
  matrix: {
    default: ["De acuerdo", "Muy de acuerdo"], // Fallback for unknown matrix types
    "De acuerdo": ["De acuerdo", "Muy de acuerdo"],
    Bueno: ["Bueno", "Excelente"],
    Regular: ["Bueno", "Excelente"],
    "Nunca se ha dado": ["Nunca se ha dado", "Casi nunca se da"],
    "Algo comprometida": ["Algo comprometida", "Totalmente comprometida"],
    "Sí, siempre lo hace": ["Sí, siempre lo hace", "Sí, aunque pocas veces lo hace"],
    Frecuentemente: ["Frecuentemente", "Siempre"],
    Satisfecho: ["Totalmente satisfecho", "Satisfecho"],
    Insatisfecho: ["Totalmente satisfecho", "Satisfecho"],
    "Totalmente de acuerdo": ["Totalmente de acuerdo", "De acuerdo"],
    No: ["Si"],
    Si: ["Si"],
    Mucho: ["Mucho"],
    "No se han aplicado sanciones disciplinarias": ["Apropiadas", "Algo apropiadas"],
    "Algo fácil": ["Muy fácil", "Algo fácil"],
    Nunca: ["Nunca", "Pocas veces"],
    Moderada: ["Suficiente", "Moderada"],
    Buenas: ["Excelentes", "Buenas"],
    "Algo Probable": ["Algo Probable", "Muy Probable"],
    "Bastante probable": ["Bastante probable", "Algo probable"],
    "Nada probable": ["Nada probable", "Poco probable"],
    "Muy motivado(a)": ["Muy motivado(a)", "Moderadamente motivado(a)"],
    "Son buenos": ["Son excelentes", "Son buenos"],
  },
};

export const exceptions =
  "¿Has observado algún tema antiético o de corrupción por parte de algún miembro de esta empresa?";

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
