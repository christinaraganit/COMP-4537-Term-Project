var http = require('http');
let url = require("url");
const express = require("express");
const app = express();
const mysql = require("mysql");
const endPointRoot = "/Comp4537/termproject/API/V1";
const port = process.env.PORT || 8888;
const dbPass = "CqVQzWZcaqNM";
const sqlBakery = "SELECT * FROM `Bakery` Order BY bakeryName ASC";
const sqlBakeryItem = "SELECT * FROM `Bakery` WHERE bakeryID = ";
const sqlEmployees = "SELECT * FROM `Employees` Order BY lastName ASC";
const sqlEmployeesItem = "SELECT * FROM `Employees` WHERE employeeID = ";
const sqlDessert = "SELECT * FROM `Dessert` Order BY dessertName ASC";
const sqlDessertItem = "SELECT * FROM `Dessert` WHERE dessertID = ";
const sqlStats = "SELECT * FROM `Stats` Order BY Endpoint ASC";
const GET_stat_increment_root = "UPDATE `Stats` SET GET_stat = GET_stat + 1 WHERE Endpoint = ";
const POST_stat_increment_root = "UPDATE `Stats` SET POST_stat = POST_stat + 1 WHERE Endpoint = ";
const PUT_stat_increment_root = "UPDATE `Stats` SET PUT_stat = PUT_stat + 1 WHERE Endpoint = ";
const DELETE_stat_increment_root = "UPDATE `Stats` SET DELETE_stat = DELETE_stat + 1 WHERE Endpoint = ";

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

/**
 * -------------------------------------------------------
 * Get Requests start here, These are all the requests
 * for getting elements in side the database.
 * -------------------------------------------------------
 */

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

// GET all Bakeries
app.get(endPointRoot + "/bakery", (req, res) => {
    let q = url.parse(req.url, true);
    // GET stat query
    db.query(GET_stat_increment_root + "'" + endPointRoot + "/bakery'" , (err, result) => {
        if (err) {
            throw err;
        } 
    });
    if (q.query["id"] == null){
        getAll(res, "Bakery");
    } else {
        getItem(res, "Bakery", parseInt(q.query["id"]))
    }
});

// GET all desserts
app.get(endPointRoot + "/dessert", (req, res) => {
    let q = url.parse(req.url, true);
    // GET stat query
    db.query(GET_stat_increment_root + "'" + endPointRoot + "/dessert'" , (err, result) => {
        if (err) {
            throw err;
        } 
    });
    if (q.query["id"] == null){
        getAll(res, "Dessert");
    } else {
        getItem(res, "Dessert", parseInt(q.query["id"]))
    }
});

// GET all employees
app.get(endPointRoot + "/employee", (req, res) => {
    let q = url.parse(req.url, true);
    // GET stat query
    db.query(GET_stat_increment_root + "'" + endPointRoot + "/employee'" , (err, result) => {
        if (err) {
            throw err;
        } 
    });
    if (q.query["id"] == null){
        getAll(res, "Employees");
    } else {
        getItem(res, "Employees", parseInt(q.query["id"]))
    }
});

/**
 * -------------------------------------------------------
 * Post Requests start here, These are all the requests
 * for sending elements to the database.
 * -------------------------------------------------------
 */

// POST Bakery
app.post(endPointRoot + "/bakery", (req, res) => {
    let name = req.body.name;
    let location = req.body.location;
    let manager = req.body.manager;
    let description = req.body.description;
    let sql = "INSERT INTO Bakery (bakeryName, bakeryLocation, bakeryManager, bakeryDescription) VALUES ('" 
        + name + "', '" + location + "', '" + manager + "', '" + description + "' );";
        
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
    // Post stat query
    db.query(POST_stat_increment_root + "'" + endPointRoot + "/bakery'" , (err, result) => {
        if (err) {
            throw err;
        } 
    });
});

// POST Dessert
app.post(endPointRoot + "/dessert", (req, res) => {
    let name = req.body.name;
    let ingredients = req.body.ingredients;
    let description = req.body.description;
    let bakeryID = req.body.bakeryID;
    let sql = "INSERT INTO Dessert (dessertName, dessertIngredients, dessertDescription, bakeryID) VALUES ('" 
        + name + "', '" + ingredients + "', '" + description + "', '" + bakeryID + "' );";
        
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
        res.json(result);
    });
    // Post stat query
    db.query(POST_stat_increment_root + "'" + endPointRoot + "/dessert'" , (err, result) => {
        if (err) {
            throw err;
        } 
    });
});

// POST Employee
app.post(endPointRoot + "/employee", (req, res) => {
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let description = req.body.description;
    let role = req.body.role;
    let bakeryID = req.body.bakeryID;

    let sql = "INSERT INTO Employees (role, description, bakeryID, firstName, lastName) VALUES ('" 
        + role + "', '" + description + "', '" + bakeryID + "', '" + firstName + "', '" + lastName + "' );";
        
    db.query(sql, (err, result) => { 
        if (err) {
            throw err;
        }
        res.json(result);
    });
    // Post stat query
    db.query(POST_stat_increment_root + "'" + endPointRoot + "/employee'" , (err, result) => {
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

// Gets a specific item from either Bakery, Employee, or Dessert in the database
function getItem(res, type, id){
    db.connect(function (err) {
        let sql = "";
        if (type == "Bakery"){
            sql = sqlBakeryItem + "'" + id + "'";
        } else if (type == "Dessert"){
            sql = sqlDessertItem + "'" + id + "'";
        } else if (type == "Employees"){
            sql = sqlEmployeesItem + "'" + id + "'";
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