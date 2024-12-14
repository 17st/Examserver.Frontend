import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
  Container,
} from "reactstrap";

const Course = ({ test }) => {
  const navigate = useNavigate();
  const [duplicateTab, setDuplicateTab] = useState(null);
  const [testStarted, setTestStarted] = useState(false);

  const handleClick = (testLink) => {
    if (duplicateTab && !duplicateTab.closed) {
      // Focus on the already opened tab
      duplicateTab.focus();
    } else {
      // Open the test in a new tab
      const newTab = window.open(`/quiz/6713cdc9906355109d1eb4e0?fromDuplicateTab=true`, "_blank");
      setDuplicateTab(newTab);
      setTestStarted(true);
    }
  };

  const handleShowResult = () => {
    navigate("/results"); // Navigate to the results page
  };

  return (
    <Card className="text-center shadow">
      <CardBody>
        {/* <CardTitle tag="h5">{test.testName}</CardTitle>
        <CardSubtitle className="mb-2 text-muted">
          Start Time: {new Date(test.startTime).toLocaleString()}
        </CardSubtitle> */}
        <CardText>
          Provided by: <strong>{test.providerName}</strong>
        </CardText>
        <Container>
          <Button
            color={testStarted ? "primary" : "success"}
            className="m-2"
            onClick={() => handleClick(test.testLink)}
          >
            {testStarted ? "Resume Test" : "Start Test"}
          </Button>
          <Button color="info" className="m-2" onClick={handleShowResult}>
            Show Results
          </Button>
        </Container>
      </CardBody>
    </Card>
  );
};

export default Course;
