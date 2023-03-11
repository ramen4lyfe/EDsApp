// const mongoose = require("mongoose");
// const dbName= "edscheduling";


// mongoose.connect(`mongodb://localhost/${dbName}`,{
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
//     .then(() => console.log(`Connected to ${dbName} database!`))
//     .catch((err) => console.log(err));

// const mongoose = require('mongoose');

// const uri = process.env.DB_CONNECTION_STRING;
// mongoose.connect(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// //   useCreateIndex: false, // remove this option
// //   useFindAndModify: false // remove this option
// })
//   .then(() => console.log('MongoDB connected'))
//   .catch((error) => console.log(error));

// Use the createIndexes option instead of useCreateIndex
// mongoose.set('useCreateIndex', false);
// mongoose.set('useCreateIndexes', true);

// // Use the findOneAndUpdate method directly instead of useFindAndModify
// mongoose.set('useFindAndModify', false);
// mongoose.set('findOneAndUpdate', true);

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.DB_CONNECTION_STRING;
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
