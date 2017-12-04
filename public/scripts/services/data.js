'use strict';

angular.module('todoApp')
.service('todoService', function($http,$httpParamSerializer) {
    var url = 'http://localhost:3000/task';

    this.getAll = function() {
        return $http.get(url)
        .then(function(res){
        return res.data;
        })
        .catch(function(err){
        throw err;
        });
    };

    this.add = function(data) {
        var path=url + '/create';
        var queryParam = "";
        if(data)
          queryParam = $httpParamSerializer(data);
        if(queryParam)
          path  = path + "?" + queryParam;
        console.log("todo",data);
        return $http.post(path);
    };

    this.update = function(todo) {
        return $http.post(url +'/update/' + todo._id, todo);
    };

    this.delete = function (todo) {
        return $http.delete(url +'/destroy/'+ todo._id);
    };
});