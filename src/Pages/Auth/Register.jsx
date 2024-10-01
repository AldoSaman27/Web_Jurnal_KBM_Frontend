import "../../Styles/Register.css";

// Axios
import axios from "axios";

// React
import { useState } from "react";

// React Bootstrap Icons
import * as Icon from "react-bootstrap-icons";

// React Bootstrap
import { Container, FloatingLabel, Form, Button } from "react-bootstrap";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Assets
import Loading from "../../Assets/loading_white.svg";

// Sweet Alert
import Swal from "sweetalert2";

const Register = () => {
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(false);
    const [nipValue, setNipValue] = useState("");
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (nipValue === "" || nipValue.length < 18) {
            return Swal.fire({
                title: "Opss!",
                text: "NIP is required or NIP must be 18 digits!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (passwordValue === "" || passwordValue.length < 5) {
            return Swal.fire({
                title: "Opss!",
                text: "Password is required or Password must be 5 digits!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (confirmPasswordValue === "" || confirmPasswordValue.length < 5) {
            return Swal.fire({
                title: "Opss!",
                text: "Confirm Password is required or Confirm Password must be 5 digits!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (passwordValue !== confirmPasswordValue) {
            return Swal.fire({
                title: "Opss!",
                text: "Password and Confirm Password must be the same!",
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
        await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData).then((res) => {
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

            return Swal.fire({
                title: "Success!",
                text: "Your account has been created.",
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "Oke",
            }).then(() => navigate("/dashboard"));
        }).catch((err) => {
            setIsLoading(false);

            if (err.response.status === 422) {
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
        <section id="register" className="register">
            <Container className="d-flex flex-column align-items-center justify-content-center">
                <Icon.Journal size={100} color="#2099FF" />
                <form method="POST" onSubmit={handleSubmit}>
                    <FloatingLabel controlId="floatingInput" label="NIP">
                        <Form.Control type="number" placeholder="NIP" onChange={(e) => setNipValue(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Password">
                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPasswordValue(e.target.value)} />
                    </FloatingLabel>
                    <FloatingLabel controlId="floatingInput" label="Confirm Password">
                        <Form.Control type="password" placeholder="Confirm Password" onChange={(e) => setConfirmPasswordValue(e.target.value)} />
                    </FloatingLabel>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? <img src={Loading} alt="" width={20} /> : null}
                        Register
                    </Button>
                </form>
                <p className="text-login">Punya akun?{" "}
                    <span className="text-primary" onClick={() => navigate("/auth/login")}>
                        Masuk
                    </span>
                </p>
            </Container>
        </section>
    );
};

export default Register;
