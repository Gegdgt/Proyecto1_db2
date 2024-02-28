import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../../UserContext.js';
import userdefimage from '../../img/userdef.jpg';
import './User.css';
import { Link } from 'react-router-dom';

function User() {
  const username = localStorage.getItem('username');
  const [user, setUser] = useState({
    name: username || 'Random Name',
    isCreator: true,
    imageUrl: ''
  });

  // useEffect(() => {
  //   setUser(prevUser => ({ ...prevUser, name: username1 }));
  // }, [username1]);

  return (
    <div className="profile-info">
      <img className='PFP' src={user.imageUrl || userdefimage} alt="User profile" />
      <h2>{user.name}</h2>
      <p>{user.isCreator ? 'Creator' : 'Not a creator'}</p>
    </div>
  );
}

export default User;