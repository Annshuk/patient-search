import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Dashboard } from "Pages/Dashboard";
import { PatientDetails } from "PatientDetails";

const App = () => (
  <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Dashboard /> } />
        <Route path="/:id" element={ <PatientDetails /> } />
      </Routes>
    </BrowserRouter>
  </div >
);


export default App;
