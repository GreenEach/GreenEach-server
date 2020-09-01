const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');

const signRouter = require('./routes/sign');
const cookieParser = require('cookie-parser');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.use('/sign', signRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
