const http = require('http');
const serverModifier = require(`./server.${process.env.NODE_ENV || 'production'}`);
const express = require('express');

const app = express();

serverModifier(express, app);

const server = http.createServer(app).listen(process.env.PORT, () => {
  const { address, port } = server.address();
  console.log(`App listening at http://${address}:${port}`); // eslint-disable-line no-console
});