import { Navigate, useParams } from "react-router-dom";

// @mui material components
import { Card, Typography, Grid } from "@mui/material";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import { fetchSurveyData, SurveysTable } from "./AddSurveyCategories";

// import { fetchSurveyData, SurveysTable } from ".";

function Sales() {
  const { id } = useParams();
  const storedId = localStorage.getItem("selectedSurveyId");
  const storedTitle = localStorage.getItem("selectedSurveyTitle");
  const surveyData = fetchSurveyData(storedId);

  if (!storedId) {
    return <Navigate to="/dashboards/overview" />;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Typography variant="h4" gutterBottom>
            {storedTitle}
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              {surveyData && surveyData.pages && surveyData.pages.length > 0 ? (
                <p>Preguntas {surveyData.pages[0].question_count}</p>
              ) : (
                <p>Loading survey data...</p>
              )}
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Card>
            <MDBox p={3} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Asigna categoría y subcategoría a cada pregunta
              </MDTypography>
              <MDTypography variant="button" color="text">
                Preguntas
              </MDTypography>
            </MDBox>
            <SurveysTable id={storedId} />
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Sales;
