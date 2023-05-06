require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Your routes go here
app.use('/api/auth', authRoutes);
require("./config/mongoose.config");
require("./routes/employee.routes")(app);
require("./routes/shift.routes")(app);
require("./routes/booking.routes")(app);
require("./routes/timelog.routes")(app);
require("./routes/payRatePerAlphaCode.routes")(app);
require("./routes/alphaCode.routes")(app);
require("./routes/user.routes")(app);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
