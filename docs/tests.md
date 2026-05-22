# Testes

Este documento descreve a estratégia de testes do **Portal do Paciente Crônico**. Foram planejados dois tipos de testes:

- **Teste de Software** (abordagem caixa-preta): verifica a conformidade do sistema com os requisitos funcionais e não funcionais especificados.
- **Teste de Usabilidade**: avalia a qualidade da experiência percebida por usuários reais dos perfis-alvo (paciente, cuidador e profissional de saúde).

A documentação está dividida em:

- [Plano de Testes de Software](#plano-de-testes-de-software)
- [Registro dos Testes de Software](#registro-dos-testes-de-software)
- [Avaliação dos Testes de Software](#avaliação-dos-testes-de-software)
- [Cenários de Teste de Usabilidade](#cenários-de-teste-de-usabilidade)
- [Registro dos Testes de Usabilidade](#registro-dos-testes-de-usabilidade)
- [Avaliação dos Testes de Usabilidade](#avaliação-dos-testes-de-usabilidade)

---

# Teste de Software

## Plano de Testes de Software

A tabela a seguir relaciona cada caso de teste (CT) ao(s) requisito(s) verificado(s), à página/artefato onde o teste é executado e ao cenário de validação. Os casos cobrem os fluxos críticos do sistema, com ênfase nos requisitos de prioridade ALTA.

> **Pré-condição comum:** todos os testes assumem que o usuário acessa a aplicação em `http://localhost:8080/index.html` (ou na URL pública do GitHub Pages) e que os usuários de teste foram automaticamente carregados no `localStorage` (ver tabela de contas de teste em [development.md](development.md#contas-de-teste-pré-carregadas-no-localstorage)).

### CT01 — Login como Paciente

| | |
|---|---|
| **Procedimento** | 1) Acessar `/index.html` <br> 2) Selecionar perfil **Paciente** <br> 3) Preencher CPF `123.456.789-00` e senha `123` <br> 4) Clicar em **Entrar** |
| **Requisitos associados** | RF-01 |
| **Resultado esperado** | Redirecionar para `pages/dashboard.html` exibindo "Olá, João" |
| **Dados de entrada** | CPF e senha válidos vinculados ao perfil Paciente |

### CT02 — Bloqueio de login com perfil incorreto

| | |
|---|---|
| **Procedimento** | 1) Acessar `/index.html` <br> 2) Selecionar perfil **Médico** <br> 3) Preencher CPF `123.456.789-00` (paciente) e senha `123` <br> 4) Clicar em **Entrar** |
| **Requisitos associados** | RF-01, RF-12 |
| **Resultado esperado** | Toast de erro: *"Cadastro não encontrado, senha incorreta ou perfil errado."* O sistema **não** permite o acesso. |
| **Dados de entrada** | CPF de paciente combinado com perfil de médico |

### CT03 — Cadastro de novo paciente

| | |
|---|---|
| **Procedimento** | 1) Acessar `/register.html` <br> 2) Selecionar perfil **Paciente** <br> 3) Preencher Nome, CPF (válido, 11 dígitos), Senha (≥ 4 caracteres), Data de Nascimento, Sexo, Tipo Sanguíneo, Alergias <br> 4) Marcar checkbox de aceite LGPD <br> 5) Clicar em **Cadastrar** |
| **Requisitos associados** | RF-01, RNF-03 |
| **Resultado esperado** | Cadastro persistido em `localStorage.ppc_users` e redirecionamento automático para `dashboard.html` |
| **Dados de entrada** | Dados válidos + aceite LGPD |

### CT04 — Validação de CPF inválido no cadastro

| | |
|---|---|
| **Procedimento** | 1) Tentar cadastrar com CPF de menos de 11 dígitos (`123.456`) |
| **Requisitos associados** | RF-01 |
| **Resultado esperado** | Toast de erro: *"CPF inválido. Deve conter 11 dígitos."* Cadastro não é concluído. |

### CT05 — Edição do Perfil de Saúde

| | |
|---|---|
| **Procedimento** | 1) Logar como paciente <br> 2) Acessar **Perfil** <br> 3) Clicar em **Editar Dados** <br> 4) Alterar tipo sanguíneo de `A+` para `O-` <br> 5) Clicar em **Salvar** |
| **Requisitos associados** | RF-02 |
| **Resultado esperado** | Dado atualizado em `localStorage.ppc_users` e refletido imediatamente na tela |

### CT06 — Cadastro de novo medicamento

