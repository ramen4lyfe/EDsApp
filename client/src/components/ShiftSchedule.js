import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Table, Card } from 'react-bootstrap';
import moment from 'moment';
import { EmployeeContext } from './context/EmployeeContext';
import axios from 'axios';

const ShiftSchedule = () => {
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
<Container 
// fluid 
// className="p-4"
>
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
    <Col >
        <Card style={{ width: '40rem' }}>
          <Card.Body>
          <Card.Title>Day Shift</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
          {/* <Card.Link href="#">Card Link</Card.Link>
          <Card.Link href="#">Another Link</Card.Link> */}
        </Card.Body>
        </Card>
    </Col>
    <Col>
        <h4>Night Shift</h4>
    </Col>
    </Row>

    
</Container>
);
};

export default ShiftSchedule