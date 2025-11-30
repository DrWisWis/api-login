const express = require("express");
const routes = express.Router();

const authController = require("./controllers/authController");
const auth = require("./middleware/authMiddleware");
const role = require("./middleware/roleMiddleware");

// Rotas

// login/cadastro
routes.post("/register", authController.register);
routes.post("/login", authController.login);

// Rota normal (só precisa estar logado)
routes.get("/perfil", auth, (req, res) => {
    res.json({ message: "Perfil acessado", user: req.user });
});

// Admin
routes.get("/admin", auth, role("admin"), (req, res) => {
    res.json({ message: "Área ADMIN liberada" });
});

// Funcionário e admin
routes.get("/dashboard", auth, role("funcionario", "admin"), (req, res) => {
    res.json({ message: "Dashboard acessada" });
});

module.exports = routes;