import {React, useRef, useState} from "react";
import { Form, Button, Container, Row, Col, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../../Styles/Regis.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";

const Regis = () => {
    const [statePassword, setStatePassword] = useState(false);
    const [stateConfirmPassword, setStateConfirmPassword] = useState(false);
    const navigate = useNavigate();

	const nameField = useRef("");
	const passwordField = useRef("");
    const usernameField = useRef("");
    const confirmPasswordField = useRef("");

	const [errorResponse, setErrorResponse] = useState({
		isError: false,
		message: "",
	});

	const onRegister = async (e) => {
		e.preventDefault();

		try {
            if ( confirmPasswordField.current.value === passwordField.current.value){
                const userToRegisterPayload = {
                    nama: nameField.current.value,
                    username: usernameField.current.value,
                    password: passwordField.current.value,
                };
    
                const registerRequest = await axios.post(
                    "http://localhost:2000/v1/auth/register",
                    userToRegisterPayload
                );
    
                const registerResponse = registerRequest.data;
    
                if (registerResponse.status) navigate("/login");
            }else{
                navigate("/regis")
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
            <Container className="bungkus_regis">
            <Row className="d-flex justify-content-center align-items-center h-100">
                <Col md="5">
                    <div className="d-flex justify-content-center regis-body" id="regis-section">
                        <Form onSubmit={onRegister}>
                        <h3>Register</h3>
                        <Form.Group className="mb-3" controlId="formInput">
                            <Form.Control type="text" ref={nameField} placeholder="Full Name..." />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formInput">
                            <Form.Control type="text" ref= {usernameField} placeholder="Username..." />
                        </Form.Group>
        
                        <Form.Group className="mb-3" controlId="formInputPass">
                            <Row>
                                <Col className="md-10">
                                    <Form.Control
                                        type={statePassword ? "text" : "password"}
                                        className="password text-black"
                                        placeholder="Password..."
                                        ref={passwordField}
                                    />
                                </Col>
                                <Col className="md-2">
                                    <Button id="btn-pass" onClick={handleBtnPass}>
                                        {
                                            statePassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                        }
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formInputPass">
                            <Row>
                                <Col className="md-10">
                                    <Form.Control
                                        type={stateConfirmPassword ? "text" : "password"}
                                        className="password text-black"
                                        placeholder="Confirm Password..."
                                        ref={confirmPasswordField}
                                    />
                                </Col>
                                <Col className="md-2">
                                    <Button id="btn-pass" onClick={handleBtnConfirmPass}>
                                        {
                                            stateConfirmPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />
                                        }
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>

                        <p className="text-regis"><b><center>By signing up, you agree to our Terms, Privacy, Policy and Cookie Policy</center></b></p>
                        {errorResponse.isError && (
                                    <Alert variant="danger">{errorResponse.message}</Alert>
                                )}
                        <Button id="button-masuk" type="submit">
                            Sign Up
                        </Button>

                        <p>
                            <center>
                                <b>Have account ? <Link to={"/login"}>Login</Link>{" "}</b>
                            </center>
                        </p>
                        </Form>
                    </div>
                </Col>
            </Row>
            </Container>
        </>
    );
};

export default Regis;  