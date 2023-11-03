import mongoose from "mongoose";

class Database {
  constructor() {
    this.connectionUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/diet-bot?retryWrites=true&w=majority`;
    this.meals = ["breakfast", "snack", "lunch", "afternoonSnack", "dinner"];
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

  // MODELS INITIALIZING
  initModels() {
    const dishSchema = new mongoose.Schema({
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
    this.dishModel = mongoose.model("Dish", dishSchema);

    const currentMenuSchema = new mongoose.Schema({
      breakfast: Object,
      snack: Object,
      lunch: Object,
      afternoonSnack: Object,
      dinner: Object,
    });
    this.currentMenuModel = mongoose.model("CurrentMenu", currentMenuSchema);

    const ingredientSchema = new mongoose.Schema({
      name: String,
      energy: Number, // calories per 100 gram
      alternateMeasureUnit: Array,
      unitsConversionRate: Number, // in 100 grams 1 cup of rolled oats
      department: String,
    });
    this.ingredientModel = mongoose.model("Ingredient", ingredientSchema);
  }

  // CONNECTION API
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

  // DISH API
  async getRandomDishForMeal(meal) {
    if (!this.meals.includes(meal)) {
      throw new Error(`Select one of the valid meal types: ${this.meals}`);
    }

    let randomMeal;

    try {
      const mealsByType = await this.dishModel.find({ course: meal });
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
      await this.dishModel.create(dish);
      return true;
    } catch (error) {
      throw new Error(
        `Error setting data to the database: ${error.message}`,
      );
    }
  }

  // INGREDIENT API
  async setNewIngredient(ingredient) {
    try {
      await this.ingredientModel.create(ingredient);
      return true;
    } catch (error) {
      throw new Error(
        `Error setting data to the database: ${error.message}`,
      );
    }
  }

  // MENU API
  async setBasicMenu(basicMenu) {
    const promises = basicMenu.map(async (dish) => {
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

  // CURRENT MENU API
  async setCurrentMenu(menu) {
    try {
      await this.currentMenuModel.create(menu);
      return true;
    } catch (error) {
      throw new Error(
        `Error setting data to the database: ${error.message}`,
      );
    }
  }

  async getCurrentMenu() {
    try {
      return await this.currentMenuModel.findOne({}, '-_id -__v',);
    } catch (error) {
      throw new Error(
        `Error setting data to the database: ${error.message}`,
      );
    }
  }
}

export default Database;
