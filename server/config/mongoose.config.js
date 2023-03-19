const mongoose = require("mongoose");
const dbName= "EdsApp";

mongoose.connect(`mongodb://localhost/${dbName}`,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
})
    .then(() => console.log(`Connected to ${dbName} database!`))
    .catch((err) => console.log(err));
