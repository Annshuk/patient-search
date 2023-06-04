import { memo } from "react";
import { Table } from "reactstrap"
import { useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { usePatientContext } from "PatientProvider";


export const SearchTable = memo(() => {
    const { dispatch } = usePatientContext();
    const navigate = useNavigate();

    const handleClick = (item = {}) => {
        dispatch({
            type: 'formPayload',
            payload: { usergender, userage, userQuery, sorting, selectedRow: item }
        });

        navigate(`/${item.patient_id}`)
    }

    const [usergender = '', userage = '', records = [], userQuery = '', sorting] = useWatch({
        name: ['usergender', 'userage', 'records', 'userQuery', 'sorting']
    });


    return <>
        Total Records found: { records?.length }
        <div className="userTable">
            <Table striped hover>
                <thead>
                    <tr className="table-dark"><th>ID</th><th>Name</th></tr>
                </thead>
                <tbody>
                    { records.map((item) => <tr key={ item.patient_id } onClick={ () => handleClick(item) }>
                        <td>{ item.patient_id }</td>
                        <td>{ `${item.first_name} ${item.last_name}` }</td>
                    </tr>) }
                </tbody>
            </Table>
        </div>
    </>
})