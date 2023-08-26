import fs from "node:fs";
import { readJsonFile, writeJsonFile } from "./functions.js";

export default class Connector {
  static workingDirectory = process.cwd();

  constructor(user_id, dataSource = "json") {
    if (dataSource !== "json" && dataSource !== "mongodb") {
      throw new Error("Data source should be either 'json' or 'mongodb'");
    };
    this.user = user_id; 
    this.dataSource = dataSource;
    this.dishesFilePath = `${Connector.workingDirectory}/src/data/dishes.json`;
    this.ingredientsFilePath = `${Connector.workingDirectory}/src/data/ingredients.json`;
    this.configFilePath = `${Connector.workingDirectory}/src/data/users/config_${this.user}.json`;
    if (!fs.existsSync(this.configFilePath)) {
      fs.writeFileSync(this.configFilePath, '{}');
    }
  }

  static getDataFromJSON(filePath) {
    try {
        return readJsonFile(filePath);
    } catch (error) {
      console.error("An error occurred while accessing data: ", error);
      throw error;
    };
  };

  static setDataToJSON(filePath, data) {
    try {
      writeJsonFile(filePath, data);
      return true;
  } catch (error) {
      console.error(
        "An error occurred while accessing data: ",
        error
      );
      throw error;
    };
  };

  getDishes() {
    return Connector.getDataFromJSON(this.dishesFilePath);
  };

  getIngredients() {
    return Connector.getDataFromJSON(this.ingredientsFilePath);
  };

  getUserConfig() {
    return Connector.getDataFromJSON(this.configFilePath);
  };

  setDishes(data) {
    return Connector.setDataToJSON(this.dishesFilePath, data);
  };

  setUserConfig(data) {
    return Connector.setDataToJSON(this.configFilePath, data);
  };
};
