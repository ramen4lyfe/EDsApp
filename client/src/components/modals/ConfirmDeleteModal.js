import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const ConfirmDeleteModal = ({ show, handleClose, handleConfirmDelete }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to delete? This action CANNOT be undone</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleConfirmDelete}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ConfirmDeleteModal;
