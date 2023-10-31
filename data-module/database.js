import mongoose from "mongoose";

class Database {
  constructor() {
    this.connectionUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/diet-bot?retryWrites=true&w=majority`;
    this.mealTypes = ["breakfast", "snack", "lunch", "dinner"];
    this.shopDepartments = [
      "fresh",
      "chips",
      "cheese",
      "meat & fish",
      "grocery",
      "bread",
      "dairy products",
      "frozen products",
      "beverages",
    ];
    this.connect(); // auto-connect on creating instance
  }

  async getRandomMealByType(mealType) {
    if (!this.mealTypes.includes(mealType)) {
      throw new Error(`Select one of the valid meal types: ${this.mealTypes}`);
    }

    let randomMeal;

    try {
      const mealsByType = await this.mealModel.find({ type: mealType });
      const randomMealNumber = Math.floor(Math.random() * mealsByType.length);
      randomMeal = mealsByType[randomMealNumber];
    } catch (error) {
      throw new Error(
        `Error fetching data from the database: ${error.message}`,
      );
    }

    return randomMeal;
  }

  initModels() {
    const mealSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      type: {
        type: Array,
        required: true,
      },
      ingredients: {
        type: Array,
        required: true,
      },
      recipe: {
        type: Array,
        required: true,
      },
    });
    this.mealModel = mongoose.model("Meal", mealSchema);

    const ingredientSchema = new mongoose.Schema({
      name: String,
      energy: Number, // calories per 100 gram
      alternateMeasureUnit: Array,
      unitsConversionRate: Number, // in 100 grams 1 cup of rolled oats
      department: String,
    });
    this.ingredientModel = mongoose.model("Ingredient", ingredientSchema);
  }

  async connect() {
    try {
      await mongoose.connect(this.connectionUri);
      this.initModels();
      return true;
    } catch (error) {
      throw new Error(`Error connecting to the database: ${error.message}`);
    }
  }

  // eslint-disable-next-line
  async disconnect() {
    try {
      await mongoose.disconnect();
      return true;
    } catch (error) {
      throw new Error(
        `Error disconnecting from the database: ${error.message}`,
      );
    }
  }

  setDefaultMenu() {
    this.mealModel.create({
      name: "Peanut Butter & Jelly Overnight Oats",
      type: ["breakfast"],
      ingredients: [
        ["rolled oats", 50],
        ["milk", 100],
        ["greek yogurt", 50],
        ["cha seeds", 5],
        ["date syrup", 15],
        ["vanilla extract", 3],
        ["strawberry jam", 15],
        ["creamy peanut butter", 15],
        ["strawberry", 50],
        ["peanuts", 40],
      ],
      recipe: [
        "Combine old fashioned oats, seeds, yoghurt and vanilla extract, sweetener and milk (it is convenient to make it in a glass) with all basic ingredients",
        "Cover it with a lid and chill in the fridge for at least two hours (better overnight)",
        "Grab a spoon, add you toppings and dig in!",
      ],
    });
  }
}

export default Database;
