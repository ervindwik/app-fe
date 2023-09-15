import React, { useState, useEffect } from 'react';
import { Button, Container, Stack, Row, Col, Card, Badge, Alert } from 'react-bootstrap';
import { Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import axios from "axios";
import "../../Styles/Profile.css"
import menu from "../../assets/user.png";

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [user, setUser] = useState({});

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
  }, []);


    return isLoggedIn ?(
        <Container className="header-profile">
          <div className="d-flex flex-row bd-highlight mb-3">
          <div className="p-2 box-profile ">
            <div className='css-borderImg d-flex'>
            <img className="css-img" src={`${!user.picture ? menu : user.picture}`} alt="" />
            </div>
            <div className='css-borderDesc'>
                <h2> Nama : {user.nama}</h2>
                <h5> Nomor Karyawan : {user.nomorKaryawan}</h5>
                <h5> Tanggal Lahir: {user.tglLahir}</h5>
            </div>
          </div>
            </div>
        </Container>
    ) : (
      <Navigate to="/login" replace />
    )
}

export default Header