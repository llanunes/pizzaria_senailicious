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
import controllerIngredientes from './controller/controllerIngredientes.js';
import controllerAdministrador from './controller/controllerAdministrador.js';
import controllerMensagem from './controller/controllerMensagem.js';

const app = express();

app.use(express.json(), cors());

// ###########################################################  END POINT PARA PRODUTOS ########################################################

// EndPoint para listar todos os produtos 
app.get('/v1/produtos', cors(), async (request, response) => {

  let message;
  let statusCode;
  
  // Retorna todos os produtos existentes do BD
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

// anpoint para buscar um produto através do id
app.get('/v1/produto/:id', cors(), async (request, response) => {
    let message;
    let statusCode;
    let id = request.params.id;
    
    if (id != '' && id != undefined){
        
        // Retorna todos os produtos existentes do BD
        const dadosProduto = await controllerProduto.buscarProduto(id);
        
        // valida se existe retorno 
            if(dadosProduto){

                statusCode = 200;
                message = dadosProduto;

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

// #################################################### ENDPOINTS PARA INGREDIENTES ###############################################################

// EndPoint para listar todos os ingredientes 
app.get('/v1/ingredientes', cors(), async (request, response) => {

    let message;
    let statusCode;
    
    // Retorna todos os ingredientes existentes do BD
    const dadosIngrediente = await controllerIngredientes.listarIngredientes();
    
    // valida se existe retorno 
    if(dadosIngrediente){
        statusCode = 200;
        message = dadosIngrediente;
    } else {
        statusCode = 404; 
        message = MESSAGE_ERROR.NOT_FOUND_BD;
    }
    response.status(statusCode);
    response.json(message);
  });
  
  
  app.post('/v1/ingrediente', cors(), async (request, response) => {
    let statusCode;
    let message;
    let headerContentType;
  
    headerContentType = request.headers['content-type']
  
    if (headerContentType == 'application/json'){
        let dadosBody = request.body
  
        if(JSON.stringify (dadosBody) != "{}"){
  
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
  
  // endpoint para atualizar um ingrediente existente
  app.put('/v1/ingrediente/:id', cors(), async (request, response) => {
    let statusCode;
    let message;
    let headerContentType;
  
    headerContentType = request.headers['content-type']
  
    if (headerContentType == 'application/json'){
        let dadosBody = request.body;
  
        if(JSON.stringify (dadosBody) != "{}"){
  
            let id = request.params.id;
  
            if (id != '' && id != undefined){
  
                dadosBody.id = id;
  
                const novoIngrediente = controllerIngredientes.atualizarIngrediente(dadosBody);
  
            statusCode = novoIngrediente.status;
            message = novoIngrediente.message;
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
  
  app.delete('/v1/ingrediente/:id', cors(), async (request, response) => {
    let statusCode;
    let message;
    let id = request.params.id
  
    if (id != '' && id != undefined){
        
        const deletarIngrediente = controllerIngredientes.deletarIngrediente(id);
  
        statusCode = deletarIngrediente.status;
        message = deletarIngrediente.message;
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID
    }
   response.status(statusCode);
   response.json(message);
  });
  
  // buscar ingrediente pelo id
  app.get('/v1/ingrediente/:id', cors(), async (request, response) => {
      let message;
      let statusCode;
      let id = request.params.id;
      
      if (id != '' && id != undefined){
          
          const dadosIngrediente = await controllerIngredientes.buscarIngrediente(id);
          
              if(dadosIngrediente){
  
                  statusCode = 200;
                  message = dadosIngrediente;
  
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
  

// #################################################### ENDPOINTS PARA ADMINISTRADORES ###############################################################

// EndPoint para listar todos os administradores 
app.get('/v1/administradores', cors(), async (request, response) => {

    let message;
    let statusCode;
    
    // Retorna todos os administradores existentes do BD
    const dadosAdministrador = await controllerAdministrador.listarAdministradores();
    
    // valida se existe retorno 
    if(dadosAdministrador){
        statusCode = 200;
        message = dadosAdministrador;
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
    let headerContentType;
  
    headerContentType = request.headers['content-type']
  
    if (headerContentType == 'application/json'){
        let dadosBody = request.body
  
        if(JSON.stringify (dadosBody) != "{}"){
  
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
  
  // endpoint para atualizar um administrador existente
  app.put('/v1/administrador/:id', cors(), async (request, response) => {
    let statusCode;
    let message;
    let headerContentType;
  
    headerContentType = request.headers['content-type']
  
    if (headerContentType == 'application/json'){
        let dadosBody = request.body;
  
        if(JSON.stringify (dadosBody) != "{}"){
  
            let id = request.params.id;
  
            if (id != '' && id != undefined){
  
                dadosBody.id = id;
  
                const novoAdministrador = controllerAdministrador.atualizarAdministrador(dadosBody);
  
            statusCode = novoAdministrador.status;
            message = novoAdministrador.message;
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
  
  app.delete('/v1/admministrador/:id', cors(), async (request, response) => {
    let statusCode;
    let message;
    let id = request.params.id
  
    if (id != '' && id != undefined){
        
        const deletarAdministrador = controllerAdministrador.deletarAdministrador(id);
  
        statusCode = deletarAdministrador.status;
        message = deletarAdministrador.message;
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID
    }
   response.status(statusCode);
   response.json(message);
  });
  
  app.get('/v1/administrador/:id', cors(), async (request, response) => {
      let message;
      let statusCode;
      let id = request.params.id;
      
      if (id != '' && id != undefined){
          
          const dadosAdministrador = await controllerAdministrador.buscarAdministrador(id);
          
              if(dadosAdministrador){
  
                  statusCode = 200;
                  message = dadosAdministrador;
  
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

  // ANDPOINT PARA AUTENTICAÇÃO
  // usuario e senha - n fazer get, fazer post
  

// ###########################################################  END POINT PARA MENSAGENS ########################################################

// EndPoint para listar todas as mensagens
app.get('/v1/mensagens', cors(), async (request, response) => {

    let message;
    let statusCode;
    
    // Retorna todos os produtos existentes do BD
    const dadosMensagens = await controllerMensagem.listarMensagens();
    
    // valida se existe retorno 
    if(dadosMensagens){
        statusCode = 200;
        message = dadosMensagens;
    } else {
        statusCode = 404; 
        message = MESSAGE_ERROR.NOT_FOUND_BD;
    }
  
    response.status(statusCode);
    response.json(message);
  });
  
  // andpoint para inserir uma nova mensagem
  app.post('/v1/mensagem', cors(), async (request, response) => {
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
  
    response.status(statusCode);
    response.json(message);
  
  });
  
  // endpoint para atualizar uma mensagem existente
  app.put('/v1/mensagem/:id', cors(), async (request, response) => {
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
                const novaMensagem = controllerMensagem.atualizarMensagem(dadosBody);
  
            statusCode = novaMensagem.status;
            message = novaMensagem.message;
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
  
  // andpoint para deletar uma mensagem
  app.delete('/v1/mensagem/:id', cors(), async (request, response) => {
    let statusCode;
    let message;
    let id = request.params.id
  
    if (id != '' && id != undefined){
        
        // chama a função para excluir um item
        const deletarMensagem = controllerMensagem.deletarMensagem(id);
  
        statusCode = deletarMensagem.status;
        message = deletarMensagem.message;
    } else {
        statusCode = 400;
        message = MESSAGE_ERROR.REQUIRED_ID
    }
   response.status(statusCode);
   response.json(message);
  });
  
  // anpoint para buscar um produto através do id
  app.get('/v1/mensagem/:id', cors(), async (request, response) => {
      let message;
      let statusCode;
      let id = request.params.id;
      
      if (id != '' && id != undefined){
          
          // Retorna todos os produtos existentes do BD
          const dadosMensagens = await controllerMensagem.buscarMensagem(id);
          
          // valida se existe retorno 
              if(dadosMensagens){
  
                  statusCode = 200;
                  message = dadosMensagens;
  
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


