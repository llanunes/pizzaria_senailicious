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

const insertMensagem = async (mensagem) => {
  try {
    const sql = `insert into tbl_mensagem (
                nome,
                email,
                telefone,
                celular,
                mensagem,
                id_tipo_mensagem
        ) values (
            '${mensagem.nome}',
            '${mensagem.email}',
            '${mensagem.telefone}',
            '${mensagem.celular}',
            '${mensagem.mensagem}',
            '${mensagem.id_tipo_mensagem}'
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

const updateMensagem = async (mensagem) => {
  try {
    const sql = `update tbl_mensagem set
            nome = '${mensagem.nome}',
            email = '${mensagem.email}',
            telefone = '${mensagem.telefone}', 
            celular = '${mensagem.celular}', 
            mensagem = '${mensagem.mensagem}',
            id_tipo_mensagem = '${mensagem.id_tipo_mensagem}'
         
         where id = '${mensagem.id}'`;

    const result = await prisma.$executeRawUnsafe(sql);

    if (result) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
};

const deleteMensagem = async (id) => {
  try {
    const sql = `delete from tbl_mensagem 
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

const selectAllMensagens = async () => {
  const sql = `select cast(id as float) as 
            nome,
            email,
            telefone,
            celular,
            mensagem,
            id_tipo_mensagem
    from tbl_mensagem order by id desc`;

  const rsMensagem = await prisma.$queryRawUnsafe(sql);

  if (rsMensagem.length > 0) {
    return rsMensagem;
  }
  return false;
};

const selectByIdMensagem = async (id) => {
  const sql = `select cast(id as float) as 
            nome,
            email,
            telefone,
            celular,
            mensagem,
            id_tipo_mensagem
    from tbl_mensagem where id = ${id}`;

  const rsMensagem = await prisma.$queryRawUnsafe(sql);

  if (rsMensagem.length > 0) {
    return rsMensagem[0];
  }
  return false;
};

export default {
  updateMensagem,
  deleteMensagem,
  selectAllMensagens,
  insertMensagem,
  selectByIdMensagem,
};
