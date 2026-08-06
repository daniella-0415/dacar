import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./assets/Home";
import Signup from "./Signup";
import Signin from "./assets/Signin";
import Dashboard from "./assets/Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

   
        <Route
          path="/signup"
          element={<Signup />}
        />

        
        <Route
          path="/signin"
          element={<Signin />}
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;