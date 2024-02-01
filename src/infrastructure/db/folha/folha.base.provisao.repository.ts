import AppError from "../../../application/errors/AppError";
import * as status from "../../../constraints/http.stauts";
import FolhaBaseProvisaoEntity from "../../../domain/entity/folha/folha.base.provisao";
import { FolhaBaseProvisaoRepository } from "../../../domain/repository/folha/folha.base.provisao.repository";
import conn from "../../config/database.config";

export default class FolhaBaseProvisaoPostgresRepository
implements FolhaBaseProvisaoRepository
{
    async insert(input: FolhaBaseProvisaoEntity): Promise<FolhaBaseProvisaoEntity> {
        try {
            await conn.query("BEGIN");

            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async update(
        id: number,
        input: FolhaBaseProvisaoEntity,
    ): Promise<FolhaBaseProvisaoEntity> {
        try {
            await conn.query("BEGIN");

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

    async get(): Promise<FolhaBaseProvisaoEntity[]> {
        try {
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }
}
