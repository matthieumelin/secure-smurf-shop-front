import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import jwtDecode from "jwt-decode";

export default function AuthVerify() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        navigate("/logout");
      }
    }
  }, [location, navigate, token]);

  return;
}
