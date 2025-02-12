import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchResistor, removeSelectedResistor} from "store/slices/resistorsSlice.ts";

const ResistorPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {resistor} = useAppSelector((state) => state.resistors)

    useEffect(() => {
        dispatch(fetchResistor(id))
        return () => dispatch(removeSelectedResistor())
    }, []);

    if (!resistor) {
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
                        src={resistor.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{resistor.name}</h1>
                    <p className="fs-5">Описание: {resistor.description}</p>
                    <p className="fs-5">Сопротивление: {resistor.resistance} Ом</p>
                </Col>
            </Row>
        </Container>
    );
};

export default ResistorPage