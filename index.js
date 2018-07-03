const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 8888;
//add body parser middleware
app.use(bodyParser.json());
//setup express with cors
app.use(cors());
//users database
const users = [
  { id: 1, username: 'Admin', password: 'admin' },
  { id: 2, username: 'abel', password: 'abel' },
  { id: 3, username: 'masila', password: 'masila' }
];

app.get('/status', (req, res) => {
  const localTime = new Date().toLocaleDateString();
  res.status(200).send(`Server time is ${localTime}`);
});
app.post('/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.status(400).send('You need a username and password');
    return;
  }
  const user = users.find(u => {
    return u.username === req.body.username && u.password === req.body.password;
  });
  if (!user) {
    res.status(401).send('User not found!');
    return;
  }
  //if valid user, return json web token
  const token = jwt.sign(
    {
      sub: user.id,
      username: user.username
    },
    'secret',
    { expiresIn: '3 hours' }
  );

  res.status(200).send({ access_token: token });
});
app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
