import React, { useEffect } from "react";
import { CardTitle, CardText, CardBody, Button, Container, Row } from "reactstrap";

const Home = () => {

    useEffect(() => {
        document.title = "Home";
    }, [])

    return(
        <div className="text-center">
        <CardBody className=" p-5 bg-secondary text-white rounded" >
            <CardTitle className="display-5">Learncodewith Durgesh</CardTitle>
            <CardText>This is developed by Learncodewith Durgesh for learning purpose. Its backend is on spring boat and frontend on react.js.</CardText>
            <Container>
                <Button color="dark" outline> Go somewhere</Button>
            </Container>
        </CardBody>
        </div>
    );
}

export default Home;