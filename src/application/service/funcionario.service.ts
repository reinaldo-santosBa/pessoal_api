import ContaBancariaEntity, { ContaBancariaProps } from "../../domain/entity/conta.bancaria";
import EmailEntity, { EmailProps } from "../../domain/entity/email";
import EnderecoEntity, { EnderecoProps } from "../../domain/entity/endereco";
import FuncionarioEntity, { FuncionarioProps } from "../../domain/entity/funcionario";
import PessoaEntity, { PessoaProps } from "../../domain/entity/pessoa";
import PessoaFisicaEntity, { PessoaFisicaProps } from "../../domain/entity/pessoa.fisica";
import TelefoneEntity, { TelefoneProps } from "../../domain/entity/telefones";
import { FuncionarioRepository } from "../../domain/repository/funcionario.repository";

export type IInput = {
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
        contas_bancarias
    }: IInput) {
        const funcionarioResponse = await this.funcionarioRepository.insert({
            pessoa: new PessoaEntity(pessoa),
            funcionario: new FuncionarioEntity(funcionario),
            pessoa_fisica: new PessoaFisicaEntity(pessoa_fisica),
            enderecos: enderecos.map(
                endereco => new EnderecoEntity(endereco),
            ),
            emails: emails.map(
                email => new EmailEntity(email)
            ),
            telefones: telefones.map(
                telefone => new TelefoneEntity(telefone),
            ),
            contas_bancarias: contas_bancarias.map(
                conta_bancaria => new ContaBancariaEntity(conta_bancaria)
            )
        });

        return funcionarioResponse;
    }
}
