var http = require('http');
let url = require("url");
const express = require("express");
const app = express();
const mysql = require("mysql");
const endPointRoot = "/Comp4537/termproject/API/V1";
const port = process.env.PORT || 8888;
const dbPass = "CqVQzWZcaqNM";
const sqlBakery = "SELECT * FROM `Bakery` Order BY bakeryID ASC";
const sqlBakeryItem = "SELECT * FROM `Bakery` WHERE bakeryID = ";
const sqlUserItem= "SELECT * FROM `Users` WHERE userName = ";
const sqlEmployees = "SELECT * FROM `Employees` Order BY employeeID ASC";
const sqlEmployeesItem = "SELECT * FROM `Employees` WHERE employeeID = ";
const sqlDessert = "SELECT * FROM `Dessert` Order BY dessertID ASC";
const sqlDessertItem = "SELECT * FROM `Dessert` WHERE dessertID = ";
const sqlStats = "SELECT * FROM `Stats` Order BY Endpoint ASC";
const GET_stat_increment_root = "UPDATE `Stats` SET GET_stat = GET_stat + 1 WHERE Endpoint = ";
const POST_stat_increment_root = "UPDATE `Stats` SET POST_stat = POST_stat + 1 WHERE Endpoint = ";
const PUT_stat_increment_root = "UPDATE `Stats` SET PUT_stat = PUT_stat + 1 WHERE Endpoint = ";
const DELETE_stat_increment_root = "UPDATE `Stats` SET DELETE_stat = DELETE_stat + 1 WHERE Endpoint = ";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    //res.header('Access-Control-Allow-Origin', 'https://christinaraganit.live');
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

// GET user
app.get(endPointRoot + "/user", (req, res) => {
    let q = url.parse(req.url, true);
    let sql = sqlUserItem + "'" + q.query["username"] + "'";

    db.query(sql, function (err, result, fields) {
        if (err) throw err;
        res.json(result);
    });

    // GET stat query
    db.query(GET_stat_increment_root + "'" + endPointRoot + "/user'" , (err, result) => {
        if (err) {
            throw err;
        } 
    });

   
    
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


// POST User
app.post(endPointRoot + "/user", (req, res) => {
    let userName = req.body.userName;
    let uPassword = req.body.password;
    let email = req.body.email;
    let isAdmin = req.body.isAdmin;

    let sql = "INSERT INTO Users (userName, uPassword, email, isAdmin) VALUES ('" 
        + userName + "', '" + uPassword + "', '" + email + "', '" + isAdmin + "' );";
        
    db.query(sql, (err, result) => { 
        if (err) {
            throw err;
        }
        res.json(result);
    });
    // Post stat query
    db.query(POST_stat_increment_root + "'" + endPointRoot + "/user'" , (err, result) => {
        if (err) {
            throw err;
        } 
    });
});

/**
 * -------------------------------------------------------
 * PUT Requests start here, These are all the requests
 * for editing elements to the database.
 * -------------------------------------------------------
 */

// Editing a Bakery
app.put(endPointRoot + "/bakery", (req, res) => {
    let id = req.body.bakeryID;
    let name = req.body.name;
    let location = req.body.location;
    let manager = req.body.manager;
    let description = req.body.description;
    let sql = "UPDATE Bakery SET bakeryName = '" + name + "', bakeryLocation = '" + location 
        + "', bakeryManager = '" + manager + "', bakeryDescription = '" + description + "' WHERE bakeryID = " + id + ";";
    db.query(sql, (err, result) => {
      if (err) {
        throw err;
      }
      res.json(result);
    });
    // PUT stat query
    db.query(PUT_stat_increment_root + "'" + endPointRoot + "/bakery'" , (err, result) => {
        if (err) {
            throw err;
        } 
    });
  });

// Editing a Dessert
app.put(endPointRoot + "/dessert", (req, res) => {
    let id = req.body.dessertID;
    let name = req.body.name;
    let ingredients = req.body.ingredients;
    let description = req.body.description;
    let bakeryID = req.body.bakeryID;
    let sql = "UPDATE Dessert SET dessertName = '" + name + "', dessertIngredients = '" + ingredients 
        + "', bakeryID = '" + bakeryID + "', dessertDescription = '" + description + "' WHERE dessertID = " + id + ";";
    db.query(sql, (err, result) => {
    if (err) {
        throw err;
    }
    res.json(result);
    });
    // PUT stat query
    db.query(PUT_stat_increment_root + "'" + endPointRoot + "/dessert'" , (err, result) => {
        if (err) {
            throw err;
        } 
    });
});

// Editing a Employee
app.put(endPointRoot + "/employee", (req, res) => {
    let id = req.body.employeeID;
    let firstName = req.body.firstName;
    let lastName = req.body.lastName;
    let description = req.body.description;
    let role = req.body.role;
    let bakeryID = req.body.bakeryID;
    let sql = "UPDATE Employees SET firstName = '" + firstName + "', lastName = '" + lastName + "', role = '" + role 
        + "', bakeryID = '" + bakeryID + "', description = '" + description + "' WHERE employeeID = " + id + ";";
    db.query(sql, (err, result) => {
    if (err) {
        throw err;
    }
    res.json(result);
    });
    // PUT stat query
    db.query(PUT_stat_increment_root + "'" + endPointRoot + "/employee'" , (err, result) => {
        if (err) {
            throw err;
        } 
    });
});


/**
 * -------------------------------------------------------
 * Delete Requests start here, These are all the requests
 * for deleting elements to the database.
 * -------------------------------------------------------
 */

// Removing bakery from the database
app.delete(endPointRoot + "/bakery", (req, res) => {
    let type = req.body.type;
    let id = req.body.id;
    let sql = "DELETE FROM `Bakery` WHERE bakeryID = " + id + ";";
    
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
           
        res.json(result);
    });

    // DELETE stat query
    db.query(DELETE_stat_increment_root + "'" + endPointRoot + "/" + type + "'" , (err, result) => {
        if (err) {
            throw err;
        } 
    });
});

// Removing dessert from the database
app.delete(endPointRoot + "/dessert", (req, res) => {
    let type = req.body.type;
    let id = req.body.id;
    let sql = "DELETE FROM `Dessert` WHERE dessertID = " + id + ";";
    
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
           
        res.json(result);
    });

    // DELETE stat query
    db.query(DELETE_stat_increment_root + "'" + endPointRoot + "/" + type + "'" , (err, result) => {
        if (err) {
            throw err;
        } 
    });
});

// Removing employee from the database
app.delete(endPointRoot + "/employee", (req, res) => {
    let type = req.body.type;
    let id = req.body.id;
    let sql = "DELETE FROM `Employees` WHERE employeeID = " + id + ";";
    
    db.query(sql, (err, result) => {
        if (err) {
            throw err;
        }
           
        res.json(result);
    });

    // DELETE stat query
    db.query(DELETE_stat_increment_root + "'" + endPointRoot + "/" + type + "'" , (err, result) => {
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

app.listen(port, () => {
    console.log(`listening on port: ${port}`);
});