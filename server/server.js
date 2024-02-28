const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const signin = require('./routes/signin.js');

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
  }
  )
  
});

app.use('/signin', (req, res) => {
  signin.create(req.body)
  .then(Usuarios => res.json(Usuarios))
  .catch(err => res.json(err))
});

app.listen(5050, () => {
  console.log(`Server listening on port 5050`);
});