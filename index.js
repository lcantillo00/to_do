var express= require('express');
var mysql= require('mysql');
var connection= mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: 'root',
    database: 'to_do',
    port: '8889'
});
 connection.connect(function(err,result){
     if(err){
         console.log(err.toString());
         return;
     }
     console.log(result);
     console.log("Conected database");
 });

 var app = express();
 var bodyParser= require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/to_dos', function(req,res){

    connection.query('SELECT * FROM to_dos',function(err,rows){
        if(err){
                console.log("error reading flash cards");
                return res.sendStatus(500);

            }
            res.json(rows);

  });

});

app.put('/to_dos',function (req,res){
    var query =`UPDATE to_dos set status='${req.body.status}' where id=${req.body.id} `;
    console.log(query);
    connection.query(query,function(err,rows){
        if (err){
        console.log(err.toString());
        return res.status(500).send(err);
    }
     res.json(rows);
     console.log("db request succeded");

 });

});
app.post('/to_dos', function(req,res){
    var query = `INSERT INTO to_dos (description,status) values ('${req.body.description}', '${req.body.status}') `;
    connection.query(query,function(err,result){
        if (err){
            console.log(err.toString());
            return res.status(500).send(err);
        }
        res.json(result);
         console.log("db request succeded");

    });
});
app.listen(8887);
