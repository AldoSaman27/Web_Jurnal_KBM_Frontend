import "../../Styles/Register.css";

import React, { useState } from "react";
import * as Icon from "react-bootstrap-icons";
import { Container, FloatingLabel, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Assets
import Loading from "../../Assets/loading_white.svg";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [nipValue, setNipValue] = useState("");
  const [mataPelajaranValue, setMataPelajaranValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nameValue === "" || nameValue.length === 0) {
      return alert("Name is required!");
    } else if (nipValue === "" || nipValue.length < 18) {
      return alert("NIP is required or NIP must be 18 digits!");
    } else if (mataPelajaranValue === "" || mataPelajaranValue.length === 0) {
      return alert("Mapel is required!");
    } else if (passwordValue === "" || passwordValue.length < 5) {
      return alert("Password is required or Password must be 5 digits!");
    } else if (confirmPasswordValue === "" || confirmPasswordValue.length < 5) {
      return alert(
        "Confirm Password is required or Confirm Password must be 5 digits!"
      );
    } else if (passwordValue !== confirmPasswordValue) {
      return alert("Password and Confirm Password must be the same!");
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("name", nameValue);
    formData.append("nip", nipValue);
    formData.append("mapel", mataPelajaranValue);
    formData.append("password", passwordValue);

    axios.defaults.headers.common["Accept"] = "application/json";
    await axios
      .post(`${process.env.REACT_APP_API_URL}/api/auth/register`, formData)
      .then((res) => {
        setIsLoading(false);

        localStorage.setItem("accessToken", res.data.user.accessToken);
        localStorage.setItem("id", res.data.user.id.toString());
        localStorage.setItem("name", res.data.user.name);
        localStorage.setItem("nip", res.data.user.nip);
        localStorage.setItem("mapel", res.data.user.mapel);
        localStorage.setItem("foto", res.data.user.foto);
        localStorage.setItem("email", res.data.user.email);
        localStorage.setItem("created_at", res.data.user.created_at);
        localStorage.setItem("updated_at", res.data.user.updated_at);

        alert("Your account has been created.");

        return navigate("/");
      })
      .catch((err) => {
        setIsLoading(false);

        return alert(
          "Internal Server Error. Please contact the development team!"
        );
      });
    return 1;
  };

  return (
    <section id="register" className="register">
      <Container className="d-flex flex-column align-items-center justify-content-center">
        <Icon.Journal size={100} color="#2099FF" />
        <form method="POST" onSubmit={handleSubmit}>
          <FloatingLabel controlId="floatingInput" label="Name">
            <Form.Control
              type="text"
              placeholder="Name"
              onChange={(e) => setNameValue(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="NIP">
            <Form.Control
              type="number"
              placeholder="NIP"
              onChange={(e) => setNipValue(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Mata Pelajaran">
            <Form.Control
              type="text"
              placeholder="Mata Pelajaran"
              onChange={(e) => setMataPelajaranValue(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Password">
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={(e) => setPasswordValue(e.target.value)}
            />
          </FloatingLabel>
          <FloatingLabel controlId="floatingInput" label="Confirm Password">
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPasswordValue(e.target.value)}
            />
          </FloatingLabel>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <img src={Loading} alt="" width={20} /> : null}
            Register
          </Button>
        </form>
        <p className="text-login">
          Punya akun?{" "}
          <span
            className="text-primary"
            onClick={() => navigate("/auth/login")}
          >
            Masuk
          </span>
        </p>
      </Container>
    </section>
  );
};

export default Register;
