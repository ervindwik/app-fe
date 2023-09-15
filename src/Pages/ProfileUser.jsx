import React from "react";
import { Container, Row, Col, Form, Button, Table } from "react-bootstrap";
import SidebarAdmin from "../../../Components/AdminComp/Sidebar";
import NavbarAdmin from "../../../Components/AdminComp/Navbar";
import FotoProfile from "../../../assets/user.png";
import { BsSearch } from "react-icons/bs";
import Pagination from "@mui/material/Pagination";
import Stack from '@mui/material/Stack';
import "../../../Styles/ProfileUser.css";
import "../../../Styles/index.css";
import { Link } from "react-router-dom";


const ProfileUser = () => {
    return (
        <>
            <NavbarAdmin />
            <div className="d-flex">
                <SidebarAdmin />
                <Container className="side-right">
                    <h3 className="title-peserta"><Link to="/admin" className="teks-h5">Home</Link> / <Link to="/admin/peserta" className="teks-h5">User</Link>  / Nama User</h3>
                    <div className="p-2 box-profile-user">
                        <Row>
                            <Col className="col-md-2 me-5">
                                <div className='border-image d-flex'>
                                    <img className="image-profile" src={FotoProfile} />
                                </div>
                            </Col>
                            <Col className="col-md-8 ms-5">
                                <div className='desc-profile'>
                                    <h5>M Rifki Nurul Ramdani Alamsyah</h5>
                                    <h6>Front End Dev Intern</h6>
                                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro earum nesciunt quod aut impedit eveniet alias sapiente numquam iusto praesentium eos vitae, totam ratione facilis voluptatibus! Voluptatum cumque vero fuga?</p>
                                </div>
                            </Col>
                        </Row>
                    </div>
                    <div className="desc-course">
                        <h5>Course</h5>
                        <Form id="form">
                            <Form.Control
                                type="search"
                                placeholder="Course"
                                className="searchBar"
                                aria-label="Search"
                            />
                            <Button type="submit" className="buttonSearch">
                                <BsSearch color="#000" size={'2rem'} style={{ 'paddingRight': '10px' }} />
                            </Button>
                        </Form>
                        <div className="table-user">
                            <Table striped bordered hover>
                                <thead>
                                    <tr>
                                        <th>No</th>
                                        <th>Nama Course</th>
                                        <th>Pengajar</th>
                                        <th>Harga</th>
                                        <th>Dibuat</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <h1 className="text-danger">Loading ....</h1>
                                </tbody>
                            </Table>
                            <Stack className="pagination" spacing={2}>
                                <Pagination count={10} />
                            </Stack>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default ProfileUser;