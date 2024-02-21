
export interface ProcessarFolhaOutput {
    centro_resultado_rateio_id: number;
    centro_resultado_rateio: string;
    funcionario_id: number;
    nome: string;
    cpf: string;
    centro_resultado_folha_id: number;
    centro_resultado_folha: string;
    salario_base: number;
    encargo_nome: string;
    percentual_empresa: number;
    percentual_funcionario: number;
    valor_encargo_empresa: number;
    valor_encargo_funcionario: number;
    nome_provisao: string;
    percentual_provisao: number;
    valor_descontar_convenio: number;
    valor_pagar_convenio: number;
    percentual_descontar_convenio: number;
    empresa_id: number;
    item_pcg_id: number;
    tipo_folha_id: number;
    provisao_id: number;
    encargo_id: number;
    convenio_cidade_id: number
}


export type ParamsProcessarFolha = {
    centro_resultado_id: number;
    registrado: boolean;
    mes: number;
    ano: number;
    dias_uteis: number;
    data_fechamento: Date;
    funcionario_id?: number;
    tipo_folha_id: number;

    [key: string]: string | number | boolean | Date;
};


export interface ProcessarFolhaPagamentoRepository {
    getAll(params: ParamsProcessarFolha): Promise<ProcessarFolhaOutput[]>;
}
