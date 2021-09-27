const express = require("express");
const router = express.Router();
const multer =  require("multer");
const login = require('../middleware/login');
const ProdutosController = require('../controllers/produtos-controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, './uploads/');
    },
    filename: function(req, file, cb){
        cb(null, new Date().toISOString() + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg' ) {
        cb(null, true);
    }else{
        cb(null, false);
    }
}

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
        fileFilter: fileFilter
});

//Pega Prods
router.get("/", ProdutosController.getProdutos);
//Cria Prods
router.post("/", login.obrigatorio, upload.single('produto_imagem'), ProdutosController.postProdutos);
//pega products by Prods
router.get("/:id_produto", ProdutosController.getUmProduto);
//Altera Prods
router.patch("/", login.obrigatorio, ProdutosController.updateProduto);
//Delete Prods
router.delete("/", login.obrigatorio, ProdutosController.deleteProduto);

module.exports = router;