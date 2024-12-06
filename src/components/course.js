import React , { useState }from "react";
import {
    Card, 
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardFooter,
    Button,
    Container,
} from "reactstrap";

const EmbeddedWebsite = () => {
    return (
        <div style={{ width: '100%', height: '500px', marginTop: '20px' }}>
            <iframe
                src="https://quizzory.in/id/6751eff6c37fd16e0c357a69"
                title="Quizzory"
                width="100%"
                height="100%"
                style={{ border: '1px solid #ccc' }}
            />
        </div>
    );
};

const Course = ({Course}) => {
    const [showEmbeddedWebsite, setShowEmbeddedWebsite] = useState(false);

    const handleClick = () => {
        setShowEmbeddedWebsite(true);
    };

    return(
        <Card className="text-center ">
            <CardBody>
                <CardSubtitle style={{ fontWeight: 'bold' }}>{Course.title}</CardSubtitle>
                <CardText>{Course.description}</CardText>
                <Container className="text-center">
                    <Button color="warning m-3" onClick={handleClick}>
                        Show Embedded Website
                    </Button>
                </Container>
                {showEmbeddedWebsite && <EmbeddedWebsite />}
            </CardBody>
        </Card>
    );
}

export default Course;