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
          const ttbValues = categoryData.questions.flatMap((q) => {
            if (q.type === "matrix") {
              if (q.responses && typeof Object.values(q.responses)[0] === "object") {
                // Manejar preguntas de matriz con subpreguntas anidadas
                return Object.keys(q.responses).flatMap((subQuestion) => {
                  const subResponses = q.responses[subQuestion];
                  const subRelativeFrequency = q.relative_frequency?.[subQuestion];
                  if (subResponses && subRelativeFrequency) {
                    return calculateTTB("matrix", subResponses, subRelativeFrequency, subQuestion);
                  }
                  return null;
                });
              } else if (q.responses && q.relative_frequency) {
                return calculateTTB("matrix", q.responses, q.relative_frequency, q.question);
              }
            } else if (q.responses && q.relative_frequency) {
              return calculateTTB("single_choice", q.responses, q.relative_frequency, q.question);
            }

            return null;
          });

          // Filtrar valores válidos
          const validTTBValues = ttbValues.filter((ttb) => ttb !== null);

          // Log para depurar
          if (category.name === "Salud y Seguridad") {
            console.log(`Category: ${category.name}, Group: ${groupKey}, TTBs:`, validTTBValues);
          }

          // Calcular el promedio de los TTBs y redondear
          row[groupKey] = validTTBValues.length
            ? Math.round(validTTBValues.reduce((a, b) => a + b, 0) / validTTBValues.length)
            : 0; // Default a 0 si no hay valores
        } else {
          row[groupKey] = 0; // Default a 0 si falta la categoría
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
          Comparativo TTB de categorías por demográficos
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
                          <TableCell key={groupKey}>{`${row[groupKey]}%`}</TableCell>
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
