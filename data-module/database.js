import mongoose from "mongoose";

class Database {
  constructor() {
    this._connectionUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/diet-bot?retryWrites=true&w=majority`;
    this.mealTypes = ['breakfast', 'snack', 'lunch', 'dinner'];
    this.connect(); // auto-connect on creating instance
  }

  initModels() {
    const mealSchema = new mongoose.Schema({
      name: String,
      type: Array,
      ingredients: Array,
      cooking: Array,
    });
    this.mealModel = mongoose.model('Meal', mealSchema);
  }

  connect() {
    mongoose.connect(this._connectionUri)
      .then(() => {
        console.log('Connected to the database');
        this.initModels();
      })
      .catch((error) => {
        console.error('Error connecting to the database: ', error);
      });
  };

  disconnect() {
    mongoose.disconnect()
      .then(() => {
        console.log('Disconnected from the database');
      })
      .catch((error) => {
        console.error('Error disconnecting from the database: ', error);
      })
  };

  getRandomMealByType(mealType) {
    if (!this.mealTypes.includes(mealType)) {
      throw new Error('Select one of the valid meal types: \'breakfast\', \'snack\', \'lunch\', \'dinner\'');
    }

    let mealsByType = [];
    this.mealModel.find({ type: mealType}, (error, result) => {
      if (error) {
        console.error('Error fetching data from the database: ', error)
      } else {
        console.log('All breakfasts in the database:', result)
        mealsByType = result;
      }
    })

    const randomMealNumber = Math.floor(Math.random() * mealsByType.length);
    return mealsByType[randomMealNumber];
  }
}
export default Database;
