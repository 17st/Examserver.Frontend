// import axios from 'axios';
// import React, { useState } from 'react';
// import { Form, Button, Alert, Container, Row, Col } from 'react-bootstrap';
// // import './ForgotPassword.css'; // Custom styles (optional)

// const ForgotPassword = ({ onBackToLogin }) => {
//   const [email, setEmail] = useState('');
//   const [message, setMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Ensure email is valid
//     if (!email) {
//       setError('Please enter your email address.');
//       return;
//     }
//     setError('');
//     setLoading(true);

//     try {
//       const response = await axios.get('http://localhost:8808/api/users/forgot-password', {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email }),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setMessage('Password reset email sent! Please check your inbox.');
//       } else {
//         setError(data.message || 'An error occurred. Please try again.');
//       }
//     } catch (err) {
//       setError('There was an issue connecting to the server. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="forgot-wrapper">
//     <Container className="forgot-password-container">
//       <Row className="justify-content-center">
//         <Col md={6}>
//            <Form onSubmit={handleSubmit} className="forgot-form">
//             <Form.Group controlId="email">
//               <Form.Label>Email Address</Form.Label>
//               <Form.Control 
//                 type="email"
//                 placeholder="Enter your email"
//                 value={email}
//                 onChange={handleEmailChange}
//                 required
//               />
//             </Form.Group>

//               {/* Display success or error message */}
//             {message && <Alert variant="success" className="mt-3">{message}</Alert>}
//             {error && !message && <Alert variant="danger" className="mt-3">{error}</Alert>}


//           </Form>

//           <div className="text-center mt-3">
//             <Button variant="link" onClick={onBackToLogin} className="text-muted">
//               Back to Login
//             </Button>
//           </div>
//         </Col>
//       </Row>
//     </Container>
//     </div>
//   );
// };

// export default ForgotPassword;



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

    const handleForgotPassword = async () => {
        try {
            const response = await axios.get(`http://localhost:8808/api/users/forgot-password`, {
                params: { userEmail: email }
            });
            alert(response.data.message || 'OTP sent successfully!');
            setStep(2);
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to send OTP. Please try again.');
        }
    };

    const handleResetPassword = async () => {
        if (newPassword !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
          const response = await axios.post(
            `http://localhost:8808/api/users/reset-password-otp?userEmail=${email}&otp=${otp}&newPassword=${newPassword}`
        );
            console.log(`email: ${email}, otp: ${otp}, newPassword: ${newPassword}`);
            alert(response.data.message || 'Password reset successfully!');
            navigate('/login');
        } catch (error) {
            alert(error.response?.data?.message || 'Failed to reset password. Please try again.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '10px' }}>
            <h2>{step === 1 ? 'Forgot Password' : 'Reset Password'}</h2>

            {step === 1 && (
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <button onClick={handleForgotPassword}>Send OTP</button>
                </div>
            )}

            {step === 2 && (
                <div>
                    <label htmlFor="otp">OTP:</label>
                    <input
                        type="text"
                        id="otp"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        required
                    />
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                    <button onClick={handleResetPassword}>Reset Password</button>
                </div>
            )}
        </div>
    );
};

export default ForgotPassword;
