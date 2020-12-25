//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const homeStartingContent = "University of Waterloo | Computer Science Student 1B";

const projectContent = "Some of my Projects";

const experienceContent = "Some of my experiences";

const resumeContent = "My Resume";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req,res){
  res.render("home", {
    startingContent: homeStartingContent,
    posts: posts
    });
});

app.get("/projects", function(req,res){
  res.render("projects", {projectDisplayContent: projectContent});
});

app.get("/experience", function(req,res){
  res.render("experience", {experiencePageContent: experienceContent});
});

app.get("/resume", function(req,res){
  res.render("resume", {resumePageContent: resumeContent});
});

app.get("/compose", function(req,res){
  res.render("compose");
});


app.post("/compose", function(req,res){
  const post = {
    title:req.body.postTitle,
    content: req.body.postBody
  };

  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);

    if(storedTitle === requestedTitle){
      res.render("post", {
        title: post.title,
        content: post.content
      });
    }
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
