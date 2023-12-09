import mongoose from "mongoose";

const connectionUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/diet-bot?retryWrites=true&w=majority`;
const meals = ["breakfast", "snack", "lunch", "afternoonSnack", "dinner"];
const shopDepartments = [
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

const connect = async() => {
  try {
    const connectionData = await mongoose.connect(this.connectionUri);
    const connectedDBName = connectionData.connections[0].name;
    const connectionStatus = connectionData.connections[0].readyState;
    return {connectedDBName, connectionStatus};
  } catch (error) {
    throw new Error(`Error connecting to the database: ${error.message}`);
  }
}

const disconnect = async () => {
  try {
    await mongoose.disconnect();
    return true;
  } catch (error) {
    throw new Error(
      `Error disconnecting from the database: ${error.message}`,
    );
  }
}

const initModels = () => {
  const userModel = mongoose.model("User", userSchema);
  const dishModel = mongoose.model("Dish", dishSchema);
  const currentMenuModel = mongoose.model("CurrentMenu", currentMenuSchema);
  const ingredientModel = mongoose.model("Ingredient", ingredientSchema);
}

const initialize = async () => {
  try {
    initModels();
  } catch (error) {
    throw new Error(`Error connecting to the database: ${error.message}`);
  }
}

const setNewDish = async (dish) => {
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

const setBasicDishesSet = async (basicDishesList) => {
  if (!basicDishesList || !Array.isArray(basicDishesList) || basicDishesList.length === 0) {
    throw new Error(
      `Invalid input: basicDishesList should be a non-empty array.`,
    );
  }

  const promises = basicDishesList.map(async (dish) => {
    try {
      await setNewDish(dish);
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

const getRandomDish = async (meal) => {
  if (!meals.includes(meal)) {
    throw new Error(`Select one of the valid meal types: ${meals}`);
  }

  let randomMeal;

  try {
    const mealsByType = await dishModel.find({ course: meal });
    const randomMealNumber = Math.floor(Math.random() * mealsByType.length);
    randomMeal = mealsByType[randomMealNumber];
  } catch (error) {
    throw new Error(
      `Error fetching data from the database: ${error.message}`,
    );
  }

  return randomMeal;
}

const getAllDishes = async () => {
  let allDishes;

  try {
    allDishes = await dishModel.find({}, '-__v');

  } catch (error) {
    throw new Error(
      `Error fetching data from the database: ${error.message}`,
    );
  }

  return allDishes;
}

// INGREDIENT API
const setIngredient = async (ingredient) => {
  try {
    await ingredientModel.create(ingredient);
    return true;
  } catch (error) {
    throw new Error(
      `Error setting data to the database: ${error.message}`,
    );
  }
}

// MENU API
const setMenu = async () => {
  try {
    await currentMenuModel.create(menu);
    return true;
  } catch (error) {
    throw new Error(
      `Error setting data to the database: ${error.message}`,
    );
  }
}

const getMenu = async () => {
  try {
    return await currentMenuModel.find({}, '-_id -__v');
  } catch (error) {
    throw new Error(
      `Error setting data to the database: ${error.message}`,
    );
  }
}
