import React, { Fragment, useState, useEffect } from "react";
import { Button, Container, FormGroup, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import api from "./api"; // Import the api utility
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestInfo = async () => {
      try {
        const url = isLiveTest
          ? "/tests/showAllLiveTest"
          : "/tests/showAllPracticeTest";
        
        const res = await api.get(url); // Using api.get here
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
      await api.post("/test-results/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Results uploaded successfully!");

      // Fetch updated test list after uploading results
      const url = isLiveTest
        ? "/tests/showAllLiveTest"
        : "/tests/showAllPracticeTest";
      const updatedTestList = await api.get(url); // Using api.get here
      setTestList(updatedTestList.data);
    } catch (err) {
      console.error(err);
      alert("Error uploading results.");
    }
  };

  const handlePublishTest = async (testId, hideTestInfo) => {
    try {
      const res = await api.put(
        "/tests/hide-test-info",
        null,
        {
          params: {
            testId: testId,
            hideTestInfo: !hideTestInfo, // Toggle the value
          },
        }
      );

      if (res.data === "Update successful") {
        const url = isLiveTest
          ? "/tests/showAllLiveTest"
          : "/tests/showAllPracticeTest";
        const updatedTestList = await api.get(url); // Using api.get here
        setTestList(updatedTestList.data);
      } else {
        alert("Failed to update the test.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating the test.");
    }
  };

  const handlePublishResult = async (testId, resultPublish) => {
    try {
      const res = await api.put(
        "/tests/publish_result",
        null,
        {
          params: {
            testId: testId,
            resultPublish: !resultPublish, // Toggle the value
          },
        }
      );

      if (res.data === "Update successful") {
        const url = isLiveTest
          ? "/tests/showAllLiveTest"
          : "/tests/showAllPracticeTest";
        const updatedTestList = await api.get(url); // Using api.get here
        setTestList(updatedTestList.data);
      } else {
        alert("Failed to update the result publication status.");
      }
    } catch (err) {
      console.error(err);
      alert("Error updating the result publication status.");
    }
  };

  const handleShowResult = (testId, hideTestInfo) => {
    if (hideTestInfo) {
      alert("Result will be updated soon.");
      return;
    }
    navigate(`/results?testId=${testId}`); // Navigate to the results page with the testId
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
                  color={test.resultFileUploaded ? "primary" : "success"}
                  onClick={() => handleUploadResults(test.testId, test.startTime)}
                >
                  {test.resultFileUploaded ? "Update Results" : "Upload Results"}
                </Button>
                <Button
                  color={test.hideTestInfo ? "success" : "warning"}
                  onClick={() => handlePublishTest(test.testId, test.hideTestInfo)}
                  style={{ marginLeft: "10px" }}
                >
                  {test.hideTestInfo ? "Publish Test" : "Unpublish Test"}
                </Button>
                <Button
                  color={test.resultPublish ? "success" : "warning"}
                  onClick={() => handlePublishResult(test.testId, test.resultPublish)}
                  style={{ marginLeft: "10px" }}
                >
                  {test.resultPublish ? "Unpublish Result" : "Publish Result"}
                </Button>
                <Button
                  color="info"
                  onClick={() => handleShowResult(test.testId, test.hideTestInfo)}
                  style={{ marginLeft: "10px" }}
                >
                  Show Results
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
