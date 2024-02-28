const mongoose = require('mongoose');

const signinSchema = new mongoose.Schema({
  name: String,
  username: String,
  password: String
});

const signin = mongoose.model("Usuarios", signinSchema, "Usuarios");
module.exports = signin;