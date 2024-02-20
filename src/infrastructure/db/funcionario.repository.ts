import { FuncionarioRepository, IInput } from "../../domain/repository/funcionario.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";
import AppError from "../../application/errors/AppError";
import EmailEntity from "../../domain/entity/email";
import TelefoneEntity from "../../domain/entity/telefones";
import EnderecoEntity from "../../domain/entity/endereco";
import ContaBancariaEntity from "../../domain/entity/conta.bancaria";
import RateioCentroResultadoEntity from "../../domain/entity/rateio.centro.resultado";
import AtividadeFuncionarioEntity from "../../domain/entity/atividade.funcionario";
import ConvenioCidadeFuncionarioEntity from "../../domain/entity/convenio.cidade.funcionario";
import FuncionarioEntity from "../../domain/entity/funcionario";
import PessoaEntity from "../../domain/entity/pessoa";
import PessoaFisicaEntity from "../../domain/entity/pessoa.fisica";
import api from "../services/api";
import { formatCPF } from "../../utils/formatCPF";

export interface AllFuncionariosOutput {
  id: number;
  ativo: boolean;
  nome: string;
  cpf: string;
  carteira_trabalho: string;
  nascimento: Date;
  empresa_id: number;
  cargo: string;
  registrado: boolean;
}


export interface FuncionarioOutput {
  id: string;
  ativo: boolean;
  created_at: string;
  updated_at: string;
  nome: string;
  cpf: string;
  rg: string;
  orgao_expeditor: string;
  nacionalidade_id: number;
  nome_mae: string;
  nome_pai: string;
  naturalidade_id: number;
  carteira_trabalho: string;
  titulo_eleitor: string;
  zona_titulo_eleitor: string;
  nascimento: string;
  estado_civil_id: number;
  genero_id: number;
  pis: string;
  pcd_id: number;
  empresa_id: string;
  cargo_id: string;
  data_admissao: string;
  data_demissao: string;
  adiantamento: boolean;
  periculosidade: boolean;
  receber_transporte: boolean;
  contribuicao_sindical: boolean;
  jornada_trabalho_id: string;
  registrado: boolean;
  cargo: string;
  remuneracao: string;
  comissao_direta: string;
  comissao_indireta: string;
}


export type FuncionarioUpdateType = {
    funcionario: FuncionarioEntity;
    pessoa: PessoaEntity;
    pessoa_fisica: PessoaFisicaEntity;
}

