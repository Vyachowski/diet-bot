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
  };

  static getRandomMeal(mealVariants) {
    if (mealVariants.length > 0) {
      const index = Math.floor(mealVariants.length * Math.random());
      const meal = mealVariants[index];
      return meal;
    }
    return null;
  };

  _createRandomMenu() {
    return {
      breakfast: Diet.getRandomMeal(this._dishes.breakfast),
      snack: Diet.getRandomMeal(this._dishes.snack),
      lunch: Diet.getRandomMeal(this._dishes.lunch),
      dinner: Diet.getRandomMeal(this._dishes.dinner),
    };
  };

  //  [['banana', 30], ['pineapple', 60]]
  _createDish(dishName, ingredientsList) {
    const ingredients = Object.fromEntries(ingredientsList);
    return {"name": dishName, ingredients};
  };

  _createIngredient(name, section) {
    return { [name]: {"section": section} };
  };  

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
  };

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
  };

  setMenu() {
    if (!hasPassedGivenDays(this._config.menuCreated, this._menuDuration)) {
      return false;
    }
    try {
      this._config.menuCreated = getCurrentTime();
      this._config.currentMenu = this._createRandomMenu();
      this._connector.setUserConfig(this._config);
      return true;
    } catch (error) {
      console.error("Error while setting the menu:", error);
    };
  };

  setGroceryList() {
    try {
      if (!hasPassedGivenDays(this._config.menuCreated, this._menuDuration)) {
        const ingredientList = this._createIngredientsList();
        this._config.currentGroceryList = this._createGroceryList(ingredientList);
        this._connector.setUserConfig(this._config);
        return true;
      }
      this.setMenu();
      const ingredientList = this._createIngredientsList();
      this._config.currentGroceryList = this._createGroceryList(ingredientList);
      this._connector.setUserConfig(this._config);
      return true;
    } catch (error) {
      console.error("Error while setting the grocery list:", error);
    };
  };

  getMenuText() {
    const menuData = {
      "For breakfast · 🥓 · 🧇 · 🥞 · 🍳": this._config.currentMenu.breakfast,
      "For snack · 🍎 · 🍪 · 🥨 · 🍫 · ": this._config.currentMenu.snack,
      "For lunch · 🍽️ · 🥪 · 🍱 · 😋 ": this._config.currentMenu.lunch,
      "For dinner · 🥘 · 🍲 · 🥣 · 🥗 ": this._config.currentMenu.dinner,
    };

    const menu = Object.entries(menuData).map(([mealName, dish]) =>
        `| ${mealName}\n| ${dish.name.toUpperCase()}\n\n${objectToTextColumn(
          dish.ingredients
        )}\n\n`
    );
    const menuText = menu.join('');

    return menuText;
  };

  getGroceryListText() {
    const groceryListData = this._config.currentGroceryList;
    const groceryListColumns = groceryListData.map(({ section, productAmount }) =>
        `| ${section.toUpperCase()}\n\n${productAmount
          .map((product) => objectToTextColumn(product))
          .join("\n")}\n\n`
        );
    const groceryListText = groceryListColumns.join('');
    return groceryListText;
  };

  getDishesText() {
    const dishesData = {
      "1️⃣ Breakfast dishes": this._dishes.breakfast,
      "2️⃣ Snack dishes:": this._dishes.snack,
      "3️⃣ Lunch dishes:": this._dishes.lunch,
      "4️⃣ Dinner dishes:": this._dishes.dinner,
      "🌟 Cheatmeal variants:": this._dishes.cheatmeal,
    };

    const dishes = Object.entries(dishesData).map(([meal, dishes]) =>
        `${meal}\n${dishes.map(dish => dish.name).join(', ')}\n\n`
    );
    const dishesText = dishes.join('');
    
    return dishesText;
  };

  addDish(meal, name, ingredients) {
    const currentDishesList = this._dishes;
    const mealTypes = ['breakfast', 'dinner', 'lunch', 'snack', 'cheatmeal'];

    if (mealTypes.includes(meal)) {
      currentDishesList[meal].push({'name': name, 'ingredients': ingredients});
      this._connector.setDishes(currentDishesList);
      return true;
    } else {
      throw Error('Not a valid meal type');
    }
  };
};

export default Diet;

// const diet = new Diet(1);
// console.log(diet._createingredient('orange', 'fresh produce'));
// diet.addDish('breakfast', 'Rice boiled hard boiled', {'rice': 100, 'water': 400, 'salt': 2});