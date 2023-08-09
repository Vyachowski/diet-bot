import { error } from 'node:console';
import fs from 'node:fs';
import { MongoClient, ServerApiVersion } from 'mongodb';
import {telegraf_token, mongo_token} from '../src/data/token.js'

export default class Connector {
  // Basic settings
  static workingDirectory = process.cwd();

  // Selecting a data source
  constructor(dataSource = 'mongodb') {
    this.dataSource = dataSource;
    this.dishesFilePath = `${Connector.workingDirectory}/src/data/dishes.json`;
    this.ingredientsFilePath = `${Connector.workingDirectory}/src/data/ingredients.json`;
    this.configFilePath = `${Connector.workingDirectory}/src/data/config.json`;
    this.client = new MongoClient(mongo_token, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
    });
    this.database = this.client.db('Bity_smarty');
    this.dishesCollection = this.database.collection('dishes');
    this.ingredientsCollection = this.database.collection('ingredients');
    this.configCollection = this.database.collection('config');
  }

  // Read a JSON file
  static readJsonFile(filePath) {
    try {
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const jsonObject = JSON.parse(fileContent, (key, value) => {
        const parsedValue = parseFloat(value);
        return !isNaN(parsedValue) ? parsedValue : value;
      });
      return jsonObject;
    } catch (error) {
      console.error('Error reading file or converting JSON:', error);
      throw error;
    }
  }

  // Write a JSON file
  static writeJsonFile(filePath, data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(filePath, jsonData, 'utf8');
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
  }

  // Get dishes list
  async getDishes() {
    let response;

    try {
      switch (this.dataSource) {
        case 'json':
          response = Connector.readJsonFile(this.dishesFilePath);
          break;
        case 'mongodb':
          await this.client.connect()
          const responseWithId = await this.dishesCollection.findOne();
          ({_id, ...response} = responseWithId);
          break;
        default:
          throw new Error('Data source is not specified');
      }
    } catch (error) {
      console.error('An error occurred while accessing data:', error);
      throw error;
    } finally {
      if (this.client.isConnected()) {
        await this.client.close();
      }
    }

   return response;
  }

  // Get ingredients list
  async getIngredients() {
    let response;

    try {
      switch (this.dataSource) {
        case 'json':
          response = Connector.readJsonFile(this.ingredientsFilePath);
          break;
        case 'mongodb':
          await this.client.connect()
          const responseWithId = await this.ingredientsCollection.findOne();
          ({_id, ...response} = responseWithId);
          break;
        default:
          throw new Error('Data source is not specified');
      }
    } catch (error) {
      console.error('An error occurred while accessing data:', error);
      throw error;
    } finally {
      if (this.client.isConnected()) {
        await this.client.close();
      }
    }

   return response;
  }

  // Get config
  async getConfig() {
    let response;

    try {
      switch (this.dataSource) {
        case 'json':
          response = Connector.readJsonFile(this.ingredientsFilePath);
          break;
        case 'mongodb':
          await this.client.connect()
          const responseWithId = await this.configCollection.findOne();
          ({_id, ...response} = responseWithId);
          break;
        default:
          throw new Error('Data source is not specified');
      }
    } catch (error) {
      console.error('An error occurred while accessing data:', error);
      throw error;
    } finally {
      if (this.client.isConnected()) {
        await this.client.close();
      }
    }

   return response;
  }

  // Set config
  setConfig = (data) => Connector.writeJsonFile(Connector.configFilePath, data); // => Update config JSON
}