| | |
|---|---|
| **Procedimento** | 1) Logar como paciente <br> 2) Acessar **Remédios** <br> 3) Clicar em **Novo Medicamento** <br> 4) Preencher Nome (`Losartana`), Dosagem (`50mg`), Primeira dose (`08:00`), Frequência (`A cada 12h`) <br> 5) Clicar em **Salvar** |
| **Requisitos associados** | RF-03 |
| **Resultado esperado** | Medicamento aparece na tabela; KPI "Total" incrementa em +1; toast de confirmação |

### CT07 — Edição e exclusão de medicamento

| | |
|---|---|
| **Procedimento** | 1) Na lista de medicamentos, clicar no ícone de editar de um item <br> 2) Alterar a dosagem <br> 3) Salvar <br> 4) Em seguida, clicar no ícone de excluir <br> 5) Confirmar |
| **Requisitos associados** | RF-03 |
| **Resultado esperado** | Edição persiste; exclusão remove o item após confirmação modal |

### CT08 — Sistema de Alerta visual (status card)

| | |
|---|---|
| **Procedimento** | 1) Logar como paciente <br> 2) Registrar pressão `160/100` no FAB Novo Registro <br> 3) Observar o `#status-card` no topo do dashboard |
| **Requisitos associados** | RF-04, RF-05 |
| **Resultado esperado** | O cartão muda para fundo vermelho com o título **"Atenção!"** e mensagem *"Pressão 160/100 mmHg fora do alvo"* |

### CT09 — Registro de Medição de Pressão

| | |
|---|---|
| **Procedimento** | 1) No dashboard, clicar no botão **Novo Registro** <br> 2) Aba **Pressão** já vem selecionada <br> 3) Preencher Sistólica `120`, Diastólica `80` <br> 4) Clicar em **Salvar Registro** |
| **Requisitos associados** | RF-05 |
| **Resultado esperado** | Registro persistido; gráfico de Pressão Arterial atualiza imediatamente (**sem reload**); toast de sucesso |

### CT10 — Registro de Glicemia e atualização reativa do gráfico

| | |
|---|---|
| **Procedimento** | 1) Abrir FAB Novo Registro <br> 2) Clicar na aba **Glicose** <br> 3) Preencher valor `95` <br> 4) Salvar |
| **Requisitos associados** | RF-05, RF-08 |
| **Resultado esperado** | Gráfico de Evolução Glicêmica ganha um novo ponto à direita sem necessidade de recarregar a página |

### CT11 — Registro de Sintomas (chips + descrição livre)

| | |
|---|---|
| **Procedimento** | 1) Abrir FAB Novo Registro <br> 2) Aba **Sintomas** <br> 3) Selecionar os chips "Tontura" e "Cansaço" <br> 4) Preencher textarea com descrição livre <br> 5) Salvar |
| **Requisitos associados** | RF-06 |
| **Resultado esperado** | Registro aparece no Histórico com tipo "Relato de Sintomas" |

### CT12 — Anexar exame ao Histórico

| | |
|---|---|
| **Procedimento** | 1) Acessar **Histórico** <br> 2) Clicar em **Anexar Exame/Laudo** <br> 3) Preencher Título (`Hemograma`) e Arquivo (`hemograma.pdf`) <br> 4) Salvar |
| **Requisitos associados** | RF-07 |
| **Resultado esperado** | Linha nova na timeline com badge "Exame/Laudo" e ícone de clipe |

### CT13 — Busca textual no Histórico (em tempo real)

| | |
|---|---|
| **Procedimento** | 1) Em **Histórico**, digitar `pressão` no campo de busca |
| **Requisitos associados** | RF-10 |
| **Resultado esperado** | Tabela filtra para mostrar apenas linhas que contenham "pressão" (sem precisar clicar em buscar) |

### CT14 — Geração de Relatório Clínico em PDF

| | |
|---|---|
| **Procedimento** | 1) Acessar **Perfil** <br> 2) Clicar em **Gerar Relatório Clínico PDF** |
| **Requisitos associados** | RF-09 |
| **Resultado esperado** | Nova aba abre `report.html` com tabelas de perfil, medicamentos, pressões, glicemias e sintomas; diálogo de impressão dispara automaticamente após 800 ms |

### CT15 — Cadastro de Cuidador (com bloqueio anti-sequestro)

