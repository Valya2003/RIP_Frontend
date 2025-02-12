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
import AccessDeniedPage from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import ResistorsTablePage from "pages/ResistorsTablePage/ResistorsTablePage.tsx";
import ResistorEditPage from "pages/ResistorEditPage/ResistorEditPage.tsx";
import ResistorAddPage from "pages/ResistorAddPage/ResistorAddPage.tsx";

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
                        <Route path="/resistors-table/" element={<ResistorsTablePage />} />
                        <Route path="/resistors/:id/" element={<ResistorPage />} />
                        <Route path="/resistors/:id/edit" element={<ResistorEditPage />} />
                        <Route path="/resistors/add" element={<ResistorAddPage />} />
                        <Route path="/calculations/" element={<CalculationsPage />} />
                        <Route path="/calculations/:id/" element={<CalculationPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
