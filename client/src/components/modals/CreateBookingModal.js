import React, { useState, useContext } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';
import axios from 'axios';
import mongoose from 'mongoose';
import moment from 'moment';

const CreateBookingModal = ({ show, onHide, fetchBookings }) => {
    const { employees } = useContext(EmployeeContext);
    const [date, setDate] = useState('');
    const [gameName, setGameName] = useState('');
    const [time, setTime] = useState('');
    const [numberOfPeople, setNumberOfPeople] = useState('');
    const [shift, setShift] = useState('');
    const [host, setHost] = useState('');
    const [gameMaster, setGameMaster] = useState('');
    const [notes, setNotes] = useState('');
    const [selectedDate, setSelectedDate] = useState('');


    const [errors, setErrors] = useState('');

    const datetime = moment(`${selectedDate} ${time}`, "YYYY-MM-DD HH:mm").toISOString();

    const handleSubmit = (e) => {
        e.preventDefault();
        const dateValue = moment(date).format("YYYY-MM-DD");
        const timeValue = moment(time, "HH:mm").format("HH:mm:ss");
        const dateTimeValue = moment(`${dateValue}T${timeValue}`).toISOString();

        const bookingData = {
            date,
            gameName,
            time,
            numberOfPeople,
            shift,
            host: host.value, // Changed this line
            gameMaster: gameMaster.value, // Changed this line
            notes,
        };

        axios.post('http://localhost:8000/api/bookings', bookingData)
            .then(() => {
                onHide();
                fetchBookings();
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const hostOptions = employees.map(employee => ({ value: employee._id, label: `${employee.firstName} ${employee.lastName}` }));

    const gameMasterOptions = employees.map(employee => ({ value: employee._id, label: `${employee.firstName} ${employee.lastName}` }));

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="date" className='mb-4'>
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
                    </Form.Group>

                    <Form.Group controlId="gameName">
                        <Form.Label>Game Name</Form.Label>
                        <Form.Control
                            as="select"
                            name="gameName"
                            value={gameName}
                            onChange={(e) => setGameName(e.target.value)}
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
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="numberOfPeople">
                        <Form.Label>Number of People</Form.Label>
                        <Form.Control
                            as="select"
                            name="numberOfPeople"
                            value={numberOfPeople}
                            onChange={(e) => setNumberOfPeople(e.target.value)}
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
                            value={shift}
                            onChange={(e) => setShift(e.target.value)}
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
                            value={host.value}
                            onChange={(e) => {
                                const selectedHost = hostOptions.find((option) => option.value === e.target.value);
                                setHost(selectedHost);
                            }}
                            required
                        >
                            <option value="">Select host</option>
                            {hostOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="gameMaster">
                        <Form.Label>Game Master</Form.Label>
                        <Form.Control
                            as="select"
                            name="gameMaster"
                            value={gameMaster.value}
                            onChange={(e) => {
                                const selectedGameMaster = gameMasterOptions.find((option) => option.value === e.target.value);
                                setGameMaster(selectedGameMaster);
                            }}
                            required
                        >
                            <option value="">Select game master</option>
                            {gameMasterOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                        </Form.Control>
                    </Form.Group>


                    <Form.Group controlId="notes">
                        <Form.Label>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Form.Group>
                    
                    {/* <Button variant="primary" type="submit">
                        Create Booking
                    </Button> */}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Create Booking
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBookingModal;


// Todo
// depends on the time selected upon createConnection, it should auto filter into day or evening shift 
// actually better to populate available employees based on the date of the shift schedule. 