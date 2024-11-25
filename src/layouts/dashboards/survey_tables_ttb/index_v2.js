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
    Mucho: ["Mucho"], // Example of simple rule
  },
  matrix: {
    default: ["De acuerdo", "Muy de acuerdo"], // Fallback for unknown matrix types
    "De acuerdo": ["De acuerdo", "Muy de acuerdo"], // Specific match for this case
    Bueno: ["Bueno", "Excelente"],
    "Nunca se ha dado": ["Nunca se ha dado", "Casi nunca se da"],
    "Algo comprometida": ["Algo comprometida", "Totalmente comprometida"],
    "Sí, siempre lo hace": ["Sí, siempre lo hace", "Sí, aunque pocas veces lo hace"],
    Frecuentemente: ["Frecuentemente", "Siempre"],
    "Totalmente de acuerdo": ["Totalmente de acuerdo", "De acuerdo"],
  },
};

const calculateTTB = (type, responses, relativeFrequency) => {
  // Determine TTB options based on the type and rules
  const rules = TTB_RULES[type] || {};
  const keys = Object.keys(responses);

  for (const key of keys) {
    const ttbOptions = rules[key] || rules.default;
    if (ttbOptions) {
      const ttbSum = ttbOptions.reduce(
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
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: "bold",
                  color: getTTBColor(value),
                }}
              >
                {subQuestion}: TTB {value !== "N/A" ? `${value}%` : "N/A"}
              </Typography>
              {question.responses[subQuestion] && (
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      {Object.entries(question.responses[subQuestion] || {}).map(
                        ([response, count], idx) => (
                          <TableRow key={idx}>
                            <TableCell>{response}</TableCell>
                            <TableCell align="right">{count}</TableCell>
                            <TableCell align="right">
                              {Math.round(
                                parseFloat(
                                  question.relative_frequency?.[subQuestion]?.[response] || 0
                                ) * 100
                              )}
                              %
                            </TableCell>
                          </TableRow>
                        )
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </div>
          ))
        ) : (
          // Render TTB and response table for flat matrix or single-choice questions
          <>
            <Typography
              variant="body2"
              sx={{
                marginBottom: 2,
                color: getTTBColor(ttbValue),
                fontWeight: "bold",
              }}
            >
              TTB: {ttbValue || "N/A"}%
            </Typography>
            {question.responses && (
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    {Object.entries(question.responses || {}).map(([response, count], idx) => (
                      <TableRow key={idx}>
                        <TableCell>{response}</TableCell>
                        <TableCell align="right">{count}</TableCell>
                        <TableCell align="right">
                          {Math.round(
                            parseFloat(question.relative_frequency?.[response] || 0) * 100
                          )}
                          %
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

const ResponseRow = ({ response, count, percentage }) => {
  // Convert the percentage to a whole number
  const roundedPercentage = Math.round(parseFloat(percentage) * 100);

  return typeof count === "object" ? (
    <>
      <TableRow>
        <TableCell colSpan={3} sx={{ backgroundColor: "#fafafa", fontWeight: "bold" }}>
          {response}
        </TableCell>
      </TableRow>
      {Object.entries(count).map(([subResponse, subCount], subIdx) => (
        <TableRow key={subIdx}>
          <TableCell sx={{ pl: 4 }}>{subResponse}</TableCell>
          <TableCell align="right">{subCount}</TableCell>
          <TableCell align="right">
            {percentage?.[subResponse]
              ? `${Math.round(parseFloat(percentage[subResponse]) * 100)}%`
              : "N/A"}
          </TableCell>
        </TableRow>
      ))}
    </>
  ) : (
    <TableRow>
      <TableCell>{response}</TableCell>
      <TableCell align="right">{count}</TableCell>
      <TableCell align="right">{roundedPercentage}%</TableCell>
    </TableRow>
  );
};

export default ResultsDisplay;
