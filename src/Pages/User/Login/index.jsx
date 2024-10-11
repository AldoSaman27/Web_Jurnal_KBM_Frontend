import "./Login.style.css";

// Axios
import axios from "axios";

// React
import { useState } from "react";

// React Bootstrap Icons
import * as Icon from "react-bootstrap-icons";

// React Bootstrap
import { Button, Container, FloatingLabel, Form } from "react-bootstrap";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Assets
import Loading from "../../../Assets/loading_white.svg";

// Sweet Alert
import Swal from "sweetalert2";

const PageLogin = () => {
    const navigate = useNavigate();

    const [nipValue, setNipValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nipValue === "" || nipValue.length < 18 || nipValue === null || nipValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "NIP is required or NIP must be 18 digits!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (passwordValue === "" || passwordValue.length < 5 || passwordValue === null || passwordValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Password is required or Password must be 5 digits!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("nip", nipValue);
        formData.append("password", passwordValue);

        axios.defaults.headers.common["Accept"] = "application/json";
        await axios.post(`${process.env.REACT_APP_API_URL}/api/user/login`, formData).then((res) => {
            setIsLoading(false);

            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("id", res.data.user.id.toString());
            localStorage.setItem("user_nama", res.data.user.nama);
            localStorage.setItem("user_nip", res.data.user.nip);
            localStorage.setItem("user_mata_pelajaran", res.data.user.mata_pelajaran);
            localStorage.setItem("user_sekolah", res.data.user.sekolah);
            localStorage.setItem("user_foto_profil", res.data.user.foto_profil);
            localStorage.setItem("user_created_at", res.data.user.created_at);
            localStorage.setItem("user_updated_at", res.data.user.updated_at);

            return navigate("/dashboard");
        }).catch((err) => {
            setIsLoading(false);

            if (err.response.status === 401) { 
                return Swal.fire({
                    title: "Opss!",
                    text: err.response.data.message,
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "Oke",
                });
            } else if (err.response.status === 422) {
                return Swal.fire({
                    title: err.response.data.message,
                    text: err.response.data.errors.nip || err.response.data.errors.password,
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "Oke",
                });
            } else {
                return Swal.fire({
                    title: "Opss!",
                    text: "Internal Server Error. Please contact the development team!",
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "Oke",
                });
            }
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
                    <Button type="submit" disabled={isLoading}>{isLoading ? <img src={Loading} alt="" width={20} /> : null} Masuk</Button>
                </form>
                <p className="text-register">Tidak punya akun?{" "}
                    <span className="text-primary" onClick={() => navigate("/user/register")}>
                        Buat akun
                    </span>
                </p>
            </Container>
        </section>
    );
};

export default PageLogin;
