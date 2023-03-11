require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/mongoose.config");
const employeeRoutes = require("./routes/employee.routes");
const bookingRoutes = require("./routes/booking.routes");
const shiftRoutes = require("./routes/shift.routes");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/employees", employeeRoutes);
app.use("/bookings", bookingRoutes);
app.use("/shifts", shiftRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });
});
