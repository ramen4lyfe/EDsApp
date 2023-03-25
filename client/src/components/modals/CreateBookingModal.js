import React, { useState, useContext } from 'react';
import { Modal, Button, Form,InputGroup } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';

const CreateBookingModal = ({ show, onHide, handleCreateBooking }) => {
    const { employees } = useContext(EmployeeContext);
    const [bookingData, setBookingData] = useState({
        gameName: '',
        time: '',
        numberOfPeople: '',
        shift: '',
        host: '',
        gameMaster: '',
        notes: '',
    });

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleCreateBooking(bookingData);
        onHide();
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="gameName">
                        <Form.Label>Game Name</Form.Label>
                        <Form.Control
                            type="text"
                            name="gameName"
                            value={bookingData.gameName}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="time">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            name="time"
                            value={bookingData.time}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="numberOfPeople">
                        <Form.Label>Number of People</Form.Label>
                        <Form.Control
                            as="select"
                            name="numberOfPeople"
                            value={bookingData.numberOfPeople}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select number of people</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="shift">
                        <Form.Label>Shift</Form.Label>
                        <Form.Control
                            as="select"
                            name="shift"
                            value={bookingData.shift}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select shift</option>
                            <option value="day">Day Shift</option>
                            <option value="evening">Evening Shift</option>
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="host">
                        <Form.Label>Host</Form.Label>
                        <Form.Control
                            as="select"
                            name="host"
                            value={bookingData.host}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select host</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="gameMaster">
                        <Form.Label>Game Master</Form.Label>
                        <Form.Control
                            as="select"
                            name="gameMaster"
                            value={bookingData.gameMaster}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select game master</option>
                            {employees.map((employee) => (
                                <option key={employee.id} value={employee.id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="notes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="notes"
                            value={bookingData.notes}
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Create Booking
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateBookingModal;
