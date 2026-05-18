# Código-Fonte — Portal do Paciente Crônico

Esta pasta contém todo o **código-fonte** da aplicação web. O projeto é puramente client-side (HTML5 + CSS3 + Vanilla JavaScript), sem backend, com persistência via `localStorage` do navegador.

🔗 **Aplicação rodando online:** [icei-puc-minas-pmv-si.github.io/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/src/](https://icei-puc-minas-pmv-si.github.io/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/src/)

---

## 📁 Estrutura de Pastas

```
src/
├── index.html              ← Tela de login (entrada do sistema)
├── register.html           ← Tela de cadastro de novo usuário
│
├── css/                    ← Estilos da aplicação
│   ├── variables.css       ← Design system: cores, tipografia, espaçamento
│   ├── global.css          ← Reset, defaults, classes utilitárias
│   ├── components.css      ← Botões, cards, FAB, bottom-nav, modais
│   ├── clinical.css        ← Estilos exclusivos do painel do médico
│   ├── onboarding.css      ← FAB estendido, banner do cuidador e tutorial guiado
│   └── dev-switcher.css    ← Painel dev (Modo Master, ver Seção "Modo Dev")
│
├── js/                     ← Lógica de aplicação
│   ├── store.js            ← Camada de dados (CRUD em localStorage, contas mock)
│   ├── auth.js             ← Login, cadastro, recuperação de senha
│   ├── security.js         ← Proteção de rotas, controle de acesso por perfil, timeout
│   ├── main.js             ← Inicialização global
│   ├── modal.js            ← Controle do bottom-sheet "Novo Registro"
│   ├── toast.js            ← Toasts não-bloqueantes e confirmações modais
│   ├── caregiver-banner.js ← Banner laranja no topo (perfil cuidador)
│   ├── onboarding.js       ← Tutorial guiado de primeiro acesso (RNF-11)
│   └── dev-switcher.js     ← Painel de troca rápida de perfis (Modo Master)
│
└── pages/                  ← Telas internas (acessíveis após login)
    ├── dashboard.html          ← Dashboard do paciente/cuidador
    ├── history.html            ← Linha do tempo de medições e exames
    ├── medications.html        ← CRUD de medicamentos
    ├── profile.html            ← Dados clínicos e gestão de cuidadores
    ├── report.html             ← Relatório clínico imprimível em PDF
    └── clinical-dashboard.html ← Painel do médico (lista, ficha, prontuário)
```

---

## 🚀 Como executar localmente

### Opção 1 — Python (mais simples, sem dependências externas)

```bash
cd src
python3 -m http.server 8080
# Acessar http://localhost:8080/index.html
```

### Opção 2 — Docker + Nginx (mais próximo do ambiente de produção)

A partir da **raiz do projeto**:

```bash
docker compose up
# Acessar http://localhost:8080
```

A configuração está em [`Dockerfile`](../Dockerfile), [`docker-compose.yml`](../docker-compose.yml) e [`docker/nginx.conf`](../docker/nginx.conf).

### Opção 3 — Abrir direto no navegador (limitado)

É possível dar duplo-clique em `index.html` e abrir via `file://`, mas alguns recursos (como Chart.js carregado por CDN) podem ser bloqueados por políticas de CORS do navegador. Para desenvolvimento, use a Opção 1 ou 2.

---

## 🔐 Contas de Teste

Os usuários abaixo são injetados automaticamente no `localStorage` na primeira carga, então **não é necessário cadastrar nada manualmente**.

**Senha universal de teste:** `123`

| Perfil | Nome | CPF | Vínculo |
|---|---|---|---|
| Paciente | João Silva | `123.456.789-00` | Diabetes + Hipertensão (dados ricos pré-populados) |
| Paciente | Maria Souza | `987.654.321-00` | Conta limpa (testar fluxo do zero) |
| Paciente | Carlos Eduardo Pereira | `321.654.987-00` | ⚠️ Hipertensão crítica (PA 172/105) |
| Paciente | Ana Beatriz Lima | `789.123.456-00` | ⚠️ Diabetes descompensada (240 mg/dL) |
| Cuidador | Alan Cuidador | `477.447.980-23` | Vinculado a João Silva |
| Médico | Dra. Ana | `111.111.111-11` | CRM 12345-MG, vê todos os pacientes |

Para a especificação completa dos perfis e fluxos, consulte o [`PRD.md`](../PRD.md).

---

## 💾 Modelo de Dados (localStorage)

O sistema persiste dados em quatro chaves do `localStorage`:

| Chave | Conteúdo |
|---|---|
| `ppc_users` | Array de todos os usuários cadastrados |
| `ppc_currentUser` | Usuário atualmente logado (sessão ativa) |
| `ppc_data` | Dados clínicos indexados por ID de paciente (medicamentos, vitais, observações) |
| `ppc_meds_taken_YYYY-MM-DD` | Controle diário de medicamentos tomados (uma chave por dia, com housekeeping após 7 dias) |

A documentação detalhada do schema está em [`docs/development.md`](../docs/development.md#estruturas-de-dados).

---

## 🛠️ Modo Dev (Master)

Durante o desenvolvimento, o sistema oferece um **painel dev** que permite trocar rapidamente entre perfis sem passar pelo login. Ele fica **invisível** para usuários comuns e só é ativado para o construtor master.

**Ativação:**
- Login com a conta master (CPF e senha conhecidos apenas pelo construtor), OU
- URL com token de ativação (também conhecido apenas pelo construtor)

Implementação em [`js/dev-switcher.js`](js/dev-switcher.js) — para **remoção em produção**, basta apagar a referência ao script em todos os HTML.

---

## 🧪 Como verificar os Requisitos

Para um roteiro passo a passo cobrindo todos os Requisitos Funcionais e Não Funcionais, ver:

- [`docs/development.md`](../docs/development.md) — mapeamento RF → arquivo + roteiro de verificação
- [`docs/tests.md`](../docs/tests.md) — plano de testes de software (24 casos) e cenários de usabilidade

---

## 🌐 Tecnologias e Bibliotecas

- **HTML5** semântico, sem framework
- **CSS3** com variáveis customizadas (ver [`css/variables.css`](css/variables.css))
- **Vanilla JavaScript** (ES6+)
- **[Chart.js](https://www.chartjs.org/)** via CDN — gráficos de glicemia e pressão
- **[Lucide Icons](https://lucide.dev/)** via CDN — ícones do sistema
- **Google Fonts (Inter)** — tipografia

Nenhum bundler, transpilador ou processador é necessário para o desenvolvimento — basta um navegador moderno e um servidor estático.

---

## 📜 Histórico de Versões

### [0.1.0] — 2026-05-18

Versão MVP entregue para avaliação. Funcionalidades implementadas:

**Autenticação e Perfis**
- Login com seletor visual de perfil (paciente, cuidador, médico)
- Cadastro com validação de CPF e aceite obrigatório da LGPD
- Recuperação de senha por CPF + data de nascimento
- Timeout automático de sessão após 15 minutos de inatividade
- Controle de acesso por perfil (paciente não acessa área clínica e vice-versa)

**Paciente**
- Dashboard com saudação personalizada, cartão de status adaptativo e gráficos reativos
- Registro de pressão arterial, glicemia e sintomas via bottom-sheet "Novo Registro"
- Gerenciamento de medicamentos (CRUD completo)
- Linha do tempo de histórico com busca textual em tempo real
- Anexar exames/laudos ao histórico
- Geração de relatório clínico em PDF (via `window.print()`)

**Cuidador**
- Vinculação ao paciente principal via tela de Perfil deste
- **Banner laranja persistente** identificando o paciente representado em todas as telas
- Mesmas funcionalidades do paciente, executadas em nome do paciente vinculado
- Proteção contra sequestro de conta (não é possível registrar como cuidador um CPF que já pertence a outro tipo de usuário)

**Médico**
- Painel clínico com sidebar dedicada
- Lista de pacientes com **badges de status** (Estável / Alerta!) considerando últimas medições de pressão e glicemia
- Indicação visual do motivo do alerta (ex.: "PA 172/105 mmHg")
- Ficha clínica, gráficos com eixo adaptativo, prescrição atual, últimos sintomas
- Registro de observação e ajuste de prescrição com persistência em "Histórico de Condutas"

**Experiência e Acessibilidade (RNFs)**
- **Tutorial guiado de primeiro acesso** com spotlight pulsante, setas e contador de passos (tours específicos por perfil)
- Botão "Rever Tutorial de Boas-vindas" no Perfil
- Responsividade mobile-first (testado em viewports de 320 px a 1440 px)
- Toasts não-bloqueantes e confirmações modais (substituindo `alert`/`confirm` nativos)
- Tipografia Inter, paleta de alto contraste, área de toque ≥ 44 px

**Infraestrutura**
- Hospedagem em GitHub Pages com HTTPS automático
- Suporte a execução local via Python `http.server` ou Docker + Nginx

### Próximas versões (backlog)

- Persistência em backend real (substituir `localStorage` por API REST)
- Hash de senhas (atualmente em texto puro — aceitável apenas para MVP acadêmico)
- Notificações push reais (lembretes de medicação fora do navegador)
- Geração nativa de PDF (sem depender de `window.print()`)
- Autorização explícita do paciente para o médico (atualmente o acesso é por perfil, não por consentimento individual)

---

## 📚 Documentação Complementar

| Tema | Documento |
|---|---|
| Contexto, problema e público-alvo | [`docs/context.md`](../docs/context.md) |
| Personas, histórias de usuário, requisitos | [`docs/especification.md`](../docs/especification.md) |
| Wireframes, telas e design system | [`docs/interface.md`](../docs/interface.md) |
| Mapeamento RF → código (artefatos) | [`docs/development.md`](../docs/development.md) |
| Plano de testes e cenários de usabilidade | [`docs/tests.md`](../docs/tests.md) |
| Bibliografia (ABNT) | [`docs/references.md`](../docs/references.md) |
| Especificação detalhada (PRD) | [`PRD.md`](../PRD.md) |
| Roteiro da apresentação | [`presentation/README.md`](../presentation/README.md) |
| Citação acadêmica (CFF) | [`CITATION.cff`](../CITATION.cff) |
