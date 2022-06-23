const classC = require("../lib/cartsClass");
const classCarts = new classC;
const classP = require("../lib/productsClass");
const classProducts = new classP;

const createCart = async (req, res) => {
    const cart = await classCarts.createCart();

    try {
        res.status(200).json({
            "Estado": `El carrito con id ${cart} fue creado correctamente`
        });
    } catch (error) {
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};

const delCart = async (req, res) => {
    const id = Number(req.params.id);
    const del = await classCarts.deleteById(id);

    if (del != undefined) {
        try {
            res.status(200).json({
                "Estado": `Carrito con id ${id} eliminado correctamente`,
                "Carritos": del
            });
        } catch (error) {
            res.status(500).json({
                "Ocurrió un error": error
            });
        };
    } else {
        res.status(404).json(`No se encontró el carrito con el id ${id}`);
    };
};

const getProductsByCartId = async (req, res) => {
    const id = Number(req.params.id);

    const exists = await classCarts.getById(id);

    if (exists != undefined) {
        try {
            const products = await classCarts.getProducts(id);
    
            if (products != undefined) {
                res.status(200).json({
                    "Productos": products
                });
            };
        } catch (error) {
            res.status(500).json({
                "Ocurrió un error": error
            });
        };
    } else {
        res.status(404).json(`No se encontró el carrito con id ${id}`);
    };
};

const addProductByCartId = async (req, res) => {
    const {id_prod} = req.body;
    const idCart = Number(req.params.id);
    
    const exists = await classCarts.getById(idCart);

    if (exists != undefined) {
        const product = await classProducts.getById(id_prod);

        if (product != undefined) {
            const add = await classCarts.addProducts(idCart, product);
    
            if (add != undefined) {
                try {
                    res.status(200).json({
                        "Estado": `Producto con id ${id_prod} añadido correctamente al carrito`,
                        "Carrito": add
                    });
                } catch (error) {
                    res.status(500).json({
                        "Ocurrió un error": error
                    });
                };
            };
        } else {
            res.status(404).json(`No se encontró el producto con id ${id_prod}`);
        };
    } else {
        res.status(404).json(`No se encontró el carrito con id ${idCart}`);
    };
};

const delProductByCartId = async (req, res) => {
    const {id_prod, id} = req.params;
    const del = await classCarts.deleteProductByCartId(id, id_prod);

    const exists = await classCarts.getById(id);

    if (exists != undefined) {
        if (del != undefined) {
            try {
                res.status(200).json({
                    "Estado": `Producto con id ${id_prod} eliminado correctamente del carrito`,
                    "Carrito": del
                });
            } catch (error) {
                res.status(500).json({
                    "Ocurrió un error": error
                });
            };
        } else {
            res.status(404).json(`No se encontró producto con el id ${id_prod} en el carrito`);
        };
    } else {
        res.status(404).json(`No se encontró carrito con el id ${id}`);
    };
};

module.exports = {createCart, delCart, getProductsByCartId, addProductByCartId, delProductByCartId};