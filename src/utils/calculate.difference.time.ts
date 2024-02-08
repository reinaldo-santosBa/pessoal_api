import convertToMinutes from "./convert.minutes";

const calculateDifferenceTime = (turno1: string, turno2: string): number => {
  const turno1Minutos: number = convertToMinutes(turno1);
  const turno2Minutos: number = convertToMinutes(turno2);

  const diferencaEmMinutos: number = turno2Minutos - turno1Minutos;

  const diferencaHora: number = diferencaEmMinutos / 60;

  return diferencaHora;

};


export default calculateDifferenceTime;
