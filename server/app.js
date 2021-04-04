var http = require('http');
const express = require("express");
const app = express();
const mysql = require("mysql");
const endPointRoot = "/Comp4537/termproject/API/V1";
const port = process.env.PORT || 8888;
const dbPass = "CqVQzWZcaqNM";
const sqlBakery = "SELECT * FROM `Bakery` Order BY bakeryName ASC";
const sqlEmployees = "SELECT * FROM `Employees` Order BY lastName ASC";
const sqlDessert = "SELECT * FROM `Dessert` Order BY dessertName ASC";
const sqlStats = "SELECT * FROM `Stats` Order BY Endpoint ASC";
const GET_stat_increment_root = "UPDATE `Stats` SET GET_stat = GET_stat + 1 WHERE Endpoint = '" + endPointRoot + "'";
const POST_stat_increment_root = "UPDATE `Stats` SET POST_stat = POST_stat + 1 WHERE Endpoint = '" + endPointRoot + "'";
const PUT_stat_increment_root = "UPDATE `Stats` SET PUT_stat = PUT_stat + 1 WHERE Endpoint = '" + endPointRoot + "'";
const DELETE_stat_increment_root = "UPDATE `Stats` SET DELETE_stat = DELETE_stat + 1 WHERE Endpoint = '" + endPointRoot + "'";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    next();
});

const db = mysql.createConnection({
    host: "localhost",
    user: "ashergum_projAdmin",
    password: dbPass,
    database: "ashergum_TermProject"
});

// Get Request
app.get(endPointRoot, (req, res) => {
    let type = "Bakery";

    // GET stat query
    db.query(GET_stat_increment_root, (err, result) => {
        if (err) {
            throw err;
        } 
    });
    //
    if(true){
        getAll(res, type);
    }
});

// GET Stats
app.get(endPointRoot + "/stats", (req, res) => {
    // GET stat query
    db.query(sqlStats, (err, result) => {
        if (err) {
            throw err;
        } 

        res.json(result);
    });

});


// Uploading data to the database
app.post(endPointRoot, (req, res) => {
    let type = req.body.type;
    let sql = "";
    if (type == "Bakery"){
        let name = req.body.name;
        let location = req.body.location;
        let manager = req.body.manager;
        let description = req.body.description;
        sql = "INSERT INTO Bakery (bakeryName, bakeryLocation, bakeryManager, bakeryDescription) VALUES ('" 
            + name + "', '" + location + "', '" + manager + "', '" + description + "' );";
        
    } else if (type == "Dessert"){
        
    } else if (type == "Employees"){
        
    }


    
   
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        } 
        res.json(result);
    });
    // Post stat query
    db.query(POST_stat_increment_root, (err, result) => {
        if (err) {
            throw err;
        } 
    });
});



// Gets all the Bakeries, Employees, or Desserts in the database
function getAll(res, type){
    db.connect(function (err) {
        let sql = "";
        if (type == "Bakery"){
            sql = sqlBakery;
        } else if (type == "Dessert"){
            sql = sqlDessert;
        } else if (type == "Employees"){
            sql = sqlEmployees;
        }
        db.query(sql, function (err, result, fields) {
            if (err) throw err;
            res.json(result);
        });
    });
}

// insert function
//let sql = INSERT INTO `Dessert`(`dessertName`, `dessertIngredients`, `dessertDescription`, `bakeryID`) 


app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});