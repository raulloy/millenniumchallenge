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

const QuestionCard = ({ question }) => (
  <Card variant="outlined">
    <CardContent>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", marginBottom: 2 }}>
        {question.question}
      </Typography>
      <TableContainer>
        <Table size="small">
          <TableBody>
            {Object.entries(question.responses).map(([response, count], idx) => (
              <React.Fragment key={idx}>
                <ResponseRow response={response} count={count} />
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </CardContent>
  </Card>
);

const ResponseRow = ({ response, count }) => {
  // Check if the response is a nested object (matrix-type question)
  return typeof count === "object" ? (
    <>
      <TableRow>
        <TableCell colSpan={2} sx={{ backgroundColor: "#fafafa", fontWeight: "bold" }}>
          {response}
        </TableCell>
      </TableRow>
      {Object.entries(count).map(([subResponse, subCount], subIdx) => (
        <TableRow key={subIdx}>
          <TableCell sx={{ pl: 4 }}>{subResponse}</TableCell>
          <TableCell align="right">{subCount}</TableCell>
        </TableRow>
      ))}
    </>
  ) : (
    <TableRow>
      <TableCell>{response}</TableCell>
      <TableCell align="right">{count}</TableCell>
    </TableRow>
  );
};

export default ResultsDisplay;