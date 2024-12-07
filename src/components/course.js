import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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


const Course = ({ Course }) => {
    // Keep track of the duplicate tab reference
    const navigate = useNavigate();
    const [duplicateTab, setDuplicateTab] = useState(null);
    const [testStarted, setTestStarted] = useState(false);

    const handleClick = () => {
        const testUrl = `/quiz/6713cdc9906355109d1eb4e0?fromDuplicateTab=true`;
        if (duplicateTab && !duplicateTab.closed) {
            // If duplicate tab is already open, focus on it
            duplicateTab.focus();
        } else {
            // Otherwise, open a new tab and store the reference
            const newTab = window.open(testUrl, "_blank");
            setDuplicateTab(newTab); // Store the reference to the new tab
            setTestStarted(true); // Mark the test as started
        }
    };

    const handleShowResult = () => {
        navigate("/results"); // Navigate to the ResultsPage
      };

    return (
        <Card className="text-center ">
            <CardBody>
                <CardSubtitle style={{ fontWeight: 'bold' }}>{Course.title}</CardSubtitle>
                <CardText>{Course.description}</CardText>
                <Container className="text-center">
                    <Button
                        color={testStarted ? "primary" : "warning"} // Change color to blue when the test is started
                        className="m-3"
                        onClick={handleClick}
                    >
                        {testStarted ? "Resume-Test" : "Start-Test"} {/* Change text based on test started */}
                    </Button>
                    <Button color="info" className="m-3" onClick={handleShowResult}>
            Show Result
          </Button>
                </Container>
                {/* {showEmbeddedWebsite && <EmbeddedWebsite />} */}
            </CardBody>
        </Card>
    );
}

export default Course;