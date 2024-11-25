require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const authRoutes = require("./src/routes/authRoutes");
const cors = require("cors");

const app = express();
const corsOptions = {
  origin: "*",
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

// Middleware
app.use(bodyParser.json());

// Rutas
app.use("/api", authRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
