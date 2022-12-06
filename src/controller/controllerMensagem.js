/**************************************************************************************************** 
* Objetivo: Arquivo responsável pela manipulação de dados com o BD (insert, update, delet e select)
* Autor: Larissa Nunes e Matheus Alves
* Versão: 1.0
* Data criação: 24-11-2022
* Data modificação: 01/12/2022
****************************************************************************************************/


import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../modulo/config.js';
import mensagemDao from '../model/DAO/mensagens.js';

// funcao para gerar uma nova mensagem
const novaMensagem = async (mensagem) => {
    
    if (mensagem.nome == '' || mensagem.email == '' || mensagem.telefone == '' || mensagem.celular == '' || mensagem.mensagem == '' || mensagem.id_tipo_mensagem == '' ){
        return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {
        const novaMensagem = await mensagemDao.insertMensagem(mensagem)
        // chama a função para inserir uma nova mensagem
        const result = novaMensagem;
        
        if (result){
            return  { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

// funcao para excluir um registro
const deletarMensagem = (id) => {
    if (id == '' || id == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else {
        const mensagem = buscarMensagem(id) 
            if(mensagem){
                const deleteMensagem = mensagemDao.deleteMensagem(id)
                const result = deleteMensagem;

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

// funcao para atualizar um registro
const atualizarMensagem = (mensagem) => {
    // validacao para o id como campo obrigatorio
        if (mensagem.id == '' || mensagem.id == undefined){
            return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
        }   
    // validacao de campos obrigatorios
    else if (mensagem.nome == '' || mensagem.email == '' || mensagem.telefone == '' || mensagem.celular == '' || mensagem.mensagem == '' || mensagem.id_tipo_mensagem == '' ){
        return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {

        const atualizarMensagem = mensagemDao.updateMensagem(mensagem);
        const result = atualizarMensagem;
        
        if (result){
            return  { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}


// funcao para retornar todos os registros
const listarMensagens = async () => {
    const mensagem = await mensagemDao.selectAllMensagens()
    // const mensagem = await selectAllMensagens();

    if(mensagem){
        return mensagem;
    } else {
        return false;
    }
}

// funcao para retornar um registro baseado no id
const buscarMensagem = async (id) => {

    let dadosMensagensJSON = {};

    if (id == '' || id == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
    const dadosMensagens = await mensagemDao.selectByIdMensagem(id);

    if(dadosMensagens){
        dadosMensagensJSON.mensagem = dadosMensagens;
        return dadosMensagensJSON;
    } else {
        return false;
    }
}

const controllerMensagem = {
    listarMensagens,
    novaMensagem,
    deletarMensagem,
    atualizarMensagem,
    buscarMensagem
}

export default controllerMensagem;