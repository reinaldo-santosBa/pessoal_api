import AppError from "../../../application/errors/AppError";
import * as status from "../../../constraints/http.stauts";
import FolhaBaseConvenioCidadeEntity from "../../../domain/entity/folha/folha.base.convenio.cidade";
import FolhaBaseEncargoEntity from "../../../domain/entity/folha/folha.base.encargo";
import FolhaBaseItemPcgEntity from "../../../domain/entity/folha/folha.base.itens.pcg";
import FolhaBaseProvisaoEntity from "../../../domain/entity/folha/folha.base.provisao";
import { FolhaBaseRepository } from "../../../domain/repository/folha/folha.base.repository";
import conn from "../../config/database.config";
import { FolhaBaseType } from "../../types/folha.base.type";

export default class FolhaBasePostgresRepository implements FolhaBaseRepository {

  async insert(input: FolhaBaseType): Promise<FolhaBaseType> {
    try {

      await conn.query("BEGIN");

      const folha_base = await conn.query(`INSERT INTO folhas_base (
                empresa_id,
                adiantamento,
                ativo
            ) VALUES (
                ${input.folha_base.props.empresa_id},
                ${input.folha_base.props.adiantamento},
                ${input.folha_base.props.ativo}
            ) RETURNING *`);

      const folhaBaseConvenioOutput: FolhaBaseConvenioCidadeEntity[] = [];
      for await (const folhaBaseConvenio of input.folha_base_convenios_cidades) {
        const folhaBaseConvenioResult = await conn.query(`
                INSERT INTO folhas_base_convenios_cidades (
                    folha_base_id,
                    convenio_cidade_id,
                    valor_pagar,
                    valor_descontar,
                    percentual_descontar
                ) VALUES (
                    ${folha_base.rows[0].id},
                    ${folhaBaseConvenio.props.convenio_cidade_id},
                    ${folhaBaseConvenio.props.valor_pagar},
                    ${folhaBaseConvenio.props.valor_descontar},
                    ${folhaBaseConvenio.props.percentual_descontar}
                ) RETURNING *
                `);
        folhaBaseConvenioOutput.push(folhaBaseConvenioResult.rows[0]);
      }


      const folhaBaseEncargoOutput: FolhaBaseEncargoEntity[] = [];
      for await (const folhaBaseEncargo of input.folha_base_encargos) {
        const folhaBaseEncargoResult = await conn.query(
          `INSERT INTO folhas_base_encargos (
                        encargo_id,
                        folha_base_id,
                        percentual_empresa,
                        percentual_funcionario
                    ) VALUES (
                        ${folhaBaseEncargo.props.encargo_id},
                        ${folha_base.rows[0].id},
                        ${folhaBaseEncargo.props.percentual_empresa},
                        ${folhaBaseEncargo.props.percentual_funcionario}
                    ) RETURNING *`,
        );
        folhaBaseEncargoOutput.push(folhaBaseEncargoResult.rows[0]);
      }

      const folhaBaseItemPcgOutput: FolhaBaseItemPcgEntity[] = [];
      for await (const folhaBaseItemPcg of input.folha_base_itens_pcg) {
        const folhaBaseItemPcgResult = await conn.query(
          `INSERT INTO folha_base_itens_pcg (
                        folha_base_id,
                        tipo_folha_id,
                        item_pcg_id,
                        item_pcg
                    ) VALUES (
                        ${folha_base.rows[0].id},
                        ${folhaBaseItemPcg.props.tipo_folha_id},
                        ${folhaBaseItemPcg.props.item_pcg_id},
                        '${folhaBaseItemPcg.props.item_pcg}'
                    ) RETURNING *`,
        );
        folhaBaseItemPcgOutput.push(folhaBaseItemPcgResult.rows[0]);
      }


      const folhaBaseProvisaoOutput: FolhaBaseProvisaoEntity[] = [];
      for await (const folhaBaseProvisao of input.folha_base_provisoes) {
        const folhaBaseProvisaoResult =
                    await conn.query(`INSERT INTO folhas_base_provisoes (
                        folha_base_id,
                        provisao_id,
                        percentual
                    ) VALUES (
                        ${folha_base.rows[0].id},
                        ${folhaBaseProvisao.props.provisao_id},
                        ${folhaBaseProvisao.props.percentual}
                    ) RETURNING *`);
        folhaBaseProvisaoOutput.push(folhaBaseProvisaoResult.rows[0]);
      }

      await conn.query("COMMIT");

      return {
        folha_base: folha_base.rows[0],
        folha_base_provisoes: folhaBaseProvisaoOutput,
        folha_base_convenios_cidades: folhaBaseConvenioOutput,
        folha_base_itens_pcg: folhaBaseItemPcgOutput,
        folha_base_encargos: folhaBaseEncargoOutput,
      };
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  /*  async update(
        id: number,
        input: FolhaBaseEntity,
    ): Promise<FolhaBaseEntity> {
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

    async get(): Promise<FolhaBaseEntity[]> {
        try {
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }*/
}
