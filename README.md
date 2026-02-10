# DESCRIÇÃO DO PROJETO
O projeto é uma aplicação que controla as atividades, desde clientes até funcionários, de um salão de cabelo (Pretinha Cabeleireira). Nesse site, os clientes poderão agendar (ou reagendar) procedimentos estéticos, como cortes. Enquanto, os funcionários, à exemplo uma atendente, cadastram, editam, deletam os clientes no sistema; as cabelereiras podem ver a lista de clientes a serem atendidas. Há ainda o administrador, que seria a dono(a) do estabelecimento, capaz de manipular dados tanto dos usuários quanto dos trabalhadores.

## PLANEJAMENTO DAS REGRAS DO NEGÓCIO (PODE SOFRER ALTERAÇÕES NA MEDIDA QUE ACHARMOS NECESSÁRIO E NEM TODAS AS FUNÇÕES ESTÃO PRONTAS)

- Apenas clientes cadastrados podem realizar agendamentos. --> Garante controle de quem utiliza os serviços e evita agendamentos inválidos.
- O agendamento só pode ser feito em horários disponíveis.	--> Evita sobreposição de clientes no mesmo horário.
- O reagendamento cancela automaticamente o agendamento anterior.	--> Libera o horário antigo para outros clientes.
- Cabeleireiras só podem visualizar a lista de clientes.	--> Limita permissões e mantém foco no atendimento.
- O administrador tem permissão total sobre dados de clientes e funcionários.	--> Centraliza o controle do negócio no dono(a).
- Um cliente não pode ter dois procedimentos no mesmo horário.	Evita conflitos --> de agenda.
- Funcionários só acessam funções conforme seu perfil (atendente ou cabeleireira).	--> Mantém a segurança e organização do sistema.

### REQUISITOS DO USUÁRIO
- Cliente
    ° Realizar agendamento de procedimentos.
    ° Reagendar procedimentos já marcados.
    °
- Cabeleireira
    ° Visualizar lista de clientes e horários agendados.
- Administrador
    ° Cadastrar, editar e excluir clientes e funcionários.
    ° Visualizar e manipular todos os agendamentos.
    ° Atribuir ou modificar funções de usuários (cliente, atendente, cabeleireira).