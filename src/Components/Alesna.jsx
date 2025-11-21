import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PerfectStayHome from './PerfectStayHome';
import Room from './room/Room'

function Alesna() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PerfectStayHome />} />
        <Route path="/room-details" element={<Room />} />
        <Route path="/room/:id" element={<Room />} />
      </Routes>
    </Router>
  );
}

export default Alesna;
