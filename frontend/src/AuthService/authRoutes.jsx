import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

export default function RequireAuth() {
    const { userInfo } = useSelector((state) => state.auth);
    return userInfo? <Outlet />: <Navigate to="/login" replace={true} />;
  }