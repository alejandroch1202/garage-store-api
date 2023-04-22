const express = require('express');
const router = require('./routes');
const cors = require('cors');
const { checkApiKey } = require('./middlewares/auth.handler');
const {
  errorLogger,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
} = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3005;
app.use(express.json());

app.use(cors());
require('./utils/auth');

app.get('/', (req, res) => {
  res.send('Welcome to the Garage Store API');
});

app.get('/test', checkApiKey, (req, res) => {
  res.send('Hi from the api-key secured endpoint');
});

router(app);

app.use(errorLogger);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app running at: http://localhost:${port}/`);
});
