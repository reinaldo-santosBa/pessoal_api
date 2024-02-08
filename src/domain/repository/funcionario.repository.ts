import { AllFuncionariosOutput } from "../../infrastructure/db/funcionario.repository";
import AtividadeFuncionarioEntity from "../entity/atividade.funcionario";
import ContaBancariaEntity from "../entity/conta.bancaria";
import ConvenioCidadeFuncionarioEntity from "../entity/convenio.cidade.funcionario";
import EmailEntity from "../entity/email";
import EnderecoEntity from "../entity/endereco";
import FuncionarioEntity from "../entity/funcionario";
import PessoaEntity from "../entity/pessoa";
import PessoaFisicaEntity from "../entity/pessoa.fisica";
import RateioCentroResultadoEntity from "../entity/rateio.centro.resultado";
import TelefoneEntity from "../entity/telefones";



export type IInput = {
  pessoa: PessoaEntity;
  funcionario: FuncionarioEntity;
  pessoa_fisica: PessoaFisicaEntity;
  emails?: EmailEntity[];
  enderecos?: EnderecoEntity[];
  telefones?: TelefoneEntity[];
  contas_bancarias?: ContaBancariaEntity[];
  atividades_funcionarios: AtividadeFuncionarioEntity[];
  //dependentes: Dependentes[];
  rateios: RateioCentroResultadoEntity[];
  centro_resultado_id: number;
  convenios_cidades_funcionarios: ConvenioCidadeFuncionarioEntity[],
};


export interface FuncionarioRepository {
  insert(input: IInput): Promise<any>;
  delete(id: number): Promise<void>;
  update(id: number, input: any): Promise<any>;
  getAll(): Promise<AllFuncionariosOutput[]>;
  getById(pessoa_id: number): Promise<any>;
}
