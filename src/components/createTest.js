
// import React, { Fragment ,useState } from "react";
// import axios from "axios";
// import { Button, Container, Form, FormGroup, Input } from "reactstrap";



// const CreateTest = () => {
//     const [testInfo, setTestInfo] = useState({
//       testName: "",
//       testLink: "",
//       testType: "RankBooster", // Default value as per your requirement
//       providerName: "",
//       startTime: "",
//       endTime: "",
//       timeDuration: 0,
//       resultFile: "",
//       userId: "",
//       createDate: "",
//       testTotalMarks: 0,
//     }); 
    
//     const [response, setResponse] = useState(null);
//     const [error, setError] = useState(null);
  
//     const handleChange = (e) => {
//       const { name, value } = e.target;
//       setTestInfo({
//         ...testInfo,
//         [name]: value,
//       });
//     };
  
//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           const res = await axios.post("http://localhost:8808/api/tests/create", testInfo);
//           setResponse(res.data);
//           setError(null);
//         } catch (err) {
//           console.error(err);
//           setError("Error creating test");
//         }
//       };
    

//     return (
//       <Fragment>
//         <h1 className="text-center my-3">Create Test</h1>
//         <div>
//           <form onSubmit={handleSubmit}>
//             <FormGroup>
//               <label for="testName">Test Name </label>
//               <Input
//                 type="text"
//                 name="testName"
//                 placeholder="Test Name"
//                 value={testInfo.testName}
//                 onChange={handleChange}
//                 required
//               />
//             </FormGroup>
//             <FormGroup>
//             <label for="testLink">Test Link </label>
//             <Input
//               type="text"
//               name="testLink"
//               placeholder="Test Link"
//               value={testInfo.testLink}
//               onChange={handleChange}
//               required
//             />
//             </FormGroup>
//             <FormGroup>
//             <label for="providerName">Enter Your Name </label>
//             <input
//               type="text"
//               name="providerName"
//               placeholder="Provider Name"
//               value={testInfo.providerName}
//               onChange={handleChange}
//             />
//             </FormGroup>
//             <FormGroup>
//             <label for="startTime">Test start Time </label>
//             <input
//               type="datetime-local"
//               name="startTime"
//               value={testInfo.startTime}
//               onChange={handleChange}
//             />
//             </FormGroup>
//             <FormGroup>
//             <label for="endTime">Test END Time </label>
//             <input
//               type="datetime-local"
//               name="endTime"
//               value={testInfo.endTime}
//               onChange={handleChange}
//             />
//              </FormGroup>
//              <FormGroup>
//              <label for="timeDuration">Test Duration </label>
//             <input
//               type="number"
//               name="timeDuration"
//               placeholder="Time Duration (minutes)"
//               value={testInfo.timeDuration}
//               onChange={handleChange}
//             />
//             </FormGroup>
//             <FormGroup>
//              <label for="resultFile">upload Reslut File </label>
//             <input
//               type="text"
//               name="resultFile"
//               placeholder="Result File Link"
//               value={testInfo.resultFile}
//               onChange={handleChange}
//             />
//             </FormGroup>
//             <FormGroup>
//              <label for="userId">Enter your Id </label>
//             <input
//               type="text"
//               name="userId"
//               placeholder="User ID"
//               value={testInfo.userId}
//               onChange={handleChange}
//             />
//              </FormGroup>
//              <FormGroup>
//              <label for="testTotalMarks">Total Marks </label>
//             <input
//               type="number"
//               name="testTotalMarks"
//               placeholder="Total Marks"
//               value={testInfo.testTotalMarks}
//               onChange={handleChange}
//             />
//             </FormGroup>
//             <button type="submit sm">Create</button>
//           </form>
//           {response && (
//             <div>
//               <h2>Test Created Successfully:</h2>
//               <pre>{JSON.stringify(response, null, 2)}</pre>
//             </div>
//           )}
//           {error && <p style={{ color: "red" }}>{error}</p>}
//         </div>
//       </Fragment>
//   );
// };


// export default CreateTest;



import React, { Fragment, useState } from "react";
import axios from "axios";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";

const CreateTest = () => {
  const [testInfo, setTestInfo] = useState({
    testName: "",
    testLink: "",
    testType: "RankBooster", // Default value
    providerName: "",
    startTime: "",
    endTime: "",
    timeDuration: 0,
    resultFile: "",
    userId: "",
    createDate: "",
    testTotalMarks: 0,
    testDesc: "", // For practice test
  });

  const [isLiveTest, setIsLiveTest] = useState(false); // To toggle between Live Test and Practice Test
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [csvFile, setCsvFile] = useState(null);
  const [testId, setTestId] = useState(""); // For uploading the result CSV

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
    setIsLiveTest(e.target.value === "Live");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Depending on the test type (Practice or Live), create appropriate test payload
    const testPayload = isLiveTest
      ? {
          testName: testInfo.testName,
          testType: testInfo.testType,
          startTime: testInfo.startTime,
          endTime: testInfo.endTime,
          timeDuration: testInfo.timeDuration,
        }
      : {
          testName: testInfo.testName,
          testType: testInfo.testType,
          startTime: testInfo.startTime,
          testDesc: testInfo.testDesc,
        };

    try {
      const res = await axios.post("http://localhost:8808/api/tests/create", testPayload);
      setResponse(res.data);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Error creating test");
    }
  };

  const handleUploadResults = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", csvFile);
    formData.append("testId", testId);

    try {
      const res = await axios.post("http://localhost:8808/api/tests/upload-results", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res.data);
      alert("Results uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Error uploading results.");
    }
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
            value={isLiveTest ? "Live" : "Practice"}
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

          {/* Conditional Fields based on Test Type */}
          {isLiveTest ? (
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
            <pre>{JSON.stringify(response, null, 2)}</pre>
          </div>
        )}
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Upload Test Results */}
        <h2 className="my-4">Upload Test Results</h2>
        <form onSubmit={handleUploadResults}>
          <FormGroup>
            <Label for="testId">Enter Test ID</Label>
            <Input
              type="text"
              name="testId"
              value={testId}
              onChange={(e) => setTestId(e.target.value)}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label for="csvFile">Upload CSV File</Label>
            <Input type="file" name="csvFile" onChange={handleFileChange} required />
          </FormGroup>
          <Button type="submit" color="secondary">
            Upload Results
          </Button>
        </form>
      </Container>
    </Fragment>
  );
};

export default CreateTest;
