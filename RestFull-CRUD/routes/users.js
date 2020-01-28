var express = require('express');
var router = express.Router();
const sql = require('mssql')
const config = {
    user: 'cappella.christian',  //Vostro user name
    password: 'xxx123#', //Vostra password
    server: "213.140.22.237",  //Stringa di connessione
    database: 'cappella.christian', //(Nome del DB)
}

/* GET users listing. */
router.get('/attori', function (req, res, next) {
    sql.connect(config, err => {
        if (err) console.log(err);  // ... error check

        // Query
        let sqlRequest = new sql.Request();  //Oggetto che serve a creare le query
        sqlRequest.query('select * from Autore', (err, result) => {
            if (err) console.log(err); // ... error checks
            res.send(result);  //Invio il risultato
        });
    });
});

router.get('/search/:name', function (req, res, next) {
    
    sql.connect(config, err => {
        // ... error check
        if (err) console.log(err);
        // Query
        let sqlRequest = new sql.Request();
        sqlRequest.query(`select * from Autore where CognomeAutore = '${req.params.name}'`, (err, result) => {
            // ... error checks
            if (err) console.log(err);

            res.send(result);
        });
    });
});

module.exports = router;