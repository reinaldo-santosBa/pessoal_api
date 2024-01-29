import AppError from "../../application/errors/AppError";
import HoraTrabalhadaEntity from "../../domain/entity/hora.trabalhada";
import { HoraTrabalhadaRepository } from "../../domain/repository/hora.trabalhada.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";

export default class HoraTrabalhadaPostgresRepository implements HoraTrabalhadaRepository {

    async getAllByFuncionario(funcionario_id: number): Promise<HoraTrabalhadaEntity[]> {
        try {
            const horasTrabalhada = await conn.query(`SELECT id,
                                funcionario_id,
                                data_trabalho,
                                hora_inicio_turno_1,
                                hora_fim_turno_1,
                                hora_inicio_turno_2,
                                hora_fim_turno_2
                          FROM horas_trabalhadas_funcionarios
                          WHERE funcionario_id = ${funcionario_id}
            `);

            return horasTrabalhada.rows;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }

    }

    async insert(input: HoraTrabalhadaEntity): Promise<HoraTrabalhadaEntity> {
        try{
            await conn.query("BEGIN");
            const horasTrabalhada = await conn.query(
                `INSERT INTO  horas_trabalhadas_funcionarios(
                                funcionario_id,
                                data_trabalho,
                                hora_inicio_turno_1,
                                hora_fim_turno_1,
                                hora_inicio_turno_2,
                                hora_fim_turno_2
                ) VALUES(
                  ${input.props.funcionario_id},
                  '${input.props.data_trabalho}',
                  '${input.props.hora_inicio_turno_1}',
                  '${input.props.hora_fim_turno_1}',
                  '${input.props.hora_inicio_turno_2}',
                  '${input.props.hora_fim_turno_2}'
                ) RETURNING *`,
            );

            await conn.query("COMMIT");
            return horasTrabalhada.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }

    }

    async update(id: number, input: HoraTrabalhadaEntity): Promise<HoraTrabalhadaEntity> {
        try{
            await conn.query("BEGIN");
            const horasTrabalhada = await conn.query(
                `UPDATE horas_trabalhadas_funcionarios SET
                                data_trabalho = '${input.props.data_trabalho}',
                                hora_inicio_turno_1 = '${input.props.hora_inicio_turno_1}',
                                hora_fim_turno_1 = '${input.props.hora_fim_turno_1}',
                                hora_inicio_turno_2 = '${input.props.hora_inicio_turno_2}',
                                hora_fim_turno_2 = '${input.props.hora_fim_turno_2}'

                        WHERE ID = ${id} RETURNING *`,
            );
            await conn.query("COMMIT");
            return horasTrabalhada.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }

    }


    async delete(id: number): Promise<void> {
        try{
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM horas_trabalhadas_funcionarios WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }

    }

}
