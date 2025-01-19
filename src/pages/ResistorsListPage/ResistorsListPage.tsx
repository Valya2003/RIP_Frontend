import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchResistors, updateResistorName} from "store/slices/resistorsSlice.ts";
import ResistorCard from "components/ResistorCard/ResistorCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const ResistorsListPage = () => {

    const dispatch = useAppDispatch()

    const {resistors, resistor_name} = useAppSelector((state) => state.resistors)

    const {is_authenticated} = useAppSelector((state) => state.user)

    const {draft_calculation_id, resistors_count} = useAppSelector((state) => state.calculations)

    const hasDraft = draft_calculation_id != null

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updateResistorName(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchResistors())
    }

    useEffect(() => {
        dispatch(fetchResistors())
    }, [])

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
                {is_authenticated &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_calculation_id={draft_calculation_id} resistors_count={resistors_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {resistors?.map(resistor => (
                    <Col key={resistor.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <ResistorCard resistor={resistor} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default ResistorsListPage