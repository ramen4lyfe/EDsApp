import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

function EmployeeModal ({ show, handleClose }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState('');
    const [errors, setErrors] = useState('');

    const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:8000/api/employees", { name, email, phone, birthday })
        .then((response) => {
            console.log(response);
            setName("");
            setEmail("");
            setPhone("");
            setBirthday("");
            handleClose();
        })
        .catch((err) => {
        console.log("Axios error:", err); // log error
        if (err.response && err.response.data && err.response.data.error && err.response.data.error.errors) {
            setErrors(err.response.data.error.errors);
        } else {
          // handle other types of errors
            console.log(err);
        }
    });
};

return (
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
        </Modal.Header>
    <Modal.Body>
        <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
        </Form.Group>
        <Form.Group controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
        </Form.Group>
        <Form.Group controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
                type="text"
                placeholder="Enter phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
            />
        </Form.Group>
        <Form.Group controlId="formBasicBirthday">
            <Form.Label>Birthday</Form.Label>
            <Form.Control
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
            />
        </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
            Add Employee
        </Button>
    </Modal.Footer>
    </Modal>
    );
};

export default EmployeeModal;
