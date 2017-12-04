'use stirct';
var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var counterSchema=new Schema({
    id:String,
    seq:Number
});

counterSchema.statics.findAndModify = function (query, sort, doc, options, callback) {
    console.log("I am here counterschema");
    return this.collection.findAndModify(query, sort, doc, options, callback);
  };


module.exports = mongoose.model('counter', counterSchema);


  