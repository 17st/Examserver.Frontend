import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo'); // Optional, if you store user info

        // Redirect to the login page
        navigate('/login');
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
            <div className="logout-container" style={styles.container}>
                <h2 style={styles.heading}>Are you sure you want to logout?</h2>
                <Button 
                    variant="danger" 
                    size="lg" 
                    onClick={handleLogout} 
                    style={styles.button}
                >
                    Logout
                </Button>
            </div>
        </Container>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '40px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        width: '300px',
    },
    heading: {
        color: '#343a40',
        marginBottom: '20px',
    },
    button: {
        backgroundColor: '#dc3545',
        border: 'none',
        fontSize: '18px',
        padding: '10px 20px',
        cursor: 'pointer',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease',
    },
};

export default Logout;
