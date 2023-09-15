import React, { useState, useEffect } from "react";
import "../Styles/Navbar.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Logo from "../assets/logoNav.png";
import searchBar from "../assets/searchButtonIcon.png";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import NavDropdown from "react-bootstrap/NavDropdown";
import { BsSearch } from "react-icons/bs";
import menu from "../assets/user.png";
import { Link, Navigate } from "react-router-dom";
import user from "../assets/usr.png";
import course from "../assets/crs.png";
import setting from "../assets/set.png";
import out from "../assets/out.png";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export function NavbarDefault(props) {
  return (
    
    <Navbar bg="white" expand="lg" fixed="top" className="fw-bolder">
      <Container>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 nav" navbarScroll>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login" className="btn btn-outline-dark px-4">
              Masuk
            </Nav.Link>
            <Nav.Link href="/regis" className="btn oldGreen text-white px-4">
              Daftar
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export function NavbarLogin() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [users, setUser] = useState({});

  useEffect(() => {
    const validateLogin = async () => {
      try {
        const token = localStorage.getItem("token");
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

  const handleProfile = () => {
    isLoggedIn ?
      navigate(`/user/settingprofile/${users.id}`) :
      navigate('/login')
  }

  const handleMyCourse = () => {
    isLoggedIn ?
      navigate(`/profile/mycourse/${users.id}`) :
      navigate(`/login`)
  }
  return (
    <>
      <Navbar bg="white" expand="lg" fixed="top" className="fw-bolder">
        <Container>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 nav"
              navbarScroll
            >
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Dropdown>
            <Dropdown.Toggle className="d-block" id="drop">
                <img src={!users.picture ? menu : users.picture} className="rounded-circle" width="58px" height="58px" alt="" />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item>
                <Link to="/profile" style={{ textDecoration: 'none', color: 'black' }}> <img src={user} alt="" width={22} style={{ marginRight: '10px' }} /> Profile </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={handleProfile}>
                <Link to="/user/settingprofile/:id" style={{ textDecoration: 'none', color: 'black' }}> <img src={setting} alt="" width={22} style={{ marginRight: '10px' }} /> Edit Profile </Link>
              </Dropdown.Item>
              <Dropdown.Item onClick={() => localStorage.removeItem("token")}>
                <Link to="/login" style={{ textDecoration: 'none', color: 'black' }}> <img src={out} alt="" width={22} style={{ marginRight: '10px' }} />  Logout </Link>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </>
  )
}

export default { NavbarDefault, NavbarLogin };