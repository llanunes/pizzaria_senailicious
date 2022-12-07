/* eslint-disable import/extensions */
/**
 *
 * Documentation - EN
 *
 * Objective: File responsible for handling data with the DB (insert, update, delete and select)
 * Authors: Larissa Nunes Vaz Alves de Oliveira, Matheus Alves de Oliveira
 * Version: 2.0.22
 * Creation date: 17/11/2022
 * Modification date: 07/12/2022
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

const insertIngrediente = async (ingrediente) => {
  try {
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
  const sql = `select cast(id as float) as 
            id, 
            nome 
        from tbl_ingrediente where id = ${id}`;

  const rsIngredientes = await prisma.$queryRawUnsafe(sql);

  if (rsIngredientes.length > 0) {
    return rsIngredientes[0];
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
