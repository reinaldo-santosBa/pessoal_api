import { FolhaBaseRepository } from "../../domain/repository/folha/folha.base.repository";
import { FolhaPagamentoRepository, IFolhaPagamentoFuncionario, inputFolhaPagamento } from "../../domain/repository/folha/folha.pagamento.repository";
import AppError from "../errors/AppError";
import * as status from "../../constraints/http.stauts";

export default class FolhaPagamentoService {
  constructor(
        private readonly folhaPagamentoRepository: FolhaPagamentoRepository,
        private readonly folhaBaseRepository: FolhaBaseRepository,
  ) {}

  async create({ folha_pagamento: {
    ano,
    data_fechamento,
    dias_uteis,
    mes
  }, funcionarios }: inputFolhaPagamento) {

    const somas: {
        [funcionarioId: number]: Partial<IFolhaPagamentoFuncionario>;
    } = {};

    if (!funcionarios) {
      throw new AppError("funcionarios obrigatório", status.BAD_REQUEST);
    }

    funcionarios.forEach(obj => {
      const funcionarioId = obj.funcionario_id;
      if (!somas[funcionarioId]) {
        somas[funcionarioId] = { ...obj };
      } else {
        somas[funcionarioId].salario_base =
                    Number((somas[funcionarioId].salario_base || 0)) + Number(obj.salario_base);

        if (obj.encargos) {
          obj.encargos.forEach(encargo => {
            const existingEncargo = somas[funcionarioId].encargos?.findIndex(
              e => e.encargo_id === encargo.encargo_id,
            );
            if (existingEncargo !== -1) {
              somas[funcionarioId].encargos[
                existingEncargo
              ].valor_encargo_empresa += encargo.valor_encargo_empresa;

              somas[funcionarioId].encargos[
                existingEncargo
              ].percentual_empresa += encargo.percentual_empresa;

              somas[funcionarioId].encargos[
                existingEncargo
              ].percentual_funcionario += encargo.percentual_funcionario;

              somas[funcionarioId].encargos[
                existingEncargo
              ].valor_encargo_funcionario +=
                     encargo.valor_encargo_funcionario;
            } else {
              somas[funcionarioId].encargos = [
                ...(somas[funcionarioId].encargos || []),
                { ...encargo },
              ];
            }
          });
        }

        if (obj.provisoes) {
          obj.provisoes.forEach(provisao => {
            const existingProvisao = somas[
              funcionarioId
            ].provisoes?.findIndex(
              p => p.provisao_id === provisao.provisao_id,
            );
            if (existingProvisao !== -1) {
              somas[funcionarioId].provisoes[
                existingProvisao
              ].percentual_provisao += provisao.percentual_provisao;
            } else {
              somas[funcionarioId].provisoes = [
                ...(somas[funcionarioId].provisoes || []),
                { ...provisao },
              ];
            }
          });
        }

        if (obj.convenios) {
          obj.convenios.forEach(convenio => {
            const existingConvenio = somas[
              funcionarioId
            ].convenios?.findIndex(
              c => c.convenio_cidade_id === convenio.convenio_cidade_id,
            );
            if (existingConvenio !== -1) {
              somas[funcionarioId].convenios[
                existingConvenio
              ].percentual_descontar_convenio +=
                            convenio.percentual_descontar_convenio;

              somas[funcionarioId].convenios[
                existingConvenio
              ].valor_pagar_convenio += convenio.valor_pagar_convenio;

              somas[funcionarioId].convenios[
                existingConvenio
              ].valor_descontar_convenio +=
                            convenio.valor_descontar_convenio;
            } else {
              somas[funcionarioId].convenios = [
                ...(somas[funcionarioId].convenios || []),
                { ...convenio },
              ];
            }
          });
        }
      }
    });


    const somasArray: IFolhaPagamentoFuncionario[] = Object.values(somas).map(
      item => item as IFolhaPagamentoFuncionario,
    );

    const folhaBaseResult = await this.folhaBaseRepository.getAtivo();

    await this.folhaPagamentoRepository.insert({
      folha_pagamento: {
        ano,
        data_fechamento,
        dias_uteis,
        empresa_id: folhaBaseResult.empresa_id,
        folha_base_id: folhaBaseResult.id,
        mes,
        valor_folha: 1000,
        empresa: folhaBaseResult.empresa,
      },
      funcionarios: somasArray,
    });
  }
}
