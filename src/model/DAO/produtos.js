/* eslint-disable import/extensions */
/**
 *
 * Documentation - EN
 *
 * Objective: File responsible for handling data with the DB (insert, update, delete and select)
 * Authors: Larissa Nunes Vaz Alves de Oliveira, Matheus Alves de Oliveira
 * Version: 2.0.22
 * Creation date: 17/11/2022
 * Modification date: 07/12/2022s
 *
 * ------------------------------------------------------------------------------
 *
 * Documentação - PT-br
 *
 * Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
 * Autores: Larissa Nunes Vaz Alves de Oliveira, Matheus Alves de Oliveira
 * Versão: 2.0.22
 * Data de Criação: 17/11/2022
 * Data de Modificação: 07/12/2022
 *
 */

import { prisma } from '../utils/prisma-instance.js';

const insertProduto = async (produto) => {
  try {
    const sql = `INSERT INTO tbl_produto (
        nome,
        imagem,
        tamanho, 
        preco, 
        desconto, 
        id_tipo_produto
        )
        VALUES (
            '${produto.nome}',
            '${produto.imagem}',
            '${produto.tamanho}',
            '${produto.preco}',
            ${produto.desconto},
            '${produto.id_tipo_produto}'
            )`;
    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const updateProduto = async (produto) => {
  try {
    const sql = `UPDATE tbl_produto SET
            nome = '${produto.nome}',
            imagem = '${produto.imagem}',
            tamanho = '${produto.tamanho}', 
            preco = '${produto.preco}', 
            desconto = ${produto.desconto}
         
         WHERE id = ${produto.id};`;

         console.log(sql);

    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const deleteProduto = async (id) => {
  try {
    const sql = `delete from tbl_produto 
        where id = '${id}'`;

    const result = await prisma.$executeRawUnsafe(sql);
    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const selectAllProdutos = async () => {
  const sql = `select cast(id as float) as 
        id, 
        nome, 
        imagem, 
        tamanho, 
        preco, 
        desconto, 
        id_tipo_produto
    from tbl_produto order by id desc`;

  const rsProdutos = await prisma.$queryRawUnsafe(sql);

  if (rsProdutos.length > 0) {
    return rsProdutos;
  }
  return false;
};

const selectByIdProduto = async (id) => {
  const sql = `select cast(id as float) as 
        id, 
        nome, 
        imagem, 
        tamanho, 
        preco, 
        desconto, 
        id_tipo_produto 
    from tbl_produto where id = ${id}`;

  const rsProdutos = await prisma.$queryRawUnsafe(sql);

  if (rsProdutos.length > 0) {
    return rsProdutos[0];
  }
  return false;
};

export default {
  updateProduto,
  deleteProduto,
  selectAllProdutos,
  insertProduto,
  selectByIdProduto,
};
