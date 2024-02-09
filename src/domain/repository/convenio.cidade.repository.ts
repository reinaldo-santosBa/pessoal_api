import { ConvenioCidade } from "../../infrastructure/db/convenio.cidade.repository";
import ConvenioCidadeEntity from "../entity/convenio.cidade";

export interface ConvenioCidadeRepository {
    insert(input: ConvenioCidadeEntity): Promise<ConvenioCidadeEntity>;
    update(
        id: number,
        input: ConvenioCidadeEntity,
    ): Promise<ConvenioCidadeEntity>;
    geAll(): Promise<ConvenioCidade[]>;
    getById(id: number): Promise<ConvenioCidade>;
    delete(id: number): Promise<void>;
    getByCidadeId(cidade_id: number): Promise<ConvenioCidade[]>;
}
