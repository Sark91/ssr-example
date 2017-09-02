module.exports = (express, app) => {
  const path = require('path');
  const rootDir = '../bundle';
  const indexFile = path.resolve(__dirname, rootDir, 'index.html');

  app.use(express.static(path.resolve(__dirname, rootDir)));
  app.get('/*', (req, res) => {
    res.sendFile(indexFile, (err) => {
      if (err) res.status(err.status || 500).end();
    });
  });
};
