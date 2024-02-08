import AtividadeFuncionarioEntity, { AtividadeFuncionarioProps } from "./../../domain/entity/atividade.funcionario";
import ContaBancariaEntity, { ContaBancariaProps } from "../../domain/entity/conta.bancaria";
import EmailEntity, { EmailProps } from "../../domain/entity/email";
import EnderecoEntity, { EnderecoProps } from "../../domain/entity/endereco";
import FuncionarioEntity, { FuncionarioProps } from "../../domain/entity/funcionario";
import PessoaEntity, { PessoaProps } from "../../domain/entity/pessoa";
import PessoaFisicaEntity, { PessoaFisicaProps } from "../../domain/entity/pessoa.fisica";
import RateioCentroResultadoEntity, { RateioCentroResultadoProps } from "../../domain/entity/rateio.centro.resultado";
import TelefoneEntity, { TelefoneProps } from "../../domain/entity/telefones";
import { FuncionarioRepository, IInput } from "../../domain/repository/funcionario.repository";
import { AllFuncionariosOutput, FuncionarioOutput } from "../../infrastructure/db/funcionario.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";
import ConvenioCidadeFuncionarioEntity, { ConvenioCidadeFuncionarioProps } from "../../domain/entity/convenio.cidade.funcionario";

export type IInputProps = {
    pessoa: PessoaProps;
    funcionario: FuncionarioProps;
    pessoa_fisica: PessoaFisicaProps;
    emails?: EmailProps[];
    enderecos?: EnderecoProps[];
    telefones?: TelefoneProps[];
    contas_bancarias?: ContaBancariaProps[];
    centro_resultado_id: number;
    rateios: RateioCentroResultadoProps[];
    atividades_funcionarios?: AtividadeFuncionarioProps[];
    convenios_cidades_funcionarios?: ConvenioCidadeFuncionarioProps[]
};



export default class FuncionarioService {
  constructor(private readonly funcionarioRepository: FuncionarioRepository) { }
  private readonly totalRateio: number = 100;

  async create({
    pessoa,
    pessoa_fisica,
    enderecos,
    funcionario,
    emails,
    telefones,
    contas_bancarias,
    rateios,
    centro_resultado_id,
    atividades_funcionarios,
    convenios_cidades_funcionarios
  }: IInputProps): Promise<IInput> {

    let totalPercentual: number = 0;
    for await (const rateio of rateios) {
      totalPercentual += rateio.percentual;
    }

    if (totalPercentual !== this.totalRateio) {
      throw new AppError("A soma dos percentuais deve ser igual a 100%", status.BAD_REQUEST);
    }

    const funcionarioResponse = await this.funcionarioRepository.insert({
      pessoa: new PessoaEntity(pessoa),
      funcionario: new FuncionarioEntity(funcionario),
      pessoa_fisica: new PessoaFisicaEntity(pessoa_fisica),
      enderecos: enderecos.map(endereco => new EnderecoEntity(endereco)),
      emails: emails.map(email => new EmailEntity(email)),
      telefones: telefones.map(telefone => new TelefoneEntity(telefone)),
      contas_bancarias: contas_bancarias.map(
        conta_bancaria => new ContaBancariaEntity(conta_bancaria),
      ),
      rateios: rateios.map(
        rateio => new RateioCentroResultadoEntity(rateio),
      ),
      centro_resultado_id,
      atividades_funcionarios: atividades_funcionarios.map(
        atividade => new AtividadeFuncionarioEntity(atividade),
      ),
      convenios_cidades_funcionarios: convenios_cidades_funcionarios.map(
        convenio_cidade =>
          new ConvenioCidadeFuncionarioEntity(convenio_cidade),
      ),
    });

    return funcionarioResponse;
  }

  async getAll(): Promise<AllFuncionariosOutput[]> {
    const funcionarios = await this.funcionarioRepository.getAll();
    return funcionarios;
  }

  async getById(pessoa_id: number): Promise<FuncionarioOutput> {
    const funcionario = await this.funcionarioRepository.getById(pessoa_id);
    return funcionario;
  }
}
