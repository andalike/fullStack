var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var password='';
var mongoURL = 'mongodb+srv://user1:'+ password +'@cluster0.mddpe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

var conn = mongoose.createConnection(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, connect) {
  if (err) {
    console.log("Mongodb not Connected In UserLogin")
  } else {
    console.log("Mongodb Connected In UserLogin")
  }
});

var UserLoginSchema = new Schema({
    id: String,
    pwd: String
});

module.exports =  conn.model('UserLogin',UserLoginSchema);