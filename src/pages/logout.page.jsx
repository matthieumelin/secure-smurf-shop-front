import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken, setData } from "../redux/reducers/user.reducer";

import AppRoutes from "../router/app.routes";

export default function Logout({ toast }) {
  const token = useSelector((state) => state.user.token);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setData());
    dispatch(setToken());

    localStorage.clear();

    console.log("trigger")
  //  toast.success("You are logged out.");
  }, [token, dispatch]);

  if (!token) {
    return <Navigate to={AppRoutes.Home} />;
  }
}
