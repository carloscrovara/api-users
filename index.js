const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const app = express();

app.use(logger('dev'));
//variables de entorno
require('dotenv').config()

let helpers = require('./login');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))


//rutas y funciones.

//Ruta Login
app.post("/login", function (req, res) {
  
    let user = {
        username: "adrianu",
        password: "adrianu"
    }

    if(req.body.username === user.username && req.body.password === user.password){
        res.json("login correcto")
    }else{
        res.json("Corrobore sus credenciales")
    }

 
});

//Ruta registro
app.post("/registro", function(req, res){

   let mensaje =  helpers.comprobar(req.body.password, req.body.confirmpassword);

    res.json(mensaje)
})
 




//Verificación Ambiente   
let port;
if(process.env.NODE_ENV === "production"){
     port =  process.env.PORT_PROD;
}else{
     port =  process.env.PORT_DEV;
}
 
//express
app.listen(port, function () {
    console.log("Servidor Activo", port, process.env.NODE_ENV);
  });
  