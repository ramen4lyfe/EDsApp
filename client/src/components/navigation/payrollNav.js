import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { FaClock, FaCode, FaDollarSign } from 'react-icons/fa';
import { FcViewDetails, FcDataSheet, FcDocument, FcCurrencyExchange  } from 'react-icons/fc';

const PayrollNav = () => {
    return (
        <Navbar expand="md" className="flex-column text-center " style={{ fontSize: '0.8rem' }} >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto flex-column">
                    <Nav.Item>
                        <NavLink
                            to="/timesheets"
                            className="nav-link mb-2"
                            activeclassname="active"
                        >
                            <FcDocument className='nav-icon-size' />
                            Timesheet
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink
                            to="/alpha-codes"
                            className="nav-link mb-2"
                            activeclassname="active"
                        >
                            <FcDataSheet className='nav-icon-size' /> Alpha Codes
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item>
                        <NavLink
                            to="/pay-rate"
                            className="nav-link mb-2"
                            activeclassname="active"
                        >
                            < FcCurrencyExchange className='nav-icon-size' /> Pay Rate
                        </NavLink>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default PayrollNav;
