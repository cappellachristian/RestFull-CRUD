var express = require('express');
var router = express.Router();
const sql = require('mssql');
var createError = require('http-errors');

const config = {
  user: 'cappella.christian',  //Vostro user name
  password: 'xxx123#', //Vostra password
  server: "213.140.22.237",  //Stringa di connessione
  database: 'cappella.christian', //(Nome del DB)
}


//Function to connect to database and execute query
let executeQuery = function (res, query, next) {
  sql.connect(config, function (err) {
    if (err) { //Display error page
      console.log("Error while connecting database :- " + err);
      res.status(500).json({success: false, message:'Error while connecting database', error:err});
      return;
    }
    var request = new sql.Request(); // create Request object
    request.query(query, function (err, result) { //Display error page
      if (err) {
        console.log("Error while querying database :- " + err);
        res.status(500).json({success: false, message:'Error while querying database', error:err});
        sql.close();
        return;
      }
      sql.close();
      renderPug(res, result.recordset);

    });

  });
}

function renderPug(res,data)
{
    console.log(data);
    //res.send("pagina con lista");
    res.render('list', { lista: data });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/list', function(req, res, next) {
    let sqlQuery = "select top 5 * from dbo.[cr-unit-attributes] ";
    executeQuery(res, sqlQuery, next);
});

module.exports = router;
