const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

const domain = process.env.DOMAIN || 'localhost';

const vhost = require('vhost');

app.use(vhost(`*.${domain}`, (req, res) => {
  const subdomain = req.vhost[0].replace(/[^\dA-Za-z]/g, '');

  try {
    if (fs.existsSync(path.join('commits', subdomain, req.originalUrl))) {
      res.sendFile(path.normalize(req.originalUrl), { root: path.join('commits', subdomain) });
    } else {
      res.sendFile('index.html', { root: path.join('commits', subdomain) });
    }
  } catch (err) {
    console.error(err);
  }
}));

app.listen(process.env.PORT || 3000, () => {
  console.log(`App is listening at port ${process.env.PORT || 3000}`);
});
