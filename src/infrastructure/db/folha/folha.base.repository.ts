import AppError from "../../../application/errors/AppError";
import * as status from "../../../constraints/http.stauts";
import FolhaBaseEntity from "../../../domain/entity/folha/folha.base";
import { FolhaBaseRepository } from "../../../domain/repository/folha/folha.base.repository";
import conn from "../../config/database.config";

export default class FolhaBasePostgresRepository
implements FolhaBaseRepository
{
    async insert(
        input: FolhaBaseEntity,
    ): Promise<FolhaBaseEntity> {
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
        input: FolhaBaseEntity,
    ): Promise<FolhaBaseEntity> {
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

    async get(): Promise<FolhaBaseEntity[]> {
        try {
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }
}
