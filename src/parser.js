import fs from "node:fs";

function readJsonFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const jsonObject = JSON.parse(fileContent, (key, value) => {
      const parsedValue = parseFloat(value);
      return !isNaN(parsedValue) ? parsedValue : value;
    });
    return jsonObject;
  } catch (error) {
    console.error('Ошибка чтения файла или преобразования JSON:', error);
    throw error;
    }
}

function writeJsonFile(filePath, data) {
  try {
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf8');
  } catch (error) {
    console.error('Ошибка при записи файла:', error);
    throw error;
    }
}

export {
  readJsonFile,
  writeJsonFile
};
