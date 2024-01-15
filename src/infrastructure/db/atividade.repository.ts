import AtividadeEntity from "../../domain/entity/atividade";
import { AtividadeRepository } from "../../domain/repository/atividade.repository";
import conn from "../config/database.config";

export default class AtividadePostgresRepository implements AtividadeRepository {
    async insert(input: AtividadeEntity): Promise<void> {
        await conn.query(`INSERT INTO ATIVIDADES(
          CARGO_ID,
          ATIVIDADE
      )VALUES(
        ${input.props.cargo_id},
        ${input.props.atividade}
      )`);
    }

    async getAll(): Promise<AtividadeEntity[]> {
        const atividades = await conn.query(
            "SELECT CARGO_ID, ATIVIDADE FROM ATIVIDADES",
        );

        return atividades.rows;
    }

    async update(id: number, input: AtividadeEntity): Promise<AtividadeEntity> {
        throw new Error("Method not implemented.");
    }

    async delete(id: number): Promise<void> {
        await conn.query(`DELETE FROM ATIVIDADES WHERE ID = ${id}`);
    }
}
