export const validationHandler = (data) => {
  let errors = {};
  if (data.name.length > 0) {
    if (!data.name.match(/^[a-zA-Z]+[a-zA-Z]/)) {
      errors["formIsValid"] = false;
      errors["name"] = "Nama harus huruf";
    }
  }

  if (data.email.length > 0) {
    let lastAtPos = data.email.lastIndexOf("@");
    let lastDotPos = data.email.lastIndexOf(".");

    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        data.email.indexOf("@@") == -1 &&
        lastDotPos > 2 &&
        data.email.length - lastDotPos > 2
      )
    ) {
      errors["formIsValid"] = false;
      errors["email"] = "Email is not valid";
    }
  }

  return errors;
};

export const objectUpdate = (oldState, updateState) => {
  return {
    ...oldState,
    ...updateState,
  };
};
