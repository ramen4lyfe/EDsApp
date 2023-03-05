const mongoose = require("mongoose");
// const dbName= "employee";

mongoose.connect(`mongodb://localhost/employee`,{useNewUrlParser: true, useUnifiedTopology: true})
   .then(() => console.log(`Connected to employee database!`))
   .catch((err) => console.log(err));
