// src/components/CreateUserAccount.js
import React, { useState } from 'react';
import { Container, Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';


const CreateUserAccount = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleShowPassword = () => setShowPassword(!showPassword);
    

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Replace this URL with your own backend API endpoint
            const response = await axios.post('http://localhost:8000/api/user', formData);

            // Redirect the user to the appropriate page after successful account creation
            navigate('/login'); // Replace this with your desired page
        } catch (err) {
            console.error('An error occurred during account creation:', err);
        }

        console.log('User account created:');
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <Card>
                <Card.Body>
                    <Card.Title className='mb-3'>EDscapade Games</Card.Title>
                    <Card.Title className='mb-4'>Create your User Account</Card.Title>

                    <Card.Text>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className='mb-4'>
                                <Row className='mb-4'>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required
                                            placeholder='First Name'
                                        />
                                    </Col>
                                    <Col>
                                        <Form.Control
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required
                                            placeholder='Last Name'
                                        />
                                    </Col>
                                </Row>

                                <Form.Control
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    placeholder='Username'
                                    className='mb-4 email-input'
                                />


                                <Form.Control
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    placeholder='Password'
                                    className='mb-4'
                                />
                                <Form.Group controlId="showPassword" className="mb-4">
                                    <Form.Check
                                        type="checkbox"
                                        label="Show Password"
                                        onChange={handleShowPassword}
                                    />
                                </Form.Group>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Create Account
                            </Button>
                        </Form>
                    </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">Already have an account? <Link to="/login">Login</Link></Card.Footer>
            </Card>
            {
                /* <Row className="justify-content-md-center">
                                <Col md="6">
                                    <h1>Create User Account</h1>
                                    <Form onSubmit={handleSubmit}>
                                        <Form.Group controlId="firstName" className='mb-4'>
                                            <Form.Label>First Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="firstName"
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
            
                                        <Form.Group controlId="lastName">
                                            <Form.Label>Last Name</Form.Label>
                                            <Form.Control
                                                type="text"
                                                name="lastName"
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
            
                                        <Form.Group controlId="email">
                                            <Form.Label>Email Address</Form.Label>
                                            <Form.Control
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                        </Form.Group>
            
                                        <Form.Group controlId="password">
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
                                            Create Account
                                        </Button>
                                    </Form>
                                </Col>
                            </Row> */
            }
        </Container>
    );
};

export default CreateUserAccount;
