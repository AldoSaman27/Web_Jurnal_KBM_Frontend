import "./Buat.style.css";

// Assets
import Loading from "../../../Assets/loading_white.svg";

// React
import React, { useEffect, useState } from "react";

// React Bootstrap
import { Button, Container, Form, InputGroup } from "react-bootstrap";

// Axios
import axios from "axios";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Sweet Alert
import Swal from "sweetalert2";

const PageBuatJurnal = () => {
    const navigate = useNavigate();

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [hariTanggalValue, setHariTanggalValue] = useState("");
    const [jamPelajaranValue, setJamPelajaranValue] = useState("");
    const [kelasValue, setKelasValue] = useState("");
    const [siswaHadirValue, setSiswaHadirValue] = useState("");
    const [siswaTanpaKabarValue, setSiswaTanpaKabarValue] = useState("");
    const [siswaSakitValue, setSiswaSakitValue] = useState("");
    const [siswaIzinValue, setSiswaIzinValue] = useState("");
    const [uraianKegiatanValue, setUraianKegiatanValue] = useState("");
    const [materiValue, setMateriValue] = useState("");
    const [tujuanPembelajaranValue, setTujuanPembelajaranValue] = useState("");
    const [fotoKegiatanFile, setFotoKegiatanFile] = useState(null);
    const [fotoKegiatanPreview, setFotoKegiatanPreview] = useState(null);

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

    const handleFotoKegiatanChange = (e) => {
        setFotoKegiatanFile(e.target.files[0]);

        const imageURL = URL.createObjectURL(e.target.files[0]);
        setFotoKegiatanPreview(imageURL);
        return 1;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (hariTanggalValue === "" || hariTanggalValue.length === 0 || hariTanggalValue === null || hariTanggalValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Hari / Tanggal is required!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (jamPelajaranValue === "" || jamPelajaranValue.length === 0 || jamPelajaranValue === null || jamPelajaranValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Jam Pelajaran is required!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (kelasValue === "" || kelasValue.length === 0 || kelasValue === null || kelasValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Kelas is required!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (siswaHadirValue === "" || siswaHadirValue.length === 0 || siswaHadirValue === null || siswaHadirValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Siswa Hadir is required!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (siswaTanpaKabarValue === "" || siswaTanpaKabarValue.length === 0 || siswaTanpaKabarValue === null || siswaTanpaKabarValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Siswa Tanpa Kabar is required!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (siswaSakitValue === "" || siswaSakitValue.length === 0 || siswaSakitValue === null || siswaSakitValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Siswa Sakit is required!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (siswaIzinValue === "" || siswaIzinValue.length === 0 || siswaIzinValue === null || siswaIzinValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Siswa Izin is required!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (uraianKegiatanValue === "" || uraianKegiatanValue.length === 0 || uraianKegiatanValue === null || uraianKegiatanValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Uraian Kegiatan is required!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (fotoKegiatanFile === "" || fotoKegiatanFile === 0 || fotoKegiatanFile === null || fotoKegiatanFile === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Foto Kegiatan is required!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (!fotoKegiatanFile.type.includes("image")) {
            return Swal.fire({
                title: "Opss!",
                text: "Foto Kegiatan: Only image files are allowed!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append("nip", localStorage.getItem("user_nip"));
        formData.append("hari_tanggal", hariTanggalValue);
        formData.append("jam_pembelajaran", jamPelajaranValue);
        formData.append("kelas", kelasValue);
        formData.append("kehadiran", `${siswaHadirValue} Hadir, ${siswaTanpaKabarValue} Tanpa Kabar, ${siswaSakitValue} Sakit, ${siswaIzinValue} Izin`);
        formData.append("uraian_kegiatan", uraianKegiatanValue);
        formData.append("materi", materiValue);
        formData.append("tujuan_pembelajaran", tujuanPembelajaranValue);
        formData.append("foto_kegiatan", fotoKegiatanFile);

        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
        axios.defaults.headers.common["Accept"] = "application/json";
        await axios.post(`${process.env.REACT_APP_API_URL}/api/jurnal/store`, formData).then((res) => {
            setIsLoading(false);
            console.log(res);

            return Swal.fire({
                title: "Success!",
                text: "Jurnal has been created successfully.",
                icon: "success",
                showCancelButton: false,
                confirmButtonText: "Oke",
            }).then(() => navigate("/dashboard"));            
        }).catch((err) => {
            setIsLoading(false);
            console.log(err);

            if (err.response.status === 422) {
                return Swal.fire({
                    title: err.response.data.message,
                    text: err.response.data.errors.nip || err.response.data.errors.hari_tanggal || err.response.data.errors.jam_pembelajaran || err.response.data.errors.kelas || err.response.data.errors.kehadiran || err.response.data.errors.uraian_kegiatan || err.response.data.errors.materi || err.response.data.errors.tujuan_pembelajaran || err.response.data.errors.foto_kegiatan,
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
        });
        return 1;
    };

    if (!isPageLoading) return (
        <section id="buat-jurnal" className="buat-jurnal">
            <Container className="d-flex flex-column">
                <h3 className="text-primary">Buat Jurnal</h3>
                <form method="POST" onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
                        <Form.Label>Hari / Tanggal</Form.Label>
                        <Form.Control type="date" placeholder="Hari / Tanggal" onChange={(e) => setHariTanggalValue(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
                        <Form.Label>Jam Pembelajaran</Form.Label>
                        <Form.Control type="text" placeholder="Jam Pembelajaran" onChange={(e) => setJamPelajaranValue(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
                        <Form.Label>Kelas</Form.Label>
                        <Form.Control type="text" placeholder="Kelas" onChange={(e) => setKelasValue(e.target.value)} />
                    </Form.Group>
                    <Form.Label>Kehadiran</Form.Label>
                    <InputGroup className="mb-3">
                        <Form.Control type="number" aria-label="Hadir" placeholder="Hadir" onChange={(e) => setSiswaHadirValue(e.target.value)} />
                        <Form.Control type="number" aria-label="Tanpa Kabar" placeholder="Tanpa Kabar" onChange={(e) => setSiswaTanpaKabarValue(e.target.value)} />
                        <Form.Control type="number" aria-label="Sakit" placeholder="Sakit" onChange={(e) => setSiswaSakitValue(e.target.value)} />
                        <Form.Control type="number" aria-label="Izin" placeholder="Izin" onChange={(e) => setSiswaIzinValue(e.target.value)}/>
                    </InputGroup>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
                        <Form.Label>Uraian Kegiatan</Form.Label>
                        <Form.Control type="text" placeholder="Uraian Kegiatan" onChange={(e) => setUraianKegiatanValue(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
                        <Form.Label>Materi</Form.Label>
                        <Form.Control type="text" placeholder="Materi" onChange={(e) => setMateriValue(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput">
                        <Form.Label>Tujuan Pembelajaran</Form.Label>
                        <Form.Control type="text" placeholder="Tujuan Pembelajaran" onChange={(e) => setTujuanPembelajaranValue(e.target.value)}/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formFile">
                        <Form.Label>Foto Kegiatan</Form.Label>
                        <Form.Control type="file" accept="image/*" onChange={handleFotoKegiatanChange} />
                    </Form.Group>

                    <img src={fotoKegiatanPreview} alt="" className="foto-kegiatan" />

                    <Button type="submit" disabled={isLoading}>{isLoading ? <img src={Loading} alt="" width={20} /> : null} Submit</Button>
                </form>
            </Container>
        </section>
    );
};

export default PageBuatJurnal;
