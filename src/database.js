import { DataTypes, Sequelize } from 'sequelize';

// Basic variables
const meals = ["breakfast", "snack", "lunch", "afternoonSnack", "dinner"];
const shopDepartments = [
  "fresh",
  "chips",
  "cheese",
  "meat",
  "fish",
  "grocery",
  "bread",
  "dairy",
  "frozen",
  "beverages",
];

// Connection
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'diet_bot.sqlite3'
});

// Synchronization
const syncModels = async() => {
  try {
    await sequelize.sync();
  } catch (error) {
    throw new Error(`Error while synchronizing models: ${error.message}`);
  }
}

// Disconnection
const disconnect = async() => {
  try {
    await sequelize.close();
    return true;
  } catch (error) {
    throw new Error(
      `Error disconnecting from the database: ${error.message}`,
    );
  }
}

// Models
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  telegramId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

const Menu = sequelize.define('Menu', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  breakfast: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  snack: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  lunch: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  afternoonSnack: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  dinner: {
    type: DataTypes.JSON,
    allowNull: false,
  },
})

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course: {
    type: DataTypes.ARRAY,
    allowNull: false
  },
  ingredients: {
    type: DataTypes.ARRAY,
    allowNull: false
  },
  recipe: {
    type: DataTypes.ARRAY,
    allowNull: false
  },
  energy: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  nutrients: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  storageTimeInHours: {
    type: DataTypes.INTEGER,
    allowNull: true,
  }
})

const Ingredient = sequelize.define('Ingredient', {
  name: {
    type: DataTypes.STRING
  },
  energy: {
    type: DataTypes.INTEGER,
  },
  alternateMeasureUnit: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  unitsConversionRate: {
    type: DataTypes.FLOAT,
  },
  department: {
    type: DataTypes.STRING,
  }
});

// Relations
User.hasOne(Menu, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

Menu.belongsTo(User, {
  foreignKey: 'userId',
})

Menu.belongsToMany(Recipe, { through: 'MenusDishes' });
Recipe.belongsToMany(Menu, { through: 'MenusDishes' });

Recipe.belongsToMany(Ingredient, { through: 'RecipeIngredients' });
Ingredient.belongsToMany(Recipe, { through: 'RecipeIngredients' });

// User API
const setUser = async (userId) => {
  try {
    // connect to database
    await connectDB();
    await createNewUser(userName, userId);
    return true;
  } catch (error) {
    throw new Error(`User creation has failed: ${error.message}`);
  }
}
// Menu API
const setMenu = async (menu) => {
  try {
    await Menu.create(menu);
    return true;
  } catch (error) {
    throw new Error(
      `Error setting data to the database: ${error.message}`,
    );
  }
}

const getMenu = async (userId) => {
  try {
    return await Menu.findOne(userId);
  } catch (error) {
    throw new Error(
      `Error getting menu: ${error.message}`,
    );
  }
}

// Recipe API
const setRecipe = async (dish) => {
  if (!dish || typeof dish !== 'object' || Object.keys(dish).length === 0) {
    throw new Error(
      `Invalid input: dish should be an non-empty object.`,
    );
  }

  try {
    await Recipe.create(dish);
    return true;
  } catch (error) {
    throw new Error(
      `Error setting data to the database: ${error.message}`,
    );
  }
}

const setBasicRecipes = async (basicRecipes) => {
  if (!basicRecipes || !Array.isArray(basicRecipes) || basicRecipes.length === 0) {
    throw new Error(
      `Invalid input: basicDishesList should be a non-empty array.`,
    );
  }

  const promises = basicRecipes.map(async (dish) => {
    try {
      await setNewRecipe(dish);
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

const getRandomRecipe = async (meal) => {
  if (!meals.includes(meal)) {
    throw new Error(`Select one of the valid meal types: ${meals}`);
  }

  let randomMeal;

  try {
    const mealsByType = await Recipe.findOne({ course: meal });
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
    allDishes = await Recipe.findAll();

  } catch (error) {
    throw new Error(
      `Error fetching data from the database: ${error.message}`,
    );
  }

  return allDishes;
}

// Ingredient API
const setIngredient = async (ingredient) => {
  try {
    await Ingredient.create(ingredient);
    return true;
  } catch (error) {
    throw new Error(
      `Error setting data to the database: ${error.message}`,
    );
  }
}

export {
  sequelize,
  syncModels,
  disconnect,
  User,
  Menu,
  Recipe,
  Ingredient,
  setUser,
  setMenu,
  getMenu,
  setRecipe,
  setBasicRecipes,
  getRandomRecipe,
  getAllDishes,
  setIngredient,
};
