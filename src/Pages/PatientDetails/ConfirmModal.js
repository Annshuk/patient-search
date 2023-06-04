
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

export const ConfirmModal = ({ isOpen, onClick, selected }) => {
    return <Modal isOpen={ isOpen } toggle={ onClick }>
        <ModalHeader toggle={ onClick }>Patient</ModalHeader>
        <ModalBody>
            Are you sure you want to delete user id: { selected.patient_id }
        </ModalBody>
        <ModalFooter>
            <Button color="primary" onClick={ onClick }>
                Delete
            </Button>{ ' ' }
            <Button color="secondary" onClick={ onClick }>
                Cancel
            </Button>
        </ModalFooter>
    </Modal>
}