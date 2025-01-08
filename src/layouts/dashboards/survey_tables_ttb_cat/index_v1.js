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
          // Flatten relative frequencies
          const allFrequencies = categoryData.questions.flatMap((q) => {
            const freqValues = [];
            if (q.relative_frequency) {
              if (
                typeof q.relative_frequency === "object" &&
                !Array.isArray(q.relative_frequency)
              ) {
                // Handle nested structures
                Object.values(q.relative_frequency).forEach((val) => {
                  if (typeof val === "object") {
                    freqValues.push(
                      ...Object.values(val).map((nestedVal) => parseFloat(nestedVal))
                    );
                  } else {
                    freqValues.push(parseFloat(val));
                  }
                });
              } else {
                freqValues.push(
                  ...Object.values(q.relative_frequency).map((val) => parseFloat(val))
                );
              }
            }
            return freqValues.filter((val) => !isNaN(val)); // Filter out invalid numbers
          });

          // Log frequencies for debugging when category is "Liderazgo"
          // if (category.name === "Liderazgo") {
          //   console.log(
          //     `Category: ${category.name}, Group: ${groupKey}, All Frequencies:`,
          //     allFrequencies
          //   );
          // }

          // Calculate the average
          row[groupKey] = allFrequencies.length
            ? (allFrequencies.reduce((a, b) => a + b, 0) / allFrequencies.length) * 100
            : 0; // Default to 0 if no valid frequencies
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
                    {["Categorías", ...Object.keys(group.values)].map((header) => (
                      <TableCell key={header} sx={{ fontWeight: "bold" }}>
                        {header}
                      </TableCell>
                    ))}
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
