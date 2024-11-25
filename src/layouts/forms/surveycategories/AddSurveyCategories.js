/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import axios from "axios";

import DataTable from "examples/Tables/DataTable";
import { Button } from "@mui/material";
import CategoryForm from "../categories/CategoryForm";
import apiURL from "utils";

// Helper function to remove HTML tags
const removeHtmlTags = (html) => html.replace(/<\/?[^>]+(>|$)/g, "");

// SurveysTable component
export const SurveysTable = ({ id }) => {
  const [dataTableData, setDataTableData] = useState({
    columns: [
      // { Header: "ID", accessor: "id", width: "10%" },
      { Header: "Question", accessor: "question", width: "20%" },
      { Header: "Category & Subcategory", accessor: "category", width: "20%" },
    ],
    rows: [],
  });

  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedSubcategories, setSelectedSubcategories] = useState({});

  // Fetch surveys from backend
  const fetchSurveys = async (id) => {
    try {
      const response = await axios.get(`${apiURL}/api/surveys/${id}/details`);
      const surveys = response.data.pages.flatMap((page) => page.questions);

      // Initialize selected categories/subcategories with existing data
      const initialCategories = {};
      const initialSubcategories = {};

      // Map the surveys to the table row format
      const rows = surveys.map((survey) => {
        initialCategories[survey.id] = survey.category || ""; // Set initial category value
        initialSubcategories[survey.id] = survey.subcategory || ""; // Set initial subcategory value

        return {
          id: survey.id,
          question: removeHtmlTags(survey.headings[0].heading),
          category: (
            <CategoryForm
              surveyId={id}
              questionId={survey.id}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              selectedSubcategories={selectedSubcategories}
              setSelectedSubcategories={setSelectedSubcategories}
              initialCategory={survey.category} // Pass as prop
              initialSubcategory={survey.subcategory} // Pass as prop
            />
          ),
        };
      });

      // Update the selected categories and rows in state
      setSelectedCategories(initialCategories);
      setSelectedSubcategories(initialSubcategories);

      // Update the DataTable with fetched data
      setDataTableData((prevData) => ({
        ...prevData,
        rows,
      }));
    } catch (error) {
      console.error("Error fetching surveys:", error);
    }
  };

  // Save all categories and subcategories
  const handleSaveAll = async () => {
    const dataToSave = dataTableData.rows.map((row) => ({
      surveyId: id,
      questionId: row.id,
      category: selectedCategories[row.id] || "",
      subcategory: selectedSubcategories[row.id] || "",
    }));

    try {
      await axios.post(`${apiURL}/api/categories/save-all`, dataToSave);
      alert("Categories and subcategories saved successfully!");
    } catch (err) {
      console.error("Error saving categories and subcategories:", err);
    }
  };

  // Fetch surveys when component mounts
  useEffect(() => {
    if (id) {
      fetchSurveys(id);
    }
  }, [id]);

  return (
    <div
      style={{ position: "relative", display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <DataTable table={dataTableData} style={{ flex: 1 }} /> {/* Takes up most space */}
      {/* Save button aligned at the bottom-right */}
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "10px" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveAll}
          style={{ width: "400px", color: "white" }}
        >
          Save All Categories/Subcategories
        </Button>
      </div>
    </div>
  );
};

export const fetchSurveyData = (id) => {
  const [surveyData, setSurveyData] = useState({});

  const fetchSurvey = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/surveys/${id}/details`);
      setSurveyData(response.data);
    } catch (error) {
      console.error("Error fetching survey data:", error);
    }
  };

  useEffect(() => {
    fetchSurvey();
  }, []);

  return surveyData;
};
