import React, { useState } from "react";
import { Table, Button, Container } from "reactstrap";

const ResultsPage = () => {
  // Sample data
  const results = Array.from({ length: 100 }, (_, index) => ({
    name: `Student ${index + 1}`,
    rank: index + 1,
    score: Math.floor(Math.random() * 100),
    totalMarks: 100,
  }));

  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 10;

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
            <th>Rank</th>
            <th>Score</th>
            <th>Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {currentResults.map((result, index) => (
            <tr key={index}>
              <td>{result.name}</td>
              <td>{result.rank}</td>
              <td>{result.score}</td>
              <td>{result.totalMarks}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <div className="d-flex justify-content-between">
        <Button color="primary" onClick={handlePrev} disabled={currentPage === 1}>
          Previous
        </Button>
        <span>Page {currentPage} of {totalPages}</span>
        <Button color="primary" onClick={handleNext} disabled={currentPage === totalPages}>
          Next
        </Button>
      </div>
    </Container>
  );
};

export default ResultsPage;
