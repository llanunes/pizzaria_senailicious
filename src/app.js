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
// import controllerAdministrador from './controller/controllerAdministrador';

const app = express();

app.use(express.json(), cors());

// ##########################################  END POINT PARA PRODUTOS ###############################################

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


app.post('/v1/produto', cors(), async (request, response) => {
  let statusCode;
  let message;
  let headerContentType;

  // recebe o tipo de content type que foi enviado no header da requisição
  // application/json
  headerContentType = request.headers['content-type']

      // validar se o content-type é do tipo json
  if (headerContentType == 'application/json'){
      let dadosBody = request.body

      // Realiza um processo de conversão de dados para conseguir comparar o json vazio
      if(JSON.stringify (dadosBody) != "{}"){

          // chama a função novoProduto da controller e encaminha os dados do body
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

// endpoint para atualizar um produto existente
app.put('/v1/produto/:id', cors(), async (request, response) => {
  let statusCode;
  let message;
  let headerContentType;

  // recebe o tipo de content type que foi enviado no header da requisição
  // application/json
  headerContentType = request.headers['content-type']

      // validar se o content-type é do tipo json
  if (headerContentType == 'application/json'){
      let dadosBody = request.body;

      // Realiza um processo de conversão de dados para conseguir comparar o json vazio
      if(JSON.stringify (dadosBody) != "{}"){

          // recebe id enviado por parametro na requisição
          let id = request.params.id;

          // validacao do ID na requisição 
          if (id != '' && id != undefined){

              // adiciona o id no JSON que chegou no corpo da requisição
              dadosBody.id = id;

              // chama a função novoAluno da controller e encaminha os dados do body
              const novoProduto = controllerProduto.atualizarProduto(dadosBody);

          statusCode = novoProduto.status;
          message = novoProduto.message;
          } else {
              statusCode =  400 ;
              message = MESSAGE_ERROR.REQUIRED_ID
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
  let id = request.params.id

  if (id != '' && id != undefined){
      
      // chama a função para excluir um item
      const deletarProduto = controllerProduto.deletarProduto(id);

      statusCode = deletarProduto.status;
      message = deletarProduto.message;
  } else {
      statusCode = 400;
      message = MESSAGE_ERROR.REQUIRED_ID
  }
 response.status(statusCode);
 response.json(message);
});

app.get('/v1/produto/:id', cors(), async (request, response) => {
    let message;
    let statusCode;
    let id = request.params.id;
    
    if (id != '' && id != undefined){
        
        // Retorna todos os alunos existentes do BD
        const dadosProduto = await controllerProduto.buscarProduto(id);
        
        // valida se existe retorno 
            if(dadosProduto){

                statusCode = 200;
                message = dadosAluno;

            } else {
                statusCode = 400;
                message = MESSAGE_ERROR.REQUIRED_ID
            }
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


