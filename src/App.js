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

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Auth />}></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route
            path="/dashboard"
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          >
            <Route path="vendor" element={<Vendor />} />
            <Route path="vendor/new" element={<NewVendor />} />
            <Route path="vendor/edit/:id" element={<EditVendor />} />
            <Route path="printer" element={<PrnModel />} />
            <Route path="printer/new" element={<NewPrnModel />} />
            <Route path="printer/edit/:id" element={<EditPrnModel />} />
            <Route path="ctrmodel" element={<CtrModel />} />
            <Route path="ctrmodel/new" element={<NewCtrModel />} />
            <Route path="ctrmodel/edit/:id" element={<EditCtrModel />} />
            <Route path="ou" element={<Ou />} />
            <Route path="ou/new" element={<NewOu />} />
            <Route path="emploee" element={<h1>Emploee</h1>} />
            <Route path="other" element={<h1>Other</h1>} />
          </Route>
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
