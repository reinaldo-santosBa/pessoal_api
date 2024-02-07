import ConvenioCidadeEntity from "../entity/convenio.cidade";

export interface ConvenioCidadeRepository {
    insert(input: ConvenioCidadeEntity): Promise<ConvenioCidadeEntity>;
    update(
        id: number,
        input: ConvenioCidadeEntity,
    ): Promise<ConvenioCidadeEntity>;
    geAll(): Promise<ConvenioCidadeEntity[]>;
    getById(id: number): Promise<ConvenioCidadeEntity>;
    delete(id: number): Promise<void>;
}
