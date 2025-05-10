const mongoose = require("mongoose")

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

mongoose.connect(url)
  .then(result => {
    console.log("MongoDB connection established")
  })
  .catch(error => {
    console.log("Error connecting to MongoDB:", error.message)
  })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

module.exports = mongoose.model("Person", personSchema)
