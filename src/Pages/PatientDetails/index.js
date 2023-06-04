import { useState } from 'react';
import { Button, Table } from "reactstrap"
import { useNavigate } from "react-router-dom";

import { usePatientContext } from "PatientProvider"
import { ConfirmModal } from "./ConfirmModal";

export const PatientDetails = () => {
    const { state: { formPayload, formPayload: { selectedRow, records } }, dispatch } = usePatientContext();
    const [modal, setModal] = useState(false);
    const navigate = useNavigate();

    const toggle = () => setModal(!modal);

    const confirmDelete = () => {
        setModal(!modal);
        dispatch({
            type: 'formPayload', payload: {
                ...formPayload,
                records: records.filter(({ patient_id }) => selectedRow.patient_id !== patient_id)
            }
        })

        navigate('/')
    }

    return <>
        <ConfirmModal selected={ selectedRow } onClick={ confirmDelete } isOpen={ modal } />
        <Table striped hover>
            <thead>
                <tr className="table-dark">
                    <th>Avtar</th>
                    <th>Ptient Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Age</th>
                    <th>Gender</th>
                    <th>Action</th></tr>
            </thead>
            <tbody>
                <tr>
                    <td><img src={ selectedRow.avatar } alt='' /></td>
                    <td>{ selectedRow.patient_id }</td>
                    <td>{ `${selectedRow.first_name} ${selectedRow.last_name}` }</td>
                    <td><img src={ selectedRow.email } alt='' /></td>
                    <td>{ selectedRow.age }</td>
                    <td>{ selectedRow.gender }</td>
                    <td><Button color="primary" onClick={ () => navigate('/') }>Go Back</Button>{ ' ' }<Button color="primary" onClick={ toggle } >Delete</Button></td>
                </tr>
            </tbody>
        </Table>
    </>
}