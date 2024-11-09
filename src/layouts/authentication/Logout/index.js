import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Remove userInfo from localStorage
    localStorage.removeItem("MCuserInfo");
    // Redirect to sign-in page
    navigate("/sign-in");
  }, [navigate]);

  return null;
}

export default Logout;
