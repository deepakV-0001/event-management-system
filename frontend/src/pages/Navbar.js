import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserIcon } from '@heroicons/react/24/outline';
import CreateEvent from './CreateEvent';
import AuthModal from './AuthModal';

const Navbar = ({setUserAction}) => {
  const [user, setUser] = useState(null);
  const [showEventForm,setShowEventForm]=useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5001/api/user')
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <>
    <nav className="bg-[#000] p-4 text-white shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold font-monospace text-white-300">Event Manager</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-yellow-300 transition duration-300">
            Home
          </Link>
          <Link onClick={()=>setShowEventForm(true)} className="hover:text-yellow-300 transition duration-300">
            Create Event
          </Link>
          {user ? (
            <Link to={`/profile`} className="hover:text-yellow-300 transition duration-300 flex items-center">
              <UserIcon className="w-6 h-6 mr-1" />
              <span>Profile</span>
            </Link>
          ) : (
            <Link onClick={()=>setIsOpen(true)}  className="hover:text-yellow-300 transition duration-300 flex items-center">
              <UserIcon className="w-6 h-6 mr-1" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
    {showEventForm && <CreateEvent setUserAction={setUserAction} isOpen={showEventForm} onClose={() => setShowEventForm(false)}/>}
    <AuthModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default Navbar;
