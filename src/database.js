import {DataTypes, Sequelize} from 'sequelize';

// Models
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite3'
});

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

const CurrentMenu = sequelize.define('CurrentMenu', {
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

const Dish = sequelize.define('Dish', {
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
User.hasOne(CurrentMenu, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
})

CurrentMenu.belongsTo(User, {
  foreignKey: 'userId',
})



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
