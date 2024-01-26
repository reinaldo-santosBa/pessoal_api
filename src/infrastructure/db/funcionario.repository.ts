import { FuncionarioRepository, IInput } from "../../domain/repository/funcionario.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";

export default class FuncionarioPostgresRepository
implements FuncionarioRepository
{
    async insert(input: IInput): Promise<void> {
        try {
            await conn.query("BEGIN");

            const result = await conn.query(
                `INSERT INTO PESSOAS(ATIVO) VALUES(${input.pessoa.getAtivo}) RETURNING id`,
            );

            await conn.query(`INSERT INTO PESSOAS_FISICA(
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
            ${result.rows[0].id},
            '${input.pessoa_fisica.getNome}',
            '${input.pessoa_fisica.getCPF}',
            '${input.pessoa_fisica.getRg}',
            '${input.pessoa_fisica.getOrgao_expeditor}',
            '${input.pessoa_fisica.getCarteira_trabalho}',
            '${input.pessoa_fisica.getPis}',
            '${input.pessoa_fisica.getTitulo_eleitor}',
            '${input.pessoa_fisica.getZona_titulo_eleitor}',
            ${input.pessoa_fisica.getNacionalidade_id ?? null},
            '${input.pessoa_fisica.getNome_mae}',
            '${input.pessoa_fisica.getNome_pai}',
            ${input.pessoa_fisica.getNaturalidade_id ?? null},
            '${input.pessoa_fisica.getNascimento}',
            ${input.pessoa_fisica.getEstado_civil_id ?? null},
            ${input.pessoa_fisica.getGenero_id ?? null},
            ${input.pessoa_fisica.getPcd_id ?? null}
        )`);

            await conn.query(`INSERT INTO FUNCIONARIOS(
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
            ${result.rows[0].id},
            ${input.funcionario.getEmpresa_id ?? null},
            ${input.funcionario.getCargo_id ?? null},
            '${input.funcionario.getData_admissao}',
            '${input.funcionario.getData_demissao ?? null}',
            ${input.funcionario.getAdiantamento},
            ${input.funcionario.getPericulosidade},
            ${input.funcionario.getReceber_transporte},
            ${input.funcionario.getContribuicao_sindical},
            ${input.funcionario.getJornada_trabalho_id ?? null},
            ${input.funcionario.getRegistrado}
            )`);

            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            console.error(error, status.INTERNAL_SERVER);
        }
    }
}
