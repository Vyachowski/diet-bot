import mongoose from "mongoose";
import defaultMenu from "./defaultMenu.js";

class Database {
  constructor() {
    this.connectionUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/diet-bot?retryWrites=true&w=majority`;
    this.meals = ["breakfast", "snack", "lunch", "afternoon snack", "dinner"];
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

  initModels() {
    const mealSchema = new mongoose.Schema({
      name: {
        type: String,
        required: true,
      },
      course: {
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
      energy: {
        type: Number,
        required: false,
      },
      nutrients: {
        type: Object,
        required: false,
      },
      storageTimeInHours: {
        type: Number,
        required: false,
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

  async getRandomMealByType(meal) {
    if (!this.meals.includes(meal)) {
      throw new Error(`Select one of the valid meal types: ${this.meals}`);
    }

    let randomMeal;

    try {
      const mealsByType = await this.mealModel.find({ course: meal });
      const randomMealNumber = Math.floor(Math.random() * mealsByType.length);
      randomMeal = mealsByType[randomMealNumber];
    } catch (error) {
      throw new Error(
        `Error fetching data from the database: ${error.message}`,
      );
    }

    return randomMeal;
  }

  async setNewDish(dish) {
    try {
      await this.mealModel.create(dish);
      return true;
    } catch (error) {
      throw new Error(
        `Error setting data to the database: ${error.message}`,
      );
    }
  }

  async setDefaultMenu() {
    const promises = defaultMenu.map(async (dish) => {
      try {
        await this.setNewDish(dish);
        return true;
      } catch (error) {
        throw new Error(
          `Error setting data to the database: ${error.message}`,
        );
      }
    });

    await Promise.all(promises);
    return true;
  }
}

export default Database;
