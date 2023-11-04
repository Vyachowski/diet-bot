// Breakfasts
const peanutOvernightOatsBreakfast = {
  name: "Peanut Butter & Jelly Overnight Oats",
  course: ["breakfast"],
  ingredients: [
    ["rolled oats", 50],
    ["milk", 100],
    ["greek yogurt", 50],
    ["cha seeds", 5],
    ["date syrup", 15],
    ["vanilla extract", 3], // End of basic ingredients
    ["strawberry jam", 15],
    ["creamy peanut butter", 15],
    ["strawberry", 50],
    ["peanuts", 40],
  ],
  recipe: [
    "Combine old fashioned oats, seeds, yoghurt and vanilla extract, sweetener and milk (it is convenient to make it in a glass) with all basic ingredients",
    "Cover it with a lid and chill in the fridge for at least two hours (better overnight)",
    "Grab a spoon, add you toppings and dig in!",
  ],
  cookingTimeInMinutes: 10,
  nutrients: {
    calories: 378,
    carbohydrates: 54,
    protein: 17,
    fat: 11,
    sodium: 0.08,
  },
  storageTimeInHours: 120,
};

const appleOvernightOatsBreakfast = {
  name: "Apple pie Overnight Oats",
  course: ["breakfast"],
  ingredients: [
    ["rolled oats", 50],
    ["milk", 100],
    ["greek yogurt", 50],
    ["cha seeds", 5],
    ["date syrup", 15],
    ["vanilla extract", 3], // End of basic ingredients
    ["apple", 100],
    ["pecan", 20],
    ["maple syrup", 40],
    ["cinnamon", 5],
  ],
  recipe: [
    "Combine old fashioned oats, seeds, yoghurt and vanilla extract, sweetener and milk (it is convenient to make it in a glass) with all basic ingredients",
    "Cover it with a lid and chill in the fridge for at least two hours (better overnight)",
    "Grab a spoon, add you toppings and dig in!",
  ],
  cookingTimeInMinutes: 10,
  nutrients: {
    calories: 378,
    carbohydrates: 54,
    protein: 17,
    fat: 11,
    sodium: 0.08,
  },
  storageTimeInHours: 120,
};

const bananaOvernightOatsBreakfast = {
  name: "Banana & Nutella Overnight Oats",
  course: ["breakfast"],
  ingredients: [
    ["rolled oats", 50],
    ["milk", 100],
    ["greek yogurt", 50],
    ["cha seeds", 5],
    ["date syrup", 15],
    ["vanilla extract", 3], // End of basic ingredients
    ["banana", 60],
    ["nutella", 20],
    ["hazelnuts", 20],
    ["chocolate", 20],
  ],
  cookingTimeInMinutes: 10,
  nutrients: {
    calories: 378,
    carbohydrates: 54,
    protein: 17,
    fat: 11,
    sodium: 0.08,
  },
  recipe: [
    "Combine old fashioned oats, seeds, yoghurt and vanilla extract, sweetener and milk (it is convenient to make it in a glass) with all basic ingredients",
    "Cover it with a lid and chill in the fridge for at least two hours (better overnight)",
    "Grab a spoon, add you toppings and dig in!",
  ],
  storageTimeInHours: 120,
};

// Snacks
const bambaSnack = {
  name: "Bamba",
  course: ["snack"],
  ingredients: [["bamba", 80]],
  nutrients: {
    calories: 427,
    carbohydrates: 39.2,
    protein: 13.6,
    fat: 24,
    sodium: 0.03,
  },
  cookingTimeInMinutes: 0,
  recipe: [],
  storageTimeInHours: 1200,
};

const peanutsSnack = {
  name: "Fried Peanuts",
  course: ["snack"],
  ingredients: [["peanuts", 44]],
  nutrients: {
    calories: 237,
    carbohydrates: 7.1,
    protein: 9.7,
    fat: 21,
    sodium: 0.04,
  },
  cookingTimeInMinutes: 0,
  recipe: [],
  storageTimeInHours: 1200,
};

