export type ParametroProps = {
    empresa_id: number;
    empresa: string;
    limite_hora_extra_diario: number;
    limite_hora_extra_mensal: number;
    fornecedor_agrupador_id: number;
    insumo_mao_de_obra_id: number;
    servico_folha_pagamento_id: number
};


export default class ParametroEntity {
  public props: ParametroProps;

  constructor(props: ParametroProps) {
    this.props = {
      ...props
    };
  }
}
