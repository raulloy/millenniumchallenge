import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import { Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-reset-cover.jpeg";

function ResetPasswordMsg() {
  return (
    <CoverLayout coverHeight="50vh" image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          py={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h3" fontWeight="medium" color="white" mt={2} mb={2}>
            Restablecer Contraseña
          </MDTypography>
          {/* <MDTypography display="block" variant="button" color="white" mt={4}>
            Te hemos enviado un link a tu correo para poder reestableer la contraseña
          </MDTypography> */}
        </MDBox>
        <MDBox pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mt={6} mb={1}>
              <MDTypography
                display="block"
                textAlign="center"
                variant="button"
                color="black"
                mt={4}
              >
                Te hemos enviado un link a tu correo para poder restablecer la contraseña
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default ResetPasswordMsg;
