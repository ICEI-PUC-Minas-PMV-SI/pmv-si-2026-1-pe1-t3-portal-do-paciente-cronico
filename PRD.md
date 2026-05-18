# Portal do Paciente Crônico — Product Requirements Document (PRD)

## 0. CREDENCIAIS DE TESTE (PRÉ-CARREGADAS NO LOCALSTORAGE)

> **IMPORTANTE PARA TESTES AUTOMATIZADOS**: O sistema injeta automaticamente os 6 usuários abaixo no `localStorage` na primeira carga de qualquer página. **Não há cadastro prévio necessário**. **NÃO** pedir credenciais ao usuário durante os testes.
>
> **Senha universal de teste: `123`**

| # | Perfil | Nome | CPF (formato exibido) | CPF (puro) | Senha | Vínculo / Quadro Clínico |
|---|---|---|---|---|---|---|
| 1 | **Paciente** | João Silva | `123.456.789-00` | `12345678900` | `123` | Diabetes + Hipertensão (dados ricos pré-populados) |
| 2 | **Paciente** | Maria Souza | `987.654.321-00` | `98765432100` | `123` | Conta limpa (teste de fluxo do zero) |
| 3 | **Paciente** | Carlos Eduardo Pereira | `321.654.987-00` | `32165498700` | `123` | ⚠️ Hipertensão crítica (última PA 172/105 mmHg) |
| 4 | **Paciente** | Ana Beatriz Lima | `789.123.456-00` | `78912345600` | `123` | ⚠️ Diabetes descompensada (últimas glicemias > 180 mg/dL) |
| 5 | **Cuidador** | Alan Cuidador | `477.447.980-23` | `47744798023` | `123` | Linkado a João Silva |
| 6 | **Médico** | Dra. Ana | `111.111.111-11` | `11111111111` | `123` | CRM 12345-MG (vê todos os pacientes, exceto contas de desenvolvimento) |

### Login padrão para teste do fluxo principal de paciente:

```
URL:       http://localhost:8080/index.html
Perfil:    Paciente
CPF:       123.456.789-00
Senha:     123
```

### Login padrão para teste do fluxo de médico:

```
URL:       http://localhost:8080/index.html
Perfil:    Profissional de Saúde
CPF:       111.111.111-11
Senha:     123
```

### Login padrão para teste do fluxo de cuidador:

```
URL:       http://localhost:8080/index.html
Perfil:    Cuidador
CPF:       477.447.980-23
Senha:     123
```

### Matriz de cenários de autenticação (esperado):

| # | Cenário | CPF | Senha | Perfil selecionado | Resultado esperado |
|---|---|---|---|---|---|
| A | Médico legítimo | `111.111.111-11` | `123` | Profissional de Saúde | ✅ Entra como Dra. Ana → `clinical-dashboard.html` |
| B | Cuidador tenta entrar como médico | `477.447.980-23` | `123` | Profissional de Saúde | ❌ Alert "perfil errado" |
| C | Paciente tenta entrar como médico | `123.456.789-00` | `123` | Profissional de Saúde | ❌ Alert "perfil errado" |
| D | Cuidador legítimo | `477.447.980-23` | `123` | Cuidador | ✅ Entra como cuidador → `dashboard.html` |
| E | Paciente legítimo | `123.456.789-00` | `123` | Paciente | ✅ Entra como João → `dashboard.html` |
| F | CPF inexistente como médico | `999.999.999-99` | `qq` | Profissional de Saúde | ❌ Alert "Cadastro não encontrado" |
| G | Senha errada | `123.456.789-00` | `senhaerrada` | Paciente | ❌ Alert "senha incorreta" |
| H | Acesso direto sem login | abre `/pages/dashboard.html` direto | — | — | ❌ Redireciona para `/index.html` |
| I | Acesso direto sem login (médico) | abre `/pages/clinical-dashboard.html` direto | — | — | ❌ Redireciona para `/index.html` |
| J | Paciente tenta acessar área clínica | logado como paciente, abre `/pages/clinical-dashboard.html` | — | — | ❌ Redireciona para `/pages/dashboard.html` |
| K | Médico tenta acessar área do paciente | logado como médico, abre `/pages/dashboard.html` | — | — | ❌ Redireciona para `/pages/clinical-dashboard.html` |

