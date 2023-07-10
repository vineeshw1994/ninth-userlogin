const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/logintutorial').then(()=>{
    console.log('mongodb connected');
}).catch(()=>{
    console.log('connection faild');
})

const loginschema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    role:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})

const collection = new mongoose.model('user',loginschema)

module.exports = collection;