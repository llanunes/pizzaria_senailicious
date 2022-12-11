/* eslint-disable import/extensions */
import controllerAdministrador from '../controller/controllerAdministrador.js';

export default async function verifyAdminLogin(adminInfos) {
  // const allAdmins = await controllerAdministrador.listarAdministradores();

  // console.log(allAdmins);

  // allAdmins.forEach((admin) => {
  //   console.log(admin, adminInfos);
  //   if (adminInfos.email === admin.email && adminInfos.password === admin.senha) {
  //     return admin;
  //   }
  //   return false;
  // });
  // return false;
  const allAdmins = await controllerAdministrador.listarAdministradores();
  let foundAdmin;

  allAdmins.forEach((admin) => {
    if (admin.email === adminInfos.email && admin.senha === adminInfos.password) {
      foundAdmin = admin;
    }
  });
  return foundAdmin;
}
