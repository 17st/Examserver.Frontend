import React, { useState } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // PhoneInput styles
import "./register.css"; // Include your CSS

const colleges = [
  "Indian Institute of Technology, Bombay",
  "Indian Institute of Technology, Delhi",
  "Indian Institute of Technology, Madras",
  "Indian Institute of Technology, Kanpur",
  "Birla Institute of Technology and Science, Pilani",
  "Delhi University, Delhi",
  "Banaras Hindu University, Varanasi",
  "Indian Institute of Science, Bangalore",
  "NIT Trichy",
  "NIT Surathkal",
  "Jabalpur Engineering College",
  "LNCT Group of Colleges",
  "SGSITS",
  "IET DAVV",
  "Atal Bihari Vajpayee Indian Institute of Information Technology and Management.",
  "Indian Institute of Information Technology, Design and Manufacturing, Jabalpur",
  "Dr. Hari Singh Gour University",
  "Maulana Azad National Institute of Technology Bhopal"
];

function Register() {
  const [formData, setFormData] = useState({
    userName: "",
    userCity: "",
    userSchoolOrCollege: "",
    userMob: "",
    userType: "CollegeStudent",
    userMailId: "",
    userPassword: "",
    confirmPassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [customCollege, setCustomCollege] = useState("");
  const [isCustomCollege, setIsCustomCollege] = useState(false);

  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle college selection
  const handleCollegeChange = (e) => {
    if (e.target.value === "custom") {
      setIsCustomCollege(true);
      setFormData({ ...formData, userSchoolOrCollege: "" });
    } else {
      setIsCustomCollege(false);
      setFormData({ ...formData, userSchoolOrCollege: e.target.value });
    }
  };

  // Handle custom college input
  const handleCustomCollegeChange = (e) => {
    setCustomCollege(e.target.value);
    setFormData({ ...formData, userSchoolOrCollege: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate passwords match
    if (formData.userPassword !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!passwordRegex.test(formData.userPassword)) {
      alert(
        "Password must be at least 8 characters long, including an uppercase letter, a digit, and a special character."
      );
      return;
    }

    // Validate mobile number format
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(formData.userMob)) {
      alert("Please enter a valid mobile number.");
      return;
    }

    try {
      // Send registration data to backend
      const response = await axios.post(
        "http://localhost:8808/api/users/create",
        formData
      );
      console.log("Registration successful:", response.data);

      // Navigate to login page after successful registration
      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error);
      const message =
        error.response?.status === 409
          ? error.response.data.message
          : "An error occurred. Please try again.";
      alert(message);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async (response) => {
    try {
      const googleToken = response.credential;
      const result = await axios.post(
        "http://localhost:8808/api/users/create",
        { token: googleToken }
      );
      console.log("Google login successful:", result.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Google login error:", error);
      alert("Google login failed. Please try again.");
    }
  };

  return (
    <Container fluid className="p-3 my-5 h-custom">
      <Row>
        <Col xs={12} md={6} className="register-wrap">
          <div className="d-flex justify-content-center align-items-center mb-4">
            <h2 className="fw-bold mb-0 mx-3">Registration Info</h2>
          </div>
          <Form onSubmit={handleSubmit} className="register-form">
            {/* Full Name */}
            <Form.Group className="mb-4" controlId="userName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your full name"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* Email */}
            <Form.Group className="mb-4" controlId="userMailId">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="userMailId"
                value={formData.userMailId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            {/* City */}
            <Form.Group className="mb-4" controlId="userCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your city"
                name="userCity"
                value={formData.userCity}
                onChange={handleChange}
              />
            </Form.Group>

            {/* College */}
            <Form.Group className="mb-4" controlId="userSchoolOrCollege">
              <Form.Label>College</Form.Label>
              <Form.Control
                as="select"
                value={isCustomCollege ? "custom" : formData.userSchoolOrCollege}
                onChange={handleCollegeChange}
                required
              >
                <option value="" disabled>
                  -- Select College --
                </option>
                {colleges.map((college, index) => (
                  <option key={index} value={college}>
                    {college}
                  </option>
                ))}
                <option value="custom">Add a new college</option>
              </Form.Control>
              {isCustomCollege && (
                <Form.Control
                  type="text"
                  placeholder="Enter college name"
                  value={customCollege}
                  onChange={handleCustomCollegeChange}
                  className="mt-3"
                  required
                />
              )}
            </Form.Group>

            {/* Mobile Number */}
            <Form.Group className="mb-4" controlId="userMob">
              <Form.Label>Mobile Number</Form.Label>
              <PhoneInput
                international
                defaultCountry="US"
                value={formData.userMob}
                onChange={(value) => setFormData({ ...formData, userMob: value })}
                placeholder="Enter your mobile number"
                required
              />
            </Form.Group>

            {/* Password */}
            <Form.Group className="mb-4" controlId="userPassword">
              <Form.Label>Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter password"
                  name="userPassword"
                  value={formData.userPassword}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="link"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="eye-icon-btn"
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-4" controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <div className="input-group">
                <Form.Control
                  type={confirmPasswordVisible ? "text" : "password"}
                  placeholder="Confirm password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <Button
                  variant="link"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                  className="eye-icon-btn"
                >
                  {confirmPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </Button>
              </div>
            </Form.Group>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="mb-0 px-5"
            >
              Register
            </Button>
            <p className="small fw-bold mt-2 pt-1 mb-2">
              Already have an account?{" "}
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/login");
                }}
                className="link-danger"
              >
                Login
              </a>
            </p>
          </Form>
          <div className="d-flex align-items-center mt-4">
            <hr className="flex-grow-1" />
            <span>OR</span>
            <hr className="flex-grow-1" />
          </div>
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => alert("Google login failed.")}
          />
        </Col>
        
      </Row>
    </Container>
  );
}

export default Register;
