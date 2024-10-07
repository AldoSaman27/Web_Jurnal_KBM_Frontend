import "./Lihat.style.css";

// React
import { useEffect, useState } from "react";

// React Bootstrap
import { Container, Form, Button } from 'react-bootstrap'

// Date FNS
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

// React Router Dom
import { useNavigate } from "react-router-dom";

// Sweet Alert
import Swal from "sweetalert2";

// Axios
import axios from "axios";

const PageLihatJurnal = () => {
    const navigate = useNavigate();

    const [isPageLoading, setIsPageLoading] = useState(true);
    const [isPageUpdate, setIsPageUpdate] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [jurnalData, setJurnalData] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) return navigate("/user/login");
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        axios.defaults.headers.common['Accept'] = 'application/json';
        axios.get(`${process.env.REACT_APP_API_URL}/api/user`).then(() => {
            setIsPageLoading(false);
        }).catch(() => {
            return navigate("/user/login");
        })

        const today = new Date();  
        const month = today.getMonth() + 1;    
        const years = today.getFullYear();

        axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
        axios.defaults.headers.common["Accept"] = "application/json";
        axios.get(`${process.env.REACT_APP_API_URL}/api/jurnal/index/${localStorage.getItem("user_nip")}/${localStorage.getItem("lihat_jurnal_month") || month}/${localStorage.getItem("lihat_jurnal_years") || years}`).then((res) => {
            setJurnalData(res.data.jurnal);
            console.log(res.data.jurnal);
        }).catch(() => {
            Swal.fire({
                title: "Opss!",
                text: "Internal Server Error. Please contact the development team!",
                icon: "error",
                showCancelButton: false,
                confirmButtonText: "Oke",
            });
        })

        setIsPageUpdate(false);
    }, [navigate, isPageUpdate]);

    const handleHariTanggalChange = (e) => {
        const dateValue = e.target.value;
        const dateValueArray = dateValue.split("-");

        localStorage.setItem("lihat_jurnal_month", dateValueArray[1]);
        localStorage.setItem("lihat_jurnal_years", dateValueArray[0]);

        setIsPageUpdate(true);
        return 1;
    }

    const handleJurnalEdit = (id) => {
        Swal.fire({
            title: "Coming Soon!",
            icon: "info",
            showCancelButton: false,
            confirmButtonText: "Oke",
        });
        return 1;
    }
    
    const handleJurnalDelete = (id) => {
        Swal.fire({
            title: `Are you sure you want to delete this journal? (ID: ${id})`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
        }).then((r) => {
            if (r.isConfirmed) {
                setIsLoading(true);

                axios.defaults.headers.common["Authorization"] = `Bearer ${localStorage.getItem("accessToken")}`;
                axios.defaults.headers.common["Accept"] = "application/json";
                axios.delete(`${process.env.REACT_APP_API_URL}/api/jurnal/destroy/${id}`).then(() => {
                    setIsLoading(false);
                    setIsPageUpdate(true);
                    
                    return Swal.fire({
                        title: "Success!",
                        text: "Jurnal has been deleted successfully.",
                        icon: "success",
                        showCancelButton: false,
                        confirmButtonText: "Oke",
                    })
                }).catch((err) => {
                    setIsLoading(false);
                    
                    if (err.response.status === 404) {
                        return Swal.fire({
                            title: "Opss!",
                            text: err.response.data.message,
                            icon: "error",
                            showCancelButton: false,
                            confirmButtonText: "Oke",
                        })
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
            }
        })
        return 1;
    }

    if (!isPageLoading) return (
        <section id="lihat-jurnal" className="lihat-jurnal">
            <Container className="d-flex flex-column">
                <header>
                    <h3 className="text-primary">Lihat Jurnal</h3>
                    <Form.Control type="date" placeholder="Hari / Tanggal" onChange={handleHariTanggalChange} />
                </header>
                <main>
                    {jurnalData.map((item, index) => (
                        <div className="jurnal-card" key={index}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Hari / Tanggal</td>
                                        <td>:</td>
                                        <td>{format(new Date(item.hari_tanggal), "EEEE, dd MMMM yyyy", { locale: id })}</td>
                                    </tr>
                                    <tr>
                                        <td>Jam Pembelajaran</td>
                                        <td>:</td>
                                        <td>{item.jam_pembelajaran}</td>
                                    </tr>
                                    <tr>
                                        <td>Kelas</td>
                                        <td>:</td>
                                        <td>{item.kelas}</td>
                                    </tr>
                                    <tr>
                                        <td>Kehadiran</td>
                                        <td>:</td>
                                        <td>{item.kehadiran}</td>
                                    </tr>
                                    <tr>
                                        <td>Uraian Kegiatan</td>
                                        <td>:</td>
                                        <td>{item.uraian_kegiatan}</td>
                                    </tr>
                                    {item.materi && (
                                        <tr>
                                            <td>Materi</td>
                                            <td>:</td>
                                            <td>{item.materi}</td>
                                        </tr>
                                    )}
                                    {item.tujuan_pembelajaran && (
                                        <tr>
                                            <td>Tujuan Pembelajaran</td>
                                            <td>:</td>
                                            <td>{item.tujuan_pembelajaran}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                            <img src={`${process.env.REACT_APP_API_URL}/storage/activity-photos/${item.foto_kegiatan}`} alt="" />
                            <div className="jurnal-card-footer">
                                <Button variant="primary" onClick={() => handleJurnalEdit(item.id)}>Edit</Button>
                                <Button variant="danger" onClick={() => handleJurnalDelete(item.id)} disabled={isLoading}>Delete</Button>
                            </div>
                        </div>
                    ))}
                </main>
            </Container>
        </section>
    )
}

export default PageLihatJurnal