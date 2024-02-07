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

        const folha_base = await this.folhaBaseRepository.insert({
            folha_base: new FolhaBaseEntity(input.folha_base),
            folha_base_provisoes: input.folha_base_provisoes.map(
                provisao => new FolhaBaseProvisaoEntity(provisao),
            ),
            folha_base_convenios_cidades: input.folha_base_convenios_cidades.map(convenio => new FolhaBaseConvenioCidadeEntity(convenio)),
            folha_base_itens_pcg: input.folha_base_itens_pcg.map(item_pcg => new FolhaBaseItemPcgEntity(item_pcg)),
            folha_base_encargos: input.folha_base_encargos.map(encargo => new FolhaBaseEncargoEntity(encargo))
        });

        return folha_base;
    }
}
