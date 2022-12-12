/* eslint-disable import/extensions */
/**
 *
 * Documentation - EN
 *
 * Objective: Create an API to consume the database and manipulate informations
 * Authors: Larissa Nunes Vaz Alves de Oliveira, Matheus Alves de Oliveira
 * Version: 1.0.22
 * Creation date: 17/11/2022
 * Modification date: 01/12/2022
 *
 * ------------------------------------------------------------------------------
 *
 * Documentação - PT-br
 *
 * Objetivo: Criar uma API para consumir o banco de dados e manipular informações
 * Autores: Larissa Nunes Vaz Alves de Oliveira, Matheus Alves de Oliveira
 * Versão: 1.0.22
 * Data de Criação: 17/11/2022
 * Data de Modificação: 01/12/2022
 *
 */

import express from 'express';
import cors from 'cors';
import { MESSAGE_ERROR } from './module/config.js';
import controllerProduto from './controller/controllerProduto.js';
import controllerIngredientes from './controller/controllerIngredientes.js';
import controllerAdministrador from './controller/controllerAdministrador.js';
import controllerCategoria from './controller/controllerCategoria.js';
import controllerMensagem from './controller/controllerMensagem.js';
import { createJwt } from './middlewares/jwt.js';
import verificarLoginAdmin from './middlewares/verificarLoginAdmin.js';

const app = express();

app.use(express.json(), cors());

// ########################## ENDPOINTS PARA PRODUTOS ##########################

app.get('/v1/produtos', cors(), async (request, response) => {
  let message;
  let statusCode;

  const dadosProduto = await controllerProduto.listarProdutos();

  if (dadosProduto) {
    statusCode = 200;
    message = { produtos: dadosProduto };
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_BD;
  }

  response.status(statusCode);
  response.json(message);
});

app.get('/v1/produto/:id', cors(), async (request, response) => {
  let message;
  let statusCode;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const dadosProduto = await controllerProduto.buscarProduto(id);

    if (dadosProduto) {
      statusCode = 200;
      message = { produto: dadosProduto };
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.NOT_FOUND_BD;
    }
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }

  response.status(statusCode);
  response.json(message);
});

app.post('/v1/produto', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const novoProduto = await controllerProduto.novoProduto(dadosBody);

      statusCode = novoProduto.status;
      message = novoProduto.message;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode);
  response.json(message);
});

app.put('/v1/produto/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const { id } = request.params;

      if (id !== '' && id !== undefined) {
        dadosBody.id = id;

        const novoProduto = await controllerProduto.atualizarProduto(dadosBody);

        statusCode = novoProduto.status;
        message = novoProduto.message;
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
      }
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode);
  response.json(message);
});

app.delete('/v1/produto/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const deletarProduto = await controllerProduto.deletarProduto(id);

    statusCode = deletarProduto.status;
    message = deletarProduto.message;
  } else {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }
  response.status(statusCode);
  response.json(message);
});

// ########################## ENDPOINTS PARA INGREDIENTES ##########################

app.get('/v1/ingredientes', cors(), async (request, response) => {
  let message;
  let statusCode;

  const dadosIngrediente = await controllerIngredientes.listarIngredientes();

  if (dadosIngrediente) {
    statusCode = 200;
    message = { ingredientes: dadosIngrediente };
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_BD;
  }
  response.status(statusCode);
  response.json(message);
});

app.get('/v1/ingrediente/:id', cors(), async (request, response) => {
  let message;
  let statusCode;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const dadosIngrediente = await controllerIngredientes.buscarIngrediente(id);

    if (dadosIngrediente) {
      statusCode = 200;
      message = dadosIngrediente;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.NOT_FOUND_BD;
    }
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.INTERNAL_ERROR_DB;
  }

  response.status(statusCode);
  response.json(message);
});

app.post('/v1/ingrediente', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const novoIngrediente = await controllerIngredientes.novoIngrediente(dadosBody);

      statusCode = novoIngrediente.status;
      message = novoIngrediente.message;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode);
  response.json(message);
});

app.put('/v1/ingrediente/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const { id } = request.params;

      if (id !== '' && id !== undefined) {
        dadosBody.id = id;

        const novoIngrediente = await controllerIngredientes.atualizarIngrediente(dadosBody);

        statusCode = novoIngrediente.status;
        message = novoIngrediente.message;
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
      }
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode);
  response.json(message);
});

app.delete('/v1/ingrediente/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const deletarIngrediente = await controllerIngredientes.deletarIngrediente(id);

    statusCode = deletarIngrediente.status;
    message = deletarIngrediente.message;
  } else {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }
  response.status(statusCode).json(message);
});

// ########################## ENDPOINTS PARA ADMINISTRADORES ##########################

