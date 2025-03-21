import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";

import apiURL from "utils";
import { Store } from "Store";
import MDSnackbar from "components/MDSnackbar";

function Register() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const redirectInUrl = new URLSearchParams(search).get("redirect");
  const redirect = redirectInUrl ? redirectInUrl : "/";

  const [name, setName] = useState("");
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
      const { data } = await axios.post(`${apiURL}/api/users/signup`, {
        name,
        email,
        password,
      });
      ctxDispatch({ type: "USER_SIGNIN", payload: data });
      localStorage.setItem("MCUserInfo", JSON.stringify(data));
      navigate(redirect || "/");
    } catch (err) {
      setError(err.response.data.message || "An error occurred. Please try again.");
      setErrorSB(true);
      console.log("Error:", err);
      console.log("Error:", err.response.data.message || err.response.data);
    }
  };

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Millennium Challenge
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Registro de Usuarios
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Nombre"
                variant="standard"
                fullWidth
                onChange={(e) => setName(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="email"
                label="Correo"
                variant="standard"
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Contraseña"
                variant="standard"
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
                Registrarse
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                ¿Ya te registraste?{" "}
                <MDTypography
                  component={Link}
                  to="/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Iniciar Sesión
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
      {renderErrorSB}
    </CoverLayout>
  );
}

export default Register;
