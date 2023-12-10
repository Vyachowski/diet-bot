// New code
const setNewMenu = async(userId) => {
  try {
    const newMenu = '';
    // connect to database
    // get new random menu from dishes
    // rewrite a user config with – currentMenu(date)
    return newMenu;
  } catch (e) {
    console.error('Menu setting has failed. ', e);
    throw new Error(e);
  }
}
const getCurrentMenu = async(userId) => {
  try {
    // connect to database
    // get new random menu from dishes
    // rewrite a user config with – currentMenu(date)
    return true;
  } catch (e) {
    console.error('Menu retrieving has failed. ', e);
    throw new Error(e);
  }
}

// TODO: Remove current menu
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




`----------------------------------------------------------------------------------------------`



// TODO: REFACTOR OLD CODE!!!!!
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
