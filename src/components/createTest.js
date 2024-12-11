
import React, { Fragment ,useState } from "react";
import axios from "axios";
import { Button, Container, Form, FormGroup, Input } from "reactstrap";



const CreateTest = () => {
    const [testInfo, setTestInfo] = useState({
      testName: "",
      testLink: "",
      testType: "RankBooster", // Default value as per your requirement
      providerName: "",
      startTime: "",
      endTime: "",
      timeDuration: 0,
      resultFile: "",
      userId: "",
      createDate: "",
      testTotalMarks: 0,
    }); 
    
    const [response, setResponse] = useState(null);
    const [error, setError] = useState(null);
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setTestInfo({
        ...testInfo,
        [name]: value,
      });
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await axios.post("http://localhost:8808/api/tests/create", testInfo);
          setResponse(res.data);
          setError(null);
        } catch (err) {
          console.error(err);
          setError("Error creating test");
        }
      };
    

    return (
      <Fragment>
        <h1 className="text-center my-3">Create Test</h1>
        <div>
          <form onSubmit={handleSubmit}>
            <FormGroup>
              <label for="testName">Test Name </label>
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
            <label for="testLink">Test Link </label>
            <Input
              type="text"
              name="testLink"
              placeholder="Test Link"
              value={testInfo.testLink}
              onChange={handleChange}
              required
            />
            </FormGroup>
            <FormGroup>
            <label for="providerName">Enter Your Name </label>
            <input
              type="text"
              name="providerName"
              placeholder="Provider Name"
              value={testInfo.providerName}
              onChange={handleChange}
            />
            </FormGroup>
            <FormGroup>
            <label for="startTime">Test start Time </label>
            <input
              type="datetime-local"
              name="startTime"
              value={testInfo.startTime}
              onChange={handleChange}
            />
            </FormGroup>
            <FormGroup>
            <label for="endTime">Test END Time </label>
            <input
              type="datetime-local"
              name="endTime"
              value={testInfo.endTime}
              onChange={handleChange}
            />
             </FormGroup>
             <FormGroup>
             <label for="timeDuration">Test Duration </label>
            <input
              type="number"
              name="timeDuration"
              placeholder="Time Duration (minutes)"
              value={testInfo.timeDuration}
              onChange={handleChange}
            />
            </FormGroup>
            <FormGroup>
             <label for="resultFile">upload Reslut File </label>
            <input
              type="text"
              name="resultFile"
              placeholder="Result File Link"
              value={testInfo.resultFile}
              onChange={handleChange}
            />
            </FormGroup>
            <FormGroup>
             <label for="userId">Enter your Id </label>
            <input
              type="text"
              name="userId"
              placeholder="User ID"
              value={testInfo.userId}
              onChange={handleChange}
            />
             </FormGroup>
             <FormGroup>
             <label for="testTotalMarks">Total Marks </label>
            <input
              type="number"
              name="testTotalMarks"
              placeholder="Total Marks"
              value={testInfo.testTotalMarks}
              onChange={handleChange}
            />
            </FormGroup>
            <button type="submit sm">Create</button>
          </form>
          {response && (
            <div>
              <h2>Test Created Successfully:</h2>
              <pre>{JSON.stringify(response, null, 2)}</pre>
            </div>
          )}
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
      </Fragment>
  );
};


export default CreateTest;