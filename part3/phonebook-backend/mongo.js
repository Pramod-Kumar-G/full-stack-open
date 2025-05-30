const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Not enough arguments provided')
  process.exit(1)
}
if (process.argv.length !== 3 && process.argv.length !== 5) {
  console.log('Please provide correct number of arguments(3 or 5)')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://pramodg8102002:${password}@fullstackopen.gyqa60t.mongodb.net/phonebook?retryWrites=true&w=majority&appName=fullstackopen`

mongoose.set('strictQuery', false)

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(p => {
      console.log(`${p.name} ${p.number}`)
    })
    mongoose.connection.close()
  })
}


if (process.argv.length === 5) {
  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })
  person.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })
}




