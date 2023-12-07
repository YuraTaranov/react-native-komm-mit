function passwordValidator(password: string): boolean {
  const reg = /(?=.*[A-Z])(?=.*[!@#$%^&*])^[a-zA-Z0-9!@#$%^&*]{6,24}$/;
  return reg.test(password);
}

export const validators = {
  password: passwordValidator,
};
