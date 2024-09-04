export const formatDate = (date) =>{
    const mes = ("0" + (date.getMonth() + 1)).slice(-2)
    const dia = ("0" + date.getDate()).slice(-2)
    const año = (date.getFullYear());
    const fechaNacimiento = `${año}${mes}${dia}`;
    return fechaNacimiento
}

export const ordenarPorNombre = (datos) => {
  return datos.sort(function (a, b) {
    if (a.nombre.toUpperCase() > b.nombre.toUpperCase()) {
      return 1;
    } else {
      return -1;
    }
  });
};

export const checkExistenceIn = (aList, attribute, aSubject) => {
  return aList.map((each) => each[attribute].toUpperCase()).indexOf(aSubject.toUpperCase()) === -1
}

export const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const emailRegex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
  return emailRegex.test(email);
};