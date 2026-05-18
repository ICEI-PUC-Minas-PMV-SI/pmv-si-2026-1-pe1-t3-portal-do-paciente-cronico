# Portal do Paciente Crônico

> Registro Pessoal de Saúde para o acompanhamento diário de pacientes com doenças crônicas

`CURSO: Sistemas de Informação`
`DISCIPLINA: Projeto - Aplicações Web`
`SEMESTRE: 1º`

**🔗 Aplicação rodando:** [Acessar o Portal do Paciente Crônico](https://icei-puc-minas-pmv-si.github.io/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/src/)

O projeto **Portal do Paciente Crônico** é uma aplicação Web desenvolvida para atuar como um Registro Pessoal de Saúde, otimizada para o acompanhamento diário de cidadãos com doenças crônicas, como diabetes e hipertensão. O foco da plataforma é combater a baixa adesão ao tratamento por meio de uma interface altamente intuitiva, reduzindo o atrito ao registrar medições de rotina e horários fracionados de medicamentos.

Além de empoderar o paciente com o controle de sua própria evolução de forma confortável, a aplicação consolida o histórico em um painel visual (dashboard). Isso facilita a rápida leitura dos dados e auxilia a tomada de decisão clínica pelos profissionais de saúde durante os atendimentos na Atenção Primária (UBS), promovendo um cuidado mais eficiente e preventivo.

---

## 👥 Equipe

* Alan Alencar da Silva
* Alex Gabriel Rocha Santos
* Bernardo Santos Torres
* Marcela Fernandes de Castro Melo
* Sara Zschaber de Souza

**Orientador:** Prof. Clóvis Lemos Tavares

---

## 🚀 Acesso Rápido

### Para experimentar o sistema

Use a [aplicação rodando online](https://icei-puc-minas-pmv-si.github.io/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/src/) com uma das contas de teste pré-carregadas:

| Perfil | CPF | Quadro / Vínculo |
|---|---|---|
| Paciente | `123.456.789-00` | João Silva (Diabetes + Hipertensão) |
| Paciente | `321.654.987-00` | Carlos Eduardo (⚠️ hipertensão crítica) |
| Paciente | `789.123.456-00` | Ana Beatriz (⚠️ diabetes descompensada) |
| Cuidador | `477.447.980-23` | Alan Cuidador (vinculado a João) |
| Médico | `111.111.111-11` | Dra. Ana (CRM 12345-MG) |

**Senha universal:** `123` · Para rodar localmente, ver [`src/README.md`](src/README.md).

### Para navegar pela documentação

| Procurando por... | Documento |
|---|---|
| Contexto, problema e justificativa do projeto | [`docs/context.md`](docs/context.md) |
| Personas, histórias de usuário e requisitos (RFs/RNFs) | [`docs/especification.md`](docs/especification.md) |
| Telas, wireframes, componentes e design system | [`docs/interface.md`](docs/interface.md) |
| Template visual inicial (Etapa 2) | [`docs/template.md`](docs/template.md) |
| Mapeamento de requisitos → arquivos de código | [`docs/development.md`](docs/development.md) |
| Plano de testes e cenários de usabilidade | [`docs/tests.md`](docs/tests.md) |
| Bibliografia (ABNT) | [`docs/references.md`](docs/references.md) |
| Especificação técnica detalhada (PRD) | [`PRD.md`](PRD.md) |
| Roteiro da apresentação e vídeo de demonstração | [`presentation/README.md`](presentation/README.md) |
| Estrutura do código-fonte e como rodar | [`src/README.md`](src/README.md) |
| Fluxo de trabalho da equipe (commits, PRs, code review) | [`CONTRIBUTING.md`](CONTRIBUTING.md) |
| Citação acadêmica (CFF) | [`CITATION.cff`](CITATION.cff) |

---

## 📅 Planejamento por Etapa

| Etapa | Atividades |
| :----: | ----------- |
| **ETAPA 1** | [Documentação de Contexto](docs/context.md) · [Especificação do Projeto](docs/especification.md) |
| **ETAPA 2** | [Projeto de Interface](docs/interface.md) · [Template Padrão](docs/template.md) |
| **ETAPA 3** | [Programação de Funcionalidades — HTML e CSS](docs/development.md) |
| **ETAPA 4** | [Programação de Funcionalidades — JavaScript](docs/development.md) · [Testes de Software](docs/tests.md) |
| **ETAPA 5** | [Apresentação](presentation/README.md) |

---

## 📂 Estrutura do Repositório

```
.
├── src/                 ← Código-fonte (HTML, CSS, JavaScript Vanilla)
│   ├── css/             ← Design system e componentes
│   ├── js/              ← Lógica da aplicação e armazenamento local
│   └── pages/           ← Telas internas (dashboard, perfil, histórico, etc.)
├── docs/                ← Documentação acadêmica e técnica
│   └── img/             ← Wireframes e capturas de tela
├── presentation/        ← Slides e materiais para apresentação
├── docker/              ← Configuração do Nginx para execução local
├── PRD.md               ← Product Requirements Document
├── CITATION.cff         ← Metadados de citação acadêmica
├── CONTRIBUTING.md      ← Guia para colaborar com o projeto
├── Dockerfile           ← Imagem Docker da aplicação
└── docker-compose.yml   ← Orquestração do ambiente local
```

---

## 🛠️ Stack Tecnológica

- **HTML5** semântico, **CSS3** (com variáveis customizadas), **JavaScript ES6+** (Vanilla — sem framework)
- **[Chart.js](https://www.chartjs.org/)** (via CDN) — gráficos de evolução glicêmica e pressão arterial
- **[Lucide Icons](https://lucide.dev/)** (via CDN) — ícones da interface
- **localStorage** do navegador — persistência sem backend
- **GitHub Pages** — hospedagem com HTTPS
- **Docker + Nginx** — opcional, para execução local em ambiente próximo ao de produção