### Seletores HTML chave para automação:

| Página | Elemento | Seletor |
|---|---|---|
| Login | Select de perfil | `#login-profile` (valores: `paciente`, `cuidador`, `medico`) |
| Login | Input CPF/email | `#cpf` |
| Login | Input senha | `#password` |
| Login | Botão entrar | `#btn-login` |
| Cadastro | Radio de perfil | `input[name="reg-profile"][value="paciente|cuidador|medico"]` |
| Cadastro | Nome | `#reg-name` |
| Cadastro | CPF | `#reg-cpf` |
| Cadastro | Senha | `#reg-password` |
| Cadastro | LGPD checkbox | `#reg-lgpd` |
| Cadastro | Botão | `#btn-register` |
| Dashboard | FAB Novo Registro | `#fab-add` |
| Dashboard | Salvar registro | `#btn-save-record` |
| Dashboard | Inputs pressão | `#val-sys`, `#val-dia` |
| Dashboard | Input glicemia | `#val-glicose` |
| Dashboard | Textarea sintoma | `#val-sintoma-desc` |
| Médico | Busca paciente | `#patient-search` |
| Médico | Salvar prontuário | `#btn-save-observation` |
| Médico | Logout | `#btn-logout-doc` |
| Perfil | Logout | `#btn-logout-profile` |

---

## 1. Visão Geral

Aplicação web front-end (HTML/CSS/JavaScript puro, sem framework, sem backend real) para acompanhamento de pacientes com doenças crônicas (Diabetes, Hipertensão, Asma). A persistência é simulada via `localStorage` do navegador, agindo como banco de dados local.

- **Stack**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Bibliotecas externas (CDN)**: Lucide Icons, Chart.js, Google Fonts (Inter)
- **Servidor**: Nginx (Docker), porta `8080` (ou Python `http.server` para desenvolvimento)
- **URL base de teste local**: `http://localhost:8080/index.html`
- **URL pública (GitHub Pages)**: <https://icei-puc-minas-pmv-si.github.io/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/src/>
- **Idioma**: Português (Brasil)
- **Recursos diferenciados**: tutorial guiado de primeiro acesso (RNF-11), banner de identificação para cuidadores, alertas visuais para pacientes em quadro crítico, controle de acesso por perfil

## 2. Perfis de Usuário

A aplicação suporta três perfis distintos, selecionáveis no login:

| Perfil | Descrição | Tela inicial após login |
|---|---|---|
| **Paciente** | Usuário principal, registra suas próprias aferições | `pages/dashboard.html` |
| **Cuidador** | Familiar/responsável vinculado a um paciente, edita em nome dele | `pages/dashboard.html` (do paciente vinculado) |
| **Médico** | Visualiza pacientes e registra prontuário | `pages/clinical-dashboard.html` |

## 3. Contas de Teste (já populadas em `localStorage` na inicialização)

| Perfil | CPF (com máscara) | CPF (sem máscara) | Senha | Nome | Observação |
|---|---|---|---|---|---|
| Paciente | `123.456.789-00` | `12345678900` | `123` | João Silva | Diabetes + Hipertensão, dados ricos pré-populados |
| Paciente | `987.654.321-00` | `98765432100` | `123` | Maria Souza | Conta limpa (sem dados) |
| Paciente | `321.654.987-00` | `32165498700` | `123` | Carlos Eduardo Pereira | ⚠️ Hipertensão crítica (PA 172/105 mmHg) |
| Paciente | `789.123.456-00` | `78912345600` | `123` | Ana Beatriz Lima | ⚠️ Diabetes descompensada (240 mg/dL) |
| Cuidador | `477.447.980-23` | `47744798023` | `123` | Alan Cuidador | Vinculado a João Silva |
| Médico | `111.111.111-11` | `11111111111` | `123` | Dra. Ana | CRM 12345-MG |

