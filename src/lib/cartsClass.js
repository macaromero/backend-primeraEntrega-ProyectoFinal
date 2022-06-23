const fs = require('fs');

class Carts {

    static encoding = 'utf-8';
    static ruta = './data/carritos.json';

    constructor() {
        this.cart = {};
    };

    async getById(id) {
        try {
            const all = await this.getAll();
            const index = all.findIndex(c => c.id == id);

            if (index == -1) {
                return undefined;
            } else {
                return this.cart = all[index];
            };
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async getAll() {
        try {
            const all = await fs.promises.readFile(Carts.ruta, Carts.encoding);
            let carts = [];
            if (all != "") {
                return carts = JSON.parse(all);
            };
            return carts;
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async createCart() {
        try {
            const all = await this.getAll();
            let idAnterior = 0;

            all.map(c => {
                return idAnterior = c.id;
            });

            this.cart = {
                "id": idAnterior + 1,
                "timestamp": new Date().toLocaleString("es-AR"),
                "productos": []
            };

            idAnterior ++;

            all.push(this.cart);
            await fs.promises.writeFile(Carts.ruta, JSON.stringify(all, null, 2));
            return this.cart.id;
            
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async deleteById(id) {
        let all = await this.getAll();
        const index = all.findIndex(c => c.id == id);

        if (index == -1) {
            return undefined;
        };

        all.splice(index, 1);

        try {
            await fs.promises.writeFile(Carts.ruta, JSON.stringify(all, null, 2));
            return all;
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async getProducts(idCart) {
        try {
            const all = await this.getAll();
            const index = all.findIndex(c => c.id == idCart);
            let products = [];

            if (all != undefined) {
                return products = all[index].productos;
            };  

        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };
    
    async addProducts(idCart, product) {
        try {
            const all = await this.getAll();
        
            if (all != undefined) {
                const index = all.findIndex(c => c.id == idCart);
                let cart = all[index];
                cart.productos.push(product);
                cart.timestamp = new Date().toLocaleString("es-AR");
                all[index] = cart;
                await fs.promises.writeFile(Carts.ruta, JSON.stringify(all, null, 2));
                return cart;
            } else {
                return undefined;
            };  

        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };

    async deleteProductByCartId(id_cart, id_prod) {
        let all = await this.getAll();
        const index = all.findIndex(c => c.id == id_cart);
        let cart;

        if (index == -1) {
            return undefined;
        } else {
            cart = all[index];
            const indexProd = cart.productos.findIndex(p => p.id == id_prod);

            if (indexProd == -1) {
                return undefined;
            } else {
                cart.productos.splice(indexProd, 1);
                all[index] = cart;
            };
        };

        try {
            await fs.promises.writeFile(Carts.ruta, JSON.stringify(all, null, 2));
            return cart;
        } catch (error) {
            console.log("Ocurrió un error, volvé a intentarlo");
            console.log(error);
        };
    };
};

module.exports = Carts;