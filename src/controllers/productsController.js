const classP = require("../lib/productsClass");
const classProducts = new classP;
const uuid = require("uuid");

const getProducts = async (req, res) => {
    try {
        const all = await classProducts.getAll();
        res.status(200).json({
            "Productos": all
        });
    } catch (error) {
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};

const getProductById = async (req, res) => {
    const id = Number(req.params.id);

    try {
        const prod = await classProducts.getById(id);
        
        if (prod != undefined) {
            res.status(200).json({
                "Producto": prod
            });
        } else {
            res.status(404).json(`No se encontró producto con el id ${id}`);
        };
    } catch (error) {
        res.status(500).json({
            "Ocurrió un error": error
        });
    };
};

const createProduct = async (req, res) => {
    const {name, description, thumbnail, price, stock} = req.body;

    if ((name !== undefined) && (description !== undefined) && (thumbnail !== undefined) && (price !== undefined) && (stock !== undefined)) {

        const product = {
            name: name,
            description: description,
            code: uuid.v4(),
            thumbnail: thumbnail,
            price: price,
            stock: stock
        };

        const save = await classProducts.save(product);

        try {
            res.status(200).json({
                "Estado": `Producto con id ${save.id} fue añadido correctamente`,
                "Producto": save
            });
        } catch (error) {
            res.status(500).json({
                "Ocurrió un error": error
            });
        };
    } else {
        res.status(206).json("Todos los campos son obligatorios, volvé a intentarlo");
    };    
};

const modifyProduct = async (req, res) => {
    let {name, description, thumbnail, price, stock} = req.body;
    const id = Number(req.params.id);

    const prod = await classProducts.getById(id);

    if (prod != undefined) {

        switch (name) {
            case undefined:
                name = prod.name
                break;
            default:
                break;
        };
    
        switch (description) {
            case undefined:
                description = prod.description
                break;
            default:
                break;
        };
    
        switch (thumbnail) {
            case undefined:
                thumbnail = prod.thumbnail
                break;
            default:
                break;
        };
    
        switch (price) {
            case undefined:
                price = prod.price
                break;
            default:
                break;
        };
    
        switch (stock) {
            case undefined:
                stock = prod.stock
                break;
            default:
                break;
        };
    
        const product = {
            name: name,
            description: description,
            code: prod.code,
            thumbnail: thumbnail,
            price: price,
            stock: stock,
            id: id
        };
    
        const modify = await classProducts.modify(product);
    
        try {
            res.status(200).json({
                "Estado": `El producto con id ${id} se modificó correctamente`,
                "Producto": modify
            });
        } catch (error) {
            res.status(500).json({
                "Ocurrió un error": error
            });
        };
    } else {
        res.status(404).json(`No se encontró producto con el id ${id}`);
    }; 
};

const delProduct = async (req, res) => {
    const id = Number(req.params.id);
    const del = await classProducts.deleteById(id);

    if (del != undefined) {
        try {
            res.status(200).json({
                "Estado": `Producto con id ${id} eliminado correctamente`,
                "Productos": del
            });
        } catch (error) {
            res.status(500).json({
                "Ocurrió un error": error
            });
        };
    } else {
        res.status(404).json(`No se encontró producto con el id ${id}`);
    };
};

module.exports = {getProducts, getProductById, createProduct, modifyProduct, delProduct};