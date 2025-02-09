import React,{useState} from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import CreateEvent from './pages/CreateEvent';
import EventDetails from './pages/EventDetails';
import Navbar from './pages/Navbar';

function App() {
  const [userAction,setUserAction]=useState(null);
  return (
    <Router>
      <Navbar setUserAction={setUserAction} />
      <div className="bg-[#fff] container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home userAction={userAction} />} />
          <Route path="/event/:id" element={<EventDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
