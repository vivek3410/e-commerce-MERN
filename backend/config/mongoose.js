const { default: mongoose } = require("mongoose");
const config = require("./env-variables");

const mongo_url = config.MONGO_URI
mongoose.connect(mongo_url).then(() => {
    console.log("Connected to mongodb");
}).catch((e) => {
    console.log("Error in db: ", e);
})