**Conta primária para testes automatizados**: CPF `123.456.789-00`, senha `123`, perfil **Paciente**.

**Pacientes recomendados para demonstração de alertas**: Carlos Eduardo Pereira (alerta de pressão) e Ana Beatriz Lima (alerta de glicemia) aparecem com badge vermelho **"Alerta!"** no painel da Dra. Ana e com cartão de status vermelho na própria dashboard deles.

## 4. Fluxos Funcionais

### 4.1 Login (`/index.html`)

Campos:
- Select `#login-profile` com opções: `paciente`, `cuidador`, `medico`
- Input `#cpf` (CPF ou e-mail)
- Input `#password`
- Botão `#btn-login` ("Entrar")
- Link "Esqueci minha senha" (`onclick="recoverPassword(event)"`)
- Botão "Ainda não tem conta? Cadastre-se" → vai para `register.html`

Regras:
- Para **todos** os perfis (incluindo médico), o login exige CPF + senha válidos vinculados ao perfil escolhido. Não há bypass.
- Se o perfil selecionado não bater com o cadastrado para o CPF, o login deve falhar com a mensagem: *"Cadastro não encontrado, senha incorreta ou perfil selecionado errado..."*
- A máscara de CPF é aplicada automaticamente ao digitar números puros (`12345678900` → `123.456.789-00`). E-mails ficam intactos.

### 4.2 Cadastro (`/register.html`)

- Selector de perfil em rádio: Paciente / Cuidador / Médico
- Campos comuns: Nome, CPF, Senha
- Específicos do paciente: Data de nascimento, Sexo, Tipo sanguíneo, Alergias, Doenças crônicas (checkboxes), termo LGPD
- Específico do médico: CRM
- Cuidador: tem fluxo alternativo (já cadastrado via tela de perfil pelo paciente; só faz login)

Regras:
- CPF deve ter exatamente **11 dígitos numéricos** após remoção da máscara
- Senha mínima: **4 caracteres**
- Não pode haver dois usuários com o mesmo CPF (validação obrigatória)
- Termo LGPD deve estar marcado
- Após cadastrar paciente/médico, redireciona automaticamente para o respectivo dashboard

### 4.3 Dashboard do Paciente (`/pages/dashboard.html`)

**Cabeçalho** com saudação personalizada ("Olá, João"), data de hoje e avatar clicável (vai para o Perfil). Para **cuidadores logados**, a saudação adiciona a linha *"Acompanhando \<Nome do Paciente\>"* em laranja.

**Cartão de Status (`#status-card`)** — adaptativo conforme as últimas medições:
- Quando há medições fora do alvo (PA ≥ 140/90 mmHg **ou** glicemia > 180 / < 70 mg/dL), o cartão muda para fundo vermelho com título *"Atenção!"* e descrição do motivo (ex.: *"Pressão 172/105 mmHg fora do alvo"*).
- Quando há medições recentes em dia, exibe *"Muito bem! · Medições em dia."* em azul.
- Quando ainda não há nenhuma medição, exibe *"Comece agora · Registre sua primeira medição."*.

**Próximos Remédios (Hoje)**: lista os medicamentos cadastrados com botão de "check" que persiste o estado de "tomado" por dia (via chave `ppc_meds_taken_YYYY-MM-DD` no localStorage). Para cuidadores, o título da seção muda para *"Remédios de \<Nome do Paciente\>"*.

**Gráfico de Glicemia** (Chart.js): linha temporal das medições. Usa `suggestedMin/Max` para expandir o eixo Y automaticamente em picos críticos.
**Gráfico de Pressão Arterial** (Chart.js): duas linhas (sistólica em vermelho, diastólica em azul-claro).

**Botão FAB Novo Registro** (`#fab-add`): em formato de **pílula** com ícone `+` e texto *"Novo Registro"* (substituiu o antigo "+" redondo). Abre bottom-sheet com 3 abas:

