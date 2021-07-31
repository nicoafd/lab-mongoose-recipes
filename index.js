const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    console.log("1. All Deleted");
    // create
    return Recipe.create({
      title: "Pimientos de Padron",
      level: "Easy Peasy",
      ingredients: ["Salt", "Pimientos de Padron", "Olive Oil"],
      cuisine: "Spanish",
      dishType: "snack",
      duration: 15,
      creator: "Kick",
    });
    // Run your code here, after you have insured that the connection was made
  })
  .then((response) => {
    console.log("2. Showing just the title: ", response.title); // only works because it is one object, not an array

    return Recipe.insertMany(data);
    // >>>>?? what you talking about duplicates? commenting out what?

  })
  .then((response) => {
    console.log("3. Recipes added correctly");

    response.forEach((dish) => {
      console.log(dish.title);
    }); // to print titles for iteration 3

    return Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
  })
  .then((response) => {
    console.log(
      "4. You are a goddam Success!! Your Recipe has been Updated!!!", response
    );
  return Recipe.findOneAndDelete({ title: "Carrot Cake" });
  })
  .then(response => {
    console.log("5. Ciao Cake de Carotte", response)
    return mongoose.disconnect();
  })
  .then(response => {
    console.log("DB Disconnected successfuly!")
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
  console.log("Kims changes")