//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/JournalDB");

const JournalSchema = {
  title: String,
  description: String
}

const Journal = mongoose.model("Journal", JournalSchema);


// let AllPosts = [];
const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";

const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";

const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));


app.get("/", function(req, res) {
  res.render("home", {
    HOMESTARTINGCONTENT: homeStartingContent,
    POSTS: Journal
  });
});

app.get("/home", function(req, res) {

  Journal.find({}, function(err, allJournals){
    if(!err){
      res.render("home", {
        HOMESTARTINGCONTENT: homeStartingContent,
        POSTS: allJournals
      });
    }
  })

  // console.log(req.params.topic);
});

app.get("/about", function(req, res) {
  res.render("about", {
    ABOUTCONTENT: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    CONTACT: contactContent
  });
});

// app.get("/AllPosts/:postName", function(req, res) {
//   const requestedName = req.params.postName;
//   // AllPosts.forEach(function(post) {
//   //   const storeTitle = post.title;
//
//     let storeTitle = [];
//     let storeDescription = [];
//     for(var i = 0; i < AllPosts.length ; i++){
//       storeTitle[i] = AllPosts[i].title;
//       storeDescription[i] = AllPosts[i].description;
//     }
//
//     for(let j = 0; j < AllPosts.length ; j++){
//       if(storeTitle[j] === _.lowerCase(requestedName)){
//         res.render("post", {TITLE:storeTitle[j], DESCRIPTION:storeDescription[j]});
//       }else console.log(storeTitle[j]);
//     }
//     // if (storeTitle === requestedName){
//     //   console.log("Match Found");
//     // }
//     // else {console.log("no");}
// });

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const inputTitle = req.body.title;
  const descriptionInput = req.body.txtAreaPost;

  if (inputTitle == "" && descriptionInput == "") {
    console.log("Please input Title and Description");
  } else {
    const PostJournal = new Journal({
      title: inputTitle,
      description: descriptionInput
    })
    PostJournal.save();
    res.redirect('home');
  }


  // var post = {
  //   title: req.body.title,
  //   description: req.body.txtAreaPost,
  // }
  // AllPosts.push(post);

  // AllPosts.forEach(function(Apost) {
  //   console.log(Apost);
  // });


});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
