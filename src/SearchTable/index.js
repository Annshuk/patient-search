export const SearchTable = ({ records, }) => {
    return <div className="userTable">
        <table>
            <thead>
                <tr><th>ID</th><th>Name</th></tr>
            </thead>
            <tbody>
                { records.map((item) => <tr key={ item.patient_id }>
                    <td>{ item.patient_id }</td>
                    <td>{ `${item.first_name} ${item.last_name}` }</td>
                </tr>) }
            </tbody>
        </table>
    </div>
}