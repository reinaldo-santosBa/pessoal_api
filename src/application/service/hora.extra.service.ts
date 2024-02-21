import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";
import { HoraExtraRepository } from "../../domain/repository/hora.extra.repository";
import HoraExtraEntity, { HoraExtraProps } from "../../domain/entity/hora.extra";


export default class HoraExtraService {
  constructor(private readonly horaExtraRepository: HoraExtraRepository) {}

  async create(input: HoraExtraProps) {
    const camposObrigatorios: string[] = [
      "funcionario_id",
      "solicitante_id",
      "data_solicitacao",
      "horas_extras",
    ];

    for (const campo of camposObrigatorios) {
      if (!input[campo]) {
        throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
      }
    }

    const limiteHoraExtra = await this.horaExtraRepository.getLimiteHoras(
      input.funcionario_id,
    );

    if (input.horas_extras > limiteHoraExtra.limite_hora_extra_diario) {
      throw new AppError(
        "Quantidade de horas extras solicitadas maior que o permitido",
        status.BAD_REQUEST,
      );
    }

    const horaExtra = new HoraExtraEntity(input);
    const newHoraExtra = await this.horaExtraRepository.insert(horaExtra);

    return newHoraExtra;
  }

  async getAllFuncionarioId(
    funcionario_id: number,
  ): Promise<HoraExtraEntity[]> {
    const horasExtras =
            await this.horaExtraRepository.getAllFuncionarioId(funcionario_id);
    return horasExtras;
  }

  async update(id: number, input: HoraExtraProps): Promise<HoraExtraEntity> {
    const camposObrigatorios: string[] = [
      "funcionario_id",
      "solicitante_id",
      "data_solicitacao",
      "horas_extras",
      "status_solicitacao_id",
      "autorizado_por",
    ];

    for (const campo of camposObrigatorios) {
      if (!input[campo]) {
        throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
      }
    }

    const horaExtraExisting = await this.horaExtraRepository.getById(id);
    if (!horaExtraExisting) {
      throw new AppError("Solicitação não encontrado", status.NOT_FOUND);
    }

    const horaExtra = new HoraExtraEntity(input);
    const updateHoraExtra = await this.horaExtraRepository.update(
      id,
      horaExtra,
    );

    /* if (updateHoraExtra.props.status_solicitacao_id === ) {
      }*/

    return updateHoraExtra;
  }

  async delete(id: number): Promise<void> {
    const horaExtraExisting = await this.horaExtraRepository.getById(id);
    if (!horaExtraExisting) {
      throw new AppError("Solicitação não encontrado", status.NOT_FOUND);
    }

    await this.horaExtraRepository.delete(id);
  }

  async getAll() {
    const horasExtras = await this.horaExtraRepository.getAll();
    return horasExtras;
  }

  async getById(id: number): Promise<HoraExtraEntity> {
    const horaExtra = await this.horaExtraRepository.getById(id);
    return horaExtra;
  }
}
