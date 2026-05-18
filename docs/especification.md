# Especificações do Projeto

Este documento detalha **as personas** atendidas pelo sistema, suas **histórias de usuário** e o conjunto de **requisitos funcionais e não funcionais** que orientaram o desenvolvimento do Portal do Paciente Crônico.

> 🔗 Para o **mapeamento de cada requisito ao arquivo de código que o implementa**, consulte [`docs/development.md`](development.md). Para a **especificação técnica completa** (modelo de dados, fluxos, contas de teste), consulte o [`PRD.md`](../PRD.md).

---

## 1. Perfis de Usuários (Personas)

### Paciente Crônico

| | |
|---|---|
| **Descrição** | Adulto ou idoso portador de condições como diabetes ou hipertensão, que possui familiaridade básica ou intermediária com smartphones e necessita de acompanhamento contínuo de saúde. |
| **Necessidades** | Interface simples e com botões grandes; facilidade para registrar medições diárias (glicose, pressão); lembretes visuais para horários fracionados de medicamentos; acesso ao próprio histórico de evolução. |

### Familiar / Cuidador

| | |
|---|---|
| **Descrição** | Pessoa responsável por auxiliar ou monitorar o tratamento do paciente (filho, neto ou cuidador profissional), com bom domínio tecnológico. |
| **Necessidades** | Capacidade de registrar dados **em nome do paciente** com identificação clara de quem está sendo acompanhado; acesso rápido a relatórios de adesão ao tratamento; compartilhamento de informações de forma ágil. |

### Profissional de Saúde (UBS)

| | |
|---|---|
| **Descrição** | Médico ou enfermeiro da rede de Atenção Primária que realiza o acompanhamento periódico do paciente. Tem tempo de consulta limitado e lida com alto volume de atendimentos. |
| **Necessidades** | Visualização de um painel (dashboard) resumido e gráfico do histórico do paciente; leitura rápida e clara das tendências de saúde (ex.: picos de glicemia ou pressão) com **destaque visual para medições fora do alvo**, para embasar decisões clínicas rápidas; registro de conduta clínica. |

---

## 2. Histórias de Usuários

Com base na análise das personas, foram identificadas as seguintes histórias de usuário:

|     EU COMO... `PERSONA`     | QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|-----------------------------|------------------------------------------|---------------------------------|
|Paciente Crônico  | registrar minha medição de glicemia/pressão diária em poucos cliques e de forma intuitiva | manter um histórico preciso e não precisar anotar em cadernos de papel que posso perder.     |
|Paciente Crônico  | receber alertas no celular nos horários fracionados exatos dos meus medicamentos (ex: 8h, 12h, 18h)  | não esquecer, atrasar ou duplicar nenhuma dose do meu tratamento contínuo. |
|Paciente Crônico  | confirmar que tomei o remédio clicando diretamente na própria notificação do celular | não ter o trabalho de abrir o aplicativo e navegar em menus apenas para uma ação rotineira, evitando a fadiga do uso.  |
|Paciente Crônico  | visualizar um gráfico simples e colorido com a minha própria evolução | me sentir motivado ao ver que a minha pressão ou glicose está estabilizando graças ao meu esforço. |
|Paciente Crônico  | ter um campo rápido para registrar sintomas do dia (ex: "senti tontura", "dor de cabeça") | não esquecer de relatar esses eventos importantes para o médico na minha próxima consulta presencial.|
|Paciente Crônico  |exportar meu histórico de saúde em formato PDF ou enviar por WhatsApp |poder compartilhar rapidamente meus dados caso eu vá a uma emergência ou seja atendido por um médico de fora da minha UBS. |
|Familiar / Cuidador| receber uma notificação no meu celular caso o paciente atrase a medicação em mais de uma hora| poder ligar para ele e lembrá-lo, evitando o descontrole da doença e possíveis complicações.|
|Familiar / Cuidador| poder gerenciar mais de um perfil de paciente no mesmo aplicativo (ex: mãe e pai)|centralizar o cuidado da saúde da minha família em um único lugar, sem precisar de várias contas.|
|Familiar / Cuidador| registrar a data e horário da próxima consulta médica ou ida ao posto de saúde | organizar a minha rotina com antecedência para poder acompanhá-lo no dia do atendimento.|
|Profissional de Saúde| visualizar um painel (dashboard) com o gráfico de saúde dos últimos 30 dias gerado pelo celular do paciente| ajustar a dosagem da medicação com base em dados reais e atualizados, sem depender apenas da memória do paciente durante a consulta. |
|Profissional de Saúde| visualizar alertas ou destaques visuais (em vermelho, por exemplo) nas medições que fugiram da meta| identificar rapidamente picos de pressão ou hipoglicemia, economizando tempo de análise durante a consulta curta.|
|Profissional de Saúde| visualizar a lista consolidada de quais medicamentos o paciente marcou como "em uso" no aplicativo| cruzar com o meu receituário para garantir que ele entendeu a prescrição e evitar interações medicamentosas perigosas.|


