import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import moment from 'moment';
import { EmployeeContext } from './context/EmployeeContext';
import axios from 'axios';

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

    const apiKey = 'H0WhjRgnafAXjI20MFypJo3YQeSCoP04SNwSsnKUKMps9e01DUmpndsb2cfPZW'; // Resova API key

    const fetchBookings = async () => {
        try {
            const response = await axios.get('https://api.resova.us/v1/baskets/null/bookings/null', {
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                }
            });
            setBookings(response.data.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    // Call fetchBookings when the component mounts
    useEffect(() => {
        fetchBookings();
    }, []);

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
                <Col>
                    <h4>Assigned Bookings</h4>
                    <Table striped bordered hover>
                        <thead className="align-top">
                            <tr>
                                <th>Date</th>
                                <th>Time</th>
                                <th>Game</th>
                                <th>Location</th>
                                <th>Price</th>
                                <th>Total Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="6">Loading bookings...</td>
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                    <tr key={booking.id}>
                                        <td>{booking.booking_date}</td>
                                        <td>{booking.booking_time}</td>
                                        <td>{booking.item.name}</td>
                                        <td>{booking.item.location}</td>
                                        <td>{booking.price}</td>
                                        <td>{booking.total_quantity}</td>
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
