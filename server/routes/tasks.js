var express =require("express");
var router = express();
var pg = require("pg");

var config = {
  database: "chi",
  host: "localhost",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000
}; //ends configuration

var pool = new pg.Pool(config);

router.get("/", function(req, res) {
  pool.connect(function(errorConnectingToDatabase, db, done) {
    if(errorConnectingToDatabase) {
      console.log("Error connecting to the database");
      res.send(500);
    } else {
      db.query('SELECT * FROM "tasks" ORDER BY "completed" DESC, "id" ASC;',
        function(queryError, result) {
          done();
          if(queryError) {
            console.log("Error making query.");
            res.send(500);
          } else {
            //console.log(result); //use for debugging, can comment out when done
            res.send(result.rows);
          }
        });
    } //end of else
  }); //end pool
}); //end of get response


//POST response
router.post("/add", function(req, res) {
  console.log(req.body);
  var description = req.body.description;
  pool.connect(function(errorConnectingToDatabase, db, done) {
    if(errorConnectingToDatabase) {
      console.log("Error connecting to the database");
      res.send(500);
    } else {
      db.query('INSERT INTO "tasks" ("description") VALUES ($1);',
        [description], function(queryError, result) {
          done();
          if(queryError) {
            console.log("Error making query.");
            res.send(500);
          } else {
            res.sendStatus(201);
          }
        });
    } //end of else
  }); //end pool
}); //end of POST response

//DELETE request
router.delete("/delete/:id", function(req, res) {
  //console.log(req.body);
  pool.connect(function(errorConnectingToDatabase, db, done) {
    if(errorConnectingToDatabase) {
      console.log("Error connecting to the database");
      res.send(500);
    } else {
      db.query('DELETE FROM "tasks" WHERE "id" = $1;', [req.body.id], //params?
        function(queryError, result) {
          done();
          if(queryError) {
            console.log("Error making query.");
            res.send(500);
          } else {
            res.sendStatus(200);
          }
        });
    } //end of else
  }); //end pool
}); //end of DELETE response

module.exports = router;
