const express = require("express");
const app = express();
const fs = require("fs");
const ejs = require("ejs");

app.use(express.static("static"));

let menbers = []
let menbers_number = 0;

app.get("/first", (request, response) => {
  const template = fs.readFileSync("static/first.html", "utf-8");
  const html = ejs.render(template);
  response.send(html);
});

app.get("/menbers_number", (request, response) => {
  menbers_number = menbers.length + 1;
  response.send(String(menbers_number));
});

app.get("/register", (request, response) => {
  const name = request.query.name;
  menbers.push({name: name, id: String(menbers_number), statas: "attendance"});
  const template = fs.readFileSync("static/register.html", "utf-8");
  const html = ejs.render(template, {name:name});
  response.send(html);
});

app.get("/back", (request, response) => {
  menbers_number--;
  menbers.pop();
  const template = fs.readFileSync("static/first.html", "utf-8");
  const html = ejs.render(template);
  response.send(html);
});

app.get("/start", (request, response) => {
  const name = request.query.name;
  const number = String(request.query.number);
  let count = 0;
  for(let i = 0; i < menbers.length; i++){
    if(menbers[i].name === name && menbers[i].id === number){
      const template = fs.readFileSync("static/attendance.html", "utf-8");
      const html = ejs.render(template);
      response.send(html);
    }else{
      count++
    }
  }
  if(count === menbers.length){
    const template = fs.readFileSync("static/index.html", "utf-8");
    const html = ejs.render(template);
    response.send(html);
  }
});

app.get("/menbers", (request, response) => {
  response.json(menbers);
});

app.get("/exit", (request, response) => {
  const name = request.query.name;
  const number = String(request.query.number);
  for(let i = 0; i < menbers.length; i++){
    if(menbers[i].name === name && menbers[i].id === number){
      menbers[i].statas = "absence";
    }
  }
  response.send(menbers);
});

app.get("/attend", (request, response) => {
  const name = request.query.name;
  const number = String(request.query.number);
  for(let i = 0; i < menbers.length; i++){
    if(menbers[i].name === name && menbers[i].id === number){
      menbers[i].statas = "attendance";
    }
  }
  response.send(menbers);
});

app.listen(3000);