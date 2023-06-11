import { useEffect, useRef } from 'react'
import { useFormContext, useWatch } from "react-hook-form";

const getSortRecords = (records = [], type) => records.sort((a, b) => {
    const nameA = a.first_name.toUpperCase(); // ignore upper and lowercase
    const nameB = b.first_name.toUpperCase(); // ignore upper and lowercase
    const isAce = type === 'asc' ? nameA < nameB : nameA > nameB

    return isAce ? -1 : 0
})


/**
 * SearchForm
 *  
 */
export const SearchForm = ({ data = [] }) => {
    const { setValue, register } = useFormContext();

    const [usergender = '', userage = '', records = [], userQuery, sorting] = useWatch({
        name: ['usergender', 'userage', 'records', 'userQuery', 'sorting']
    });
    const recordsRef = useRef(records);

    useEffect(() => {
        const timeOutId = userQuery && setTimeout(() => setValue('records', recordsRef.current), 500);

        return () => clearTimeout(timeOutId);
    }, [data, setValue, userQuery]);


    const hanldeSexSelect = ({ target: { value } }) => {
        setValue('userQuery', '');

        const filterRecords = data.filter(({ age, gender }) => {
            const [min, max] = userage.split('-')
            const compareGender = gender === value;

            return userage ? age >= +min && age <= +max && compareGender : compareGender;
        })

        setValue('records', getSortRecords(filterRecords, sorting || 'asc'))
    }

    const hanldeAgeSelect = ({ target: { value } }) => {
        setValue('userQuery', '');

        const [min, max] = value.split('-');
        const filteredRecords = data.filter(({ age, gender }) => {
            const compareAge = age <= +max && age >= +min;

            return usergender ? compareAge && usergender === gender : compareAge;
        });

        setValue('records', getSortRecords(filteredRecords, sorting || 'asc'));
    }

    const handleSorting = ({ target: { value } }) => {
        setValue('userQuery', '');
        setValue('records', getSortRecords(records, value))
    }

    const handleChange = ({ target: { value } }) => {
        setValue('usergender', '');
        setValue('userage', '');

        if (!value) {
            setValue('records', data);
        }

        recordsRef.current = data.filter(({ first_name, last_name, patient_id, email }) => {
            const queryString = value.toLowerCase()

            return [first_name.toLowerCase() === queryString,
            last_name.toLowerCase() === queryString,
            email.toLowerCase() === queryString,
            +value === patient_id].some(item => item)
        })
    }

    return <form>
        <fieldset>
            <label htmlFor="query">Query: </label>
            <input type='text' { ...register('userQuery', { onChange: handleChange }) } id="userQuery" /> OR { ' ' }
            <select  { ...register('usergender', { onChange: hanldeSexSelect }) } >
                <option value=''>--Please Select--</option>
                <option value='Male'>Male</option>
                <option value='Female'>Female</option>
            </select>

            <select { ...register('userage', { onChange: hanldeAgeSelect }) } >
                <option value=''>--Please Select--</option>
                <option value='18-30'>18-30</option>
                <option value='31-45'>31-45</option>
                <option value='46-200'> > 45</option>
            </select>
            <select { ...register('sorting', { onChange: handleSorting }) } >
                <option value=''>--Please Select--</option>
                <option value='asc'>Ascending</option>
                <option value='dsc'>Decending</option>
            </select>
        </fieldset>
    </form>
}