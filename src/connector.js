import fs from "node:fs";
import path from "node:path";
import { objectValuesToNumber } from "./functions.js";

export default class Connector {
  static workingDirectory = process.cwd();

  // Selecting a data source
  constructor(user_id, dataSource = "json") {
    if (dataSource !== "json" && dataSource !== "mongodb") {
      throw new Error("Data source should be either 'json' or 'mongodb'");
    }
    this.user = user_id; 
    this.dataSource = dataSource;
    this.dishesFilePath = `${Connector.workingDirectory}/src/data/dishes.json`;
    this.ingredientsFilePath = `${Connector.workingDirectory}/src/data/ingredients.json`;
    this.configFilePath = `${Connector.workingDirectory}/src/data/users/config_${this.user}.json`;
  }

  static readJsonFile(filePath) {
    try {
      const absoluteFilePath = path.resolve(filePath);
      const fileContent = fs.readFileSync(absoluteFilePath, "utf8");
      const jsonObject = JSON.parse(fileContent, objectValuesToNumber);
      return jsonObject;
    } catch (error) {
      console.error("Error reading file or converting JSON:", error);
      throw error;
    }
  }

  static writeJsonFile(filePath, data) {
    try {
      const absoluteFilePath = path.resolve(filePath);
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(absoluteFilePath, jsonData, "utf8");
    } catch (error) {
      console.error("Error writing file:", error);
      throw error;
    }
  }

  getDishes() {
    let response = {};

    try {
      switch (this.dataSource) {
        case "json":
          response = Connector.readJsonFile(this.dishesFilePath);
          return response;
        default:
          throw new Error("Data source is not specified");
      }
    } catch (error) {
      console.error("An error occurred while accessing data:", error);
      throw error;
    }
  }

  getIngredients() {
    let response = {};
    
    try {
      switch (this.dataSource) {
        case "json":
          response = Connector.readJsonFile(this.ingredientsFilePath);
          return response;
        default:
          throw new Error("Data source is not specified");
      }
    } catch (error) {
      console.error("An error occurred while accessing data:", error);
      throw error;
    }
  }

  getUserConfig() {
    let response = {};
    
    try {
      switch (this.dataSource) {
        case "json":
          response = Connector.readJsonFile(this.configFilePath);
          return response;
        default:
          throw new Error("Data source is not specified");
      }
    } catch (error) {
      console.error("An error occurred while accessing data:", error);
      throw error;
    }
  }

  setUserConfig(data) {
    try {
      switch (this.dataSource) {
        case "json":
          Connector.writeJsonFile(this.configFilePath, data);
          break;
        default:
          throw new Error("Data source is not specified");
      }
      console.log("User config file successfully updated");
      return true;
    } catch (error) {
      console.error(
        "An error occurred while accessing data or connecting to the database:",
        error
      );
      throw error;
    };
  };
};
