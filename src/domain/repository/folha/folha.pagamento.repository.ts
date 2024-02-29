export type InputFolhaPagamento = {
    empresa_id?: number;
    mes: number;
    ano: number;
    dias_uteis: number;
    data_fechamento: Date;
    valor_folha?: number;
    folha_base_id?: number;
    empresa?: string;
    registrado?: boolean;
    centro_resultado_id?: number
};

export type inputFolhaPagamento = {
    folha_pagamento: InputFolhaPagamento;
    funcionarios: IFolhaPagamentoFuncionario[];
};

export interface IFolhaPagamentoFuncionario {
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
    encargos: IEncargo[];
    provisoes: IProvisao[];
    convenios: IConvenio[];
}

export interface IEncargo {
    encargo_id: number;
    encargo_nome: string;
    percentual_empresa: number;
    valor_encargo_empresa: number;
    percentual_funcionario: number;
    valor_encargo_funcionario: number;
}

export interface IProvisao {
    provisao_id: number;
    nome_provisao: string;
    percentual_provisao: number;
}

export interface IConvenio {
    convenio: string;
    convenio_cidade_id: number;
    valor_pagar_convenio: number;
    valor_descontar_convenio: number;
    percentual_descontar_convenio: number;
}

export type TransacaoContasPagar = {
    TRPG_EMPR_COD: number;
    TRPG_FORN_COD: number;
    TRPG_DTEMIS: number;
    TRPG_VALBRUTO: number;
    TRPG_DTORIGEM: number;
    TRPG_FOME_COD: number;
};

export type TransacaoParcelasContasPagar = {
    TRPP_VALPREV: number;
    TRPP_ITPC_COD: number;
    TRPP_OBS: string;
    TRPP_DTVENC: Date;
    TRPP_DTEMIS: Date;
    TRPP_CERE_COD: number;
    TRPP_SIGLA: string;
    TRPP_DTPREV: Date;
};

export type TransacaoLog = {
    LOTP_USUA_COD: number;
};

export type InputGerarContasPagar = {
    transacao?: TransacaoContasPagar;
    transacao_parcelas?: TransacaoParcelasContasPagar[];
    log_transacao?: TransacaoLog;
};


export interface FolhaPagamentoRepository {
    insert({
      folha_pagamento,
      funcionarios,
    }: inputFolhaPagamento): Promise<void>;
}
