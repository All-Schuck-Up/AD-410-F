const express = require('express');
const connectDB = require('./config/db');
const cors = require('express');
var session= require('express-session'),
var flash= require('req-flash');
const app = express();

// Connect MongoDB
connectDB();

// Bring in db schema
const patient = require('./models/Patient');
const provider = require('./models/Provider');
const patientEntry = require('./models/PatientEntry');
//const patientEntry = require('./models/PatientSymptomEntry');

// app.use is a middleware function (middleware is carried out in sequence)
app.use(cors());
app.use(express.json());
//Error message

app.use(session({
  secret: 'djhxcvxfgshajfgjhgsjhfgsakjeauytsdfy',
  resave: false,
  saveUninitialized: true
  }));

  app.use(flash());
// Routes (making app modular)
const mainRoutes = require('./routes');
const patientRoutes = require('./routes/patient/patient');
const patientEntryRoutes = require('./routes/patient/patientEntry');
//const patientEntryRoutes = require('./routes/patient/PatientSymptomEntrys');
const providerRoutes = require('./routes/provider/provider');

// middleware for all routes
app.use('/', mainRoutes);
app.use('/', patientRoutes);
app.use('/', patientEntryRoutes);
app.use('/', providerRoutes);
app.use('/users/user', require('./routes/users/user'));
app.use('/users/auth', require('./routes/users/auth'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
