import AppError from "../../application/errors/AppError";
import {
  EstadoCivilProps,
  GeneroProps,
  NacionalidadeProps,
  NaturalidadeProps,
  SeedsRepository,
  TipoBairroProps,
  TipoContaProps,
  TipoEmailProps,
  TipoEnderecoProps,
  TipoLogradouroProps,
  TipoPcdProps,
  TipoTelefoneProps
} from "../../domain/repository/seeds.repository";
import conn from "../config/database.config";
import * as status from "../../constraints/http.stauts";

export default class SeedsPostgresRepository implements SeedsRepository {
  async findAllTipoEndereco(): Promise<TipoEnderecoProps[]> {
    try {
      const tipoEndereco = await conn.query(
        "SELECT ID, TIPO_ENDERECO FROM TIPOS_ENDERECO",
      );
      return tipoEndereco.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async findAllTipoConta(): Promise<TipoContaProps[]> {
    try {
      const tipoConta = await conn.query(
        "SELECT ID, TIPO_CONTA FROM TIPOS_CONTA",
      );
      return tipoConta.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async findAllGenero(): Promise<GeneroProps[]> {
    try {
      const generos = (await conn.query("SELECT ID, GENERO FROM GENEROS")).rows;
      return generos;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async findAllTipoEmail(): Promise<TipoEmailProps[]> {
    try {
      const tipoEmail = await conn.query(
        "SELECT ID, TIPO_EMAIL FROM TIPOS_EMAIL",
      );
      return tipoEmail.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async findAllTipoBairro(): Promise<TipoBairroProps[]> {
    try {
      const tipoBairro = await conn.query(
        "SELECT ID, TIPO_BAIRRO FROM TIPOS_BAIRRO",
      );
      return tipoBairro.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async findAllTipoTelefone(): Promise<TipoTelefoneProps[]> {
    try {
      const tipoTelefone = await conn.query(
        "SELECT ID, TIPO_TELEFONE FROM TIPOS_TELEFONE",
      );
      return tipoTelefone.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async findAllEstadoCivil(): Promise<EstadoCivilProps[]> {
    try {
      const estadoCivil = await conn.query(
        "SELECT ID, ESTADO_CIVIL FROM ESTADOS_CIVIS",
      );
      return estadoCivil.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async findAllTipoPcd(): Promise<TipoPcdProps[]> {
    try {
      const tipoPcd = await conn.query("SELECT ID, PCD FROM TIPOS_PCD");
      return tipoPcd.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async findAllTipoLogradouro(): Promise<TipoLogradouroProps[]> {
    try {
      const tipoLogradouro = await conn.query(
        "SELECT ID, SIGLA, TIPO_LOGRADOURO FROM TIPOS_LOGRADOURO",
      );
      return tipoLogradouro.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async findAllNaturalidade(): Promise<NaturalidadeProps[]> {
    try {
      const naturalidades = await conn.query(
        "SELECT ID, NATURALIDADE FROM NATURALIDADES",
      );
      return naturalidades.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }

  async findAllNacionalidade(): Promise<NacionalidadeProps[]> {
    try {
      const nacionalidade = await conn.query(
        "SELECT ID, NACIONALIDADE FROM NACIONALIDADES",
      );
      return nacionalidade.rows;
    } catch (error) {
      throw new AppError(error.message, status.INTERNAL_SERVER);
    }
  }
}
