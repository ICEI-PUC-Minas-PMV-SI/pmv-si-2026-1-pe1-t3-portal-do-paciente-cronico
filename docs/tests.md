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

A tabela abaixo apresenta o status de cada caso de teste e a evidência correspondente, que pode ser um screenshot, um trecho de código relevante ou a observação registrada durante a execução manual.

> **Legenda:**
> - ✅ **Aprovado** — caso executado com sucesso e comportamento conforme o esperado

| Caso de Teste | Requisito | Status | Evidência / Observação |
|---|---|---|---|
| CT01 — Login como Paciente | RF-01 | ✅ Aprovado | Validado durante o desenvolvimento ([screenshot `login.png`](img/login.png) e [`dashboard-paciente.png`](img/dashboard-paciente.png)) |
| CT02 — Bloqueio de perfil incorreto | RF-01, RF-12 | ✅ Aprovado | Sistema exibiu toast *"Cadastro não encontrado, senha incorreta ou perfil errado"* ao tentar logar com perfil divergente do CPF · ref. [`auth.js`](../src/js/auth.js) (validação `user.profile !== profileSelected`) |
| CT03 — Cadastro de novo paciente | RF-01, RNF-03 | ✅ Aprovado | Usuário registrado em `ppc_users` com aceite LGPD obrigatório e redirecionamento para `dashboard.html` · ref. [`auth.js`](../src/js/auth.js) (`btnRegister` listener) e [`store.js`](../src/js/store.js) (`registerUser`) |
| CT04 — Validação de CPF | RF-01 | ✅ Aprovado | Sistema rejeita CPF com menos de 11 dígitos exibindo toast *"CPF inválido. Deve conter 11 dígitos."* · ref. [`auth.js`](../src/js/auth.js) (validação `length !== 11`) e [`store.js`](../src/js/store.js) (retorno `{ error: 'CPF_INVALID' }`) |
| CT05 — Edição do Perfil de Saúde | RF-02 | ✅ Aprovado | Edição persistida em `ppc_users` e refletida imediatamente na tela · ref. [`profile.html`](../src/pages/profile.html) (`saveClinicEdit`) e [`store.js`](../src/js/store.js) (`updatePatientBasicData`) |
| CT06 — Cadastro de medicamento | RF-03 | ✅ Aprovado | Medicamento adicionado à tabela com KPI "Total" atualizado e toast de confirmação · ref. [`medications.html`](../src/pages/medications.html) (`btnSave`) e [`store.js`](../src/js/store.js) (`addMedication`) |
| CT07 — Edição/exclusão de medicamento | RF-03 | ✅ Aprovado | Edição preenche o formulário corretamente; exclusão usa confirmação modal · ref. [`medications.html`](../src/pages/medications.html) (`editMed`, `deleteMed`) e [`store.js`](../src/js/store.js) (`updateMedication`, `deleteMedication`) |
| CT08 — Sistema de Alerta visual (status card) | RF-04, RF-05 | ✅ Aprovado | Confirmado nas dashboards dos pacientes críticos Carlos Eduardo Pereira e Ana Beatriz Lima ([`prontuario-carlos.png`](img/prontuario-carlos.png) mostra o alerta combinado) |
| CT09 — Registro de Pressão | RF-05 | ✅ Aprovado | Após registro, o gráfico de Pressão Arterial atualizou imediatamente sem reload · ref. [`dashboard.html`](../src/pages/dashboard.html) (`btnSave` aba Pressão) e [`store.js`](../src/js/store.js) (`addPressure`) |
| CT10 — Registro de Glicemia | RF-05, RF-08 | ✅ Aprovado | Após registro, o gráfico de Evolução Glicêmica adicionou novo ponto sem reload · ref. [`dashboard.html`](../src/pages/dashboard.html) (`btnSave` aba Glicose) e [`store.js`](../src/js/store.js) (`addGlycemia`) |
| CT11 — Registro de Sintomas | RF-06 | ✅ Aprovado | Registro com chips selecionados + descrição livre aparece no Histórico com tipo "Relato de Sintomas" · ref. [`dashboard.html`](../src/pages/dashboard.html) (`btnSave` aba Sintomas) e [`store.js`](../src/js/store.js) (`addSymptom`) |
| CT12 — Anexar exame ao Histórico | RF-07 | ✅ Aprovado | Nova linha na timeline com badge "Exame/Laudo" e ícone de clipe · ref. [`history.html`](../src/pages/history.html) (`btnSave`) e [`store.js`](../src/js/store.js) (`addHistoryRecord`) |
| CT13 — Busca textual no Histórico | RF-10 | ✅ Aprovado | Filtragem em tempo real a cada caractere digitado, sem necessidade de clique em "buscar" · ref. [`history.html`](../src/pages/history.html) (`#hist-search` listener `input`) |
| CT14 — Relatório PDF | RF-09 | ✅ Aprovado | Diálogo de impressão/PDF disparado automaticamente após 800 ms da renderização das tabelas · ref. [`report.html`](../src/pages/report.html) (`window.print()`) — funciona em Chrome, Firefox, Safari e Edge |
| CT15 — Cadastro de Cuidador (segurança anti-sequestro) | RF-11 | ✅ Aprovado | Bug de sequestro de conta encontrado e corrigido durante a auditoria — `registerCaregiver` em `store.js` agora retorna os erros `CPF_OWNED` e `CG_LINKED_ELSEWHERE` (PR #7) |
| CT16 — Login como Cuidador | RF-11 | ✅ Aprovado | Banner laranja exibido corretamente ([`dashboard-cuidador.png`](img/dashboard-cuidador.png)) |
| CT17 — Banner persistente em todas as páginas | RF-11 | ✅ Aprovado | Validado por navegação manual entre Início, Histórico, Remédios e Perfil — banner mantém o nome "João Silva" em todas as telas · ref. [`caregiver-banner.js`](../src/js/caregiver-banner.js) |
| CT18 — Médico vê pacientes com alerta | RF-12, RF-13 | ✅ Aprovado | Bug corrigido durante auditoria (status considerava apenas glicemia, agora considera PA também) — visível em [`painel-medico.png`](img/painel-medico.png) com Carlos e Ana Beatriz com badge "Alerta!" e motivo descrito |
| CT19 — Médico registra conduta clínica | RF-14 | ✅ Aprovado | Conduta persistida em `ppc_data[id].observations[]` e exibida imediatamente no "Histórico de Condutas" abaixo do formulário · ref. [`clinical-dashboard.html`](../src/pages/clinical-dashboard.html) (`btnSaveObservation`) e [`store.js`](../src/js/store.js) (`saveObservation`) |
| CT20 — Tutorial guiado dispara no primeiro acesso | RNF-11 | ✅ Aprovado | Validado pela equipe — tour com spotlight pulsante e tooltip apareceu corretamente na primeira visita à dashboard, com seta apontando para cada elemento (após correção do bug de orientação da seta) |
| CT21 — Timeout de sessão (15 minutos) | RNF-07 | ✅ Aprovado | Após 15 min sem qualquer evento de `mousemove`/`keydown`/`click`/`scroll`/`touchstart`, `ppc_currentUser` é removido e o usuário é redirecionado para a tela de login · ref. [`security.js`](../src/js/security.js) (`TIMEOUT_MS = 15 * 60 * 1000`, `logoutByInactivity`) |
| CT22 — Controle de acesso por perfil | RF-12 | ✅ Aprovado | Implementado e validado durante auditoria — paciente tentando acessar `/pages/clinical-dashboard.html` é redirecionado para `dashboard.html`; médico tentando acessar área do paciente é redirecionado para `clinical-dashboard.html` (PR #7) |
| CT23 — Acesso direto sem login | RNF-07 | ✅ Aprovado | Verificação síncrona executada no parse de cada página interna; se `ppc_currentUser` está ausente ou inválido, redirecionamento imediato para `/index.html` via `window.location.replace` (não permite voltar pelo browser back) · ref. [`security.js`](../src/js/security.js) (IIFE de proteção de rota) |
| CT24 — Responsividade mobile | RNF-02 | ✅ Aprovado | Layout testado em viewports de 320 px a 1440 px (DevTools) — gráficos se reorganizam, bottom-nav permanece fixa, formulários ocupam 100% da largura em mobile · ref. 18+ media queries em [`components.css`](../src/css/components.css), [`onboarding.css`](../src/css/onboarding.css), [`global.css`](../src/css/global.css) e estilos das páginas |

**Resultado:** **24 de 24 casos aprovados** (100% de aprovação).

## Avaliação dos Testes de Software

### Resultado geral

Dos **24 casos de teste** previstos no plano, **24 foram aprovados** — **100% de taxa de sucesso**. Nenhuma falha funcional persistiu até a conclusão dos testes. Durante a execução foram encontrados e corrigidos **2 bugs significativos** que mereceram registro detalhado:

1. **Bug de sequestro de conta** (relacionado ao CT15): o sistema permitia transformar qualquer conta existente (incluindo a do médico) em conta de cuidador apenas informando o CPF no formulário "Adicionar Cuidador". **Correção**: adicionados os erros estruturados `CPF_OWNED` e `CG_LINKED_ELSEWHERE` em `store.js`, que bloqueiam a operação com mensagem clara para o usuário.

2. **Bug de alerta no painel do médico** (relacionado ao CT18): a lógica de status do paciente verificava apenas a glicemia, ignorando a pressão arterial. Como resultado, o paciente Carlos Eduardo Pereira aparecia como "Estável" mesmo com PA 172/105 mmHg. **Correção**: a função `calcPatientAlerts` em `clinical-dashboard.html` agora avalia ambos os sinais vitais e exibe o motivo do alerta abaixo do CPF.

### Pontos fortes identificados

- **Reatividade dos gráficos** (CT09, CT10): os gráficos de Pressão Arterial e Evolução Glicêmica atualizam imediatamente após o registro de uma nova medição, sem necessidade de reload manual — atende plenamente o RNF-04 (fluxo principal em até 3 cliques) combinado com o RF-08.
- **Identidade do cuidador** (CT16, CT17): o banner laranja persistente em todas as telas elimina ambiguidade sobre "em nome de quem o cuidador está agindo" — atende RF-11.
- **Tutorial guiado** (CT20): o tour com spotlight pulsante, setas e contador de passos cumpre o objetivo do RNF-11 (curva de aprendizado), com tours específicos por perfil.
- **Segurança em múltiplas camadas** (CT21, CT22, CT23): controle de acesso por perfil + timeout de inatividade + proteção contra acesso direto a páginas internas constroem uma defesa em profundidade alinhada ao RNF-07.
- **Validação dupla de CPF** (CT04): a verificação acontece tanto na camada de UI (em `auth.js`) quanto na camada de dados (em `store.js`), garantindo que dados inválidos não cheguem a `localStorage`.

### Limitações reconhecidas

- O CT24 (responsividade mobile) foi validado em emuladores de viewport via DevTools, não em dispositivos físicos. A equipe planeja realizar uma segunda rodada em smartphones reais para confirmar a experiência em telas com notch e botões de hardware.
- O ambiente de produção (GitHub Pages) é HTTPS, mas o ambiente local roda em HTTP. Em uma futura versão com backend real, será preciso revisitar RNF-06 com testes de certificado e cabeçalhos de segurança.

### Melhorias planejadas para a próxima iteração

- Persistência em backend real (substituir `localStorage` por API REST)
- Hash de senhas (atualmente em texto puro, aceitável apenas para MVP)
- Notificações push reais para os horários de medicação (hoje apenas alertas visuais)
- Autorização explícita do paciente para o médico (consentimento individual em vez de acesso por perfil)

---

# Teste de Usabilidade

O objetivo da avaliação de usabilidade do **Portal do Paciente Crônico** é verificar a qualidade da experiência do usuário em cada uma das três personas do sistema (paciente crônico, familiar/cuidador e profissional de saúde), conforme as descrições em [`docs/especification.md`](especification.md).

## Método: Avaliação Heurística de Nielsen

A equipe optou pela **Avaliação Heurística** como método de avaliação de usabilidade neste MVP. Trata-se de uma técnica de inspeção desenvolvida por **Jakob Nielsen** ([1994](references.md)) na qual avaliadores examinam a interface comparando-a a um conjunto de princípios reconhecidos de boa usabilidade — as chamadas **10 Heurísticas de Nielsen**.

A escolha desta abordagem em detrimento de testes com participantes externos justifica-se por:

- **Adequação à fase MVP do projeto**: a avaliação heurística é recomendada como **etapa preliminar** antes de envolver usuários reais — identifica violações graves de usabilidade que comprometeriam o próprio teste com participantes.
- **Eficiência de custo e tempo**: dispensa o recrutamento, agendamento e coleta de TCLE de participantes externos, viáveis apenas em fases posteriores do produto.
- **Robustez metodológica**: a [Nielsen Norman Group](references.md) demonstra que **3 a 5 avaliadores experientes detectam aproximadamente 75% dos problemas de usabilidade**, percentual considerado consistente para esta etapa.
- **Cobertura completa do sistema**: enquanto testes com participantes avaliam fluxos específicos, a inspeção heurística cobre **a interface inteira**, todos os perfis e estados.

A avaliação foi conduzida pelos cinco integrantes da equipe, com cada heurística recebendo uma **nota de 1 a 5** (1 = Péssimo, 5 = Ótimo) baseada em evidências objetivas da interface e do código. Para cada heurística são também listadas as funcionalidades específicas que cumprem o princípio e as oportunidades de melhoria identificadas para iterações futuras.

## Cenários de Referência da Inspeção

A avaliação foi realizada cobrindo os seguintes cenários de uso reais, que correspondem às histórias de usuário do documento de especificação:

| Nº | Persona | Cenário inspecionado |
|---|---|---|
| **1** | Paciente Crônico | Registrar uma medição de pressão arterial (130/85) pelo bottom-sheet "Novo Registro". |
| **2** | Paciente Crônico | Registrar um relato de sintomas (tontura + dor de cabeça leve) com chips e descrição livre. |
| **3** | Paciente Crônico | Gerar um relatório clínico em PDF pelo Perfil. |
| **4** | Familiar / Cuidador | Acessar a dashboard do paciente vinculado e marcar a Losartana das 8h como tomada. |
| **5** | Familiar / Cuidador | Navegar até o histórico e consultar as três últimas medições de glicemia. |
| **6** | Profissional de Saúde | Entrar no painel clínico e identificar um paciente com sinal vital fora do alvo. |
| **7** | Profissional de Saúde | Registrar uma observação clínica e um ajuste de prescrição. |

## Resultados da Avaliação Heurística

A seguir, a aplicação detalhada de cada uma das 10 heurísticas ao Portal do Paciente Crônico.

### H1 — Visibilidade do Status do Sistema

**Princípio:** o sistema deve manter o usuário informado sobre o que está acontecendo, por meio de feedback adequado em tempo razoável.

**Nota: 5 / 5**

| Onde se verifica | Evidência |
|---|---|
| Cartão de status adaptativo no dashboard que muda de cor (azul/vermelho) conforme as medições | [`dashboard.html`](../src/pages/dashboard.html) (`updateStatusCard`) |
| Toasts coloridos por tipo (sucesso/erro/info) após cada ação relevante | [`toast.js`](../src/js/toast.js) |
| Estado "Entrando..." no botão de login durante a autenticação | [`auth.js`](../src/js/auth.js) |
| Badges "Alerta!" no painel do médico com indicação visual e textual do motivo | [`clinical-dashboard.html`](../src/pages/clinical-dashboard.html) |
| Banner laranja persistente identificando o paciente representado pelo cuidador | [`caregiver-banner.js`](../src/js/caregiver-banner.js) |

### H2 — Correspondência entre o Sistema e o Mundo Real

**Princípio:** o sistema deve falar a linguagem do usuário, com termos familiares, em vez de jargão técnico, seguindo convenções do mundo real.

**Nota: 5 / 5**

| Onde se verifica | Evidência |
|---|---|
| Vocabulário em português acessível, sem jargão médico ou técnico | Todas as telas; ex.: "Novo Registro", "Meus Remédios", "Anexar Exame/Laudo" |
| Ícones intuitivos consistentes com o domínio (coração para pressão, gota para glicemia, comprimido para remédio) | Lucide Icons em [`dashboard.html`](../src/pages/dashboard.html) |
| Mensagens do status card em linguagem natural ("Atenção!", "Muito bem!", "Comece agora") | [`dashboard.html`](../src/pages/dashboard.html) |
| Termo LGPD em linguagem simples, sem juridiquês excessivo (RNF-12) | [`register.html`](../src/register.html) |
| Unidades de medida explícitas (mmHg, mg/dL, anos) | [`dashboard.html`](../src/pages/dashboard.html) |

### H3 — Controle e Liberdade do Usuário

**Princípio:** usuários frequentemente cometem erros e precisam de uma "saída de emergência" claramente sinalizada para sair de estados indesejados sem precisar passar por um diálogo extenso.

**Nota: 4 / 5**

| Onde se verifica | Evidência |
|---|---|
| Botões **Voltar / Pular** durante o tutorial guiado | [`onboarding.js`](../src/js/onboarding.js) |
| Botão **Cancelar** em todos os formulários inline (medicamentos, histórico, cuidadores, conduta) | Várias páginas em [`src/pages/`](../src/pages/) |
| **Confirmação modal** antes de exclusões irreversíveis (remédio, cuidador, logout) com `showConfirm` | [`toast.js`](../src/js/toast.js) (`showConfirm`) |
| Capacidade de **editar** dados clínicos, medicamentos e cuidadores depois de criados | Várias páginas |
| Botão **"Rever Tutorial de Boas-vindas"** permite refazer o onboarding | [`profile.html`](../src/pages/profile.html) |

**Oportunidade de melhoria:** ainda não há **desfazer (undo)** após uma exclusão concluída. Em iterações futuras, pode-se exibir um toast "Medicamento excluído. Desfazer?" com 5 segundos para reverter.

### H4 — Consistência e Padrões

**Princípio:** os usuários não devem ter que se perguntar se palavras, situações ou ações diferentes significam a mesma coisa.

**Nota: 5 / 5**

| Onde se verifica | Evidência |
|---|---|
| **Design system centralizado** com variáveis CSS (cores, tipografia, espaçamento, raios) reaproveitadas em todas as telas | [`variables.css`](../src/css/variables.css) |
| Tipografia única (**Inter**) usada em todas as páginas | [`variables.css`](../src/css/variables.css) |
| Mesma família de ícones (**Lucide**) com tamanhos consistentes | Todas as páginas |
| Bottom-nav idêntico nas 4 telas do paciente/cuidador | [`dashboard.html`](../src/pages/dashboard.html), [`history.html`](../src/pages/history.html), [`medications.html`](../src/pages/medications.html), [`profile.html`](../src/pages/profile.html) |
| Botões com mesma forma, raio e padding em todo o sistema | [`components.css`](../src/css/components.css) |
| Padrão de **value cards** repetido nas medições de pressão e glicemia | [`dashboard.html`](../src/pages/dashboard.html) |

### H5 — Prevenção de Erros

**Princípio:** melhor do que boas mensagens de erro é um design cuidadoso que previne o erro antes que ele aconteça.

**Nota: 5 / 5**

| Onde se verifica | Evidência |
|---|---|
| **Validação de CPF** em duas camadas (UI em `auth.js` + dados em `store.js`) | [`auth.js`](../src/js/auth.js), [`store.js`](../src/js/store.js) (`registerUser`) |
| **Senha mínima** de 4 caracteres bloqueada antes do envio | [`auth.js`](../src/js/auth.js) |
| **Aceite LGPD obrigatório**: cadastro não conclui sem o checkbox | [`auth.js`](../src/js/auth.js) (`reg-lgpd`) |
| **Proteção anti-sequestro de conta** no cadastro de cuidador | [`store.js`](../src/js/store.js) (`registerCaregiver`) |
| Campos obrigatórios verificados antes de salvar registros (medições, sintomas, exames) | [`dashboard.html`](../src/pages/dashboard.html), [`history.html`](../src/pages/history.html) |
| **Confirmação modal** antes de ações destrutivas (excluir medicamento, cuidador, sair da conta) | Várias páginas |
| **Máscara automática** de CPF impede formatos inválidos | [`profile.html`](../src/pages/profile.html), [`register.html`](../src/register.html) |
| **Controle de acesso por perfil** impede que usuários acessem áreas que não são suas | [`security.js`](../src/js/security.js) |

### H6 — Reconhecimento em vez de Memorização

**Princípio:** minimize a carga de memória do usuário tornando objetos, ações e opções visíveis.

**Nota: 4 / 5**

| Onde se verifica | Evidência |
|---|---|
| **Chips de sintomas pré-definidos** (Tontura, Dor de cabeça, Cansaço, Falta de ar) — usuário escolhe em vez de digitar | [`dashboard.html`](../src/pages/dashboard.html) (bottom-sheet aba Sintomas) |
| **Referências clínicas visíveis** ao registrar pressão e glicemia (faixa "Ideal: até 120/80 mmHg") | [`dashboard.html`](../src/pages/dashboard.html) |
| **Lembretes dos remédios do dia** na home, com horário e dose | [`dashboard.html`](../src/pages/dashboard.html) |
| **Tutorial guiado** no primeiro acesso explica cada elemento da interface | [`onboarding.js`](../src/js/onboarding.js) |
| Botões com **texto + ícone** em vez de apenas ícone (ex.: FAB "Novo Registro") | [`onboarding.css`](../src/css/onboarding.css) (`.fab-extended`) |
| Saudação personalizada e título de seção contextual (cuidador vê "Remédios de João") | [`dashboard.html`](../src/pages/dashboard.html) |

**Oportunidade de melhoria:** o sistema poderia sugerir como pré-preenchimento os **valores mais recentes** do usuário (ex.: "Sua última pressão foi 130/80 — registrar a mesma?"), reduzindo ainda mais a digitação.

### H7 — Flexibilidade e Eficiência de Uso

**Princípio:** aceleradores (atalhos não visíveis ao iniciante) podem agilizar o uso para o usuário experiente, mantendo o sistema acessível a ambos.

**Nota: 4 / 5**

| Onde se verifica | Evidência |
|---|---|
| **Atalhos de teclado no tutorial** (←, →, Esc) para usuários acostumados a navegação por teclado | [`onboarding.js`](../src/js/onboarding.js) |
| **FAB sempre visível** no canto inferior — registro de medição em 1 clique a partir de qualquer ponto da dashboard | [`dashboard.html`](../src/pages/dashboard.html) |
| **Cuidador entra diretamente no dashboard do paciente** vinculado, sem precisar selecioná-lo | [`store.js`](../src/js/store.js) (`getActivePatientId`) |
| **Busca textual em tempo real** no histórico (sem botão "buscar") | [`history.html`](../src/pages/history.html) |
| **Busca de pacientes por nome** no painel do médico | [`clinical-dashboard.html`](../src/pages/clinical-dashboard.html) |
| **Modo desktop** do bottom-sheet vira modal centralizada com layout otimizado para mouse | [`dashboard.html`](../src/pages/dashboard.html) (media query 768 px) |

**Oportunidade de melhoria:** introduzir **atalhos de teclado adicionais** fora do tutorial (ex.: tecla "N" abre Novo Registro, "/" foca na busca) beneficia profissionais de saúde que usam o sistema com frequência.

### H8 — Design Estético e Minimalista

**Princípio:** diálogos não devem conter informação irrelevante ou raramente necessária. Cada unidade extra de informação compete com unidades de informação relevantes.

**Nota: 5 / 5**

| Onde se verifica | Evidência |
|---|---|
| **Paleta sóbria** de cores (azul primário, laranja de acento, tons neutros) | [`variables.css`](../src/css/variables.css) |
| **Espaços brancos generosos** entre seções, evitando densidade excessiva | [`global.css`](../src/css/global.css), [`components.css`](../src/css/components.css) |
| **Tipografia limpa** (Inter) com hierarquia clara de tamanhos e pesos | [`variables.css`](../src/css/variables.css) |
| **Ausência de elementos decorativos** desnecessários (clip-arts, gradientes excessivos, animações gratuitas) | Todas as telas |
| **Cards e gráficos** apresentam apenas dados essenciais; detalhes vêm sob demanda | [`dashboard.html`](../src/pages/dashboard.html), [`clinical-dashboard.html`](../src/pages/clinical-dashboard.html) |

### H9 — Ajudar os Usuários a Reconhecer, Diagnosticar e Recuperar-se de Erros

**Princípio:** mensagens de erro devem ser expressas em linguagem natural (sem códigos), indicar com precisão o problema e sugerir construtivamente uma solução.

**Nota: 4 / 5**

| Onde se verifica | Evidência |
|---|---|
| **Mensagens de erro em português direto**, sem códigos técnicos | Todos os toasts em [`toast.js`](../src/js/toast.js) |
| Erros específicos descrevem o problema (ex.: *"CPF inválido. Deve conter 11 dígitos."*) | [`auth.js`](../src/js/auth.js) |
| **Toasts coloridos** ajudam a identificar gravidade (vermelho = erro, verde = sucesso, azul = info) | [`components.css`](../src/css/components.css) |
| Status card alerta com **motivo descritivo** (ex.: *"Pressão 172/105 mmHg fora do alvo"*) | [`dashboard.html`](../src/pages/dashboard.html) (`updateStatusCard`) |
| Erros estruturados nas tentativas de cadastro de cuidador com mensagens explicativas (`CPF_OWNED`, `CG_LINKED_ELSEWHERE`) | [`store.js`](../src/js/store.js) (`registerCaregiver`) |

**Oportunidade de melhoria:** algumas mensagens poderiam sugerir **ação imediata** além de descrever o problema — por exemplo, em vez de apenas *"Senha muito fraca"*, dizer *"Senha muito fraca. Use pelo menos 4 caracteres, misturando letras e números."*

### H10 — Ajuda e Documentação

**Princípio:** embora seja melhor que o sistema possa ser usado sem documentação, pode ser necessário fornecer ajuda. Toda informação de ajuda deve ser fácil de pesquisar e focada na tarefa do usuário.

**Nota: 4 / 5**

| Onde se verifica | Evidência |
|---|---|
| **Tutorial guiado interativo** no primeiro acesso, com tours específicos por perfil | [`onboarding.js`](../src/js/onboarding.js) |
| Botão **"Rever Tutorial de Boas-vindas"** sempre acessível no Perfil | [`profile.html`](../src/pages/profile.html) |
| **Faixas informativas** dentro dos formulários (ex.: referências clínicas de PA e glicemia) | [`dashboard.html`](../src/pages/dashboard.html) (bottom-sheet) |
| **Placeholders explicativos** nos campos de formulário (ex.: "Ex.: Tive bastante enjoô após o almoço…") | Várias páginas |
| **Texto LGPD em linguagem simples** explicando o tratamento dos dados | [`register.html`](../src/register.html) |
| Documentação pública e organizada do projeto (com cross-links entre arquivos) | Toda a pasta [`docs/`](.) |

**Oportunidade de melhoria:** uma seção **FAQ acessível dentro do app** (ícone de ajuda no header) cobriria dúvidas frequentes sem o usuário precisar sair do sistema ou abrir o tutorial completo.

## Resumo Quantitativo da Avaliação Heurística

| Heurística | Nota |
|---|---|
| H1 — Visibilidade do status do sistema | 5 / 5 |
| H2 — Correspondência sistema/mundo real | 5 / 5 |
| H3 — Controle e liberdade do usuário | 4 / 5 |
| H4 — Consistência e padrões | 5 / 5 |
| H5 — Prevenção de erros | 5 / 5 |
| H6 — Reconhecimento em vez de memorização | 4 / 5 |
| H7 — Flexibilidade e eficiência de uso | 4 / 5 |
| H8 — Design estético e minimalista | 5 / 5 |
| H9 — Ajudar a reconhecer, diagnosticar e recuperar erros | 4 / 5 |
| H10 — Ajuda e documentação | 4 / 5 |
| **Média geral** | **4,5 / 5** |

## Avaliação dos Testes de Usabilidade

### Síntese

O **Portal do Paciente Crônico** apresenta um **alto índice de aderência aos princípios de usabilidade** consolidados na literatura (média **4,5 / 5**). Cinco das dez heurísticas atingiram a pontuação máxima:

- **H1** (visibilidade do status), **H2** (linguagem do mundo real), **H4** (consistência), **H5** (prevenção de erros) e **H8** (design minimalista) — todas com 5 / 5.

Estas categorias refletem decisões deliberadas tomadas durante o projeto: um **design system centralizado** ([`variables.css`](../src/css/variables.css)) para garantir consistência, **validações em camadas** para prevenir erros, **feedback visual constante** via status card adaptativo, banner do cuidador e toasts, e uma **linguagem cuidadosa** que evita jargão médico e técnico.

### Pontos de Atenção Identificados

Quatro heurísticas receberam pontuação 4 / 5 (boa, com espaço para evolução):

1. **H3 — Controle e Liberdade do Usuário**: ausência de mecanismo de **desfazer (undo)** após exclusões finalizadas. Atualmente, exclusões são confirmadas via modal mas, uma vez aprovadas, não podem ser revertidas pela interface.

2. **H6 — Reconhecimento em vez de Memorização**: o sistema poderia sugerir valores recentes como pré-preenchimento ao registrar uma nova medição, reduzindo digitação repetitiva.

3. **H7 — Flexibilidade e Eficiência de Uso**: atalhos de teclado adicionais (além dos do tutorial) acelerariam o uso por profissionais de saúde que utilizam o sistema com frequência.

4. **H9 — Mensagens de Erro**: algumas mensagens descrevem bem o problema mas poderiam sugerir **ação imediata** para correção.

5. **H10 — Ajuda e Documentação**: além do tutorial guiado, uma seção de **FAQ acessível dentro do app** (sem precisar sair para o GitHub) atenderia usuários com dúvidas pontuais.

### Pontos de Fricção Detectados

Durante a inspeção, **nenhum ponto de fricção crítico** foi identificado nos cenários de uso documentados. A análise apontou pequenos refinamentos (todos listados como "Oportunidade de melhoria" nas heurísticas individuais), mas **nenhuma quebra de fluxo, ambiguidade grave de microcopy ou bloqueio funcional** foi observada.

### Oportunidades Priorizadas para a Próxima Iteração

Em ordem de impacto estimado vs. custo de implementação:

1. **Undo após exclusões** (H3) — toast com botão "Desfazer" por 5 segundos · alto impacto, baixo custo.
2. **Sugestão de valores recentes** ao abrir o bottom-sheet "Novo Registro" (H6) — médio impacto, baixo custo.
3. **Atalhos de teclado** para abrir Novo Registro e focar na busca (H7) — médio impacto, baixo custo, beneficia principalmente o perfil Médico.
4. **Sugestão de ação nas mensagens de erro** (H9) — baixo impacto, baixo custo.
5. **FAQ dentro do app** (H10) — médio impacto, médio custo.

### Limitações Reconhecidas

- A avaliação heurística **não substitui completamente** os testes com participantes externos. Em uma próxima fase do produto, recomenda-se a aplicação de testes com **3 a 5 usuários reais por persona** (paciente, cuidador, médico) para validar empiricamente as conclusões aqui apresentadas e capturar comportamentos não previstos pelos avaliadores.
- A inspeção foi conduzida pelos próprios integrantes da equipe — embora isso introduza **viés de familiaridade**, é uma prática aceita em projetos acadêmicos de MVP e em estágios iniciais de produtos comerciais.

---

## Ferramentas Utilizadas

- **Execução manual em navegador**: Chrome, Safari, Firefox e Edge nas versões mais recentes
- **DevTools** para validação de responsividade (viewports 320 px, 375 px, 768 px, 1024 px, 1440 px)
- **Inspector do localStorage** para verificar persistência das chaves `ppc_users`, `ppc_currentUser`, `ppc_data`, `ppc_meds_taken_*`
- **Gravação de tela**: OBS Studio (para vídeos das evidências dos casos de teste)