---

## 3. Requisitos

As tabelas a seguir apresentam os **requisitos funcionais (RF)** e **não funcionais (RNF)** que detalham o escopo do projeto. A coluna *Atendido em* indica os artefatos do código onde o requisito foi implementado — para o detalhamento completo de cada implementação, consulte [`docs/development.md`](development.md).

### 3.1 Requisitos Funcionais

| ID | Descrição do Requisito | Prioridade | Atendido em |
|---|---|---|---|
| **RF-01** | **Autenticação e Cadastro**: o sistema deve permitir o cadastro e o acesso seguro (login/logout) para pacientes, cuidadores e profissionais de saúde. | ALTA | ✅ [`index.html`](../src/index.html), [`register.html`](../src/register.html), [`auth.js`](../src/js/auth.js), [`store.js`](../src/js/store.js) |
| **RF-02** | **Perfil de Saúde**: o sistema deve permitir que o paciente cadastre e edite informações básicas de saúde (doenças crônicas, alergias, tipo sanguíneo). | ALTA | ✅ [`profile.html`](../src/pages/profile.html) (accordion Dados Clínicos) |
| **RF-03** | **Registro de Medicamentos**: o sistema deve permitir que o usuário registre seus medicamentos de uso contínuo, informando dosagem e horários. | ALTA | ✅ [`medications.html`](../src/pages/medications.html) (CRUD completo) |
| **RF-04** | **Sistema de Alertas**: o sistema deve emitir alertas visuais na interface para destacar medições fora do alvo clínico e horários de medicação. | ALTA | ✅ Status card adaptativo na [`dashboard.html`](../src/pages/dashboard.html); badge "Alerta!" na [`clinical-dashboard.html`](../src/pages/clinical-dashboard.html) |
| **RF-05** | **Registro de Medições Diárias**: o sistema deve disponibilizar um formulário simplificado para o registro rápido de medições de rotina (glicemia e pressão arterial). | ALTA | ✅ Bottom-sheet "Novo Registro" na [`dashboard.html`](../src/pages/dashboard.html) (abas Pressão e Glicose) |
| **RF-06** | **Registro de Sintomas**: o sistema deve permitir que o paciente registre sintomas diários (descrição e data) para acompanhamento da evolução clínica. | MÉDIA | ✅ Aba Sintomas no bottom-sheet, com chips + descrição livre |
| **RF-07** | **Histórico de Exames e Consultas**: o sistema deve permitir o cadastro de exames e consultas com data e referência a anexos. | MÉDIA | ✅ [`history.html`](../src/pages/history.html) (botão "Anexar Exame/Laudo") |
| **RF-08** | **Dashboard do Paciente (Gráficos)**: o sistema deve gerar um painel visual com gráficos da evolução das medições. | ALTA | ✅ Canvases `#glycemiaChart` e `#pressureChart` em [`dashboard.html`](../src/pages/dashboard.html) (Chart.js) |
| **RF-09** | **Exportação e Compartilhamento**: o sistema deve permitir que o paciente exporte seus dados (PDF) para compartilhar com profissionais. | MÉDIA | ✅ [`report.html`](../src/pages/report.html) via `window.print()` |
| **RF-10** | **Busca e Filtro**: o sistema deve disponibilizar busca para localizar rapidamente exames, consultas ou medicamentos. | BAIXA | ✅ `#hist-search` em [`history.html`](../src/pages/history.html); `#patient-search` em [`clinical-dashboard.html`](../src/pages/clinical-dashboard.html) |
| **RF-11** | **Perfil Cuidador**: o sistema deve permitir o cadastro de um "Perfil Cuidador" vinculado a um paciente para ajudar na gestão da rotina. | MÉDIA | ✅ [`profile.html`](../src/pages/profile.html) (accordion Meus Cuidadores) + [`caregiver-banner.js`](../src/js/caregiver-banner.js) |
| **RF-12** | **Acesso Autorizado do Médico**: o sistema deve permitir que o médico acesse os dados do paciente garantindo a privacidade. | ALTA | ✅ Login por perfil em [`auth.js`](../src/js/auth.js) + controle de acesso em [`security.js`](../src/js/security.js) |
| **RF-13** | **Visualização Clínica (Dashboard do Médico)**: linha do tempo consolidada de sintomas, exames e medições. | ALTA | ✅ [`clinical-dashboard.html`](../src/pages/clinical-dashboard.html) |
| **RF-14** | **Observações e Prescrições Médicas**: o sistema deve permitir que o médico registre observações e atualize prescrições. | MÉDIA | ✅ Seção "Prontuário e Conduta" em [`clinical-dashboard.html`](../src/pages/clinical-dashboard.html) + função `saveObservation` em [`store.js`](../src/js/store.js) |

