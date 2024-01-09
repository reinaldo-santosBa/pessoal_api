
export class EnderecoDto {
    cep: string;
    logradouro: string;
    tipo_logradouro_id: number;
    complemento?: string;
    numero: number;
    pessoa_id: number;
    tipo_endereco_id: number;
    bairro_id: number;
    cidade_id: number;
    bairro: string;
    tipo_bairro_id: number;
    codigo_cidade_ibge: number;
    cidade: string;
    estado_id: number;
    regiao: string;
    uf: string;
    regiao_id: number;
    codigo_uf_ibge: number;

  [key: string]: string | number | Date | undefined;
}
