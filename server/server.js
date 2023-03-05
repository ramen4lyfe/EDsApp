// const express = require("express");
// const cors = require("cors");
// const app = express();


// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// require("./config/mongoose.config");
// require("./routes/edscheduling.routes")(app);
// app.listen(8000, () => {
//  console.log("Listening at Port 8000");
// });

const express = require('express');
const mongoose = require('mongoose');
const app = require('./routes/edscheduling.routes');

const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB database
mongoose.connect('mongodb://localhost/edscheduling', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log(`Connected to MongoDB database!`))
    .catch((err) => console.log(err));

// Start the server
app.listen(port, () => console.log(`Server started on port ${port}...`));
