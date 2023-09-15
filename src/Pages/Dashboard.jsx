import React, { useState, useEffect } from "react";
import User from "./User";
import { NavbarLogin, NavbarDefault } from "../Components/Navbar";
import axios from "axios";

const Dashboard = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(true);
    const [user, setUser] = useState({});
    const [isRefresh, setIsRefresh] = useState(false);

    const [successResponse, setSuccessResponse] = useState({
        isSuccess: false,
        message: "",
    });

    const [errorResponse, setErrorResponse] = useState({
        isError: false,
        message: "",
    });


    useEffect(() => {
        const validateLogin = async () => {
            try {
                // Check status user login
                // 1. Get token from localStorage
                const token = localStorage.getItem("token");

                // 2. Check token validity from API
                const currentUserRequest = await axios.get(
                    "http://localhost:2000/v1/auth/me",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                const currentUserResponse = currentUserRequest.data;

                if (currentUserResponse.status) {
                    setUser(currentUserResponse.data.user);
                }
            } catch (err) {
                setIsLoggedIn(false);
            }
        };

        validateLogin();
        setIsRefresh(false);
    }, [isRefresh]);

    return isLoggedIn ? (
        <>
            <NavbarLogin />
            <User />
        </>
    ) : (
        <>
            <NavbarDefault  />
        </>
    );
};

export default Dashboard;
