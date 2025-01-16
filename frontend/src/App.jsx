import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Welcome from "./components/Welcome";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center">
        <Routes>
          <Route index element={<Navigate to="/signup" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;