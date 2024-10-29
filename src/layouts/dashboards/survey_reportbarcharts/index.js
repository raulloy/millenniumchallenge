import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";

// import Divider from "@mui/material/Divider";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";

/* eslint-disable react/prop-types */
const ResultsDisplay = () => {
  const { id } = useParams();
  const [results, setResults] = useState(null);

  const storedId = localStorage.getItem("selectedSurveyId");

  if (!storedId) {
    return <Navigate to="/dashboards/overview" />;
  }

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          `https://millenniumchallenge.onrender.com/api/results/all/${storedId}`
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching results:", error);
      }
    };

    fetchResults();
  }, [id]);

  if (!results)
    return (
      <div
        style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}
      >
        <Typography>Loading...</Typography>
      </div>
    );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          {results.title}
        </Typography>
        {results.categories.map((category, idx) => (
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

const QuestionCard = ({ question }) => {
  // Check if the question has nested responses (matrix-type question)
  const isMatrixWithNestedResponses = typeof Object.values(question.responses)[0] === "object";

  if (isMatrixWithNestedResponses) {
    // Render a bar chart for each matrix sub-question
    return (
      <Box>
        <Typography variant="h6">{question.question}</Typography>
        {Object.entries(question.responses).map(([subQuestion, responseCounts], idx) => {
          // Extract labels and data for the sub-question
          const labels = Object.keys(responseCounts);
          const data = Object.values(responseCounts);

          const chartData = {
            labels,
            datasets: { label: subQuestion, data },
          };

          return (
            <Grid item xs={12} mb={6} mt={6} key={idx}>
              <ReportsBarChart
                color="info"
                // title={subQuestion}
                description={subQuestion}
                chart={chartData}
              />
            </Grid>
          );
        })}
      </Box>
    );
  }

  // For simpler matrix or single-choice questions, render a single bar chart
  const chartData = {
    labels: Object.keys(question.responses),
    datasets: { label: question.question, data: Object.values(question.responses) },
  };

  return (
    <Grid item xs={12} mb={6} mt={6}>
      <ReportsBarChart
        color="info"
        title={question.question}
        // description="Responses distribution"
        chart={chartData}
      />
    </Grid>
  );
};

export default ResultsDisplay;
