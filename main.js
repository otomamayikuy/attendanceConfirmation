const express = require("express");
const app = express();
const fs = require("fs");
const ejs = require("ejs");

app.use(express.static("static"));

let menbers = []
let menbers_number = 0;

//初めての方はこちら
app.get("/first", (request, response) => {
  const template = fs.readFileSync("static/first.html", "utf-8");
  const html = ejs.render(template);
  response.send(html);
});

//メンバーの人数を返す
app.get("/menbers_number", (request, response) => {
  menbers_number = menbers.length + 1;
  response.send(String(menbers_number));
});

//名前とIDを登録する
app.get("/register", (request, response) => {
  const name = request.query.name;
  menbers.push({name: name, id: String(menbers_number), statas: "absence"});
  const template = fs.readFileSync("static/register.html", "utf-8");
  const html = ejs.render(template, {name:name});
  response.send(html);
});

//登録をやり直す
app.get("/back", (request, response) => {
  menbers_number--;
  menbers.pop();
  const template = fs.readFileSync("static/first.html", "utf-8");
  const html = ejs.render(template);
  response.send(html);
});

//ログインして始める
app.get("/start", (request, response) => {
  const name = request.query.name;
  const number = String(request.query.number);
  let count = 0;
  for(let i = 0; i < menbers.length; i++){
    if(menbers[i].name === name && menbers[i].id === number){
      menbers[i].statas = "attendance";
      const template = fs.readFileSync("static/attendance.html", "utf-8");
      const html = ejs.render(template, {name: name, id: number});
      response.send(html);
    }else{
      count++
    }
  }
  if(count === menbers.length){
    const template = fs.readFileSync("static/home.html", "utf-8");
    const html = ejs.render(template);
    response.send(html);
  }
});

//メンバーの情報を返す
app.get("/menbers", (request, response) => {
  response.json(menbers);
});

//退出する
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

//出席にする
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

//ログアウトする
app.get("/home", (request,response) => {
  const template = fs.readFileSync("static/home.html", "utf-8");
  const html = ejs.render(template);
  response.send(html);
});

//編集する
app.get("/edit_name", (request, response) => {
  const new_name = request.query.new_name;
  const name = request.query.name;
  const number = String(request.query.number);
  for(let i = 0; i < menbers.length; i++){
    if(menbers[i].name === name && menbers[i].id === number){
      menbers[i].name = new_name;
    }
  }
  response.send(number)
});

//保存する
app.get("/save", (request, response) => {
  const name = request.query.name;
  const number = String(request.query.number);
  response.json({name: name, id: number});
});


app.listen(3000);