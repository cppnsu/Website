require("dotenv").config();
const express = require("express");

const app = express();
const baseURL = "https://data.mongodb-api.com/app/data-ehoml/endpoint/data/v1";
var axios = require('axios');

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
            
// Creating the base object to make the request using the mongodb data API
let config = {
    method: 'POST',
    url: baseURL + "/action/findOne",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': process.env.MONGO_API_KEY,
    },
    data: {
    "collection": "Development",
    "database": "NSU-Website",
    "dataSource": "websiteData",
    "filter" : {
        Name: "All"
    },
}
};
 
app.get("/", async(req, res) => {
    axios(config)
    .then(function (response) {
        res.json((response.data));
    })
    .catch(function (error) {
        console.log(error);
    }); 
})
            
app.listen(3000, () => console.log("Server is up"));