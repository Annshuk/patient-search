import { useEffect, useDeferredValue } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";

import { fetchRecords } from "services/fetchRecords";
import { SearchTable } from "SearchTable";

const App = () => {
  const { watch, register, setValue } = useForm()
  const { data = [], isLoading } = useQuery(['rec'], fetchRecords, {
    onSuccess: (results) => {
      setValue('records', results)
    }
  });

  const { query, usergender, userage, records = [] } = watch();

  const deferedQuery = useDeferredValue(query)

  useEffect(() => {
    let timer = '';

    if (deferedQuery) {
      const queryString = deferedQuery.toLowerCase()
      timer = setTimeout(() => setValue('records', data.filter(({ first_name, last_name, patient_id, email }) => {
        return [first_name.toLowerCase() === queryString,
        last_name.toLowerCase() === queryString,
        email.toLowerCase() === queryString,
        +deferedQuery === patient_id].some(item => item)
      })), 500)
    }

    return () => {
      clearTimeout(timer)
      !!data.length && setValue('records', data)
    }
  }, [data, deferedQuery, setValue, watch])



  const hanldeSexSelect = ({ target: { value } }) => {
    setValue('records', data.filter(({ age, gender }) => {
      const [min, max] = userage.split('-');
      const compareGender = gender === value;

      return userage ? age >= +min && age <= +max && compareGender : compareGender;
    }))
  }

  const hanldeAgeSelect = ({ target: { value } }) => {
    const [min, max] = value.split('-');

    setValue('records', data.filter(({ age, gender }) => {
      const compareAge = age <= +max && age >= +min;

      return usergender ? compareAge && usergender === gender : compareAge;
    }))


  }

  const handleSorting = ({ target: { value } }) => {
    setValue('records', records.sort((a, b) => {
      const nameA = a.first_name.toUpperCase(); // ignore upper and lowercase
      const nameB = b.first_name.toUpperCase(); // ignore upper and lowercase
      const isAce = value === 'asc' ? nameA < nameB : nameA > nameB

      if (isAce) {
        return -1
      }

      return 0
    }))
  }



  return (
    <div className="App">
      <form>
        <fieldset>
          <label htmlFor="query">Query: </label>
          <input type='text' { ...register('query') } id="query" />
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
      Total Records found: { records.length }
      { !isLoading && <SearchTable records={ records } /> }

    </div >
  );
}

export default App;