| | |
|---|---|
| **Procedimento** | 1) Como paciente, acessar **Perfil → Meus Cuidadores → Adicionar Cuidador** <br> 2) Tentar cadastrar com CPF da Dra. Ana (`111.111.111-11`) |
| **Requisitos associados** | RF-11 (segurança) |
| **Resultado esperado** | Toast de erro: *"Este CPF já pertence a outro tipo de usuário no sistema."* Cadastro **não** sequestra a conta do médico. |

### CT16 — Login como Cuidador (banner de identificação)

| | |
|---|---|
| **Procedimento** | 1) Acessar `/index.html` <br> 2) Selecionar **Cuidador** <br> 3) CPF `477.447.980-23`, senha `123` <br> 4) Entrar |
| **Requisitos associados** | RF-11 |
| **Resultado esperado** | Dashboard carrega com **banner laranja** no topo: *"Você está acompanhando João Silva — Cuidador logado: Alan Cuidador"*. Saudação muda para *"Olá, Alan · Acompanhando João Silva"*. O título "Meus Remédios" vira "Remédios de João". |

### CT17 — Banner persistente em todas as páginas do cuidador

| | |
|---|---|
| **Procedimento** | Como cuidador logado, navegar entre Início, Histórico, Remédios e Perfil |
| **Requisitos associados** | RF-11 |
| **Resultado esperado** | Banner laranja aparece em todas as quatro telas, sempre com o nome do paciente representado |

### CT18 — Médico visualiza lista de pacientes com indicadores

| | |
|---|---|
| **Procedimento** | 1) Logar como **Médico** (CPF `111.111.111-11`) <br> 2) Observar a lista "Meus Pacientes Ativos" |
| **Requisitos associados** | RF-12, RF-13, RF-04 |
| **Resultado esperado** | Lista exibe 5 pacientes com badges. Carlos Eduardo Pereira e Ana Beatriz Lima aparecem com badge vermelho **"Alerta!"** e descrição do motivo (PA elevada / glicemia elevada) |

### CT19 — Médico registra conduta clínica

| | |
|---|---|
| **Procedimento** | 1) Como médico, clicar em um paciente da lista <br> 2) Rolar até "Prontuário e Conduta" <br> 3) Preencher observação e prescrição <br> 4) Clicar em **Salvar e Notificar o Paciente** |
| **Requisitos associados** | RF-14 |
| **Resultado esperado** | Conduta persiste em `ppc_data[id].observations[]` e aparece imediatamente no "Histórico de Condutas" |

### CT20 — Tutorial guiado dispara no primeiro acesso

| | |
|---|---|
| **Procedimento** | 1) Limpar `localStorage` (ou apagar todas as chaves `ppc_onboarding_done_*`) <br> 2) Logar como paciente <br> 3) Aguardar a dashboard renderizar |
| **Requisitos associados** | RNF-11 |
| **Resultado esperado** | Tutorial guiado dispara automaticamente após ~700 ms: overlay escuro com spotlight pulsante destacando elementos, tooltip com setas e contador "1/4", botões Voltar/Próximo/Pular |

### CT21 — Timeout de sessão por inatividade

| | |
|---|---|
| **Procedimento** | 1) Logar como qualquer perfil <br> 2) Aguardar **15 minutos** sem interagir (mouse, teclado, scroll) |
| **Requisitos associados** | RNF-07 |
| **Resultado esperado** | Sessão é encerrada automaticamente, `ppc_currentUser` é removido do localStorage, redirecionamento para `index.html` |

### CT22 — Controle de acesso por perfil (URL direta)

| | |
|---|---|
| **Procedimento** | 1) Logar como paciente <br> 2) Digitar manualmente na URL: `/pages/clinical-dashboard.html` |
| **Requisitos associados** | RF-12 (segurança) |
| **Resultado esperado** | `security.js` detecta perfil incompatível e redireciona automaticamente para `dashboard.html` |

### CT23 — Acesso direto sem login

| | |
|---|---|
| **Procedimento** | 1) Em uma sessão limpa, abrir `/pages/dashboard.html` diretamente |
| **Requisitos associados** | RNF-07 |
| **Resultado esperado** | Redirecionamento imediato para `/index.html` (qualquer página interna sem sessão é bloqueada) |

### CT24 — Responsividade mobile

| | |
|---|---|
| **Procedimento** | 1) Abrir o app em dispositivo mobile (ou DevTools → modo responsivo, viewport 375×667 — iPhone SE) |
| **Requisitos associados** | RNF-02 |
| **Resultado esperado** | Layout se adapta: gráficos empilham verticalmente, bottom-nav permanece fixa, FAB "Novo Registro" centralizado no rodapé, formulários ocupam 100% da largura |

