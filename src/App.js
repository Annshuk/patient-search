import { useQuery } from "react-query";
import { FormProvider, useForm } from "react-hook-form";

import { fetchRecords } from "services/fetchRecords";
import { SearchTable } from "SearchTable";
import { SearchForm } from "SearchForm";
import { usePatientContext } from "PatientProvider";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "Pages/Dashboard";




const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Dashboard /> } />
      </Routes>
    </BrowserRouter>
  </div >
);


export default App;
