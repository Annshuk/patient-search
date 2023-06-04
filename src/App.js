import { useQuery } from "react-query";
import { FormProvider, useForm } from "react-hook-form";

import { fetchRecords } from "services/fetchRecords";
import { SearchTable } from "SearchTable";
import { SearchForm } from "SearchForm";
import { usePatientContext } from "PatientProvider";




const App = () => {
  const { state: { formPayload } } = usePatientContext();

  const methods = useForm({ defaultValues: formPayload })
  const { setValue } = methods;

  const { data = [], isLoading } = useQuery(['rec'], fetchRecords, {
    onSuccess: (results) => {
      setValue('records', results)
    }
  });

  return (
    <div className="App">
      <FormProvider { ...methods }>
        { !isLoading ?
          <>
            <SearchForm data={ data } />
            <SearchTable />
          </>
          : null }
      </FormProvider>
    </div >
  );
}

export default App;
