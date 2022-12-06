import { PrismaClient } from "@prisma/client";

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

const deleteAdministrador = async (id) => {
    try {
        const prisma = new PrismaClient();

        let sql = `delete from tbl_administrador 
        where id = '${id}'`;
     
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

const selectAllAdministradores = async () => {

    const prisma = new PrismaClient();

    const sql = `select cast(id as float) as 
        id, 
        nome, 
        email, 
        senha
    from tbl_administrador order by id desc`;
   
    const rsAdministrador = await prisma.$queryRawUnsafe(sql);

    if (rsAdministrador.length > 0) {
        return rsAdministrador;
    } else {
        return false;
    }
}

const selectByIdAdministrador = async (id) => {

    const prisma = new PrismaClient();

    let sql = `select cast(id as float) as 
            id, 
            nome, 
            email, 
            senha,  
        from tbl_administrador where id = ${id}`;
 
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