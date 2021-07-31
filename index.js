const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(self => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // create
    //return Recipe.create( { title: "Pimientos de Padron", level: "Easy Peasy", ingredients: ["Salt", "Pimientos de Padron", "Olive Oil"], cuisine: "Spanish", dishType: "snack", duration: 15, creator: "Kick" } )
    // Run your code here, after you have insured that the connection was made

  })
  .then(response => {
    console.log("1. Showing just the title: ", response.title)
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
