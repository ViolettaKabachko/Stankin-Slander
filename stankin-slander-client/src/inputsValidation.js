export const validateFullname = (fullname) => {
    let splitted_name = fullname.split(' ');
    return splitted_name.length === 2
}

export const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  export const validateStudak = (studak) => {
    return studak.length > 0
}

export const validatePassword = (password) => {
  return password.length > 0
}