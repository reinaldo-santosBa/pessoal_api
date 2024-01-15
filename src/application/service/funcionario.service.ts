import { EmailProps } from "../../domain/entity/email";
import EnderecoEntity, { EnderecoProps } from "../../domain/entity/endereco";
import FuncionarioEntity, { FuncionarioProps } from "../../domain/entity/funcionario";
import PessoaEntity, { PessoaProps } from "../../domain/entity/pessoa";
import PessoaFisicaEntity, { PessoaFisicaProps } from "../../domain/entity/pessoa.fisica";
import { TelefoneProps } from "../../domain/entity/telefones";
import { FuncionarioRepository } from "../../domain/repository/funcionario.repository";
import AppError from "../errors/AppError";

export interface IFuncionario {
  pessoa: PessoaProps;
  funcionario: FuncionarioProps;
  pessoa_fisica: PessoaFisicaProps;
  emails?: EmailProps;
  enderecos: EnderecoProps[];
  telefones?: TelefoneProps;
}


export default class FuncionarioService {
    constructor(private readonly funcionarioRepository: FuncionarioRepository) { }

    async create({pessoa, pessoa_fisica, enderecos,funcionario,emails,telefones }: IFuncionario) {
        try {
            await this.funcionarioRepository.insert({
                pessoa: new PessoaEntity(pessoa),
                funcionario: new FuncionarioEntity(funcionario),
                pessoa_fisica: new PessoaFisicaEntity(pessoa_fisica),

                //enderecos: new EnderecoEntity(enderecos),
                //emails: new EmailEntity(emails),
                //telefones: new TelefoneEntity(telefones),
            });

            return;
        } catch (error) {
            throw new AppError(error.message);
        }
    }
}
