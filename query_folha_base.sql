select
f.id,
pf.nome,
pf.cpf,
fcr.centro_resultado_id,
fcr.centro_resultado,
c.remuneracao as salario_base,
e.encargo as encargo_nome,
((fbe.percentual_empresa * c.remuneracao) / 100) as valor_encargo_empresa,
((fbe.percentual_funcionario * c.remuneracao) / 100) as valor_encargo_funcionario,
p.provisao as nome_provisao,
fbp.percentual as percentual_provisao,
fbcc.valor_descontar as valor_descontar_convenio,
fbcc.valor_pagar as valor_pagar_convenio,
fbcc.percentual_descontar  as percentual_descontar_convenio
from funcionarios f
inner join pessoas_fisica pf on pf.id = f.id
inner join funcionarios_centros_resultado fcr on fcr.funcionario_id = f.id and fcr.centro_resultado_id = 1
inner join cargos c on c.id = f.cargo_id
inner join folhas_base fb on fb.empresa_id = f.empresa_id
left join folhas_base_encargos fbe on fb.id = fbe.folha_base_id
left join encargos e on e.id = fbe.encargo_id
INNER JOIN horas_trabalhadas_funcionarios htf ON htf.funcionario_id = f.id
inner join folha_base_itens_pcg fbip  on fbip.folha_base_id = fb.id
inner join folhas_base_provisoes fbp  on fbp.folha_base_id = fb.id
inner join provisoes p on p.id = fbp.provisao_id
INNER JOIN folhas_base_convenios_cidades fbcc on fbcc.folha_base_id  = fb.id
WHERE htf.data_trabalho BETWEEN '2024-01-01' AND '2024-01-20' and fbip.tipo_folha_id  = ;