app.get('/v1/administradores', cors(), async (request, response) => {
  let message;
  let statusCode;

  // Retorna todos os administradores existentes do BD
  const dadosAdministrador = await controllerAdministrador.listarAdministradores();

  // valida se existe retorno
  if (dadosAdministrador) {
    statusCode = 200;
    message = dadosAdministrador;
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_BD;
  }
  response.status(statusCode).json(message);
});

app.get('/v1/administrador/:id', cors(), async (request, response) => {
  let message;
  let statusCode;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const dadosAdministrador = await controllerAdministrador.buscarAdministrador(id);

    if (dadosAdministrador) {
      statusCode = 200;
      message = dadosAdministrador;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.REQUIRED_ID;
    }
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_BD;
  }

  response.status(statusCode);
  response.json(message);
});

app.post('/v1/administrador', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const novoAdministrador = await controllerAdministrador.novoAdministrador(dadosBody);

      statusCode = novoAdministrador.status;
      message = novoAdministrador.message;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode);
  response.json(message);
});

app.put('/v1/administrador/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const { id } = request.params;

      if (id !== '' && id !== undefined) {
        dadosBody.id = id;

        const novoAdministrador = controllerAdministrador.atualizarAdministrador(dadosBody);

        statusCode = novoAdministrador.status;
        message = novoAdministrador.message;
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
      }
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode);
  response.json(message);
});

app.delete('/v1/administrador/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const deletarAdministrador = controllerAdministrador.deletarAdministrador(id);

    statusCode = deletarAdministrador.status;
    message = deletarAdministrador.message;
  } else {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }
  response.status(statusCode);
  response.json(message);
});

// ########################## ENDPOINT PARA AUTENTICAÇÃO ##########################

app.post('/v1/login/admin', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const adminInfos = request.body;
    if (await verificarLoginAdmin(adminInfos)) {
      const createJwtResponse = createJwt(adminInfos);

      statusCode = createJwtResponse.status;
      message = createJwtResponse.response;

      response.status(statusCode).json({ data: message });
    } else {
      response.status(404).json({ message: 'Não achamos registros no banco' });
    }
  }
});

// ########################## ENDPOINTS PARA MENSAGENS ##########################

app.get('/v1/mensagens', cors(), async (request, response) => {
  let message;
  let statusCode;

  const dadosMensagens = await controllerMensagem.listarMensagens();

  if (dadosMensagens) {
    statusCode = 200;
    message = dadosMensagens;
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_BD;
  }

  response.status(statusCode);
  response.json(message);
});

app.get('/v1/mensagem/:id', cors(), async (request, response) => {
  let message;
  let statusCode;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const dadosMensagens = await controllerMensagem.buscarMensagem(id);

    if (dadosMensagens) {
      statusCode = 200;
      message = dadosMensagens;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.REQUIRED_ID;
    }
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_BD;
  }

  response.status(statusCode);
  response.json(message);
});

app.post('/v1/mensagem', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const novaMensagem = await controllerMensagem.novaMensagem(dadosBody);

      statusCode = novaMensagem.status;
      message = novaMensagem.message;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode).json(message);
});

app.put('/v1/mensagem/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const { id } = request.params;

      if (id !== '' && id !== undefined) {
        dadosBody.id = id;

        const novaMensagem = await controllerMensagem.atualizarMensagem(dadosBody);

        statusCode = novaMensagem.status;
        message = novaMensagem.message;
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
      }
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode);
  response.json(message);
});

app.delete('/v1/mensagem/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const deletarMensagem = await controllerMensagem.deletarMensagem(id);

    statusCode = deletarMensagem.status;
    message = deletarMensagem.message;
  } else {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }
  response.status(statusCode);
  response.json(message);
});

// TIPO PRODUTO

app.get('/v1/tipoproduto/:id', cors(), async (request, response) => {
  let message;
  let statusCode;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const dadosTipoProduto = await controllerCategoria.buscarTipoProduto(id);

    if (dadosTipoProduto) {
      statusCode = 200;
      message = dadosTipoProduto;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.NOT_FOUND_BD;
    }
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }

  response.status(statusCode);
  response.json(message);
});

app.get('/v1/tipoprodutos', cors(), async (request, response) => {
  let message;
  let statusCode;

  const dadosTipoProdutos = await controllerCategoria.listarTiposProdutos();

  if (dadosTipoProdutos) {
    statusCode = 200;
    message = dadosTipoProdutos;
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_BD;
  }

  response.status(statusCode);
  response.json(message);
});

app.delete('/v1/tipoproduto/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const deletarTipoProduto = controllerCategoria.deletarTipoProduto(id);

    statusCode = deletarTipoProduto.status;
    message = deletarTipoProduto.message;
  } else {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }
  response.status(statusCode);
  response.json(message);
});

