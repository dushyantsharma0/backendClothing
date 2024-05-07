const express = require('express');
const session = require('express-session');
const Router = require('./routes/UserRouter');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.Mongoose_Connection);

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false, // Set resave option explicitly to false
  saveUninitialized: true, // Set saveUninitialized option explicitly to true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', Router);

app.listen(3000, () => {
  console.log('Example app listening on port 3000!');
});