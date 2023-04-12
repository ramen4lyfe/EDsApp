import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FcConferenceCall, FcCalendar, FcOvertime, FcMoneyTransfer } from 'react-icons/fc';

const NavigationBar = () => {
    return (
        <Container fluid>
            <Navbar sticky="top" expand="lg" variant="light" bg="" className='pb-0' >
                <Navbar.Brand href="#" className=''>EDs App</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className=" full-width-tabs" variant="tabs">
                        <Nav.Item>
                            <NavLink className="nav-link" to="/shifts" activeclassname="active">
                                {/* <FcCalendar className="nav-icon-size" /> */}
                                Schedule
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/bookings" activeclassname="active">
                                {/* <FcOvertime className="nav-icon-size" /> */}
                                Bookings
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/employees" activeclassname="active">
                                {/* <FcConferenceCall className="nav-icon-size" /> */}
                                Employees
                            </NavLink>
                        </Nav.Item>
                        <Nav.Item>
                            <NavLink className="nav-link" to="/payroll/timesheets" activeclassname="active">
                                {/* <FcMoneyTransfer className="nav-icon-size" /> */}
                                Payroll
                            </NavLink>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default NavigationBar;
