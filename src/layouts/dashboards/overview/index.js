import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDBadgeDot from "components/MDBadgeDot";
import MDButton from "components/MDButton";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DefaultStatisticsCard from "examples/Cards/StatisticsCards/DefaultStatisticsCard";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import HorizontalBarChart from "examples/Charts/BarCharts/HorizontalBarChart";
import SalesTable from "examples/Tables/SalesTable";
import DataTable from "examples/Tables/DataTable";

// Sales dashboard components
import ChannelsChart from "layouts/dashboards/sales/components/ChannelsChart";

// Data
import defaultLineChartData from "layouts/dashboards/sales/data/defaultLineChartData";
import horizontalBarChartData from "layouts/dashboards/sales/data/horizontalBarChartData";
import salesTableData from "layouts/dashboards/sales/data/salesTableData";
import dataTableData from "layouts/dashboards/sales/data/dataTableData";
import { surveysSummary, SurveysTable } from "./data/surveys";

function Sales() {
  // DefaultStatisticsCard state for the dropdown value
  const [salesDropdownValue, setSalesDropdownValue] = useState("6 May - 7 May");
  const [customersDropdownValue, setCustomersDropdownValue] = useState("6 May - 7 May");
  const [revenueDropdownValue, setRevenueDropdownValue] = useState("6 May - 7 May");

  // DefaultStatisticsCard state for the dropdown action
  const [salesDropdown, setSalesDropdown] = useState(null);
  const [customersDropdown, setCustomersDropdown] = useState(null);
  const [revenueDropdown, setRevenueDropdown] = useState(null);

  // DefaultStatisticsCard handler for the dropdown action
  const openSalesDropdown = ({ currentTarget }) => setSalesDropdown(currentTarget);
  const closeSalesDropdown = ({ currentTarget }) => {
    setSalesDropdown(null);
    setSalesDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openCustomersDropdown = ({ currentTarget }) => setCustomersDropdown(currentTarget);
  const closeCustomersDropdown = ({ currentTarget }) => {
    setCustomersDropdown(null);
    setCustomersDropdownValue(currentTarget.innerText || salesDropdownValue);
  };
  const openRevenueDropdown = ({ currentTarget }) => setRevenueDropdown(currentTarget);
  const closeRevenueDropdown = ({ currentTarget }) => {
    setRevenueDropdown(null);
    setRevenueDropdownValue(currentTarget.innerText || salesDropdownValue);
  };

  const summary = surveysSummary();

  // Dropdown menu template for the DefaultStatisticsCard
  const renderMenu = (state, close) => (
    <Menu
      anchorEl={state}
      transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={Boolean(state)}
      onClose={close}
      keepMounted
      disableAutoFocusItem
    >
      <MenuItem onClick={close}>Last 7 days</MenuItem>
      <MenuItem onClick={close}>Last week</MenuItem>
      <MenuItem onClick={close}>Last 30 days</MenuItem>
    </Menu>
  );

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <MDBox mb={3}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={3}>
              <DefaultStatisticsCard
                title="Encuestas"
                count={summary.totalSurveys}
                percentage={{
                  color: "success",
                  value: "",
                  label: "",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DefaultStatisticsCard
                title="Encuestas Open"
                count={summary.statusCounts.Open}
                percentage={{
                  color: "success",
                  value: "",
                  label: "",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DefaultStatisticsCard
                title="Encuestas Draft"
                count={summary.statusCounts.Draft}
                percentage={{
                  color: "secondary",
                  value: "",
                  label: "",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <DefaultStatisticsCard
                title="Encuestas Closed"
                count={summary.statusCounts.Closed}
                percentage={{
                  color: "secondary",
                  value: "",
                  label: "",
                }}
              />
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mb={3}>
          <Card>
            <MDBox p={3} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Encuestas
              </MDTypography>
              {/* <MDTypography variant="button" color="text">
                A lightweight, extendable, dependency-free javascript HTML table plugin.
              </MDTypography> */}
            </MDBox>
            <SurveysTable />
          </Card>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Sales;
