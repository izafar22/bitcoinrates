'use strict';

angular.module('todoApp')
.controller('todoCtrl', function($scope, todoService) {
     $scope.status=false;
     $scope.overdueTodos=[];
     $scope.pendingTodos=[];
            function loadTodos() {
                todoService
                    .getAll()
                    .then(function(response) {
                        console.log("data",response);
                        $scope.overdueTodos = response.overdueTodos;
                        $scope.pendingTodos=response.pendingTodos;
                       console.log("--------",$scope.overdueTodos); 
                        console.log("+++++",$scope.pendingTodos);
                    });
            }
    
            loadTodos();
    
            $scope.addTodo = function() {
                todoService
                    .add($scope.newTodo)
                    .then(function(response) {
                        loadTodos();
                    });
            };

            $scope.editTodo = function(todo) {
                console.log(todo);
                $scope.todoToEdit = angular.copy(todo);
                console.log("edit",$scope.todoToEdit.priority);
            };
    
            $scope.updateTodo = function() {
            console.log("data edited",$scope.todoToEdit);
                todoService
                    .update($scope.todoToEdit)
                    .then(function(response) {
                        console.log('response after update call ', response);
                        loadTodos();
                    });
            };
    
            $scope.deleteTodo = function(todo) {
                todoService
                    .delete(todo)
                    .then(function(response) {
                        console.log('response after delete call ', response);
                        loadTodos();
                    });
            };

            $scope.sortBy=function(order){
                console.log("i ma");
                if($scope.ordersort == order){
                    $scope.ordersort='-' + $scope.ordersort;
                    console.log($scope.ordersort);
                }
                else if ($scope.ordersort==('-'+order)){
                    $scope.ordersort=order;
                    console.log($scope.ordersort);
                }
                else{
                $scope.ordersort=order;
                }
            };
    
        })