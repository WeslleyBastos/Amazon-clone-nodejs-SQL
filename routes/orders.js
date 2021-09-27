const express = require("express");
const router = express.Router();

const PedidosController = require('../controllers/pedidos-controller');

//Pega Pedidos
router.get("/", PedidosController.getPedidos );
//Cria Pedidos
router.post("/", PedidosController.postPedidos);
//pega Pedidos by id
router.get("/:id_pedido", PedidosController.getUmPedido);
//Delete Pedidos
router.delete("/", PedidosController.deletePedido);

module.exports = router;