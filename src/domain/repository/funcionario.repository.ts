import { AllFuncionariosOutput } from "../../infrastructure/database/funcionario.repository";
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


export type Dependentes = {
    pessoa: PessoaEntity;
    pessoa_fisica: PessoaFisicaEntity;
    dependente?: {
        tipo_dependente_id: number;
    }
};


export type IInput = {
    pessoa: PessoaEntity;
    funcionario: FuncionarioEntity;
    pessoa_fisica: PessoaFisicaEntity;
    emails?: EmailEntity[];
    enderecos?: EnderecoEntity[];
    telefones?: TelefoneEntity[];
    contas_bancarias?: ContaBancariaEntity[];
    atividades_funcionarios?: AtividadeFuncionarioEntity[];
    rateios: RateioCentroResultadoEntity[];
    centro_resultado_id: number;
    convenios_cidades_funcionarios?: ConvenioCidadeFuncionarioEntity[];
    dependentes: Dependentes[];
};


export interface FuncionarioRepository {
    insert(input: IInput): Promise<IInput>;
    delete(id: number): Promise<void>;
    update(id: number, input: any): Promise<void>;
    getAll(centro_resultado_id?: number): Promise<AllFuncionariosOutput[]>;
    getById(pessoa_id: number): Promise<any>;
}
