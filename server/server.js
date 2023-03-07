const express = require("express");
const app = express();

require("./config/mongoose.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const employeeRoutes = require("./routes/employee.routes");
employeeRoutes(app);

app.listen(8000, () => {
    console.log("Listening at Port 8000");
});