### 3.2 Requisitos Não Funcionais

| ID | Descrição do Requisito | Prioridade | Atendido em |
|---|---|---|---|
| **RNF-01** | **Acessibilidade Visual**: botões grandes, tipografia legível e alto contraste para idosos. | ALTA | ✅ [`variables.css`](../src/css/variables.css) (tipografia Inter, paleta WCAG); botões ≥ 44 px |
| **RNF-02** | **Responsividade**: layout mobile-first adaptável a smartphones, tablets e desktops. | ALTA | ✅ `@media` em [`components.css`](../src/css/components.css) e [`onboarding.css`](../src/css/onboarding.css) |
| **RNF-03** | **Segurança e Privacidade (LGPD)**: aceite explícito do termo de consentimento. | ALTA | ✅ Checkbox `#reg-lgpd` em [`register.html`](../src/register.html); bloqueio sem aceite |
| **RNF-04** | **Eficiência de Uso**: registro diário em até 3 cliques. | ALTA | ✅ FAB → aba → Salvar = 3 cliques |
| **RNF-05** | **Desempenho**: carregamento < 3 s em redes móveis. | ALTA | ✅ Vanilla JS sem bundler; CSS único por contexto; assets via CDN |
| **RNF-06** | **HTTPS**: comunicação criptografada. | ALTA | ✅ GitHub Pages serve em HTTPS automaticamente |
| **RNF-07** | **Timeout de Sessão**: logout automático após 15 minutos de inatividade. | MÉDIA | ✅ Listeners globais em [`security.js`](../src/js/security.js) |
| **RNF-08** | **Tratamento de Erros Amigável**: mensagens claras, sem jargão técnico. | ALTA | ✅ Toasts coloridos em [`toast.js`](../src/js/toast.js); `showConfirm` para confirmações |
| **RNF-09** | **Prevenção de Perda de Dados**: dados preservados em queda de conexão. | MÉDIA | ✅ Persistência em `localStorage`; funciona totalmente offline |
| **RNF-10** | **Compatibilidade de Navegadores**: Chrome, Safari, Firefox e Edge recentes. | ALTA | ✅ Uso exclusivo de Web Standards (HTML5, CSS3, ES6+) |
| **RNF-11** | **Curva de Aprendizado (Onboarding)**: tutorial visual e interativo no primeiro acesso. | BAIXA | ✅ Tour guiado com spotlight em [`onboarding.js`](../src/js/onboarding.js) + estilos em [`onboarding.css`](../src/css/onboarding.css); botão "Rever Tutorial" no Perfil |
| **RNF-12** | **Clareza Legal**: Termos de Uso em linguagem simples. | MÉDIA | ✅ Texto LGPD em [`register.html`](../src/register.html) escrito em linguagem direta |

---

## 4. Documentação Complementar

| Tema | Documento |
|---|---|
| Contexto, problema e justificativa | [`docs/context.md`](context.md) |
| Telas, wireframes e design system | [`docs/interface.md`](interface.md) |
| Mapeamento RF → arquivo de código | [`docs/development.md`](development.md) |
| Plano e cenários de testes | [`docs/tests.md`](tests.md) |
| Bibliografia | [`docs/references.md`](references.md) |
| Especificação técnica detalhada (PRD) | [`../PRD.md`](../PRD.md) |

