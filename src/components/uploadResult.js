import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import './uploadResult.css';  // Importing the CSS file

const UploadResult = () => {
  const [testInfo, setTestInfo] = useState({
    testName: "",
    testLink: "",
    testType: "Practice",
    testDesc: "",
    startTime: "",
    endTime: "",
    timeDuration: 0,
    userId: "",
    testTotalMarks: 0,
  });

  const [testList, setTestList] = useState([]);
  const [isLiveTest, setIsLiveTest] = useState(false);
  const [csvFile, setCsvFile] = useState(null);
  const [testId, setTestId] = useState("");
  const [testStartTime, setTestStartTime] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTestInfo = async () => {
      try {
        const url = isLiveTest
          ? "http://localhost:8808/api/tests/showLiveTest"
          : "http://localhost:8808/api/tests/showPracticeTests";
        
        const res = await axios.get(url);
        setTestList(res.data);
      } catch (err) {
        setError("Error fetching test info");
        console.error(err);
      }
    };

    fetchTestInfo();
  }, [isLiveTest]);

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleTestTypeChange = (e) => {
    const selectedType = e.target.value;
    setIsLiveTest(selectedType === "Live");
  };

  const handleUploadResults = async (testId, testStartTime) => {
    if (!csvFile) {
      alert("Please select a CSV file to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("testId", testId);
    formData.append("startTime", testStartTime);

    try {
      await axios.post("http://localhost:8808/api/test-results/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Results uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading results.");
    }
  };

  return (
    <Fragment>
      <Container>
        <div className="form-group">
          <Label for="testType">Select Test Type:</Label>
          <select
            name="testType"
            onChange={handleTestTypeChange}
            value={isLiveTest ? "Live" : "Practice"}
          >
            <option value="Practice">Practice Test</option>
            <option value="Live">Live Test</option>
          </select>
        </div>

        <div className="test-list">
          {/* <h2>{isLiveTest ? "Live Tests" : "Practice Tests"}</h2> */}
          {testList.length > 0 ? (
            testList.map((test) => (
              <div key={test.testId} className="test-info-block">
                <h3>{test.testName}</h3>
                <p>{test.testDesc}</p>
                <p>Start Time: {new Date(test.startTime).toLocaleString()}</p>
                <FormGroup>
                  <Label for="csvFile">Upload Results CSV</Label>
                  <Input type="file" onChange={handleFileChange} />
                </FormGroup>
                <Button
                  color="primary"
                  onClick={() => handleUploadResults(test.testId, test.startTime)}
                >
                  Upload Results
                </Button>
              </div>
            ))
          ) : (
            <p>No tests available</p>
          )}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </Container>
    </Fragment>
  );
};

export default UploadResult;
