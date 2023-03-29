import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from './context/EmployeeContext'
import axios from 'axios'
import { Button, Form, Table, Modal, Col, Row, Container, Card, CardGroup, ButtonGroup, Pagination, } from 'react-bootstrap'
import CreateBookingModal from './modals/CreateBookingModal'
import moment from 'moment'
import { BiPencil, BiTrash } from 'react-icons/bi';
import { useParams } from 'react-router-dom';
import UpdateBookingModal from './modals/UpdateBookingModal';

const Bookings = () => {
    const { employees, setEmployees } = useContext(EmployeeContext);
    const { id } = useParams();
    const [bookings, setBookings] = useState([]);
    const [show, setShow] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [selectedDate, setSelectedDate] = useState(moment().startOf('day'));

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const fetchBookings = () => {
        axios
        .get('http://localhost:8000/api/bookings')
        .then((res) => {
            setBookings(res.data);
        })
        .catch((err) => {
            console.log(err);
        });
    };
    
    const handleDeleteBooking = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/bookings/delete/${id}`);
            setBookings(bookings.filter((booking) => booking._id !== id));
        } catch (error) {
            console.log(error);
        }
    };
    
    
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [showUpdateBookingModal, setShowUpdateBookingModal] = useState(false);
    const handleShowUpdateBookingModal = (booking) => {
        setSelectedBooking(booking);
        setShowUpdateBookingModal(true)
    }
    
    const handleCloseUpdateBookingModal = () => {
        setShowUpdateBookingModal(false)
    };
    
    const filterBookingsByDate = (booking) =>
        moment(booking.date).isSame(selectedDate, 'day');
    const dayShiftBookings = bookings
        .filter(filterBookingsByDate)
        .filter((booking) => booking.shift === 'Day');
    const eveningShiftBookings = bookings
        .filter(filterBookingsByDate)
        .filter((booking) => booking.shift === 'Evening');

    const handlePageChange = (pageNum) => {
        setCurrentPage(pageNum);
        setSelectedDate(moment().startOf('day').add(pageNum, 'days'));
    };

    useEffect(() => {
        fetchBookings();
    }, [show, currentPage, selectedDate]);
    
    return (
        <Container>
            <Row className='mb-2 mt-2'>
                <Col>
                    <h1>Bookings</h1>
                </Col>
                <Col className='d-flex justify-content-end p-2'>
                    <Button variant="primary" onClick={handleShow} >
                        + Booking
                    </Button>
                </Col>
            </Row>

            <CreateBookingModal show={show} onHide={handleClose} fetchBookings={fetchBookings} />

            {/* Add date filter input */}
            <Form.Group controlId="dateFilter" className="mb-3">
                <Form.Label>Filter by date</Form.Label>
                <Form.Control
                    type="date"
                    value={selectedDate.format('YYYY-MM-DD')}
                    onChange={(e) => setSelectedDate(moment(e.target.value))}
                />
            </Form.Group>

            {/* Add pagination */}
            <Pagination className="mb-3">
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} />
                <Pagination.Item active>{`Day ${currentPage + 1}`}</Pagination.Item>
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
            </Pagination>


            <Card className='mb-4'>
                <Card.Header className='text-center h3'>
                    Day Shift
                </Card.Header>
                <Card.Body>
                    
                    <Table striped hover >
                        <thead>
                            <tr>
                                <th></th>
                                <th>Date</th>
                                <th>Game</th>
                                <th>Time</th>
                                <th>Players</th>
                                {/* <th>Shift</th> */}
                                <th>Host</th>
                                <th>Game Master</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dayShiftBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>
                                        <ButtonGroup size="sm">
                                            <Button
                                                variant='light'
                                                onClick={() => handleShowUpdateBookingModal(booking)}
                                            >
                                                <BiPencil />
                                            </Button>
                                            {selectedBooking && showUpdateBookingModal && (
                                                <UpdateBookingModal
                                                    key={booking._id}
                                                    show={showUpdateBookingModal}
                                                    onHide={handleCloseUpdateBookingModal}
                                                    booking={{ ...booking, host: booking.host, gameMaster: booking.gameMaster }}
                                                    fetchBookings={fetchBookings}
                                                />
                                            )}
                                            <Button
                                                variant="light"
                                                onClick={() => handleDeleteBooking(booking._id)}
                                            >
                                                <BiTrash />
                                            </Button>
                                        </ButtonGroup>

                                    </td>
                                    <td>{moment(booking.date).format('ddd MM-DD')}</td>
                                    <td>{booking.gameName}</td>
                                    <td>{moment(booking.time, 'HH:mm').format('hh:mm A')}</td>
                                    <td>{booking.numberOfPeople}</td>
                                    {/* <td>{booking.shift}</td> */}
                                    <td>{booking.host && `${booking.host.firstName} ${booking.host.lastName}`}</td>
                                    <td>{booking.gameMaster && `${booking.gameMaster.firstName} ${booking.gameMaster.lastName}`}</td>
                                    <td>{booking.notes}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>

            <Card>
                <Card.Header className='text-center h3'>
                    Evening Shift
                </Card.Header>
                <Card.Body>
                    <Table striped hover>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Date</th>
                                <th>Game</th>
                                <th>Time</th>
                                <th>Players</th>
                                <th>Host</th>
                                <th>Game Master</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eveningShiftBookings.map((booking) => (
                                <tr key={booking._id}>
                                    <td>
                                        <ButtonGroup size="sm">
                                            <Button
                                                variant='light'
                                                onClick={() => handleShowUpdateBookingModal(booking)}
                                            >
                                                <BiPencil />
                                            </Button>
                                            {selectedBooking && showUpdateBookingModal && (
                                                <UpdateBookingModal
                                                    key={booking._id}
                                                    show={showUpdateBookingModal}
                                                    onHide={handleCloseUpdateBookingModal}
                                                    booking={{ ...booking, host: booking.host, gameMaster: booking.gameMaster }}
                                                    fetchBookings={fetchBookings}
                                                />
                                            )}
                                            <Button
                                                variant="light"
                                                onClick={() => handleDeleteBooking(booking._id)}
                                            >
                                                <BiTrash />
                                            </Button>
                                        </ButtonGroup>
                                    </td>
                                    <td>{moment(booking.date).format('ddd MM-DD')}</td>
                                    <td>{booking.gameName}</td>
                                    <td>{moment(booking.time, 'HH:mm').format('hh:mm A')}</td>
                                    <td>{booking.numberOfPeople}</td>
                                    <td>{booking.host && `${booking.host.firstName} ${booking.host.lastName}`}</td>
                                    <td>{booking.gameMaster && `${booking.gameMaster.firstName} ${booking.gameMaster.lastName}`}</td>
                                    <td>{booking.notes}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default Bookings