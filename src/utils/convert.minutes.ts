const convertToMinutes = (horario: string): number => {
  const [horas, minutos, segundos] = horario.split(":").map(Number);
  return horas * 60 + minutos + segundos / 60;
};


export default convertToMinutes;
