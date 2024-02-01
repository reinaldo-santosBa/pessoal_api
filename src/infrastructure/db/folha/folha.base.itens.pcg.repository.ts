import AppError from "../../../application/errors/AppError";
import * as status from "../../../constraints/http.stauts";
import FolhaBaseItemPcgEntity from "../../../domain/entity/folha/folha.base.itens.pcg";
import { FolhaBaseItensPcgRepository } from "../../../domain/repository/folha/folha.base.itens.pcg.repository";
import conn from "../../config/database.config";

export default class FolhaBaseItemPcgPostgresRepository
implements FolhaBaseItensPcgRepository
{
    async insert(input: FolhaBaseItemPcgEntity): Promise<FolhaBaseItemPcgEntity> {
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
        input: FolhaBaseItemPcgEntity,
    ): Promise<FolhaBaseItemPcgEntity> {
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

    async get(): Promise<FolhaBaseItemPcgEntity[]> {
        try {
        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }
}
