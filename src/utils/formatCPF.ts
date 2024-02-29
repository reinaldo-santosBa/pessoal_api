export const formatCPF = (cpf: string) => {
  const cpfDigits: string = cpf.replace(/\D/g, "");
  return cpfDigits;
};

