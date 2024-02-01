import AppError from "../../../application/errors/AppError";
import FolhaBaseConvenioEntity from "../../../domain/entity/folha/folha.base.convenio";
import { FolhaBaseConvenioRepository } from "../../../domain/repository/folha/folha.base.convenio.repository";
import conn from "../../config/database.config";
import * as status from "../../../constraints/http.stauts";


export default class FolhaBaseConvenioPostgresRepository implements FolhaBaseConvenioRepository {
    async insert(input: FolhaBaseConvenioEntity): Promise<FolhaBaseConvenioEntity> {
        try {
            await conn.query("BEGIN");

            await conn.query("COMMIT");
        } catch (error) {
            await conn.query("ROLLBACK");
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }

    async update(id: number, input: FolhaBaseConvenioEntity): Promise<FolhaBaseConvenioEntity> {
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


    async get(): Promise<FolhaBaseConvenioEntity[]> {
        try {

        } catch (error) {
            throw new AppError(error.message, status.INTERNAL_SERVER);
        }
    }
}
