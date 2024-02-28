import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Main.css';
import Maindefimage from '../../img/maindef.jpg';


function Main() {
    const [videos, setVideos] = useState([]);
    const [page, setPage] = useState(1); // Add page state
    const pageSize = 10; // Set page size to 10

    useEffect(() => {
        axios.get(`http://localhost:5050/videos?page=${page}&pageSize=${pageSize}`) // Add page and pageSize query parameters
            .then(response => {
                const fetchedVideos = response.data;
                const videosWithCreators = fetchedVideos.map(video => {
                    video.duration = Math.round(video.duration / 60);
                    return video;
                });
                setVideos(videosWithCreators);
            })
            .catch(error => {
                console.error('Error fetching videos', error);
            });
    }, [page]); // Add page to dependency array

    return (
        <div>
            {videos.map(video => (
                <div key={video._id}>
                    <img className='Mini' src={video.imageUrl || Maindefimage} alt="Miniatura de video" />
                    <Link to={`/video/${video.video_id}`}>
                        <h3>{video.name}</h3>
                    </Link>
                    <p>Duration: {video.duration} minutes</p>
                    <p>Creator: {video.creatorName}</p>
                </div>
            ))}
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button> {/* Add Previous button */}
            <button onClick={() => setPage(page + 1)}>Next</button> {/* Add Next button */}
        </div>
    );
}

export default Main;