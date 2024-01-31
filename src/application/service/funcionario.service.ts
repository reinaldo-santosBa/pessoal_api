import ContaBancariaEntity, { ContaBancariaProps } from "../../domain/entity/conta.bancaria";
import EmailEntity, { EmailProps } from "../../domain/entity/email";
import EnderecoEntity, { EnderecoProps } from "../../domain/entity/endereco";
import FuncionarioEntity, { FuncionarioProps } from "../../domain/entity/funcionario";
import PessoaEntity, { PessoaProps } from "../../domain/entity/pessoa";
import PessoaFisicaEntity, { PessoaFisicaProps } from "../../domain/entity/pessoa.fisica";
import TelefoneEntity, { TelefoneProps } from "../../domain/entity/telefones";
import { FuncionarioRepository, IInput } from "../../domain/repository/funcionario.repository";
import { AllFuncionariosOutput, ByIdFuncionarioOutput } from "../../infrastructure/db/funcionario.repository";

export type IInputProps = {
  pessoa: PessoaProps;
  funcionario: FuncionarioProps;
  pessoa_fisica: PessoaFisicaProps;
  emails?: EmailProps[];
  enderecos?: EnderecoProps[];
  telefones?: TelefoneProps[];
  contas_bancarias?: ContaBancariaProps[];
};



export default class FuncionarioService {
    constructor(private readonly funcionarioRepository: FuncionarioRepository) {}

    async create({
        pessoa,
        pessoa_fisica,
        enderecos,
        funcionario,
        emails,
        telefones,
        contas_bancarias,
    }: IInputProps): Promise<IInput> {
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
        });

        return funcionarioResponse;
    }

    async getAll(): Promise<AllFuncionariosOutput[]> {
        const funcionarios = await this.funcionarioRepository.getAll();
        return funcionarios;
    }

    async getById(pessoa_id: number): Promise<ByIdFuncionarioOutput> {
        const funcionario = await this.funcionarioRepository.getById(pessoa_id);
        return funcionario;
    }
}
