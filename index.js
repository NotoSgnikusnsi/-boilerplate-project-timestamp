// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date_string", function (req, res) {
  const timeData = req.params.date_string;
  if(/^\d{5,}/.test(timeData)){
    const numberDate = Number(timeData);
    res.json({
      unix: numberDate,
      utc: new Date(numberDate).toUTCString()
    });
  }else{
    const dateData = new Date(timeData);
    
    if(dateData == "Invalid Date"){
      res.json({
        error: "Invalid Date"
      });
    }else if(/^\d{4}-\d\d-\d\d/.test(timeData)){
      res.json({
        unix: Number(dateData),
        utc: dateData.toUTCString()
      });
    }
  }
});

app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
