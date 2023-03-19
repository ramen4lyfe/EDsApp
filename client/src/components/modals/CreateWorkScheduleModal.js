import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';
import axios from 'axios';

const CreateWorkScheduleModal = ({ show, handleClose }) => {
const { employees } = useContext(EmployeeContext);
const [pic, setPic] = useState('');
const [dayShift, setDayShift] = useState('');
const [eveningShift, setEveningShift] = useState('');

const handleSubmit = async () => {
// Check if all fields are selected
if (pic === '' || dayShift === '' || eveningShift === '') {
// Show an error message if any field is not selected
alert('Please select all the fields.');
return;
}

// Process the selected employees and create a new work schedule
try {
const response = await axios.post('http://localhost:8000/api/shifts', {
    pic,
    employees: [dayShift, eveningShift],
    // date: /* Provide the date for this work schedule */,
    shiftPeriod: 'Day', // Change this to 'Evening' if you want to submit for the evening shift
});

// Handle success response, e.g., close modal and refresh the table
handleClose();
// You can add a callback function to update the table in the parent component
} catch (error) {
// Handle error response, e.g., show an error message
console.log('Error creating work schedule:', error);
}
};

return (
    <Modal show={show} onHide={handleClose} centered>
    <Modal.Header closeButton>
        <Modal.Title>Create Work Schedule</Modal.Title>
    </Modal.Header>
    <Modal.Body>
        <Form>
        <Form.Group controlId="pic">
            <Form.Label>Person In Charge</Form.Label>
            <Form.Control as="select" value={pic} onChange={(e) => setPic(e.target.value)}>
            <option value="">Select PIC</option>
            {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                {employee.firstName} {employee.lastName}
                </option>
            ))}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="dayShift">
            <Form.Label>Day Shift</Form.Label>
            <Form.Control as="select" value={dayShift} onChange={(e) => setDayShift(e.target.value)}>
            <option value="">Select Day Shift</option>
            {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                {employee.firstName} {employee.lastName}
                </option>
            ))}
            </Form.Control>
        </Form.Group>
        <Form.Group controlId="eveningShift">
            <Form.Label>Evening Shift</Form.Label>
            <Form.Control as="select" value={eveningShift} onChange={(e) => setEveningShift(e.target.value)}>
            <option value="">Select Evening Shift</option>
            {employees.map((employee) => (
                <option key={employee._id} value={employee._id}>
                {employee.firstName} {employee.lastName}
                </option>
            ))}
            </Form.Control>
        </Form.Group>
        </Form>
    </Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
        Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
        Save Changes
        </Button>
    </Modal.Footer>
    </Modal>
);
};

export default CreateWorkScheduleModal;
