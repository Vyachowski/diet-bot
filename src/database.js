import { DataTypes, Sequelize } from 'sequelize';

// Basic variables
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


// Data API
const getData = async(model, id) => {
  if (!['Menu', 'Recipe', 'Ingredient', 'User'].includes(model)) {
    throw new Error('Invalid model type');
  }

  try {
    switch (model) {
      case 'Menu':
        return await Menu.findOne(id);
      case 'Recipe':
        return id ? await Recipe.findOne(id) : await Recipe.findAll();
      case 'Ingredient':
        return id ? await Ingredient.findOne(id) : await Ingredient.findAll();
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
      case 'Menu':
        return await Menu.create(data);
      case 'Recipe':
        return await Recipe.create(data);
      case 'Ingredient':
        return await Ingredient.create(data);
      default:
        return await User.findOne(data.telegramId, data.name);
    }
  } catch (error) {
    throw new Error(`Data retrieving failed: ${error.message}`);
  }
}

const restoreBasicCookbook = async (basicRecipes) => {
  if (!basicRecipes || !Array.isArray(basicRecipes) || basicRecipes.length === 0) {
    throw new Error(
      `Invalid input: basicDishesList should be a non-empty array.`,
    );
  }

  const promises = basicRecipes.map(async (dish) => {
    try {
      await setData(dish);
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
  Menu,
  Recipe,
  Ingredient,
  getData,
  setData,
};
