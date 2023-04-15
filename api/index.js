const express = require('express');
const router = require('./routes');
const {
  errorLogger,
  errorHandler,
  boomErrorHandler,
} = require('./middlewares/error.handler');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Welcome to the Garage Store API');
});

// This allow to receive json in body
app.use(express.json());
router(app);
app.use(errorLogger);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app running at: http://localhost:${port}/`);
});
