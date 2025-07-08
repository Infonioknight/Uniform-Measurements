import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

const AdminAuthRoutes = () => {
    const { userInfo } = useSelector((state) => state.auth);

    // Allow access only if the user is not a customer or seller (i.e., an admin)
    return userInfo && (userInfo.role === 'admin') ? (
        <Outlet />
    ) : (
        <Navigate to="/admin/login" replace={true} />
    );
};

export default AdminAuthRoutes;