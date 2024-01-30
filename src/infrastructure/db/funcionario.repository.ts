import { FuncionarioRepository, IInput } from "../../domain/repository/funcionario.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";
import AppError from "../../application/errors/AppError";
import EmailEntity from "../../domain/entity/email";
import TelefoneEntity from "../../domain/entity/telefones";
import EnderecoEntity from "../../domain/entity/endereco";
import ContaBancariaEntity from "../../domain/entity/conta.bancaria";

export default class FuncionarioPostgresRepository implements FuncionarioRepository {
    async insert({
        funcionario,
        pessoa,
        pessoa_fisica,
        contas_bancarias,
        emails,
        enderecos,
        telefones,
    }: IInput): Promise<any> {
        try {
            await conn.query("BEGIN");

            const newPessoa = await conn.query(
                `INSERT INTO PESSOAS(ATIVO) VALUES(${pessoa.props.ativo}) RETURNING *`,
            );

            const newPessoa_fisica = await conn.query(`INSERT INTO PESSOAS_FISICA(
          ID,
          NOME,
          CPF,
          RG,
          ORGAO_EXPEDITOR,
          CARTEIRA_TRABALHO,
          PIS,
          TITULO_ELEITOR,
          ZONA_TITULO_ELEITOR,
          NACIONALIDADE_ID,
          NOME_MAE,
          NOME_PAI,
          NATURALIDADE_ID,
          NASCIMENTO,
          ESTADO_CIVIL_ID,
          GENERO_ID,
          PCD_ID
          )VALUES(
            ${newPessoa.rows[0].id},
            '${pessoa_fisica.props.nome}',
            '${pessoa_fisica.props.cpf}',
            '${pessoa_fisica.props.rg}',
            '${pessoa_fisica.props.orgao_expeditor}',
            '${pessoa_fisica.props.carteira_trabalho}',
            '${pessoa_fisica.props.pis}',
            '${pessoa_fisica.props.titulo_eleitor}',
            '${pessoa_fisica.props.zona_titulo_eleitor}',
            ${pessoa_fisica.props.nacionalidade_id ?? null},
            '${pessoa_fisica.props.nome_mae ?? null}',
            '${pessoa_fisica.props.nome_pai ?? null}',
            ${pessoa_fisica.props.naturalidade_id ?? null},
            '${pessoa_fisica.props.nascimento ?? null}',
            ${pessoa_fisica.props.estado_civil_id ?? null},
            ${pessoa_fisica.props.genero_id ?? null},
            ${pessoa_fisica.props.pcd_id ?? null}
        ) RETURNING * `);

            const newFuncionario = await conn.query(`INSERT INTO FUNCIONARIOS(
              ID,
              EMPRESA_ID,
              CARGO_ID,
              DATA_ADMISSAO,
              DATA_DEMISSAO,
              ADIANTAMENTO,
              PERICULOSIDADE,
              RECEBER_TRANSPORTE,
              CONTRIBUICAO_SINDICAL,
              JORNADA_TRABALHO_ID,
              REGISTRADO
          )VALUES(
            ${newPessoa.rows[0].id},
            ${funcionario.props.empresa_id},
            ${funcionario.props.cargo_id},
            '${funcionario.props.data_admissao}',
            '${funcionario.props.data_demissao ?? null}',
            ${funcionario.props.adiantamento},
            ${funcionario.props.periculosidade},
            ${funcionario.props.receber_transporte},
            ${funcionario.props.contribuicao_sindical},
            ${funcionario.props.jornada_trabalho_id},
            ${funcionario.props.registrado}
            ) RETURNING * `);

            const emailsOutput: EmailEntity[] = [];
            const telefonesOutput: TelefoneEntity[] = [];
            const enderecoOutput: EnderecoEntity[] = [];
            const contasBancariasOutput: ContaBancariaEntity[] = [];

            for await (const email of emails) {
                const emailResult = await conn.query(
                    "INSERT INTO EMAILS (PESSOA_ID, TIPO_EMAIL_ID, EMAIL) VALUES ($1, $2, $3) RETURNING *",
                    [newPessoa.rows[0].id, email.props.tipo_email_id, email.props.email],
                );
                emailsOutput.push(emailResult.rows[0]);
            }

            for await (const telefone of telefones) {
                const telefoneResult = await conn.query(
                    `INSERT INTO TELEFONES(
                                            PESSOA_ID,
                                            NUMERO,
                                            TIPO_TELEFNE_ID
                                          ) VALUES(
                                              $1,
                                              $2,
                                              $3
                                          ) RETURNING *`,
                    [
                        newPessoa.rows[0].id,
                        telefone.props.numero,
                        telefone.props.tipo_telefne_id,
                    ],
                );

                telefonesOutput.push(telefoneResult.rows[0]);
            }

            for await (const conta_bancaria of contas_bancarias) {
                const contaBancariaResult = await conn.query(`
                INSERT INTO CONTAS_BANCARIAS (
                    pessoa_id,
                    conta,
                    digito,
                    tipo_conta_id,
                    operacao,
                    numero_agencia,
                    digito_agencia,
                    codigo_banco,
                    banco
                )VALUES (
                      ${newPessoa.rows[0].id},
                    '${conta_bancaria.props.conta}',
                    '${conta_bancaria.props.digito}',
                    ${conta_bancaria.props.tipo_conta_id},
                    '${conta_bancaria.props.operacao}',
                    '${conta_bancaria.props.numero_agencia}',
                    '${conta_bancaria.props.digito_agencia}',
                    '${conta_bancaria.props.codigo_banco}',
                    '${conta_bancaria.props.banco}'
                ) RETURNING *`);

                contasBancariasOutput.push(contaBancariaResult.rows[0]);
            }

            for await (const endereco of enderecos) {
                const enderecoResult = await conn.query(
                    `INSERT INTO ENDERECOS (
                cep,
                logradouro,
                pessoa_id,
                tipo_endereco_id,
                complemento,
                numero,
                tipo_logradouro_id,
                bairro_id
          )VALUES(
            $1,
            $2,
            $3,
            $4,
            $5,
            $6,
            $7,
            $8
          ) RETURNING *`,
                    [
                        endereco.props.cep,
                        endereco.props.logradouro,
                        newPessoa.rows[0].id,
                        endereco.props.tipo_endereco_id ?? null,
                        endereco.props.complemento ?? null,
                        endereco.props.numero ?? null,
                        endereco.props.tipo_logradouro_id ?? null,
                        endereco.props.bairro_id ?? null,
                    ],
                );

                enderecoOutput.push(enderecoResult.rows[0]);
            }

            await conn.query("COMMIT");

            return {
                pessoa: newPessoa.rows[0],
                pessoa_fisica: newPessoa_fisica.rows[0],
                funcionario: newFuncionario.rows[0],
                emails: emailsOutput,
                enderecos: enderecoOutput,
                telefones: telefonesOutput,
                contas_bancarias: contasBancariasOutput,
            };
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async delete(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<any> {
        throw new Error("Method not implemented.");
    }


    async getById(pessoa_id: number): Promise<any> {
        throw new Error("Method not implemented.");
    }
}
