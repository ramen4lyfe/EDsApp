import React, { useState, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
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
                    <Form.Group controlId="bookingDate">
                        <Form.Label>Booking Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="bookingTime">
                        <Form.Label>Booking Time</Form.Label>
                        <Form.Control
                            type="time"
                            value={bookingTime}
                            onChange={(e) => setBookingTime(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group controlId="game">
                        <Form.Label>Game</Form.Label>
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
                    </Form.Group>
                    <Form.Group controlId="numberOfPlayers">
                        <Form.Label>Number of Players</Form.Label>
                        <Form.Control
                            type="number"
                            value={numberOfPlayers}
                            onChange={(e) => setNumberOfPlayers(e.target.value)}
                            required
                        />
                    </Form.Group>
                    
                    <Form.Group controlId="host" className='mb-3'>
                        <Form.Control as="select" value={host} onChange={(e) => setHost(e.target.value)} required>
                            <option value="">--Select a Host--</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    {/* <Form.Group controlId="paid">
                        <Form.Label>Paid</Form.Label>
                        <Form.Control
                            type="select"
                            value={paid}
                            onChange={(e) => setPaid(e.target.value)}
                            required
                        > 
                            <option value="">Paid or not</option>
                            <option value="Yes">Yes</option>
                            <option value="No">Need to collect payment</option>
                        </Form.Control>
                    </Form.Group> */}
                    <Button variant="primary" type="submit">
                        Create Booking
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default CreateBookingModal;
