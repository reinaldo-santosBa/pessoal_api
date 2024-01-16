import JornadaTrabalhoEntity, { JornadaTrabalhoProps } from "../../domain/entity/jornada.trabalho";
import { JornadaTrabalhoRepository } from "../../domain/repository/jornada.trabalho.repository";
import AppError from "../errors/AppError";

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
        ];

        for (const campo of camposObrigatorios) {
            if (!input[campo]) {
                throw new AppError(`${campo} obrigatório`, 400);
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
          await this.jornadaTrabalhoRepository.getById(id);

        if (!jornadaExisting) {
            throw new AppError("Jornada de trabalho não encontrada", 404);
        }

        const camposObrigatorios: string[] = [
            "jornada_trabalho",
            "carga_diaria",
            "carga_semanal",
            "limite_extra_diario",
        ];

        for (const campo of camposObrigatorios) {
            if (!input[campo]) {
                throw new AppError(`${campo} obrigatório`, 400);
            }
        }

        const jornada = new JornadaTrabalhoEntity(input);
        const output = await this.jornadaTrabalhoRepository.update(id, jornada);

        return output;

    }

    async delete(id: number): Promise<void> {
        const jornada = await this.jornadaTrabalhoRepository.getById(id);

        if (!jornada) {
            console.log("Entrou aqui");
            throw new AppError("Jornada de trabalho não encontrada", 404);
        }

        await this.jornadaTrabalhoRepository.delete(id);

    }
}
