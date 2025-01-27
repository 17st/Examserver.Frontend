import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "reactstrap";
import axios from "axios";
import api from "./api";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [statistics, setStatistics] = useState(null); // State to store statistics
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  const getTestIdFromHash = () => {
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.substring(hash.indexOf("?")));
    return params.get("testId");
  };

  useEffect(() => {
    const testId = getTestIdFromHash();

    if (!testId) {
      console.error("Test ID is missing from the query parameters.");
      return;
    }

    // Fetch test results
    const fetchTestResults = async () => {
      try {
        const response = await api.get(
          `/test-results/showTestResult?testId=${testId}`
        );
        const data = response.data;
        if (Array.isArray(data)) {
          setResults(data); // Only set results if data is an array
        } else {
          console.error("API returned invalid data:", data);
          setResults([]); // Fallback to an empty array
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setResults([]); // Fallback to an empty array
      }
    };

    // Fetch statistics
    const fetchStatistics = async () => {
      try {
        const response = await api.get(
          `/result-statistics/get-result?testId=${testId}`
        );
        console.log(response.data)
        setStatistics(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
        setStatistics(null); // Fallback to null
      }
    };

    fetchTestResults();
    fetchStatistics();
  }, []);

  const totalPages = Math.ceil(results.length / resultsPerPage);
  const startIndex = (currentPage - 1) * resultsPerPage;
  const endIndex = startIndex + resultsPerPage;
  const currentResults = results.slice(startIndex, endIndex);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <Container>
      <h2 className="text-center my-4">Student Results</h2>

      {/* Statistics Division */}
      {statistics && (
        <div className="mb-4 p-3 border rounded">
          <h5>Test Statistics</h5>
          <p>Total Attempts: {statistics.totalAttempts}</p>
          <p>Highest Marks: {statistics.highestMarks}</p>
          <p>Average Marks: {statistics.avgMarks}</p>
          <p>Average Time Duration: {statistics.avgTimeDuration} mins</p>
        </div>
      )}

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Submitted Time</th>
            <th>Rank</th>
            <th>Marks</th>
            <th>Answer Sheet Link</th>
            <th>Time Duration (mins)</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((result, index) => (
            <tr key={index}>
              <td>{result.name}</td>
              <td>{result.submittedTime}</td>
              <td>{result.rank}</td>
              <td>{result.marks}</td>
              <td>
                {result.answerSheetLink ? (
                  <a
                    href={result.answerSheetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View
                  </a>
                ) : (
                  "N/A"
                )}
              </td>
              <td>{result.timeDuration || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <Button color="primary" onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button color="primary" onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </Container>
  );
};

export default ResultsPage;
