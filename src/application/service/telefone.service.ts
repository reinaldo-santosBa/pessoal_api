import TelefoneEntity, { TelefoneProps } from "../../domain/entity/telefones";
import { TelefoneRepository } from "../../domain/repository/telefone.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class TelefoneService {
  constructor(private readonly telefoneRepository: TelefoneRepository) {}

  async create(input: TelefoneProps): Promise<TelefoneEntity> {

    if (!input.numero) {
      throw new AppError("Numero é obrigatório", status.BAD_REQUEST);
    }

    const telefone = new TelefoneEntity(input);
    const newTelefone = await this.telefoneRepository.insert(telefone);
    return newTelefone;
  }

  async getByIdPessoa(pessoa_id: number): Promise<TelefoneEntity[]> {
    const telefones = await this.telefoneRepository.getByIdPessoa(pessoa_id);

    return telefones;
  }

  async update(id: number, input: TelefoneProps): Promise<TelefoneEntity> {
    const telefoneExisting = await this.telefoneRepository.getById(id);
    if (!telefoneExisting) {
      throw new AppError("Telefone não encontrado", status.NOT_FOUND);
    }

    const telefone = new TelefoneEntity(input);
    const telefoneUpdate = this.telefoneRepository.update(id, telefone);
    return telefoneUpdate;
  }

  async delete(id: number): Promise<void> {
    const telefoneExisting = await this.telefoneRepository.getById(id);
    if (!telefoneExisting) {
      throw new AppError("Telefone não encontrado", status.NOT_FOUND);
    }
    await this.telefoneRepository.delete(id);
  }
}
