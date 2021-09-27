const mysql = require("../mysql").pool;

exports.getPedidos =  (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            "SELECT * FROM pedido",
            (error, result, fields) => {
                if (error) { return res.status(500).send({error: error})}
                const response = {
                    quantidade: result.length,
                    pedidos: result.map(pedido => {
                        return{
                            id_pedido: pedido.id_pedido,
                            id_produto: pedido.id_produto,
                            quantidade: pedido.quantidade,
                            request:{
                                tipo: "GET",
                                descricao: 'Retorna os detalhes de um pedido',
                                url: "http://localhost:3000/pedidos" + pedido.id_pedido
                            }
                        }
                    })
                }
                return res.status(200).send(response)
            }
        )
    });
 
};

exports.postPedidos =  (req, res, next) => {

    mysql.getConnection((error, conn) => {
        if (error) { return res.status(500).send({error: error})}
        conn.query("SELECT * FROM produtos WHERE id_produto = ?",
        [req.body.id_produto],
        (error, result, field) => {
            if (error) { return res.status(500).send({error: error})}
            if (result.length == 0) {
                return res.status(404).send({
                    mensagem: "pedido não foi encontrado"
                })
            }
                conn.query(
                    'INSERT INTO pedido (id_produto, quantidade) VALUES (?,?)',
                    [req.body.id_produto, req.body.quantidade],
                    (error, result, field) => {
                        conn.release();
                        if (error) { return res.status(500).send({error: error})}
                        const response = {
                            mensagem: "order sucessfull",
                            pedidoCriado:{
                                id_pedido: result.id_pedido,
                                id_produto: req.body.id_produto,
                                quantidade: req.body.quantidade,
                                request:{
                                    tipo: 'GET',
                                    descricao: ' retorna todos pedidos',
                                    url: 'http://localhost3002/orders'
                                }
                            }
                        }
                        return res.status(201).send(response)
                    }
                )
             })
         })
   };

   exports.getUmPedido =  (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if (error) { return res.status(500).send({error: error})}
        conn.query(
            "SELECT * FROM pedido WHERE id pedido = ?;",
            [req.params.id_pedido],
            (error, result, fields) => {
                if (error) { return res.status(500).send({error: error})}
                if (result.length == 0) {
                    return res.status(404).send({
                        mensagem: "Não foi encontrado pedido com este ID"
                    })
                }
                const response = {
                    pedido: {
                        id_pedido: result[0].id_pedido,
                        id_produto: result[0].id_produto,
                        quantidade: result[0].quantidade,
                        request:{
                                tipo: "GET",
                                descricao: 'Retorna os detalhes de um pedido',
                                url: "http://localhost:3000/orders" + pedido.id_pedido
                            }
                        }
            
                }
                return res.status(200).send(response)
            }
        )
    });
};

exports.deletePedido = (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if (error){return res.status(500).send({error: error})}
        conn.query(
           "DELETE FROM pedido WHERE id_pedido = ?", [req.body.id_pedido],
            (error, result, field) =>{
                conn.release();
                if (error){return res.status(500).send({error: error})}
                const response ={
                    mensagem: "pedido removed",
                    request:{
                        tipo: "POST",
                        descricao: "insere um pedido novo",
                        url:"httpp://localhost:3002/orders/",
                        body:{
                            id_produto: "Number",
                            quantidade: "Number"
                        }
                    }
                }
                    return res.status(202).send({response});
                }
             )
        });
};