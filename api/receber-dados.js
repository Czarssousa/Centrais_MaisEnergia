const express = require("express");
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors()); // Ativa o suporte a CORS para todas as origens
app.use(express.json());

let ultimoPayload = {};

// Endpoint para receber dados via POST
app.post("/api/receber-dados", (req, res) => {
  ultimoPayload = req.body;
  console.log("Dados recebidos:", ultimoPayload);
  res.status(200).json({ message: "Dados recebidos com sucesso!" });
});

// Endpoint para enviar dados via GET
app.get("/api/receber-dados", (req, res) => {
  res.status(200).json(ultimoPayload);
});

// Inicia o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
