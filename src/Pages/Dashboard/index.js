import { useQuery } from "react-query";
import { FormProvider, useForm } from "react-hook-form";

import { fetchRecords } from "services/fetchRecords";
import { SearchTable } from "SearchTable";
import { SearchForm } from "SearchForm";
import { usePatientContext } from "PatientProvider";


export const Dashboard = () => {
    const { state: { formPayload } } = usePatientContext();



    const methods = useForm({ defaultValues: formPayload })
    const { setValue } = methods;

    const { data = [], isLoading } = useQuery(['rec'], fetchRecords, {
        onSuccess: (results) => {
            setValue('records', results)
        }
    });

    return <FormProvider { ...methods }>
        { !isLoading ?
            <>
                <SearchForm data={ data } />
                <SearchTable />
            </>
            : null }
    </FormProvider>
}