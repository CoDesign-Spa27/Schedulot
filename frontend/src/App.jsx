import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AuthProvider from "./context/authContext";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Register from "./pages/Register";
import { ProtectedRoute } from "./context/authContext";
import Availability from "./pages/Instructor/Availability";
import Instructors from "./pages/Student/Instructors";

function App() {
  return (
    <div className=" min-h-screen">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/availability"
              element={
                <ProtectedRoute>
                  <Availability />
                </ProtectedRoute>
              }
            />
             <Route
              path="/instructors"
              element={
                <ProtectedRoute>
                  <Instructors />
                </ProtectedRoute>
              }
            />
      
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
