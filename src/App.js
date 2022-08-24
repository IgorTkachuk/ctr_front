import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Auth } from "./Pages/Auth";
import { Signup } from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard/Dashboard";
import { RequireAuth } from "./hoc/RequireAuth";
import { Vendor, NewVendor } from "./Pages/Vendor";

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
