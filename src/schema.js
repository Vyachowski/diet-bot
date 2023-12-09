import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: Number,
      required: true,
    },
    dishesList: {
      type: Array,
      required: true,
    },
    settings: {
      type: Object,
      required: false,
    }
  }
)

const dishSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  course: {
    type: Array,
    required: true,
  },
  ingredients: {
    type: Array,
    required: true,
  },
  recipe: {
    type: Array,
    required: true,
  },
  energy: {
    type: Number,
    required: false,
  },
  nutrients: {
    type: Object,
    required: false,
  },
  storageTimeInHours: {
    type: Number,
    required: false,
  },
});

const currentMenuSchema = new mongoose.Schema({
  breakfast: Object,
  snack: Object,
  lunch: Object,
  afternoonSnack: Object,
  dinner: Object,
});

const ingredientSchema = new mongoose.Schema({
  name: String,
  energy: Number, // calories per 100 gram
  alternateMeasureUnit: Array,
  unitsConversionRate: Number, // in 100 grams 1 cup of rolled oats
  department: String,
});

export {
  userSchema,
  dishSchema,
  currentMenuSchema,
  ingredientSchema,
}
