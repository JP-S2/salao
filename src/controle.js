import {cabeleireiro} from "./models/cabeleireiro.js";
import {cliente } from "./models/cliente.js";
import {servico} from "./models/servico.js";
import {equipamento} from "./models/equipamento.js";
import {usuario} from "./models/usuario.js";

/////////////////////////////////////

export class Controle_Cabeleireiro {
  static async criar(req, res) {
    try {
      const { cpf_cabeleireiro, nome_cabeleireiro, especializacao, celular } = req.body;

      if (!cpf_cabeleireiro || !nome_cabeleireiro) {
        return res.status(400).json({ erro: "CPF e nome são obrigatórios." });
      }

      const existente = await cabeleireiro.findByPk(cpf_cabeleireiro);

      if (existente) {
        return res.status(400).json({ erro: "Cabeleireiro já cadastrado." });
      }

      await cabeleireiro.create({
        cpf_cabeleireiro,
        nome_cabeleireiro,
        especializacao,
        celular
      });

      return res.status(200).json({
        success_message: "Cabeleireiro cadastrado com sucesso!",
        redirect: "/home"
      });

    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro interno ao criar cabeleireiro." });
    }
  }

  //////

  static async listar(req, res) {
    try {
      const lista = await cabeleireiro.findAll();
      res.status(200).json(lista);
    } catch (erro) {
      res.status(500).json({erro: "Erro interno ao listar cabeleireiros." });
    }
  }

  //////

  static async buscar(req, res) {
    try {
      const {cpf} = req.params;
      const cab = await cabeleireiro.findByPk(cpf);

      if (!cab) return res.status(404).json({erro: "Cabeleireiro não encontrado."});
      res.status(200).json(cab);
    } catch (erro) {
      res.status(500).json({erro: "Erro interno ao buscar cabeleireiro."});
    }
  }

  //////

  static async deletar(req, res) {
    try {
      const { cpf } = req.params;
      const cab = await cabeleireiro.findByPk(cpf);

      if (!cab) return res.status(404).json({ erro: "Cabeleireiro não encontrado." });

      await cab.destroy();
      res.status(200).json({ mensagem: "Cabeleireiro removido com sucesso." });
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao deletar cabeleireiro." });
    }
  }
}

/////////////////////////////////////

export class Controle_Cliente {
  static async criar(req, res) {
    try {
      const { cpf_cliente, nome_cliente, rua, cep, celular } = req.body;

      if (!cpf_cliente || !nome_cliente) {
        return res.status(400).json({ erro: "CPF e nome são obrigatórios." });
      }

      const existente = await cliente.findByPk(cpf_cliente);

      if (existente) {
        return res.status(400).json({ erro: "Cliente já cadastrado." });
      }

      await cliente.create({
        cpf_cliente,
        nome_cliente,
        rua,
        cep,
        celular
      });

      return res.status(200).json({
        success_message: "Cliente cadastrado com sucesso!",
        redirect: "/home"
      });

    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro interno ao criar cliente." });
    }
  }

  //////

  static async listar(req, res) {
    try {
      const lista = await cliente.findAll({ order: [["nome_cliente", "ASC"]] });
      res.status(200).json(lista);
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao listar clientes." });
    }
  }

  //////

  static async buscar(req, res) {
    try {
      const { cpf } = req.params;
      const cli = await cliente.findByPk(cpf);

      if (!cli) return res.status(404).json({ erro: "Cliente não encontrado." });
      res.status(200).json(cli);
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao buscar cliente." });
    }
  }

  //////

  static async deletar(req, res) {
    try {
      const {cpf} = req.params;
      const cli = await cliente.findByPk(cpf);

      if (!cli) return res.status(404).json({ erro: "Cliente não encontrado." });

      await cli.destroy();
      res.status(200).json({ mensagem: "Cliente removido com sucesso." });
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao deletar cliente." });
    }
  }
}

/////////////////////////////////////

export class Controle_Servico {
  static async criar(req, res) {
    try {
      const { data_servico, pagamento, cpf_cabeleireiro, cpf_cliente } = req.body;
      const cab = await cabeleireiro.findByPk(cpf_cabeleireiro);
      const cli = await cliente.findByPk(cpf_cliente);

      if (!cab) return res.status(404).json({ erro: "Cabeleireiro não encontrado." });
      if (!cli) return res.status(404).json({ erro: "Cliente não encontrado." });

      const novo_servico = await servico.create({ data_servico, pagamento, cpf_cabeleireiro, cpf_cliente });
      res.status(201).json(novo_servico);
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao criar serviço." });
    }
  }

