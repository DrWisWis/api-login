const mongoose = require("mongoose");

async function connectDB() {
    try {
        await mongoose.connect("mongodb://localhost:27017/api_roles");
        console.log("MongoDB conectado");
    } catch (err) {
        console.error("Erro ao conectar:", err);
    }
}

module.exports = connectDB;