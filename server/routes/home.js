const mongoose = require('mongoose');

const VideoSchema = new mongoose.Schema({
    video_id: Number,
    name: String,
    duration: Number, // Duration in seconds
    creator_id: Number, // Reference to the creator's ID in the Usuarios collection
    creation_date: String,
    Comments: [{
        user: String,
        date: String,
        comment_text: String
    }],
});

const Video = mongoose.model('Video', VideoSchema, 'Videos');
module.exports = Video;