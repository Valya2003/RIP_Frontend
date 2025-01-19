import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteResistor,
    fetchResistor,
    removeSelectedResistor,
    updateResistor,
    updateResistorImage
} from "store/slices/resistorsSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const ResistorEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {resistor} = useAppSelector((state) => state.resistors)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(resistor?.name)

    const [description, setDescription] = useState<string>(resistor?.description)

    const [resistance, setResistance] = useState<number>(resistor?.resistance)

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(resistor?.image)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const saveResistor = async() => {
        if (imgFile) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updateResistorImage({
                resistor_id: resistor.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description,
            resistance
        }

        await dispatch(updateResistor({
            resistor_id: resistor.id,
            data
        }))

        navigate("/resistors-table/")
    }

    useEffect(() => {
        dispatch(fetchResistor(id))
        return () => dispatch(removeSelectedResistor())
    }, []);

    useEffect(() => {
        setName(resistor?.name)
        setDescription(resistor?.description)
        setResistance(resistor?.resistance)
        setImgURL(resistor?.image)
    }, [resistor]);

    const handleDeleteResistor = async () => {
        await dispatch(deleteResistor(id))
        navigate("/resistors-table/")
    }

    if (!resistor) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt="" className="w-100"/>
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <CustomInput label="Сопротивление" placeholder="Введите сопротивление" value={resistance} setValue={setResistance}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={saveResistor}>Сохранить</Button>
                        <Button color="danger" className="fs-4" onClick={handleDeleteResistor}>Удалить</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default ResistorEditPage