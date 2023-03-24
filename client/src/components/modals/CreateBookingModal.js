import React, { useState, useContext } from 'react';
import { Modal, Form, Button, InputGroup, FormControl } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';
import axios from 'axios';
import TimePicker from 'react-time-picker';

const CreateBookingModal = ({ show, handleClose, handleCreate }) => {
    const { employees } = useContext(EmployeeContext);
    const [errors, setErrors] = useState({});
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
                bookingDate,
                bookingTime,
                game,
                numberOfPlayers,
                paid,
                host,
                gameMaster
            });

            console.log(response);
            handleCreate(response.data);
            handleClose();
            setBookingDate('');
            setBookingTime('');
            setGame('');
            setNumberOfPlayers('');
            setPaid('');
            setHost('');
            setGameMaster('');
        } catch (err) {
            console.log(err);
            if (err.response && err.response.data && err.response.data.error && err.response.data.error.errors) {
                setErrors(err.response.data.error.errors);
            } else {
                // handle other types of errors
                console.log(err);
            }
        }
    };

    function handleTimeChange(time) {
        setBookingTime(time);
    }

    return (
        <Modal show={show} onHide={handleClose} size='md'>
            <Modal.Header closeButton>
                <Modal.Title>Create Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="bookingDate" className='mb-3'>
                        <InputGroup hasValidation>
                            <InputGroup.Text>Booking Date</InputGroup.Text>
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
                        <InputGroup hasValidation>
                            <InputGroup.Text>Booking Time</InputGroup.Text>
                            {/* <Form.Control
                                type="time"
                                value={bookingTime}
                                onChange={(e) => setBookingTime(e.target.value)}
                                required
                            /> */}
                            <TimePicker
                                onChange={handleTimeChange}
                                value={bookingTime}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid booking time.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    <Form.Group controlId="game" className='mb-3'>
                        <InputGroup hasValidation>
                            <InputGroup.Text>Game</InputGroup.Text>
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
                        <InputGroup hasValidation>
                            <InputGroup.Text>Number of Players</InputGroup.Text>
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

                    <Form.Group controlId="host" className='mb-3'>
                        <InputGroup hasValidation>
                            <InputGroup.Text>Host</InputGroup.Text>
                            <Form.Control
                                as="select"
                                value={host}
                                onChange={(e) => setHost(e.target.value)}
                                required
                            // name = "employeeId"
                            >
                                <option value="">--Select a Host--</option>
                                {employees.map((employee) => (
                                    <option key={employee._id} value={employee._id}>
                                        {employee.firstName} {employee.lastName}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Select Host.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>

                    <Form.Group controlId="gameMaster" className='mb-3'>
                        <InputGroup hasValidation>
                            <InputGroup.Text>Game Master</InputGroup.Text>
                            <Form.Control
                                as="select"
                                value={gameMaster}
                                onChange={(e) => setGameMaster(e.target.value)}
                                required
                            // name = "employeeId"
                            >
                                <option value="">--Select a GM--</option>
                                {employees.map((employee) => (
                                    <option key={employee._id} value={employee._id}>
                                        {employee.firstName} {employee.lastName}
                                    </option>
                                ))}
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Select GM.
                            </Form.Control.Feedback>
                        </InputGroup>
                    </Form.Group>
                    < Button variant="primary" type="submit" >
                        Create Booking
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
            
        </Modal>
    );
};

export default CreateBookingModal;
