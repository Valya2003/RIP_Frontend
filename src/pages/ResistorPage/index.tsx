import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {T_Resistor} from "src/modules/types.ts";
import {Col, Container, Row} from "reactstrap";
import {ResistorMocks} from "src/modules/mocks.ts";
import mockImage from "assets/mock.png";

type Props = {
    selectedResistor: T_Resistor | null,
    setSelectedResistor: React.Dispatch<React.SetStateAction<T_Resistor | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const ResistorPage = ({selectedResistor, setSelectedResistor, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/resistors/${id}`)
            const data = await response.json()
            setSelectedResistor(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedResistor(ResistorMocks.find(resistor => resistor?.id == parseInt(id as string)) as T_Resistor)
    }

    const [image, setImage] = useState<string>()

    const fetchImage = async () => {
        const response = await fetch(`/api/resistors/${id}/image`)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setImage(url)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
            fetchImage()
        } else {
            createMock()
        }

        return () => setSelectedResistor(null)
    }, []);

    if (!selectedResistor) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <img
                        alt=""
                        src={isMock ? mockImage as string : image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedResistor.name}</h1>
                    <p className="fs-5">Описание: {selectedResistor.description}</p>
                    <p className="fs-5">Сопротивление: {selectedResistor.resistance} Ом</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ResistorPage