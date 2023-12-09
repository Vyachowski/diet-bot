import Database from "../database/Database.js";
// import basicMenu from "../data-module/basicMenu.js";
const menuDuration = 3
const kitchenEquipment = ['multiCooker'];
const menuDuration = menuDuration;
const kitchenEquipment = kitchenEquipment;
const db = new Database();

const createRandomMenu = async() => {
  const meals = this.db.meals;
  let newMenu = {};

  for (const meal of meals) {
    newMenu[meal] = await this.db.getRandomDish(meal);
  }
  await this.db.setMenu(newMenu);

  return newMenu;
}

const getMenu = async() => {
  return await this.db.getMenu();
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

// TODO:
