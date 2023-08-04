import fs from "node:fs";

export default class Connector {
  // Basic settings
  static workingDirectory = process.cwd();
  static dishesFilePath = `${Connector.workingDirectory}/src/data/dishes.json`;
  static ingredientsFilePath = `${Connector.workingDirectory}/src/data/ingredients.json`;
  static configFilePath = `${Connector.workingDirectory}/src/data/config.json`;

  // Selecting a data source
  constructor(dataSource = "json") {
    this.dataSource = dataSource;
  }

  // Read a JSON file
  static readJsonFile(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, "utf8");
      const jsonObject = JSON.parse(fileContent, (key, value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) ? parsedValue : value;
      });
      return jsonObject;
    } catch (error) {
      console.error("Error reading file or converting JSON:", error);
      throw error;
    }
  }

  // Write a JSON file
  static writeJsonFile(filePath, data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(filePath, jsonData, "utf8");
    } catch (error) {
      console.error("Error writing file:", error);
      throw error;
    }
  }

  // Get dishes list
  getDishes = () => Connector.readJsonFile(Connector.dishesFilePath); // => { breakfast: [ ... ], snack: [ ... ], ... }

  // Get ingredients list
  getIngredients = () => Connector.readJsonFile(Connector.ingredientsFilePath); // => { banana: { alternateUnit: 'piece', section: 'fresh produce' }, ... }

  // Get config
  getConfig = () => Connector.readJsonFile(Connector.configFilePath); // => { date: 1690922005, menu: { ... }, ingredientsList: {...}, groceryList: [ ... ] }

  // Set config
  setConfig = (data) => Connector.writeJsonFile(Connector.configFilePath, data); // => Update config JSON
}

const connector = new Connector('json');