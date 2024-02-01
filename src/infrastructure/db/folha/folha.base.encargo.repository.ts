import AppError from "../../../application/errors/AppError";
import * as status from "../../../constraints/http.stauts";
import FolhaBaseEncargoEntity from "../../../domain/entity/folha/folha.base.encargo";
import { FolhaBaseEncargoRepository } from "../../../domain/repository/folha/folha.base.encargo.repository";
import conn from "../../config/database.config";

export default class FolhaBaseEncargoPostgresRepository implements FolhaBaseEncargoRepository {
    async insert(
        input: FolhaBaseEncargoEntity,
    ): Promise<FolhaBaseEncargoEntity> {
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
        input: FolhaBaseEncargoEntity,
    ): Promise<FolhaBaseEncargoEntity> {
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

    async get(): Promise<FolhaBaseEncargoEntity[]> {
        try {
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }
}
