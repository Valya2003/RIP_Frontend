import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchResistors, updateResistorName} from "store/slices/resistorsSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import ResistorsTable from "components/ResistorsTable/ResistorsTable.tsx";

const ResistorsTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {resistors, resistor_name} = useAppSelector((state) => state.resistors)

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

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

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
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/resistors/add">
                        <Button color="primary">Новый резистор</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {resistors.length > 0 ? <ResistorsTable resistors={resistors} fetchResistors={fetchResistors}/> : <h3 className="text-center mt-5">Резисторы не найдены</h3>}
            </Row>
        </Container>
    );
};

export default ResistorsTablePage