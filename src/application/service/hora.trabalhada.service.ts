import HoraTrabalhadaEntity, { HoraTrabalhadaProps } from "../../domain/entity/hora.trabalhada";
import { HoraTrabalhadaRepository } from "../../domain/repository/hora.trabalhada.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";
import { SolicitacaoHoraExtraRepository } from "../../domain/repository/solicitacao.hora.extra";
import { JornadaTrabalhoRepository } from "../../domain/repository/jornada.trabalho.repository";
import calculateDifferenceTime from "../../utils/calculate.difference.time";

export default class HoraTrabalhadaService {
    constructor(
    private readonly horaTrabalhadaRepository: HoraTrabalhadaRepository,
    private readonly solicitacaoHoraExtraRepository: SolicitacaoHoraExtraRepository,
    private readonly jornadaTrabalhoRepository: JornadaTrabalhoRepository,
    ) {}

    async create(input: HoraTrabalhadaProps): Promise<HoraTrabalhadaEntity> {
        const camposObrigatorios: string[] = [
            "data_trabalho",
            "funcionario_id",
            "hora_fim_turno_1",
            "hora_inicio_turno_1",
        ];

        for (const campo of camposObrigatorios) {
            if (!input[campo]) {
                throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
            }
        }



        if (input.hora_inicio_turno_2 && input.hora_fim_turno_2) {
            const diariaTotal =
            calculateDifferenceTime(
                input.hora_inicio_turno_1,
                input.hora_fim_turno_1,
            ) +
            calculateDifferenceTime(
                input.hora_inicio_turno_2,
                input.hora_fim_turno_2,
            );

            const cargaTrabalho =
            await this.jornadaTrabalhoRepository.getByFuncionarioId(
                input.funcionario_id,
            );

            if (diariaTotal > cargaTrabalho.carga_diaria) {
                const horasExtra: number = diariaTotal - cargaTrabalho.carga_diaria;

                const limite = await this.horaTrabalhadaRepository.getLimiteHoras(input.funcionario_id);
                if (horasExtra > limite.limite_hora_extra_diario) {
                    throw new AppError("Horas Extras excedem o limite de hora extra diario", status.BAD_REQUEST);
                }

                const statusResult = await this.solicitacaoHoraExtraRepository.getStatusSolicitacao(input.funcionario_id, input.data_trabalho);

                if (!statusResult) {
                    throw new AppError("Não existe solicitacao aprovada para o funcionario", status.BAD_REQUEST);
                }

                if (horasExtra > statusResult.horas_extras) {
                    throw new AppError("Quantidade de Horas extras não aprovada", status.BAD_REQUEST);
                }
            }
        }

        const horaTrabalhadaEntity = new HoraTrabalhadaEntity(input);

        const newHoraTrabalhada =
      await this.horaTrabalhadaRepository.insert(horaTrabalhadaEntity);
        return newHoraTrabalhada;
    }

    async getAllByFuncionario(
        funcionario_id: number,
    ): Promise<HoraTrabalhadaEntity[]> {
        const horaTrabalhada =
      await this.horaTrabalhadaRepository.getAllByFuncionario(funcionario_id);
        return horaTrabalhada;
    }

    async getById(id: number): Promise<HoraTrabalhadaEntity> {
        const horaTrabalhada = await this.horaTrabalhadaRepository.getById(id);
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
