import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Resistor} from "modules/types.ts";
import {useEffect, useState} from "react";

interface ResistorCardProps {
    resistor: T_Resistor,
    isMock: boolean
}

const ResistorCard = ({resistor, isMock}: ResistorCardProps) => {

    const [image, setImage] = useState<string>()

    const fetchImage = async () => {
        const response = await fetch(`http://localhost:8000/api/resistors/${resistor.id}/image`)
        const blob = await response.blob()
        const url = URL.createObjectURL(blob)
        setImage(url)
    }

    useEffect(() => {
        !isMock && fetchImage()
    }, []);

    return (
        <Card key={resistor.id} style={{width: '18rem', margin: "0 auto 50px", height: "calc(100% - 50px)" }}>
            <CardImg
                src={isMock ? mockImage as string : image}
                style={{"height": "200px"}}
            />
            <CardBody className="d-flex flex-column justify-content-between">
                <CardTitle tag="h5">
                    {resistor.name}
                </CardTitle>
                <CardText>
                    Сопротивление: {resistor.resistance} Ом
                </CardText>
                <Link to={`/resistors/${resistor.id}`}>
                    <Button color="primary">
                        Открыть
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default ResistorCard