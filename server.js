import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { sequelize } from "./src/db.js";

import {
  Controle_Cabeleireiro,
  Controle_Cliente,
  Controle_Servico,
  Controle_Equipamento,
  Controle_Usuario
} from "./src/controle.js";

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const frontPath = path.join(__dirname, "Frontend");
app.use(express.static(frontPath));


app.get("/", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "index.html"))
);

app.get("/home_cliente", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "home_cliente.html"))
);

app.get("/home_funcionario", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "home_funcionario.html"))
);

app.get("/index", (req, res) =>
  res.sendFile(path.join(frontPath, "index.html"))
);

app.get("/agendar_servico", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "agendar_servico.html"))
);

app.get("/produtos", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "produtos.html"))
);

app.get("/equipe", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "equipe.html"))
);

app.get("/login_cliente", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "login_cliente.html"))
);

app.get("/login_funcionario", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "login_funcionario.html"))
);

app.get("/servicos", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "servicos.html"))
);

app.get("/agendar_servico", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "agendar_servico.html"))
);

app.get("/cadastro_cliente", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "cadastro_cliente.html"))
);

app.get("/cadastro_cabeleireiro", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "cadastro_cabeleireira.html"))
);

app.get("/lista_cliente", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "lista_cliente.html"))
);

app.get("/lista_cabeleireiro", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "lista_cabelereiro.html"))
);


app.post("/api/cabeleireiro", Controle_Cabeleireiro.criar);
app.get("/api/cabeleireiro", Controle_Cabeleireiro.listar);
app.delete("/api/cabeleireiro/:cpf", Controle_Cabeleireiro.deletar);

app.post("/api/cliente", Controle_Cliente.criar);
app.get("/api/cliente", Controle_Cliente.listar);
app.delete("/api/cliente/:cpf", Controle_Cliente.deletar);

app.post("/api/servicos", Controle_Servico.criar);
app.get("/api/servicos", Controle_Servico.listar);
app.delete("/api/servicos/:id", Controle_Servico.deletar);

app.get("/api/equipe", Controle_Cabeleireiro.listar);

app.get("/api/lista_cliente", Controle_Cliente.listar)

app.post("/api/agendar_servico", Controle_Servico.criar);

app.post("/api/equipamento", Controle_Equipamento.criar);
app.get("/api/equipamento", Controle_Equipamento.listar);
app.delete("/api/equipamento/:id", Controle_Equipamento.deletar);

app.post("/api/usuario", Controle_Usuario.criar);
app.post("/api/login", Controle_Usuario.login);

app.get("/admim", (req, res) =>
  res.sendFile(path.join(frontPath, "paginas", "admim.html"))
);


(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    app.listen(PORT, () =>
      console.log(`Servidor rodando em http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Erro ao iniciar servidor:", error);
  }
})();
