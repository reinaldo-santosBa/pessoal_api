
export class EnderecoDto {
    cep: string;
    tipo_bairro_id: number;
    logradouro: string;
    complemento?: string;
    numero: number;
    pessoa_id: number;
    tipo_logradouro_id: number;
    created_at?: Date;
    update_at?: Date;
    pais?: string;

  [key: string]: string | number | Date | undefined;
}
