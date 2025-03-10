import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";

// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";

import apiURL from "utils";
import { Store } from "Store";
import MDSnackbar from "components/MDSnackbar";

function SignIn() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [errorSB, setErrorSB] = useState(false);
  const closeErrorSB = () => setErrorSB(false);

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const renderErrorSB = (
    <MDSnackbar
      color="error"
      icon="warning"
      title="Ups!"
      content={error}
      dateTime={new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
      open={errorSB}
      onClose={closeErrorSB}
      close={closeErrorSB}
      bgWhite
    />
  );

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${apiURL}/api/users/signin`, {
        email,
        password,
      });

      // if (!data.isAdmitted) {
      //   toast.error("Your account is not admitted. Please contact support.");
      //   return;
      // }

      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("MCUserInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      setError(err.response.data.message || "Problema con el servidor");
      setErrorSB(true);
      console.log("Error:", err.message);
      console.log("Error:", err.response.data.message || err.response.data);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Iniciar Sesión
          </MDTypography>
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <MDTypography display="block" variant="button" color="white">
              Millennium Challenge
            </MDTypography>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Email"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                onChange={(e) => setPassword(e.target.value)}
              />
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton
                variant="gradient"
                color="info"
                fullWidth
                onClick={submitHandler}
                type="submit"
              >
                Entrar
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Crea tu usuario{" "}
                <MDTypography
                  component={Link}
                  to="/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  aquí
                </MDTypography>
              </MDTypography>
            </MDBox>
            <MDBox mt={1} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿Olvidaste tu contraseña?{" "}
                <MDTypography
                  component={Link}
                  to="/forget-password"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Restablecer contraseña
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      {renderErrorSB}
    </BasicLayout>
  );
}

export default SignIn;
