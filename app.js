const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");

const routeProducts = require("./routes/products");
const routeOrders = require("./routes/orders");
const rotaUsuarios = require("./routes/usuarios");

app.use(morgan("dev"));
app.use('/uploads', express.static('uploads'))
app.use(bodyParser.urlencoded({ extended: false})); //somente dados simples
app.use(bodyParser.json()); //somente entradas tipo json no body

app.use((req, res, next) =>{
    res.header("Acces-Control-Allow-Origin", "*");
    res.header(
        "Acces-Control-Allow-Header",
        "Origin, X-Requrested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === "OPTIONS"){
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).send({});
    }
    next();
})

app.use("/products", routeProducts);
app.use("/orders", routeOrders);
app.use("/usuarios", rotaUsuarios)

//se encontrrar erro
app.use((req, res, next) => {
    const err = new Error("not fount");
    err.status= 404;
    next(err);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;