// Lunch
const chickenSaladLunch = {
  name: "Light Chicken Salad",
  course: ["lunch"],
  ingredients: [
    ["cooked chicken breast", 200],
    ["mixed greens (spinach, lettuce, arugula)", 150],
    ["cherry tomatoes, halved", 100],
    ["cucumber, sliced", 80],
    ["red onion, thinly sliced", 50],
    ["olive oil", 15],
    ["lemon juice", 10],
    ["salt and pepper, to taste"],
  ],
  cookingTimeInMinutes: 15,
  nutrients: {
    calories: 320,
    carbohydrates: 10,
    protein: 35,
    fat: 15,
    sodium: 0.2,
  },
  recipe: [
    "In a large bowl, combine cooked chicken breast, mixed greens, cherry tomatoes, cucumber, and red onion.",
    "Drizzle olive oil and lemon juice over the salad. Season with salt and pepper according to your taste.",
    "Toss the salad gently to combine all the ingredients. Serve immediately or refrigerate for later use.",
  ],
  storageTimeInHours: 48,
};

const chickenAvocadoToastLunch = {
  name: "Chicken Avocado Toast",
  course: ["lunch"],
  ingredients: [
    ["cooked chicken breast, shredded", 150],
    ["avocado, mashed", 1],
    ["whole grain bread slices", 2],
    ["cherry tomatoes, sliced", 50],
    ["fresh basil leaves", 10],
    ["olive oil", 10],
    ["salt and pepper, to taste"],
  ],
  cookingTimeInMinutes: 15,
  nutrients: {
    calories: 380,
    carbohydrates: 25,
    protein: 30,
    fat: 18,
    sodium: 0.3,
  },
  recipe: [
    "Toast the whole grain bread slices until they are crispy and golden brown.",
    "Spread mashed avocado evenly on the toasted bread slices.",
    "Top with shredded chicken, sliced cherry tomatoes, and fresh basil leaves.",
    "Drizzle with olive oil and season with salt and pepper according to your taste.",
    "Serve immediately or refrigerate for later consumption.",
  ],
  storageTimeInHours: 24,
};

// Afternoon snack
const lemonPossetAfternoonSnack = {
  name: "Lemon Posset",
  course: ["afternoonSnack"],
  ingredients: [
    ["lemon", 1],
    ["sugar", 50],
    ["heavy cream (33%)", 200],
  ],
  nutrients: {
    calories: 215.8,
    carbohydrates: 15,
    protein: 1.6,
    fat: 16.7,
  },
  recipe: [
    "For this dessert, you'll need lemons. More specifically, lemon juice. One lemon should yield about 70ml of juice.",
    "You'll also need heavy cream and sugar. The higher the quality and fat content of the cream (I used 33%), the thicker your posset will be.",
    "Pour the cream into a saucepan, add sugar, bring to a boil, and keep it on the heat for 3 minutes, stirring continuously.",
    "Now turn off the heat, pour in the lemon juice, vigorously stirring the mixture. The cream will start to thicken. Taste it, and if necessary, add more lemon juice or sugar. The posset should be sweet, creamy, with a distinct lemon flavor.",
    "Let the mixture cool for about 5 minutes, then chill for at least 3-5 hours, preferably overnight. If you plan to serve it as a standalone dessert, divide it into individual molds, cover with plastic wrap, and refrigerate. Serve with crispy cookies or wafers. If serving as ice cream, freeze it.",
    "Posset is also used as a filling for cakes; in that case, chill it in the refrigerator for several hours.",
  ],
  storageTimeInHours: 78,
};

