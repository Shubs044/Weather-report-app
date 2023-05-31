const express=require("express");
const https = require('node:https');
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
    const query=req.body.cityname;
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=4cc25596751fb1539c7086e608a2d4a6&units=metric";
    https.get(url, function(response){
        // console.log(response); give all details extracted from api weather map
        response.on("data",function(data){
            const weatherData=JSON.parse(data);
            const temp=weatherData.main.temp;
            const dicript=weatherData.weather[0].description;
            
            res.write("<h1>Current temprature of "+query+ " is " +temp+ " Celsius</h1>");
            res.write("<h3>The weather is currently "+dicript+"</h3>");
            const icon=weatherData.weather[0].icon
            const iconurl="https://openweathermap.org/img/wn/" + icon +"@2x.png";
            res.write("<img src="+iconurl+">");
            res.send();
        });
    });
});


app.listen(3000);