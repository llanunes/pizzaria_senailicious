import { PrismaClient } from "@prisma/client";

// função para inserir um novo registro do BD
const insertAdministrador = async (administrador) => {
    try {

        const prisma = new PrismaClient();

        let sql = `insert into tbl_administrador (
        nome,
        email,
        senha
        )
        values (
            '${administrador.nome}',
            '${administrador.email}',
            '${administrador.senha}'
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
const updateAdministrador = async (administrador) => {
    try {

        const prisma = new PrismaClient();

        let sql = `update tbl_administrador set
         nome = '${administrador.nome}',
         email = '${administrador.imagem}',
         senha = '${administrador.tamanho}'
         
         where id = '${administrador.id}'`

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
const deleteAdministrador = async (id) => {
    try {
        const prisma = new PrismaClient();

        let sql = `delete from tbl_administrador 
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
const selectAllAdministradores = async () => {

    const prisma = new PrismaClient();

    // recordset = dados vindos de um BD
    const sql = `select cast(id as float) as 
    id, 
    nome, 
    email, 
    senha, 
    from tbl_administrador order by id desc`;

    // criamos um objeto do tipo recordset para receber os dados do DB aravés do script SQL (select)    
    const rsAdministrador = await prisma.$queryRawUnsafe(sql);

    if (rsAdministrador.length > 0) {
        return rsAdministrador;
    } else {
        return false;
    }
}

// funcao para retornar apenas o registro baseado no id
const selectByIdAdministrador = async (id) => {

    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as 
        id, 
        nome, 
        email, 
        senha,  
        from tbl_administrador
        where id = ${id}`;

    // objeto do tipo recordset para receber os dados do DB aravés do script  SQL (select)    
    const rsAdministrador = await prisma.$queryRawUnsafe(sql);

    if (rsAdministrador.length > 0) {
        return rsAdministrador.length;
    } else {
        return false;
    }
}

export default {
    updateAdministrador,
    deleteAdministrador,
    selectAllAdministradores,
    insertAdministrador,
    selectByIdAdministrador
}