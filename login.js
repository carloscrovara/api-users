
function comprobar(password, confirmpassword) {
  if (!password && !confirmpassword) {
    return "complete los campos";
  } else {
    if (password === confirmpassword) {
      return "registro existoso";
    } else {
      return "las contraseñas no coinciden";
    }
  }
}

module.exports = {
    comprobar
};