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
      db.query('SELECT * FROM "tasks" ORDER BY "id" ASC;',
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

module.exports = router;
