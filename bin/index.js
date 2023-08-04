import { getCurrentTime, hasPassedGivenDays, mergeAndSumObjects, multiplyObjectValues, camelCaseToText } from '../src/functions.js';
import Connector from '../src/connector.js';

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
      return {name, portions, ingredients}
    }
    return null;
  };

  createRandomMenu() {
    return {
      breakfast: Diet.getRandomMeal(this._dishes.breakfast),
      snack: Diet.getRandomMeal(this._dishes.snack),
      lunch: Diet.getRandomMeal(this._dishes.lunch),
      dinner: Diet.getRandomMeal(this._dishes.dinner)
    };
   }

   createIngredientsList() {
    const breakfastIngredients = this._config.menu.breakfast.ingredients;
    const lunchIngredients = this._config.menu.lunch.ingredients;
    const snackIngredients = this._config.menu.snack.ingredients;
    const dinnerIngredients = this._config.menu.dinner.ingredients;
    const allIngredients = mergeAndSumObjects(breakfastIngredients, lunchIngredients, snackIngredients, dinnerIngredients);
    const ingredientsList = multiplyObjectValues(allIngredients, this._menuDuration);
    return ingredientsList;
  }

  createGroceryList() {
    const allIngredientsList = Object.entries(this._ingredients);
    const ingredientsList = this._config.ingredientsList;
    const sections = allIngredientsList.reduce((acc, [, properties]) => {
      if (!acc.includes(properties.section)) {
        acc.push(properties.section);
      }
      return acc;
    }, []);
    const ingredientsBySection = sections.map((section) => {
      return {
        section,
        products: allIngredientsList
          .filter(([ , properties]) => properties.section === section)
          .map(([product]) => product),
      };
    });
    const groceryList = ingredientsBySection.map(
      ({ section, products }) => {
        const productAmount = products
          .map((product) => {
            if (ingredientsList[product] !== undefined)
              return { [product]: ingredientsList[product] };
          })
          .filter((product) => product !== undefined);
        return { section, productAmount };
      }
    );
    return groceryList;
  }

  setMenu() {
    if (!(hasPassedGivenDays(this._config.date, this._menuDuration))) {
      return;
    }
    this._config.date = getCurrentTime();
    this._config.menu = this.createRandomMenu();
    this._connector.setConfig(this._config);
  }

  setIngredientsList() {
    this._config.ingredientsList = this.createIngredientsList();
    this._connector.setConfig(this._config);
  }

  setGroceryList() {
    this._config.groceryList = this.createGroceryList();
    this._connector.setConfig(this._config);
  }

  displayMenu() {
    const menu = {
      "For breakfast · 🥓 · 🧇 · 🥞 · 🍳": this._config.menu.breakfast,
      "For snack · 🍎 · 🍪 · 🥨 · 🍫 · ": this._config.menu.snack,
      "For lunch · 🍽️ · 🥪 · 🍱 · 😋 ": this._config.menu.lunch,
      "For dinner · 🥘 · 🍲 · 🥣 · 🥗 ": this._config.menu.dinner,
    };
    Object.entries(menu).forEach(([name, meal]) => console.log(`${name}\n\n${JSON.stringify(meal.name).replace(/"/gi, '').toUpperCase()}\n\n${camelCaseToText(JSON.stringify(meal.ingredients).slice(1, -1).replace(/"/gi, '').replace(/,/gi,'\n').replace(/:/gi,': '))}\n\n`));
  }

  displayGroceryList() {
    const groceryListArray = this._config.groceryList;
    groceryListArray.forEach(({section, productAmount}) => console.log(`${section.toUpperCase()}\n\n${JSON.stringify(productAmount).replace(/"/gi, '').toUpperCase()}\n\n`));
  }
}

const diet = new Diet();

// diet.setMenu();
// diet.createGroceryList();
// diet.setIngredientsList();
// diet.setGroceryList();
// diet.displayMenu();
// diet.displayGroceryList();

export default Diet;