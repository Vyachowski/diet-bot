import {
  getCurrentTime,
  hasPassedGivenDays,
  mergeAndSumObjects,
  multiplyObjectValues,
  objectToTextColumn,
} from "../src/functions.js";
import Connector from "../src/connector.js";

class Diet {
  constructor(user_id) {
    this._connector = new Connector(user_id);
    this._menuDuration = 3;
    if (this._connector.dataSource === 'json') {
      this._dishes = this._connector.getDishes();
      this._ingredients = this._connector.getIngredients();
      this._config = this._connector.getUserConfig();
    }
  }

  static getRandomMeal(mealVariants) {
    if (mealVariants.length > 0) {
      const index = Math.floor(mealVariants.length * Math.random());
      const meal = mealVariants[index];
      return meal;
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
    const breakfastIngredients = this._config.currentMenu.breakfast.ingredients;
    const lunchIngredients = this._config.currentMenu.lunch.ingredients;
    const snackIngredients = this._config.currentMenu.snack.ingredients;
    const dinnerIngredients = this._config.currentMenu.dinner.ingredients;
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

  _createGroceryList(ingredients) {
    const allIngredientsList = Object.entries(this._ingredients);
    const ingredientsList = ingredients;

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

  setMenu() {
    if (!hasPassedGivenDays(this._config.menuCreated, this._menuDuration)) {
      console.log("Menu is still up-to-date");
      return false;
    }
    try {
      this._config.menuCreated = getCurrentTime();
      this._config.currentMenu = this._createRandomMenu();
      this._connector.setUserConfig(this._config);
      console.log("Menu successfully created");
      return true;
    } catch (error) {
      console.error("Error while setting the menu:", error);
    };
  }

  setGroceryList() {
    try {
      if (!hasPassedGivenDays(this._config.menuCreated, this._menuDuration)) {
        console.log("Menu is still up-to-date");
        const ingredientList = this._createIngredientsList();
        this._config.currentGroceryList = this._createGroceryList(ingredientList);
        this._connector.setUserConfig(this._config);
        console.log("Grocery list successfully set");
        return true;
      }
      this.setMenu();
      const ingredientList = this._createIngredientsList();
      this._config.currentGroceryList = this._createGroceryList(ingredientList);
      this._connector.setUserConfig(this._config);
      console.log("Grocery list successfully set");
      return true;
    } catch (error) {
      console.error("Error while setting the grocery list:", error);
    };
  }

  getMenu() {
    const menu = {
      "For breakfast · 🥓 · 🧇 · 🥞 · 🍳": this._config.currentMenu.breakfast,
      "For snack · 🍎 · 🍪 · 🥨 · 🍫 · ": this._config.currentMenu.snack,
      "For lunch · 🍽️ · 🥪 · 🍱 · 😋 ": this._config.currentMenu.lunch,
      "For dinner · 🥘 · 🍲 · 🥣 · 🥗 ": this._config.currentMenu.dinner,
    };
    const currentMenuArray = Object.entries(menu).map(([mealName, dish]) =>
        `| ${mealName}\n| ${dish.name.toUpperCase()}\n\n${objectToTextColumn(
          dish.ingredients
        )}\n\n`
    );
    const currentMenu = currentMenuArray.join('');
    return currentMenu;
  };

  getGroceryList() {
    const groceryListArray = this._config.currentGroceryList;
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
      "For breakfast · 🥓 · 🧇 · 🥞 · 🍳": this._config.currentMenu.breakfast,
      "For snack · 🍎 · 🍪 · 🥨 · 🍫 · ": this._config.currentMenu.snack,
      "For lunch · 🍽️ · 🥪 · 🍱 · 😋 ": this._config.currentMenu.lunch,
      "For dinner · 🥘 · 🍲 · 🥣 · 🥗 ": this._config.currentMenu.dinner,
    };
    Object.entries(menu).forEach(([mealName, dish]) =>
      console.log(
        `| ${mealName}\n| ${dish.name.toUpperCase()}\n\n${objectToTextColumn(
          dish.ingredients
        )}\n`
      )
    );
  };

  displayGroceryList() {
    const groceryListArray = this._config.currentGroceryList;
    groceryListArray.forEach(({ section, productAmount }) =>
      console.log(
        `| ${section.toUpperCase()}\n\n${productAmount
          .map((product) => objectToTextColumn(product))
          .join('\n')}\n`
      )
    );
  };
};

export default Diet;

const diet = new Diet(1);
diet.setGroceryList();