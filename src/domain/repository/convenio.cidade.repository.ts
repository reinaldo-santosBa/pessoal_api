import { AllConvenioCidade } from "../../infrastructure/db/convenio.cidade.repository";
import ConvenioCidadeEntity from "../entity/convenio.cidade";

export interface ConvenioCidadeRepository {
    insert(input: ConvenioCidadeEntity): Promise<ConvenioCidadeEntity>;
    update(
        id: number,
        input: ConvenioCidadeEntity,
    ): Promise<ConvenioCidadeEntity>;
    geAll(): Promise<AllConvenioCidade[]>;
    getById(id: number): Promise<ConvenioCidadeEntity>;
    delete(id: number): Promise<void>;
    getByCidadeId(cidade_id: number): Promise<ConvenioCidadeEntity[]>;
}
