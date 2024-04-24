import "../../Styles/Login.css";

import axios from "axios";
import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { Button, Container } from "react-bootstrap";
import { FloatingLabel, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Assets
import Loading from "../../Assets/loading_white.svg";

const Login = () => {
    const navigate = useNavigate();

    const [nipValue, setNipValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nipValue === "" || nipValue.length < 18 || nipValue === null || nipValue === undefined) {
            return alert("NIP is required or NIP must be 18 digits!");
        } else if (passwordValue === "" || passwordValue.length < 5 || passwordValue === null || passwordValue === undefined) {
            return alert("Password is required or Password must be 5 digits!");
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("nip", nipValue);
        formData.append("password", passwordValue);

        axios.defaults.headers.common["Accept"] = "application/json";
        await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, formData).then((res) => {
            setIsLoading(false);

            localStorage.setItem("accessToken", res.data.user.accessToken);
            localStorage.setItem("id", res.data.user.id.toString());
            localStorage.setItem("name", res.data.user.name || `User #${res.data.user.id}`);
            localStorage.setItem("nip", res.data.user.nip);
            localStorage.setItem("mapel", res.data.user.mapel || `-`);
            localStorage.setItem("sekolah", res.data.user.sekolah || `-`);
            localStorage.setItem("foto", res.data.user.foto || `User_Profile.png`);
            localStorage.setItem("created_at", res.data.user.created_at);
            localStorage.setItem("updated_at", res.data.user.updated_at);

            return navigate("/dashboard");
        }).catch((err) => {
            setIsLoading(false);

            if (err.response?.data.message) return alert(err.response.data.message);

            return alert("Internal Server Error. Please contact the development team!");
        });
        return 1;
    };

    return (
        <section id="login" className="login">
            <Container className="d-flex flex-column align-items-center justify-content-center">
                <Icon.Journal size={100} color="#2099FF" />
                <form method="POST" onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingInput" label="NIP">
                        <Form.Control type="number" placeholder="123456789012345678" onChange={(e) => setNipValue(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingPassword" label="Password">
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordValue(e.target.value)} />
                    </FloatingLabel>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <img src={Loading} alt="" width={20} /> : null}
                        Login
                    </Button>
                </form>
                <p className="text-register">Tidak punya akun?{" "}
                    <span className="text-primary" onClick={() => navigate("/auth/register")}>
                        Buat akun
                    </span>
                </p>
            </Container>
        </section>
    );
};

export default Login;
