//jshint esversion: 6
const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const { response } = require("express");

const app = express();
//used to call static in pc paths of files e.g styles.css
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){

    res.sendFile(__dirname + "/SignUp.html")
    

})

app.post("/", function(req,res){
    const firstname = req.body.fname;
    const lastname  = req.body.lname;
    const email = req.body.email;
    // console.log(firstname,lastname,email);
    
const data = {
    // members is object in which mailchimp will take key values as an array
    members:[
        {
            email_address: email,
            status: "subscribed",
            merge_fields:{
                FNAME: firstname,
                LNAME: lastname
            }

        }
    ]
};

const jsonData = JSON.stringify(data);
// this is json we are going to send to mailchimp.
// ready for the next step i.e making a request 


const url = "https://us10.api.mailchimp.com/3.0/lists/0716170840"
const options = {
    method: "POST",
    // a little basic auth we added and check the format i.e followed as told by mailchimp.
    auth: "rashid:70086a9e2778010f30ce284c771f2ea1-us10"
}
const request1 = https.request(url, options, function(response){

    if (response.statusCode==200){
        res.sendFile(__dirname + "/Success.html")
    }
    else
        res.sendFile(__dirname + "/Failure.html")
    

    response.on("data", function(data){
        console.log(JSON.parse(data));


    })


})

request1.write(jsonData);
request1.end();

})

app.post("/failure",function(req,res){
    res.redirect("/")
})





app.listen(process.env.PORT || 3000,function(){
    console.log("Running on port 3001");
})




// 70086a9e2778010f30ce284c771f2ea1-us10 api key mailchimp
// audience id 0716170840