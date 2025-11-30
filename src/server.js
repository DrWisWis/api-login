const express = require("express");
const cors = require("cors");
const connectDB = require("./database");
const routes = require("./routes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

connectDB();

app.listen(3000, () => {
    console.log("Servidor rodando: http://localhost:3000");
});