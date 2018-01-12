var express=require("express");
var bodyParser=require("body-parser");
var path=require("path");
var app=express();
var port=8080;


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))



// data
    var characters=[
      {
      routename:"yoda",
      name:"Yoda",
      role:"jedi Master",
      age:90,
      forcepoints:2000
    },
      {
    routename:"darthmaul",
    name:"darthmaul",
    role:"Lord",
    age:60,
    forcepoints:1500
  },
  {
    routename:"obiwan",
    name:"obiwan",
    role:"jedi knight",
    age:80,
    forcepoints:1800
  }
  ];

// routes
app.get("/", function(req, res){
  res.sendFile(path.join(__dirname, "view.html"));
});

app.get("/add", function(req, res){
  res.sendFile(path.join(__dirname, "add.html"));
})
app.get("/api/:characters?", function(req, res){
  var chosen=req.params.characters;
  if(chosen){
console.log(chosen);
for (var i=0; i<characters.length; i++){
  if(chosen===characters[i].routename){
  res.json(characters[i]);
  return;

  }
}
res.send("No character found!");
}else{
  res.json(characters);
}
});

app.post("/api/new", function(req, res){
  var newcharacter=req.body;
  newcharacter.routename=newcharacter.name.replace(/\s+/g, "").toLowerCase();

  console.log(newcharacter);

  characters.push(newcharacter);

  res.json(newcharacter);
});

app.listen(port, function(){
  console.log("App is listening 8080");
});
