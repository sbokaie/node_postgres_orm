var express = require('express'),
  bodyParser = require('body-parser'),
  methodOverride = require('method-override'),
  Person = require('./models/main.js').Person,
  app = express();



app.set("view engine", "ejs");
// Middleware

// bodyParser is used for reading forms
app.use(bodyParser.urlencoded());
// method override overrides post/get 
// methods to allow update/delete
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
  Person.findBy('id', req.params.id, function(err, foundPerson){
    res.render("people/display", { person: foundPerson });
  })
});

app.get("/people/:id/edit", function(req,res){
  Person.findBy("id", req.params.id, function(err, foundPerson){
    res.render("people/edit", {person: foundPerson });
  })
});



app.post("/people", function(req, res){
  Person.create(req.body.person, function (err, newPerson){})
    res.redirect("/people")
});

app.delete("/people/:id", function(req, res){
  Person.findBy("id", req.params.id, function(err, person){
    person.destroy(function (err){
      if(err){
        console.log("Error Deleting Driver!")
      } else {
      console.log("You are getting rid of ")
      console.log(person);
      }
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