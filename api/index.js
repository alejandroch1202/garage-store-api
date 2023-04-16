const express = require('express');
const router = require('./routes');
const cors = require('cors');

const {
  errorLogger,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3005;

app.get('/', (req, res) => {
  res.send('Welcome to the Garage Store API');
});

app.use(cors());
app.use(express.json());
router(app);
app.use(errorLogger);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app running at: http://localhost:${port}/`);
});
