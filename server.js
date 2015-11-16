var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000; 
//some built in Todos
var todos = [];
var todoNextId = 1; //this variable will be used to increment our ID so when we add new ones they get their own ID (note this isn't secure)

app.use(bodyParser.json()); // this is setting up some App Level Middle Ware - Now everytime a json request comes in, express will parse it and we'll be able to access it via req.body


app.get('/', function (req, res) {
    res.send('ToDo Api Root');
});

//_____________________________________________GET METHODS _____________________________________________


app.get('/todos', function (req, res) {
    res.json(todos); //at this url, it sends back our todos array, and makes it json
});

app.get('/todos/:id', function (req, res) {
    var todoId = parseInt(req.params.id, 10); //req.params always comes back as a string, so if you're expecting a number, you have to convert
    
    var matchedTodo = _.findWhere(todos, {id: todoId}); //underscore code that finds where it is 
    
    if(matchedTodo) {
        res.json(matchedTodo); //this Json method is a handy shortcut that makes it easy for you to send back json data
    } else {
        res.status(404).send(); //this is the standard way to send back 
    }
    
});



//_____________________________________________POST METHODS _____________________________________________


app.post('/todos', function(req, res) {
    var body = _.pick(req.body, 'description', 'completed'); //this gets the body of the post request (as opposed to the header) & //THIS IS GOING TO LEAVE OFF ALL EXTRA DATA

    
    
    //NOW WE'RE GOING TO CHECK TO MAKE SURE WHAT THE USER POSTED HAS THE PROPER KEY/VALUE PAIRS
    
    if(!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) { //this is checking to see if the value of the body.completed is a boolean
        return res.status(400).send(); //400 means it can't be completed. this returns the status and an empty body send();
    }
    
    body.description = body.description.trim();
    
    body.id = todoNextId;
    todoNextId++;
    
    todos.push(body);

    res.json(body); //this regurgitates the info back to the person that posted it
});

//_____________________________________________DELETE METHODS _____________________________________________

app.delete('/todos/:id', function(req, res) {
    var todoId = parseInt(req.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoId});
    
    
    console.log("this is matched todo", matchedTodo);
    if(!matchedTodo) {
        res.status(404).json({"error": "no todo found with that Id"});
    } else {
        todos = _.without(todos, matchedTodo); 
        res.json(matchedTodo);
    }
    
    
});


//_____________________________________________LISTENING ON PORT _____________________________________________
app.listen(PORT, function () {
    console.log('Express Listening on port' + PORT);
});