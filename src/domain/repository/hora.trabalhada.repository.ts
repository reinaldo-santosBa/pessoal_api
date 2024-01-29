import HoraTrabalhadaEntity from "../entity/hora.trabalhada";

export interface HoraTrabalhadaRepository {
  insert(input: HoraTrabalhadaEntity): Promise<HoraTrabalhadaEntity>;
  getAllByFuncionario(funcionario_id: number): Promise<HoraTrabalhadaEntity[]>;
  update(id: number, input: HoraTrabalhadaEntity): Promise<HoraTrabalhadaEntity>;
  delete(id: number): Promise<void>;
}
