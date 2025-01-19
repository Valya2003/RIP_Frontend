import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import ResistorsListPage from "pages/ResistorsListPage/ResistorsListPage.tsx";
import ResistorPage from "pages/ResistorPage/ResistorPage.tsx";
import CalculationsPage from "pages/CalculationsPage/CalculationsPage.tsx";
import CalculationPage from "pages/CalculationPage/CalculationPage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/resistors/" element={<ResistorsListPage />} />
                        <Route path="/resistors/:id/" element={<ResistorPage />} />
                        <Route path="/calculations/" element={<CalculationsPage />} />
                        <Route path="/calculations/:id/" element={<CalculationPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
