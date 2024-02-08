import AppError from "../../../application/errors/AppError";
import FolhaPagamentoFuncionarioEntity from "../../../domain/entity/folha/folha.pagamento.funcionario";
import { FolhaPagamentoFuncionarioRepository } from "../../../domain/repository/folha/folha.pagamento.funcionario.repository";
import conn from "../../config/database.config";
import * as status from "../../../constraints/http.stauts";


export default class FolhaPagamentoFuncionarioPostgresRepository implements FolhaPagamentoFuncionarioRepository {

  async insert(input: FolhaPagamentoFuncionarioEntity): Promise<FolhaPagamentoFuncionarioEntity> {
    try {
      await conn.query("BEGIN");
      const folhaPagamentoFuncionario = await conn.query(
        `INSERT INTO folhas_pagamento_funcionarios (
                                folha_pagamento_id,
                                centro_resultado_id,
                                item_pcg_id,
                                funcionario_id,
                                tipo_folha_id,
                                salario_liquido
                                ) VALUES (
                                 ${input.props.folha_pagamento_id},
                                 ${input.props.centro_resultado_id},
                                 ${input.props.item_pcg_id},
                                 ${input.props.funcionario_id},
                                 ${input.props.tipo_folha_id},
                                 ${input.props.salario_liquido}
                                ) RETURNING *`
      );
      await conn.query("COMMIT");
      return folhaPagamentoFuncionario.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);

    }
  }
    
  async update(id: number, input: FolhaPagamentoFuncionarioEntity): Promise<FolhaPagamentoFuncionarioEntity> {
    try {
      await conn.query("BEGIN");

      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
  
  async delete(id: number): Promise<void> {

    try {
      await conn.query("BEGIN");

      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
  
  async get(): Promise<FolhaPagamentoFuncionarioEntity[]> {
    
    try {

    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

}