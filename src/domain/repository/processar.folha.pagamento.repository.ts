export interface ProcessarFolhaOutput {
    funcionario_id: number;
    nome: string;
    cpf: string;
    cargo_id: string;
    cargo: string;
    centro_resultado_folha_id: number;
    centro_resultado_folha: string;
    empresa_id: number;
    empresa: string;
    item_pcg_id: number;
    item_pcg: string;
    tipo_folha_id: number;
    tipo_folha: string;
    folha_base_id: number;
    centro_resultado_rateio_id: number;
    centro_resultado_rateio: string;
    salario_base: number;
    encargos: Encargo[];
    provisoes: Provis[];
    convenios: Convenio[];
}

export interface Encargo {
    encargo_id: number;
    encargo_nome: string;
    percentual_empresa: number;
    valor_encargo_empresa: number;
    percentual_funcionario: number;
    valor_encargo_funcionario: number;
}

export interface Provis {
    provisao_id: number;
    nome_provisao: string;
    percentual_provisao: number;
}

export interface Convenio {
    convenio: string;
    convenio_cidade_id: number;
    valor_pagar_convenio: number;
    valor_descontar_convenio: number;
    percentual_descontar_convenio: number;
}

export type ParamsProcessarFolha = {
    centro_resultado_id?: number;
    registrado?: boolean;
    mes?: number;
    ano?: number;
    dias_uteis?: number;
    data_fechamento?: Date;
    funcionario_id?: number;
    tipo_folha_id?: number;

    [key: string]: string | number | boolean | Date;
};

export interface ProcessarFolhaPagamentoRepository {
    getAll(params: ParamsProcessarFolha): Promise<ProcessarFolhaOutput[]>;
}
