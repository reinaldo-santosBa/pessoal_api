
export class EnderecoDto {
    cep: string;

    bairro: string;

    tipo_bairro_id: number;

    logradouro: string;

    complemento?: string;

    numero: number;

    pessoa_id: number;

    tipo_logradouro_id: number;

    created_at?: Date;

    update_at?: Date;


    cidade: string;

    ibge_cidade: number;

    estado: number;

    ibge_estado: number;

    regiao?: string;

    pais?: string;
}
