import Connector from '../src/connector.js';


npm i --save-dev jest
// Test getDishes()
const connector = new Connector('json');
const dishes = await connector.getDishes();
console.log(dishes);








// const diet = new Diet();

// // diet.setMenu();
// // diet.setGroceryList();
// // diet.displayMenu();
// diet.displayGroceryList();