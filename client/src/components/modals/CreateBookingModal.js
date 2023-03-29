import React, { useState, useContext } from 'react';
import { Modal, Button, Form, InputGroup, ToggleButton, ToggleButtonGroup, ButtonGroup } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';
import axios from 'axios';
import mongoose from 'mongoose';
import moment from 'moment';
import Select from 'react-select';
import 'moment-timezone';

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

    const handleSubmit = (e) => {
        e.preventDefault();

        const dateObj = new Date(`${date}T${time.value}`);
        const dateFormatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' });
        const timeFormatter = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
        const dateValue = dateFormatter.format(dateObj).replaceAll("/", "-");
        const timeValue = timeFormatter.format(dateObj);

        const bookingData = {
            date: dateValue,
            gameName,
            time: timeValue,
            numberOfPeople,
            shift,
            host: host.value,
            gameMaster: gameMaster.value,
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

    const generateTimeOptions = () => {
        const options = [];
        for (let i = 12; i < 23; i++) { // Start loop from 12
            const hour24 = i % 24;
            const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
            const amPm = hour24 < 12 ? 'AM' : 'PM';
            options.push({ value: `${hour24.toString().padStart(2, '0')}:00`, label: `${hour12}:00 ${amPm}` });
            options.push({ value: `${hour24.toString().padStart(2, '0')}:30`, label: `${hour12}:30 ${amPm}` });
        }
        return options;
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Create Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    
                    <Form.Group controlId="gameName" className='mb-4'>
                        <Form.Label className='h5'>Select Game</Form.Label>
                        <div>
                        <ButtonGroup size='md' className='w-100'>
                            {['Hostage', 'BOX', 'Nursery'].map((game, idx) => (
                                <Button
                                    key={idx}
                                    variant={gameName === game ? "primary" : "outline-secondary"}
                                    onClick={() => setGameName(game)}
                                    className='flex-grow-1'
                                >
                                    {game}
                                </Button>
                            ))}
                        </ButtonGroup>
                        </div>
                    </Form.Group>

                    <Form.Group controlId="date" className='mb-4'>
                        <Form.Label className='h5'>Select Date</Form.Label>
                        <Form.Control
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="time" className='mb-4'>
                        <Form.Label className='h5'>Select Time</Form.Label>
                        <Select
                            value={time}
                            onChange={(selectedTime) => setTime(selectedTime)}
                            options={generateTimeOptions()}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="numberOfPeople" className="mb-4">
                        <Form.Label className='h5'>Number of Players</Form.Label>
                        <div>
                            <ButtonGroup size="md" className="w-100 d-flex mb-2">
                                {Array.from({ length: 5 }, (_, i) => i + 1).map((number) => (
                                    <Button
                                        key={number}
                                        variant={numberOfPeople === number ? "primary" : "outline-secondary"}
                                        onClick={() => setNumberOfPeople(number)}
                                        className="flex-grow-1"
                                        style={{ width: '20%' }}
                                    >
                                        {number}
                                    </Button>
                                ))}
                            </ButtonGroup>
                            <ButtonGroup size="md" className="w-100 d-flex">
                                {Array.from({ length: 5 }, (_, i) => i + 6).map((number) => (
                                    <Button
                                        key={number}
                                        variant={numberOfPeople === number ? "primary" : "outline-secondary"}
                                        onClick={() => setNumberOfPeople(number)}
                                        className="flex-grow-1"
                                        style={{ width: '20%' }}
                                    >
                                        {number}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </div>
                    </Form.Group>

                    <Form.Group controlId="shift" className='mb-4'>
                        <Form.Label className='h5'>Shift</Form.Label>
                        <div>
                            <ButtonGroup size="md" className='w-100'>
                                {['Day', 'Evening'].map((shiftOption, idx) => (
                                    <Button
                                        key={idx}
                                        variant={shift === shiftOption ? "primary" : "outline-secondary"}
                                        onClick={() => setShift(shiftOption)}
                                        className='flex-grow-1'
                                    >
                                        {shiftOption} Shift
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </div>
                    </Form.Group>


                    <Form.Group controlId="host" className='mb-4'>
                        <Form.Label className='h5'>Select Host/ Keeper</Form.Label>
                        <Select
                            name="host"
                            value={host}
                            onChange={setHost}
                            options={hostOptions}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="gameMaster" className='mb-4'>
                        <Form.Label className='h5'>Select Game Master</Form.Label>
                        <Select
                            name="gameMaster"
                            value={gameMaster}
                            onChange={setGameMaster}
                            options={gameMasterOptions}
                            required
                        />
                    </Form.Group>


                    <Form.Group controlId="notes">
                        <Form.Label className='h5'>Notes</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={2}
                            name="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                        />
                    </Form.Group>
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


