import FolhaBaseEntity from "../../domain/entity/folha/folha.base";
import FolhaBaseConvenioCidadeEntity from "../../domain/entity/folha/folha.base.convenio.cidade";
import FolhaBaseEncargoEntity from "../../domain/entity/folha/folha.base.encargo";
import FolhaBaseItemPcgEntity from "../../domain/entity/folha/folha.base.itens.pcg";
import FolhaBaseProvisaoEntity from "../../domain/entity/folha/folha.base.provisao";

export type FolhaBaseType = {
    folha_base: FolhaBaseEntity;
    folha_base_provisoes: FolhaBaseProvisaoEntity[];
    folha_base_convenios_cidades: FolhaBaseConvenioCidadeEntity[];
    folha_base_itens_pcg: FolhaBaseItemPcgEntity[];
    folha_base_encargos: FolhaBaseEncargoEntity[];
};