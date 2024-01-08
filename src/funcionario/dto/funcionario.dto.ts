export class FuncionarioDto {
    nome: string;
    cpf: string;
    rg?: string;
    orgao_expeditor: string;
    carteira_trabalho: string;
    pis: string;
    titulo_eleitor?: string;
    zona_titulo_eleitor?: string;
    nacionalidade_id: number;
    nome_mae?: string;
    nome_pai?: string;
    naturalidade_id?: number;
    nascimento?: Date;
    estado_civil_id?: number;
    genero_id?: number;
    ativo: boolean;
    empresa_id: number;
    cargo_id?: number;
    data_admissao: Date;
}
