const fs = require('fs');

class Products {

    static encoding = 'utf-8';
    static ruta = './data/productos.json';

    constructor() {
        this.product;
        this.products = [];
    };

    async getById(id) {
        try {
            const all = await this.getAll();
            this.product = all.find(p => {
                if (p.id == id) {
                    return p.id == id;
                } else {
                    return undefined;
                };
            });
            return this.product;
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async getAll() {
        try {
            const prod = await fs.promises.readFile(Products.ruta, Products.encoding);
            this.products = [];
            if (prod != "") {
                return this.products = JSON.parse(prod);
            };
            return this.products;
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async save (producto) {
        try {
            const all = await this.getAll();
            let idAnterior = 0;

            all.map(p => {
                return idAnterior = p.id;
            });

            producto.id = idAnterior + 1;
            idAnterior ++;
            producto.timestamp = new Date().toLocaleString("es-AR");
            all.push(producto);
            await fs.promises.writeFile(Products.ruta, JSON.stringify(all, null, 2));
            return producto;
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async modify(obj) {
        const all = await this.getAll();
        const index = all.findIndex(p => p.id == obj.id);

        if (index == -1) {
            return undefined;
        } else {
            obj.timestamp = new Date().toLocaleString("es-AR");
            all[index] = obj;
        };
    
        try {
            await fs.promises.writeFile(Products.ruta, JSON.stringify(all, null, 2));
            return all[index];
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async deleteById(id) {
        let all = await this.getAll();
        const index = all.findIndex(p => p.id == id);

        if (index == -1) {
            return undefined;
        };

        all.splice(index, 1);

        try {
            await fs.promises.writeFile(Products.ruta, JSON.stringify(all, null, 2));
            return all;
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async deleteAll() {
        try {
            await fs.promises.writeFile(Products.ruta, JSON.stringify([], null, 2));
            console.log("Todos los productos fueron eliminados");
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };
};

module.exports = Products;