import React, { useContext, useEffect, useState } from 'react'
import { EmployeeContext } from './context/EmployeeContext'
import axios from 'axios'
import { Button, Form, Table, Modal, Col, Row, Container } from 'react-bootstrap'
import CreateBookingModal from './modals/CreateBookingModal'
import moment from 'moment'


const Bookings = ( ) => {
    const { employees, setEmployees } = useContext(EmployeeContext);
    const [bookings, setBookings] = useState([]);
    const [show, setShow] = useState(false);
    const [bookingData, setBookingData] = useState({
        gameName: '',
        time: '',
        numberOfPeople: '',
        shift: '',
        host: '',
        gameMaster: '',
        notes: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleChange = (e) => {
        setBookingData({ ...bookingData, [e.target.name]: e.target.value });
    };

    

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     // handleCreateBooking(bookingData);
    //     handleClose();
    // };

    // const handleCreateBooking = async (bookingData) => {
    //     try {
    //         const response = await axios.post('http://localhost:8000/api/bookings', bookingData);
    //         setBookings([...bookings, response.data]);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // };

    const handleDeleteBooking = async (id) => {
        try {
            await axios.delete(`http://localhost:8000/api/bookings/${id}`);
            setBookings(bookings.filter((booking) => booking._id !== id));
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/bookings');
                setBookings(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchBookings();
    }, []);

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/employees');
                setEmployees(response.data);
            } catch (error) {
                console.log(error);
            }
        };
        fetchEmployees();
    }, []);


    return (
        <Container>
            <Row>
                <Col>
                    <h1>Bookings</h1>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Button variant="primary" onClick={handleShow}>
                        Create Booking
                    </Button>
                </Col>
            </Row>
            <Table striped hover>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Game Name</th>
                        <th>Time</th>
                        <th>Number of People</th>
                        <th>Shift</th>
                        <th>Host</th>
                        <th>Game Master</th>
                        <th>Notes</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {bookings.map((booking) => (
                        <tr key={booking._id}>
                            <td>{moment(booking.date).format('dddd MM-DD')}</td>
                            <td>{booking.gameName}</td>
                            <td>{moment(booking.time, 'HH:mm').format('hh:mm A')}</td>
                            <td>{booking.numberOfPeople}</td>
                            <td>{booking.shift}</td>
                            <td>{booking.host && `${booking.host.firstName} ${booking.host.lastName}`}</td>
                            <td>{booking.gameMaster && `${booking.gameMaster.firstName} ${booking.gameMaster.lastName}`}</td>
                            <td>{booking.notes}</td>
                            <td>
                                <Button
                                    variant="danger"
                                    onClick={() => handleDeleteBooking(booking._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <CreateBookingModal
                show={show}
                onHide={handleClose}
                // handleCreateBooking={handleCreateBooking}
            />
        </Container>
    )
}

export default Bookings