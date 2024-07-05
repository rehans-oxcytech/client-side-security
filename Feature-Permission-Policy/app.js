const express = require('express');
const helmet = require('helmet');

const app = express();

// Use Helmet to set various HTTP headers for security
app.use(helmet());

// Set Feature Policy header
app.use((req, res, next) => {
  res.setHeader(
    'Feature-Policy',
    "geolocation 'self'; camera 'none'; microphone 'none';"
  );
  next();
});

// Set Permission Policy header
app.use((req, res, next) => {
  res.setHeader(
    'Permissions-Policy',
    'geolocation=(self), camera=(), microphone=()'
  );
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, world!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
