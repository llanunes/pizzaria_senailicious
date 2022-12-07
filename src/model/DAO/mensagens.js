/** ************************************************************************************************
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 06/10/2022
* Data modificação: 01/12/2022
************************************************************************************************* */

import { PrismaClient } from '@prisma/client';

const insertMensagem = async (mensagem) => {
  try {
    const prisma = new PrismaClient();

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
    const prisma = new PrismaClient();

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
    const prisma = new PrismaClient();

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
  const prisma = new PrismaClient();

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
  const prisma = new PrismaClient();

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
    return rsMensagem.length;
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
