var express = require('express');

let url = require('url');
let session = require('cookie-session');
let bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false});

var app = express();

app.use(session({secret: 'todosecret'}))


.use((req, res, next) => { // Si pas de todos dans la session, création d'un tableau vide pour la session
   if  (typeof(req.session.todolist) == 'undefined') {
      req.session.todolist = [];
   }
   next();
})


app.get('/todos', (req, res) => {
   
   res.setHeader('Content-Type', 'text/html');

   res.render('todo.ejs', {todolist : req.session.todolist});

});

app.post('/todos/add', urlencodedParser, (req, res) => {
      if(req.body.newtodo != '') {
         req.session.todolist.push(req.body.newtodo)
      }
   
      res.redirect('/todos')

}) ;


app.get('/todos/delete/:id', (req, res) => {
   if (req.params.id != '') {
      req.session.todolist.splice(req.params.id, 1);
   }

   res.redirect('/todos')

}) 



app.listen(8080);