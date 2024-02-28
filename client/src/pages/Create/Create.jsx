import React, { useState } from 'react';
import axios from 'axios';

function Create() {
    const [name, setName] = useState('');
    const [duration, setDuration] = useState('');
    const [views, setViews] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        const creation_date = new Date().toISOString();
        console.log(localStorage);
        const creator_id = localStorage.getItem('user_id');
        const video_id = Math.floor(Math.random() * (99999999999999 - 10000000000000 + 1)) + 10000000000000;

        const video = { video_id, name, duration, views, url, creation_date, creator_id };

        try {
            // Replace '/videos' with the correct endpoint to create a video
            await axios.post('http://localhost:5050/videos', video);
            console.log(video);
            alert('Video created successfully');
        } catch (error) {
            console.error('Error creating video:', error);
            alert('Error creating video');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Duration (in seconds):
                <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} />
            </label>
            <label>
                Views:
                <input type="number" value={views} onChange={(e) => setViews(e.target.value)} />
            </label>
            <label>
                URL:
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
            </label>
            <button type="submit">Create Video</button>
        </form>
    );
}

export default Create;