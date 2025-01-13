import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './login.css';
import axios from 'axios';
import ForgotPassword from './ForgotPassword';

function Login() {
  const [userEmail, setuserEmail] = useState('');
  const [userPass, setuserPass] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!userEmail) newErrors.userEmail = 'Email or Username is required';
    if (!userPass) newErrors.userPass = 'Password is required';
    return newErrors;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      setErrors({});
      setLoading(true);

      try {
        const response = await axios.get('http://localhost:8808/api/auth/login_user', {
          params: {
            userEmail,
            userPass,
          },
        });

        if (response.status === 200) {
          const token = response.data.token;
          localStorage.setItem("token", token);

          // Get the redirect path or default to '/'
          const redirectPath = localStorage.getItem("redirectPath") || '/';
          localStorage.removeItem("redirectPath"); // Clear the redirect path
          navigate(redirectPath); // Redirect to the desired page
        }
      } catch (error) {
        console.error('Login failed:', error);
        setErrors({
          general: error.response?.data?.message || 'Login failed. Please try again.',
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleGoToRegister = () => {
    navigate('/register');
  };

  return (
    <div className="login-wrapper">
      <div className="login-form-container">
        <h2 className="login-title">{showForgotPassword ? 'Forgot Password' : 'Login'}</h2>
        {showForgotPassword ? (
          <ForgotPassword onBackToLogin={() => setShowForgotPassword(false)} />
        ) : (
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Group className="mb-3" controlId="formBasicuserEmail">
              <Form.Label>Username or Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username or Email"
                value={userEmail}
                onChange={(e) => setuserEmail(e.target.value)}
                isInvalid={!!errors.userEmail}
              />
              <Form.Control.Feedback type="invalid">{errors.userEmail}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicuserPass">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={userPass}
                onChange={(e) => setuserPass(e.target.value)}
                isInvalid={!!errors.userPass}
              />
              <Form.Control.Feedback type="invalid">{errors.userPass}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-2" controlId="checkbox">
              <Form.Check type="checkbox" label="Remember me" />
            </Form.Group>

            <Button variant="primary" type="submit" className="login-button" disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </Button>

            {errors.general && <p className="text-danger mt-3">{errors.general}</p>}

            <div className="d-grid justify-content-end mt-2">
              <Button
                className="text-muted px-0"
                variant="link"
                onClick={() => setShowForgotPassword(true)}
              >
                Forgot Password?
              </Button>
            </div>

            <div className="text-center mt-3">
              <p>Don't have an account?</p>
              <Button variant="link" onClick={handleGoToRegister}>
                Register here
              </Button>
            </div>
          </Form>
        )}
      </div>
    </div>
  );
}

export default Login;
