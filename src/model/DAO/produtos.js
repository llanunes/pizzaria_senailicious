/** ************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 06/10/2022
* Data modificação: 01/12/2022
************************************************************************************************* */

import { PrismaClient } from '@prisma/client';

const insertProduto = async (produto) => {
  try {
    const prisma = new PrismaClient();

    const sql = `insert into tbl_produto (
        nome,
        imagem,
        tamanho, 
        preco, 
        desconto, 
        id_tipo_produto
        )
        values (
            '${produto.nome}',
            '${produto.imagem}',
            '${produto.tamanho}',
            '${produto.preco}',
            '${produto.desconto}',
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
    const prisma = new PrismaClient();

    const sql = `update tbl_produto set
            nome = '${produto.nome}',
            imagem = '${produto.imagem}',
            tamanho = '${produto.tamanho}', 
            preco = '${produto.preco}', 
            desconto = '${produto.desconto}',
         
         where id = '${produto.id}'`;

    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const deleteProduto = async (id) => {
  try {
    const prisma = new PrismaClient();

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
  const prisma = new PrismaClient();

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
  const prisma = new PrismaClient();

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
    return rsProdutos.length;
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
