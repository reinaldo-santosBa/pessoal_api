import DiaJornadaTrabalhoEntity, { DiaJornadaTrabalhoProps } from "../../domain/entity/dia.jornada.trabalho";
import { DiaJornadaTrabalhoRepository } from "../../domain/repository/dia.jornada.trabalho.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";
export default class DiaJornadaTrabalhoService {
  constructor(
    private readonly diaJornadaTrabalhoRepository: DiaJornadaTrabalhoRepository,
  ) {}

  async create(
    input: DiaJornadaTrabalhoProps,
  ): Promise<DiaJornadaTrabalhoEntity> {
    const diaTrabalho = new DiaJornadaTrabalhoEntity(input);
    const newDiaTrabalho =
      await this.diaJornadaTrabalhoRepository.insert(diaTrabalho);
    return newDiaTrabalho;
  }

  async getAll(): Promise<DiaJornadaTrabalhoEntity[]> {
    const diaJornadaTrabalho = await this.diaJornadaTrabalhoRepository.getAll();
    return diaJornadaTrabalho;
  }

  async getById(id: number): Promise<DiaJornadaTrabalhoEntity> {
    const diaJornadaTrabalho = await this.diaJornadaTrabalhoRepository.getById(id);
    return diaJornadaTrabalho;
  }


  async delete(id: number): Promise<void> {
    const diaJornadaTrabalho =
          await this.diaJornadaTrabalhoRepository.getByIdExisting(id);
    if (!diaJornadaTrabalho) {
      throw new AppError(
        "Dia Jornada de trabalho não encontrado",
        status.NOT_FOUND,
      );
    }
    await this.diaJornadaTrabalhoRepository.delete(id);
  }

  async update(
    id: number,
    input: DiaJornadaTrabalhoProps,
  ): Promise<DiaJornadaTrabalhoEntity> {
    const diaJornadaTrabalhoExisting =
          await this.diaJornadaTrabalhoRepository.getByIdExisting(id);
    if (!diaJornadaTrabalhoExisting) {
      throw new AppError(
        "Dia Jornada de trabalho não encontrado",
        status.NOT_FOUND,
      );
    }

    const diaTrabalho = new DiaJornadaTrabalhoEntity(input);

    const updateDiaJornadaTrabalho =
      await this.diaJornadaTrabalhoRepository.update(id, diaTrabalho);
    return updateDiaJornadaTrabalho;
  }
}
