import { useState, useEffect } from 'react';
import './User.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import userdefimage from '../../img/userdef.jpg';
import videodefimage from '../../img/videodef.jpg';

function User() {
    const username = localStorage.getItem('username');
    const [user, setUser] = useState({
        name: username || 'Random Name',
        isCreator: true,
        imageUrl: ''
    });
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5050/user?username=${username}`)
            .then(response => {
                const userId = response.data.user_id;
                axios.get(`http://localhost:5050/videosByCreator?creator=${userId}`)
                    .then(response => {
                        if (Array.isArray(response.data)) {
                            setVideos(response.data);
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
        <div className="user-container">
            <div className="profile-info">
                <img className='profile-image' src={user.imageUrl || userdefimage} alt="User profile" />
                <h2>{user.name}</h2>
                <p>{user.isCreator ? 'Creator' : 'Not a creator'}</p>
            </div>
            <div className="videos">
                {videos.map(video => (
                    <div key={video._id} className="video-card">
                        <Link to={`/video/${video.video_id}`}>
                            <img className='video-thumbnail' src={video.imageUrl || videodefimage} alt="Video thumbnail" />
                        </Link>
                        <Link to={`/video/${video.video_id}`}>
                            <h3>{video.name}</h3>
                        </Link>
                        <p>Duration: {Math.round(video.duration / 60)} minutes</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default User;
