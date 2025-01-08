import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import apiURL from "utils";
import { TTB_RULES_2 } from "utils";
import { exceptions } from "utils";

const ResultsDisplay = () => {
  const [groupedResults, setGroupedResults] = useState([]);
  const [error, setError] = useState(null);

  const storedId = localStorage.getItem("selectedSurveyId");

  if (!storedId) {
    return <Navigate to="/dashboards/overview" />;
  }

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/results/ttb-categories/${storedId}`);
        const results = response.data.groupedResults || [];
        setGroupedResults(results);
        setError(null);
      } catch (error) {
        console.error("Error fetching results:", error);
        setError("Failed to load results");
      }
    };

    fetchResults();
  }, [storedId]);

  const calculateTTB = (type, responses, relativeFrequency, category, exceptions = {}) => {
    // console.log("Relative Frequencies for TTB calculation:", relativeFrequency);
    const rules = TTB_RULES_2[type] || {};
    const keys = Object.keys(responses);

    for (const key of keys) {
      // Apply exceptions or rules
      const ttbOptions = exceptions[key] || rules[key] || rules.default;
      // console.log(`Key: ${key}, TTB Options: ${ttbOptions}`);
      if (ttbOptions) {
        const ttbSum = ttbOptions.reduce((sum, option) => {
          const value = parseFloat(relativeFrequency[option] || 0);
          // console.log(`Processing Option: ${option}, Value: ${relativeFrequency[option]}`);
          return sum + value;
        }, 0);
        console.log(`TTB Sum for Key: ${key} -> ${Math.round(ttbSum * 100)}`);
        return Math.round(ttbSum * 100); // Convert to percentage
      }
    }

    console.log("No matching rule found for:", { type, responses, relativeFrequency });
    return null; // No matching rule
  };

  const calculateAverageTable = (group) => {
    const categories =
      group.values[Object.keys(group.values)[0]]?.categories.filter(
        (category) => category.name !== "Datos Demográficos" && category.name !== "Sin categoría"
      ) || [];

    return categories.map((category) => {
      const row = { name: category.name };
      Object.keys(group.values).forEach((groupKey) => {
        const categoryData = group.values[groupKey].categories.find(
          (cat) => cat.name === category.name
        );

        if (categoryData) {
          // Calculate TTB for each question
          const ttbValues = categoryData.questions.flatMap((q) => {
            if (q.type === "matrix") {
              if (q.responses && typeof Object.values(q.responses)[0] === "object") {
                // Handle nested matrix questions with sub-questions
                return Object.keys(q.responses).flatMap((subQuestion) => {
                  const subResponses = q.responses[subQuestion];
                  const subRelativeFrequency = q.relative_frequency?.[subQuestion];
                  if (subResponses && subRelativeFrequency) {
                    return calculateTTB("matrix", subResponses, subRelativeFrequency);
                  }
                  return null; // Handle missing sub-question data
                });
              } else if (q.responses && q.relative_frequency) {
                if (q.question === exceptions) {
                  return calculateTTB("matrix", q.responses, q.relative_frequency, {
                    No: ["No"],
                  });
                } else {
                  // Handle standard matrix questions
                  return calculateTTB("matrix", q.responses, q.relative_frequency);
                }
              }
            } else if (q.responses && q.relative_frequency) {
              // Single-choice or other questions
              return calculateTTB("single_choice", q.responses, q.relative_frequency);
            }

            return null; // Handle unsupported question types gracefully
          });

          // Filter valid TTB values
          const validTTBValues = ttbValues.filter((ttb) => ttb !== null);

          // Log TTBs for "Liderazgo"
          if (category.name === "Salud y Seguridad") {
            console.log(`Category: ${category.name}, Group: ${groupKey}, TTBs:`, validTTBValues);
          }

          // Calculate the average TTB
          row[groupKey] = validTTBValues.length
            ? validTTBValues.reduce((a, b) => a + b, 0) / validTTBValues.length
            : 0; // Default to 0 if no valid TTBs
        } else {
          row[groupKey] = 0; // Default to 0 for missing category data
        }
      });
      return row;
    });
  };

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  if (!groupedResults.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Box sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Pivot Tables
        </Typography>
        {groupedResults.map((group, index) => {
          const tableData = calculateAverageTable(group);

          return (
            <Box key={index} sx={{ marginBottom: 5 }}>
              <Typography variant="h5" gutterBottom>
                {group.key}
              </Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableBody>
                    <TableRow>
                      {["Categorías", ...Object.keys(group.values)].map((header) => (
                        <TableCell key={header} sx={{ fontWeight: "bold" }}>
                          {header}
                        </TableCell>
                      ))}
                    </TableRow>
                    {tableData.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{row.name}</TableCell>
                        {Object.keys(group.values).map((groupKey) => (
                          <TableCell key={groupKey}>{`${row[groupKey].toFixed(2)}%`}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          );
        })}
      </Box>
      <Footer />
    </DashboardLayout>
  );
};

export default ResultsDisplay;
