import HoraTrabalhadaEntity from "../entity/hora.trabalhada";

export type LimiteHorasOutput = {
  limite_hora_extra_diario: number;
  limite_hora_extra_mensal: number
}
export interface HoraTrabalhadaRepository {
  insert(input: HoraTrabalhadaEntity): Promise<HoraTrabalhadaEntity>;
  getAllByFuncionario(funcionario_id: number): Promise<HoraTrabalhadaEntity[]>;
  update(
    id: number,
    input: HoraTrabalhadaEntity,
  ): Promise<HoraTrabalhadaEntity>;
  getById(id: number): Promise<HoraTrabalhadaEntity>;
  delete(id: number): Promise<void>;
  getLimiteHoras(funcionario_id: number): Promise<LimiteHorasOutput>;
}
