import Database from "../data-module/Database.js";
// import basicMenu from "../data-module/basicMenu.js";

class Diet {
  constructor(menuDuration = 3, kitchenEquipment = ['multiCooker']) {
    this.menuDuration = menuDuration;
    this.kitchenEquipment = kitchenEquipment;
    this.db = new Database();
  }

  // MENU API
  async createRandomMenu() {
    const meals = this.db.meals;
    let newMenu = {};

    for (const meal of meals) {
      newMenu[meal] = await this.db.getRandomDish(meal);
    }
    await this.db.setMenu(newMenu);

    return newMenu;
  }

  async getMenu() {
    return await this.db.getMenu();
  }

  // GROCERY LIST API
  async getGroceryListForMenu() {
    const {breakfast, snack, lunch, afternoonSnack, dinner} = await this.db.getCurrentMenu();
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

  // DISHES API
  // Nothing is here...
}

export default Diet;
