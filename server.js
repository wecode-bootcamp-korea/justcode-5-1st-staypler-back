require('dotenv').config();

const http = require('http');
const express = require('express');
const cors = require('cors');

const routes = require('./routes');
const morgan = require('morgan');
const corsOption = {
  origin: ['http://localhost:3000'],
};

const app = express();
app.use(cors(corsOption));
app.use(morgan('dev'));
app.use(express.json());
app.use(routes);

const server = http.createServer(app);
const PORT = process.env.PORT || 10010;
server.listen(PORT, () => {
  console.log(`server start : http://localhost:${PORT}/`);
});
