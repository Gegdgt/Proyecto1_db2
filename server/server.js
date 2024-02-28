const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const signin = require('./routes/signin.js');
const Video = require('./routes/home.js');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://SebasJuarez:Hola@proyecto1.yjyznsb.mongodb.net/Proyecto');

app.use('/login', (req, res) => {
  const { username, password } = req.body;
  signin.findOne({ username: username })
  .then(Usuarios => {
    if(Usuarios){
      if (Usuarios.password === password) {
        res.json("Completado");
      } else {
        res.json({ message: 'contraseña invalida' });
      }
    } else {
      res.json({ message: 'El usuario no existe' });
    }
  })
});

app.use('/signin', (req, res) => {
  signin.create(req.body)
  .then(Usuarios => res.json(Usuarios))
  .catch(err => res.json(err))
});

app.get('/videos/:videoId', (req, res) => {
  const videoId = req.params.videoId;

  Video.findOne(videoId)
    .then(video => {
      if (!video) {
        return res.status(404).send('Video not found');
      }

      res.send(video);
    })
    .catch(error => {
      console.error('Error fetching video', error);
      res.status(500).send('Error fetching video');
    });
});

// New route to fetch videos
app.use('/videos', (req, res) => {
  const page = Number(req.query.page) || 1; // Get page from query parameters or default to 1
  const pageSize = Number(req.query.pageSize) || 10; // Get pageSize from query parameters or default to 10

  Video.find({})
    .skip((page - 1) * pageSize) // Skip the videos of the previous pages
    .limit(pageSize) // Limit the number of videos to pageSize
    .then(videos => {
      return Promise.all(videos.map(video => {
        return signin.findOne({ user_id: video.creator_id })
          .then(user => {
            video = video.toObject();
            video.creatorName = user.name;
            return video;
          });
      }));
    })
    .then(videosWithCreators => res.json(videosWithCreators))
    .catch(err => res.json(err));
});

app.use('/videosByCreator', (req, res) => {
  const creator = req.query.creator;

  Video.find({ creator_id: creator }) // Filter videos by creator_id
    .then(videos => {
      return Promise.all(videos.map(video => {
        return signin.findOne({ user_id: video.creator_id })
          .then(user => {
            video = video.toObject();
            video.creatorName = user.name;
            return video;
          });
      }));
    })
    .then(videosWithCreators => res.json(videosWithCreators))
    .catch(err => {
      console.error(err);
      res.json([]); // Respond with an empty array if an error occurs
    });
});

// New route to fetch a user by ID
app.use('/user', (req, res) => {
  const username = req.query.username;

  signin.findOne({ username: username }) // Find user by username
    .then(user => res.json(user))
    .catch(err => res.json(err));
});

app.listen(5050, () => {
  console.log(`Server listening on port 5050`);
});