/**************************************************************************************************** 
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 06/10/2022
* Data modificação: 01/12/2022
****************************************************************************************************/

// import da classe pismaClient, responsável pelas interações com o BD
// import PrismaClient from '@prisma/client';
import { PrismaClient } from "@prisma/client";

// função para inserir um novo registro do BD
const insertMensagem = async (mensagem) => {
    try {
        // instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_mensagem (
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
            // console.log(sql);
        //$executeRawUnsafe permite encaminhar uma variavel contendo o script         
        const result = await prisma.$executeRawUnsafe(sql);
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // console.log(error)
        return false;
    }
}

// função para atualizar um registro no BD
const updateMensagem = async (mensagem) => {
    try {

        // instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_mensagem set
            nome = '${mensagem.nome}',
            email = '${mensagem.email}',
            telefone = '${mensagem.telefone}', 
            celular = '${mensagem.celular}', 
            mensagem = '${mensagem.mensagem}',
            id_tipo_mensagem = '${mensagem.id_tipo_mensagem}'
         
         where id = '${mensagem.id}'`

        //$executeRawUnsafe permite encaminhar uma variavel contendo o script         
        const result = await prisma.$executeRawUnsafe(sql);

        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        // console.log(error)
        return false;
    }

}

// função para deletar um registro no BD
const deleteMensagem = async (id) => {
    try {
        const prisma = new PrismaClient();

        let sql = `delete from tbl_mensagem 
        where id = '${id}'`;

        //$executeRawUnsafe permite encaminhar uma variavel contendo o script         
        const result = await prisma.$executeRawUnsafe(sql);
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
}

// função para retornar os registros no BD
const selectAllMensagens = async () => {

    const prisma = new PrismaClient();

    // recordset = dados vindos de um BD
    const sql = `select cast(id as float) as 
            nome,
            email,
            telefone,
            celular,
            mensagem,
            id_tipo_mensagem
    from tbl_mensagem order by id desc`;

    // criamos um objeto do tipo recordset para receber os dados do DB aravés do script  SQL (select)    
    const rsMensagem = await prisma.$queryRawUnsafe(sql);

    if (rsMensagem.length > 0) {
        return rsMensagem;
    } else {
        return false;
    }
}

// funcao para retornar apenas o registro baseado no id
const selectByIdMensagem = async (id) => {

    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as 
            nome,
            email,
            telefone,
            celular,
            mensagem,
            id_tipo_mensagem
    from tbl_mensagem where id = ${id}`;

    // objeto do tipo recordset para receber os dados do DB aravés do script  SQL (select)    
    const rsMensagem = await prisma.$queryRawUnsafe(sql);

    if (rsMensagem.length > 0) {
        return rsMensagem.length;
    } else {
        return false;
    }
}

export default {
    updateMensagem,
    deleteMensagem,
    selectAllMensagens,
    insertMensagem,
    selectByIdMensagem
}