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
const insertProduto = async (produto) => {
    try {

        // instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `insert into tbl_produto (
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

// função para atualizar um registro no BD
const updateProduto = async (produto) => {
    try {

        // instancia da classe PrismaClient
        const prisma = new PrismaClient();

        let sql = `update tbl_produto set
         nome = '${produto.nome}',
         imagem = '${produto.imagem}',
         tamanho = '${produto.tamanho}', 
         preco = '${produto.preco}', 
         desconto = '${produto.desconto}',
         
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
const deleteProduto = async (id) => {
    try {
        const prisma = new PrismaClient();

        let sql = `delete from tbl_produto 
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
const selectAllProdutos = async () => {

    const prisma = new PrismaClient();

    // recordset = dados vindos de um BD
    const sql = `select cast(id as float) as 
    id, 
    nome, 
    imagem, 
    tamanho, 
    preco, 
    desconto, 
    id_tipo_produto
    from tbl_produto order by id desc`;

    // criamos um objeto do tipo recordset para receber os dados do DB aravés do script  SQL (select)    
    const rsProdutos = await prisma.$queryRawUnsafe(sql);

    if (rsProdutos.length > 0) {
        return rsProdutos;
    } else {
        return false;
    }
}

// funcao para retornar apenas o registro baseado no id
const selectByIdProduto = async (id) => {

    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as 
        id, 
        nome, 
        imagem, 
        tamanho, 
        preco, 
        desconto, 
        id_tipo_produto, 
        from tbl_produto
        where id = ${id}`;

    // objeto do tipo recordset para receber os dados do DB aravés do script  SQL (select)    
    const rsProdutos = await prisma.$queryRawUnsafe(sql);

    if (rsProdutos.length > 0) {
        return rsProdutos.length;
    } else {
        return false;
    }
}

export default {
    updateProduto,
    deleteProduto,
    selectAllProdutos,
    insertProduto,
    selectByIdProduto
}