import HoraTrabalhadaEntity, { HoraTrabalhadaProps } from "../../domain/entity/hora.trabalhada";
import { HoraTrabalhadaRepository } from "../../domain/repository/hora.trabalhada.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class HoraTrabalhadaService {
    constructor(
    private readonly horaTrabalhadaRepository: HoraTrabalhadaRepository,
    ) {}

    async create(input: HoraTrabalhadaProps): Promise<HoraTrabalhadaEntity> {
        const camposObrigatorios: string[] = [
            "data_trabalho",
            "funcionario_id",
            "hora_fim_turno_1",
            "hora_inicio_turno_1",
            "hora_inicio_turno_2",
            "hora_fim_turno_2",
        ];

        for (const campo of camposObrigatorios) {
            if (!input[campo]) {
                throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
            }
        }


        const horaTrabalhadaEntity = new HoraTrabalhadaEntity(input);

        const newHoraTrabalhada = await this.horaTrabalhadaRepository.insert(horaTrabalhadaEntity);
        return newHoraTrabalhada;
    }

    async getAllByFuncionario(
        funcionario_id: number,
    ): Promise<HoraTrabalhadaEntity[]> {
        const horaTrabalhada =
      await this.horaTrabalhadaRepository.getAllByFuncionario(funcionario_id);
        return horaTrabalhada;
    }

    async update(
        id: number,
        {
            data_trabalho,
            funcionario_id,
            hora_fim_turno_1,
            hora_fim_turno_2,
            hora_inicio_turno_1,
            hora_inicio_turno_2,
        }: HoraTrabalhadaProps,
    ): Promise<HoraTrabalhadaEntity> {
        const tipoFolhaEntity = new HoraTrabalhadaEntity({
            data_trabalho,
            funcionario_id,
            hora_fim_turno_1,
            hora_fim_turno_2,
            hora_inicio_turno_1,
            hora_inicio_turno_2,
        });

        const updateTipoFolha = await this.horaTrabalhadaRepository.update(
            id,
            tipoFolhaEntity,
        );
        return updateTipoFolha;
    }

    async delete(id: number): Promise<void> {
        await this.horaTrabalhadaRepository.delete(id);
    }
}
