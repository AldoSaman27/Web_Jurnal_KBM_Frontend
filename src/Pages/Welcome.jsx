import "../Styles/Welcome.css";

// React Bootstrap Icons
import * as Icon from "react-bootstrap-icons";

// React Bootstrap
import { Container, Button } from "react-bootstrap";

// React Router Dom
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <section id="welcome" className="welcome">
            <Container className="d-flex flex-column align-items-center justify-content-center">
                <Icon.Journal size={100} color="#2099FF" />
                <h3>Selamat datang di Jurnal!</h3>
                <p className="text-center">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Asperiores error molestiae eum architecto deleniti minus.</p>
                <Button onClick={() => navigate("/auth/login")}>Sign In</Button>
                <Button onClick={() => navigate("/auth/register")} className="btn-secondary">Sign Up</Button>
            </Container>
        </section>
    );
};

export default Welcome;
