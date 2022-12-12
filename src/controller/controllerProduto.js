/* eslint-disable import/extensions */
/** ************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 24-11-2022
* Data modificação: 01/12/2022
************************************************************************************************* */

import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../module/config.js';
import produtoDao from '../model/DAO/produtos.js';

const listarProdutos = async () => {
  const produto = await produtoDao.selectAllProdutos();

  if (produto) {
    const response = produto.map((item) => {
      const tipo = { id: item.id_tipo_produto, nome: item.tipo_produto };

      delete item.id_tipo_produto;
      delete item.tipo_produto;

      item.tipo = tipo;
      return item;
    });

    return response;
  }
  return false;
};

const buscarProduto = async (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosProduto = await produtoDao.selectByIdProduto(id);

  console.log(dadosProduto);

  if (dadosProduto) {
    const tipo = { id: dadosProduto.id_tipo_produto, nome: dadosProduto.tipo_produto };

    delete dadosProduto.id_tipo_produto;
    delete dadosProduto.tipo_produto;
    dadosProduto.tipo = tipo;

    return dadosProduto;
  }
  return false;
};

const novoProduto = async (produto) => {
  if (produto.nome === '' || produto.imagem === '' || produto.tamanho === '' || produto.preco === '' || produto.desconto === '' || produto.id_tipo_produto === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  const result = await produtoDao.insertProduto(produto);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const deletarProduto = (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const produto = buscarProduto(id);
  if (produto) {
    const result = produtoDao.deleteProduto(id);

    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  }
  return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
};

const atualizarProduto = (produto) => {
  if (produto.id === '' || produto.id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  if (produto.nome === '' || produto.imagem === '' || produto.tamanho === '' || produto.preco === '' || produto.desconto === undefined || produto.id_tipo_produto === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }

  const result = produtoDao.updateProduto(produto);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const controllerProduto = {
  listarProdutos,
  novoProduto,
  deletarProduto,
  atualizarProduto,
  buscarProduto,
};

export default controllerProduto;
