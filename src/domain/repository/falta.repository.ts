import FaltaEntity from "../entity/falta";

export interface FaltaRepository {
    insert(input: FaltaEntity): Promise<FaltaEntity>;
    getAll(): Promise<FaltaEntity[]>;
    getByFuncionarioId(funcionario_id: number): Promise<FaltaEntity[]>;
    update(id: number, input: FaltaEntity): Promise<void>;
    delete(id: number): Promise<void>;
}
