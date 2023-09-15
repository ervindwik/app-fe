import React, { useRef, useState, useEffect } from "react";
import { Container, Navbar, Nav, Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {NavbarLogin} from "../Components/Navbar";
import "../Styles/SettingProfile.css";
import axios from "axios";

const SettingProfile = () => {
    const navigate = useNavigate();
	const [isLoggedIn, setIsLoggedIn] = useState(true);
	const { id } = useParams();
	const [user, setUser] = useState([]);
    const hiddenFileInput = useRef(null);
    const [active, setActive] = useState('default');

	const [image, setImage] = useState();
	const [preview, setPreview] = useState();
	const fileInputRef = useRef();

	const nameField = useRef("");
	const usernameField = useRef("");
    const nomorKaryawanField = useRef("");
	const passwordField = useRef("");
	const tglLahirField = useRef("");

    const [errorResponse, setErrorResponse] = useState({
		isError: false,
		message: "",
	});

    const getUsers = async () => {
		try {
			const token = localStorage.getItem("token");
			const responseUser = await axios.get(
				`http://localhost:2000/v1/auth/me`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(responseUser)
			const dataUser = await responseUser.data.data.user;

			setUser(dataUser);
			console.log(dataUser);
		} catch (err) {
			console.log(err);
		}
	};
	useEffect(() => {
		getUsers();
	}, []);

    useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setPreview(reader.result);
			}
			reader.readAsDataURL(image);
		} else {
			setPreview(null);
		}
	}, [image]);


    

	const onUpdate = async (e) => {
		e.preventDefault();

		try {
			const token = localStorage.getItem("token");

			const userPayload = new FormData();

			userPayload.append("nama", nameField.current.value);
			userPayload.append("username", usernameField.current.value);
			userPayload.append("nomorKaryawan", nomorKaryawanField.current.value);
			userPayload.append("password", passwordField.current.value);
            userPayload.append("tglLahir", tglLahirField.current.value);

			const userRequest = await axios.put(
				`http://localhost:2000/v1/users/update/${id}`,
				userPayload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const userResponse = userRequest.data;

			if (userResponse.status) navigate("/user");
		} catch (err) {
			console.log(err);
			const response = err.response.data;

			setErrorResponse({
				isError: true,
				message: response.message,
			});
		}
	};

    const handlePassword = () => {
		isLoggedIn ? 
		navigate(`/profile/settingpassword/${user.id}`) : 
		navigate('/login')
	}

    const handleProfile = () => {
		isLoggedIn ? 
		navigate(`/profile/settingprofile/${user.id}`) : 
		navigate('/login')
	}

    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:2000/v1/users/delete/${id}`);
            getUsers();
            navigate('/login')
        } catch (error) {
            console.log(error);
        }
    };



	

    return (
        <>
            <NavbarLogin />
            <div className="form-input-profile">
                <Container>
                    <Form onSubmit={onUpdate}>
                        <Form.Group className="mb-3" controlId="formInput">
                            <Form.Label className="label">Nama Karyawan</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Nama Karyawan...."
                            ref = {nameField}
                            defaultValue={user.nama}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formInput">
                            <Form.Label className="label">Nama Karyawan</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Nama Karyawan...."
                            ref = {nameField}
                            defaultValue={user.nama}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formInput">
                            <Form.Label className="label">Username</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Username...."
                            ref = {usernameField}
                            defaultValue = {user.username} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formInput">
                            <Form.Label className="label">Password</Form.Label>
                            <Form.Control 
                            type="password" 
                            placeholder="Password ..." 
                            ref = {passwordField}
                            defaultValue = {user.password}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formInput">
                            <Form.Label className="label">Nomor Karyawan</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Nomor Karyawan ...."
                            ref = {nomorKaryawanField}
                            defaultValue = {user.nomorKaryawan} 
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formInput">
                            <Form.Label className="label">Tanggal</Form.Label>
                            <Form.Control 
                            type="text" 
                            placeholder="Tanggal Lahir...."
                            ref = {tglLahirField}
                            defaultValue={user.tglLahir} 
                            />
                        </Form.Group>
                        <Button className="btn-submit" type="submit">
                            Simpan
                        </Button>
                        <Button
                            onClick={() => deleteUser(user.id)}
                            className="btn-danger"
                            paddingLeft = "100px"
                        >Hapus Akun 
                        </Button>
                    </Form>
                </Container>
            </div>
        </>

    )
}

export default SettingProfile;