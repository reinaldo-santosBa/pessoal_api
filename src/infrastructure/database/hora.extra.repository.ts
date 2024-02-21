import AppError from "../../application/errors/AppError";
import { HoraExtraRepository, StatusOutput } from "../../domain/repository/hora.extra.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";
import HoraExtraEntity from "../../domain/entity/hora.extra";
import { LimiteHorasOutput } from "../../domain/repository/hora.trabalhada.repository";


export default class HoraExtraPostgresRepository implements HoraExtraRepository {

  async getAll(): Promise<HoraExtraEntity[]> {
    try {
      const statusSolicitacao = await conn.query(`select
he.funcionario_id,
he.solicitante_id,
he.data_solicitacao,
he.data_extra,
he.horas_extras,
he.observacao,
he.autorizado_por,
he.data_autorizacao,
he.status_solicitacao_id,
ss.status_solicitacao ,
pf.nome
from horas_extras he inner join pessoas_fisica pf on pf.id  = he.funcionario_id
inner join status_solicitacoes ss on ss.id = he.status_solicitacao_id `);
      return statusSolicitacao.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getStatusSolicitacao(
    funcionario_id: number,
    data_extra: Date,
  ): Promise<StatusOutput> {
    try {
      const statusSolicitacao = await conn.query(
        `select  ss.status_solicitacao,
		she.horas_extras,
		she.data_extra
from status_solicitacoes ss
inner join horas_extras she
on ss.id = she.status_solicitacao_id
where she.funcionario_id =  ${funcionario_id} and ss.status_solicitacao  = 'Aprovado' and she.data_extra = '${data_extra}'`,
      );

      return statusSolicitacao.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async insert(input: HoraExtraEntity): Promise<HoraExtraEntity> {
    try {
      await conn.query("BEGIN");
      const solicitacaoHoraExtra = await conn.query(
        `INSERT INTO horas_extras (
                        funcionario_id,
                        solicitante_id,
                        data_solicitacao,
                        data_extra,
                        horas_extras,
                        observacao,
                        autorizado_por,
                        data_autorizacao,
                        status_solicitacao_id
                ) VALUES (
                  ${input.props.funcionario_id},
                  ${input.props.solicitante_id},
                  '${input.props.data_solicitacao}',
                  '${input.props.data_extra}',
                  ${input.props.horas_extras},
                  '${input.props.observacao}',
                  ${input.props.autorizado_por},
                  '${input.props.data_autorizacao ?? new Date()}',
                  ${input.props.status_solicitacao_id}
                ) RETURNING *`,
      );

      await conn.query("COMMIT");
      return solicitacaoHoraExtra.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getById(id: number): Promise<HoraExtraEntity> {
    try {
      const horaExtra = await conn.query(
        `SELECT * FROM horas_extras WHERE ID = ${id}`,
      );

      return horaExtra.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getAllFuncionarioId(
    funcionario_id: number,
  ): Promise<HoraExtraEntity[]> {
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
                          FROM horas_extras WHERE FUNCIONARIO_ID = ${funcionario_id}`);

      return solicitacaoHoraExtra.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async update(id: number, input: HoraExtraEntity): Promise<HoraExtraEntity> {
    try {
      await conn.query("BEGIN");
      const solicitacaoHoraExtra = await conn.query(
        `UPDATE horas_extras
                  SET solicitante_id = ${input.props.solicitante_id},
                      data_solicitacao = '${input.props.data_solicitacao}',
                      data_extra = '${input.props.data_extra}',
                      horas_extras = '${input.props.horas_extras},
                      observacao = '${input.props.observacao}',
                      autorizado_por = ${input.props.autorizado_por},
                      data_autorizacao = '${input.props.data_autorizacao}'
            RETURNING *`,
      );
      await conn.query("COMMIT");
      return solicitacaoHoraExtra.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query(
        `DELETE FROM horas_extras WHERE ID = ${id}`,
      );
      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getLimiteHoras(funcionario_id: number): Promise<LimiteHorasOutput> {
    try {
      const limiteHoras =
                await conn.query(`select p.limite_hora_extra_diario , p.limite_hora_extra_mensal
from parametros as p
inner join funcionarios_centros_resultado as fcr
on p.centro_resultado  = fcr.centro_resultado_id
where fcr.funcionario_id  = ${funcionario_id} and fcr.data_fim_trabalho  is null`);
      return limiteHoras.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