- **Pressão**: dois *value cards* lado a lado (Sistólica e Diastólica) com separador `/` visual, números grandes e indicadores coloridos (vermelho/azul). Faixa informativa azul com referência clínica: *"Ideal: até 120/80 mmHg · Atenção: a partir de 140/90 mmHg."*
- **Glicose**: *value card* único com número grande em azul. Faixa de referência: *"Jejum: 70-99 · Pós-refeição: até 140 · Alerta: acima de 180 mg/dL."*
- **Sintomas**: 4 chips selecionáveis em grade 2×2 (Tontura, Dor de cabeça, Cansaço, Falta de ar) + textarea livre.

Em desktop, o bottom-sheet vira modal centralizada com largura máxima de 520 px.

Botão "Salvar Registro":
- Pressão: exige sys e dia preenchidos. Após salvar, **gráfico de pressão atualiza automaticamente** sem reload.
- Glicose: exige valor. Após salvar, **gráfico de glicemia atualiza automaticamente** sem reload.
- Sintomas: exige ao menos um chip ou descrição. Após salvar, registro aparece no Histórico.

**Bottom-nav**: Início · Histórico · Remédios · Perfil (fixa na parte inferior).

### 4.4 Medicamentos (`/pages/medications.html`)

- Botão "Novo Medicamento" abre formulário inline
- Campos: Nome, Dosagem, Primeira dose (time), Frequência (texto livre)
- Salvar adiciona à lista; Editar pré-preenche o form e atualiza; Excluir pede confirmação
- Lista mostra: nome, dosagem (lê `dose` ou `dosage` para retrocompatibilidade), horário inicial, frequência

### 4.5 Histórico (`/pages/history.html`)

Linha do tempo agregando: pressões, glicemias, sintomas, exames.

- **Busca textual** em tempo real (input `#hist-search`) filtra por título/data/conteúdo
- **Botão filtro** abre chips: Todos / Pressão / Glicemia / Sintomas / Exames
- Botão "Anexar Exame/Laudo" abre form (Título + Nome do arquivo simulado) e salva no histórico

### 4.6 Perfil (`/pages/profile.html`)

- Avatar, nome, CPF do usuário logado
- **Accordion "Dados Clínicos Básicos"**: idade calculada da data de nascimento, sexo, tipo sanguíneo, alergias, condições crônicas. Botão "Editar Dados" abre form e salva no banco.
- **Accordion "Meus Cuidadores"** (oculto para perfil cuidador):
  - Lista cuidadores vinculados
  - Botão "Adicionar Cuidador" abre form com Nome, CPF (com máscara), senha
  - Validação: CPF de 11 dígitos
  - **Proteção anti-sequestro**: o sistema **bloqueia** o cadastro quando o CPF informado já pertence a outro tipo de usuário (médico ou paciente) ou já é cuidador vinculado a outro paciente. Mensagens estruturadas: `CPF_OWNED`, `CG_LINKED_ELSEWHERE`.
  - Editar / Excluir cuidador (com confirmação modal)
- Botão **"Gerar Relatório Clínico PDF"** abre `report.html` em nova aba (versão imprimível)
- Botão **"Rever Tutorial de Boas-vindas"**: limpa as flags `ppc_onboarding_done_*` do usuário atual e redireciona para a dashboard, disparando o tour guiado novamente (ver Seção 4.11)
- Botão **"Sair da Conta"**: confirma e limpa `ppc_currentUser` antes de redirecionar para login

### 4.7 Painel Médico (`/pages/clinical-dashboard.html`)

- Sidebar mostra **médico real logado** (nome + CRM)
- Busca de pacientes por nome (`#patient-search`) — filtra a lista em tempo real
- **Lista de pacientes ativos** (cards) com:
  - Nome e CPF do paciente
  - **Badge de status** verde *"Estável"* ou vermelho *"Alerta!"* — calculado a partir das **últimas medições** de pressão e glicemia (PA ≥ 140/90 ou glicemia > 180 / < 70 = alerta)
  - Quando há alerta, uma linha vermelha abaixo do CPF descreve **o motivo** (ex.: *"⚠️ PA 172/105 mmHg"* ou *"⚠️ Glicemia 240 mg/dL"*)
  - Borda lateral esquerda colorida reforça o status (verde/vermelho)
  - Clicar no card seleciona o paciente
