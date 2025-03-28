
const mongoose = require('mongoose');


const uri = "mongodb+srv://rahulkirar:Internet@rahulkirar.wn7mwew.mongodb.net/?retryWrites=true&w=majority&appName=rahulkirar";


mongoose.connect(uri).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err.message);
});