app.post('/v1/tipoproduto', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const novoTipoProduto = await controllerCategoria.novoTipoProduto(dadosBody);

      statusCode = novoTipoProduto.status;
      message = novoTipoProduto.message;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode).json(message);
});

app.put('/v1/tipoproduto/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const { id } = request.params;

      if (id !== '' && id !== undefined) {
        dadosBody.id = id;

        const novoTipoProduto = await controllerCategoria.atualizarTipoProduto(dadosBody);

        statusCode = novoTipoProduto.status;
        message = novoTipoProduto.message;
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
      }
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode);
  response.json(message);
});

// ###################

app.get('/v1/tipopizza/:id', cors(), async (request, response) => {
  let message;
  let statusCode;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const dadosTipoPizza = await controllerCategoria.buscarTipoPizza(id);

    if (dadosTipoPizza) {
      statusCode = 200;
      message = dadosTipoPizza;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.NOT_FOUND_BD;
    }
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }

  response.status(statusCode);
  response.json(message);
});

app.get('/v1/tipopizzas', cors(), async (request, response) => {
  let message;
  let statusCode;

  const dadosTipoPizzas = await controllerCategoria.listarTiposPizzas();

  if (dadosTipoPizzas) {
    statusCode = 200;
    message = dadosTipoPizzas;
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_BD;
  }

  response.status(statusCode);
  response.json(message);
});

app.delete('/v1/tipopizza/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const deletarTipoPizza = controllerCategoria.deletarTipoPizza(id);

    statusCode = deletarTipoPizza.status;
    message = deletarTipoPizza.message;
  } else {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }
  response.status(statusCode);
  response.json(message);
});

app.post('/v1/tipopizza', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const novoTipoPizza = await controllerCategoria.novoTipoPizza(dadosBody);

      statusCode = novoTipoPizza.status;
      message = novoTipoPizza.message;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode).json(message);
});

app.put('/v1/tipopizza/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const { id } = request.params;

      if (id !== '' && id !== undefined) {
        dadosBody.id = id;

        const novoTipoPizza = await controllerCategoria.atualizarTipoPizza(dadosBody);

        statusCode = novoTipoPizza.status;
        message = novoTipoPizza.message;
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
      }
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode);
  response.json(message);
});

// ###################################

app.get('/v1/tipobebida/:id', cors(), async (request, response) => {
  let message;
  let statusCode;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const dadosTipoBebida = await controllerCategoria.buscarTipoBebida(id);

    if (dadosTipoBebida) {
      statusCode = 200;
      message = dadosTipoBebida;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.NOT_FOUND_BD;
    }
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }

  response.status(statusCode);
  response.json(message);
});

app.get('/v1/tipobebidas', cors(), async (request, response) => {
  let message;
  let statusCode;

  const dadosTipoBebidas = await controllerCategoria.listarTiposBebidas();

  if (dadosTipoBebidas) {
    statusCode = 200;
    message = dadosTipoBebidas;
  } else {
    statusCode = 404;
    message = MESSAGE_ERROR.NOT_FOUND_BD;
  }

  response.status(statusCode);
  response.json(message);
});

app.delete('/v1/tipobebida/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const { id } = request.params;

  if (id !== '' && id !== undefined) {
    const deletarTipoBebida = controllerCategoria.deletarTipoBebida(id);

    statusCode = deletarTipoBebida.status;
    message = deletarTipoBebida.message;
  } else {
    statusCode = 400;
    message = MESSAGE_ERROR.REQUIRED_ID;
  }
  response.status(statusCode);
  response.json(message);
});

app.post('/v1/tipobebida', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const novoTipoBebida = await controllerCategoria.novoTipoBebida(dadosBody);

      statusCode = novoTipoBebida.status;
      message = novoTipoBebida.message;
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode).json(message);
});

app.put('/v1/tipobebida/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  const headerContentType = request.headers['content-type'];

  if (headerContentType === 'application/json') {
    const dadosBody = request.body;

    if (JSON.stringify(dadosBody) !== '{}') {
      const { id } = request.params;

      if (id !== '' && id !== undefined) {
        dadosBody.id = id;

        const novoTipoBebida = await controllerCategoria.atualizarTipoBebida(dadosBody);

        statusCode = novoTipoBebida.status;
        message = novoTipoBebida.message;
      } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID;
      }
    } else {
      statusCode = 400;
      message = MESSAGE_ERROR.EMPTY_BODY;
    }
  } else {
    statusCode = 415;
    message = MESSAGE_ERROR.CONTENT_TYPE;
  }

  response.status(statusCode);
  response.json(message);
});

app.listen(8080, () => {
  // eslint-disable-next-line no-console
  console.log('Server listening at port 8080...');
});
