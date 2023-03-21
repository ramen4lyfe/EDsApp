import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, Pagination, Form } from 'react-bootstrap';
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
  const [searchDate, setSearchDate] = useState('')
  const handleSearchDateChange = (e) => { setSearchDate(e.target.value) };
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
  
  // filter shifts based on the searchDate:
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

  const sortedShifts = sortShiftsByDate(shifts).filter((shift) => {
    if (searchDate) {
      const searchWeekStart = moment(searchDate).startOf('isoWeek');
      const searchWeekEnd = moment(searchDate).endOf('isoWeek');
      return moment(shift.date).isBetween(searchWeekStart, searchWeekEnd, undefined, '[]');
    }
    return true;
  });

  const handleClearSearch = () => {
    setSearchDate('');
  };
  
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
    <Container >
      <Row>
        <Col className="d-flex align-items-center justify-content-end ">
          <Form.Group className="d-flex align-items-center">
            <Form.Label htmlFor="searchDate" className="m-2 ">
              Search
            </Form.Label>
            <Form.Control
              type="date"
              value={searchDate}
              onChange={handleSearchDateChange}
              id="searchDate"
              className="m-2"
            />
          </Form.Group>
          <Button
            variant="secondary"
            onClick={handleClearSearch}
            className="m-3"
          >
            Clear Search
          </Button>
          <Button variant="primary" onClick={handleShowCreateModal}>
            Create Shift
          </Button>
        </Col>
      </Row>
      {/* display the number of the week on top of each table and separate the data into individual tables for each week */}
      {Object.entries(weeksShifts).map(([weekNumber, shiftsInWeek], index) => (
        <React.Fragment key={index}>
          <div className="card mt-4">
            <div className="card-header">
              <h4 className="text-center mb-0">
                Week {weekNumber} : {moment(shiftsInWeek[0].date).startOf('isoWeek').format('M/D/YY')} -{' '}
                {moment(shiftsInWeek[0].date).endOf('isoWeek').format('M/D/YY')}
              </h4>
            </div>
            <div className="card-body">
              <Table hover responsive className='mb-5' style={{ fontSize: '14px' }}>
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
                  {shiftsInWeek.map((shift, index) => {
                    const formattedDate = moment(shift.date).format('MM-DD');
                    const day = moment(shift.date).format('dddd');
                    return (
                      <tr key={index}>
                        <td>{day}</td>
                        <td>{formattedDate}</td>
                        <td style={{ whiteSpace: "pre-wrap", width: "120px" }}>
                          {shift.dayShift.pic ? `${shift.dayShift.pic.firstName} ${shift.dayShift.pic.lastName}\n` : ''}
                        </td>
                        <td style={{ whiteSpace: "pre-wrap" }}>
                          {Array.isArray(shift.dayShift.employees)
                            ? shift.dayShift.employees
                              .map((employee) => `${employee.firstName} ${employee.lastName}\n`)
                              .join('')
                            : ''}
                        </td>
                        <td style={{ whiteSpace: "pre-wrap", width: "120px" }}>
                          {shift.eveningShift.pic ? `${shift.eveningShift.pic.firstName} ${shift.eveningShift.pic.lastName}\n` : ''}
                        </td>
                        <td style={{ whiteSpace: "pre-wrap" }}>
                          {Array.isArray(shift.eveningShift.employees)
                            ? shift.eveningShift.employees
                              .map((employee) => `${employee.firstName} ${employee.lastName}\n`)
                              .join('')
                            : ''}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </div>
          </div>
        </React.Fragment>
      ))}

      <div className="d-flex justify-content-center mt-4">
        <Pagination>{renderPaginationItems()}</Pagination>
      </div>
      <CreateWorkScheduleModal
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        handleCreateShift={handleCreateShift}
      />
    </Container>
  );
};

export default ShiftSchedule;