// Dinner
const grilledSalmonDinner = {
  name: "Grilled Salmon with Vegetables",
  course: ["dinner"],
  ingredients: [
    ["salmon fillet", 150],
    ["asparagus spears", 100],
    ["bell peppers (assorted colors), sliced", 150],
    ["zucchini, sliced", 100],
    ["olive oil", 15],
    ["garlic powder", 5],
    ["lemon zest", 5],
    ["salt", 2],
    ["pepper", 2]
  ],
  cookingTimeInMinutes: 20,
  nutrients: {
    calories: 380,
    carbohydrates: 12,
    protein: 35,
    fat: 22,
    sodium: 0.2,
  },
  recipe: [
    "Preheat the grill to medium-high heat. Season salmon fillet with garlic powder, lemon zest, salt, and pepper.",
    "In a bowl, toss asparagus, bell peppers, and zucchini with olive oil, salt, and pepper.",
    "Grill salmon fillet for 4-5 minutes per side, or until it flakes easily with a fork. At the same time, grill the vegetables until tender and slightly charred, about 3-4 minutes per side.",
    "Remove salmon and vegetables from the grill. Serve hot with a side of your choice or refrigerate for later consumption.",
  ],
  storageTimeInHours: 48,
};

const panFriedCodDinner = {
  name: "Pan-Fried Cod with Lemon Sauce",
  course: ["dinner"],
  ingredients: [
    ["cod fillet", 200],
    ["all-purpose flour", 50],
    ["olive oil", 15],
    ["garlic cloves, minced", 2],
    ["chicken or vegetable broth", 150],
    ["lemon juice", 30],
    ["fresh parsley, chopped", 10],
    ["salt and pepper, to taste"],
  ],
  cookingTimeInMinutes: 20,
  nutrients: {
    calories: 320,
    carbohydrates: 10,
    protein: 35,
    fat: 15,
    sodium: 0.5,
  },
  recipe: [
    "Season the cod fillet with salt and pepper. Dredge it in flour, shaking off excess.",
    "Heat olive oil in a skillet over medium-high heat. Add the cod fillet and cook for 3-4 minutes per side, or until golden brown and cooked through. Remove from the skillet and set aside.",
    "In the same skillet, add minced garlic and cook until fragrant. Pour in the broth and lemon juice. Bring to a simmer and let it cook for 2-3 minutes, until the sauce thickens slightly.",
    "Return the cod fillet to the skillet. Spoon the lemon sauce over the fish. Garnish with chopped parsley.",
    "Serve hot with your favorite side dishes, or refrigerate for later consumption.",
  ],
  storageTimeInHours: 48,
};

const tunaPastaDinner = {
  name: "Tuna Pasta with Tomato Sauce",
  course: ["dinner"],
  ingredients: [
    ["canned tuna in water, drained", 200],
    ["spaghetti or your favorite pasta", 150],
    ["olive oil", 15],
    ["garlic clove, minced", 1],
    ["canned crushed tomatoes", 200],
    ["dried basil", 3],
    ["dried oregano", 3],
    ["red pepper flakes, optional", 2],
    ["salt and black pepper", 2],
    ["fresh parsley, chopped (for garnish)", 30],
    ["grated Parmesan cheese (optional, for serving)", 30],
  ],
  cookingTimeInMinutes: 20,
  nutrients: {
    calories: 380,
    carbohydrates: 50,
    protein: 25,
    fat: 10,
    sodium: 1,
  },
  recipe: [
    "Cook the pasta according to the package instructions. Drain and set aside.",
    "In a large skillet, heat olive oil over medium heat. Add minced garlic and sauté until fragrant.",
    "Add canned crushed tomatoes, dried basil, dried oregano, red pepper flakes (if using), salt, and black pepper. Simmer the sauce for 10-12 minutes, stirring occasionally.",
    "Add the drained canned tuna to the tomato sauce. Stir gently to combine and let it simmer for an additional 2-3 minutes until the tuna is heated through.",
    "Toss the cooked pasta in the skillet with the tuna and tomato sauce until well coated.",
    "Serve hot, garnished with chopped fresh parsley and grated Parmesan cheese if desired.",
  ],
  storageTimeInHours: 48,
};

// Export menu
const basicDishesList = [
  peanutOvernightOatsBreakfast,
  appleOvernightOatsBreakfast,
  bananaOvernightOatsBreakfast,
  bambaSnack,
  peanutsSnack,
  lemonPossetAfternoonSnack,
  chickenSaladLunch,
  grilledSalmonDinner,
  chickenAvocadoToastLunch,
  panFriedCodDinner,
  tunaPastaDinner,
];

export default basicDishesList;
