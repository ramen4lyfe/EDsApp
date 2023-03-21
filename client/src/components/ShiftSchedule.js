import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Pagination } from 'react-bootstrap';
import { EmployeeContext } from './context/EmployeeContext';
import axios from 'axios';
import CreateWorkScheduleModal from './modals/CreateWorkScheduleModal';
import moment from 'moment';


const ShiftSchedule = () => {
  const { employees, setEmployees } = useContext(EmployeeContext);
  
  const [shifts, setShifts] = useState([]);
  
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().substr(0, 10));
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  const handleShowCreateModal = () => {setShowCreateModal(true)};
  
  const handleCloseCreateModal = () => {setShowCreateModal(false)}
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const [shiftsPerPage] = useState(7); // Set the number of shifts per page
  
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
  
  const sortShiftsByDate = (shifts) => {
    return shifts.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const groupShiftsByWeek = (shifts) => {
    const weeks = {};
    shifts.forEach((shift) => {
      const weekNumber = moment(shift.date).isoWeek();
      if (!weeks[weekNumber]) {
        weeks[weekNumber] = [];
      }
      weeks[weekNumber].push(shift);
    });
    return weeks;
  };

  const sortedShifts = sortShiftsByDate(shifts);
  
  const weeksShifts = groupShiftsByWeek(sortedShifts);

  // Pagination
  const indexOfLastShift = currentPage * shiftsPerPage;
  
  const indexOfFirstShift = indexOfLastShift - shiftsPerPage;
  
  const currentShifts = Object.values(weeksShifts).flat().slice(indexOfFirstShift, indexOfLastShift);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    const totalShifts = Object.values(weeksShifts).flat().length;
    const pageCount = Math.ceil(totalShifts / shiftsPerPage);

    let items = [];
    for (let number = 1; number <= pageCount; number++) {
      items.push(
        <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
          {number}
        </Pagination.Item>
      );
    }
    return items;
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
      <Table striped bordered hover responsive size="lg">
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
          {currentShifts.map((shift, index) => {
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
      <Pagination>{renderPaginationItems()}</Pagination>
      <CreateWorkScheduleModal
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        handleCreateShift={handleCreateShift}
      />
    </Container>
  );
};

export default ShiftSchedule;