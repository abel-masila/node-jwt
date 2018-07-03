const express = require('express');

const app = express();
const PORT = 8888;

app.get('/status', (req, res) => {
  const localTime = new Date().toLocaleDateString();
  res.status(200).send(`Server time is ${localTime}`);
});

app.get('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
