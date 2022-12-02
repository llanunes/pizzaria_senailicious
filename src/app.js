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
import { MESSAGE_ERROR, MESSAGE_SUCESS } from './modulo/config.js';

import controllerProduto from './controller/controllerProduto.js';

const app = express();

app.use(express.json(), cors());

// EndPoint para listar todos os produtos 
app.get('/v1/produtos', cors(), async (request, response) => {

  let message;
  let statusCode;
  
  // Retorna todos os alunos existentes do BD
  const dadosProduto = await controllerProduto.listarProdutos();
  
  // valida se existe retorno 
  if(dadosProduto){
      statusCode = 200;
      console.log(dadosProduto);
      message = dadosProduto;
  } else {
      statusCode = 404; 
      message = MESSAGE_ERROR.NOT_FOUND_BD;
  }

  response.status(statusCode);
  response.json(message);
});


app.listen(8080, () => {
  console.log('Server listening at port 8080...');
});
