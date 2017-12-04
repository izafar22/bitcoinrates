var express = require('express');
var router = express.Router();

var todos = require('./todos.js');
/*
 * Routes that can be accessed by any one
 */
router.get('/task', todos.getAll);
router.post('/task/create', todos.create);
router.post('/task/update/:id', todos.update);
router.delete('/task/destroy/:id', todos.delete);

module.exports = router;
