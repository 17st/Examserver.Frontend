// 

import React, { useState, useEffect } from "react";
import axios from "axios"; // To fetch data from the backend
import TestBox from "./TestBox";
import { Container, Row, Col } from "reactstrap";
import api from "./api";

const LiveContests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch test data from the backend
  useEffect(() => {
    document.title = "All Tests";
    api
      .get("/tests/showLiveTest") // Replace with your backend URL
      .then((response) => {
        setTests(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching tests", error);
        setLoading(false);
      });
  }, []);

  const currentTime = new Date();

  // Filter tests into categories
  const upcomingTests = tests.filter(
    (test) => new Date(test.startTime) > currentTime
  );
  const presentTests = tests.filter(
    (test) =>
      new Date(test.startTime) <= currentTime &&
      new Date(test.endTime) >= currentTime
  );
  const pastTests = tests.filter((test) => new Date(test.endTime) < currentTime);

  const renderTests = (testList) => (
    <Row>
      {testList.map((test) => (
        <Col key={test.testId} sm="12" md="6" lg="4" className="mb-4">
          <TestBox test={test} />
        </Col>
      ))}
    </Row>
  );

  return (
    <Container>
      {/* <h1 className="text-center my-4">Live Quizzes</h1> */}
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <>
          <section>
            <h4 className="text-left my-3">Upcoming Live Tests</h4>
            {upcomingTests.length > 0 ? (
              renderTests(upcomingTests)
            ) : (
              <p className="text-center">No upcoming tests available</p>
            )}
          </section>

          <section>
            <h4 className="text-left my-3">Present Live Tests</h4>
            {presentTests.length > 0 ? (
              renderTests(presentTests)
            ) : (
              <p className="text-center">No ongoing tests available</p>
            )}
          </section>

          <section>
            <h4 className="text-left my-3">Past Tests</h4>
            {pastTests.length > 0 ? (
              renderTests(pastTests)
            ) : (
              <p className="text-center">No past tests available</p>
            )}
          </section>
        </>
      )}
    </Container>
  );
};

export default LiveContests;
