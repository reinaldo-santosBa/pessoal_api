import ContaBancariaEntity from "../entity/conta.bancaria";
import EmailEntity from "../entity/email";
import EnderecoEntity from "../entity/endereco";
import FuncionarioEntity from "../entity/funcionario";
import PessoaEntity from "../entity/pessoa";
import PessoaFisicaEntity from "../entity/pessoa.fisica";
import TelefoneEntity from "../entity/telefones";

export type IInput = {
  pessoa: PessoaEntity;
  funcionario: FuncionarioEntity;
  pessoa_fisica: PessoaFisicaEntity;
  emails?: EmailEntity[];
  enderecos?: EnderecoEntity[];
  telefones?: TelefoneEntity[];
  contas_bancarias?: ContaBancariaEntity[];

};


export interface FuncionarioRepository {
  insert(input: IInput): Promise<IInput>;
  delete(id: number): Promise<void>;
  getAll(): Promise<any>;
  getById(pessoa_id: number): Promise<any>;
}
