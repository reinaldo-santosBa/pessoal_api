import AppError from "../../application/errors/AppError";
import ParametroEntity from "../../domain/entity/parametro";
import { ParametroRepository } from "../../domain/repository/parametro.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";


export default class ParametroPostgresRepository implements ParametroRepository {

  async insert(input: ParametroEntity): Promise<ParametroEntity> {
    try {
      await conn.query("BEGIN");
      const parametro = await conn.query(`INSERT INTO parametros (
                empresa_id,
                empresa,
                limite_hora_extra_diario,
                limite_hora_extra_mensal,
                fornecedor_agrupador_id,
                insumo_mao_de_obra_id,
                servico_folha_pagamento_id
            ) VALUES (
                ${input.props.empresa_id},
                '${input.props.empresa}',
                ${input.props.limite_hora_extra_diario},
                ${input.props.limite_hora_extra_mensal},
                ${input.props.fornecedor_agrupador_id},
                ${input.props.insumo_mao_de_obra_id},
                ${input.props.servico_folha_pagamento_id}
            ) RETURNING *`);

      await conn.query("COMMIT");
      return parametro.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getAll(): Promise<ParametroEntity[]> {
    try {
      const parametros = await conn.query(
        "SELECT * FROM parametros",
      );
      return parametros.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async update(input: ParametroEntity): Promise<ParametroEntity> {
    try {
      await conn.query("BEGIN");
      const parametro = await conn.query(`UPDATE parametros SET
                empresa_id = ${input.props.empresa_id},
                empresa = '${input.props.empresa}',
                limite_hora_extra_diario = ${input.props.limite_hora_extra_diario},
                limite_hora_extra_mensal = ${input.props.limite_hora_extra_mensal},
                fornecedor_agrupador_id = ${input.props.fornecedor_agrupador_id},
                insumo_mao_de_obra_id = ${input.props.insumo_mao_de_obra_id},
                servico_folha_pagamento_id = ${input.props.servico_folha_pagamento_id} RETURNING *`);

      await conn.query("COMMIT");
      return parametro.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async delete(): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query("DELETE FROM PARAMETROS");
      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
