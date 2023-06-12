import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setData, setTokenVersion } from "../redux/reducers/user.reducer";
import { setCheckout } from "../redux/reducers/checkout.reducer";

import AppRoutes from "../router/app.routes";

export default function Logout() {
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setData());
    dispatch(setToken());
    dispatch(setTokenVersion());

    dispatch(setCheckout());

    localStorage.clear();
    sessionStorage.clear();

    //  toast.success("You are logged out.");
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to={AppRoutes.Home} />;
  }
}
