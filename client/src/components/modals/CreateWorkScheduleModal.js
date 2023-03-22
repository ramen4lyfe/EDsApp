import React, { useContext, useState } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';
import axios from 'axios';

const CreateWorkScheduleModal = ({ show, handleClose }) => {
    const { employees } = useContext(EmployeeContext);
    const [selectedDate, setSelectedDate] = useState('');
    const [dayShiftPic, setDayShiftPic] = useState('');
    const [dayShiftEmployee1, setDayShiftEmployee1] = useState('');
    const [dayShiftEmployee2, setDayShiftEmployee2] = useState('');
    const [dayShiftEmployee3, setDayShiftEmployee3] = useState('');
    // const [dayShiftEmployee4, setDayShiftEmployee4] = useState('');
    const [eveningShiftPic, setEveningShiftPic] = useState('');
    const [eveningShiftEmployee1, setEveningShiftEmployee1] = useState('');
    const [eveningShiftEmployee2, setEveningShiftEmployee2] = useState('');
    const [eveningShiftEmployee3, setEveningShiftEmployee3] = useState('');
    // const [eveningShiftEmployee4, setEveningShiftEmployee4] = useState('');

    
    const handleSubmit = (e) => {
        e.preventDefault();

        const date = new Date(selectedDate);
        const offset = date.getTimezoneOffset() * 60 * 1000;
        const adjustedDate = new Date(date.getTime() + offset);

        const shiftData = {
            date: adjustedDate.toISOString(),
            dayShift: {
                pic: dayShiftPic,
                employees: [dayShiftEmployee1, dayShiftEmployee2, dayShiftEmployee3].filter(employee => employee !== ''),
            },
            eveningShift: {
                pic: eveningShiftPic,
                employees: [eveningShiftEmployee1, eveningShiftEmployee2, eveningShiftEmployee3].filter(employee => employee !== ''),
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
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Add New Work Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="shiftDate" className='mb-4'>
                        <Form.Label>Select Date</Form.Label>
                        <Form.Control type="date" value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)} required />
                    </Form.Group>
                    
                    <Row>
                        <Col>
                            <Form.Group controlId="dayShiftPic" className='mb-3'>
                                <Form.Control as="select" value={dayShiftPic} onChange={(e) => setDayShiftPic(e.target.value)} required>
                                    <option value="">Select Day Shift PIC</option>
                                    {employees.map((employee) => (
                                        <option key={employee._id} value={employee._id}>
                                            {employee.firstName} {employee.lastName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="dayShiftEmployee1" className='mb-3'>
                                <Form.Control as="select" value={dayShiftEmployee1} onChange={(e) => setDayShiftEmployee1(e.target.value)} required>
                                    <option value="">Select employee 1</option>
                                    {employees.map((employee) => (
                                        <option key={employee._id} value={employee._id}>
                                            {employee.firstName} {employee.lastName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="dayShiftEmployee2" className='mb-3'>
                                <Form.Control as="select" value={dayShiftEmployee2} onChange={(e) => setDayShiftEmployee2(e.target.value)}>
                                    <option value="">Select Employee 2</option>
                                    {employees.map((employee) => (
                                        <option key={employee._id} value={employee._id}>
                                            {employee.firstName} {employee.lastName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="dayShiftEmployee3" className='mb-3'>
                                <Form.Control as="select" value={dayShiftEmployee3} onChange={(e) => setDayShiftEmployee3(e.target.value)}>
                                    <option value="">Select Employee 3</option>
                                    {employees.map((employee) => (
                                        <option key={employee._id} value={employee._id}>
                                            {employee.firstName} {employee.lastName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        {/* <Form.Group controlId="dayShiftEmployee4">
                        <Form.Label>Day Shift Employee 4</Form.Label>
                        <Form.Control as="select" value={dayShiftEmployee4} onChange={(e) => setDayShiftEmployee4(e.target.value)}>
                            <option value="">Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group> */}
                        <Col>
                            <Form.Group controlId="eveningShiftPic" className='mb-3'>
                                <Form.Control as="select" value={eveningShiftPic} onChange={(e) => setEveningShiftPic(e.target.value)} required>
                                    <option value="">Select Evening Shift PIC</option>
                                    {employees.map((employee) => (
                                        <option key={employee._id} value={employee._id}>
                                            {employee.firstName} {employee.lastName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="eveningShiftEmployee1" className='mb-3'>
                                <Form.Control as="select" value={eveningShiftEmployee1} onChange={(e) => setEveningShiftEmployee1(e.target.value)}>
                                    <option value="">Select Employee 1</option>
                                    {employees.map((employee) => (
                                        <option key={employee._id} value={employee._id}>
                                            {employee.firstName} {employee.lastName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="eveningShiftEmployee2" className='mb-3'>
                                <Form.Control as="select" value={eveningShiftEmployee2} onChange={(e) => setEveningShiftEmployee2(e.target.value)}>
                                    <option value="">Select Employee 2</option>
                                    {employees.map((employee) => (
                                        <option key={employee._id} value={employee._id}>
                                            {employee.firstName} {employee.lastName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="eveningShiftEmployee3" className='mb-3'>
                                <Form.Control as="select" value={eveningShiftEmployee3} onChange={(e) => setEveningShiftEmployee3(e.target.value)}>
                                    <option value="">Select Employee 3</option>
                                    {employees.map((employee) => (
                                        <option key={employee._id} value={employee._id}>
                                            {employee.firstName} {employee.lastName}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>

                            {/* <Form.Group controlId="eveningShiftEmployee4">
                        <Form.Label>Evening Shift Employee 4</Form.Label>
                        <Form.Control as="select" value={eveningShiftEmployee4} onChange={(e) => setEveningShiftEmployee4(e.target.value)}>
                            <option value="">Select Employee</option>
                            {employees.map((employee) => (
                                <option key={employee._id} value={employee._id}>
                                    {employee.firstName} {employee.lastName}
                                </option>
                            ))}
                        </Form.Control>
                    </Form.Group> */}
                            
                        </Col>
                    </Row>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Create
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateWorkScheduleModal;
