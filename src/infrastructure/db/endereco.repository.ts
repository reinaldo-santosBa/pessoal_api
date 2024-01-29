import AppError from "../../application/errors/AppError";
import EnderecoEntity, { BairrosProps, CidadesProps, EstadoProps, RigoesProps } from "../../domain/entity/endereco";
import { EnderecoRepository } from "../../domain/repository/endereco.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";

export default class EnderecoPostgresRepository implements EnderecoRepository {
    async getBairroById(id: number): Promise<BairrosProps> {
        try {
            const bairro = await conn.query(`SELECT ID, BAIRRO FROM BAIRROS WHERE ID = ${id}`);

            return bairro.rows[0];
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async getRegioes(): Promise<RigoesProps[]> {
        try {
            const regioes = await conn.query(
                "SELECT id, regiao FROM REGIOES",
            );

            return regioes.rows;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }


    async getEstados(regiao_id: number): Promise<EstadoProps[]> {
        try {
            const estados = await conn.query(`SELECT
                  id,
                  estado,
                  uf,
                  regiao_id,
                  codigo_ibge FROM ESTADOS WHERE REGIAO_ID = ${regiao_id}`);
            return estados.rows;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }


    async getCidades(estado_id: number): Promise<CidadesProps[]> {
        try {
            const cidades = await conn.query(`SELECT
                      id,
                      codigo_ibge,
                      cidade,
                      estado_id
                  FROM CIDADES WHERE ESTADO_ID = ${estado_id}`);
            return cidades.rows;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async getBairros(cidade_id: number): Promise<BairrosProps[]> {
        try {
            const bairros = await conn.query(`SELECT
                        id,
                        cidade_id,
                        bairro,
                        tipo_bairro_id
                  FROM BAIRROS WHERE CIDADE_ID = ${cidade_id}`);
            return bairros.rows;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async insert(input: EnderecoEntity): Promise<EnderecoEntity> {

        try {
            await conn.query("BEGIN");
            const endereco = await conn.query(`INSERT INTO ENDERECOS (
                cep,
                logradouro,
                pessoa_id,
                tipo_endereco_id,
                complemento,
                numero,
                tipo_logradouro_id,
                bairro_id
          )VALUES(
            '${input.props.cep}',
            '${input.props.logradouro}',
            ${input.props.pessoa_id},
            ${input.props.tipo_endereco_id ?? null},
            '${input.props.complemento ?? null}',
            '${input.props.numero ?? null}',
            ${input.props.tipo_logradouro_id ?? null},
            ${input.props.bairro_id ?? null}
          ) RETURNING *`);
            await conn.query("COMMIT");
            return endereco.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async update(id: number, input: EnderecoEntity): Promise<EnderecoEntity> {
        try {
            await conn.query("BEGIN");
            const endereco = await conn.query(`
            UPDATE ENDERECOS SET
                    cep = '${input.props.cep}',
                    logradouro = '${input.props.logradouro}',
                    tipo_endereco_id = ${input.props.tipo_endereco_id},
                    complemento = '${input.props.complemento}',
                    numero = '${input.props.numero}',
                    tipo_logradouro_id = ${input.props.tipo_logradouro_id},
                    bairro_id = ${input.props.bairro_id}
                WHERE ID = ${id} RETURNING *
          `);

            await conn.query("COMMIT");
            return endereco.rows[0];

        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async getById(id: number): Promise<number> {
        try {
            const enderecosCount = (await conn.query(`SELECT * FROM ENDERECOS WHERE ID = ${id}`)).rowCount;
            return enderecosCount;
        } catch (error) {

            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM ENDERECOS WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async getByIdPessoa(pessoa_id: number): Promise<EnderecoEntity[]> {
        try {
            const enderecos = await conn.query(`SELECT id,
                cep,
                logradouro,
                pessoa_id,
                tipo_endereco_id,
                complemento,
                numero,
                tipo_logradouro_id,
                bairro_id
              FROM ENDERECOS WHERE PESSOA_ID = ${pessoa_id}`);

            return enderecos.rows;
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }
}
