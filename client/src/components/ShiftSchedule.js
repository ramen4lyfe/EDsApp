import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { EmployeeContext } from './context/EmployeeContext';
import axios from 'axios';
import CreateWorkScheduleModal from './modals/CreateWorkScheduleModal';
import moment from 'moment';


const ShiftSchedule = () => {
  const { employees, setEmployees } = useContext(EmployeeContext);

  // const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];


  const [shifts, setShifts] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().substr(0, 10));
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleShowCreateModal = () => {
    setShowCreateModal(true);
  };

  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  const handleCreateShift = () => {
    // update shifts after creating a new shift
    axios
      .get(`http://localhost:8000/api/shifts?date=${currentDate}`)
      .then((response) => {
        setShifts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/shifts?date=${currentDate}`)
      .then((response) => {
        setShifts(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [currentDate]);

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
            <th>Day Shift PIC</th>
            <th>Day Shift</th>
            <th>Evening Shift PIC</th>
            <th>Evening Shift</th>
          </tr>
        </thead>
        <tbody>
          {shifts.map((shift, index) => {
            const formattedDate = moment(shift.date).format('YYYY-MM-DD');
            const day = moment(shift.date).format('dddd');
            return (
              <tr key={index}>
                <td>{day}</td>
                <td>{formattedDate}</td>
                <td>
                  {shift.dayShift.pic ? `${shift.dayShift.pic.firstName} ${shift.dayShift.pic.lastName}` : ''}
                </td>
                <td>
                  {Array.isArray(shift.dayShift.employees)
                    ? shift.dayShift.employees
                      .map((employee) => `${employee.firstName} ${employee.lastName}`)
                      .join(', ')
                    : ''}
                </td>
                <td>
                  {shift.eveningShift.pic ? `${shift.eveningShift.pic.firstName} ${shift.eveningShift.pic.lastName}` : ''}
                </td>
                <td>
                  {Array.isArray(shift.eveningShift.employees)
                    ? shift.eveningShift.employees
                      .map((employee) => `${employee.firstName} ${employee.lastName}`)
                      .join(', ')
                    : ''}
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <CreateWorkScheduleModal
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        handleCreateShift={handleCreateShift}
      />
    </Container>
  );
};

export default ShiftSchedule;
