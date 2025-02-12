import {Button, Card, Col, Row} from "reactstrap";
import {E_CalculationStatus, T_Calculation} from "modules/types.ts";
import {formatDate} from "utils/utils.ts";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {acceptCalculation, fetchCalculations, rejectCalculation} from "store/slices/calculationsSlice.ts";
import "./CalculationCard.css"

type Props = {
    calculation: T_Calculation
    index: number
}

const CalculationCard = ({calculation, index}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    const dispatch = useAppDispatch()

    const handleAcceptCalculation = async (calculation_id) => {
        await dispatch(acceptCalculation(calculation_id))
        await dispatch(fetchCalculations())
    }

    const handleRejectCalculation = async (calculation_id) => {
        await dispatch(rejectCalculation(calculation_id))
        await dispatch(fetchCalculations())
    }

    const navigate = useNavigate()

    const openCalculationPage = () => {
        navigate(`/calculations/${calculation.id}`)
    }

    return (
        <Card style={{padding: "10px"}}>
            <Row>
                <Col md={1}>
                    {index + 1}
                </Col>
                <Col md={1}>
                    {calculation.status}
                </Col>
                <Col md={1}>
                    {calculation.current}
                </Col>
                <Col>
                    {formatDate(calculation.date_created)}
                </Col>
                <Col>
                    {formatDate(calculation.date_formation)}
                </Col>
                <Col>
                    {formatDate(calculation.date_complete)}
                </Col>
                <Col>
                <div className="calculation-icon">
                        {calculation.status === E_CalculationStatus.InWork ? (
                            <img className="status-icon" src="/frontend/icons/time.svg" alt="Time Icon" />
                        ) : (
                            <div className="qr-hover-wrapper">
                                <img className="status-icon" src="/frontend/icons/href.svg" alt="QR Icon" />
                                <div className="qr-hover">
                                    {calculation.qr && <img className="qr-code" src={`data:image/png;base64,${calculation.qr}`} alt="QR Code" />}
                                    <p>Сила тока: {calculation.current} А</p>
                                </div>
                            </div>
                        )}
                    </div>
                </Col>
                {!is_superuser &&
                    <Col>
                        <Button color="primary" onClick={openCalculationPage}>Открыть</Button>
                    </Col>
                }
                {is_superuser &&
                    <>
                        <Col>
                            {calculation.owner}
                        </Col>
                        <Col>
                            {calculation.status == E_CalculationStatus.InWork && <Button color="primary" onClick={() => handleAcceptCalculation(calculation.id)}>Принять</Button>}
                        </Col>
                        <Col>
                            {calculation.status == E_CalculationStatus.InWork && <Button color="danger" onClick={() => handleRejectCalculation(calculation.id)}>Отклонить</Button>}
                        </Col>
                    </>
                }
            </Row>
        </Card>
    )
}

export default CalculationCard