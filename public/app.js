'use strict';

var app=angular.module('todoApp',[]);
    
app.config(function($locationProvider){

    $locationProvider.html5Mode(true);
});
