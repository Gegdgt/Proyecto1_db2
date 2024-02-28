import { useState, useEffect } from 'react';
import userdefimage from '../../img/userdef.jpg';
import './User.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function User() {
  const username = localStorage.getItem('username');
  const [user, setUser] = useState({
    name: username || 'Random Name',
    isCreator: true,
    imageUrl: ''
  });
  const [videos, setVideos] = useState([]); // Add videos state

  useEffect(() => {
    // Fetch the user's id when the component mounts
    axios.get(`http://localhost:5050/user?username=${username}`)
      .then(response => {
        const userId = response.data.user_id;
        console.log(userId);
        // Fetch the user's videos using the user_id
        axios.get(`http://localhost:5050/videosByCreator?creator=${userId}`)
          .then(response => {
            if (Array.isArray(response.data)) {
              setVideos(response.data);
              console.log(response.data);
            } else {
              console.error('Unexpected server response:', response.data);
            }
          })
          .catch(error => {
            console.error('Error fetching videos', error);
          });
      })
      .catch(error => {
        console.error('Error fetching user', error);
      });
  }, [username]);

  return (
    <div className="profile-info">
      <img className='PFP' src={user.imageUrl || userdefimage} alt="User profile" />
      <h2>{user.name}</h2>
      <p>{user.isCreator ? 'Creator' : 'Not a creator'}</p>
      {videos.map(video => ( // Render the user's videos
        <div key={video._id}>
          <Link to={`/video/${video.video_id}`}>
            <h3>{video.name}</h3>
          </Link>
          <p>Duration: {Math.round(video.duration / 60)} minutes</p>
        </div>
      ))}
    </div>
  );
}

export default User;