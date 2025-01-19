import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Resistor} from "modules/types.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addResistorToCalculation, fetchResistors} from "store/slices/resistorsSlice.ts";
import {removeResistorFromDraftCalculation, updateResistorValue} from "store/slices/calculationsSlice.ts";

type Props = {
    resistor: T_Resistor,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean,
}

const ResistorCard = ({resistor,  showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.calculations)

    const [local_count, setLocal_count] = useState(resistor.count)
    
    const location = useLocation()

    const isCalculationPage = location.pathname.includes("calculations")

    const handeAddToDraftCalculation = async () => {
        await dispatch(addResistorToCalculation(resistor.id))
        await dispatch(fetchResistors())
    }

    const handleRemoveFromDraftCalculation = async () => {
        await dispatch(removeResistorFromDraftCalculation(resistor.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updateResistorValue({
            resistor_id: resistor.id,
            count: local_count
        }))
    }

    if (isCalculationPage) {
        return (
            <Card key={resistor.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={`http://localhost:3000/api/resistors/${resistor.id}/image`}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {resistor.name}
                            </CardTitle>
                            <CardText>
                                Сопротивление: {resistor.resistance} Ом
                            </CardText>
                            <CustomInput label="Количество" type="number" value={local_count} setValue={setLocal_count} disabled={!editMM || is_superuser} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/resistors/${resistor.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftCalculation}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={resistor.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={`http://localhost:3000/api/resistors/${resistor.id}/image`}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {resistor.name}
                </CardTitle>
                <CardText>
                    Сопротивление: {resistor.resistance} Ом
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/resistors/${resistor.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftCalculation}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default ResistorCard