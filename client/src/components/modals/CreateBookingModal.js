import React, { useState, useContext } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';
import axios from 'axios';

const CreateBookingModal = ({ show, handleClose, handleCreate }) => {
    const { employee } = useContext(EmployeeContext);
    const [bookingDate, setBookingDate] = useState('');
    const [bookingTime, setBookingTime] = useState('');
    const [game, setGame] = useState('');
    const [numberOfPlayers, setNumberOfPlayers] = useState('');
    const [price, setPrice] = useState('');
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
                price: price,
                host: host,
                gameMaster: gameMaster,
            });

            console.log(response.data);

            // Reset form fields
            setBookingDate('');
            setBookingTime('');
            setGame('');
            setNumberOfPlayers('');
            setPrice('');
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
                            <option value="Game 1">Game 1</option>
                            <option value="Game 2">Game 2</option>
                            <option value="Game 3">Game 3</option>
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
                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            required
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
