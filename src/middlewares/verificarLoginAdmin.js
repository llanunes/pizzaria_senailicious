/* eslint-disable import/extensions */
import controllerAdministrador from '../controller/controllerAdministrador.js';

export default async function verifyAdminLogin(adminInfos) {
  const allAdmins = await controllerAdministrador.listarAdministradores();

  allAdmins.forEach((admin) => {
    console.log(adminInfos, '\n', admin);
    if (adminInfos.email === admin.email && adminInfos.password === admin.senha) {
      return true;
    }
    return false;
  });
  return false;
}
