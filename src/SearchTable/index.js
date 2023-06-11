import { memo, useEffect } from "react";
import { Table } from "reactstrap"
import { useFormContext, useWatch } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { usePatientContext } from "PatientProvider";


export const SearchTable = memo(() => {
    const { dispatch, state: { formPayload } = {} } = usePatientContext();
    const navigate = useNavigate();
    const { setValue } = useFormContext()

    const [usergender = '', userage = '', records = [], userQuery = '', sorting] = useWatch({
        name: ['usergender', 'userage', 'records', 'userQuery', 'sorting']
    });

    useEffect(() => {
        formPayload?.records && setValue('records', formPayload.records)
    }, [formPayload?.records, setValue])

    const handleClick = (selectedRow = {}) => {
        dispatch({
            type: 'formPayload',
            payload: { usergender, userage, userQuery, sorting, selectedRow, records }
        });

        navigate(`/${selectedRow.patient_id}`)
    }

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