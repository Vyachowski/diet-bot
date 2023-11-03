import Database from "../data-module/Database.js";
// import basicMenu from "../data-module/basicMenu.js";

// Connect to the database
const db = new Database();
await db.connect();

// Create a new random menu and save it as current menu
async function createRandomMenu() {
  const meals = db.meals;
  let newMenu = {};

  for (const meal of meals) {
    newMenu[meal] = await db.getRandomDishForMeal(meal);
  }
  await db.setCurrentMenu(newMenu);

  return newMenu;
}

// Get current menu

async function getCurrentMenu() {
  const currentMenu = await db.getCurrentMenu();
  return currentMenu;
}

// Create a grocery list for current menu
async function getGroceryListForCurrentMenu() {
  const {breakfast, snack, lunch, afternoonSnack, dinner} = await db.getCurrentMenu();
  const currentMenu = {breakfast, snack, lunch, afternoonSnack, dinner};

  let notUniqueIngredients = [];

  for (const meal in currentMenu) {
    notUniqueIngredients = notUniqueIngredients.concat(currentMenu[meal]['ingredients']);
  }

  const uniqueIngredients = notUniqueIngredients.reduce((accumulator, [ingredient, amount]) => {
    accumulator[ingredient] = (accumulator[ingredient] || 0) + amount;
    return accumulator;
  }, {});

  return uniqueIngredients;
}

export {
  createRandomMenu,
  getCurrentMenu,
  getGroceryListForCurrentMenu,
}
