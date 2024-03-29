import "../Styles/Dashboard.css";

import React from "react";
import * as Icon from "react-bootstrap-icons";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <section id="dashboard" className="dashboard">
      <Container>
        <div className="box-user">
          <div className="image">
            <img
              src={`${
                process.env.REACT_APP_API_URL
              }/uploads/foto/${localStorage.getItem("foto")}`}
              alt=""
            />
          </div>
          <div className="profile">
            <h5>{localStorage.getItem("name")}</h5>
            <hr />
            <p>{localStorage.getItem("nip")}</p>
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
              <Button onClick={() => navigate("/settings")}>
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

export default Dashboard;
