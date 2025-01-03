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
import './TestBox.css'; // Import the CSS file for additional styling

const TestBox = ({ test }) => {
  const navigate = useNavigate();
  const [duplicateTab, setDuplicateTab] = useState(null);
  const [testStarted, setTestStarted] = useState(false);

  const extractTestId = (testLink) => {
    try {
      const url = new URL(testLink);
      return url.pathname.split('/').pop();
    } catch (error) {
      console.error("Invalid test link provided:", testLink);
      return null;
    }
  };

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    return token;
  };

  const handleClick = (testLink) => {
    const token = checkToken();
    if (!token) return;

    const testId = extractTestId(testLink);

    if (!testId) {
      alert("Unable to start the test. Invalid test link.");
      return;
    }

    if (duplicateTab && !duplicateTab.closed) {
      duplicateTab.focus();
    } else {
      const newTab = window.open(`#quiz/${testId}?fromDuplicateTab=true`, "_blank");
      setDuplicateTab(newTab);
      setTestStarted(true);
    }
  };

  const handleShowResult = () => {
    const token = checkToken();
    if (!token) return;

    if (test.hideTestInfo) {
      alert("Result will be updated soon.");
      return;
    }
    const testId = test.testId;
    if (!testId) {
      alert("Unable to fetch results. Invalid test link.");
      return;
    }
    navigate(`/results?testId=${testId}`);
  };

  return (
    <Card className="text-center shadow TestBox-card">
      <CardBody>
        <CardTitle tag="h5" className="TestBox-title">
          {test.testName || "Test Name Not Available"}
        </CardTitle>
        {test.startTime && (
          <CardSubtitle className="mb-2 text-muted TestBox-subtitle">
            Start Time: {new Date(test.startTime).toLocaleString()}
          </CardSubtitle>
        )}
        <CardText className="TestBox-provider">
          Provided by: <strong>{test.testProviderName || "Unknown Provider"}</strong>
        </CardText>
        <Container className="TestBox-buttons">
          <Button
            color={testStarted ? "primary" : "success"}
            className="m-2 TestBox-btn"
            onClick={() => handleClick(test.testLink)}
          >
            {testStarted ? "Resume Test" : "Start Test"}
          </Button>
          <Button
            color="info"
            className="m-2 TestBox-btn"
            onClick={handleShowResult}
          >
            Show Results
          </Button>
        </Container>
      </CardBody>
    </Card>
  );
};

export default TestBox;
