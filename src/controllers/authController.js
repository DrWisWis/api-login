const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
    async register(req, res) {
        try {
            const { nome, email, senha, role } = req.body;

            const userExists = await User.findOne({ email });
            if (userExists) {
                return res.status(400).json({ message: "Email já cadastrado" });
            }

            const hash = await bcrypt.hash(senha, 10);

            const newUser = await User.create({
                nome,
                email,
                senha: hash,
                role: role || "cliente"
            });

            return res.json({ message: "Usuário criado", user: newUser });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },

    async login(req, res) {
        try {
            const { email, senha } = req.body;

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: "Usuário não encontrado" });
            }

            const match = await bcrypt.compare(senha, user.senha);
            if (!match) {
                return res.status(400).json({ message: "Senha incorreta" });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    role: user.role
                },
                "SECRET_JWT",
                { expiresIn: "1h" }
            );

            return res.json({ message: "Logado", token });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }
};