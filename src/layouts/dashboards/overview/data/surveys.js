import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "examples/Tables/DataTable";
import { Link } from "react-router-dom";
import FetchButton from "../FetchButton";
import apiURL from "utils";

// Function to format date to MX format (dd/mm/yyyy)
const formatDateMX = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
};

// Function to extract survey status
const getSurveyStatus = (statusObj) => {
  if (!statusObj || Object.keys(statusObj).length === 0) return "Draft"; // Default to "Draft" if empty
  if (statusObj.open) return "Open";
  if (statusObj.closed) return "Closed";
  if (statusObj.new) return "Open";
  return "Draft"; // Default to "Draft" if no other status is found
};

// Function to handle fetching survey details
const handleFetchDetails = async (surveyId) => {
  try {
    // prettier-ignore
    const detailsResponse = await axios.get(`${apiURL}/api/surveys/${surveyId}/check`);

    return detailsResponse.data;
  } catch (error) {
    console.error("Error fetching survey details:", error);
  }
};

// Fetch responses for the survey
const handleFetchResponses = async (surveyId) => {
  try {
    await axios.get(`${apiURL}/api/responses/${surveyId}`);
    await axios.get(`${apiURL}/api/categories/categorical-questions/${surveyId}`);
  } catch (error) {
    console.error("Error fetching survey details:", error);
  }
};

export const SurveysTable = () => {
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "title", accessor: "title", width: "50%" },
      { Header: "status", accessor: "status", width: "20%" },
      { Header: "date_created", accessor: "date_created", width: "20%" },
      { Header: "question_count", accessor: "question_count", width: "20%" },
      { Header: "response_count", accessor: "response_count", width: "20%" },
      // { Header: "preview", accessor: "preview", width: "20%" },
      { Header: "Categorías", accessor: "categories", width: "20%" },
      { Header: "Fetch Survey", accessor: "load_survey", width: "20%" },
      { Header: "Fetch Responses", accessor: "load_responses", width: "20%" },
      { Header: "ID", accessor: "id", width: "20%" },
    ],
    rows: [],
  });

  // Fetch surveys from backend
  const fetchSurveys = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/surveys`);
      const surveys = response.data.data;

      const rows = await Promise.all(
        surveys.map(async (survey) => {
          const existingSurvey = await handleFetchDetails(survey.id);
          const isSurveyExisting = existingSurvey.exists;

          return {
            title: (
              <Link
                to={`/dashboards/survey/tables`}
                style={{ textDecoration: "underline !important", color: "inherit" }}
                onClick={() => {
                  localStorage.setItem("selectedSurveyId", survey.id);
                  localStorage.setItem("selectedSurveyTitle", survey.title);
                }}
              >
                {survey.title}
              </Link>
            ),
            status: getSurveyStatus(survey.collect_stats?.status),
            date_created: formatDateMX(survey.date_created),
            question_count: survey.question_count,
            response_count: survey.response_count,
            // preview: survey.preview,
            categories: (
              <Link
                to={`/forms/surveycategories`}
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => {
                  localStorage.setItem("selectedSurveyId", survey.id);
                  localStorage.setItem("selectedSurveyTitle", survey.title);
                }}
              >
                Asignar Categorías
              </Link>
            ),
            load_survey: isSurveyExisting ? "Fetched" : "Pending",
            load_responses: (
              <FetchButton surveyId={survey.id} fetchResponses={handleFetchResponses} />
            ),
            id: survey.id,
          };
        })
      );

      // Update the DataTable with fetched data
      setDataTableData((prevData) => ({
        ...prevData,
        rows: rows,
      }));
    } catch (error) {
      console.error("Error fetching surveys:", error);
    }
  };

  // Fetch the surveys when the component mounts
  useEffect(() => {
    fetchSurveys();
  }, []);

  return <DataTable table={dataTableData} />;
};

export const surveysSummary = () => {
  const [summary, setSummary] = useState({
    totalSurveys: 0,
    statusCounts: {
      Draft: 0,
      Open: 0,
      Closed: 0,
    },
  });

  const fetchSummary = async () => {
    try {
      const response = await axios.get(`${apiURL}/api/surveys/summary`);
      setSummary(response.data);
    } catch (error) {
      console.error("Error fetching survey summary:", error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  return summary;
};
