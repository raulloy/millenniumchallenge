import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { Store } from "Store";

/* eslint-disable react/prop-types */
export default function ProtectedRoute({ children }) {
  const { state } = useContext(Store);
  const { userInfo } = state;
  return userInfo && userInfo.name ? children : <Navigate to="/sign-in" />;
}
