// src/components/Login.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

const Login = ({ onLogin }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message);
                return;
            }

            // Store the authentication token (if using token-based authentication)
            localStorage.setItem('authToken', data.token);

            // Call the onLogin prop after successful login
            onLogin();

            // Redirect the user to the appropriate page after successful login
            navigate('/'); // Replace this with your desired page
        } catch (err) {
            setError('An error occurred during login');
            console.error(err);
        }
    };

    return (
        <Container className='login-container'>
            <Row className="justify-content-md-center">
                <Col md="6">
                    <h1>Login</h1>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="email" className='mb-2'>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className='mb-4'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                        <Link to="/createaccounts" className="ml-2">
                            <Button variant="secondary">Create an Account</Button>
                        </Link>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
