import { DataTypes, Sequelize } from 'sequelize';

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
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  type: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: {
        args: ['recipe', 'product'],
        msg: 'Meal must be "recipe" or "product"',
      },
    },
  },
  apiId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
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



// Data API
// const getData = async(model, id) => {
//   if (!['Menu', 'Recipe', 'Ingredient', 'User'].includes(model)) {
//     throw new Error('Invalid model type');
//   }
//
//   try {
//     switch (model) {
//       case 'Menu':
//         return await Menu.findOne(id);
//       case 'Recipe':
//         return id ? await Recipe.findOne(id) : await Recipe.findAll();
//       case 'Ingredient':
//         return id ? await Ingredient.findOne(id) : await Ingredient.findAll();
//       default:
//         return await User.findOne(id);
//     }
//   } catch (error) {
//     throw new Error(`Data retrieving failed: ${error.message}`);
//   }
// }
//
// const setData = async(model, data) => {
//   if (!['Menu', 'Recipe', 'Ingredient', 'User'].includes(model)) {
//     throw new Error('Invalid model type');
//   }
//
//   try {
//     switch (model) {
//       case 'Menu':
//         return await Menu.create(data);
//       case 'Recipe':
//         return await Recipe.create(data);
//       case 'Ingredient':
//         return await Ingredient.create(data);
//       default:
//         return await User.findOne(data.telegramId, data.name);
//     }
//   } catch (error) {
//     throw new Error(`Data retrieving failed: ${error.message}`);
//   }
// }
//
// const restoreBasicCookbook = async (basicRecipes) => {
//   if (!basicRecipes || !Array.isArray(basicRecipes) || basicRecipes.length === 0) {
//     throw new Error(
//       `Invalid input: Basic recipes should be a non-empty array.`,
//     );
//   }
//
//   const promises = basicRecipes.map(async(recipe) => {
//     try {
//       await setData(recipe);
//       return true;
//     } catch (error) {
//       throw new Error(
//         `Error setting data to the database: ${error.message}`,
//       );
//     }
//   });
//
//   await Promise.all(promises);
//   return true;
// }
//
// export {
//   sequelize,
//   syncModels,
//   disconnect,
//   User,
//   Menu,
//   Recipe,
//   Ingredient,
//   getData,
//   setData,
// };
