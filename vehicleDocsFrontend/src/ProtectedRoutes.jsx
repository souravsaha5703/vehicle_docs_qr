import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "./Context/AppContextProvider";
import { useContext } from "react";

function ProtectedRoutes() {
    const { loggedIn } = useContext(AppContext);

    if (!loggedIn) {
        return <Navigate to={'/'} replace />
    } else {
        return <Outlet />
    }
}

export default ProtectedRoutes