export default class FuncionarioPostgresRepository implements FuncionarioRepository {
  async insert({
    funcionario,
    pessoa,
    pessoa_fisica,
    contas_bancarias,
    emails,
    enderecos,
    telefones,
    atividades_funcionarios,
    rateios,
    centro_resultado_id,
    convenios_cidades_funcionarios,
  }: IInput): Promise<any> {
    try {
      await conn.query("BEGIN");
      const emailsOutput: EmailEntity[] = [];
      const telefonesOutput: TelefoneEntity[] = [];
      const enderecoOutput: EnderecoEntity[] = [];
      const contasBancariasOutput: ContaBancariaEntity[] = [];
      const atividadesOutput: AtividadeFuncionarioEntity[] = [];
      const convenioCidadeFuncionarioOutput: ConvenioCidadeFuncionarioEntity[] =
                [];

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
            '${formatCPF(pessoa_fisica.props.cpf)}',
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
              empresa,
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
            '${funcionario.props.empresa}',
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

      const funcionarios_centros_resultado = await conn.query(
        `INSERT INTO funcionarios_centros_resultado(
                    funcionario_id,
                    centro_resultado_id,
                    data_inicio_trabalho
                )VALUES (
                  ${newFuncionario.rows[0].id},
                  ${centro_resultado_id},
                  '${funcionario.props.data_admissao}'
                ) RETURNING *`,
      );

      const newRateio = await conn.query(
        `INSERT INTO RATEIOS (funcionario_id) VALUES (${newPessoa.rows[0].id}) RETURNING *`,
      );

      const rateioCentroResultadoOutput: RateioCentroResultadoEntity[] =
                [];
      for await (const rateio of rateios) {
        const rateioResult =
                    await conn.query(`INSERT INTO rateios_centros_resultado (
                  rateio_id,
                  centro_resultado_id,
                  centro_resultado,
                  percentual
                ) VALUES(
                  ${newRateio.rows[0].id},
                  ${rateio.props.centro_resultado_id},
                  '${rateio.props.centro_resultado}',
                  ${rateio.props.percentual}
              ) RETURNING *`);

        rateioCentroResultadoOutput.push(rateioResult.rows[0]);
      }

      if (emails) {
        for await (const email of emails) {
          const emailResult = await conn.query(
            "INSERT INTO EMAILS (PESSOA_ID, TIPO_EMAIL_ID, EMAIL) VALUES ($1, $2, $3) RETURNING *",
            [
              newPessoa.rows[0].id,
              email.props.tipo_email_id,
              email.props.email,
            ],
          );
          emailsOutput.push(emailResult.rows[0]);
        }
      }

      if (telefones) {
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
      }

      if (contas_bancarias) {
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
      }

      if (enderecos) {
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
      }

      if (convenios_cidades_funcionarios) {
        for await (const convenioCidade of convenios_cidades_funcionarios) {
          const convenioCidadeFuncionarioResult = await conn.query(
            `INSERT INTO convenios_cidades_funcionarios (
                        funcionario_id,
                        convenio_cidade_id
                    ) VALUES (
                          $1,
                          $2
                    ) RETURNING *`,
            [
              newFuncionario.rows[0].id,
              convenioCidade.props.convenio_cidade_id,
            ],
          );
          convenioCidadeFuncionarioOutput.push(
            convenioCidadeFuncionarioResult.rows[0],
          );
        }
      }

      if (atividades_funcionarios) {
        for await (const atividade of atividades_funcionarios) {
          const atividadeResult = await conn.query(
            `INSERT INTO atividades_funcionarios (
                      funcionario_id,
                        atividade_id
                  ) VALUES (
                        $1,
                        $2
                  ) RETURNING *`,
            [
              newFuncionario.rows[0].id,
              atividade.props.atividade_id,
            ],
          );
          atividadesOutput.push(atividadeResult.rows[0]);
        }
      }

      await conn.query("COMMIT");

      const funcionarioExisting = await api.get(
        `/funcionario/${formatCPF(pessoa_fisica.props.cpf)}`,
      );

      if (!funcionarioExisting.data) {
        const enderecoPrincipal =
              await conn.query(`SELECT e.uf , c.cidade FROM ENDERECOS en
                                                                            inner join bairros b
                                                                            on en.bairro_id = b.id
                                                                            inner join cidades c
                                                                            on b.cidade_id = c.id
                                                                            inner join estados e
                                                                            on c.estado_id  = e.id
                                                                            WHERE PESSOA_ID = ${newFuncionario.rows[0].id} and principal = true`);

        /*      const sexo = await conn.query(`select g.genero from pessoas_fisica pf
inner join generos g
on pf.genero_id = g.id
where pf.id  = ${newFuncionario.rows[0].id}`);

        const teste = sexo.rows[0].genero.charAt(0) as string;
*/
        const forn_cod = await api.post("/funcionario", {
          uf: enderecoPrincipal.rows[0].uf,
          cidade: enderecoPrincipal.rows[0].cidade,
          sexo: "M",
          nome: pessoa_fisica.props.nome,
          cpf: formatCPF(pessoa_fisica.props.cpf)
        });

        await conn.query(
          `UPDATE funcionarios SET fornecedor_id = ${forn_cod.data.FORN_COD} WHERE ID = ${newFuncionario.rows[0].id}`,
        );
      } else {
        await conn.query(`UPDATE funcionarios SET fornecedor_id = ${funcionarioExisting.data.FORN_COD} WHERE ID = ${newFuncionario.rows[0].id}`);
      }


      return {
        pessoa: newPessoa.rows[0],
        pessoa_fisica: newPessoa_fisica.rows[0],
        funcionario: newFuncionario.rows[0],
        emails: emailsOutput,
        enderecos: enderecoOutput,
        telefones: telefonesOutput,
        contas_bancarias: contasBancariasOutput,
        funcionarios_centros_resultado:
                    funcionarios_centros_resultado.rows[0],
        atividadesOutput,
        convenioCidadeFuncionarioOutput,
        rateios: rateioCentroResultadoOutput,
      };
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async update(id: number, input: FuncionarioUpdateType): Promise<void> {
    try {
      await conn.query("BEGIN");
      await conn.query(`UPDATE PESSOAS SET ativo = '${input.pessoa.props.ativo}' WHERE ID = ${id}`);
      await conn.query(`UPDATE PESSOAS_FISICA SET
            nome = '${input.pessoa_fisica.props.nome}',
            cpf = '${input.pessoa_fisica.props.cpf}',
            rg = '${input.pessoa_fisica.props.rg ?? null}',
            orgao_expeditor = '${input.pessoa_fisica.props.orgao_expeditor ?? null}',
            nacionalidade_id = ${input.pessoa_fisica.props.nacionalidade_id ?? null},
            nome_mae = '${input.pessoa_fisica.props.nome_mae ?? null}',
            nome_pai = '${input.pessoa_fisica.props.nome_pai ?? null}',
            naturalidade_id = ${input.pessoa_fisica.props.naturalidade_id ?? null},
            carteira_trabalho = '${input.pessoa_fisica.props.carteira_trabalho ?? null}',
            titulo_eleitor = '${input.pessoa_fisica.props.titulo_eleitor}',
            zona_titulo_eleitor = '${input.pessoa_fisica.props.zona_titulo_eleitor}',
            nascimento = '${input.pessoa_fisica.props.nascimento}',
            estado_civil_id = ${input.pessoa_fisica.props.estado_civil_id ?? null},
            genero_id = ${input.pessoa_fisica.props.genero_id ?? null},
            pis = '${input.pessoa_fisica.props.pis}',
            pcd_id = ${input.pessoa_fisica.props.pcd_id ?? null}
        WHERE ID = ${id}`);

      await conn.query(`UPDATE FUNCIONARIOS SET
            empresa_id = ${input.funcionario.props.empresa_id},
            cargo_id = ${input.funcionario.props.cargo_id},
            data_admissao = '${input.funcionario.props.data_admissao}',
            data_demissao = '${input.funcionario.props.data_demissao}',
            adiantamento = ${input.funcionario.props.adiantamento},
            periculosidade = ${input.funcionario.props.periculosidade},
            receber_transporte = ${input.funcionario.props.receber_transporte},
            contribuicao_sindical = ${input.funcionario.props.contribuicao_sindical},
            jornada_trabalho_id = ${input.funcionario.props.jornada_trabalho_id},
            registrado = ${input.funcionario.props.registrado}
        WHERE ID = ${id}`);

      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async delete(id: number): Promise<void> {
    try {
      await conn.query("BEGIN");

      await conn.query("COMMIT");
    } catch (error) {
      await conn.query("ROLLBACK");
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getAll(): Promise<AllFuncionariosOutput[]> {
    try {
      const funcionarios = await conn.query(`SELECT
                        p.id,
                        p.ativo,
                        pf.nome,
                        pf.cpf,
                        pf.carteira_trabalho,
                        pf.nascimento,
                        f.empresa_id,
                        c.cargo,
                        f.registrado
                      FROM
                          pessoas AS p
                      INNER JOIN
                          pessoas_fisica AS pf ON p.id = pf.id
                      INNER JOIN
                          funcionarios AS f ON p.id = f.id
                      inner  join
                      cargos as c on f.cargo_id  = c.id `);
      return funcionarios.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async getById(pessoa_id: number): Promise<FuncionarioOutput> {
    try {
      const funcionarios = await conn.query(`SELECT
                      *
                      FROM
                          pessoas AS p
                      INNER JOIN
                          pessoas_fisica AS pf ON p.id = pf.id
                      INNER JOIN
                          funcionarios AS f ON p.id = f.id
                      inner  join
                      cargos as c on f.cargo_id  = c.id
                      WHERE p.id = ${pessoa_id}`);
      return funcionarios.rows[0];
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
