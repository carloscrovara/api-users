const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("sequelize");
const mysql = require("mysql2");

let accounts = require("./models").accounts;

app.use(logger("dev"));
//variables de entorno
require("dotenv").config();

//let helpers = require("./login");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Ruta Login
app.post("/login", async function (req, res) {
  let cuenta = await accounts.findAll({
    where: {
      username: req.body.username,
      password: req.body.password,
    },
  });

  if (cuenta.length == 0) {
    res.json("Compruebe credenciales");
  } else {
    res.json(cuenta);
  }
});

//Ruta registro
app.post("/registro", async function (req, res) {

    let cuenta = {
        name: req.body.name,
        lastname: req.body.lastname,
        username: req.body.username,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword
    };

    if (!cuenta.password && !cuenta.confirmpassword) {
        res.json("Complete los campos");
    } else {
      if (cuenta.password === cuenta.confirmpassword) {
        let registro = await accounts.create(
            cuenta
        );
        res.json(registro);
      } else {
        res.json("Las contraseñas no coinciden");
      }
    }
});

//Verificación Ambiente
let port;
if (process.env.NODE_ENV === "production") {
  port = process.env.PORT_PROD;
} else {
  port = process.env.PORT_DEV;
}

//Express
app.listen(port, function () {
  console.log("Servidor Activo", port, process.env.NODE_ENV);
});