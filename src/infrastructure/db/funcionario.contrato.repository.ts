import AppError from "../../application/errors/AppError";
import { FuncionarioContratoEntity } from "../../domain/entity/funcionario.contrato";
import { FuncionarioContratoRepository } from "../../domain/repository/funcionario.contrato";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";

export default class FuncionarioContratoPostgresRepository implements FuncionarioContratoRepository {

    async insert(input: FuncionarioContratoEntity): Promise<FuncionarioContratoEntity> {
        try {
            await conn.query("BEGIN");
            const funcionarioContrato = await conn.query(
                `INSERT INTO FUNCIONARIOS_CONTRATOS (
                    funcionario_id
                    contrato
                    contrato_principal
                    remuneracao
                    ajuda_custo
                    numero_contrato
              ) VALUES(
                ${input.props.funcionario_id},
                '${input.props.contrato}',
                ${input.props.contrato_principal},
                ${input.props.remuneracao},
                ${input.props.ajuda_custo},
                '${input.props.numero_contrato}',
              ) RETURNING *`);
            await conn.query("COMMIT");

            return funcionarioContrato.rows[0];
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }


    async update(id: number, input: FuncionarioContratoEntity): Promise<FuncionarioContratoEntity> {
        try {
            await conn.query("BEGIN");
            const funcionarioContrato = await conn.query(`
            UPDATE FUNCIONARIOS_CONTRATOS SET
                    contrato = '${input.props.contrato}',
                    contrato_principal = ${input.props.contrato_principal},
                    remuneracao = ${input.props.remuneracao},
                    ajuda_custo = ${input.props.ajuda_custo},
                    numero_contrato = '${input.props.numero_contrato}'
            WHERE ID = ${id} RETURNING *
          `);
            await conn.query("COMMIT");
            return funcionarioContrato.rows[0];

        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }


    async getById(id: number): Promise<number> {
        const funcionarioContratoCount = await conn.query(
            `SELECT * FROM FUNCIONARIOS_CONTRATOS WHERE ID = ${id}`,
        );

        return funcionarioContratoCount.rowCount;
    }


    async  delete(id: number): Promise<void> {
        try {
            await conn.query("BEGIN");
            await conn.query(`DELETE FROM FUNCIONARIOS_CONTRATOS WHERE ID = ${id}`);
            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }


    async  getByIdFuncionario(funcionario_id: number): Promise<FuncionarioContratoEntity[]> {
        const contratos = await conn.query(`SELECT
              id
              funcionario_id
              contrato
              contrato_principal
              remuneracao
              ajuda_custo
              numero_contrato
          FROM FUNCIONARIOS_CONTRATOS WHERE FUNCIONARIO_ID = ${funcionario_id}
      `);

        return contratos.rows;
    }

}
