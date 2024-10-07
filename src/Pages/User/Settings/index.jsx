import "./Settings.style.css";

// Assets
import Loading from "../../../Assets/loading_white.svg";

// React
import { useEffect, useState } from "react";

// React Bootstrap
import { Form, Button, Container } from "react-bootstrap";

// Sweet Alert
import Swal from "sweetalert2";

// Axios
import axios from "axios";

// React Router Dom
import { useNavigate } from "react-router-dom";

const Settings = () => {
    const navigate = useNavigate();

    const returnUserFotoProfil = () => {
        if (localStorage.getItem("user_foto_profil") === "null" || localStorage.getItem("user_foto_profil") === "undefined") {
            return `${process.env.REACT_APP_API_URL}/storage/profile-picture/User_Profile.png`;
        } else {
            return `${process.env.REACT_APP_API_URL}/storage/profile-picture/${localStorage.getItem("user_foto_profil")}`;
        }
    }

    const returnUserNama = () => {
        if (localStorage.getItem("user_nama") === "null" || localStorage.getItem("user_nama") === "undefined") {
            return ``;
        } else {
            return localStorage.getItem("user_nama");
        }
    }

    const returnUserMataPelajaran = () => {
        if (localStorage.getItem("user_mata_pelajaran") === "null" || localStorage.getItem("user_mata_pelajaran") === "undefined") {
            return ``;
        } else {
            return localStorage.getItem("user_mata_pelajaran");
        }
    }

    const returnUserSekolah = () => {
        if (localStorage.getItem("user_sekolah") === "null" || localStorage.getItem("user_sekolah") === "undefined") {
            return ``;
        } else {
            return localStorage.getItem("user_sekolah");
        }
    }

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [fotoProfileFile, setFotoProfileFile] = useState(null);
    const [fotoProfilePreview, setFotoProfilePreview] = useState(returnUserFotoProfil());
    const [namaValue, setNamaValue] = useState(returnUserNama());
    const [nipValue, setNipValue] = useState(localStorage.getItem("user_nip"));
    const [mataPelajaranValue, setMataPelajaranValue] = useState(returnUserMataPelajaran());
    const [sekolahValue, setSekolahValue] = useState(returnUserSekolah());

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) return navigate("/user/login");
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.get(`${process.env.REACT_APP_API_URL}/api/user`).then(() => {
            setIsPageLoading(false);
        }).catch(() => {
            return navigate("/user/login");
        })
    }, [navigate]);

    const handleFotoProfileChange = (e) => {
        if (!e.target.files[0]) return 1;

        setFotoProfileFile(e.target.files[0]);

        const imageURL = URL.createObjectURL(e.target.files[0]);
        setFotoProfilePreview(imageURL);
        return 1;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // if (namaValue === "" || namaValue.length === 0 || namaValue === null || namaValue === undefined) {
        //     return Swal.fire({
        //         title: "Opss!",
        //         text: "Nama is required!",
        //         icon: "error",
        //         showCancelButton: false,
        //         confirmButtonText: "Oke",
        //     });
        // } else if (mataPelajaranValue === "" || mataPelajaranValue.length === 0 || mataPelajaranValue === null || mataPelajaranValue === undefined) {
        //     return Swal.fire({
        //         title: "Opss!",
        //         text: "Mata Pelajaran is required!",
        //         icon: "error",
        //         showCancelButton: false,
        //         confirmButtonText: "Oke",
        //     });
        // } else if (sekolahValue === "" || sekolahValue.length === 0 || sekolahValue === null || sekolahValue === undefined) {
        //     return Swal.fire({
        //         title: "Opss!",
        //         text: "Sekolah is required!",
        //         icon: "error",
        //         showCancelButton: false,
        //         confirmButtonText: "Oke",
        //     });
        // }

        setIsLoading(true);

        const formData = new FormData();
        if (fotoProfileFile) formData.append("foto_profil", fotoProfileFile);
        if (namaValue) formData.append("nama", namaValue);
        if (mataPelajaranValue) formData.append("mata_pelajaran", mataPelajaranValue);
        if (sekolahValue) formData.append("sekolah", sekolahValue);

        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        axios.defaults.headers.common['Accept'] = "application/json";
        axios.post(`${process.env.REACT_APP_API_URL}/api/user/update/${localStorage.getItem("user_nip")}`, formData).then((res) => {
            setIsLoading(false);

            localStorage.setItem("id", res.data.user.id.toString());
            localStorage.setItem("user_nama", res.data.user.nama);
            localStorage.setItem("user_nip", res.data.user.nip);
            localStorage.setItem("user_mata_pelajaran", res.data.user.mata_pelajaran);
            localStorage.setItem("user_sekolah", res.data.user.sekolah);
            localStorage.setItem("user_foto_profil", res.data.user.foto_profil);
            localStorage.setItem("user_created_at", res.data.user.created_at);
            localStorage.setItem("user_updated_at", res.data.user.updated_at);
            
            return Swal.fire({
                title: "Success!",
                text: "User data has been updated successfully.",
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        }).catch((err) => {
            setIsLoading(false);

            if (err.response.status === 422) {
                return Swal.fire({
                    title: err.response.data.message,
                    text: err.response.data.errors.foto_profil || err.response.data.errors.nama || err.response.data.errors.mata_pelajaran || err.response.data.errors.sekolah,
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

    if (!isPageLoading) return (
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