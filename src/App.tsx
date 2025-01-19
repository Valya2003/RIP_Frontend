import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import ResistorPage from "pages/ResistorPage";
import ResistorsListPage from "pages/ResistorsListPage";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import {useState} from "react";
import {T_Resistor} from "modules/types.ts";

function App() {

    const [resistors, setResistors] = useState<T_Resistor[]>([])

    const [selectedResistor, setSelectedResistor] = useState<T_Resistor | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedResistor={selectedResistor}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/resistors/" element={<ResistorsListPage resistors={resistors} setResistors={setResistors} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/resistors/:id" element={<ResistorPage selectedResistor={selectedResistor} setSelectedResistor={setSelectedResistor} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
