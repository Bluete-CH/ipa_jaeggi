const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to this API' });
});

const PORT = process.env.PORT || 2323;
require('./app/route/user.routes')(app);
require('./app/route/vehicle.routes')(app);
require('./app/route/reservation.routes')(app);
require('./app/route/parkingSpot.routes')(app);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
