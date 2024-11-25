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

        {results.categories.map((category, idx) => (
          <CategoryAccordion key={idx} category={category} />
        ))}
      </Box>
      <Footer />
    </DashboardLayout>
  );
};

const CategoryAccordion = ({ category }) => {
  // Each category now has a `name` and `questions` array directly within it
  const categoryName = category.name;
  const questions = category.questions || []; // Default to empty array if `questions` is undefined

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
        <Typography variant="h6" fontWeight="bold">
          {categoryName}
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

const TTB_RULES = {
  single_choice: {
    "De acuerdo": ["De acuerdo", "Muy de acuerdo"],
    Bueno: ["Bueno", "Excelente"],
    "Nunca se ha dado": ["Nunca se ha dado", "Casi nunca se da"],
    "Algo comprometida": ["Algo comprometida", "Totalmente comprometida"],
    "Sí, siempre lo hace": ["Sí, siempre lo hace", "Sí, aunque pocas veces lo hace"],
    Frecuentemente: ["Frecuentemente", "Siempre"],
    "Totalmente de acuerdo": ["Totalmente de acuerdo", "De acuerdo"],
    No: ["Si"], // Example of simple rule
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

const calculateTTB = (type, responses, relativeFrequency) => {
  // Determine TTB options based on the type and rules
  const rules = TTB_RULES[type] || {};
  const keys = Object.keys(responses);

  for (const key of keys) {
    const ttbOptions = rules[key] || rules.default;

    // Log to check rule application
    // if (subQuestion === "Internet") {
    //   console.log("Debugging:", {
    //     subQuestion,
    //     key,
    //     ttbOptions,
    //     relativeFrequency,
    //     defaultApplied: !rules[key],
    //   });
    // }

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
          const subTTB = calculateTTB("matrix", subResponses, subRelativeFrequency);
          acc[subQuestion] = subTTB;
        } else {
          acc[subQuestion] = "N/A"; // Handle missing data gracefully
        }
        return acc;
      }, {});
      // console.log("TTB Values for matrix question:", ttbValue);
    } else if (question.responses && question.relative_frequency) {
      // Flat matrix question (single question with direct responses)
      ttbValue = calculateTTB("matrix", question.responses, question.relative_frequency);
    }
  } else if (question.responses && question.relative_frequency) {
    // Single-choice or other questions
    ttbValue = calculateTTB("single_choice", question.responses, question.relative_frequency);
  }

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
          {question.question}
        </Typography>
        {ttbValue && typeof ttbValue === "object" ? (
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
      </CardContent>
    </Card>
  );
};

const ResponseRow = ({ response, count, percentage, ttb, isSubQuestion }) => {
  // Convert the percentage to a whole number
  const roundedPercentage = Math.round(parseFloat(percentage) * 100);

  // Render the rectangle color indicator based on TTB value
  const rectangleStyle = {
    display: "inline-block",
    width: "2rem",
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
          {response === "" ? "" : response + " | "}{" "}
          {ttb !== null ? (
            <>
              TTB {ttb || "N/A"}%<span style={rectangleStyle}></span>
            </>
          ) : (
            ""
          )}
        </TableCell>
      </TableRow>
      {/* Render regular rows for sub-responses or responses */}
      {typeof count === "object" ? (
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
