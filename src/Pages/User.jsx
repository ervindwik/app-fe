import React, { Component, useState, useEffect } from 'react';
import {NavbarLogin, NavbarDefault} from '../Components/Navbar';
import addPeserta from '../assets/add-btn.png';
import "../Styles/User.css";
import "../Styles/index.css";
import { Form, Button, Container, Nav } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { showFormattedDate } from "../utils/function";
import Pagination from "@mui/material/Pagination";
import Stack from '@mui/material/Stack';
import { Link, useNavigate } from "react-router-dom";


const User = () => {
    const navigate = useNavigate();
    // pagination
    const [page, setPage] = useState(1);

    const handleChange = (e, p) => {
        console.log(e, p)
        setPage(p)
    }

    //fetch users
    const [users, setUsers] = useState(null);
    let number = 1;

    const fetchUsers = async () => {
        try {
            const response = await axios("http://localhost:2000/v1/users")
            setUsers(response.data);
        } catch (err) {
            console.error(err)
        }
    }

    const handleSettingProfile = () => {
        navigate(`/user/settingprofile/${users.id}`)
      }

    useEffect(() => {
        fetchUsers();
    }, []);
    if (!users)
        return (
            <>
                <NavbarDefault />
                <div className='d-flex'>
                    <Container className="side-right">
                        <h5 id="teks-peserta"><Link to="/admin" className="teks-h5">Home</Link> / User</h5>
                        <button className="btn-tambah">
                            <Link to="/admin/peserta/addpeserta" className="tambah-peserta"> <img src={addPeserta} className="add-img"></img>
                                Tambah User
                            </Link>
                        </button>
                        <Form id="form">
                            <Form.Control
                                type="search"
                                placeholder="Search"
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
                                    <th>Nama</th>
                                    <th>Nomor Karyawan</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Tanggal Dibuat</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <h1 className="text-danger">Loading ....</h1>
                                </tbody>
                            </Table>
                            <Stack className="pagination" spacing={2}>
                                <Pagination count={10} onChange={handleChange} />
                            </Stack>
                        </div>
                    </Container>
                </div>
            </>
        )

    return (
        <>
            <NavbarLogin />
            <div className='d-flex'>
                <Container className="side-right">
                        <Link to="/user/adduser" className="tambah-peserta"><img src={addPeserta} className="add-img"></img>
                            Tambah Karyawan
                        </Link>
                    <Form id="form">
                        <Form.Control
                            type="search"
                            placeholder="Search"
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
                                    <th>Nama</th>
                                    <th>Nomor Karyawan</th>
                                    <th>Tanggal Lahir</th>
                                    <th>Tanggal Dibuat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {console.log(users)}
                                {users.data.get_all_users.map((user) => (
                                    <tr>
                                        <td>{number++}</td>
                                        <td>{user.nama}</td>
                                        <td>{user.nomorKaryawan}</td>
                                        <td>{user.tglLahir}</td>
                                        <td> {showFormattedDate(user.createdAt)}</td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                        <Stack className="pagination" spacing={2}>
                            <Pagination count={10} onChange={handleChange} />
                        </Stack>
                    </div>
                </Container>

            </div>
        </>
    )
}

export default User