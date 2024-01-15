import JornadaTrabalhoEntity, { JornadaTrabalhoProps } from "../../domain/entity/jornada.trabalho";
import { JornadaTrabalhoRepository } from "../../domain/repository/jornada.trabalho.repository";
import AppError from "../errors/AppError";

export default class JornadaTrabalhoService {
    constructor(
    private readonly jornadaTrabalhoRepository: JornadaTrabalhoRepository,
    ) {}

    async insert(input: JornadaTrabalhoProps): Promise<JornadaTrabalhoEntity[]> {
        try {
            const jornadaTrabalho = new JornadaTrabalhoEntity(input);
            const output =
        await this.jornadaTrabalhoRepository.insert(jornadaTrabalho);
            return output;
        } catch (error) {
            throw new AppError(error);
        }
    }

    async getAll(): Promise<JornadaTrabalhoEntity[]> {
        try {
            const jornadaTrabalho = await this.jornadaTrabalhoRepository.getAll();
            return jornadaTrabalho;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async update(id: number, input: JornadaTrabalhoProps): Promise<JornadaTrabalhoEntity[]> {
        try {
            const jornadaExisting =
          await this.jornadaTrabalhoRepository.getById(id);

            if (!jornadaExisting) {
                throw new AppError("Jornada de trabalho não encontrada", 404);
            }

            const jornada = new JornadaTrabalhoEntity(input);
            const output = await this.jornadaTrabalhoRepository.update(id, jornada);

            return output;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const jornada = await this.jornadaTrabalhoRepository.getById(id);

            if (!jornada) {
                throw new AppError("Jornada de trabalho não encontrada", 404);
            }

            await this.jornadaTrabalhoRepository.delete(id);
        } catch (error) {
            throw new AppError(error.message);
        }
    }
}
