import AppError from "../../application/errors/AppError";
import ConvenioCidadeEntity from "../../domain/entity/convenio.cidade";
import { ConvenioCidadeRepository } from "../../domain/repository/convenio.cidade.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";


export type AllConvenioCidade = {
    cidade_id: number;
    convenio_id: number;
    valor_pagar: number;
    percentual_descontar: number;
    valor_descontar: number;
    convenio: string;
};
export default class ConvenioCidadePostgresRepository implements ConvenioCidadeRepository {
  async insert(input: ConvenioCidadeEntity): Promise<ConvenioCidadeEntity> {
    try {
      await conn.query("BEGIN");
      const convenioCidade =
                await conn.query(`INSERT INTO convenios_cidades(
                cidade_id,
                convenio_id,
                valor_pagar,
                percentual_descontar,
                valor_descontar
            ) values (
                ${input.props.cidade_id},
                ${input.props.convenio_id},
                ${input.props.valor_pagar},
                ${input.props.percentual_descontar},
                ${input.props.valor_descontar}
            ) RETURNING *`);
      await conn.query("COMMIT");
      return convenioCidade.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async update(
    id: number,
    input: ConvenioCidadeEntity,
  ): Promise<ConvenioCidadeEntity> {
    try {
      await conn.query("BEGIN");
      const convenioCidade =
                await conn.query(`UPDATE convenios_cidades SET
                cidade_id = ${input.props.cidade_id},
                convenio_id = ${input.props.convenio_id},
                valor_pagar = ${input.props.valor_pagar},
                percentual_descontar = ${input.props.percentual_descontar},
                valor_descontar = ${input.props.valor_descontar}
         WHERE ID = ${id} RETURNING *`);

      await conn.query("COMMIT");
      return convenioCidade.rows[0];
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async geAll(): Promise<AllConvenioCidade[]> {
    try {
      const convenioCidade = await conn.query(`SELECT id,
                    cd.cidade_id,
                    cd.convenio_id,
                    cd.valor_pagar,
                    cd.percentual_descontar,
                    cd.valor_descontar,
                    c.convenio
                    FROM convenios_cidades cd
                    inner join convenios c on c.id  = cd.convenio_id`);
      return convenioCidade.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getById(id: number): Promise<ConvenioCidadeEntity> {
    try {
      const convenioCidade = await conn.query(`SELECT id,
                    cidade_id,
                    convenio_id,
                    valor_pagar,
                    percentual_descontar,
                    valor_descontar FROM convenios_cidades WHERE ID = ${id}`);
      return convenioCidade.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getByCidadeId(cidade_id: number) {
    try {
      const convenioCidade = await conn.query(`SELECT id,
                    cidade_id,
                    convenio_id,
                    valor_pagar,
                    percentual_descontar,
                    valor_descontar FROM convenios_cidades WHERE cidade_id = ${cidade_id}`);
      return convenioCidade.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query(`DELETE FROM convenios_cidades WHERE ID = ${id}`);
      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}