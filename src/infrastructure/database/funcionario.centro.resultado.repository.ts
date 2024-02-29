import AppError from "../../application/errors/AppError";
import FuncionarioCentroResultadoEntity from "../../domain/entity/funcionario.centro.resultado";
import { FuncionarioCentroResultadoRepository } from "../../domain/repository/funcionario.centro.resultado.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";

export default class FuncionarioCentroResultadoPostgresRepository
implements FuncionarioCentroResultadoRepository
{

  async getAll(): Promise<FuncionarioCentroResultadoEntity[]> {
    try {
      const funcionarioCentroResultado =
          await conn.query(`SELECT *
                    FROM funcionarios_centros_resultado`);
      return funcionarioCentroResultado.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getById(id: number): Promise<FuncionarioCentroResultadoEntity> {
    try {
      const funcionarioCentroResultado =
            await conn.query(`SELECT *
                    FROM funcionarios_centros_resultado WHERE id = ${id}`);
      return funcionarioCentroResultado.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }


  async insert(input: FuncionarioCentroResultadoEntity): Promise<FuncionarioCentroResultadoEntity> {
    try {
      await conn.query("BEGIN");
      const funcionarioCentroResultado = await conn.query(
        `INSERT INTO funcionarios_centros_resultado (
                    funcionario_id,
                    centro_resultado_id,
                    data_inicio_trabalho,
                    centro_resultado,
                    cidade_id
              ) VALUES (
                ${input.props.funcionario_id},
                ${input.props.centro_resultado_id},
                '${input.props.data_inicio_trabalho}',
                ${input.props.centro_resultado},
                ${input.props.cidade_id}
              ) RETURNING *`,
      );

      await conn.query("COMMIT");
      return funcionarioCentroResultado.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }


  async update(id: number): Promise<FuncionarioCentroResultadoEntity> {
    try {
      await conn.query("BEGIN");
      const funcionarioCentroResultado = await conn.query(
        `UPDATE funcionarios_centros_resultado SET data_fim_trabalho = '${new Date().toLocaleDateString()}' WHERE ID = ${id} RETURNING *`,
      );
      await conn.query("COMMIT");
      return funcionarioCentroResultado.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }


  async delete(id: number): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query(
        `DELETE FROM funcionarios_centros_resultado WHERE ID = ${id}`,
      );
      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }


  async getAllByFuncionarioId(
    funcionario_id: number,
  ): Promise<FuncionarioCentroResultadoEntity[]> {
    try {
      const funcionarioCentroResultado =
              await conn.query(`SELECT
                    id,
                    funcionario_id,
                    centro_resultado_id,
                    data_inicio_trabalho,
                    data_fim_trabalho
                    FROM funcionarios_centros_resultado WHERE funcionario_id = ${funcionario_id} and data_fim_trabalho is null
                  `);

      return funcionarioCentroResultado.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }


  async getAllByCentroResultadoId(centro_resultado_id: number): Promise<
    FuncionarioCentroResultadoEntity[]
  > {
    try {
      const funcionarioCentroResultado =
        await conn.query(`SELECT funcionario_id,
                    centro_resultado_id,
                    data_inicio_trabalho,
                    data_fim_trabalho
                    FROM funcionarios_centros_resultado WHERE centro_resultado_id = ${centro_resultado_id}`);
      return funcionarioCentroResultado.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
