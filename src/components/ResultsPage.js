import React, { useEffect, useState } from "react";
import { Table, Button, Container } from "reactstrap";
import axios from "axios";

const ResultsPage = () => {
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8808/api/test-results/showTestResult?testId=2"
        );
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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
                  <a href={result.answerSheetLink} target="_blank" rel="noopener noreferrer">
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
