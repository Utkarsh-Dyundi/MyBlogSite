const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose= require("mongoose");
const _ = require("lodash");
const homeStartingContent = "A place to write my personal blogs and all the things i wish to note down";
const aboutContent = "Just a place to share my thoughts.";
const contactContent = "My contact missing"
const app = express();

mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true , useUnifiedTopology: true })

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

const schema={
  title: String,
  content: String
};

const Post= mongoose.model("Post",schema);


app.get("/",function(req,res){
  Post.find({},function(err,posts){
    res.render("home", {homeMsg: homeStartingContent , blogs:posts});
  });

});

app.get("/about",function(req,res){
  res.render("about",{aboutMsg: aboutContent});
});


app.get("/contact",function(req,res){
  res.render("contact",{contactMsg: contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});


app.post("/compose",function(req,res){
  const post=new Post({
    title: req.body.blogTitle,
    content: req.body.blog
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
      blog: post.content
    });
  });

});



app.listen(3000, function() {
  console.log("Server started on port 3000");
});

