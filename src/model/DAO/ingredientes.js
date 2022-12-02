/**************************************************************************************************** 
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes
* Versão: 1.0
* Data criação: 06/10/2022
* Data modificação: 01/12/2022
****************************************************************************************************/

// import da classe pismaClient, responsável pelas interações com o BD
// import PrismaClient from '@prisma/client';
import { PrismaClient } from "@prisma/client";

// função para inserir um novo registro do BD
const insertIngrediente = async (ingrediente) => {
    try {
        // instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_ingrediente (
        nome
        )
        values (
            '${ingrediente.nome}'
            )`;

            console.log(sql);
        //$executeRawUnsafe permite encaminhar uma variavel contendo o script         
        const result = await prisma.$executeRawUnsafe(sql);
        // console.log("teste", result)
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
const updateIngrediente = async (ingrediente) => {
    try {

        // instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_ingrediente set
         nome = '${produto.nome}',
         
         where id = '${produto.id}'`

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

// função para deletar um registro no BD
const deleteIngrediente = async (id) => {
    try {
        const prisma = new PrismaClient();

        let sql = `delete from tbl_ingrediente 
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
const selectAllIngredientes = async () => {

    const prisma = new PrismaClient();

    // recordset = dados vindos de um BD
    const sql = `select cast(id as float) as 
    id, 
    nome
    from tbl_ingrediente order by id desc`;

    // criamos um objeto do tipo recordset para receber os dados do DB aravés do script  SQL (select)    
    const rsIngredientes = await prisma.$queryRawUnsafe(sql);

    if (rsIngredientes.length > 0) {
        return rsIngredientes;
    } else {
        return false;
    }
}

// funcao para retornar apenas o registro baseado no id
const selectByIdIngrediente = async (id) => {

    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as 
        id, 
        nome 
        from tbl_ingrediente
        where id = ${id}`;

    // objeto do tipo recordset para receber os dados do DB aravés do script  SQL (select)    
    const rsIngredientes = await prisma.$queryRawUnsafe(sql);

    if (rsIngredientes.length > 0) {
        return rsIngredientes.length;
    } else {
        return false;
    }
}

export default {
    updateIngrediente,
    deleteIngrediente,
    selectAllIngredientes,
    insertIngrediente,
    selectByIdIngrediente
}