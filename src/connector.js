import fs from 'node:fs';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { mongo_local } from './data/token.js';
import path from 'node:path';
import { objectValuesToNumber } from './functions.js';
import mongojs from 'mongojs';
import monk from 'monk';

export default class Connector {
  // Basic settings
  static workingDirectory = process.cwd();

  // Selecting a data source
  constructor(dataSource = 'json') {
    if (dataSource !== 'json' && dataSource !== 'mongodb') {
      throw new Error("Data source should be either 'json' or 'mongodb'");
    }
    this.dataSource = dataSource;
    this.dishesFilePath = `${Connector.workingDirectory}/src/data/dishes.json`;
    this.ingredientsFilePath = `${Connector.workingDirectory}/src/data/ingredients.json`;
    this.configFilePath = `${Connector.workingDirectory}/src/data/config.json`;
    if (dataSource === 'mongodb') {
      // this.client = new MongoClient(mongo_token, {
      //   serverApi: {
      //     version: ServerApiVersion.v1,
      //     strict: true,
      //     deprecationErrors: true,
      //   },
      // });
      // this.database = this.client.db('Bity_smarty');
      // this.database = mongojs(mongo_token); //, 'Bity_smarty'
      // this.dishesCollection = this.database.collection('dishes');
      // this.ingredientsCollection = this.database.collection('ingredients');
      // this.configCollection = this.database.collection('config');
      this.database = monk(mongo_local); 
      this.dishesCollection = this.database.get('dishes');
      this.ingredientsCollection = this.database.get('ingredients');
      this.configCollection = this.database.get('config');
    }
  }

  // Read a JSON file
  static readJsonFile(filePath) {
    try {
      const absoluteFilePath = path.resolve(filePath);
      const fileContent = fs.readFileSync(absoluteFilePath, 'utf8');
      const jsonObject = JSON.parse(fileContent, objectValuesToNumber);
      return jsonObject;
    } catch (error) {
      console.error('Error reading file or converting JSON:', error);
      throw error;
    }
  }

  // Write a JSON file
  static writeJsonFile(filePath, data) {
    try {
      const absoluteFilePath = path.resolve(filePath);
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(absoluteFilePath, jsonData, 'utf8');
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
    }
  }

  // Get dishes list
  getDishes() {
    try {
      switch (this.dataSource) {
        case 'json':
          return Connector.readJsonFile(this.dishesFilePath);
        case 'mongodb':
          return this.client.connect().then(async () => {
            const responseWithId = await this.dishesCollection.findOne();
            const { _id, ...response } = responseWithId;
            await this.client.close();
            return response;
          });
        default:
          throw new Error('Data source is not specified');
      }
    } catch (error) {
      console.error('An error occurred while accessing data:', error);
      throw error;
    }
  }

  // Get ingredients list
  async getIngredients() {
    try {
      switch (this.dataSource) {
        case 'json':
          return Connector.readJsonFile(this.ingredientsFilePath);
        case 'mongodb':
            const responseWithId = this.ingredientsCollection.findOne();
            // const { _id, ...response } = responseWithId;
            this.database.close()
            return responseWithId;
        default:
          throw new Error('Data source is not specified');
      }
    } catch (error) {
      console.error('An error occurred while accessing data:', error);
      throw error;
    }
  }

  // Get config
  getConfig() {
    try {
      switch (this.dataSource) {
        case 'json':
          return Connector.readJsonFile(this.configFilePath);
        case 'mongodb':
          return this.client.connect().then(async () => {
            const responseWithId = await this.configCollection.findOne();
            let { _id, ...response } = responseWithId;
            await this.client.close();
            return response;
          });
        default:
          throw new Error('Data source is not specified');
      }
    } catch (error) {
      console.error('An error occurred while accessing data:', error);
      throw error;
    }
  }

  setConfig(data) {
    try {
      switch (this.dataSource) {
        case 'json':
          Connector.writeJsonFile(this.configFilePath, data);
          break;
        case 'mongodb':
          return (async () => {
            await this.client.connect();
            await this.configCollection.deleteMany({});
            await this.configCollection.insertMany(data);
            await this.client.close();
          })();
        default:
          throw new Error('Data source is not specified');
      }
    } catch (error) {
      console.error(
        'An error occurred while accessing data or connecting to the database:',
        error
      );
      throw error;
    } finally {
      console.log('Menu successfully updated');
    }
  }
}


const connect = new Connector('mongodb');

// // console.log(connect.dishesCollection)
console.log(connect.getIngredients())