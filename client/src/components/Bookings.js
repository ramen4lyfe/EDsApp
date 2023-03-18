import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table } from 'react-bootstrap';
import moment from 'moment';
import { EmployeeContext } from './context/EmployeeContext';
import axios from 'axios';

const Bookings = () => {
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

return (
<Container fluid className="p-4">
    <Row>
    <Col>
        <h4>Assigned Bookings</h4>
        <CurrentDateTime />
        <Table striped bordered hover>
        <thead className="align-top">
            <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Game</th>
            <th>Host</th>
            <th>Game Master</th>
            <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>2021-01-01</td>
            <td>game time</td>
            <td>game name</td>
            <td>host name</td>
            <td>game master</td>
            <td>update button</td>
            </tr>
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
