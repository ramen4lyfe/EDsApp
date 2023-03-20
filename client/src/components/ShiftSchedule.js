import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
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
    const startDate = dates[0];
    const endDate = dates[dates.length - 1];
    axios
      .get(
        // `http://localhost:8000/api/shifts?start_date=${startDate}&end_date=${endDate}`
        `http://localhost:8000/api/shifts`
      )
      .then((response) => {
        setShifts(response.data);
      })
      .catch((err) => {
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
          <th>Day Shift PIC</th>
          <th>Day Shift</th>
          <th>Evening Shift PIC</th>
          <th>Evening Shift</th>
        </tr>
      </thead>
      <tbody>
        {daysOfWeek.map((day, index) => {
          const currentDate = dates[index];
          const currentShift = shifts.find(
            (shift) => moment(shift.date).format('YYYY-MM-DD') === currentDate
          ) || {};
          return (
            <tr key={index}>
              <td>{day}</td>
              <td>{currentDate}</td>
              <td>
                {currentShift.dayShiftPic
                  ? `${currentShift.dayShiftPic.firstName} ${currentShift.dayShiftPic.lastName}`
                  : ''}
              </td>
              <td>
                {Array.isArray(currentShift.dayShift)
                  ? currentShift.dayShift
                      .map(
                        (employee) =>
                          `${employee.firstName} ${employee.lastName}`
                      )
                      .join(', ')
                  : ''}
              </td>
              <td>
                {currentShift.eveningShiftPic
                  ? `${currentShift.eveningShiftPic.firstName} ${currentShift.eveningShiftPic.lastName}`
                  : ''}
              </td>
              <td>
                {Array.isArray(currentShift.eveningShift)
                  ? currentShift.eveningShift
                      .map(
                        (employee) =>
                          `${employee.firstName} ${employee.lastName}`
                      )
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
    />
  </Container>
);

};

export default ShiftSchedule;
