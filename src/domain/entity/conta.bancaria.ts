export type ContaBancariaProps = {
  pessoa_id: number;
  conta: string;
  digito: string;
  tipo_conta_id: number;
  operacao: string;
  numero_agencia: string;
  digito_agencia: string;
  codigo_banco: string;
  banco: string;


  [key: string]: string | number;
};

export default class ContaBancariaEntity {
    public readonly id: number;
    public props: ContaBancariaProps;

    constructor(props: ContaBancariaProps) {
        this.props = {
            ...props,
        };
    }
}
