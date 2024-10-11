import "./Dashboard.style.css";

// Assets
import Loading from "../../Assets/loading_white.svg";

// React
import { useEffect, useState } from "react";

// React Bootstrap Icons
import * as Icon from "react-bootstrap-icons";

// React Bootstrap
import { Container, Button, Modal, Form } from "react-bootstrap";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Axios
import axios from "axios";

// Sweet Alert
import Swal from "sweetalert2";

const PageDashboard = () => {
    const navigate = useNavigate();

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [jurnalBulanValue, setJurnalBulanValue] = useState(0);
    const [jurnalTahunValue, setJurnalTahunValue] = useState(0);
    const [semesterValue, setSemesterValue] = useState("");
    const [tahunAwalValue, setTahunAwalValue] = useState(0);
    const [tahunAkhirValue, setTahunAkhirValue] = useState(0);

    const handleClose = () => {
        setShow(false);
        setJurnalBulanValue("");
        setJurnalTahunValue(0);
        setSemesterValue("");
        setTahunAwalValue(0);
        setTahunAkhirValue(0);
    };
    
    const handleShow = () => {
        setShow(true);
        setJurnalBulanValue("");
        setJurnalTahunValue(0);
        setSemesterValue("");
        setTahunAwalValue(0);
        setTahunAkhirValue(0);
    };

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

    const returnUserFotoProfil = () => {
        if (localStorage.getItem("user_foto_profil") === "null" || localStorage.getItem("user_foto_profil") === "undefined") {
            return `${process.env.REACT_APP_API_URL}/storage/profile-picture/User_Profile.png`;
        } else {
            return `${process.env.REACT_APP_API_URL}/storage/profile-picture/${localStorage.getItem("user_foto_profil")}`;
        }
    }

    const returnUserNama = () => {
        if (localStorage.getItem("user_nama") === "null" || localStorage.getItem("user_nama") === "undefined") {
            return `User #${localStorage.getItem("id")}`;
        } else {
            return localStorage.getItem("user_nama");
        }
    }

    const handleUnduhJurnal = async () => {
        if (jurnalBulanValue === "" || jurnalBulanValue.length === 0 || jurnalBulanValue === null || jurnalBulanValue === undefined) {
            return Swal.fire({
                title: 'Opss!',
                text: 'Silahkan pilih jurnal bulan terlebih dahulu!',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (jurnalTahunValue === "" || jurnalTahunValue === 0 || jurnalTahunValue === null || jurnalTahunValue === undefined) {
            return Swal.fire({
                title: 'Opss!',
                text: 'Silahkan isi jurnal tahun terlebih dahulu!',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (semesterValue === "" || semesterValue.length === 0 || semesterValue === null || semesterValue === undefined) {
            return Swal.fire({
                title: 'Opss!',
                text: 'Silahkan pilih semester terlebih dahulu!',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (tahunAwalValue === "" || tahunAwalValue === 0 || tahunAwalValue === null || tahunAwalValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Silahkan isi tahun awal pembelajaran terlebih dahulu!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        } else if (tahunAkhirValue === "" || tahunAkhirValue === 0 || tahunAkhirValue === null || tahunAkhirValue === undefined) {
            return Swal.fire({
                title: "Opss!",
                text: "Silahkan isi tahun akhir pembelajaran terlebih dahulu!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        }

        setIsLoading(true);
        
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        axios.defaults.headers.common['Accept'] = 'application/json';
        await axios.get(`${process.env.REACT_APP_API_URL}/api/jurnal/download/${localStorage.getItem("user_nip")}/${jurnalBulanValue}/${jurnalTahunValue}/${semesterValue}/${tahunAwalValue} - ${tahunAkhirValue}`).then(() => {
            setIsLoading(false);
            handleClose();
        }).catch(() => {
            setIsLoading(false);
            handleClose();
        });
        return 1;
    }

    if (!isPageLoading) return (
        <section id="dashboard" className="dashboard">
            <Container>
                <div className="box-user">
                    <div className="image">
                        <img src={returnUserFotoProfil()} alt=""/>
                    </div>
                    <div className="profile">
                        <h5>{returnUserNama()}</h5>
                        <hr size="5" color="white" />
                        <p>{localStorage.getItem("user_nip")}</p>
                    </div>
                </div>
                <div className="box-menu">
                    <div className="row row-cols-3">
                        <div className="col d-flex flex-column align-items-center justify-content-center">
                            <Button onClick={() => navigate("/jurnal/buat")}>
                                <Icon.PlusLg size={30} />
                            </Button>
                            <p>Buat Jurnal</p>
                        </div>
                        <div className="col d-flex flex-column align-items-center justify-content-center">
                            <Button onClick={() => navigate("/jurnal/lihat")}>
                                <Icon.Eye size={30} />
                            </Button>
                            <p>Lihat Jurnal</p>
                        </div>
                        <div className="col d-flex flex-column align-items-center justify-content-center">
                            <Button onClick={handleShow}>
                                <Icon.Download size={30} />
                            </Button>
                            <p>Unduh Jurnal</p>
                        </div>
                        <div className="col d-flex flex-column align-items-center justify-content-center">
                            <Button onClick={() => navigate("/user/settings")}>
                                <Icon.Gear size={30} />
                            </Button>
                            <p>Settings</p>
                        </div>
                    </div>
                </div>
            </Container>

            {/* Download Modal */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Unduh Jurnal</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="formJurnal">
                        <Form.Label>Jurnal</Form.Label>
                        <div>
                            <Form.Select onChange={(e) => setJurnalBulanValue(e.target.value)}>
                                <option disabled selected>Pilih bulan</option>
                                <option value="1">Januari</option>
                                <option value="2">Februari</option>
                                <option value="3">Maret</option>
                                <option value="4">April</option>
                                <option value="5">Mei</option>
                                <option value="6">Juni</option>
                                <option value="7">Juli</option>
                                <option value="8">Agustus</option>
                                <option value="9">September</option>
                                <option value="10">Oktober</option>
                                <option value="11">November</option>
                                <option value="12">Desember</option>
                            </Form.Select>
                            <Form.Control type="number" placeholder="Isi tahun" onChange={(e) => setJurnalTahunValue(e.target.value)} />
                        </div>
                    </Form.Group>
                    <Form.Group className="formSemester">
                        <Form.Label>Semester</Form.Label>
                        <Form.Select onChange={(e) => setSemesterValue(e.target.value)}>
                            <option disabled selected>Pilih semester</option>
                            <option value="Ganjil">Ganjil</option>
                            <option value="Genap">Genap</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="formTahunPembelajaran">
                        <Form.Label>Tahun Pembelajaran</Form.Label>
                        <div>
                            <Form.Control type="number" placeholder="Tahun awal" onChange={(e) => setTahunAwalValue(e.target.value)} />
                            <Form.Control type="number" placeholder="Tahun akhir" onChange={(e) => setTahunAkhirValue(e.target.value)} />
                        </div>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleUnduhJurnal} disabled={isLoading}>{isLoading ? <img src={Loading} alt="" width={20} /> : null} Unduh</Button>
                </Modal.Footer>
            </Modal>
        </section>
    );
};

export default PageDashboard;