import AppError from "../../application/errors/AppError";
import { EstadoCivilProps, GeneroProps, NacionalidadeProps, NaturalidadeProps, SeedsRepository, TipoBairroProps, TipoEmailProps, TipoLogradouroProps, TipoPcdProps, TipoTelefoneProps } from "../../domain/repository/seeds.repository";
import conn from "../config/database.config";

export default class SeedsPostgresRepository implements SeedsRepository {
    async findAllGenero(): Promise<GeneroProps[]> {
        try {
            const generos = (await conn.query("SELECT ID, GENERO FROM GENEROS")).rows;
            return generos;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async findAllTipoEmail(): Promise<TipoEmailProps[]> {
        try {
            const tipoEmail = await conn.query("SELECT ID, TIPO_EMAIL FROM TIPOS_EMAIL");
            return tipoEmail.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async findAllTipoBairro(): Promise<TipoBairroProps[]> {
        try {
            const tipoBairro = await conn.query("SELECT ID, TIPO_BAIRRO FROM TIPOS_BAIRRO");
            return tipoBairro.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async findAllTipoTelefone(): Promise<TipoTelefoneProps[]> {
        try {
            const tipoTelefone = await conn.query("SELECT ID, TIPO_TELEFONE FROM TIPOS_TELEFONE");
            return tipoTelefone.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async findAllEstadoCivil(): Promise<EstadoCivilProps[]> {
        try {
            const estadoCivil = await conn.query("SELECT ID, ESTADO_CIVIL FROM ESTADOS_CIVIS");
            return estadoCivil.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async findAllTipoPcd(): Promise<TipoPcdProps[]> {
        try {
            const tipoPcd = await conn.query("SELECT ID, PCD FROM TIPOS_PCD");
            return tipoPcd.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async findAllTipoLogradouro(): Promise<TipoLogradouroProps[]> {
        try {
            const tipoLogradouro = await conn.query("SELECT ID, SIGLA, TIPO_LOGRADOURO FROM TIPOS_LOGRADOURO");
            return tipoLogradouro.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async findAllNaturalidade(): Promise<NaturalidadeProps[]> {
        try {
            const naturalidades = await conn.query("SELECT ID, NATURALIDADE FROM NATURALIDADES");
            return naturalidades.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }

    async findAllNacionalidade(): Promise<NacionalidadeProps[]> {
        try {
            const nacionalidade = await conn.query("SELECT ID, NACIONALIDADE FROM NACIONALIDADES");
            return nacionalidade.rows;
        } catch (error) {
            throw new AppError(error.message);
        }
    }
}
