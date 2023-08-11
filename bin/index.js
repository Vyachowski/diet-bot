import {
  getCurrentTime,
  hasPassedGivenDays,
  mergeAndSumObjects,
  multiplyObjectValues,
  objectToTextColumn,
} from "../src/functions.js";
import Connector from "../src/connector.js";

class Diet {
  constructor() {
    this._connector = new Connector();
    this._dishes = this._connector.getDishes();
    this._ingredients = this._connector.getIngredients();
    this._config = this._connector.getConfig();
    this._menuDuration = 3;
  }

  static getRandomMeal(mealVariants) {
    if (mealVariants.length > 0) {
      const index = Math.floor(mealVariants.length * Math.random());
      const meal = mealVariants[index];
      const name = meal.name;
      const portions = meal.portions ?? 1;
      const ingredients = meal.ingredients ?? meal;
      return { name, portions, ingredients };
    }
    return null;
  }

  _createRandomMenu() {
    return {
      breakfast: Diet.getRandomMeal(this._dishes.breakfast),
      snack: Diet.getRandomMeal(this._dishes.snack),
      lunch: Diet.getRandomMeal(this._dishes.lunch),
      dinner: Diet.getRandomMeal(this._dishes.dinner),
    };
  }

  _createIngredientsList() {
    const breakfastIngredients = this._config.menu.breakfast.ingredients;
    const lunchIngredients = this._config.menu.lunch.ingredients;
    const snackIngredients = this._config.menu.snack.ingredients;
    const dinnerIngredients = this._config.menu.dinner.ingredients;
    const allIngredients = mergeAndSumObjects(
      breakfastIngredients,
      lunchIngredients,
      snackIngredients,
      dinnerIngredients
    );
    const ingredientsList = multiplyObjectValues(
      allIngredients,
      this._menuDuration
    );
    return ingredientsList;
  }

  _createGroceryList() {
    const allIngredientsList = Object.entries(this._ingredients);
    const ingredientsList = this._config.ingredientsList;

    const sections = [
      ...new Set(
        allIngredientsList.map(([, properties]) => properties.section)
      ),
    ];

    const ingredientsBySection = sections.map((section) => {
      const products = allIngredientsList
        .filter(([, properties]) => properties.section === section)
        .map(([product]) => product);
      return { section, products };
    });

    const groceryList = ingredientsBySection.map(({ section, products }) => {
      const productAmount = products
        .filter((product) => ingredientsList[product] !== undefined)
        .map((product) => ({ [product]: ingredientsList[product] }));
      return { section, productAmount };
    });

    return groceryList;
  }

  _setIngredientsList() {
    this._config.ingredientsList = this._createIngredientsList();
    this._connector.setConfig(this._config);
  }

  async setMenu() {
    if (!hasPassedGivenDays(this._config.date, this._menuDuration)) {
      console.log("Menu is still up-to-date");
      return;
    }
    try {
      this._config.date = getCurrentTime();
      this._config.menu = this._createRandomMenu();
      await this._connector.setConfig(this._config);
    } catch (error) {
      console.error("Error while setting the menu:", error);
    } finally {
      console.log("Menu successfully created");
    }
  }

  setGroceryList() {
    try {
      this._config.ingredientsList = this._createIngredientsList();
      this._config.groceryList = this._createGroceryList();
      this._connector.setConfig(this._config);
    } catch (error) {
      console.error("Error while setting the grocery list:", error);
    } finally {
      console.log("Grocery list successfully set");
    }
  }

  getMenu() {
    const menu = {
      "For breakfast · 🥓 · 🧇 · 🥞 · 🍳": this._config.menu.breakfast,
      "For snack · 🍎 · 🍪 · 🥨 · 🍫 · ": this._config.menu.snack,
      "For lunch · 🍽️ · 🥪 · 🍱 · 😋 ": this._config.menu.lunch,
      "For dinner · 🥘 · 🍲 · 🥣 · 🥗 ": this._config.menu.dinner,
    };
    const currentMenuArray = Object.entries(menu).map(([mealName, dish]) =>
        `| ${mealName}\n| ${dish.name.toUpperCase()}\n\n${objectToTextColumn(
          dish.ingredients
        )}\n\n`
    );
    const currentMenu = currentMenuArray.join('');
    return currentMenu;
  }

  getGroceryList() {
    const groceryListArray = this._config.groceryList;
    const groceryListColumns = groceryListArray.map(({ section, productAmount }) =>
        `| ${section.toUpperCase()}\n\n${productAmount
          .map((product) => objectToTextColumn(product))
          .join("\n")}\n\n`
        );
    const groceryList = groceryListColumns.join('');
    return groceryList;
  }

  displayMenu() {
    const menu = {
      "For breakfast · 🥓 · 🧇 · 🥞 · 🍳": this._config.menu.breakfast,
      "For snack · 🍎 · 🍪 · 🥨 · 🍫 · ": this._config.menu.snack,
      "For lunch · 🍽️ · 🥪 · 🍱 · 😋 ": this._config.menu.lunch,
      "For dinner · 🥘 · 🍲 · 🥣 · 🥗 ": this._config.menu.dinner,
    };
    Object.entries(menu).forEach(([mealName, dish]) =>
      console.log(
        `| ${mealName}\n| ${dish.name.toUpperCase()}\n\n${objectToTextColumn(
          dish.ingredients
        )}\n`
      )
    );
  }

  displayGroceryList() {
    const groceryListArray = this._config.groceryList;
    groceryListArray.forEach(({ section, productAmount }) =>
      console.log(
        `| ${section.toUpperCase()}\n\n${productAmount
          .map((product) => objectToTextColumn(product))
          .join('\n')}\n`
      )
    );
  }
}

export default Diet;
