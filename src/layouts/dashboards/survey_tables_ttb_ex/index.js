import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from "@mui/material";

// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import apiURL from "utils";
import { TTB_RULES } from "utils";
import { exceptions } from "utils";
import { TTB_RULES_2 } from "utils";

/* eslint-disable react/prop-types */
const ResultsDisplay = () => {
  const [results, setResults] = useState(null);
  const [categoricalQuestions, setCategoricalQuestions] = useState([]);
  const [filters, setFilters] = useState({});
  const [error, setError] = useState(null);

  const storedId = localStorage.getItem("selectedSurveyId");

  if (!storedId) {
    return <Navigate to="/dashboards/overview" />;
  }

  useEffect(() => {
    const fetchCategoricalQuestions = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/categories/filter-questions/${storedId}`);
        setCategoricalQuestions(response.data.categoricalQuestions || []);
        setError(null);
      } catch (error) {
        console.error("Error fetching categorical questions:", error);
        setError(error.request?.response);
      }
    };

    fetchCategoricalQuestions();
  }, [storedId]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const queryString = new URLSearchParams(filters).toString();
        const response = await axios.get(`${apiURL}/api/results/all/${storedId}?${queryString}`);
        setResults(response.data);
        setError(null);
      } catch (error) {
        console.error("Error fetching results:", error);
        setError(error.request?.response);
      }
    };

    fetchResults();
  }, [storedId, filters]);

  const handleFilterChange = (label, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [label]: value }));
  };

  if (error) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <Typography color="error">{error}</Typography>
      </div>
    );
  }

  if (!results) {
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <Typography>Loading...</Typography>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {results.title}
        </Typography>

        {/* Dynamically render filters */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          {categoricalQuestions.map((question) => (
            <Grid item xs={12} sm={6} md={4} key={question.questionId}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>{question.heading}</InputLabel>
                <Select
                  label={question.heading}
                  name={question.label}
                  onChange={(e) => handleFilterChange(question.label, e.target.value)}
                  value={filters[question.label] || ""}
                  sx={{
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {question.choices.map((choice, idx) => (
                    <MenuItem key={idx} value={choice}>
                      {choice}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          ))}
        </Grid>

        {results.categories
          .filter((cat) => cat.name !== "Sin categoría" && cat.name !== "Datos Demográficos")
          .map((category, idx) => (
            <CategoryAccordion key={idx} category={category} />
          ))}
      </Box>
      <Footer />
    </DashboardLayout>
  );
};

const CategoryAccordion = ({ category }) => {
  const categoryName = category.name;
  const questions = category.questions || [];

  // Calculate average TTB for the category
  const calculateAverageTTB = () => {
    let totalTTB = 0;
    let count = 0;

    questions.forEach((question) => {
      if (question.type === "matrix" && question.responses) {
        if (typeof Object.values(question.responses)[0] === "object") {
          // Handle nested matrix questions
          Object.keys(question.responses).forEach((subQuestion) => {
            const subResponses = question.responses[subQuestion];
            const subRelativeFrequency = question.relative_frequency?.[subQuestion];
            if (subResponses && subRelativeFrequency) {
              const subTTB = calculateTTB(
                "matrix",
                subResponses,
                subRelativeFrequency,
                subQuestion
              );

              if (subTTB !== null) {
                totalTTB += subTTB;
                count++;
              }
            }
          });
        } else if (question.responses && question.relative_frequency) {
          // Handle flat matrix questions
          let ttbValue;
          ttbValue = calculateTTB(
            "single_choice",
            question.responses,
            question.relative_frequency,
            question.question
          );

          if (ttbValue !== null) {
            totalTTB += ttbValue;
            count++;
          }
        }
      }
    });

    return count > 0 ? (totalTTB / count).toFixed(0) : null;
  };

  const averageTTB = calculateAverageTTB();

  return (
    <Accordion sx={{ marginBottom: 2 }}>
      <AccordionSummary
        expandIcon={
          <Icon color="inherit" fontSize="small">
            expand_more
          </Icon>
        }
        sx={{ backgroundColor: "#f0f2f5" }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
          {categoryName}
          {averageTTB !== null && averageTTB !== "0" && (
            <Typography
              variant="body2"
              sx={{
                marginLeft: 2,
                backgroundColor: getTTBColor(averageTTB),
                padding: "4px 8px",
                borderRadius: "4px",
              }}
            >
              Promedio TTB: {averageTTB}%
            </Typography>
          )}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Grid container spacing={3}>
          {questions.length > 0 ? (
            questions.map((question, idx) => (
              <Grid item xs={12} md={6} key={idx}>
                <QuestionCard question={question} />
              </Grid>
            ))
          ) : (
            <Typography variant="body1">No questions available for this category.</Typography>
          )}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

const calculateTTB = (type, responses, relativeFrequency, question, exceptions = {}) => {
  // Obtener reglas según el tipo de pregunta
  const rules = TTB_RULES_2[type] || {};

  // Obtener las reglas específicas para esta pregunta
  const ttbOptions = exceptions[question] || rules[question];

  if (!ttbOptions) {
    console.log("No matching rule found for:", { type, question, responses, relativeFrequency });
    return null; // No hay regla coincidente
  }

  // Calcular la suma de los valores relativos
  const ttbSum = ttbOptions.reduce((sum, option) => {
    const value = parseFloat(relativeFrequency[option] || 0);
    return sum + value;
  }, 0);

  console.log(`TTB Sum for Question: ${question} -> ${Math.round(ttbSum * 100)}`);
  return Math.round(ttbSum * 100); // Convertir a porcentaje
};

// Function to determine the color based on TTB value
const getTTBColor = (ttbValue) => {
  if (ttbValue >= 0 && ttbValue < 70) {
    return "red";
  } else if (ttbValue >= 70 && ttbValue < 80) {
    return "yellow";
  } else if (ttbValue >= 80 && ttbValue <= 90) {
    return "lightgreen";
  } else if (ttbValue > 90 && ttbValue <= 100) {
    return "green";
  }
  return "gray"; // Fallback for invalid or undefined values
};

const QuestionCard = ({ question }) => {
  let ttbValue = null;

  if (question.type === "matrix") {
    if (question.responses && typeof Object.values(question.responses)[0] === "object") {
      // Nested matrix questions with sub-questions
      ttbValue = Object.keys(question.responses).reduce((acc, subQuestion) => {
        const subResponses = question.responses[subQuestion];
        const subRelativeFrequency = question.relative_frequency?.[subQuestion];
        if (subResponses && subRelativeFrequency) {
          const subTTB = calculateTTB("matrix", subResponses, subRelativeFrequency, subQuestion);

          acc[subQuestion] = subTTB;
        } else {
          acc[subQuestion] = "N/A"; // Handle missing data gracefully
        }
        return acc;
      }, {});
    } else if (question.responses && question.relative_frequency) {
      if (question.question === exceptions) {
        ttbValue = calculateTTB("matrix", question.responses, question.relative_frequency, {
          No: ["No"],
        });
      } else {
        ttbValue = calculateTTB(
          "matrix",
          question.responses,
          question.relative_frequency,
          question.question
        );
      }
    }
  } else if (question.responses && question.relative_frequency) {
    // Single-choice or other questions
    ttbValue = calculateTTB("single_choice", question.responses, question.relative_frequency);
  }

  return (
    <>
      {/* <Card variant="outlined"> */}
      {/* <CardContent> */}
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        {question.question}
      </Typography>
      {typeof ttbValue === "object" ? (
        // Render TTB for each sub-question in nested matrix questions
        Object.entries(ttbValue || {}).map(([subQuestion, value]) => (
          <div key={subQuestion} style={{ marginBottom: "16px" }}>
            <TableContainer>
              <Table size="small">
                <TableBody>
                  <ResponseRow
                    response={subQuestion}
                    count={question.responses[subQuestion]}
                    percentage={question.relative_frequency[subQuestion]}
                    ttb={value}
                    isSubQuestion
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        ))
      ) : (
        // Render TTB and response table for flat matrix or single-choice questions
        <TableContainer>
          <Table size="small">
            <TableBody>
              <ResponseRow
                response=""
                count={question.responses}
                percentage={question.relative_frequency}
                ttb={ttbValue}
              />
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {/* </CardContent> */}
      {/* </Card> */}
    </>
  );
};

const ResponseRow = ({ response, count, percentage, ttb, isSubQuestion }) => {
  // Convert the percentage to a whole number
  const roundedPercentage = Math.round(parseFloat(percentage) * 100);

  // Render the rectangle color indicator based on TTB value
  const rectangleStyle = {
    display: "inline-block",
    width: "4rem",
    height: "12px",
    backgroundColor: ttb !== null ? getTTBColor(ttb) : "transparent",
    marginLeft: "8px",
    borderRadius: "2px",
  };

  return (
    <>
      {/* Render grey cell for titles and TTB */}
      <TableRow>
        <TableCell colSpan={3} sx={{ backgroundColor: "#fafafa", fontWeight: "bold" }}>
          {response}
        </TableCell>
      </TableRow>
      {/* Render regular rows for sub-responses or responses */}
      {typeof count === "object" ? (
        ttb !== null ? (
          <TableRow>
            <TableCell align="center">
              TTB {ttb || "N/A"}%<span style={rectangleStyle}></span>
            </TableCell>
          </TableRow>
        ) : (
          Object.entries(count).map(([subResponse, subCount], subIdx) => (
            <TableRow key={subIdx}>
              <TableCell sx={isSubQuestion ? { pl: 4 } : {}}>{subResponse}</TableCell>
              <TableCell align="right">{subCount}</TableCell>
              <TableCell align="right">
                {percentage?.[subResponse]
                  ? `${Math.round(parseFloat(percentage[subResponse]) * 100)}%`
                  : "N/A"}
              </TableCell>
            </TableRow>
          ))
        )
      ) : (
        <TableRow>
          <TableCell>{response}</TableCell>
          <TableCell align="right">{count}</TableCell>
          <TableCell align="right">{roundedPercentage}%</TableCell>
        </TableRow>
      )}
    </>
  );
};

export default ResultsDisplay;

// import React, { useEffect, useState } from "react";
// import { Navigate, useParams } from "react-router-dom";
// import axios from "axios";
// import {
//   Box,
//   Typography,
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Card,
//   CardContent,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableRow,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Grid,
// } from "@mui/material";

// // import Divider from "@mui/material/Divider";
// import Icon from "@mui/material/Icon";

// // Material Dashboard 2 PRO React examples
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import apiURL from "utils";
// import { TTB_RULES } from "utils";
// import { exceptions } from "utils";
// import { TTB_RULES_2 } from "utils";

// /* eslint-disable react/prop-types */
// const ResultsDisplay = () => {
//   const [results, setResults] = useState(null);
//   const [categoricalQuestions, setCategoricalQuestions] = useState([]);
//   const [filters, setFilters] = useState({});
//   const [error, setError] = useState(null);

//   const storedId = localStorage.getItem("selectedSurveyId");

//   if (!storedId) {
//     return <Navigate to="/dashboards/overview" />;
//   }

//   useEffect(() => {
//     const fetchCategoricalQuestions = async () => {
//       try {
//         const response = await axios.get(`${apiURL}/api/categories/filter-questions/${storedId}`);
//         setCategoricalQuestions(response.data.categoricalQuestions || []);
//         setError(null);
//       } catch (error) {
//         console.error("Error fetching categorical questions:", error);
//         setError(error.request?.response);
//       }
//     };

//     fetchCategoricalQuestions();
//   }, [storedId]);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const queryString = new URLSearchParams(filters).toString();
//         const response = await axios.get(`${apiURL}/api/results/all/${storedId}?${queryString}`);
//         setResults(response.data);
//         setError(null);
//       } catch (error) {
//         console.error("Error fetching results:", error);
//         setError(error.request?.response);
//       }
//     };

//     fetchResults();
//   }, [storedId, filters]);

//   const handleFilterChange = (label, value) => {
//     setFilters((prevFilters) => ({ ...prevFilters, [label]: value }));
//   };

//   if (error) {
//     return (
//       <div
//         style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
//       >
//         <Typography color="error">{error}</Typography>
//       </div>
//     );
//   }

//   if (!results) {
//     return (
//       <div
//         style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
//       >
//         <Typography>Loading...</Typography>
//       </div>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Box sx={{ padding: 3 }}>
//         <Typography variant="h4" gutterBottom>
//           {results.title}
//         </Typography>

//         {/* Dynamically render filters */}
//         <Grid container spacing={2} sx={{ mb: 3 }}>
//           {categoricalQuestions.map((question) => (
//             <Grid item xs={12} sm={6} md={4} key={question.questionId}>
//               <FormControl fullWidth variant="outlined">
//                 <InputLabel>{question.heading}</InputLabel>
//                 <Select
//                   label={question.heading}
//                   name={question.label}
//                   onChange={(e) => handleFilterChange(question.label, e.target.value)}
//                   value={filters[question.label] || ""}
//                   sx={{
//                     height: 40,
//                     display: "flex",
//                     alignItems: "center",
//                   }}
//                 >
//                   <MenuItem value="">
//                     <em>None</em>
//                   </MenuItem>
//                   {question.choices.map((choice, idx) => (
//                     <MenuItem key={idx} value={choice}>
//                       {choice}
//                     </MenuItem>
//                   ))}
//                 </Select>
//               </FormControl>
//             </Grid>
//           ))}
//         </Grid>

//         {results.categories
//           .filter((cat) => cat.name !== "Sin categoría" && cat.name !== "Datos Demográficos")
//           .map((category, idx) => (
//             <CategoryAccordion key={idx} category={category} />
//           ))}
//       </Box>
//       <Footer />
//     </DashboardLayout>
//   );
// };

// const CategoryAccordion = ({ category }) => {
//   const categoryName = category.name;
//   const questions = category.questions || [];

//   // Calculate average TTB for the category
//   const calculateAverageTTB = () => {
//     let totalTTB = 0;
//     let count = 0;

//     questions.forEach((question) => {
//       if (question.type === "matrix" && question.responses) {
//         if (typeof Object.values(question.responses)[0] === "object") {
//           // Handle nested matrix questions
//           Object.keys(question.responses).forEach((subQuestion) => {
//             const subResponses = question.responses[subQuestion];
//             const subRelativeFrequency = question.relative_frequency?.[subQuestion];
//             if (subResponses && subRelativeFrequency) {
//               const subTTB = calculateTTB(
//                 "matrix",
//                 subResponses,
//                 subRelativeFrequency,
//                 subQuestion
//               );
//               if (subTTB !== null) {
//                 totalTTB += subTTB;
//                 count++;
//               }
//             }
//           });
//         } else if (question.responses && question.relative_frequency) {
//           // Handle flat matrix questions
//           let ttbValue;
//           if (question.question === exceptions) {
//             ttbValue = calculateTTB(
//               "single_choice",
//               question.responses,
//               question.relative_frequency,
//               question.question
//             );
//           } else {
//             ttbValue = calculateTTB(
//               "single_choice",
//               question.responses,
//               question.relative_frequency,
//               question.question
//             );
//           }

//           if (ttbValue !== null) {
//             totalTTB += ttbValue;
//             count++;
//           }
//         }
//       }
//     });

//     return count > 0 ? (totalTTB / count).toFixed(0) : null;
//   };

//   const averageTTB = calculateAverageTTB();

//   return (
//     <Accordion sx={{ marginBottom: 2 }}>
//       <AccordionSummary
//         expandIcon={
//           <Icon color="inherit" fontSize="small">
//             expand_more
//           </Icon>
//         }
//         sx={{ backgroundColor: "#f0f2f5" }}
//       >
//         <Typography variant="h6" fontWeight="bold" sx={{ display: "flex", alignItems: "center" }}>
//           {categoryName}
//           {averageTTB !== null && averageTTB !== "0" && (
//             <Typography
//               variant="body2"
//               sx={{
//                 marginLeft: 2,
//                 backgroundColor: getTTBColor(averageTTB),
//                 padding: "4px 8px",
//                 borderRadius: "4px",
//               }}
//             >
//               Promedio TTB: {averageTTB}%
//             </Typography>
//           )}
//         </Typography>
//       </AccordionSummary>
//       <AccordionDetails>
//         <Grid container spacing={3}>
//           {questions.length > 0 ? (
//             questions.map((question, idx) => (
//               <Grid item xs={12} md={6} key={idx}>
//                 <QuestionCard question={question} />
//               </Grid>
//             ))
//           ) : (
//             <Typography variant="body1">No questions available for this category.</Typography>
//           )}
//         </Grid>
//       </AccordionDetails>
//     </Accordion>
//   );
// };

// const calculateTTB = (type, responses, relativeFrequency, question, exceptions = {}) => {
//   // Obtener reglas según el tipo de pregunta
//   const rules = TTB_RULES_2[type] || {};

//   // Obtener las reglas específicas para esta pregunta
//   const ttbOptions = exceptions[question] || rules[question];

//   if (!ttbOptions) {
//     console.log("No matching rule found for:", { type, question, responses, relativeFrequency });
//     return null; // No hay regla coincidente
//   }

//   // Calcular la suma de los valores relativos
//   const ttbSum = ttbOptions.reduce((sum, option) => {
//     const value = parseFloat(relativeFrequency[option] || 0);
//     return sum + value;
//   }, 0);

//   console.log(`TTB Sum for Question: ${question} -> ${Math.round(ttbSum * 100)}`);
//   return Math.round(ttbSum * 100); // Convertir a porcentaje
// };

// // Function to determine the color based on TTB value
// const getTTBColor = (ttbValue) => {
//   if (ttbValue >= 0 && ttbValue < 70) {
//     return "red";
//   } else if (ttbValue >= 70 && ttbValue < 80) {
//     return "yellow";
//   } else if (ttbValue >= 80 && ttbValue <= 90) {
//     return "lightgreen";
//   } else if (ttbValue > 90 && ttbValue <= 100) {
//     return "green";
//   }
//   return "gray"; // Fallback for invalid or undefined values
// };

// const QuestionCard = ({ question }) => {
//   let ttbValue = null;

//   if (question.type === "matrix") {
//     if (question.responses && typeof Object.values(question.responses)[0] === "object") {
//       // Nested matrix questions with sub-questions
//       ttbValue = Object.keys(question.responses).reduce((acc, subQuestion) => {
//         const subResponses = question.responses[subQuestion];
//         const subRelativeFrequency = question.relative_frequency?.[subQuestion];
//         if (subResponses && subRelativeFrequency) {
//           const subTTB = calculateTTB("matrix", subResponses, subRelativeFrequency, subQuestion);
//           acc[subQuestion] = subTTB;
//         } else {
//           acc[subQuestion] = "N/A"; // Handle missing data gracefully
//         }
//         return acc;
//       }, {});
//     } else if (question.responses && question.relative_frequency) {
//       if (question.question === exceptions) {
//         ttbValue = calculateTTB("matrix", question.responses, question.relative_frequency, {
//           No: ["No"],
//         });
//       } else {
//         ttbValue = calculateTTB(
//           "matrix",
//           question.responses,
//           question.relative_frequency,
//           question.question
//         );
//       }
//     }
//   } else if (question.responses && question.relative_frequency) {
//     // Single-choice or other questions
//     ttbValue = calculateTTB("single_choice", question.responses, question.relative_frequency);
//   }

//   return (
//     <>
//       {/* <Card variant="outlined"> */}
//       {/* <CardContent> */}
//       <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
//         {question.question}
//       </Typography>
//       {typeof ttbValue === "object" ? (
//         // Render TTB for each sub-question in nested matrix questions
//         Object.entries(ttbValue || {}).map(([subQuestion, value]) => (
//           <div key={subQuestion} style={{ marginBottom: "16px" }}>
//             <TableContainer>
//               <Table size="small">
//                 <TableBody>
//                   <ResponseRow
//                     response={subQuestion}
//                     count={question.responses[subQuestion]}
//                     percentage={question.relative_frequency[subQuestion]}
//                     ttb={value}
//                     isSubQuestion
//                   />
//                 </TableBody>
//               </Table>
//             </TableContainer>
//           </div>
//         ))
//       ) : (
//         // Render TTB and response table for flat matrix or single-choice questions
//         <TableContainer>
//           <Table size="small">
//             <TableBody>
//               <ResponseRow
//                 response=""
//                 count={question.responses}
//                 percentage={question.relative_frequency}
//                 ttb={ttbValue}
//               />
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//       {/* </CardContent> */}
//       {/* </Card> */}
//     </>
//   );
// };

// const ResponseRow = ({ response, count, percentage, ttb, isSubQuestion }) => {
//   // Convert the percentage to a whole number
//   const roundedPercentage = Math.round(parseFloat(percentage) * 100);

//   // Render the rectangle color indicator based on TTB value
//   const rectangleStyle = {
//     display: "inline-block",
//     width: "4rem",
//     height: "12px",
//     backgroundColor: ttb !== null ? getTTBColor(ttb) : "transparent",
//     marginLeft: "8px",
//     borderRadius: "2px",
//   };

//   return (
//     <>
//       {/* Render grey cell for titles and TTB */}
//       <TableRow>
//         <TableCell colSpan={3} sx={{ backgroundColor: "#fafafa", fontWeight: "bold" }}>
//           {response}
//         </TableCell>
//       </TableRow>
//       {/* Render regular rows for sub-responses or responses */}
//       {typeof count === "object" ? (
//         ttb !== null ? (
//           <TableRow>
//             <TableCell align="center">
//               TTB {ttb || "N/A"}%<span style={rectangleStyle}></span>
//             </TableCell>
//           </TableRow>
//         ) : (
//           Object.entries(count).map(([subResponse, subCount], subIdx) => (
//             <TableRow key={subIdx}>
//               <TableCell sx={isSubQuestion ? { pl: 4 } : {}}>{subResponse}</TableCell>
//               <TableCell align="right">{subCount}</TableCell>
//               <TableCell align="right">
//                 {percentage?.[subResponse]
//                   ? `${Math.round(parseFloat(percentage[subResponse]) * 100)}%`
//                   : "N/A"}
//               </TableCell>
//             </TableRow>
//           ))
//         )
//       ) : (
//         <TableRow>
//           <TableCell>{response}</TableCell>
//           <TableCell align="right">{count}</TableCell>
//           <TableCell align="right">{roundedPercentage}%</TableCell>
//         </TableRow>
//       )}
//     </>
//   );
// };

// export default ResultsDisplay;
