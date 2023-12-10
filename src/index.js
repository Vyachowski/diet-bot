import {getData, setData} from "./database.js";

// Get welcome messages
const getIntroMessage = (type) => {
  const welcomeMessage =
    "Hi! Let me introduce you 'Bity Smarty' – a special bot that can provide a healthy diet and a grocery list for your next shopping.\n\n"
  const featureMessage = 'Here is 5 main features of this bot:\n' +
    '1. Save your time: Only 1 hour for cooking per 3 day!\n' +
    '2. No complex equipment. Just a multi cooker to start!\n' +
    '3. Healthy diet with fancy recipes that looks great\n' +
    '4. Most recipes can be easily stored in the fridge or in the freezer\n' +
    '5. I can make it even tastier – It is completely free :)'
  return (type === 'welcome' ? welcomeMessage : featureMessage);
}

// Initialize app
const initialize = async(userId, fullName) => {
  try {
    const isUserExist = getData('User', userId);
    return (!isUserExist ? await setData('User', userId) : true);
  } catch (error) {
    throw new Error(`Menu creation has failed: ${error.message}`);
  }
}

// Provide a new menu
const getRandomRecipe = async (meal) => {
  const meals = ["breakfast", "snack", "lunch", "afternoonSnack", "dinner"];
  if (!meals.includes(meal)) {
    throw new Error(`Select one of the valid meal types: ${meals}`);
  }

  try {
    const mealsByType = getData(meal);
    const randomMealNumber = Math.floor(Math.random() * mealsByType.length);
    return mealsByType[randomMealNumber];
  } catch (error) {
    throw new Error(
      `Error fetching data from the database: ${error.message}`,
    );
  }
}

const createRandomMenu = async() => {
  return 'newMenu';
}

const provideMenu = async(userId) => {
  try {
    const currentMenu = await getData('Menu', userId);
    if (!currentMenu) {
      const newMenu = createRandomMenu();
      return await setData('Menu', userId, newMenu);
    }
    return currentMenu;
  } catch (error) {
    throw new Error(`Menu creation has failed: ${error.message}`);
  }
}

// Provide a grocery list based on current menu
const getGroceryListForMenu = async() => {
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
  const {breakfast, snack, lunch, afternoonSnack, dinner} = getMenu();
  const currentMenu = {breakfast, snack, lunch, afternoonSnack, dinner};
  let notUniqueIngredients = [];
  let uniqueIngredients;

  for (const meal in currentMenu) {
    notUniqueIngredients = notUniqueIngredients.concat(currentMenu[meal]['ingredients']);
  }

  uniqueIngredients = notUniqueIngredients.reduce((accumulator, [ingredient, amount]) => {
    accumulator[ingredient] = (accumulator[ingredient] || 0) + amount;
    return accumulator;
  }, {});

  const uniqueIngredientsMultipliedByDietDuration = Object.entries(uniqueIngredients)
    .map(([ingredient, value]) => [ingredient, (Number(value) * 3)]);
  const groceryList = Object.fromEntries(uniqueIngredientsMultipliedByDietDuration);

  return uniqueIngredients;
}
const provideGroceryList = async(userId) => {
  try {
    const currentMenu = await getData('Menu', userId);
    if (!currentMenu) {
      return 'You should create a menu first';
    }
    return getGroceryListForMenu(currentMenu);
  } catch (error) {
    throw new Error(`Grocery list creation has failed: ${error.message}`);
  }
}

// Reset a menu
const removeCurrentMenu = async() => {
  try {
    // connect to database
    // get new random menu from dishes
    // rewrite a user config with – currentMenu(date)
    return true;
  } catch (e) {
    console.error('Menu creation has failed. ', e);
    throw new Error(e);
  }
}

const resetMenu = async(userId) => {
  try {
    await removeCurrentMenu();
    return await provideMenu(userId);
  } catch (error) {
    throw new Error(`Menu reset has failed: ${error.message}`);
  }
}

export {
  getIntroMessage,
  initialize,
  provideMenu,
  provideGroceryList,
  resetMenu,
}
