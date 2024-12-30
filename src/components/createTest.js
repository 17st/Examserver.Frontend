import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import UploadResult from "./uploadResult"
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import api from "./api"
import './createTest.css'

const CreateTest = () => {
  const [testInfo, setTestInfo] = useState({
    testName: "",
    testLink: "",
    testType: "Practice", // Initialize with "Practice" by default
    testDesc: "",
    startTime: "",
    endTime: "",
    timeDuration: 0,
    userId: "",
    testTotalMarks: 0,
    testCategory: "",
    testFor : "",
  });

  const [isLiveTest, setIsLiveTest] = useState(false); // To toggle between Live Test and Practice Test
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [testId, setTestId] = useState(""); // For uploading the result CSV
  const [showUploadResult, setShowUploadResult] = useState(false); 

  useEffect(() => {
    // Set testType conditionally without causing re-render loop
    const updatedTestType = isLiveTest ? "Live" : "Practice"; // Map isLiveTest to "Live" or "Practice"
    setTestInfo((prev) => ({
      ...prev,
      testType: updatedTestType,
    }));
  }, [isLiveTest]); // Trigger only when `isLiveTest` changes

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestInfo({
      ...testInfo,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setCsvFile(e.target.files[0]);
  };

  const handleTestTypeChange = (e) => {
    const selectedType = e.target.value;
    setIsLiveTest(selectedType === "Live");
    setTestInfo({
      ...testInfo,
      testType: selectedType, // Directly update testType based on the selected option
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const testPayload = isLiveTest
      ? {
          testName: testInfo.testName,
          testDesc: testInfo.testDesc,
          testType: testInfo.testType,
          startTime: testInfo.startTime,
          endTime: testInfo.endTime,
          testLink: testInfo.testLink,
          userId: testInfo.userId,
          testFor: testInfo.testFor,
          testCategory: testInfo.testCategory,
        }
      : {
          testName: testInfo.testName,
          testDesc: testInfo.testDesc,
          testType: testInfo.testType,
          startTime: testInfo.startTime,
          testLink: testInfo.testLink,
          timeDuration: testInfo.timeDuration,
          testTotalMarks: testInfo.testTotalMarks,
          userId: testInfo.userId,
          testFor: testInfo.testFor,
          testCategory: testInfo.testCategory,
        };

    try {
      // const res = await axios.post("http://localhost:8808/api/tests/create", testPayload);
      const res = await api.post("/tests/create", testPayload);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error creating test");
    }
  };

  const handleUploadButtonClick = () => {
    setShowUploadResult(true); // Show the UploadResult component when button is clicked
  };

  return (
    <Fragment>
      <h1 className="text-center my-3">Create Test</h1>
      <Container>
        {/* Test Type Selection */}
        <div className="form-group">
          <Label for="testType">Select Test Type:</Label>
          <select
            name="testType"
            onChange={handleTestTypeChange}
            value={testInfo.testType} // Make sure the dropdown value is controlled by testInfo.testType
          >
            <option value="Practice">Practice Test</option>
            <option value="Live">Live Test</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="testName">Test Name</Label>
            <Input
              type="text"
              name="testName"
              placeholder="Test Name"
              value={testInfo.testName}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="testLink">Test Link</Label>
            <Input
              type="url"
              name="testLink"
              placeholder="Test Link"
              value={testInfo.testLink}
              onChange={handleChange}
              required
            />
          </FormGroup>

          <FormGroup>
            <Label for="userId">User ID</Label>
            <Input
              type="text"
              name="userId"
              placeholder="User ID"
              value={testInfo.userId}
              onChange={handleChange}
              required
            />
          </FormGroup>

          {isLiveTest && (
          <FormGroup>
            <Label for="testType">Select Live Test Type:</Label>
            <select
              name="testType"
              onChange={handleChange}
              value={testInfo.testType} // Controlled value for liveTestType
            >
              <option value="">Select Test Type</option>
              <option value="RankBooster">RankBooster</option>
              <option value="NormalLive">Normal Live</option>
            </select>
          </FormGroup>
        )}

          <FormGroup>
            <Label for="testFor">Test Related</Label>
            <Input
              type="text"
              name="testFor"
              placeholder="Test For"
              value={testInfo.testFor}
              onChange={handleChange}
              required
            />
          </FormGroup>

          {/* Conditional Fields based on Test Type */}
          {testInfo.testType === "Live" ? (
            <>
              <FormGroup>
                <Label for="startTime">Test Start Time</Label>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={testInfo.startTime}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="endTime">Test End Time</Label>
                <Input
                  type="datetime-local"
                  name="endTime"
                  value={testInfo.endTime}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </>
          ) : (
            <>
              <FormGroup>
                <Label for="testDesc">Test Description</Label>
                <Input
                  type="text"
                  name="testDesc"
                  value={testInfo.testDesc}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="startTime">Test Start Time</Label>
                <Input
                  type="datetime-local"
                  name="startTime"
                  value={testInfo.startTime}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="timeDuration">Test Duration (minutes)</Label>
                <Input
                  type="number"
                  name="timeDuration"
                  value={testInfo.timeDuration}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="testTotalMarks">Test Total Marks</Label>
                <Input
                  type="number"
                  name="testTotalMarks"
                  value={testInfo.testTotalMarks}
                  onChange={handleChange}
                  required
                />
              </FormGroup>
            </>
          )}

          <Button type="submit" color="primary">
            Create Test
          </Button>
        </form>

        {/* Display Response */}
        {response && (
          <div>
            <h2>Test Created Successfully:</h2>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "20px" }}>
          <Button
            color="primary"
            onClick={handleUploadButtonClick}
            style={{
              fontWeight: "bold",
              fontSize: "16px",
              padding: "12px 24px",
              borderRadius: "10px",
              backgroundColor: "#4f4f4f", // Light black or dark gray color
              borderColor: "#2c2c2c", // Darker shade of black for the border
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow for depth
              transition: "all 0.3s ease", // Smooth hover transition
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = "#2c2c2c"} // Hover effect (darker shade of black)
            onMouseLeave={(e) => e.target.style.backgroundColor = "#4f4f4f"} // Revert hover effect
          >
            Upload Test Results
          </Button>
        </div>




        {/* Conditionally Render UploadResult */}
        {showUploadResult && <UploadResult />}
      </Container>
    </Fragment>
  );
};

export default CreateTest;
