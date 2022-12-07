/** ************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes
* Versão: 1.0
* Data criação: 06/10/2022
* Data modificação: 01/12/2022
************************************************************************************************* */

import { PrismaClient } from '@prisma/client';

const insertIngrediente = async (ingrediente) => {
  try {
    const prisma = new PrismaClient();

    const sql = `insert into tbl_ingrediente (
            nome
        )
        values (
            '${ingrediente.nome}'
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

const updateIngrediente = async (ingrediente) => {
  try {
    const prisma = new PrismaClient();

    const sql = `update tbl_ingrediente set
         nome = '${ingrediente.nome}',
         
         where id = '${ingrediente.id}'`;

    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const deleteIngrediente = async (id) => {
  try {
    const prisma = new PrismaClient();

    const sql = `delete from tbl_ingrediente 
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

const selectAllIngredientes = async () => {
  const prisma = new PrismaClient();

  const sql = `select cast(id as float) as 
            id, 
            nome
    from tbl_ingrediente order by id desc`;

  const rsIngredientes = await prisma.$queryRawUnsafe(sql);

  if (rsIngredientes.length > 0) {
    return rsIngredientes;
  }
  return false;
};

const selectByIdIngrediente = async (id) => {
  const prisma = new PrismaClient();

  const sql = `select cast(id as float) as 
            id, 
            nome 
        from tbl_ingrediente where id = ${id}`;

  const rsIngredientes = await prisma.$queryRawUnsafe(sql);

  if (rsIngredientes.length > 0) {
    return rsIngredientes.length;
  }
  return false;
};

export default {
  updateIngrediente,
  deleteIngrediente,
  selectAllIngredientes,
  insertIngrediente,
  selectByIdIngrediente,
};
