import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import ResistorCard from "components/ResistorCard";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {useAppSelector} from "src/store/store.ts";
import {updateResistorName} from "src/store/slices/resistorsSlice.ts";
import {T_Resistor} from "modules/types.ts";
import {ResistorMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";

type Props = {
    resistors: T_Resistor[],
    setResistors: React.Dispatch<React.SetStateAction<T_Resistor[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const ResistorsListPage = ({resistors, setResistors, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {resistor_name} = useAppSelector((state) => state.resistors)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateResistorName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setResistors(ResistorMocks.filter(resistor => resistor.name.toLowerCase().includes(resistor_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchResistors()
    }

    const fetchResistors = async () => {
        try {
            const response = await fetch(`http://localhost:8000/api/resistors/?resistor_name=${resistor_name.toLowerCase()}`)
            const data = await response.json()
            setResistors(data.resistors)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchResistors()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={resistor_name} onChange={handleChange} placeholder="Поиск..."></Input>
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
                    <Col key={resistor.id} sm="12" md="6" lg="4">
                        <ResistorCard resistor={resistor} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ResistorsListPage