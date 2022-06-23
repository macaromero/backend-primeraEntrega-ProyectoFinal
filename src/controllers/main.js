const notFound = (req, res) => {
    const path = req.baseUrl;
    const method = req.method;
    
    res.status(404).json({
        "error": "404 - Not found",
        "descripción": `Ruta '${path}' método '${method}' no implementada`
    });
};

module.exports = notFound;