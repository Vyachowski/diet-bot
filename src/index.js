// Get welcome messages
const welcomeMessage =
  "Hi! Let me introduce you 'Bity Smarty' – a special bot that can provide a healthy diet and a grocery list for your next shopping.\n\n"
const featureMessage = 'Here is 5 main features of this bot:\n' +
  '1. Save your time: Only 1 hour for cooking per 3 day!\n' +
  '2. No complex equipment. Just a multi cooker to start!\n' +
  '3. Healthy diet with fancy recipes that looks great\n' +
  '4. Most recipes can be easily stored in the fridge or in the freezer\n' +
  '5. I can make it even tastier – It is completely free :)'
const getIntroMessage = (type) => type === 'welcome' ? welcomeMessage : featureMessage;
// TODO: Create user with user ID in database
const setNewUser = async (userId) => {
  try {
    // connect to database
    // write a new user with parameters (name, userId, currentMenu = undefined)
    return true;
  } catch (e) {
    console.error('User creation has failed. ', e);
    throw new Error(e);
  }
}
// TODO: Provide a new week menu
const isCurrentMenuExist = async (userId) => {
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
const setNewMenu = async (userId) => {
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
const getCurrentMenu = async (userId) => {
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

// TODO: Remove current menu
const removeCurrentMenu = () => {
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

// TODO: Provide a grocery list based on current menu
const getCurrentGroceryList = async (userId) => {
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























const menuDuration = 3
const kitchenEquipment = ['multiCooker'];
const menuDuration = menuDuration;
const kitchenEquipment = kitchenEquipment;
const db = new Database();

const createRandomMenu = async() => {
  const meals = db.meals;
  let newMenu = {};

  for (const meal of meals) {
    newMenu[meal] = await this.db.getRandomDish(meal);
  }
  await db.setMenu(newMenu);

  return newMenu;
}

const getMenu = async() => {
  return await db.getMenu();
}

// GROCERY LIST API
const getGroceryListForMenu = async() => {
  const {breakfast, snack, lunch, afternoonSnack, dinner} = await this.db.getMenu();
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

  console.log(uniqueIngredients);
  console.log(uniqueIngredientsMultipliedByDietDuration);
  console.log(groceryList);
  // return uniqueIngredients;
}


