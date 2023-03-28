import React, { useContext, useState, useEffect } from 'react';
import { EmployeeContext } from '../context/EmployeeContext';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const UpdateBookingModal = ({ show, onHide, booking, fetchBookings }) => {
    const { employees } = useContext(EmployeeContext);

    const [updatedBooking, setUpdatedBooking] = useState({});

    useEffect(() => {
        if (booking) {
        setUpdatedBooking({ ...booking });
        }
    }, [booking]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBooking({
            ...updatedBooking,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8000/api/bookings/update/${booking._id}`, updatedBooking);
            fetchBookings();
            onHide();
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Update Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    
                    <Form.Group controlId="date">
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control type="date" name="date" value={updatedBooking.date} onChange={handleChange} required />
                    </Form.Group>

                    <Form.Group controlId="gameName">
                        <Form.Label>Game Name</Form.Label>
                        <Form.Control
                            as="select"
                            name="gameName"
                            value={updatedBooking.gameName}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select game name</option>
                            <option value="Hostage">Hostage</option>
                            <option value="BOX">B.O.X</option>
                            <option value="Nursery">Nursery</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="time">
                        <Form.Label>Time</Form.Label>
                        <Form.Control
                            type="time"
                            name="time"
                            value={updatedBooking.time}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="numberOfPeople">
                        <Form.Label>Number of People</Form.Label>
                        <Form.Control
                            as="select"
                            name="numberOfPeople"
                            value={updatedBooking.numberOfPeople}
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
                            value={updatedBooking.shift}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select shift</option>
                            <option value="Day">Day Shift</option>
                            <option value="Evening">Evening Shift</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="host">
                        <Form.Label>Host</Form.Label>
                        <Form.Control
                            as="select"
                            name="host"
                            value={updatedBooking.host}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select host</option>
                            {employees.map(employee => (
                                <option key={employee._id} value={employee.name}>
                                    {employee.name}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="gameMaster">
                        <Form.Label>Game Master</Form.Label>
                        <Form.Control
                            as="select"
                            name="gameMaster"
                            value={updatedBooking.gameMaster}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select game master</option>
                            {employees.map(employee => (
                                <option key={employee._id} value={employee.name}>
                                    {employee.name}
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
                            value={updatedBooking.notes}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Update Booking
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default UpdateBookingModal;