const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require("./config/mongoose.config");
// require all the routes files to make connection between the routes and the controllers
require("./routes/employee.routes")(app);
require("./routes/shift.routes")(app);
require("./routes/booking.routes")(app);
require("./routes/timelog.routes")(app);
require("./routes/payRatePerAlphaCode.routes")(app);
require("./routes/alphaCode.routes")(app);
app.listen(8000, () => {
    console.log("Listening at Port 8000");
});
