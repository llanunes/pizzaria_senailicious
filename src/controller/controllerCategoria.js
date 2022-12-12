import { MESSAGE_ERROR, MESSAGE_SUCESS } from '../module/config.js';
import categoriaDao from '../model/DAO/categorias.js';

const buscarTipoProduto = async (id) => {
  const dadosTipoProdutoJSON = {};

  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const dadosTipoProduto = await categoriaDao.selectByIdTipoProduto(id);

  if (dadosTipoProduto) {
    dadosTipoProdutoJSON.tipoProduto = dadosTipoProduto;
    return dadosTipoProdutoJSON;
  }
  return false;
};

const novoTipoProduto = async (tipoProduto) => {
  if (tipoProduto.tipo === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }
  const result = await categoriaDao.insertTipoProduto(tipoProduto);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const deletarTipoProduto = (id) => {
  if (id === '' || id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  const tipoProduto = buscarTipoProduto(id);
  if (tipoProduto) {
    const result = categoriaDao.deleteTipoProduto(id);

    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  }
  return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
};

const atualizarTipoProduto = (tipoProduto) => {
  if (tipoProduto.id === '' || tipoProduto.id === undefined) {
    return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
  }
  if (tipoProduto.tipo === '') {
    return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
  }

  const result = tipoProduto.updateTipoProduto(tipoProduto);

  if (result) {
    return { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
  }
  return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
};

const listarTiposProdutos = async () => {
  const tipoProdutos = await categoriaDao.selectAllTiposProdutos();

  if (tipoProdutos) {
    return tipoProdutos;
  }
  return false;
};
// ################################################################

const buscarTipoPizza = async (id) => {
    const dadosTipoPizzaJSON = {};
  
    if (id === '' || id === undefined) {
      return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
    }
    const dadosTipoPizza = await categoriaDao.selectByIdTipoPizza(id);
  
    if (dadosTipoPizza) {
      dadosTipoPizzaJSON.tipoPizza = dadosTipoPizza;
      return dadosTipoPizzaJSON;
    }
    return false;
  };
  
  const novoTipoPizza = async (tipoPizza) => {
    if (tipoPizza.tipo === '') {
      return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }
    const result = await categoriaDao.insertTipoPizza(tipoPizza);
  
    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.INSERT_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  };
  
  const deletarTipoPizza = (id) => {
    if (id === '' || id === undefined) {
      return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
    }
    const tipoPizza = buscarTipoPizza(id);
    if (tipoPizza) {
      const result = categoriaDao.deleteTipoPizza(id);
  
      if (result) {
        return { status: 201, message: MESSAGE_SUCESS.DELETE_ITEM };
      }
      return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
    }
    return { status: 404, message: MESSAGE_ERROR.NOT_FOUND_BD };
  };
  
  const atualizarTipoPizza = (tipoPizza) => {
    if (tipoPizza.id === '' || tipoPizza.id === undefined) {
      return { status: 400, message: MESSAGE_ERROR.REQUIRED_ID };
    }
    if (tipoPizza.tipo === '') {
      return { status: 404, message: MESSAGE_ERROR.REQUIRED_FIELDS };
    }
  
    const result = tipoPizza.updateTipoPizza(tipoPizza);
  
    if (result) {
      return { status: 201, message: MESSAGE_SUCESS.UPDATE_ITEM };
    }
    return { status: 500, message: MESSAGE_ERROR.INTERNAL_ERROR_DB };
  };
  
  const listarTiposPizzas = async () => {
    const tipoPizzas = await categoriaDao.selectAllTiposPizzas();
  
    if (tipoPizzas) {
      return tipoPizzas;
    }
    return false;
  };


const controllerCategoria = {
  buscarTipoProduto,
  listarTiposProdutos,
  atualizarTipoProduto,
  deletarTipoProduto,
  novoTipoProduto,
  buscarTipoPizza,
  listarTiposPizzas,
  atualizarTipoPizza,
  deletarTipoPizza,
  novoTipoPizza  
};

export default controllerCategoria;