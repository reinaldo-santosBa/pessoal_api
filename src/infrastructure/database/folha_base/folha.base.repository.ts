import AppError from "../../../application/errors/AppError";
import * as status from "../../../constraints/http.stauts";
import FolhaBaseEntity from "../../../domain/entity/folha_base/folha.base";
import FolhaBaseConvenioCidadeEntity from "../../../domain/entity/folha_base/folha.base.convenio.cidade";
import FolhaBaseEncargoEntity from "../../../domain/entity/folha_base/folha.base.encargo";
import FolhaBaseItemPcgEntity from "../../../domain/entity/folha_base/folha.base.itens.pcg";
import FolhaBaseProvisaoEntity from "../../../domain/entity/folha_base/folha.base.provisao";
import { FolhaBaseRepository, IFolhaBaseResult } from "../../../domain/repository/folha/folha.base.repository";
import conn from "../../config/database.config";
import { FolhaBaseType } from "../../types/folha.base.type";

export default class FolhaBasePostgresRepository implements FolhaBaseRepository {
  async getAtivo(): Promise<IFolhaBaseResult> {
    try {
      const folhaBase = await conn.query(`select *
                    from folhas_base
                    where ativo = true
        `);
      return folhaBase.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async insert(input: FolhaBaseType): Promise<FolhaBaseType> {
    try {
      await conn.query("BEGIN");
      await this.update();

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

  async update(): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query("UPDATE folhas_base SET ativo = false");
      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getAll(): Promise<FolhaBaseType[]> {
    try {
      const folha_base = await conn.query(`select fb.id as fb_id,
fb.empresa_id,
fb.adiantamento,
fb.ativo,
fbcc.id as fbcc_id,
fbcc.convenio_cidade_id,
fbcc.valor_pagar,
fbcc.valor_descontar,
fbcc.percentual_descontar,
fbip.id as fbip_id,
fbip.tipo_folha_id,
fbip.item_pcg_id,
fbip.item_pcg,
fbp.id as fbp_id,
fbp.folha_base_id,
fbp.provisao_id,
fbp.percentual,
fbe.id as fbe_id,
fbe.encargo_id,
fbe.percentual_empresa,
fbe.percentual_funcionario
from folhas_base fb
inner join folha_base_itens_pcg fbip on fbip.folha_base_id  = fb.id
inner join folhas_base_convenios_cidades fbcc on fbcc.folha_base_id = fb.id
inner join folhas_base_encargos fbe on fbe.folha_base_id = fb.id
inner join folhas_base_provisoes fbp on fbp.folha_base_id = fb.id
`);

      return folha_base.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getById(id: number): Promise<FolhaBaseEntity> {
    try {
      const folha_base = await conn.query(`SELECT id,
empresa_id,
adiantamento,
ativo FROM FOLHAS_BASE WHERE ID = ${id}`);
      return folha_base.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
