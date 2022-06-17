const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const https = require('node:https');
const { response } = require('express');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.listen(process.env.PORT || 3200)

app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/signup.html')
});

app.post('/', (req, res)=>{
  const firstName = req.body.Fname
  const lastName = req.body.Lname
  const email = req.body.email
  console.log(firstName, lastName, email)

  const data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us18.api.mailchimp.com/3.0/lists/8cf4dd8eea";

  const options = {
    method: "POST",
    auth: "Mohammad:9f53fb4a251f4e91ee8bf5bc78ae2c42-us18"
  }

  const request = https.request(url, options, (response)=>{

    if(response.statusCode == 200){
      res.sendFile(__dirname + '/success.html')
    }else{
      res.sendFile(__dirname + '/failure.html')
    }

    response.on("data", (data)=>{
      console.log(JSON.parse(data))
    })
  });

  request.write(jsonData);
  request.end();

});

app.post('/failure', (req, res)=>{
  res.redirect('/')
})

app.post('/success', (req, res)=>{
  res.redirect('/')
})


// 9f53fb4a251f4e91ee8bf5bc78ae2c42-us18
// 8cf4dd8eea