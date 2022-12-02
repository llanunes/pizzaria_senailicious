// teste

import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../modulo/config.js';
import administradorDao from '../model/DAO/administradores.js';

// funcao para gerar um novo registro no banco de dados
const novoAdministrador = async (administrador) => {
    
    // validação de campos obrigatórios
    if (administrador.nome == '' || administrador.email == '' || administrador.senha == ''){
        return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else {
        const novoAdministrador = administradorDao.insertAdministrador(administrador)
        // chama a função para inserir um novo administrador
        const result = novoAdministrador.insertAdministrador(administrador);
        
        if (result){
            return  { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

// funcao para atualizar um registro
const atualizarAdministrador = (administrador) => {
    // validacao para o id como campo obrigatorio
        if (administrador.id == '' || administrador.id == undefined){
            return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
        }   
    // validacao de campos obrigatorios
    else if (administrador.nome == '' || administrador.email == '' || administrador.senha == ''){
        return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS};
    } else if (!administrador.email.includes('@')){
        return { status: 404, message: MESSAGE_ERROR.INVALID_EMAIL };
    } else {
        const atualizarAdministrador = administradorDao.atualizarAdministrador();

        const result = atualizarAdministrador.updateAdministrador(administrador);
        
        if (result){
            return  { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
        } else {
            return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
        }
    }
}

// funcao para excluir um registro
const deletarAdministrador = (id) => {
    if (id == '' || id == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    } else {
        const administrador = buscarAdministrador(id) 
            if(administrador){
                const deletarAdministrador = administradorDao.deleteAdministrador(id)
                const result = deletarAdministrador.deleteAdministrador(id);

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
const listarAdministradores = async () => {
    const administrador = await administradorDao.selectAllAdministradores()

    if(administrador){
        return administrador;
    } else {
        return false;
    }
}

// funcao para retornar um registro baseado no id
const buscarAdministrador = async (id) => {

    let dadosAdministradorJSON = {};

    if (id == '' || id == undefined){
        return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID}
    }
    const dadosAdministrador = await administradorDao.selectByIdAdministrador(id);

    if(dadosAdministrador){
        dadosAdministradorJSON.administrador = dadosAdministrador;
        return dadosAdministradorJSON;
    } else {
        return false;
    }
}

const controllerAdministrador = {
    listarAdministradores,
    novoAdministrador,
    deletarAdministrador,
    atualizarAdministrador,
    buscarAdministrador
}

export default controllerAdministrador;