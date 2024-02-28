import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Video() {
  const { video_id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5050/videos/${video_id}`)
      .then(response => {
        setVideo(response.data);
        console.log(response.data);
        console.log(video_id);
      })
      .catch(error => {
        console.error('Error fetching video', error);
      });
  }, [video_id]);

  if (!video) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{video.name}</h1>
      <p>Duration: {video.duration} minutes</p>
      <p>Creation date: {new Date(video.creation_date).toLocaleDateString()}</p>
      <p>Views: {video.views}</p>
      <div>
        Comments:
        {video.comments && video.comments.map((comment, index) => (
          <div key={index}>
            <p>User: {comment.user}</p>
            <p>Date: {new Date(comment.date).toLocaleDateString()}</p>
            <p>Comment: {comment.comment_text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Video;