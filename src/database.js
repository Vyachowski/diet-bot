import { DataTypes, Sequelize } from 'sequelize';
import axios from 'axios';

// Basic data
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
  menuCreated: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  breakfastId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  snackId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  lunchId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  afternoonSnackId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  dinnerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

const Recipe = sequelize.define('Recipe', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  apiId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  isDone: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  meal: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false,
    validate: {
      isArrayOfMeals(value) {
        if (!Array.isArray(value)) {
          throw new Error('Course must be an array.');
        }
        if (value.length === 0) {
          throw new Error('Course array cannot be empty.');
        }
        if (!value.every(meal => meals.includes(meal))) {
          throw new Error(`Course must be an array of: ${meals.join(', ')}`);
        }
      },
    }
  }
});

// Database API
const getDataById = async(model, id) => {
  if (!['Menu', 'Recipe', 'Ingredient', 'User'].includes(model)) {
    throw new Error('Invalid model type');
  }

  try {
    switch (model) {
      case 'Recipe':
        return id ? await Recipe.findOne(id) : await Recipe.findAll();
      default:
        return await User.findOne(id);
    }
  } catch (error) {
    throw new Error(`Data retrieving failed: ${error.message}`);
  }
}

const setData = async(model, data) => {
  if (!['Menu', 'Recipe', 'Ingredient', 'User'].includes(model)) {
    throw new Error('Invalid model type');
  }

  try {
    switch (model) {
      case 'Recipe':
        return await Recipe.create(data);
      default:
        return await User.create(data);
    }
  } catch (error) {
    throw new Error(`Data retrieving failed: ${error.message}`);
  }
}

const updateDataById = async(model, data, id) => {
  if (!['Menu', 'Recipe', 'Ingredient', 'User'].includes(model)) {
    throw new Error('Invalid model type');
  }

  try {
    switch (model) {
      case 'Recipe':
        return await Recipe.update(data);
      default:
        return await User.update(data);
    }
  } catch (error) {
    throw new Error(`Data retrieving failed: ${error.message}`);
  }
}

const deleteDataById = async(model, id) => {
  if (!['Menu', 'Recipe', 'Ingredient', 'User'].includes(model)) {
    throw new Error('Invalid model type');
  }

  try {
    switch (model) {
      case 'Recipe':
        return await Recipe.update(data);
      default:
        return await User.update(data);
    }
  } catch (error) {
    throw new Error(`Data retrieving failed: ${error.message}`);
  }
}

// Spoonacular API
const getRecipeById = async() => {

  const optionsSearch = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
    params: {
      query: 'one pot chicken rice',
      type: 'main course',
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_HOST,
    }
  };
  const options = {
    method: 'GET',
    url: 'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch',
    params: {
      query: 'banana overnight oats',
      type: 'main course',
    },
    headers: {
      'X-RapidAPI-Key': process.env.RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.RAPID_API_HOST,
    }
  };

  try {
    const response = await axios.request(optionsSearch);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

getRecipeById().then(r => console.log('Works!'));
const restoreBasicRecipes = async(basicRecipes) => {
  if (!basicRecipes || !Array.isArray(basicRecipes) || basicRecipes.length === 0) {
    throw new Error(
      `Invalid input: Basic recipes should be a non-empty array.`,
    );
  }

  const promises = basicRecipes.map(async(recipe) => {
    try {
      await setData('Recipe', recipe);
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

export {
  sequelize,
  syncModels,
  disconnect,
  User,
  Recipe,
  getDataById,
  setData,
  updateDataById,
  deleteDataById,
};
