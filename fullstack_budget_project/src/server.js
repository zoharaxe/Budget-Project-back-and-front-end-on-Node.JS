const express = require("express");
const app = express(),
  PORT = 8080;

const routeHelper = require("./incomes_outcomes");

const path = require("path");
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

// --- used for json in body
app.use(express.json());

let incomeIds = 3;
let outComeIds = 3;


const incomes = [
  {description:"a",amount:300, id:1},
  {description:"a",amount:1000, id:1},
  {description:"a",amount:3000, id:1}

];

const outcomes = [
  {description:"a",amount:500, id:1},
  {description:"a",amount:100, id:1},
  {description:"a",amount:1000, id:1}

];


/************* OUTCOMES  *************************/

// update
app.put("/outcomes/:id", (req, res) => {
  routeHelper.handlePut(outcomes, req, res);  
});

// delete
app.delete("/outcomes/:id", (req, res) => {
  routeHelper.handleDelete(outcomes, req, res);  
});

// --- create
app.post("/outcomes", (req, res) => {
  routeHelper.handlePost(outcomes,outComeIds, req, res);  
});

// --- read
app.get("/outcomes", (req, res) => {
  routeHelper.handleGet(outcomes, req, res);
});

/************* INCOMES  ******************************/

// update
app.put("/incomes/:id", (req, res) => {
  routeHelper.handlePut(incomes, req, res);  
});

// delete
app.delete("/incomes/:id", (req, res) => {
  routeHelper.handleDelete(incomes, req, res);  
});

// --- create
app.post("/incomes", (req, res) => {
  routeHelper.handlePost(incomes,incomeIds, req, res);  
});

// --- read
app.get("/incomes", (req, res) => {
  routeHelper.handleGet(incomes, req, res);  
});

app.get("*", (req, res) => {
  res.send("<h1>404</h1><h2> The requested URL was not found on this server</h2>"
    );
});


app.listen(PORT, () => {
  console.log(`listening on port : ${PORT}`);
});