const express = require("express");
const { registerUser, loginUser } = require("../services/authService");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("¡Bienvenido a la API de autenticación!");
});

// Registro de usuarios
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await registerUser(email, password);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login de usuarios
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

module.exports = router;
