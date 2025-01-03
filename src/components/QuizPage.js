import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import api from "./api";

const QuizPage = () => {
  const { quizId } = useParams();
  const [searchParams] = useSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("User is not authenticated");
        }

        const response = await api.get("/users/get-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError("Error fetching user details");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!"); // Replaced toast notification with alert
  };

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return <div style={{ color: "red", textAlign: "center" }}>{error}</div>;
  }

  if (!user) {
    return <div style={{ color: "red", textAlign: "center" }}>User details not available.</div>;
  }

  return (
    <div style={{ width: "100%", height: "100vh", padding: "20px" }}>
      <div style={{ marginBottom: "20px", textAlign: "center" }}>
        <p><strong>Name:</strong> {user.userName}</p>
        <p>
          <strong>Roll No:</strong> {user.userRollNo}{" "}
          <button
            onClick={() => copyToClipboard(user.userRollNo)}
            style={{
              marginLeft: "10px",
              cursor: "pointer",
              padding: "5px 10px",
              border: "1px solid #ccc",
              borderRadius: "4px",
              backgroundColor: "#f0f0f0",
            }}
          >
            Copy
          </button>
        </p>
      </div>
      <iframe
        src={`https://quizzory.in/id/${quizId}`}
        title="Quiz Page"
        width="100%"
        height="100%"
        style={{ border: "1px solid #ccc" }}
      />
    </div>
  );
};

export default QuizPage;

