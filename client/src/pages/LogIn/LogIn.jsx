import React, { useContext, useState } from 'react';
import { UserContext } from '../../UserContext.js';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LogIn.css';

function LogIn() {
  const {setUsername1} = useContext(UserContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:5050/login', { username, password })
      .then(result => {console.log(result)
        if(result.data === "Completado"){
          localStorage.setItem('username', username);
          console.log(username);
          navigate('/')
        } 
      }) 
      .catch(error => console.error(error))
    
  };

  return (
    <div>
      <h3>Log In</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Log In"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default LogIn;
