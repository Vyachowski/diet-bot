import fs from "node:fs";

export default class Connector {
  constructor(dataSource = 'json') {
    this.dataSource = dataSource;
  }

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

  static writeJsonFile(filePath, data) {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      fs.writeFileSync(filePath, jsonData, 'utf8');
    } catch (error) {
      console.error('Error writing file:', error);
      throw error;
      }
  }
}
