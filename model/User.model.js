const mongoose = require("mongoose");
const userschema = mongoose.Schema({
  name: String,
  email: String,
  gender: String,
  password: String,
  age: Number,
  city: String,
});

const UserModel=mongoose.model("user",userschema)

module.exports={
    UserModel
}
// {
// "name": "vipul",
// "email": "vipul@gmail.com",
// "gender": "male",
// "password": "12345",
// "age": 24,
// "city": "Delhi",

// }