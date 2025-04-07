// index.js
const express = require('express');
const path = require('path');
const app = express();

// Serve os arquivos estáticos da raiz do projeto
app.use(express.static(path.join(__dirname, '/')));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
