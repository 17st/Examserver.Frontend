import React, { useState } from "react";
import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import { HashRouter as Router, Route, Routes } from "react-router-dom"; // Import useLocation from react-router-dom
import { GoogleOAuthProvider } from "@react-oauth/google";
import Home from "./components/Home";
import Header from "./components/Header";
import LiveContest from "./components/LiveContest";
import CreateTest from "./components/createTest";
import QuizPage from "./components/QuizPage";
import NavigationBar from "./components/Navbar";
import ResultsPage from "./components/ResultsPage";
import PracticeTest from "./components/PracticeTest";
import Login from "./components/login";
import Register from "./components/Register";
import ProfilePage from "./components/ProfilePage";
import "react-phone-number-input/style.css";
import ProtectedRoute from "./components/ProtectedRoute";
import Logout from "./components/Logout";

const clientId = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your Google OAuth client ID


// Define the main App component
function App() {
  const [disableLiveContest, setDisableLiveContest] = useState(false);

  const btnhandle = () => {
    toast.error("Done!", {
      position: "top-center",
    });
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div>
          <Header />
          <NavigationBar />
          {/* Render the rest of the content */}
          <ToastContainer />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/live-contest" element={<LiveContest />} />
            <Route path="/create-test" element={<ProtectedRoute><CreateTest /></ProtectedRoute>} />
            <Route path="/quiz/:quizId" element={<ProtectedRoute><QuizPage /></ProtectedRoute>} />
            <Route path="/practice-test" element={<PracticeTest />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
