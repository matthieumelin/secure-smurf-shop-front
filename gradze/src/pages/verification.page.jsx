import React, { useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import AppRoutes from "../router/app.routes";

import axios from "axios";
import { API_ENDPOINTS } from "../api/api";

export default function Verification({ toast }) {
  const { token } = useParams();

  const navigate = useNavigate();

  const accessToken = useSelector((state) => state.user.token);

  useEffect(() => {
    const validateUser = async () => {
      await axios
        .post(API_ENDPOINTS.USER_VERIFY, {
          token: token,
        })
        .then((res) => {
          if (res.status === 200) {
            navigate(AppRoutes.Login);
            
            toast.success(res.data.message);
          }
        })
        .catch((err) => {
          if (err) {
            navigate(AppRoutes.Home);

            toast.error(err.response.data.message)
          }
        });
    };
    if (token) validateUser();
  }, [navigate, toast, token]);

  if (accessToken) {
    return <Navigate to={AppRoutes.Home} />;
  }
}
