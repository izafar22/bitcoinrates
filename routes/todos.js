var Model=require('./todo.model.js');
var moment=require('moment');
var Counters=require('./../public/counters.model');

var todosApi = {

    getAll: function(req, res) {
        var pendingTodos=[];
        var overdueTodos=[];

        var allTodos={
            pendingTodos:pendingTodos,
            overdueTodos:overdueTodos
        };
        
        Model.find({},function(err,data){
            if (err || !data) {
                return next(new Error("Error in creation of data"));
            }
            data.forEach(function(task){
               if((new Date(task.dueDate)) > (new Date())){
                   overdueTodos.push(task);
                   console.log("overdue",overdueTodos);
               }
               else{
                   pendingTodos.push(task);
               }
        })
        return  res.status(200).json(allTodos);
    })
    },
    create:function (req, res, next) {
        var query = req.query;
        if (!query) {
            return next(new Error('No data sent to create'));
        }
    
        ['name', 'dueDate', 'priority'].forEach(function (x) {
            if (!query[x]) {
                return next(new Error('Mandatory parameter missing: ' + x));
            }
        });
        var dataToCreate = {
            name: query.name,
            dueDate: query.dueDate,
            priority: query.priority
        };
        
        Model.create(dataToCreate, function (err, resp) {
            if (err || !resp) {
                return next(new Error("Error in creation of data"));
            }
    
            return res.status(200).json(resp);
        });
    },
    update: function(req, res,next) {
        var updateTodo={};
        var body = req.body;
        if(body.priority)
        updateTodo.priority=body.priority;
        if(body.done ===true || body.done === false)
        updateTodo.done=body.done;
        if(body.name)
        updateTodo.name=body.name;
        Model.update({"_id":req.params.id},{$set:updateTodo},function(err,updatedata){
            if(err) return next(new Error("Error in updating"));
            return res.status(200).json(updatedata);
        })
    },

    delete: function(req, res,next) {
       Model.remove({"_id":req.params.id},function(err,obj){
           if(err) return next(new Error("error in deleting data"));
           return res.status(200).json(obj);
       });
    }
};

module.exports = todosApi;
