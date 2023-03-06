import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

const EmployeeModal = ({ show, handleClose }) => {
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [phone, setPhone] = useState('');
const [birthday, setBirthday] = useState('');
// const [errors, setErrors] = useState("");


const handleSubmit = (e) => {
    e.preventDefault();
    // const newEmployee = { name, email, phone, birthday };
    axios.post("http://localhost:8000/api/employees", {name,email,phone, birthday})
    .then(response => {
        console.log(response);
        setName("")
        setEmail("")
        setPhone("")
        setBirthday("")
        // setShow(false)
        handleClose();
    })
    .catch((err) => {
        console.log(err)
            // setErrors(err.response.data.error.errors);
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
        <Button variant="primary" type="submit">
            Add Employee
        </Button>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
    </Modal.Footer>
    </Modal>
    );
};

export default EmployeeModal;
