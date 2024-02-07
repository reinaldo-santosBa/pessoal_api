import JornadaTrabalhoEntity, { JornadaTrabalhoProps } from "../../domain/entity/jornada.trabalho";
import { JornadaTrabalhoRepository } from "../../domain/repository/jornada.trabalho.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class JornadaTrabalhoService {
    constructor(
    private readonly jornadaTrabalhoRepository: JornadaTrabalhoRepository,
    ) {}

    async insert(input: JornadaTrabalhoProps): Promise<JornadaTrabalhoEntity> {
        const camposObrigatorios: string[] = [
            "jornada_trabalho",
            "carga_diaria",
            "carga_semanal",
            "limite_extra_diario",
            "turnos"
        ];

        for (const campo of camposObrigatorios) {
            if (!input[campo]) {
                throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
            }
        }

        const jornadaTrabalho = new JornadaTrabalhoEntity(input);
        const output =
        await this.jornadaTrabalhoRepository.insert(jornadaTrabalho);
        return output;
    }

    async getAll(): Promise<JornadaTrabalhoEntity[]> {
        const jornadaTrabalho = await this.jornadaTrabalhoRepository.getAll();
        return jornadaTrabalho;
    }

    async update(id: number, input: JornadaTrabalhoProps): Promise<JornadaTrabalhoEntity> {

        const jornadaExisting =
          await this.jornadaTrabalhoRepository.getByIdExisting(id);

        if (!jornadaExisting) {
            throw new AppError("Jornada de trabalho não encontrada", status.NOT_FOUND);
        }

        const camposObrigatorios: string[] = [
            "jornada_trabalho",
            "carga_diaria",
            "carga_semanal",
            "limite_extra_diario",
            "turnos"
        ];

        for (const campo of camposObrigatorios) {
            if (!input[campo]) {
                throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
            }
        }

        const jornada = new JornadaTrabalhoEntity(input);
        const output = await this.jornadaTrabalhoRepository.update(id, jornada);

        return output;

    }

    async getById(id: number): Promise<JornadaTrabalhoEntity> {
        const jornada_trabalho = await this.jornadaTrabalhoRepository.getById(id);
        return jornada_trabalho;
    }

    async delete(id: number): Promise<void> {
        const jornada =
          await this.jornadaTrabalhoRepository.getByIdExisting(id);

        if (!jornada) {
            throw new AppError("Jornada de trabalho não encontrada", status.NOT_FOUND);
        }

        await this.jornadaTrabalhoRepository.delete(id);

    }
}
