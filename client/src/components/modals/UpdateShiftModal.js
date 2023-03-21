import React, { useState, useContext } from 'react';
import { Modal, Button, Form, Col, Row } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';
import axios from 'axios';

const UpdateShiftModal = ({ shift, show, handleClose, handleUpdateShift }) => {
    const { employees } = useContext(EmployeeContext);
    const [dayShiftPic, setDayShiftPic] = useState(shift.dayShift.pic?._id || '');
    const [eveningShiftPic, setEveningShiftPic] = useState(shift.eveningShift.pic?._id || '');

    const initialDayShiftEmployees = shift.dayShift.employees ? shift.dayShift.employees.map(employee => employee._id) : [];
    const initialEveningShiftEmployees = shift.eveningShift.employees ? shift.eveningShift.employees.map(employee => employee._id) : [];

    const [dayShiftEmployee1, setDayShiftEmployee1] = useState(initialDayShiftEmployees[0] || '');
    const [dayShiftEmployee2, setDayShiftEmployee2] = useState(initialDayShiftEmployees[1] || '');
    const [dayShiftEmployee3, setDayShiftEmployee3] = useState(initialDayShiftEmployees[2] || '');
    const [dayShiftEmployee4, setDayShiftEmployee4] = useState(initialDayShiftEmployees[3] || '');

    const [eveningShiftEmployee1, setEveningShiftEmployee1] = useState(initialEveningShiftEmployees[0] || '');
    const [eveningShiftEmployee2, setEveningShiftEmployee2] = useState(initialEveningShiftEmployees[1] || '');
    const [eveningShiftEmployee3, setEveningShiftEmployee3] = useState(initialEveningShiftEmployees[2] || '');
    const [eveningShiftEmployee4, setEveningShiftEmployee4] = useState(initialEveningShiftEmployees[3] || '');

    const createEmployeeSelect = (label, controlId, employeeId, setEmployeeId) => (
        <Form.Group controlId={controlId}>
            <Form.Label>{label}</Form.Label>
            <Form.Control as="select" value={employeeId} onChange={e => setEmployeeId(e.target.value)}>
                <option value="">Select Employee</option>
                {employees.map(employee => (
                    <option key={employee._id} value={employee._id}>{employee.firstName} {employee.lastName}</option>
                ))}
            </Form.Control>
        </Form.Group>
    );

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedShift = {
            dayShift: {
                pic: dayShiftPic,
                employees: [
                    dayShiftEmployee1,
                    dayShiftEmployee2,
                    dayShiftEmployee3,
                    dayShiftEmployee4,
                ].filter((employee) => employee !== ""),
            },
            eveningShift: {
                pic: eveningShiftPic,
                employees: [
                    eveningShiftEmployee1,
                    eveningShiftEmployee2,
                    eveningShiftEmployee3,
                    eveningShiftEmployee4,
                ].filter((employee) => employee !== ""),
            },
        };
        axios
            .put(`http://localhost:8000/api/shifts/update/${shift._id}`, updatedShift)
            .then(() => {
                handleClose();
                handleUpdateShift(shift._id, updatedShift);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Modal show={show} onHide={handleClose} size='lg'>
            <Modal.Header closeButton>
                <Modal.Title>Update Shift</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                            {createEmployeeSelect('Day Shift PIC', 'dayShiftPic', dayShiftPic, setDayShiftPic)}
                            {createEmployeeSelect('Day Shift Employee 1', 'dayShiftEmployee1', dayShiftEmployee1, setDayShiftEmployee1)}
                            {createEmployeeSelect('Day Shift Employee 2', 'dayShiftEmployee2', dayShiftEmployee2, setDayShiftEmployee2)}
                            {createEmployeeSelect('Day Shift Employee 3', 'dayShiftEmployee3', dayShiftEmployee3, setDayShiftEmployee3)}
                            {/* {createEmployeeSelect('Day Shift Employee 4', 'dayShiftEmployee4', dayShiftEmployee4, setDayShiftEmployee4)} */}
                        </Col>
                        <Col>
                            {createEmployeeSelect('Evening Shift PIC', 'eveningShiftPic', eveningShiftPic, setEveningShiftPic)}
                            {createEmployeeSelect('Evening Shift Employee 1', 'eveningShiftEmployee1', eveningShiftEmployee1, setEveningShiftEmployee1)}
                            {createEmployeeSelect('Evening Shift Employee 2', 'eveningShiftEmployee2', eveningShiftEmployee2, setEveningShiftEmployee2)}
                            {createEmployeeSelect('Evening Shift Employee 3', 'eveningShiftEmployee3', eveningShiftEmployee3, setEveningShiftEmployee3)}
                            {/* {createEmployeeSelect('Evening Shift Employee 4', 'eveningShiftEmployee4', eveningShiftEmployee4, setEveningShiftEmployee4)} */}
                        </Col>
                    </Row>
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
}

export default UpdateShiftModal;

