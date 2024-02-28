import React, { useEffect, useState } from 'react';
import './Main.css';

function Main() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        fetch('/videos')
            .then(res => res.json())
            .then(setVideos);
    }, []);

    return (
        <div>
            <h1>Video List</h1>
            <ul>
                {videos.map(video => (
                    <li key={video.id}>
                        <a href={`/video/${video.id}`}>{video.title}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Main;