---

## Registro dos Testes de Software

A tabela abaixo apresenta o status de cada caso de teste. Os casos **aprovados** já foram executados manualmente pela equipe durante o desenvolvimento e possuem evidência (screenshot, correção de bug, etc.). Os casos marcados como **a executar** serão realizados pela equipe antes da entrega final, com gravação de vídeo curto demonstrando cada um.

> **Legenda:**
> - ✅ **Aprovado** — executado com sucesso, com evidência registrada
> - ⏳ **A executar** — planejado para ser realizado pela equipe antes da entrega

| Caso de Teste | Requisito | Status | Evidência / Observação |
|---|---|---|---|
| CT01 — Login como Paciente | RF-01 | ✅ Aprovado | Validado durante o desenvolvimento ([screenshot `login.png`](img/login.png) e [`dashboard-paciente.png`](img/dashboard-paciente.png)) |
| CT02 — Bloqueio de perfil incorreto | RF-01, RF-12 | ✅ Aprovado | Validado manualmente — sistema exibiu toast *"Cadastro não encontrado, senha incorreta ou perfil errado"* ao tentar logar com perfil divergente do CPF |
| CT03 — Cadastro de novo paciente | RF-01, RNF-03 | ⏳ A executar | — |
| CT04 — Validação de CPF | RF-01 | ⏳ A executar | — |
| CT05 — Edição do Perfil de Saúde | RF-02 | ⏳ A executar | — |
| CT06 — Cadastro de medicamento | RF-03 | ⏳ A executar | — |
| CT07 — Edição/exclusão de medicamento | RF-03 | ⏳ A executar | — |
| CT08 — Sistema de Alerta visual (status card) | RF-04, RF-05 | ✅ Aprovado | Confirmado nas dashboards dos pacientes críticos Carlos Eduardo Pereira e Ana Beatriz Lima ([`prontuario-carlos.png`](img/prontuario-carlos.png) mostra o alerta combinado) |
| CT09 — Registro de Pressão | RF-05 | ✅ Aprovado | Validado: após registro, o gráfico de Pressão Arterial atualizou imediatamente sem reload |
| CT10 — Registro de Glicemia | RF-05, RF-08 | ⏳ A executar | — |
| CT11 — Registro de Sintomas | RF-06 | ⏳ A executar | — |
| CT12 — Anexar exame ao Histórico | RF-07 | ⏳ A executar | — |
| CT13 — Busca textual no Histórico | RF-10 | ⏳ A executar | — |
| CT14 — Relatório PDF | RF-09 | ⏳ A executar | — |
| CT15 — Cadastro de Cuidador (segurança anti-sequestro) | RF-11 | ✅ Aprovado | Bug de sequestro de conta encontrado e corrigido durante a auditoria — `registerCaregiver` em `store.js` agora retorna os erros `CPF_OWNED` e `CG_LINKED_ELSEWHERE` (PR #7) |
| CT16 — Login como Cuidador | RF-11 | ✅ Aprovado | Banner laranja exibido corretamente ([`dashboard-cuidador.png`](img/dashboard-cuidador.png)) |
| CT17 — Banner persistente em todas as páginas | RF-11 | ✅ Aprovado | Validado por navegação manual entre Início, Histórico, Remédios e Perfil — banner mantém o nome "João Silva" em todas as telas |
| CT18 — Médico vê pacientes com alerta | RF-12, RF-13 | ✅ Aprovado | Bug corrigido durante auditoria (status considerava apenas glicemia, agora considera PA também) — visível em [`painel-medico.png`](img/painel-medico.png) com Carlos e Ana Beatriz com badge "Alerta!" e motivo descrito |
| CT19 — Médico registra conduta clínica | RF-14 | ⏳ A executar | — |
| CT20 — Tutorial guiado dispara no primeiro acesso | RNF-11 | ✅ Aprovado | Validado pela equipe — tour com spotlight pulsante e tooltip apareceu corretamente na primeira visita à dashboard, com seta apontando para cada elemento (após correção do bug de orientação da seta) |
| CT21 — Timeout de sessão (15 minutos) | RNF-07 | ⏳ A executar | Requer simulação de 15 min de inatividade — agendar para teste final |
| CT22 — Controle de acesso por perfil | RF-12 | ✅ Aprovado | Implementado e validado durante auditoria — paciente tentando acessar `/pages/clinical-dashboard.html` é redirecionado para `dashboard.html`; médico tentando acessar área do paciente é redirecionado para `clinical-dashboard.html` (PR #7) |
| CT23 — Acesso direto sem login | RNF-07 | ⏳ A executar | — |
| CT24 — Responsividade mobile | RNF-02 | ⏳ A executar | — |

**Resumo parcial:** 11 de 24 casos já aprovados (≈ 46%) — os demais serão executados pela equipe antes da entrega final.

## Avaliação dos Testes de Software

### Resultados parciais (até o momento)

Dos 11 casos já executados durante o desenvolvimento, **100% foram aprovados**. Não houve falha em nenhum teste executado, embora **2 bugs significativos** tenham sido encontrados e corrigidos durante a auditoria de qualidade:

1. **Bug de sequestro de conta** (relacionado ao CT15): o sistema permitia transformar qualquer conta existente (incluindo a do médico) em conta de cuidador apenas informando o CPF no formulário "Adicionar Cuidador". **Correção**: adicionados os erros estruturados `CPF_OWNED` e `CG_LINKED_ELSEWHERE` em `store.js` que bloqueiam a operação.

2. **Bug de alerta no painel do médico** (relacionado ao CT18): a lógica de status do paciente verificava apenas a glicemia, ignorando a pressão arterial. Como resultado, o paciente Carlos Eduardo Pereira aparecia como "Estável" mesmo com PA 172/105 mmHg. **Correção**: a função `calcPatientAlerts` em `clinical-dashboard.html` agora avalia ambos os sinais vitais e exibe o motivo do alerta abaixo do CPF.

### Pontos fortes identificados

- **Reatividade dos gráficos**: o gráfico de pressão arterial e glicemia atualizam imediatamente após o registro de uma nova medição, sem necessidade de reload — comportamento confirmado em CT09.
- **Identidade do cuidador**: o banner laranja persistente, validado em CT16 e CT17, elimina a ambiguidade sobre "em nome de quem o cuidador está agindo" — feedback positivo da equipe durante os testes.
- **Tutorial guiado**: a primeira impressão do usuário foi excelente — o spotlight com setas e contador de passos cumpriu o objetivo do RNF-11 (curva de aprendizado).

### Próximos passos antes da entrega final

A equipe executará os **13 casos pendentes** seguindo o procedimento descrito em cada caso de teste deste documento, registrando evidências em vídeo. Foco particular para CT21 (timeout de 15 min) e CT24 (responsividade mobile), que exigem cenários específicos.

---

# Teste de Usabilidade

O objetivo dos Testes de Usabilidade é avaliar a experiência percebida por usuários reais dos perfis-alvo do sistema (paciente crônico, familiar/cuidador e profissional de saúde), conforme as personas descritas na [Especificação do Projeto](especification.md).

Foram convidadas pessoas que se encaixam em cada uma das três personas para executar cenários inspirados nas histórias de usuário. Os indicadores coletados foram:

- **Taxa de sucesso**: o usuário conseguiu concluir a tarefa proposta? (sim/não)
- **Satisfação subjetiva**: avaliação na escala de 1 (Péssimo) a 5 (Ótimo)
- **Tempo de conclusão**: medido em segundos, comparado ao tempo de um especialista (membro da equipe que conhece a aplicação)

Os participantes assinaram um Termo de Consentimento Livre e Esclarecido (TCLE) e nenhuma informação pessoal identificável foi coletada, em conformidade com a LGPD.

## Cenários de Teste de Usabilidade

| Nº | Persona | Descrição do cenário |
|---|---|---|
| **1** | Paciente Crônico | Você acabou de medir sua pressão arterial pela manhã: **130 por 85**. Registre essa medição no aplicativo. |
| **2** | Paciente Crônico | Você está sentindo **tontura e dor de cabeça leve** desde o almoço. Registre esse sintoma no aplicativo. |
| **3** | Paciente Crônico | O médico pediu para você levar o histórico das suas últimas medições. **Gere um relatório clínico em PDF**. |
| **4** | Familiar / Cuidador | Você é cuidador da sua mãe. Hoje você ajudou ela a tomar a **Losartana das 8h**. Marque essa medicação como tomada no aplicativo. |
| **5** | Familiar / Cuidador | Sua mãe vai à consulta amanhã. Verifique no **histórico** dela quais foram as **3 últimas medições de glicemia**. |
| **6** | Profissional de Saúde | Você é a Dra. Ana. Acabou de entrar no painel clínico. **Identifique qual paciente está com algum sinal vital fora do alvo** e abra o prontuário dele. |
| **7** | Profissional de Saúde | Ainda como Dra. Ana, registre uma **observação clínica e um ajuste de prescrição** para o paciente selecionado. |

## Registro dos Testes de Usabilidade

_As tabelas abaixo serão preenchidas após a aplicação dos testes com os participantes convidados._

### Cenário 1 — Paciente registra pressão arterial

| Participante | Taxa de sucesso | Satisfação | Tempo (s) |
|---|---|---|---|
| Usuário 1 | _A coletar_ | _A coletar_ | _A coletar_ |
| Usuário 2 | _A coletar_ | _A coletar_ | _A coletar_ |
| Usuário 3 | _A coletar_ | _A coletar_ | _A coletar_ |
| **Média** | — | — | — |
| **Especialista (referência)** | — | — | — |

_Comentários dos usuários: (a coletar)_

### Cenário 2 — Paciente registra sintomas

| Participante | Taxa de sucesso | Satisfação | Tempo (s) |
|---|---|---|---|
| Usuário 1 | _A coletar_ | _A coletar_ | _A coletar_ |
| Usuário 2 | _A coletar_ | _A coletar_ | _A coletar_ |
| Usuário 3 | _A coletar_ | _A coletar_ | _A coletar_ |
| **Média** | — | — | — |
| **Especialista (referência)** | — | — | — |

### Cenário 3 — Paciente gera relatório PDF

| Participante | Taxa de sucesso | Satisfação | Tempo (s) |
|---|---|---|---|
| Usuário 1 | _A coletar_ | _A coletar_ | _A coletar_ |
| Usuário 2 | _A coletar_ | _A coletar_ | _A coletar_ |
| Usuário 3 | _A coletar_ | _A coletar_ | _A coletar_ |
| **Média** | — | — | — |
| **Especialista (referência)** | — | — | — |

### Cenário 4 — Cuidador marca medicação tomada

| Participante | Taxa de sucesso | Satisfação | Tempo (s) |
|---|---|---|---|
| Usuário 1 | _A coletar_ | _A coletar_ | _A coletar_ |
| Usuário 2 | _A coletar_ | _A coletar_ | _A coletar_ |
| **Média** | — | — | — |
| **Especialista (referência)** | — | — | — |

### Cenário 5 — Cuidador consulta histórico

| Participante | Taxa de sucesso | Satisfação | Tempo (s) |
|---|---|---|---|
| Usuário 1 | _A coletar_ | _A coletar_ | _A coletar_ |
| Usuário 2 | _A coletar_ | _A coletar_ | _A coletar_ |
| **Média** | — | — | — |
| **Especialista (referência)** | — | — | — |

### Cenário 6 — Médico identifica paciente em alerta

| Participante | Taxa de sucesso | Satisfação | Tempo (s) |
|---|---|---|---|
| Usuário 1 | _A coletar_ | _A coletar_ | _A coletar_ |
| Usuário 2 | _A coletar_ | _A coletar_ | _A coletar_ |
| **Média** | — | — | — |
| **Especialista (referência)** | — | — | — |

### Cenário 7 — Médico registra conduta

| Participante | Taxa de sucesso | Satisfação | Tempo (s) |
|---|---|---|---|
| Usuário 1 | _A coletar_ | _A coletar_ | _A coletar_ |
| Usuário 2 | _A coletar_ | _A coletar_ | _A coletar_ |
| **Média** | — | — | — |
| **Especialista (referência)** | — | — | — |

## Avaliação dos Testes de Usabilidade

_Seção a ser preenchida após a aplicação dos testes. Conterá:_

- Análise da taxa de sucesso por persona (paciente / cuidador / médico)
- Comparação entre o tempo médio dos usuários e o tempo do especialista
- Comentários qualitativos relevantes coletados durante os testes
- Pontos de fricção identificados (telas confusas, fluxos longos, microcopy ambíguo)
- Oportunidades de melhoria priorizadas para a próxima iteração

---

## Ferramentas Utilizadas

- **Execução manual em navegador**: Chrome, Safari, Firefox e Edge nas versões mais recentes
- **DevTools** para validação de responsividade (viewports 320 px, 375 px, 768 px, 1024 px, 1440 px)
- **Inspector do localStorage** para verificar persistência das chaves `ppc_users`, `ppc_currentUser`, `ppc_data`, `ppc_meds_taken_*`
- **Gravação de tela**: OBS Studio (para vídeos das evidências dos casos de teste)
