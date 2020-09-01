const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const cookieParser = require('cookie-parser');

const signRouter = require('./routes/sign');
const contentRouter = require('./routes/content');

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('hello world!');
});

app.use('/sign', signRouter);
app.use('/content', contentRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
