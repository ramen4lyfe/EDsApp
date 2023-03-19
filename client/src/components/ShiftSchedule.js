import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Card, Button } from 'react-bootstrap';
import moment from 'moment';
import { EmployeeContext } from './context/EmployeeContext';
import axios from 'axios';
import CreateWorkScheduleModal from './modals/CreateWorkScheduleModal';

const ShiftSchedule = () => {
    const { employees, setEmployees } = useContext(EmployeeContext);

    const [shifts, setShifts] = useState([]);

    const daysOfWeek = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];

    const generateDates = () => {
        const startOfWeek = moment().startOf('week').add(1, 'day'); // Start from Monday
        const dates = [];

        for (let i = 0; i < 7; i++) {
        dates.push(moment(startOfWeek).add(i, 'days').format('YYYY-MM-DD'));
        }

        return dates;
    };

    const dates = generateDates();

    const [showCreateModal, setShowCreateModal] = useState(false);

    const handleShowCreateModal = () => {
        setShowCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setShowCreateModal(false);
    };

    useEffect(() => {
    axios.get("http://localhost:8000/api/shifts")
        .then((response) => {
        setShifts(response.data);
        })
        .catch(err => {
        console.log(err);
        });
    }, []);
  return (
    <Container>
      <Row className="mb-2">
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create Shift
          </Button>
        </Col>
      </Row>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
            <th>PIC</th>
            <th>Day Shift</th>
            <th>Evening Shift</th>
          </tr>
        </thead>
        <tbody>
            {shifts.map((shift, index) => (
                <tr key={index}>
                <td>{daysOfWeek[moment(shift.date).day() - 1]}</td>
                <td>{moment(shift.date).format('YYYY-MM-DD')}</td>
                <td>{shift.pic.firstName} {shift.pic.lastName}</td>
                <td>{shift.dayShift.map(employee => `${employee.firstName} ${employee.lastName}`).join(', ')}</td>
                <td>{shift.eveningShift.map(employee => `${employee.firstName} ${employee.lastName}`).join(', ')}</td>
                </tr>
            ))}
        </tbody>
      </Table>
      <CreateWorkScheduleModal
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
      />
    </Container>
  );
};

export default ShiftSchedule;
