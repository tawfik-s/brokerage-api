const express = require("express");
const app = express();
const cors = require("cors");
const landlord = require('./Routes/landlord');
const apartment = require('./Routes/apartment');
const booking = require('./Routes/booking');
const tenant = require('./Routes/tenant');
const logger = require('./middleware/logger')

//my-middleware
app.use(cors());
app.use(express.json()); //req.body
app.use(logger);
//Routes
app.use('/landlord', landlord);
app.use('/tenant', tenant);
app.use('/apartment', apartment);
app.use('/bookine', booking);


//port
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("server is running on port 3000")
});
