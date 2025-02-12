import {useAppSelector} from "store/store.ts";
import {Card, Col, Row} from "reactstrap";
import CalculationCard from "components/CalculationCard/CalculationCard.tsx";
import {T_Calculation} from "modules/types.ts";
import "./CalculationTable.css"

type Props = {
    calculations:T_Calculation[]
}

const CalculationsTable = ({calculations}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    return (
        <div className="mb-5">
            <div className="mb-2" style={{fontWeight: "bold"}}>
                <Card style={{padding: "10px"}}>
                    <Row>
                        <Col md={1}>
                            №
                        </Col>
                        <Col md={1}>
                            Статус
                        </Col>
                        <Col md={1}>
                            Сила тока
                        </Col>
                        <Col>
                            Дата создания
                        </Col>
                        <Col>
                            Дата формирования
                        </Col>
                        <Col>
                            Дата завершения
                        </Col>
                        <Col>
                            QR
                        </Col>
                        {!is_superuser &&
                            <Col>
                                Действие
                            </Col>
                        }
                        {is_superuser &&
                            <>
                                <Col>
                                    Пользователь
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                            </>
                        }
                    </Row>
                </Card>
            </div>
            <div className="d-flex flex-column gap-2">
                {calculations.map((calculation, index) => (
                    <CalculationCard calculation={calculation} index={index} key={index}/>
                ))}
            </div>
        </div>
    )
};

export default CalculationsTable