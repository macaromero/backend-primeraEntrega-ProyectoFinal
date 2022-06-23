const express = require("express");
const app = express();
const PORT = 8080;
const productsRoute = require("./routes/productsRoute");
const cartRoute = require("./routes/cartRoute");
const notFoundRoute = require("./routes/main");


app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/productos", productsRoute);
app.use("/api/carrito", cartRoute);
app.use("/*", notFoundRoute);

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server running on port ${PORT}`);
});