  //////

  static async listar(req, res) {
    try {
      const lista = await servico.findAll({
        include: [
          {model: cabeleireiro, attributes: ["nome_cabeleireiro", "especializacao"] },
          {model: cliente, attributes: ["nome_cliente"] },
        ],
        order: [["data_servico", "DESC"]],
      });
      res.status(200).json(lista);
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao listar serviços." });
    }
  }

  //////

  static async buscar(req, res) {
    try {
      const { id } = req.params;
      const serv = await servico.findByPk(id, {
        include: [
          { model: cabeleireiro, attributes: ["nome_cabeleireiro"] },
          { model: cliente, attributes: ["nome_cliente"] },
        ],
      });

      if (!serv) return res.status(404).json({ erro: "Serviço não encontrado." });
      res.status(200).json(serv);
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao buscar serviço." });
    }
  }

  //////

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const serv = await servico.findByPk(id);

      if (!serv) return res.status(404).json({ erro: "Serviço não encontrado." });

      await serv.destroy();
      res.status(200).json({ mensagem: "Serviço deletado com sucesso." });
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao deletar serviço." });
    }
  }
}

/////////////////////////////////////

export class Controle_Equipamento {
  static async criar(req, res) {
    try {
      const {descricao, nome_maquina } = req.body;
      if (!descricao || !nome_maquina)
        return res.status(400).json({ erro: "Campos obrigatórios ausentes." });

      const novo = await equipamento.create({ descricao, nome_maquina });
      res.status(201).json(novo);
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao criar equipamento." });
    }
  }

  //////

  static async listar(req, res) {
    try {
      const lista = await equipamento.findAll();
      res.status(200).json(lista);
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao listar equipamentos." });
    }
  }

  //////

  static async buscar(req, res) {
    try {
      const { id } = req.params;
      const e = await equipamento.findByPk(id);
      if (!e) return res.status(404).json({ erro: "Equipamento não encontrado." });

      res.status(200).json(e);
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao buscar equipamento." });
    }
  }

  //////

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const e = await equipamento.findByPk(id);

      if (!e) return res.status(404).json({ erro: "Equipamento não encontrado." });

      await e.destroy();
      res.status(200).json({ mensagem: "Equipamento removido com sucesso." });
    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao deletar equipamento." });
    }
  }
}

/////////////////////////////////////

export class Controle_Usuario {

  static async criar(req, res) {
    try {
      const { nome_usuario, senha, tipo} = req.body;

      if (!nome_usuario || !senha || !tipo) {
        return res.status(400).json({ erro: "Usuário e senha são obrigatórios." });
      }

      const existente = await usuario.findOne({
        where: { nome_usuario }
      });

      if (existente) {
        return res.status(400).json({ erro: "Usuário já cadastrado." });
      }

      await usuario.create({
        nome_usuario,
        senha,
        tipo
      });

      return res.status(200).json({
        success_message: "Usuário criado com sucesso!"
      });

    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ erro: "Erro interno ao criar usuário." });
    }
  }

  static async login(req, res) {
    try {
      const { nome_usuario, senha } = req.body;

      if (!nome_usuario || !senha) {
        return res.status(400).json({ erro: "Usuário e senha obrigatórios." });
      }

      const u = await usuario.findOne({
        where: { nome_usuario, senha }
      });

      if (!u) {
        return res.status(401).json({ erro: "Usuário ou senha inválidos." });
      }

      let redirect = "";

      if (u.tipo === "admim") {
        redirect = "/admim";
      }

      if (u.tipo === "cliente") {
        redirect = "/home_cliente";
      }

      if (u.tipo === "funcionario") {
        redirect = "/home_funcionario";
      }

      return res.status(200).json({
        success_message: "Login realizado com sucesso!",
        tipo: u.tipo,
        redirect
      });

    } catch (erro) {
      console.error(erro);
      res.status(500).json({ erro: "Erro interno no login." });
    }
  }

  
  static async buscar(req, res) {
    try {
      const { id } = req.params;

      const u = await usuario.findByPk(id, {
        attributes: ["id_usuario", "nome_usuario", "tipo"]
      });

      if (!u) {
        return res.status(404).json({ erro: "Usuário não encontrado." });
      }

      res.status(200).json(u);

    } catch (erro) {
      res.status(500).json({ erro: "Erro interno ao buscar usuário." });
    }
  }
}




