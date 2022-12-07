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

const buscarProduto = async (id) => {
  const dadosProdutoJSON = {};

  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosProduto = await produtoDao.selectByIdProduto(id);

  if (dadosProduto) {
    dadosProdutoJSON.produto = dadosProduto;
    return dadosProdutoJSON;
  }
  return false;
};

const novoProduto = async (produto) => {
  if (produto.nome === '' || produto.imagem === '' || produto.tamanho === '' || produto.preco === '' || produto.desconto === null || produto.id_tipo_produto === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  const novoProduto = await produtoDao.insertProduto(produto);
  const result = novoProduto;

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
    const deleteProduto = produtoDao.deleteProduto(id);
    const result = deleteProduto;

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
  if (produto.nome === '' || produto.imagem === '' || produto.tamanho === '' || produto.preco === '' || produto.desconto === null || produto.id_tipo_produto === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }

  const atualizarProduto = produtoDao.updateProduto(produto);
  const result = atualizarProduto;

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const listarProdutos = async () => {
  const produto = await produtoDao.selectAllProdutos();

  if (produto) {
    return produto;
  }
  return false;
};

const controllerProduto = {
  listarProdutos,
  novoProduto,
  deletarProduto,
  atualizarProduto,
  buscarProduto,
};

export default controllerProduto;
