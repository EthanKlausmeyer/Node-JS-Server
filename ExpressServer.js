const fs = require("fs");
const express = require("express");
const app = express();
const { promises: Fs } = require('fs');
const path = require("path");
//const cors = require("cors");
const PORT = process.env.PORT || 3000;
const logEvents = require("./middleware/logEvents");
const errorHandler = require("./middleware/errorHandler");
var dir = path.join(__dirname, 'public');

async function exists (path) {  
    try {
      await Fs.access(path)
      console.log(path + " exists");
    } catch {
      console.log(path + " does not exist");
    }
    return;
}
  
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "/public")));


exists("./public/images/hears.jpg");
app.get('/velma|/hears(.jpg)?', (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "images/hears.jpg"));
});

exists("./public/images/fishbed.jpg");
app.get('/personaguy|/fishbed(.jpg)?', (req,res)=>{
    res.sendFile(path.join(__dirname, "public", "images/fishbed.jpg"));
});

app.get('^/$|/index(.html)?', (req,res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req,res)=>{
    res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req,res)=>{
    res.redirect(301, "/new-page.html");
});

app.get("/hello(.html)?", (req,res,next)=>{
    console.log("Attempted to server hello.html");
    next();
}, (req,res)=>{
    res.send("Hello World!");
});

const one = function (req,res,next){
    console.log("One");
    next();
};

const two = function(req,res,next){
    console.log("Two");
    next();
};

const three = function(req,res){
    console.log("Three")
    res.send("Hello from Three!");
}


app.get("/chain(.html)?", [one,two,three]);

app.all("*", (req,res)=>{
    res.status(404);
    if(req.accepts("html")){
        res.sendFile(path.join(__dirname, "views", "404.html"));
    } else if(req.accepts("json")){
        res.json({error: "404 not found"});
    }else{
        res.type("txt").send("404 not found");
    }
});

app.use(errorHandler);


app.listen(PORT, ()=>console.log(`Server is listening on port ${PORT}`));
