// Get welcome messages
const welcomeMessage =
  "Hi! Let me introduce you 'Bity Smarty' – a special bot that can provide a healthy diet and a grocery list for your next shopping.\n\n"
const featureMessage = 'Here is 5 main features of this bot:\n' +
  '1. Save your time: Only 1 hour for cooking per 3 day!\n' +
  '2. No complex equipment. Just a multi cooker to start!\n' +
  '3. Healthy diet with fancy recipes that looks great\n' +
  '4. Most recipes can be easily stored in the fridge or in the freezer\n' +
  '5. I can make it even tastier – It is completely free :)'
const getIntroMessage = (type) => type === 'welcome' ? welcomeMessage : featureMessage;
// TODO: Create user with user ID in database
const setNewUser = async (userId) => {
  try {
    // connect to database
    await connectDB();
    await createNewUser(userName, userId);
    return true;
  } catch (error) {
    throw new Error(`User creation has failed: ${error.message}`);
  }
}
// TODO: Provide a new menu
const getMenu = async(userId) => {
  try {
    const currentMenu = await getCurrentMenu(userId);
    return (!currentMenu ? await setNewMenu() : currentMenu);
  } catch (error) {
    throw new Error(`Menu creation has failed: ${error.message}`);
  }
}

// TODO: Provide a grocery list based on current menu
const getGroceryList = async(userId) => {
  try {
    const currentMenu = await getCurrentMenu(userId);
    if (!currentMenu) {
      return 'You should create a menu first';
    }
    return getGroceryListForMenu(currentMenu);
  } catch (error) {
    throw new Error(`Grocery list creation has failed: ${error.message}`);
  }
}

// TODO: Reset a menu
const resetMenu = async(userId) => {
  try {
    await removeCurrentMenu();
    return await getMenu();
  } catch (error) {
    throw new Error(`Menu reset has failed: ${error.message}`);
  }
}

export {
  getIntroMessage,
  setNewUser,
  getMenu,
  getGroceryList,
  resetMenu,
}
