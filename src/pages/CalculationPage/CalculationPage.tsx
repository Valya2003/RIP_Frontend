import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftCalculation,
    fetchCalculation,
    removeCalculation, sendDraftCalculation,
    triggerUpdateMM, updateCalculation
} from "store/slices/calculationsSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_CalculationStatus, T_Resistor} from "modules/types.ts";
import ResistorCard from "components/ResistorCard/ResistorCard.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";

const CalculationPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const calculation = useAppSelector((state) => state.calculations.calculation)

    const [voltage, setVoltage] = useState<string>(calculation?.voltage)

    const [current, setCurrent] = useState<string>(calculation?.current)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/403/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchCalculation(id))
        return () => dispatch(removeCalculation())
    }, []);

    useEffect(() => {
        setVoltage(calculation?.voltage)
        setCurrent(calculation?.current)
    }, [calculation]);

    const sendCalculation = async (e) => {
        e.preventDefault()

        await saveCalculation()

        await dispatch(sendDraftCalculation())

        navigate("/calculations/")
    }

    const saveCalculation = async (e?) => {
        e?.preventDefault()

        const data = {
            voltage
        }

        await dispatch(updateCalculation(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteCalculation = async () => {
        await dispatch(deleteDraftCalculation())
        navigate("/resistors/")
    }

    if (!calculation) {
        return (
            <></>
        )
    }

    const isDraft = calculation.status == E_CalculationStatus.Draft
    const isCompleted = calculation.status == E_CalculationStatus.Completed

    return (
        <Form onSubmit={sendCalculation} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновое вычисление" : `Вычисление №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomInput label="Напряжение" placeholder="Введите напряжение" type="number" value={voltage} setValue={setVoltage} disabled={!isDraft || is_superuser}/>
                {isCompleted && <CustomInput label="Сила тока" value={current} disabled={true}/>}
            </Row>
            <Row>
                {calculation.resistors.length > 0 ? calculation.resistors.map((resistor:T_Resistor) => (
                    <Row key={resistor.id} className="d-flex justify-content-center mb-5">
                        <ResistorCard resistor={resistor} showRemoveBtn={isDraft} editMM={isDraft}/>
                    </Row>
                )) :
                    <h3 className="text-center">Резисторы не добавлены</h3>
                }
            </Row>
            {isDraft && !is_superuser &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveCalculation}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteCalculation}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default CalculationPage