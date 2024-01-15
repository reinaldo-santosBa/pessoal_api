import FuncionarioEntity from "../entity/funcionario";
import PessoaEntity from "../entity/pessoa";
import PessoaFisicaEntity from "../entity/pessoa.fisica";

export type IInput = {
  pessoa: PessoaEntity;
  funcionario: FuncionarioEntity;
  pessoa_fisica: PessoaFisicaEntity;
  //emails?: EmailEntity;
  //enderecos: EnderecoEntity[];
  //telefones?: TelefoneEntity;
};


export interface FuncionarioRepository {
  insert(input: IInput): Promise<void>;
}
