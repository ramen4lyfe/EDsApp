import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import moment from 'moment';
import { EmployeeContext } from './context/EmployeeContext';
import axios from 'axios';
import CreateBookingModal from './modals/CreateBookingModal';

const Bookings = () => {
    const { employee } = useContext(EmployeeContext);

    const [bookings, setBookings] = useState([]);

    function CurrentDateTime() {
        const [dateTime, setDateTime] = useState(moment().format('MMMM Do YYYY, h:mm:ss a'));

        useEffect(() => {
            const timer = setInterval(() => {
                setDateTime(moment().format('MMMM Do YYYY, h:mm:ss a'));
            }, 1000);

            return () => {
                clearInterval(timer);
            };
        }, []);

        return <p>{dateTime}</p>;
    }
//Get bookings from Resova API
    // const apiKey = 'H0WhjRgnafAXjI20MFypJo3YQeSCoP04SNwSsnKUKMps9e01DUmpndsb2cfPZW'; // Resova API key
    // const fetchBookings = async () => {
    //     try {
    //         const response = await axios.get('https://api.resova.us/v1/baskets/null/bookings/null', {
    //             headers: {
    //                 'Authorization': `Bearer ${apiKey}`,
    //                 'Content-Type': 'application/json'
    //             }
    //         });
    //         setBookings(response.data.data);
    //     } catch (error) {
    //         console.error('Error fetching data:', error);
    //     }
    // };
    // // Call fetchBookings when the component mounts
    // useEffect(() => {
    //     fetchBookings();
    // }, []);

    // Get bookings from local API
    const fetchBookings = async () => {
        try {
            const response = await axios.get("http://localhost:8000/api/bookings");
            if (Array.isArray(response.data)) {
                setBookings(response.data);
            } else {
                console.error('Error fetching data:', response.data);
            }
        } catch (err) {
            console.error('Error fetching data:', err);
        }
    };


    // Call fetchBookings when the component mounts
    useEffect(() => {  
        fetchBookings();
    }, []);

    const [showCreateBookingModal, setShowCreateBookingModal] = useState(false);
    const handleShowCreateBookingModal = () => {setShowCreateBookingModal(true)};
    const handleCloseCreateBookingModal = () => {setShowCreateBookingModal(false)};

    return (
        <Container fluid className="p-4">
            <Container>
                <Row>
                    <Col style={{ textAlign: 'center' }}>
                        <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>
                            <CurrentDateTime />
                        </h1>
                    </Col>
                </Row>
            </Container>
            <Row>
                <Col className='d-flex justify-content-end'> 
                    <Button variant="outline-primary" onClick={handleShowCreateBookingModal}>
                        Create Booking
                    </Button>
                    <CreateBookingModal show={showCreateBookingModal} handleClose={handleCloseCreateBookingModal} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Assigned Bookings</h4>
                    <Table striped bordered hover>
                        <thead className="align-top">
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Game</th>
                                <th>Number of Players</th>
                                <th>Price</th>
                                <th>Host</th>
                                <th>Game Master</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="7">Loading bookings...</td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking._id}>
                                        <td>{moment(booking.bookingDate).format('MMMM Do YYYY')}</td>
                                        <td>{moment(booking.bookingTime, 'HH:mm').format('h:mm A')}</td>
                                        <td>{booking.game}</td>
                                        <td>{booking.numberOfPlayers}</td>
                                        <td>{booking.paid ? 'Paid' : 'Not Paid'}</td>
                                        <td>{booking.host.firstName} {booking.host.lastName}</td>
                                        <td>{booking.gameMaster.firstName} {booking.gameMaster.lastName}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h4>Upcoming Bookings</h4>
                </Col>
            </Row>
        </Container>
    );

};

export default Bookings;