- Ao selecionar paciente, abre painel de detalhe:
  - **Ficha Clínica** (idade, sexo, tipo sanguíneo, alergias, condições)
  - **Gráficos** com botões "Glicemia" / "Pressão" para alternar (eixo Y expande com `suggestedMin/Max` para acomodar picos críticos)
  - **Prescrição Atual** (medicamentos do paciente)
  - **Últimos Sintomas** (top 3 mais recentes)
  - **Prontuário e Conduta**: textareas para Observação e Ajuste de Prescrição
    - Botão "Salvar e Notificar o Paciente" persiste em `ppc_data[patientId].observations[]` e exibe no "Histórico de Condutas"
- Botão "Sair" na sidebar limpa sessão antes de redirecionar

### 4.8 Recuperação de Senha

Link "Esqueci minha senha" no login → prompts JS:
1. Pede CPF
2. Se encontrar, pede nova senha (mín. 4 caracteres)
3. Atualiza senha do usuário no localStorage

CPF deve ser comparado normalizado (sem pontuação).

### 4.9 Inatividade (Segurança)

- Em qualquer página interna, após **15 minutos** sem interação (mouse, teclado, click, scroll, touch), a sessão é encerrada e o usuário é redirecionado para login

### 4.10 Banner do Cuidador

Quando o usuário logado tem perfil `cuidador`, o sistema injeta automaticamente um **banner laranja** no topo de **todas as páginas internas** (Dashboard, Histórico, Remédios, Perfil) identificando o paciente representado:

- **Avatar circular** azul com a inicial do paciente
- Tag *"Você está acompanhando"* em laranja
- **Nome do paciente em destaque** (negrito, fonte grande)
- Linha *"Cuidador logado: \<nome do cuidador\>"* abaixo

Adicionalmente, na dashboard:
- A saudação muda de *"Olá, Alan"* para *"Olá, Alan · Acompanhando \<Paciente\>"*
- O título da seção de remédios passa de *"Meus Remédios"* para *"Remédios de \<Paciente\>"*

Implementação em `src/js/caregiver-banner.js`. O banner não aparece para perfis `paciente` ou `medico`.

### 4.11 Tutorial Guiado de Primeiro Acesso (RNF-11)

No primeiro acesso a cada tela interna, o sistema dispara automaticamente um **tour guiado** com:

- **Overlay escuro** com *spotlight pulsante azul* destacando o elemento explicado
- **Tooltip com seta** apontando para o alvo, com título + descrição contextual
- **Contador** "passo X de Y", bolinhas de progresso e botões **Voltar / Próximo / Pular**
- Suporte a teclado: `←` `→` para navegar, `Esc` para sair
- **Tours específicos por perfil e por tela** (dashboard, histórico, remédios, perfil, painel clínico)
- Cada tela é marcada como vista uma única vez por usuário (`ppc_onboarding_done_<userId>_<screenKey>` no localStorage)

O usuário pode **rever o tutorial a qualquer momento** pelo botão *"Rever Tutorial de Boas-vindas"* no Perfil (Seção 4.6).

Implementação em `src/js/onboarding.js` e estilos em `src/css/onboarding.css`.

### 4.12 Controle de Acesso por Perfil

Além da proteção contra acesso sem login (Seção 4.9), o sistema impõe **roteamento por perfil**:

- Se um usuário com perfil `paciente` ou `cuidador` tentar acessar `/pages/clinical-dashboard.html`, é redirecionado para `/pages/dashboard.html`.
- Se um usuário com perfil `medico` tentar acessar `/pages/dashboard.html` (ou qualquer página da área do paciente), é redirecionado para `/pages/clinical-dashboard.html`.

