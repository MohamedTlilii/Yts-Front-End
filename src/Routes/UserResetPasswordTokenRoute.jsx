import React from "react";
import { useParams, Navigate } from "react-router-dom";

function UserResetPasswordTokenRoute({ children }) {
  const { token } = useParams();
  // console.log("Reset Password Token:", token);

  // Regular expression to match a 32-character hexadecimal string
  const hex32Regex = /^[a-fA-F0-9]{32}$/;

  if (hex32Regex.test(token)) {
    return <>{children}</>;
  } else {
    return <Navigate to="/" />;
  }
}

export default UserResetPasswordTokenRoute;
