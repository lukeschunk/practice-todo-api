var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{

        id: 1, //databases will add this attribute
        description: 'Meet Mom For Lunch',
        completed: false
        },

    {
        id: 2,
        description: 'go to market',
        completed: false
        },
    {
        id: 3,
        description: 'pick up paige',
        completed: true
            }];

app.get('/', function (req, res) {
    res.send('ToDo Api Root');
});

//GET /TODOS
app.get('/todos', function (req, res) {
    res.json(todos);
});

app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10); //req.params always comes back as a string, so if you're expecting a number, you have to convert
    var matchedTodo;
    
    todos.forEach(function(todo) { //todo is one of the [i]'s in todos
        if(todoId === todo.id) {
            matchedTodo = todo;
        } 
    });
    
    if(matchedTodo) {
        res.json(matchedTodo); //this Json method is a handy shortcut that makes it easy for you to send back json data
    } else {
        res.status(404).send(); //this is the standard way to send back 
    }
    
});



app.listen(PORT, function () {
    console.log('Express Listening on port' + PORT);
});