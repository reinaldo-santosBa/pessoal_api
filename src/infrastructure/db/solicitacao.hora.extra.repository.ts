import AppError from "../../application/errors/AppError";
import SolicitacaoHoraExtraEntity from "../../domain/entity/solicitacao.hora.extra";
import { SolicitacaoHoraExtraRepository } from "../../domain/repository/solicitacao.hora.extra";
import conn from "../config/database.config";

export default class SolicitacaoHoraExtraPostgresRepository
implements SolicitacaoHoraExtraRepository
{
    async insert(input: SolicitacaoHoraExtraEntity): Promise<SolicitacaoHoraExtraEntity> {
        try {
            await conn.query("BEGIN");
            const solicitacaoHoraExtra = await conn.query(
                `INSERT INTO solicitacoes_horas_extras (
                        funcionario_id,
                        solicitante_id,
                        data_solicitacao,
                        data_extra,
                        horas_extras,
                        observacao,
                        autorizado_por,
                        data_autorizacao
                ) VALUES (
                  ${input.props.funcionario_id},
                  ${input.props.solicitante_id},
                  '${input.props.data_solicitacao}',
                  '${input.props.data_extra}',
                  ${input.props.horas_extras},
                  '${input.props.observacao}',
                  ${input.props.autorizado_por},
                  '${input.props.data_autorizacao}'
                ) RETURNING *`,
            );

            await conn.query("COMMIT");
            return solicitacaoHoraExtra.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }

    }

    async getById(id: number): Promise<number> {
        try {
            const solicitacaoHoraExtraCount = await conn.query(
                `SELECT ID FROM solicitacoes_horas_extras WHERE ID = ${id}`,
            );

            return solicitacaoHoraExtraCount.rowCount;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async getAllFuncionarioId(funcionario_id: number): Promise<SolicitacaoHoraExtraEntity[]> {
        try {
            const solicitacaoHoraExtra = await conn.query(`SELECT
                          id,
                          funcionario_id,
                          solicitante_id,
                          data_solicitacao,
                          data_extra,
                          horas_extras,
                          observacao,
                          autorizado_por,
                          data_autorizacao
                          FROM solicitacoes_horas_extras WHERE FUNCIONARIO_ID = ${funcionario_id}`);

            return solicitacaoHoraExtra.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async update(id: number,input: SolicitacaoHoraExtraEntity): Promise<SolicitacaoHoraExtraEntity> {
        try {
            await conn.query("BEGIN");
            const solicitacaoHoraExtra = await conn.query(
                `UPDATE solicitacoes_horas_extras
                  SET solicitante_id = ${input.props.solicitante_id},
                      data_solicitacao = '${input.props.data_solicitacao}',
                      data_extra = '${input.props.data_extra}',
                      horas_extras = '${input.props.horas_extras},
                      observacao = '${input.props.observacao}',
                      autorizado_por = ${input.props.autorizado_por},
                      data_autorizacao = '${input.props.data_autorizacao}'
            RETURNING *`);
            await conn.query("COMMIT");
            return solicitacaoHoraExtra.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }

    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM solicitacoes_horas_extras WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message);
        }

    }
}