import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import jwtDecode from "jwt-decode";

import AppRoutes from "../router/app.routes";

import axios from "axios";

export default function AuthVerify() {
  // Redux
  const token = useSelector((state) => state.user.token);

  // Router
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      const storedToken = localStorage.getItem('accessToken');
      const storedVersion = localStorage.getItem('accessTokenVersion');

      if (!storedToken || !storedVersion) {
        navigate(AppRoutes.Logout);
        return;
      }

      try {
        const decodedToken = jwtDecode(storedToken);
        const tokenVersion = decodedToken.version;

        if (decodedToken.exp * 1000 < Date.now() || tokenVersion !== parseInt(storedVersion)) {
          navigate(AppRoutes.Logout);
        }
      } catch (error) {
        navigate(AppRoutes.Logout);
      }
    }
  }, [location, navigate, token]);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use((response) => {
      return response;
    }, (error) => {
      const statusCode = error.response.status;

      if (statusCode === 403 || statusCode === 419) {
        navigate(AppRoutes.Logout);
      }
      return Promise.reject(error);
    });

    return () => {
      axios.interceptors.request.eject(interceptor);
    };
  }, [navigate]);

  return null;
}
