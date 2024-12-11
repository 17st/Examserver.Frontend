// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//     Card,
//     CardBody,
//     CardTitle,
//     CardSubtitle,
//     CardText,
//     CardFooter,
//     Button,
//     Container,
// } from "reactstrap";


// const Course = ({ Course }) => {
//     // Keep track of the duplicate tab reference
//     const navigate = useNavigate();
//     const [duplicateTab, setDuplicateTab] = useState(null);
//     const [testStarted, setTestStarted] = useState(false);

//     const handleClick = () => {
//         const testUrl = `/quiz/6713cdc9906355109d1eb4e0?fromDuplicateTab=true`;
//         if (duplicateTab && !duplicateTab.closed) {
//             // If duplicate tab is already open, focus on it
//             duplicateTab.focus();
//         } else {
//             // Otherwise, open a new tab and store the reference
//             const newTab = window.open(testUrl, "_blank");
//             setDuplicateTab(newTab); // Store the reference to the new tab
//             setTestStarted(true); // Mark the test as started
//         }
//     };

//     const handleShowResult = () => {
//         navigate("/results"); // Navigate to the ResultsPage
//       };

//     return (
//         <Card className="text-center ">
//             <CardBody>
//                 <CardSubtitle style={{ fontWeight: 'bold' }}>{Course.title}</CardSubtitle>
//                 <CardText>{Course.description}</CardText>
//                 <Container className="text-center">
//                     <Button
//                         color={testStarted ? "primary" : "warning"} // Change color to blue when the test is started
//                         className="m-3"
//                         onClick={handleClick}
//                     >
//                         {testStarted ? "Resume-Test" : "Start-Test"} {/* Change text based on test started */}
//                     </Button>
//                     <Button color="info" className="m-3" onClick={handleShowResult}>
//             Show Result
//           </Button>
//                 </Container>
//                 {/* {showEmbeddedWebsite && <EmbeddedWebsite />} */}
//             </CardBody>
//         </Card>
//     );
// }

// export default Course;


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
