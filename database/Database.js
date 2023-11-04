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

  // CONNECTION API
  async connect() {
    try {
      const connectionData = await mongoose.connect(this.connectionUri);
      const connectedDBName = connectionData.connections[0].name;
      const connectionStatus = connectionData.connections[0].readyState;
      return {connectedDBName, connectionStatus};
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

  // INITIALIZE API
  initModels() {
    const userSchema = new mongoose.Schema(
      {
        userId: {
          type: Number,
          required: true,
        },
        dishesList: {
          type: Array,
          required: true,
        },
        settings: {
          type: Object,
          required: false,
        }
      }
    )
    this.userModel = mongoose.model("User", userSchema);

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

  async initialize() {
    try {
      this.initModels();
    } catch (error) {
      throw new Error(`Error connecting to the database: ${error.message}`);
    }
  }

  // DISH API
  async setNewDish(dish) {
    if (!dish || typeof dish !== 'object' || Object.keys(dish).length === 0) {
      throw new Error(
        `Invalid input: dish should be an non-empty object.`,
      );
    }

    try {
      await this.dishModel.create(dish);
      return true;
    } catch (error) {
      throw new Error(
        `Error setting data to the database: ${error.message}`,
      );
    }
  }

  async setBasicDishesSet(basicDishesList) {
    if (!basicDishesList || !Array.isArray(basicDishesList) || basicDishesList.length === 0) {
      throw new Error(
        `Invalid input: basicDishesList should be a non-empty array.`,
      );
    }

    const promises = basicDishesList.map(async (dish) => {
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

  async getRandomDish(meal) {
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

  async getAllDishes() {
    let allDishes;

    try {
      allDishes = await this.dishModel.find({}, '-__v');

    } catch (error) {
      throw new Error(
        `Error fetching data from the database: ${error.message}`,
      );
    }

    return allDishes;
  }

  // INGREDIENT API
  async setIngredient(ingredient) {
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
  async setMenu(menu) {
    try {
      await this.currentMenuModel.create(menu);
      return true;
    } catch (error) {
      throw new Error(
        `Error setting data to the database: ${error.message}`,
      );
    }
  }

  async getMenu() {
    try {
      return await this.currentMenuModel.find({}, '-_id -__v');
    } catch (error) {
      throw new Error(
        `Error setting data to the database: ${error.message}`,
      );
    }
  }
}

export default Database;
