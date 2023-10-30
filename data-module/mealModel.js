import mongoose, {Schema} from "mongoose";

const mealSchema = new Schema({
    name: String,
    type: Array,
    ingredients: Array,
    cooking: Array,
  })

const mealModel = mongoose.model('Meal', mealSchema);

export default mealModel;
