import mongoose from "mongoose";

function connectToMongoDb() {
  mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/diet-bot?retryWrites=true&w=majority`)
    .then(() => console.log('Connected successfully.'));
}
function disconnectFromMongoDb() {
  mongoose.disconnect().then(() => console.log('Disconnected successfully.'))
}

export {
  connectToMongoDb,
  disconnectFromMongoDb
}
