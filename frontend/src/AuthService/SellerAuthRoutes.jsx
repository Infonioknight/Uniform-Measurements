import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from "react-router-dom";

export default function SellerRequireAuth() {
    const {userInfo} = useSelector((state) => state.auth);
    return userInfo?.role !== 'customer' ? <Outlet />  : <Navigate to="/admin/seller/login" replace={true} />;
}