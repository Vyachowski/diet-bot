import Database from "../data-module/Database.js";

// Connect to the database
const db = new Database();
await db.connect();

// Create a new random menu
async function getRandomMenu() {
  const meals = db.meals;
  let newMenu = {};

  for (const meal of meals) {
    newMenu[meal] = await db.getRandomMealByType(meal);
  }
  await db.setCurrentMenu(newMenu);

  return newMenu
}

getRandomMenu().then(r => console.log(Object.entries(r)));

