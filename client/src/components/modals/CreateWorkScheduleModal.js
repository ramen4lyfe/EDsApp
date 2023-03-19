import React, { useContext, useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';
import axios from 'axios';

const CreateWorkScheduleModal = ({ show, handleClose }) => {
    const { employees } = useContext(EmployeeContext);
    const [selectedDate, setSelectedDate] = useState('');
    const [dayShiftPic, setDayShiftPic] = useState('');
    const [dayShiftEmployee1, setDayShiftEmployee1] = useState('');
    const [dayShiftEmployee2, setDayShiftEmployee2] = useState('');
    const [dayShiftEmployee3, setDayShiftEmployee3] = useState('');
    const [dayShiftEmployee4, setDayShiftEmployee4] = useState('');
    const [eveningShiftPic, setEveningShiftPic] = useState('');
    const [eveningShiftEmployee1, setEveningShiftEmployee1] = useState('');
    const [eveningShiftEmployee2, setEveningShiftEmployee2] = useState('');
    const [eveningShiftEmployee3, setEveningShiftEmployee3] = useState('');
    const [eveningShiftEmployee4, setEveningShiftEmployee4] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const shiftData = {
            date: selectedDate,
            dayShift: {
                pic: dayShiftPic,
                employees: [dayShiftEmployee1, dayShiftEmployee2, dayShiftEmployee3, dayShiftEmployee4].filter(employee => employee !== ''),
            },
            eveningShift: {
                pic: eveningShiftPic,
                employees: [eveningShiftEmployee1, eveningShiftEmployee2, eveningShiftEmployee3, eveningShiftEmployee4].filter(employee => employee !== ''),
            },
        };

        axios.post('http://localhost:8000/api/shifts', shiftData)
            .then(() => {
                handleClose();
            })
            .catch((err) => {
                console.error(err);
            });
    };


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Shift</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="shiftDate">
                        <Form.Label>Date</Form.Label>
                        <Form.Control type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />
                    </Form.Group>
                    <Form.Group controlId="dayShiftPic">
                        <Form.Label>Day Shift PIC</Form.Label>
                        <Form.Control as="select" value={dayShiftPic} onChange={(e) => setDayShiftPic(e.target.value)} required>
                            <option value="">Select PIC</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="dayShiftEmployee1">
                        <Form.Label>Day Shift Employee 1</Form.Label>
                        <Form.Control as="select" value={dayShiftEmployee1} onChange={(e) => setDayShiftEmployee1(e.target.value)} required>
                            <option value="">Select employee</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="dayShiftEmployee2">
                        <Form.Label>Day Shift Employee 2</Form.Label>
                        <Form.Control as="select" value={dayShiftEmployee2} onChange={(e) => setDayShiftEmployee2(e.target.value)}>
                            <option value="">Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="dayShiftEmployee3">
                        <Form.Label>Day Shift Employee 3</Form.Label>
                        <Form.Control as="select" value={dayShiftEmployee3} onChange={(e) => setDayShiftEmployee3(e.target.value)}>
                            <option value="">Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="dayShiftEmployee4">
                        <Form.Label>Day Shift Employee 4</Form.Label>
                        <Form.Control as="select" value={dayShiftEmployee4} onChange={(e) => setDayShiftEmployee4(e.target.value)}>
                            <option value="">Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="eveningShiftEmployee1">
                        <Form.Label>Evening Shift Employee 1</Form.Label>
                        <Form.Control as="select" value={eveningShiftEmployee1} onChange={(e) => setEveningShiftEmployee1(e.target.value)}>
                            <option value="">Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="eveningShiftEmployee2">
                        <Form.Label>Evening Shift Employee 2</Form.Label>
                        <Form.Control as="select" value={eveningShiftEmployee2} onChange={(e) => setEveningShiftEmployee2(e.target.value)}>
                            <option value="">Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="eveningShiftEmployee3">
                        <Form.Label>Evening Shift Employee 3</Form.Label>
                        <Form.Control as="select" value={eveningShiftEmployee3} onChange={(e) => setEveningShiftEmployee3(e.target.value)}>
                            <option value="">Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="eveningShiftEmployee4">
                        <Form.Label>Evening Shift Employee 4</Form.Label>
                        <Form.Control as="select" value={eveningShiftEmployee4} onChange={(e) => setEveningShiftEmployee4(e.target.value)}>
                            <option value="">Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="eveningShiftPic">
                        <Form.Label>Evening Shift PIC</Form.Label>
                        <Form.Control as="select" value={eveningShiftPic} onChange={(e) => setEveningShiftPic(e.target.value)} required>
                            <option value="">Select PIC</option>
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
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateWorkScheduleModal;
