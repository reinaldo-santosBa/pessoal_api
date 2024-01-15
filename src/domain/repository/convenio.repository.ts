import ConvenioEntity from "../entity/convenio";

export interface ConvenioRepository {
  insert(input: ConvenioEntity): Promise<void>;
  delete(id: number): Promise<void>;
  update(id: number, input: ConvenioEntity): Promise<void>;
  getAll(): Promise<void>;
}