Implementação em `src/js/security.js`, executada sincronamente antes do DOMContentLoaded de cada página.

## 5. Modelo de Dados (localStorage)

```
ppc_users                       : Array<User>
ppc_currentUser                 : User (sessão ativa)
ppc_data                        : { [patientId]: { medications, vitals, observations } }
ppc_meds_taken_YYYY-MM-DD       : Array<medId>     (estado diário de "tomei o remédio")
ppc_onboarding_done_<id>_<tela> : '1'              (flag de tutorial visto por tela e por usuário)
```

`User`:
```js
{ id, name, cpf, password, profile: 'paciente'|'cuidador'|'medico',
  birthDate?, sex?, bloodType?, allergies?, conditions?: string[],
  crm?, linkedPatientId? }
```

`vitals` em `ppc_data[patientId]`:
```js
{
  pressure:  [{ date, time, sys, dia, timestamp }],
  glycemia:  [{ date, time, value, timestamp }],
  symptoms:  [{ date, time, description, timestamp }],
  history:   [{ date, time, title, fileLabel, timestamp }]
}
```

`observations` em `ppc_data[patientId]` (registradas pelo médico):
```js
[{ timestamp, date, time, text, prescription }]
```

> O `store.js` faz *housekeeping* automático das chaves `ppc_meds_taken_*` com mais de 7 dias.

## 6. Critérios de Aceitação Globais

1. **Segurança de autenticação**: nenhum perfil pode logar sem CPF + senha válidos. Não pode haver bypass de médico.
2. **Acesso a páginas internas**: tentar abrir `/pages/*.html` sem estar logado deve redirecionar imediatamente para `/index.html`.
3. **Controle de acesso por perfil**: paciente/cuidador não pode acessar a área clínica; médico não pode acessar a área do paciente (redirecionamento automático).
4. **Sair da Conta**: ao clicar em logout (em qualquer perfil), a sessão deve ser limpa de tal forma que voltar (browser back) leve de volta ao login.
5. **CPF**: máscara automática, validação de 11 dígitos, prevenção de duplicatas no cadastro.
6. **Reatividade dos gráficos**: ao adicionar uma medição (pressão ou glicemia), o gráfico correspondente deve atualizar **sem reload manual da página**.
7. **Botão check de remédio**: estado de "tomado" deve persistir após reload da página (no mesmo dia).
8. **Cadastro de cuidador via perfil**: o cuidador pode então fazer login e visualiza dashboard do paciente vinculado (não o seu próprio).
9. **Proteção anti-sequestro de cadastro de cuidador**: não deve ser possível "transformar" uma conta de paciente ou médico em cuidador informando o CPF dela no formulário de Adicionar Cuidador — o sistema deve rejeitar com mensagem clara.
10. **Banner do cuidador**: ao logar como cuidador, o banner laranja com o nome do paciente acompanhado deve aparecer em todas as páginas internas.
11. **Médico só vê pacientes**: ao selecionar um paciente, mostra dados clínicos, gráficos, medicações e sintomas reais daquele paciente.
12. **Alerta no painel do médico**: pacientes com última medição de pressão ≥ 140/90 mmHg ou glicemia > 180 / < 70 mg/dL devem aparecer com badge vermelho *"Alerta!"* e descrição do motivo abaixo do CPF.
13. **Prontuário do médico**: salvar conduta deve persistir e aparecer no "Histórico de Condutas" sem reload.
14. **Busca/filtro do histórico**: filtros e busca textual devem afetar a lista em tempo real.
15. **Tutorial guiado**: no primeiro acesso a cada tela, o tour com spotlight e tooltip deve disparar automaticamente. O botão *"Rever Tutorial de Boas-vindas"* no Perfil deve permitir refazê-lo.

## 7. Fora de Escopo (não testar)

- Integração com banco real
- Backend / API
- Notificações push reais (apenas alert simulado)
- Geração real de PDF (a tela `report.html` é HTML imprimível)
- Validação de algoritmo de CPF (apenas formato 11 dígitos)
