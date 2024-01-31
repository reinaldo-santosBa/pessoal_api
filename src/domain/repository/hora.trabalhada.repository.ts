import HoraTrabalhadaEntity from "../entity/hora.trabalhada";

export interface HoraTrabalhadaRepository {
  insert(input: HoraTrabalhadaEntity): Promise<HoraTrabalhadaEntity>;
  getAllByFuncionario(funcionario_id: number): Promise<HoraTrabalhadaEntity[]>;
  update(
    id: number,
    input: HoraTrabalhadaEntity,
  ): Promise<HoraTrabalhadaEntity>;
  getById(id: number): Promise<HoraTrabalhadaEntity>;
  delete(id: number): Promise<void>;
}
