import "./Dashboard.style.css";

// React
import { useEffect, useState } from "react";

// React Bootstrap Icons
import * as Icon from "react-bootstrap-icons";

// React Bootstrap
import { Container, Button } from "react-bootstrap";

// React Router Dom
import { useNavigate } from "react-router-dom";

// Axios
import axios from "axios";

const PageDashboard = () => {
    const navigate = useNavigate();

    const [isPageLoading, setIsPageLoading] = useState(true);

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
                            <Button>
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
        </section>
    );
};

export default PageDashboard;