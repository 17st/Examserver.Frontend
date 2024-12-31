import React, { Fragment, useState } from "react";
import axios from "axios";
import UploadResult from "./uploadResult";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import api from "./api";
import "./createTest.css";

const CreateTest = () => {
  const [testInfo, setTestInfo] = useState({
    testName: "",
    testLink: "",
    testType: "Practice", // Default testType for practice-test
    testDesc: "",
    startTime: "",
    endTime: "",
    timeDuration: 0,
    testTotalMarks: 0,
    testFor: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const [showUploadResult, setShowUploadResult] = useState(false);

  // Separate constants for test types
  const practiceTestTypes = [
    { value: "Practice", label: "Practice Test" },
  ];

  const liveTestTypes = [
    { value: "Rankbooster", label: "Rankbooster" },
    { value: "NormalLive", label: "NormalLive" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during API call

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated");
      }

      const res = await api.post("/tests/create", testInfo, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setResponse("Test Created Successfully");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      setError("Error creating test");
    } finally {
      setLoading(false); // Set loading to false after API call completes
    }
  };

  const handleUploadButtonClick = () => {
    setShowUploadResult(true);
  };

  return (
    <Fragment>
      <h1 className="text-center my-3">Create Test</h1>
      <Container>
        <Form onSubmit={handleSubmit}>
          {/* Select Test Type */}
          <FormGroup>
            <Label for="testType">Select Test Type:</Label>
            <Input
              type="select"
              name="testType"
              value={testInfo.testType}
              onChange={handleChange}
              required
            >
              <optgroup label="Practice Test Types">
                {practiceTestTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Live Test Types">
                {liveTestTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </optgroup>
            </Input>
          </FormGroup>

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

          {/* Conditional Fields Based on Test Type */}
          {liveTestTypes.some((type) => type.value === testInfo.testType) ? (
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

          <Button type="submit" color="primary" disabled={loading}>
            {loading ? "Creating..." : "Create Test"}
          </Button>
        </Form>

        {response && <p style={{ color: "green" }}>{response}</p>}
        {error && <p style={{ color: "red" }}>{error}</p>}

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button color="primary" onClick={handleUploadButtonClick}>
            Upload Test Results
          </Button>
        </div>

        {showUploadResult && <UploadResult />}
      </Container>
    </Fragment>
  );
};

export default CreateTest;
