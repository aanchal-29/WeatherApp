//const { response } = require("express");
const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");


const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html")
    
});
app.post("/",function(req,res){
   
   //console.log(req.body.cityName);
   const query=req.body.cityName;
    const apikey="87bfddae2b9eeb4108455fe837ed2bfc";
    const unit="metric";
    const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
    https.get(url,function(response){
        console.log(response.statusCode);
        
    
    response.on("data", function(data){
      
        //console.log(data); 
        const weatherData=JSON.parse(data)//unwrapping the object data
       // console.log(weatherData);
       const temp =weatherData.main.temp;   //stores the value stored under weatherData->main->temp
       console.log(temp);
       const weatherDescription=weatherData.weather[0].description
       const icon=weatherData.weather[0].icon
       const imageURL="https://openweathermap.org/img/wn/"+ icon+"@2x.png"
      
       res.write("<html>"); 
res.write("<head>"); 
res.write("<style>body {  justify-content: center; align-items: center;height: 100vh;margin: 0;color: white;background-image: url('https://source.unsplash.com/1600x900/?landscape');font-size: 120%; }</style>"); 
res.write("<style>.cards {justify-content: center; align-items: center;background: #000000d0;color: white;padding: 2em;border-radius: 30px;width: 100%;max-width: 420px;margin: 1em;}</style>");
res.write("</head>"); 
res.write("<body>");
res.write("<div class='cards'>");
       res.write("<h1> Weather Details of " +weatherData.name +": </h1>") 
       res.write("<p> The weather is currently " + weatherDescription+ "<p>");
       res.write("<h3>The temperature in " +weatherData.name+" is "+temp+"degrees celsius.</h3>")//app route can only send one file at a time therefore we commented the below res.send("Server is up and running")
       res.write("<img src="+ imageURL+">"); 
res.write("</div>");
res.write("</body>"); 
res.write("</html>"); 
//res.end();
       res.send()
     
      // res.send("<h1>The temperature in " +weatherData.name+"is "+temp+"degrees celsius.</h1>")//app route can only send one file at a time therefore we commented the below res.send("Server is up and running")
    //    const object={
    //     name:"Aanchal",
    //     favouriteFood:"Puchka"
    //    }
    //    console.log(JSON.stringify(object));//object in string format    {"name":"Aanchal","favouriteFood":"Puchka"}
    })
})
   // res.send("Server is up and running");
   // console.log("Post request received.");
})

// app.get("/",function(req,res){
//     const query="Siliguri";
//     const apikey="87bfddae2b9eeb4108455fe837ed2bfc";
//     const unit="metric";
//     const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey+"&units="+unit;
//     https.get(url,function(response){
//         console.log(response.statusCode);
    
//     response.on("data", function(data){
//         //console.log(data); 
//         const weatherData=JSON.parse(data)//unwrapping the object data
//        // console.log(weatherData);
//        const temp =weatherData.main.temp;   //stores the value stored under weatherData->main->temp
//        console.log(temp);
//        const weatherDescription=weatherData.weather[0].description
//        const icon=weatherData.weather[0].icon
//        const imageURL="https://openweathermap.org/img/wn/"+ icon+"@2x.png"
//        res.write("<p> The weather is currently " + weatherDescription+ "<p>");
//        res.write("<h1>The temperature in " +weatherData.name+" is "+temp+"degrees celsius.</h1>")//app route can only send one file at a time therefore we commented the below res.send("Server is up and running")
//        res.write("<img src="+ imageURL+">"); 
//        res.send()
//       // res.send("<h1>The temperature in " +weatherData.name+"is "+temp+"degrees celsius.</h1>")//app route can only send one file at a time therefore we commented the below res.send("Server is up and running")
//     //    const object={
//     //     name:"Aanchal",
//     //     favouriteFood:"Puchka"
//     //    }
//     //    console.log(JSON.stringify(object));//object in string format    {"name":"Aanchal","favouriteFood":"Puchka"}
//     })
// })
//    // res.send("Server is up and running");
    
// });



app.listen(3000,function(){
    console.log("Server is running on port 3000.");
}); 