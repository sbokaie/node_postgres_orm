var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/main.js').Person,
  app = express();



app.set("view engine", "ejs");
// Middleware
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));




app.get("/people", function(req, res){
  Person.all(function(err, allPeople){
   res.render("people/index", { people: allPeople })
  })
});

app.get("/people/new", function(req, res){
  res.render("people/new")
});

app.get("/people/:id", function(req,res){
  var personId = req.params.id;
  Person.findBy('id', personId, function(err, foundPerson){
    res.render("people/display", { person: foundPerson });
  })
});

app.get("/people/:id/edit", function(req,res){
  var personId = req.params.id;
  Person.findBy("id", personId, function(err, foundPerson){
    res.render("people/edit", {person: foundPerson });
  })
});



app.post("/people", function(req, res){
  var newPerson = req.body.person;
  Person.create(newPerson, function (err, newPerson){})
    res.redirect("/people")
});

app.delete("/people/:id", function(req, res){
  var id = req.params.id;
  Person.findBy("id", id, function(err, person){
    person.destroy(function (err){
      console.log("You are getting rid of " + person)
    })
  })
  res.redirect("/people");
});

app.put("/people/:id", function(req,res){
  res.redirect("/people");
})

app.listen(3000, function(){
  console.log("Its Alive!");
});