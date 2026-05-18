# Programação de Funcionalidades

Este documento relaciona cada **Requisito Funcional (RF)** e **Requisito Não Funcional (RNF)** definidos na [Especificação do Projeto](especification.md) aos artefatos de código que os implementam (arquivos HTML, CSS e JavaScript), descrevendo também as estruturas de dados utilizadas e as instruções para verificação no ambiente de hospedagem.

## Metodologia de Trabalho

O desenvolvimento foi conduzido de forma **colaborativa**, com reuniões periódicas de planejamento e revisão por pares (*pair review*). Embora cada artefato seja entregue como produção coletiva do grupo, todos os integrantes participaram do levantamento de requisitos, do projeto da solução, da codificação e dos testes. Por isso, os cinco integrantes constam como **responsáveis** por cada requisito atendido.

**Equipe responsável:**

- Alan Alencar da Silva
- Alex Gabriel Rocha Santos
- Bernardo Santos Torres
- Marcela Fernandes de Castro Melo
- Sara Zschaber de Souza

## Arquitetura e Stack

| Camada | Tecnologia |
|---|---|
| Estrutura | HTML5 |
| Estilo | CSS3 (variáveis customizadas, mobile-first) |
| Comportamento | JavaScript ES6+ (Vanilla, sem framework) |
| Gráficos | [Chart.js](https://www.chartjs.org/) (via CDN) |
| Ícones | [Lucide Icons](https://lucide.dev/) (via CDN) |
| Persistência | `localStorage` do navegador |
| Hospedagem | GitHub Pages (HTTPS) |
| Containerização (opcional) | Docker + Nginx |

---

## Requisitos Funcionais Atendidos

| ID | Descrição | Responsáveis | Artefato(s) — onde foi implementado |
|---|---|---|---|
| **RF-01** | Autenticação e Cadastro de pacientes, cuidadores e profissionais de saúde | Alan, Alex, Bernardo, Marcela, Sara | [`src/index.html`](../src/index.html) (tela de login com seletor de perfil) · [`src/register.html`](../src/register.html) (tela de cadastro) · [`src/js/auth.js`](../src/js/auth.js) (fluxo de login/cadastro/recuperação) · [`src/js/store.js`](../src/js/store.js) (`registerUser`, `loginUserByCpf`, `loginUser`, `logout`) |
| **RF-02** | Cadastro e edição do Perfil de Saúde do paciente | Alan, Alex, Bernardo, Marcela, Sara | [`src/pages/profile.html`](../src/pages/profile.html) (accordion "Dados Clínicos Básicos") · [`src/js/store.js`](../src/js/store.js) (`updatePatientBasicData`) |
| **RF-03** | Registro de medicamentos contínuos (dose, horário, frequência) | Alan, Alex, Bernardo, Marcela, Sara | [`src/pages/medications.html`](../src/pages/medications.html) (CRUD completo) · [`src/js/store.js`](../src/js/store.js) (`addMedication`, `updateMedication`, `deleteMedication`, `getMedications`) |
| **RF-04** | Sistema de alertas visuais para horários de medicação e medições fora do alvo | Alan, Alex, Bernardo, Marcela, Sara | [`src/pages/dashboard.html`](../src/pages/dashboard.html) (cartão `#status-card` muda para vermelho quando PA ≥ 140/90 mmHg ou glicemia > 180 mg/dL) · [`src/pages/clinical-dashboard.html`](../src/pages/clinical-dashboard.html) (badge "Alerta!" nos cards de paciente) |
| **RF-05** | Registro rápido de medições diárias (pressão arterial e glicemia) | Alan, Alex, Bernardo, Marcela, Sara | [`src/pages/dashboard.html`](../src/pages/dashboard.html) (bottom-sheet "Novo Registro" abas Pressão e Glicose) · [`src/js/modal.js`](../src/js/modal.js) (controle do bottom-sheet) · [`src/js/store.js`](../src/js/store.js) (`addPressure`, `addGlycemia`) |
| **RF-06** | Registro de sintomas diários (descrição e data) | Alan, Alex, Bernardo, Marcela, Sara | [`src/pages/dashboard.html`](../src/pages/dashboard.html) (aba "Sintomas" com chips selecionáveis + textarea livre) · [`src/js/store.js`](../src/js/store.js) (`addSymptom`) |
| **RF-07** | Cadastro de exames e consultas com anexos simulados | Alan, Alex, Bernardo, Marcela, Sara | [`src/pages/history.html`](../src/pages/history.html) (botão "Anexar Exame/Laudo" e timeline consolidada) · [`src/js/store.js`](../src/js/store.js) (`addHistoryRecord`) |
| **RF-08** | Dashboard do paciente com gráficos de evolução dos últimos 30 dias | Alan, Alex, Bernardo, Marcela, Sara | [`src/pages/dashboard.html`](../src/pages/dashboard.html) (canvases `#glycemiaChart` e `#pressureChart` renderizados via Chart.js, atualizados em tempo real após cada novo registro) |
| **RF-09** | Exportação do histórico de saúde em PDF | Alan, Alex, Bernardo, Marcela, Sara | [`src/pages/report.html`](../src/pages/report.html) (versão imprimível que dispara `window.print()`) · botão "Gerar Relatório Clínico PDF" em [`src/pages/profile.html`](../src/pages/profile.html) |
| **RF-10** | Busca e filtro de registros antigos | Alan, Alex, Bernardo, Marcela, Sara | [`src/pages/history.html`](../src/pages/history.html) (campo `#hist-search` filtra a timeline em tempo real) · [`src/pages/clinical-dashboard.html`](../src/pages/clinical-dashboard.html) (campo `#patient-search` filtra a lista de pacientes para o médico) |
| **RF-11** | Perfil Cuidador (cadastro pelo paciente e acesso em nome dele) | Alan, Alex, Bernardo, Marcela, Sara | [`src/pages/profile.html`](../src/pages/profile.html) (accordion "Meus Cuidadores") · [`src/js/caregiver-banner.js`](../src/js/caregiver-banner.js) (banner laranja identificando o paciente representado em todas as telas) · [`src/js/store.js`](../src/js/store.js) (`registerCaregiver`, `getCaregivers`, `deleteCaregiver`, `getActivePatientId` para alternar contexto) |
| **RF-12** | Acesso autorizado do médico ao perfil do paciente | Alan, Alex, Bernardo, Marcela, Sara | [`src/js/auth.js`](../src/js/auth.js) (login por perfil com validação cruzada) · [`src/js/security.js`](../src/js/security.js) (controle de acesso por perfil: médicos só acessam área clínica, pacientes/cuidadores só acessam área do paciente) |
| **RF-13** | Visualização Clínica (Dashboard do Médico) com linha do tempo consolidada | Alan, Alex, Bernardo, Marcela, Sara | [`src/pages/clinical-dashboard.html`](../src/pages/clinical-dashboard.html) (lista de pacientes ativos, ficha clínica, gráficos, sintomas recentes) · [`src/js/store.js`](../src/js/store.js) (`getAllPatients`, `getPatientData`) |
| **RF-14** | Registro de observações clínicas e prescrições pelo médico | Alan, Alex, Bernardo, Marcela, Sara | [`src/pages/clinical-dashboard.html`](../src/pages/clinical-dashboard.html) (seção "Prontuário e Conduta" com textareas de Observação e Ajuste de Prescrição) · [`src/js/store.js`](../src/js/store.js) (`saveObservation`, `getObservations`) |

---

## Requisitos Não Funcionais Atendidos

| ID | Descrição | Responsáveis | Como foi atendido |
|---|---|---|---|
| **RNF-01** | Acessibilidade visual (botões grandes, tipografia legível, alto contraste) | Alan, Alex, Bernardo, Marcela, Sara | [`src/css/variables.css`](../src/css/variables.css) define tipografia (Inter), escala de pesos e paleta de alto contraste · [`src/css/components.css`](../src/css/components.css) usa botões com área de toque ≥ 44 px e ícones de 16-24 px |
| **RNF-02** | Responsividade mobile-first (smartphone, tablet, desktop) | Alan, Alex, Bernardo, Marcela, Sara | `@media (min-width: 600px)` e `768px` em [`components.css`](../src/css/components.css), [`onboarding.css`](../src/css/onboarding.css) e nos `<style>` inline de cada página · gráficos lado a lado em desktop, empilhados em mobile |
| **RNF-03** | Segurança e Privacidade (aceite LGPD obrigatório) | Alan, Alex, Bernardo, Marcela, Sara | [`src/register.html`](../src/register.html) (checkbox `#reg-lgpd`) · [`src/js/auth.js`](../src/js/auth.js) bloqueia cadastro sem aceite |
| **RNF-04** | Eficiência de uso (registro diário em ≤ 3 cliques) | Alan, Alex, Bernardo, Marcela, Sara | Botão FAB "Novo Registro" sempre visível em [`dashboard.html`](../src/pages/dashboard.html) → 1 clique abre o bottom-sheet → escolha de aba → clique em "Salvar" = 3 cliques |
| **RNF-05** | Desempenho (carregamento < 3s em 3G/4G) | Alan, Alex, Bernardo, Marcela, Sara | Vanilla JS (sem framework, sem bundler) · CDN para Chart.js e Lucide · CSS único por contexto · imagens otimizadas · cache-busting via query string `?v=` |
| **RNF-06** | Comunicação criptografada (HTTPS) | Alan, Alex, Bernardo, Marcela, Sara | Hospedagem em **GitHub Pages**, que serve o domínio `*.github.io` sempre por HTTPS |
| **RNF-07** | Logout automático após 15 minutos de inatividade | Alan, Alex, Bernardo, Marcela, Sara | [`src/js/security.js`](../src/js/security.js) (timer de inatividade reseta em `mousemove`, `keydown`, `click`, `scroll`, `touchstart`; expira em 15 min) |
| **RNF-08** | Tratamento de erros amigável (sem jargão técnico) | Alan, Alex, Bernardo, Marcela, Sara | [`src/js/toast.js`](../src/js/toast.js) (sistema de toasts não-bloqueantes em português, coloridos por tipo: sucesso / erro / info) · `showConfirm` para confirmações modais |
| **RNF-09** | Prevenção de perda de dados em queda de conexão | Alan, Alex, Bernardo, Marcela, Sara | Todos os dados ficam em `localStorage`, persistindo entre sessões e funcionando offline; o app é totalmente client-side |
| **RNF-10** | Compatibilidade com Chrome, Safari, Firefox e Edge | Alan, Alex, Bernardo, Marcela, Sara | Uso exclusivo de Web Standards (HTML5, CSS3 modernos, ES6+) sem APIs proprietárias; testes manuais em todos os principais navegadores |
| **RNF-11** | Tutorial de primeiro acesso (onboarding) | Alan, Alex, Bernardo, Marcela, Sara | [`src/js/onboarding.js`](../src/js/onboarding.js) implementa tour guiado com *spotlight*, setas, contador de passos e botões Voltar/Próximo/Pular · [`src/css/onboarding.css`](../src/css/onboarding.css) traz os estilos · tours específicos por perfil (paciente, cuidador, médico) · botão "Rever Tutorial" em [`profile.html`](../src/pages/profile.html) |
| **RNF-12** | Termos em linguagem simples (sem juridiquês) | Alan, Alex, Bernardo, Marcela, Sara | Textos do aceite LGPD em [`register.html`](../src/register.html) escritos em português direto, com referência ao propósito (uso dos dados em saúde) sem termos jurídicos rebuscados |

---

## Estruturas de Dados

Como o sistema é puramente front-end e usa o `localStorage` do navegador como camada de persistência, os dados são armazenados como pares chave-valor em formato JSON. Abaixo, a estrutura completa das chaves utilizadas:

### 1. `ppc_users` — Array de usuários cadastrados

```js
[
  {
    id: 101,                     // identificador único (Number)
    name: 'João Silva',          // nome completo
    cpf: '123.456.789-00',       // CPF com máscara
    password: '123',             // senha em texto puro (MVP — sem hash)
    profile: 'paciente',         // 'paciente' | 'cuidador' | 'medico'
    birthDate: '1960-05-15',     // ISO date (opcional)
    sex: 'M',                    // 'M' | 'F' | 'O' (opcional)
    bloodType: 'A+',             // tipo sanguíneo (opcional)
    allergies: 'Nenhuma',        // string livre (opcional)
    conditions: ['Diabetes',     // array de condições crônicas
                 'Hipertensão'],
    crm: '12345-MG',             // CRM do médico (opcional, só perfil 'medico')
    linkedPatientId: 101         // ID do paciente vinculado (só perfil 'cuidador')
  }
]
```

### 2. `ppc_currentUser` — Sessão ativa

Mesmo formato de `User` acima — guarda apenas o usuário atualmente logado. É a chave consultada pelo `security.js` para autorização.

### 3. `ppc_data` — Dados clínicos indexados por ID do paciente

```js
{
  101: {  // ID do paciente
    medications: [
      { id, name, frequency, firstDose, dosage, warning }
    ],
    vitals: {
      pressure:  [{ date, time, sys, dia, timestamp }],
      glycemia:  [{ date, time, value, timestamp }],
      symptoms:  [{ date, time, description, timestamp }],
      history:   [{ date, time, title, fileLabel, timestamp }]
    },
    observations: [  // condutas registradas pelo médico
      { date, time, text, prescription, timestamp }
    ]
  }
}
```

### 4. `ppc_meds_taken_YYYY-MM-DD` — Controle diário de medicamentos tomados

```js
[1, 2, 3]  // array de IDs de medicamentos que o paciente marcou como "tomado" no dia
```

Cada dia gera uma chave nova. O `store.js` faz *housekeeping* removendo chaves com mais de 7 dias para não inflar o `localStorage`.

---

## Instruções de Acesso e Verificação

### Ambiente de Hospedagem

O sistema está publicado em **GitHub Pages** e pode ser acessado em:

🔗 **https://icei-puc-minas-pmv-si.github.io/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/src/**

### Execução Local

Existem duas formas de rodar o projeto localmente:

**Opção 1 — Servidor estático simples:**
```bash
cd src
python3 -m http.server 8080
# abrir http://localhost:8080
```

**Opção 2 — Via Docker (Nginx):**
```bash
docker compose up
# abrir http://localhost:8080
```

### Contas de Teste (pré-carregadas no `localStorage`)

Senha universal de teste: **`123`**

| Perfil | Nome | CPF | Senha |
|---|---|---|---|
| Paciente | João Silva | `123.456.789-00` | `123` |
| Paciente | Maria Souza | `987.654.321-00` | `123` |
| Paciente (crítico) | Carlos Eduardo Pereira | `321.654.987-00` | `123` |
| Paciente (crítico) | Ana Beatriz Lima | `789.123.456-00` | `123` |
| Cuidador | Alan Cuidador (vinculado a João) | `477.447.980-23` | `123` |
| Médico | Dra. Ana — CRM 12345-MG | `111.111.111-11` | `123` |

### Roteiro Rápido para Verificação dos Requisitos

1. **Acessar a URL pública** → tela de login carrega
2. **RF-01:** logar como Paciente com `123.456.789-00` / `123` → dashboard do João abre
3. **RF-08:** observar os dois gráficos (Pressão e Glicemia) já populados
4. **RF-05:** clicar no botão **"Novo Registro"** → escolher aba **Pressão** → preencher 150/95 → Salvar → gráfico atualiza imediatamente
5. **RF-04:** o `status-card` no topo passa a exibir alerta vermelho com "PA fora do alvo"
6. **RF-03:** ir em **Remédios** na barra inferior → cadastrar / editar / excluir
7. **RF-07 e RF-10:** ir em **Histórico** → ver timeline → testar busca textual
8. **RF-09:** ir em **Perfil** → "Gerar Relatório Clínico PDF" → abre janela de impressão
9. **RF-11:** logar como Cuidador (`477.447.980-23`) → banner laranja "Você está acompanhando João Silva" aparece no topo de todas as telas
10. **RF-12, RF-13, RF-14:** logar como Médico (`111.111.111-11`) → painel clínico abre → selecionar Carlos Eduardo Pereira → ver alerta de hipertensão → preencher conduta e salvar
11. **RNF-11:** abrir DevTools → Application → Local Storage → apagar chaves `ppc_onboarding_done_*` → recarregar → tutorial guiado dispara

---

## Próximos Passos (Backlog)

- Persistência em backend real (substituir `localStorage` por API REST)
- Hash das senhas (atualmente em texto puro, aceitável apenas para MVP)
- Geração nativa de PDF (sem depender de `window.print()`)
- Notificações push reais (lembretes de medicação fora do navegador)
- Autorização explícita do paciente para o médico (RF-12 atualmente é por perfil, não por consentimento individual)
