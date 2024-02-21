import HoraExtraEntity from "../entity/hora.extra";
import { LimiteHorasOutput } from "./hora.trabalhada.repository";

export type StatusOutput = {
  status_solicitacao: string;
  horas_extras: number;
  data_extra: Date;
}
export interface HoraExtraRepository {
    insert(input: HoraExtraEntity): Promise<HoraExtraEntity>;
    getById(id: number): Promise<HoraExtraEntity>;
    getAllFuncionarioId(funcionario_id: number): Promise<HoraExtraEntity[]>;
    update(id: number, input: HoraExtraEntity): Promise<HoraExtraEntity>;
    delete(id: number): Promise<void>;
    getStatusSolicitacao(
        funcionario_id: number,
        data_extra: Date,
    ): Promise<StatusOutput>;
    getLimiteHoras(funcionario_id: number): Promise<LimiteHorasOutput>;
    getAll(): Promise<HoraExtraEntity[]>;
}
