import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Resistor} from "src/modules/types.ts";
import ResistorCard from "components/ResistorCard";
import {ResistorMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";

type Props = {
    resistors: T_Resistor[],
    setResistors: React.Dispatch<React.SetStateAction<T_Resistor[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    resistorName: string,
    setResistorName: React.Dispatch<React.SetStateAction<string>>
}

const ResistorsListPage = ({resistors, setResistors, isMock, setIsMock, resistorName, setResistorName}:Props) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/resistors/?resistor_name=${resistorName.toLowerCase()}`)
            const data = await response.json()
            setResistors(data.resistors)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setResistors(ResistorMocks.filter(resistor => resistor.name.toLowerCase().includes(resistorName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={resistorName} onChange={(e) => setResistorName(e.target.value)} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {resistors?.map(resistor => (
                    <Col key={resistor.id} xs="4">
                        <ResistorCard resistor={resistor} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ResistorsListPage