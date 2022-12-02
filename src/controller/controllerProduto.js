/**************************************************************************************************** 
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 24-11-2022
* Data modificação: 01/12/2022
****************************************************************************************************/


import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../modulo/config.js';
import produtoDao from '../model/DAO/produtos.js';

// funcao para gerar um novo produto
const novoProduto = async (produto) => {
    
    // validação de campos obrigatórios
    if (produto.nome == '' || produto.imagem == '' || produto.tamanho == '' || produto.preco == '' || produto.desconto == '' || produto.id_tipo_produto == '' ){
        return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {
        const novoProduto = produtoDao.insertProduto(produto)
        // chama a função para inserir um novo produto
        const result = novoProduto.insertProduto(produto);
        
        if (result){
            return  { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

// funcao para atualizar um registro
const atualizarProduto = (produto) => {
    // validacao para o id como campo obrigatorio
        if (produto.id == '' || produto.id == undefined){
            return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
        }   
    // validacao de campos obrigatorios
    else if (produto.nome == '' || produto.imagem == '' || produto.tamanho == '' || produto.preco == '' || produto.desconto == '' || produto.id_tipo_produto == '' ){
        return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {
        const atualizarProduto = produtoDao.atualizarProduto();

        // chama a função para inserir um novo produto
        const result = atualizarProduto.updateProduto(produto);
        
        if (result){
            return  { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

// funcao para excluir um registro
const deletarProduto = (id) => {
    if (id == '' || id == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else {
        const produto = buscarProduto(id) 
            if(produto){
                const deleteProduto = produtoDao.deleteProduto(id)
                const result = deletarProduto.deleteProduto(id);

                if (result){
                    return  { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
                } else {
                return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
                }
            } else {
                return {status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD}
        }
    }    
}

// funcao para retornar todos os registros
const listarProdutos = async () => {
    const produto = await produtoDao.selectAllProdutos()
    // const produto = await selectAllProdutos();

    if(produto){
        return produto;
    } else {
        return false;
    }
}

// funcao para retornar um registro baseado no id
const buscarProduto = async (id) => {

    let dadosProdutoJSON = {};

    if (id == '' || id == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
    const dadosProduto = await produtoDao.selectByIdProduto(id);
    // import { selectByIdProduto } from '../model/DAO/produtos.js';

    if(dadosProduto){
        dadosProdutoJSON.produto = dadosProduto;
        return dadosProdutoJSON;
    } else {
        return false;
    }
}

export default {
    listarProdutos,
    novoProduto,
    deletarProduto,
    atualizarProduto,
    buscarProduto
}