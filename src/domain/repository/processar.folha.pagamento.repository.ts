import { IFolhaPagamentoFuncionario } from "./folha/folha.pagamento.repository";

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
    getAll(params: ParamsProcessarFolha): Promise<IFolhaPagamentoFuncionario[]>;
}
