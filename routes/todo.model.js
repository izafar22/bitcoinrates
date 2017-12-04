'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

  var Counter=require('./../public/counters.model');

    var TaskSchema = new Schema({
    name: String,
    id:Number,
    dueDate: Date,
    priority: Number,
    done:{type:Boolean,default:false},
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

function getNextSequence(name,cb) {
    console.log("I am accessible");
    Counter.findAndModify({id: name }, [], { $inc: {seq: 1 } }, {}, function (err, counter) {
        if (err) throw err;
        console.log('updated, counter is ' + counter);
        return cb(null,counter.value.seq);  
    });
 }

TaskSchema.pre('save', function (next) {
   debugger;
    var self = this;
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updatedAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }
    
    console.log("I am here");
    getNextSequence("taskid",function(err,counter){
     if(err) return new Error("Not able to instantiate");
     self.id=counter; 
     console.log("this is id",self.id);
     return next();
    });
});

TaskSchema.pre('update', function (next) {
    // get the current date
    var currentDate = new Date();

    // change the updated_at field to current date
    this.updatedAt = currentDate;

    // if created_at doesn't exist, add to that field
    if (!this.createdAt) {
        this.createdAt = currentDate;
    }

    next();
});

module.exports = mongoose.model('Task', TaskSchema);
