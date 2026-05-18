# Apresentação do Projeto

Este diretório reúne os materiais usados para apresentar o **Portal do Paciente Crônico** ao orientador, ao corpo docente e à comunidade acadêmica. Inclui slides, vídeo de demonstração e um roteiro completo da narração.

🔗 **Aplicação rodando:** [Acessar o Portal do Paciente Crônico](https://icei-puc-minas-pmv-si.github.io/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/src/)

---

## Arquivos desta pasta

| Arquivo | Descrição | Status |
|---|---|---|
| [`sample-presentation.pdf`](./sample-presentation.pdf) | Modelo inicial de estrutura de slides recebido como referência | Placeholder · será substituído |
| `pitch-inicial.pdf` | Slides do **Pitch Inicial** (apresentação da Etapa 2 — antes da implementação) | _A produzir_ |
| `apresentacao-final.pdf` | Slides da **Apresentação Final** (Etapa 5 — resultado entregue) | _A produzir_ |
| `video-demonstracao.mp4` | Vídeo de até 5 minutos demonstrando o sistema em uso | _A produzir_ |

> Quando o material final estiver pronto, os arquivos placeholder serão substituídos pelos definitivos e a coluna "Status" deste documento será atualizada.

---

## 1. Título e Identidade do Projeto

**Nome:** Portal do Paciente Crônico
**Tagline:** Registro Pessoal de Saúde para o acompanhamento diário de doenças crônicas.
**Curso:** Sistemas de Informação · PUC Minas
**Disciplina:** Projeto - Aplicações Web (1º semestre)
**Equipe:** Alan Alencar da Silva · Alex Gabriel Rocha Santos · Bernardo Santos Torres · Marcela Fernandes de Castro Melo · Sara Zschaber de Souza
**Orientador:** Prof. Clóvis Lemos Tavares

A identidade visual segue uma paleta sóbria de azul e laranja, tipografia **Inter** e ícones [Lucide](https://lucide.dev/) — escolhas alinhadas com o contexto de saúde (confiança, clareza, calma) e com a acessibilidade visual para usuários idosos (alto contraste e botões grandes). Para detalhes sobre o sistema de design, ver as variáveis em [`src/css/variables.css`](../src/css/variables.css) e os componentes em [`src/css/components.css`](../src/css/components.css).

---

## 2. Estrutura Sugerida dos Slides

Distribuição em ~12 slides, seguindo a [regra 10-20-30](https://revistapegn.globo.com/Noticias/noticia/2014/07/regra-10-20-30-para-apresentacoes-de-sucesso.html) (≤ 10 slides essenciais, ≤ 20 min de fala, fonte ≥ 30pt).

| # | Slide | Conteúdo principal | Fonte no projeto |
|---|---|---|---|
| 1 | **Capa** | Nome do projeto, logo, integrantes, orientador, disciplina | — |
| 2 | **O Problema** | Baixa adesão ao tratamento de crônicas; dados IBGE/OMS | [`docs/context.md`](../docs/context.md) e [`docs/references.md`](../docs/references.md) |
| 3 | **Personas e Público-Alvo** | Paciente Crônico · Familiar/Cuidador · Profissional de Saúde | [`docs/especification.md`](../docs/especification.md) |
| 4 | **Histórias de Usuário** | Seleção das histórias mais marcantes ("registrar glicemia em poucos cliques", "receber alertas") | [`docs/especification.md`](../docs/especification.md) |
| 5 | **Solução Proposta** | Visão geral do produto: 3 perfis, dashboard, registro de medições, alertas | [`PRD.md`](../PRD.md) |
| 6 | **Arquitetura e Stack** | HTML5 + CSS3 + Vanilla JS · Chart.js · Lucide · localStorage · GitHub Pages · Docker/Nginx | [`docs/development.md#arquitetura-e-stack`](../docs/development.md) |
| 7 | **Demonstração — Paciente** | Screenshot da dashboard, fluxo "Novo Registro" | [`src/pages/dashboard.html`](../src/pages/dashboard.html) |
| 8 | **Demonstração — Cuidador** | Banner de identificação, contexto do paciente acompanhado | [`src/js/caregiver-banner.js`](../src/js/caregiver-banner.js) |
| 9 | **Demonstração — Médico** | Painel clínico, alertas de pacientes críticos, conduta | [`src/pages/clinical-dashboard.html`](../src/pages/clinical-dashboard.html) |
| 10 | **Diferenciais** | Tutorial guiado, conformidade LGPD, acessibilidade, responsividade | [`src/js/onboarding.js`](../src/js/onboarding.js) · [`src/register.html`](../src/register.html) |
| 11 | **Testes e Qualidade** | 24 casos de teste mapeados aos requisitos; cenários de usabilidade com personas reais | [`docs/tests.md`](../docs/tests.md) |
| 12 | **Próximos Passos e Encerramento** | Backlog do MVP (backend real, hash de senhas, notificações push, autorização granular) + agradecimentos | [`docs/development.md#próximos-passos-backlog`](../docs/development.md) |

> **Dica:** todos os slides de demonstração devem incluir um QR code apontando para a URL pública do GitHub Pages, permitindo que a banca acesse o sistema durante a apresentação.

---

## 3. Roteiro do Vídeo de Demonstração (≤ 5 minutos)

Estrutura cronometrada com narração e ações na tela. Pode ser gravado com o **[OBS Studio](https://obsproject.com/pt-br/download)** (gratuito) ou similar.

### `00:00 – 00:30` Abertura
- Tela inicial estática com logo do projeto
- Narração: contextualizar o problema das doenças crônicas no Brasil (≈ 40% da população adulta), citar a baixa adesão ao tratamento, apresentar o nome do projeto e os integrantes
- Citação rápida das fontes IBGE/OMS — ver [`docs/context.md`](../docs/context.md)

### `00:30 – 01:00` Solução em uma frase
- "O Portal do Paciente Crônico é um Registro Pessoal de Saúde web, que conecta paciente, cuidador e médico em torno do acompanhamento diário de pressão, glicemia, sintomas e medicação."
- Mostrar a tela de login com os três perfis

### `01:00 – 02:00` Fluxo do **Paciente** (~ 1 min)
1. Login como **João Silva** (CPF `123.456.789-00` / senha `123`)
2. Mostrar dashboard com os dois gráficos já populados (glicemia e pressão)
3. Clicar no botão **Novo Registro** → aba **Pressão** → registrar `130/85` → mostrar gráfico atualizar instantaneamente
4. Marcar um medicamento como tomado (botão circular)
5. Abrir o **Histórico** rapidamente e demonstrar a busca textual

Trecho relevante do código: [`src/pages/dashboard.html`](../src/pages/dashboard.html) e [`src/js/store.js`](../src/js/store.js) (função `addPressure`).

### `02:00 – 02:45` Fluxo do **Cuidador** (~ 45 s)
1. Sair e logar como **Alan Cuidador** (CPF `477.447.980-23` / senha `123`)
2. Destacar o **banner laranja no topo**: *"Você está acompanhando João Silva"*
3. Saudação personalizada: *"Olá, Alan · Acompanhando João Silva"*
4. Navegar entre Histórico, Remédios e Perfil → banner permanece em todas as telas
5. Narração: o cuidador opera **em nome do paciente**, sempre identificado para evitar confusão

Trecho relevante: [`src/js/caregiver-banner.js`](../src/js/caregiver-banner.js).

### `02:45 – 03:45` Fluxo do **Médico** (~ 1 min)
1. Sair e logar como **Dra. Ana** (CPF `111.111.111-11` / senha `123`)
2. Mostrar a lista de pacientes ativos
3. Apontar os badges vermelhos de **"Alerta!"** em Carlos Eduardo Pereira (PA 172/105) e Ana Beatriz Lima (Glicemia 240 mg/dL)
4. Selecionar **Carlos** → revisar o gráfico de pressão com pico recente
5. Preencher uma observação clínica e um ajuste de prescrição → clicar em **Salvar e Notificar o Paciente**
6. Mostrar o registro aparecendo no "Histórico de Condutas"

Trechos relevantes: [`src/pages/clinical-dashboard.html`](../src/pages/clinical-dashboard.html) e [`src/js/store.js`](../src/js/store.js) (função `saveObservation`).

### `03:45 – 04:30` Diferenciais
- **Tutorial guiado** (RNF-11): limpar `ppc_onboarding_done_*` no DevTools → recarregar → o tour interativo dispara com spotlight pulsante
- **LGPD** no cadastro
- **Responsividade**: redimensionar a janela ou ativar modo mobile do DevTools

Trecho relevante: [`src/js/onboarding.js`](../src/js/onboarding.js).

### `04:30 – 05:00` Encerramento
- Recapitular: três perfis bem definidos, registro em poucos cliques, alertas inteligentes, conduta clínica integrada
- Mencionar próximos passos: backend real, hash de senhas, autorização granular do paciente para o médico, notificações push
- Agradecimentos à equipe e ao orientador
- Tela final com a URL pública do projeto e um QR code

---

## 4. Recursos de Apoio para Quem Vai Gravar

**Roteiro de gravação eficiente:**
- Use uma janela do navegador **em janela anônima** (sem extensões, sem cache, sem dados de outros perfis)
- Antes de começar, faça `Cmd/Ctrl + Shift + R` para forçar refresh
- No DevTools, em **Application → Local Storage**, apague chaves `ppc_onboarding_done_*` para que o tutorial dispare durante a demo
- Faça uma **passada de teste sem gravar** primeiro, cronometrando cada etapa
- Para o áudio, prefira um ambiente fechado e silencioso; um headset USB barato já melhora muito

**Ferramentas recomendadas:**
- [OBS Studio](https://obsproject.com/pt-br/download) — gravação de tela gratuita
- [DaVinci Resolve](https://www.blackmagicdesign.com/products/davinciresolve) (gratuito) ou [Shotcut](https://shotcut.org/) — edição
- [Canva](https://www.canva.com/) — slides

---

## 5. Diretrizes de Design para Slides

- **Cores:** seguir a paleta do projeto (azul `#2563EB`, laranja `#F97316`, cinza `#0F172A`) — definida em [`src/css/variables.css`](../src/css/variables.css)
- **Tipografia:** preferir uma família moderna e legível (Inter, Roboto, Open Sans)
- **Imagens:** screenshots reais do sistema rodando, com molduras consistentes
- **Texto por slide:** no máximo 6 linhas; uma ideia por slide
- **Evitar:** clip-arts genéricos, frases de marketing vazias, animações exageradas

> **Links Úteis sobre design de slides:**
> - [10 dicas de design para slides (Rock Content)](https://rockcontent.com/blog/design-para-slides/)
> - [7 dicas para apresentações eficientes (Shutterstock)](https://www.shutterstock.com/pt/blog/7-dicas-de-design-para-criar-apresentacoes-de-powerpoint-incriveis-e-eficientes)
> - [TED: 10 dicas para slides eficazes e bonitos](https://soap.com.br/blog/especialista-do-ted-da-10-dicas-para-criar-slides-eficazes-e-bonitos)
> - [How to make a great presentation (TED Playlist)](https://www.ted.com/playlists/574/how_to_make_a_great_presentation)
> - [Top Tips for Effective Presentations](https://www.skillsyouneed.com/present/presentation-tips.html)

---

## 6. Documentação Complementar

Para aprofundar qualquer ponto da apresentação, consulte os documentos do projeto:

| Tema | Documento |
|---|---|
| Contexto, problema, público-alvo | [`docs/context.md`](../docs/context.md) |
| Personas, histórias de usuário, requisitos | [`docs/especification.md`](../docs/especification.md) |
| Wireframes e protótipo de interface | [`docs/interface.md`](../docs/interface.md) |
| Mapeamento RF → código (artefatos) | [`docs/development.md`](../docs/development.md) |
| Plano de testes e cenários de usabilidade | [`docs/tests.md`](../docs/tests.md) |
| Bibliografia (ABNT) | [`docs/references.md`](../docs/references.md) |
| Especificação detalhada (PRD) | [`PRD.md`](../PRD.md) |
| Citação acadêmica (CFF) | [`CITATION.cff`](../CITATION.cff) |
| Instruções de execução | [`src/README.md`](../src/README.md) |

---

## 7. Sobre o Vídeo (regras do orientador)

- Duração máxima: **5 minutos**
- Deve **apresentar os objetivos** do projeto antes de mostrar o sistema
- Deve possuir **narração** explicando o que está sendo apresentado
- Focar nas **principais tarefas** implementadas — não é necessário mostrar cada detalhe
- Não é obrigatório que todos os integrantes participem da gravação
- Não é obrigatório que o rosto de nenhum integrante apareça
