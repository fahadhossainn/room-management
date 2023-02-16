const mongoose = require('mongoose');


const roomSchema = new mongoose.Schema({

    room : {
      type : Number,
      unique : true,
      required : ['true' , 'A room must have a Number']
    } , 
    price : {
      type : Number,
      required : ['true' , 'A room must have a Price']
    },
    category : {
      type : String,
      enum : ['single' , 'double', 'triple', 'quad'],
      required : ['true' , 'A room must be of one of the following type - single , double , triple , quad']
    },
    photo : {
      type : String ,
      default : 'default.jpg'
    } , 
    description : {
      type : String,
      trim : true
    } ,
    booked : {
      type : Boolean,
      default : false
    }
});


const Room =  mongoose.model('Room' , roomSchema);

module.exports = Room;