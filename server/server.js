const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./db/config.js');
const User = require('./models/user.js');
const Capsule = require('./models/capsule.js');
const util = require('./utility.js')
const emailService = require('./email.js');
const cronScan = require('./cronScan.js');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('client'));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

app.post('/signup', util.signup);

app.post('/signin', util.signin);

app.post('/addContact', util.addContact);

app.post('/capsules/all', util.getAllCapsules);

app.post('/capsules/buried', util.getBuriedCapsules);

app.post('/capsules/inProgress', util.inProgress);

app.post('/create', util.createCapsule);

app.put('/edit', util.editCapsule);

app.post('/delete', util.deleteCapsule);

app.put('/bury', util.buryCapsule);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
