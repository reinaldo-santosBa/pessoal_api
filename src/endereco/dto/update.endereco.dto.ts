export class UpdateEnderecoDto {
    cep?: string;
    bairro?: string;
    tipo_bairro_id?: number;
    logradouro?: string;
    complemento?: string;
    numero?: number;
    tipo_logradouro_id?: number;
    cidade?: string;
    ibge_cidade?: number;
    estado?: number;
    ibge_estado?: number;
    regiao?: string;
    pais?: string;
}
