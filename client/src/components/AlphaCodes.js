import React, { useEffect, useState } from 'react'
import PayrollNav from './navigation/payrollNav'
import { Table, Form, Button, Container, Row, Col, ButtonGroup, InputGroup } from "react-bootstrap";
import axios from 'axios'



const AlphaCodes = () => {
    const [alphaCode, setAlphaCode] = useState([])
    const [payRate, setPayRate] = useState([])



    return (
        <Container fluid>
            <Row>
                <Col md={1.5} className="vertical-navbar">
                    <PayrollNav />
                </Col>
                <Col md={10} className="p-3">
                    <h3>Alpha Codes</h3>
                    
                </Col>
            </Row>
        </Container>
    )
}

export default AlphaCodes