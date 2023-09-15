import { useState,useRef, React } from "react";
import { Container, Form, Button, Row, Col,Alert } from "react-bootstrap";
import { Link , useNavigate} from "react-router-dom";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import "../Styles/AddUser.css";

const AddUser = () => {
    const [showEye, setShowEye] = useState(false);

    const handleShowEye = () => {
        setShowEye(prevState => !prevState);
    }

    const [statePassword, setStatePassword] = useState(false);
    const [stateConfirmPassword, setStateConfirmPassword] = useState(false);
    const navigate = useNavigate();

	const nameField = useRef("");
	const passwordField = useRef("");
    const usernameField = useRef("");
    const nomorKaryawanField = useRef("");
    const tglLahirField = useRef("");
    const confirmPasswordField = useRef("");

	const [errorResponse, setErrorResponse] = useState({
		isError: false,
		message: "",
	});

	const onCreateUser = async (e) => {
		e.preventDefault();

		try {
            if ( confirmPasswordField.current.value === passwordField.current.value){
                const userToCreatePayload = {
                    nama: nameField.current.value,
                    username: usernameField.current.value,
                    password: passwordField.current.value,
                    nomorKaryawan: nomorKaryawanField.current.value,
                    tglLahir: tglLahirField.current.value

                };
    
                const createUserRequest = await axios.post(
                    "http://localhost:2000/v1/users/create",
                    userToCreatePayload
                );
    
                const createUserResponse = createUserRequest.data;
    
                if (createUserResponse.status) navigate("/user");
            }else{
                navigate("/user/adduser")
                alert("password not matching")
            }
		} catch (err) {
			console.log(err);
			const response = err.response.data;

			setErrorResponse({
				isError: true,
				message: response.message,
			});
		}
	};

    const handleBtnPass = () => {
        setStatePassword(prevState => !prevState);
    }

    const handleBtnConfirmPass = () => {
        setStateConfirmPassword(prevState => !prevState);
    }
    return (
        <>
            <div className="d-flex">
                <Container className="side-right">
                    <h3 className="title-peserta"><Link to="/user" className="teks-h5">Data Karyawan</Link>  / Tambah Karyawan</h3>
                    <div className="form-add-user">
                        <Form onSubmit={onCreateUser}>
                            <Form.Group className="mb-3" controlId="formInput">
                                <Form.Label className="label">Nama Karyawan</Form.Label>
                                <Form.Control type="text" ref ={nameField} placeholder="Nama Karyawan...." />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formInput">
                                <Form.Label className="label">Username</Form.Label>
                                <Form.Control type="text" ref={usernameField} placeholder="Username...." />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formInput">
                                <Form.Label className="label">Nomor Karyawan</Form.Label>
                                <Form.Control type="text" ref={nomorKaryawanField} placeholder="Nomor Karyawan..." />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formInputPassword">
                                <Form.Label className="label">Password</Form.Label>
                                <Row>
                                    <Col className="md-10">
                                        <Form.Control
                                            
                                            type={showEye ? "text" : "password"}
                                            className="password text-black"
                                            placeholder="Password..."
                                            ref ={passwordField}
                                        />
                                    </Col>
                                    <Col className="md-2">
                                        <Button id="btn-eye" onClick={handleShowEye}>
                                            {
                                                showEye ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                            }
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formInputPassword">
                                <Form.Label className="label">Konfirmasi Password </Form.Label>
                                <Row>
                                    <Col className="md-10">
                                        <Form.Control
                                            ref={confirmPasswordField}
                                            type={showEye ? "text" : "password"}
                                            className="password text-black"
                                            placeholder="Konfirmasi Password..."
                                        />
                                    </Col>
                                    <Col className="md-2">
                                        <Button id="btn-eye" onClick={handleShowEye}>
                                            {
                                                showEye ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                            }
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formInput">
                                <Form.Label className="label">Tanggal Lahir</Form.Label>
                                <Form.Control type="text" ref ={tglLahirField} placeholder="Tanggal Lahir ...." />
                            </Form.Group>
                            {errorResponse.isError && (
                                    <Alert variant="danger">{errorResponse.message}</Alert>
                                )}
                            <Button className="button-batal" type="reset">
                                Batalkan
                            </Button>
                            <Button className="button-submit" type="submit">
                                Simpan
                            </Button>
                            
                        </Form>
                    </div>
                </Container>

            </div>
        </>
    )
}

export default AddUser;