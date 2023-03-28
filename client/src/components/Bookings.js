import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from './context/EmployeeContext'
import axios from 'axios'
import { Button, Form, Table, Modal, Col, Row, Container, Card, CardGroup, ButtonGroup } from 'react-bootstrap'
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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        fetchBookings();
    }, [show]);

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

    const dayShiftBookings = bookings.filter(booking => booking.shift === "Day");
    const eveningShiftBookings = bookings.filter(booking => booking.shift === "Evening");

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Bookings</h1>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button variant="primary" onClick={handleShow} >
                        Create Booking
                    </Button>
                </Col>
            </Row>

            <CreateBookingModal show={show} onHide={handleClose} fetchBookings={fetchBookings} />

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
                                                    booking={selectedBooking}
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
                                {/* <th>Shift</th> */}
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
                                                    booking={selectedBooking}
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
        </Container>
    )
}

export default Bookings