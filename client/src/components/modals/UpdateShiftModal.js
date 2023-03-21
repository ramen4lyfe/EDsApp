import React, { useState, useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { EmployeeContext } from '../context/EmployeeContext';

const UpdateShiftModal = ({ shift, show, handleClose, handleUpdateShift }) => {
    const [dayShiftPic, setDayShiftPic] = useState(shift.dayShift.pic ? shift.dayShift.pic._id : '');
    const [eveningShiftPic, setEveningShiftPic] = useState(shift.eveningShift.pic ? shift.eveningShift.pic._id : '');
    const [dayShiftEmployees, setDayShiftEmployees] = useState(shift.dayShift.employees ? shift.dayShift.employees.map(employee => employee._id) : []);
    const [eveningShiftEmployees, setEveningShiftEmployees] = useState(shift.eveningShift.employees ? shift.eveningShift.employees.map(employee => employee._id) : []);
    const { employees } = useContext(EmployeeContext);

    const handleSubmit = (event) => {
        event.preventDefault();
        const updatedShift = {
            dayShift: {
                pic: dayShiftPic,
                employees: dayShiftEmployees
            },
            eveningShift: {
                pic: eveningShiftPic,
                employees: eveningShiftEmployees
            }
        }
        handleUpdateShift(shift._id, updatedShift);
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Shift</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group>
                        <Form.Label>Day Shift PIC</Form.Label>
                        <Form.Control as="select" value={dayShiftPic} onChange={e => setDayShiftPic(e.target.value)}>
                            <option value="">Select an employee</option>
                            {employees.map(employee => (
                                <option key={employee._id} value={employee._id}>{employee.firstName} {employee.lastName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Day Shift Employees</Form.Label>
                        <Form.Control as="select" multiple value={dayShiftEmployees} onChange={e => setDayShiftEmployees(Array.from(e.target.selectedOptions, option => option.value))}>
                            {employees.map(employee => (
                                <option key={employee._id} value={employee._id}>{employee.firstName} {employee.lastName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Evening Shift PIC</Form.Label>
                        <Form.Control as="select" value={eveningShiftPic} onChange={e => setEveningShiftPic(e.target.value)}>
                            <option value="">Select an employee</option>
                            {employees.map(employee => (
                                <option key={employee._id} value={employee._id}>{employee.firstName} {employee.lastName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Evening Shift Employees</Form.Label>
                        <Form.Control as="select" multiple value={eveningShiftEmployees} onChange={e => setEveningShiftEmployees(Array.from(e.target.selectedOptions, option => option.value))}>
                            {employees.map(employee => (
                                <option key={employee._id} value={employee._id}>{employee.firstName} {employee.lastName}</option>
                            ))}
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit">Update</Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}

export default UpdateShiftModal;

