import React, { useState, useContext } from 'react';
import { Modal, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';
import axios from 'axios';

const CreateBookingModal = ({ show, handleClose, handleCreate }) => {
    const { employees } = useContext(EmployeeContext);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [game, setGame] = useState('');
    const [numberOfPlayers, setNumberOfPlayers] = useState('');
    const [paid, setPaid] = useState('');
    const [host, setHost] = useState('');
    const [gameMaster, setGameMaster] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/bookings', {
                bookingDate: bookingDate,
                bookingTime: bookingTime,
                game: game,
                numberOfPlayers: numberOfPlayers,
                paid: paid,
                host: host,
                gameMaster: gameMaster,
            });

            console.log(response.data);

            // Reset form fields
            setBookingDate('');
            setBookingTime('');
            setGame('');
            setNumberOfPlayers('');
            setPaid('');
            setHost('');
            setGameMaster('');

            // Hide modal
            handleClose();
        } catch (error) {
            console.error('Error creating booking:', error);
        }
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="bookingDate" className='mb-3'>
                        <Form.Label>Booking Date</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="date"
                                value={bookingDate}
                                onChange={(e) => setBookingDate(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid booking date.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="bookingTime" className='mb-3'>
                        <Form.Label>Booking Time</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="time"
                                value={bookingTime}
                                onChange={(e) => setBookingTime(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid booking time.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="game" className='mb-3'>
                        <Form.Label>Game</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                as="select"
                                value={game}
                                onChange={(e) => setGame(e.target.value)}
                                required
                            >
                                <option value="">Select a game</option>
                                <option value="hostage">Hostage</option>
                                <option value="box">B.O.X</option>
                                <option value="nursery">Nursery</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please select a game.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="numberOfPlayers" className='mb-3'>
                        <Form.Label>Number of Players</Form.Label>
                        <InputGroup hasValidation>
                            <Form.Control
                                type="number"
                                value={numberOfPlayers}
                                onChange={(e) => setNumberOfPlayers(e.target.value)}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid number of players.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="host">
                        <InputGroup hasValidation>
                            <InputGroup.Text>Host</InputGroup.Text>
                            <Form.Control
                                as="select"
                                value={host}
                                onChange={(e) => setHost(e.target.value)}
                                required
                            >
                                <option value="">--Select a Host--</option>
                                {employees.map((employee) => (
                                    <option key={employee._id} value={employee._id}>
                                        {employee.firstName} {employee.lastName}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please select a host.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                < Button variant="primary" type="submit" onClick={handleCreate}>
                    Create Booking
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateBookingModal;
