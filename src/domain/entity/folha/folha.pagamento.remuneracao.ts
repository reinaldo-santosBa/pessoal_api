export type FolhaPagamentoRemuneracaoProps = {
  tipo_remuneracao_id: number;
  valor: number;
  folha_pagamento_funcionario_id: number;
};

export default class FolhaPagamentoRemuneracaoEntity {
    public props: FolhaPagamentoRemuneracaoProps;

    constructor(props: FolhaPagamentoRemuneracaoProps) {
        this.props = {
            ...props,
        };
    }
}
