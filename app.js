//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require("lodash");

const homeStartingContent = "University of Waterloo | Computer Science Student 1B";
const projectContent = "Some of my Projects";
const experienceContent = "Some of my experiences";
const resumeContent = "My Resume";

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-tim:Test123@cluster0.hpvwz.mongodb.net/blogDB", {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema)

app.get("/", function(req,res){

  Post.find({}, function(err, posts){
   res.render("home", {
     startingContent: homeStartingContent,
     posts: posts
     });
 })
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
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err){
      res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

// THIS BLOCK OF CODE IS TO REMOVE ANYTHING FROM THE DATABASE
//Post.deleteOne({title: "fesf"}, function(err){
//  if(err){
//    console.log(err);
//  } else{
//    console.log("Succesfully deleted the document")
//  }
//})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port);

app.listen(port, function() {
  console.log("Server started on port 3000");
});
