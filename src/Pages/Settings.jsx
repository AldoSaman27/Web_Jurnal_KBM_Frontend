import "../Styles/Settings.css";

// Assets
import Loading from "../Assets/loading_white.svg";

// React Bootstrap
import { Container } from 'react-bootstrap'

// React
import { useState } from "react";

// React Bootstrap
import { Form, Button } from "react-bootstrap";

// Sweet Alert
import Swal from "sweetalert2";

// Axios
import axios from "axios";

const Settings = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [fotoProfileFile, setFotoProfileFile] = useState(null);
    const [fotoProfilePreview, setFotoProfilePreview] = useState(`${process.env.REACT_APP_API_URL}/storage/profile-picture/${localStorage.getItem("foto")}`);
    const [namaValue, setNamaValue] = useState(localStorage.getItem("name"));
    const [nipValue, setNipValue] = useState(localStorage.getItem("nip"));
    const [mataPelajaranValue, setMataPelajaranValue] = useState(localStorage.getItem("mapel"));
    const [sekolahValue, setSekolahValue] = useState(localStorage.getItem("sekolah"));

    const handleFotoProfileChange = (e) => {
        if (!e.target.files[0]) return 1;

        setFotoProfileFile(e.target.files[0]);

        const imageURL = URL.createObjectURL(e.target.files[0]);
        setFotoProfilePreview(imageURL);
        return 1;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        if (namaValue === "" || namaValue.length === 0 || namaValue === null || namaValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Nama is required!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (mataPelajaranValue === "" || mataPelajaranValue.length === 0 || mataPelajaranValue === null || mataPelajaranValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Mata Pelajaran is required!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (sekolahValue === "" || sekolahValue.length === 0 || sekolahValue === null || sekolahValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Sekolah is required!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        }

        setIsLoading(true);

        const formData = new FormData();
        if (fotoProfileFile) formData.append("foto", fotoProfileFile);
        if (namaValue) formData.append("name", namaValue);
        if (mataPelajaranValue) formData.append("mapel", mataPelajaranValue);
        if (sekolahValue) formData.append("sekolah", sekolahValue);

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        axios.defaults.headers.common['Accept'] = "application/json";
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/update/${localStorage.getItem("nip")}`, formData).then((res) => {
            setIsLoading(false);

            localStorage.setItem("id", res.data.user.id.toString());
            localStorage.setItem("name", res.data.user.name || `User #${res.data.user.id}`);
            localStorage.setItem("nip", res.data.user.nip);
            localStorage.setItem("mapel", res.data.user.mapel || `-`);
            localStorage.setItem("sekolah", res.data.user.sekolah || `-`);
            localStorage.setItem("foto", res.data.user.foto || `User_Profile.png`);
            localStorage.setItem("created_at", res.data.user.created_at);
            localStorage.setItem("updated_at", res.data.user.updated_at);
            
            console.log(res);
        }).catch((err) => {
            setIsLoading(false);

            if (err.response.status === 422) {
                return Swal.fire({
                    title: err.response.data.message,
                    text: err.response.data.errors.foto || err.response.data.errors.name || err.response.data.errors.mapel || err.response.data.errors.sekolah,
                    icon: "error",
                    showCancelButton: false,
                    confirmButtonText: "Oke",
                });
            } else if (err.response.status === 404) {
                return Swal.fire({
                    title: "404",
                    text: err.response.data.message,
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
        })
        return 1;
    }

    return (
        <section id="settings" className="settings">
            <Container>
                <header>
                    <h3 className="text-primary">Settings</h3>
                </header>
                <main>
                    <div className="profile">
                        <div className="image">
                            <img src={fotoProfilePreview} alt=""/>
                        </div>
                    </div>
                    <form method="POST" onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formFile">
                            <Form.Label>Foto Profile</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={handleFotoProfileChange} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
                            <Form.Label>Nama</Form.Label>
                            <Form.Control type="text" placeholder="Nama" value={namaValue} onChange={(e) => setNamaValue(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
                            <Form.Label>NIP</Form.Label>
                            <Form.Control type="number" placeholder="NIP" value={nipValue} onChange={(e) => setNipValue(e.target.value)} disabled />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
                            <Form.Label>Mata Pelajaran</Form.Label>
                            <Form.Control type="text" placeholder="Mata Pelajaran" value={mataPelajaranValue} onChange={(e) => setMataPelajaranValue(e.target.value)} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
                            <Form.Label>Sekolah</Form.Label>
                            <Form.Control type="text" placeholder="Sekolah" value={sekolahValue} onChange={(e) => setSekolahValue(e.target.value)} />
                        </Form.Group>

                        <Button type="submit" disabled={isLoading}>{isLoading ? <img src={Loading} alt="" width={20} /> : null} Save</Button>
                    </form>
                </main>
            </Container>
        </section>
    )
}

export default Settings