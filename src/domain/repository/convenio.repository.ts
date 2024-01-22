import ConvenioEntity from "../entity/convenio";

export interface ConvenioRepository {
  insert(input: ConvenioEntity): Promise<ConvenioEntity>;
  delete(id: number): Promise<void>;
  update(id: number, input: ConvenioEntity): Promise<ConvenioEntity>;
  getAll(): Promise<ConvenioEntity[]>;
  getById(id: number): Promise<number>
}
