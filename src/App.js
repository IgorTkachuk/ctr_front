import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "./Pages/Auth";
import { Signup } from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { RequireAuth } from "./hoc/RequireAuth";
import { Vendor, NewVendor, EditVendor } from "./Pages/Vendor";
import PrnModel from "./Pages/PrnModel/PrnModel";
import NewPrnModel from "./Pages/PrnModel/NewPrnModel";
import EditPrnModel from "./Pages/PrnModel/EditPrnModel";
import CtrModel from "./Pages/CtrModel/CtrModel";
import NewCtrModel from "./Pages/CtrModel/NewCtrModel";
import EditCtrModel from "./Pages/CtrModel/EditCtrModel";
import Ou from "./Pages/Ou/Ou";
import NewOu from "./Pages/Ou/NewOu";
import EditOu from "./Pages/Ou/EditOu";
import BusinessLine from "./Pages/BusinessLine/BusinessLine";
import NewBusinessLine from "./Pages/BusinessLine/NewBusinessLine";
import EditBusinessLine from "./Pages/BusinessLine/EditBusinessLine";
import Employee from "./Pages/Employee/Employee";
import NewEmployee from "./Pages/Employee/NewEmployee";
import EditEmployee from "./Pages/Employee/EditEmployee";
import DocType from "./Pages/DocType/DocType";
import NewDocType from "./Pages/DocType/NewDocType";
import EditDocType from "./Pages/DocType/EditDocType";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Auth />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route
            path='/dashboard'
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route path='vendor' element={<Vendor />} />
            <Route path='vendor/new' element={<NewVendor />} />
            <Route path='vendor/edit/:id' element={<EditVendor />} />
            <Route path='printer' element={<PrnModel />} />
            <Route path='printer/new' element={<NewPrnModel />} />
            <Route path='printer/edit/:id' element={<EditPrnModel />} />
            <Route path='ctrmodel' element={<CtrModel />} />
            <Route path='ctrmodel/new' element={<NewCtrModel />} />
            <Route path='ctrmodel/edit/:id' element={<EditCtrModel />} />
            <Route path='ou' element={<Ou />} />
            <Route path='ou/new' element={<NewOu />} />
            <Route path='ou/edit/:id' element={<EditOu />} />
            <Route path='bl' element={<BusinessLine />} />
            <Route path='bl/new' element={<NewBusinessLine />} />
            <Route path='bl/edit/:id' element={<EditBusinessLine />} />
            <Route path='employee' element={<Employee />} />
            <Route path='employee/new' element={<NewEmployee />} />
            <Route path='employee/edit/:id' element={<EditEmployee />} />
            <Route path='doctype' element={<DocType />} />
            <Route path='doctype/new' element={<NewDocType />} />
            <Route path='other' element={<h1>Other</h1>} />
            <Route path='doctype/edit/:id' element={<EditDocType />} />
          </Route>
          <Route path='*' element={<Navigate to='/login' replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
