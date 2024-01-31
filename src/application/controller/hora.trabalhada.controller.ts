import { HoraTrabalhadaProps } from "../../domain/entity/hora.trabalhada";
import HoraTrabalhadaService from "../service/hora.trabalhada.service";
import { Request, Response } from "express";
import * as status from "../../constraints/http.stauts";


export default class HoraTrabalhadaController {
    constructor(private readonly horaTrabalhadaService: HoraTrabalhadaService) {}

    async create(request: Request, response: Response) {
        const {
            funcionario_id,
            data_trabalho,
            hora_inicio_turno_1,
            hora_inicio_turno_2,
            hora_fim_turno_1,
            hora_fim_turno_2,
        } = request.body as HoraTrabalhadaProps;

        const newHoraTrabalhada = await this.horaTrabalhadaService.create({
            data_trabalho,
            funcionario_id,
            hora_fim_turno_1,
            hora_fim_turno_2,
            hora_inicio_turno_1,
            hora_inicio_turno_2,
        });

        return response.status(status.CREATED).json(newHoraTrabalhada);
    }

    async getAllByFuncionario(request: Request, response: Response) {
        const funcionario_id = request.params.funcionario_id;
        const hora_trabalhada =
      await this.horaTrabalhadaService.getAllByFuncionario(+funcionario_id);
        return response.json(hora_trabalhada);
    }

    async getById(request: Request, response: Response) {
        const id = request.params.id;
        const hora_trabalhada = await this.horaTrabalhadaService.getById(+id);
        return response.json(hora_trabalhada);
    }

    async update(request: Request, response: Response) {
        const {
            funcionario_id,
            data_trabalho,
            hora_inicio_turno_1,
            hora_inicio_turno_2,
            hora_fim_turno_1,
            hora_fim_turno_2,
        } = request.body as HoraTrabalhadaProps;

        const id = request.params.id;
        const updateHoraTrabalhada = await this.horaTrabalhadaService.update(+id, {
            funcionario_id,
            data_trabalho,
            hora_inicio_turno_1,
            hora_inicio_turno_2,
            hora_fim_turno_1,
            hora_fim_turno_2,
        });

        return response.json(updateHoraTrabalhada);
    }

    async delete(request: Request, response: Response) {
        const id = request.params.id;
        await this.horaTrabalhadaService.delete(+id);
        return response.status(status.NO_CONTENT).json();
    }
}
