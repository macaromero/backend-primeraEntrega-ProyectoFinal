const router = require("express").Router();
const {createCart, delCart, getProductsByCartId, addProductByCartId, delProductByCartId} = require("../controllers/cartsController");


router.post('/', createCart);
router.delete('/:id', delCart);
router.get('/:id/productos', getProductsByCartId);
router.post('/:id/productos', addProductByCartId);
router.delete('/:id/productos/:id_prod', delProductByCartId);

module.exports = router;