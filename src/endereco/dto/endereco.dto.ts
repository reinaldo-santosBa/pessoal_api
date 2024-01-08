import { IsNotEmpty, IsString } from "class-validator";

export class EnderecoDto {
  @IsString()
    @IsNotEmpty()
      cep: string;

  @IsString()
      bairro: string;

  tipo_bairro_id: number;

  @IsString()
      logradouro: string;

  @IsString()
      complemento: string;

  numero: number;

  pessoa_id: number;

  tipo_logradouro_id: number;

  created_at: Date;

  update_at: Date;

  @IsString()
      cidade: string;

  ibge_cidade: number;

  estado: number;

  ibge_estado: number;

  @IsString()
      regiao: string;

  @IsString()
      pais: string;
}
