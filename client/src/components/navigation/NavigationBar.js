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
                            <Nav.Link as={NavLink} to="/shifts" activeClassName="active">
                                {/* <FcCalendar className="nav-icon-size" /> */}
                                Schedule
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/bookings" activeClassName="active">
                                {/* <FcOvertime className="nav-icon-size" /> */}
                                Bookings
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/employees" activeClassName="active">
                                {/* <FcConferenceCall className="nav-icon-size" /> */}
                                Employees
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link as={NavLink} to="/payroll/timesheets" activeClassName="active">
                                {/* <FcMoneyTransfer className="nav-icon-size" /> */}
                                Payroll
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </Container>
    );
};

export default NavigationBar;
