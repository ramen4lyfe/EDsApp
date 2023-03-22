import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button, ButtonGroup, Pagination, Form } from 'react-bootstrap';
import { EmployeeContext } from './context/EmployeeContext';
import axios from 'axios';
import CreateWorkScheduleModal from './modals/CreateWorkScheduleModal';
import UpdateShiftModal from './modals/UpdateShiftModal';
import moment from 'moment';
import { BiPencil, BiTrash } from 'react-icons/bi';


const ShiftSchedule = () => {
  const { employees, setEmployees } = useContext(EmployeeContext);
  const [shifts, setShifts] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().substr(0, 10));
  const [showCreateModal, setShowCreateModal] = useState(false);
  const handleShowCreateModal = () => {setShowCreateModal(true)};
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
    setModalKey((prevKey) => prevKey + 1); // update the key
  };
  
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleShowUpdateModal = (shift) => {
    setSelectedShift(shift);
    setShowUpdateModal(true);
  };
  const handleCloseUpdateModal = () => {setShowUpdateModal(false)};
  const [selectedShift, setSelectedShift] = useState(null);

  const [modalKey, setModalKey] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [shiftsPerPage] = useState(7); // Set the number of shifts per page
  const [searchDate, setSearchDate] = useState('')
  const handleSearchDateChange = (e) => { setSearchDate(e.target.value) };
  const handleCreateShift = () => {
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

  const groupShiftsByWeek = (shifts, filter) => {
    const weeks = {};

    let startDate, endDate;

    // Get the start and end dates for the selected filter
    switch (filter) {
      case 'current':
        startDate = moment().startOf('isoWeek').startOf('month');
        endDate = moment().endOf('isoWeek').endOf('month');
        break;
      case 'next':
        startDate = moment().add(1, 'month').startOf('isoWeek').startOf('month');
        endDate = moment().add(1, 'month').endOf('isoWeek').endOf('month');
        break;
      case 'previous':
        startDate = moment().subtract(1, 'month').startOf('isoWeek').startOf('month');
        endDate = moment().subtract(1, 'month').endOf('isoWeek').endOf('month');
        break;
      default:
        startDate = moment().startOf('isoWeek').startOf('month');
        endDate = moment().endOf('isoWeek').endOf('month');
    }

    // iterate over the shifts and group them by week in the selected month
    shifts.forEach((shift) => {
      const shiftDate = moment(shift.date);
      const weekNumber = shiftDate.isoWeek();
      if (shiftDate.isBetween(startDate, endDate, undefined, '[]')) {
        if (!weeks[weekNumber]) {
          weeks[weekNumber] = [];
        }
        weeks[weekNumber].push(shift);
      }
    });

    return weeks;
  };

  const sortedShifts = sortShiftsByDate(shifts).filter((shift) => {
    if (searchDate) {
      // If a search date is provided, filter based on the week containing the search date
      const searchWeekStart = moment(searchDate).startOf('isoWeek');
      const searchWeekEnd = moment(searchDate).endOf('isoWeek');
      return moment(shift.date).isBetween(searchWeekStart, searchWeekEnd, undefined, '[]');
    } else {
      // Otherwise, filter based on the current or next 4 weeks
      const currentWeekStart = moment().startOf('isoWeek');
      const currentWeekEnd = moment().endOf('isoWeek');
      const nextWeekStart = currentWeekEnd.clone().add(1, 'days').startOf('isoWeek');
      const nextWeekEnd = currentWeekEnd.clone().add(1, 'days').endOf('isoWeek');
      const next2WeekStart = nextWeekEnd.clone().add(1, 'days').startOf('isoWeek');
      const next2WeekEnd = nextWeekEnd.clone().add(1, 'days').endOf('isoWeek');
      const next3WeekStart = next2WeekEnd.clone().add(1, 'days').startOf('isoWeek');
      const next3WeekEnd = next2WeekEnd.clone().add(1, 'days').endOf('isoWeek');
      return (
        moment(shift.date).isBetween(currentWeekStart, currentWeekEnd, undefined, '[]') ||
        moment(shift.date).isBetween(nextWeekStart, nextWeekEnd, undefined, '[]') ||
        moment(shift.date).isBetween(next2WeekStart, next2WeekEnd, undefined, '[]') ||
        moment(shift.date).isBetween(next3WeekStart, next3WeekEnd, undefined, '[]')
      );
    }
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
  }, [currentDate, showCreateModal]);

  const handleUpdateShift = (id, updatedShift) => {
    axios
      .put(`http://localhost:8000/api/shifts/update/${id}`, updatedShift)
      .then((response) => {
        console.log(response.data);
        // Update the state with the updated shift
        setShifts((prevShifts) =>
          prevShifts.map((shift) => (shift._id === id ? response.data : shift))
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDeleteShift = async (shiftId) => {
    try {
      await axios.delete(`http://localhost:8000/api/shifts/delete/${shiftId}`);
      // If the delete request was successful, update the state to remove the deleted shift
      setShifts((prevShifts) => prevShifts.filter((shift) => shift._id !== shiftId));
    } catch (err) {
      console.error(err);
    }
  };


  const handleCurrentWeek = () => {
    setSearchDate('');
  };

  const handlePreviousMonth = () => {
    setSearchDate(moment().subtract(1, 'month').startOf('month').toISOString().substr(0, 10));
  };

  const handleNextMonth = () => {
    setSearchDate(moment().add(1, 'month').startOf('month').toISOString().substr(0, 10));
  };

  return (
    <Container >
      <Row>
        <Col className="d-flex align-items-center justify-content-center ">
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
            variant="outline-secondary"
            onClick={handleClearSearch}
            className="m-3"
          >
            Clear Search
          </Button>

          <ButtonGroup className="mx-3">
            <Button variant="outline-secondary" onClick={handlePreviousMonth}> Previous Month</Button>
            <Button variant="outline-secondary" onClick={handleCurrentWeek}>Current Month</Button>
            <Button variant="outline-secondary" onClick={handleNextMonth}> Next Month </Button>
          </ButtonGroup>
          
          <Button variant="outline-primary" onClick={handleShowCreateModal}>
            Create Schedule
          </Button>
        </Col>
      </Row>
      
      {/* buttons to view the current week, previous month, and next month */}

      {/* display the number of the week on top of each table and separate the data into individual tables for each week */}
      {Object.entries(weeksShifts).map(([weekNumber, shiftsInWeek], index) => (
        <React.Fragment key={index} >
          <div className="card mt-4 " style={{ width: "900px", margin: "0 auto" }}>
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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {shiftsInWeek.map((shift, index) => {
                    const formattedDate = moment(shift.date).format('MM-DD');
                    const day = moment(shift.date).format('dddd');
                    return (
                      <tr key={index}>
                        <td style={{ whiteSpace: "pre-wrap", width: "80px" }}>{day}</td>
                        <td style={{ whiteSpace: "pre-wrap", width: "80px" }}>{formattedDate}</td>
                        <td style={{ whiteSpace: "pre-wrap", width: "120px" }}>
                          {shift.dayShift.pic ? `${shift.dayShift.pic.firstName} ${shift.dayShift.pic.lastName}\n` : ''}
                        </td>
                        <td style={{ whiteSpace: "pre-wrap", width: "120px" }}>
                          {Array.isArray(shift.dayShift.employees)
                            ? shift.dayShift.employees
                              .map((employee) => `${employee.firstName} ${employee.lastName}\n`)
                              .join('')
                            : ''}
                        </td>
                        <td style={{ whiteSpace: "pre-wrap", width: "120px" }}>
                          {shift.eveningShift.pic ? `${shift.eveningShift.pic.firstName} ${shift.eveningShift.pic.lastName}\n` : ''}
                        </td>
                        <td style={{ whiteSpace: "pre-wrap", width: "120px" }}>
                          {Array.isArray(shift.eveningShift.employees)
                            ? shift.eveningShift.employees
                              .map((employee) => `${employee.firstName} ${employee.lastName}\n`)
                              .join('')
                            : ''}
                        </td>
                        <td style={{ whiteSpace: "pre-wrap", width: "80px", }}>
                          <ButtonGroup size="sm">
                            <Button variant="light" onClick={() => handleShowUpdateModal(shift)}>
                              <BiPencil />
                            </Button>
                            {selectedShift && (
                              <UpdateShiftModal
                                shift={selectedShift}
                                show={showUpdateModal}
                                handleClose={handleCloseUpdateModal}
                                handleUpdateShift={handleUpdateShift}
                              />
                            )}
                            <Button variant="light" onClick={() => handleDeleteShift(shift._id)}>
                              <BiTrash />
                            </Button>
                          </ButtonGroup>
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

      {/* <div className="d-flex justify-content-center mt-4">
        <Pagination>{renderPaginationItems()}</Pagination>
      </div> */}
      <CreateWorkScheduleModal
        key={modalKey}
        show={showCreateModal}
        handleClose={handleCloseCreateModal}
        handleCreateShift={handleCreateShift}
      />
    </Container>
  );
};

export default ShiftSchedule;