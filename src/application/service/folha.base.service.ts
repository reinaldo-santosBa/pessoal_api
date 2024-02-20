import * as status from "../../constraints/http.stauts";
import FolhaBaseConvenioCidadeEntity, { FolhaBaseConvenioCidadeProps } from "../../domain/entity/folha/folha.base.convenio.cidade";
import FolhaBaseEncargoEntity, { FolhaBaseEncargoProps } from "../../domain/entity/folha/folha.base.encargo";
import FolhaBaseItemPcgEntity, { FolhaBaseItemPcgProps } from "../../domain/entity/folha/folha.base.itens.pcg";
import FolhaBaseProvisaoEntity, { FolhaBaseProvisaoProps } from "../../domain/entity/folha/folha.base.provisao";
import { FolhaBaseRepository } from "../../domain/repository/folha/folha.base.repository";
import { FolhaBaseType } from "../../infrastructure/types/folha.base.type";
import AppError from "../errors/AppError";
import FolhaBaseEntity, { FolhaBaseProps } from "./../../domain/entity/folha/folha.base";


export type FolhaBaseInput = {
    folha_base: FolhaBaseProps;
    folha_base_provisoes: FolhaBaseProvisaoProps[];
    folha_base_convenios_cidades: FolhaBaseConvenioCidadeProps[];
    folha_base_itens_pcg: FolhaBaseItemPcgProps[];
    folha_base_encargos: FolhaBaseEncargoProps[];
};



export default class FolhaBaseService {
  constructor(private readonly folhaBaseRepository: FolhaBaseRepository) {}

  async create(input: FolhaBaseInput): Promise<FolhaBaseType> {

    if (!input.folha_base.empresa_id) {
      throw new AppError("empresa_id obrigatório", status.BAD_REQUEST);
    }


    if (input.folha_base_convenios_cidades.length === 0) {
      throw new AppError(
        "folha_base_convenios_cidades obrigatório",
        status.BAD_REQUEST,
      );
    }

    for (const convenioInput of input.folha_base_convenios_cidades) {
      const camposObrigatoriosConvenioCidade: string[] = [
        "convenio_cidade_id",
        "valor_pagar",
      ];

      for (const campo of camposObrigatoriosConvenioCidade) {
        if (!convenioInput[campo]) {
          throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
        }
      }
    }

    if (input.folha_base_encargos.length === 0) {
      throw new AppError("folha_base_encargos obrigatório", status.BAD_REQUEST);
    }
    for (const encargoInput of input.folha_base_encargos) {
      const camposObrigatoriosEncargo: string[] = [
        "encargo_id",
      ];

      for (const campo of camposObrigatoriosEncargo) {
        if (!encargoInput[campo]) {
          throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
        }
      }
    }


    if (input.folha_base_itens_pcg.length === 0) {
      throw new AppError(
        "folha_base_itens_pcg obrigatório",
        status.BAD_REQUEST,
      );
    }
    for (const itemPcgInput of input.folha_base_itens_pcg) {
      const camposObrigatoriosItemPcg: string[] = [
        "tipo_folha_id",
        "item_pcg_id",
      ];

      for (const campo of camposObrigatoriosItemPcg) {
        if (!itemPcgInput[campo]) {
          throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
        }
      }
    }


    if (input.folha_base_provisoes.length === 0) {
      throw new AppError(
        "folha_base_provisoes obrigatório",
        status.BAD_REQUEST,
      );
    }
    for (const provisoesInput of input.folha_base_provisoes) {
      const camposObrigatoriosConvenioCidade: string[] = [
        "provisao_id"
      ];

      for (const campo of camposObrigatoriosConvenioCidade) {
        if (!provisoesInput[campo]) {
          throw new AppError(`${campo} obrigatório`, status.BAD_REQUEST);
        }
      }
    }



    const folha_base = await this.folhaBaseRepository.insert({
      folha_base: new FolhaBaseEntity(input.folha_base),
      folha_base_provisoes: input.folha_base_provisoes.map(
        provisao => new FolhaBaseProvisaoEntity(provisao),
      ),
      folha_base_convenios_cidades: input.folha_base_convenios_cidades.map(convenio => new FolhaBaseConvenioCidadeEntity(convenio)),
      folha_base_itens_pcg: input.folha_base_itens_pcg.map(item_pcg => new FolhaBaseItemPcgEntity(item_pcg)),
      folha_base_encargos: input.folha_base_encargos.map(encargo => new FolhaBaseEncargoEntity(encargo))
    });

    await this.folhaBaseRepository.update();
    return folha_base;
  }

  async getAll(): Promise<FolhaBaseType[]> {
    const folha_base = await this.folhaBaseRepository.getAll();

    return folha_base;
  }
}
