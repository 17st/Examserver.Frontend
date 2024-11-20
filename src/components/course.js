import React from "react";
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

const Course = ({Course}) => {
    return(
        <Card className="text-center ">
            <CardBody>
                <CardSubtitle style={{ fontWeight: 'bold' }}>{Course.title}</CardSubtitle>
                <CardText>{Course.description}</CardText>
                <Container className="text-center ">
                    <Button color="warning m-3">Update</Button>
                    <Button color="danger ">Delete</Button>
                </Container>
            </CardBody>
        </Card>
    );
}

export default Course;