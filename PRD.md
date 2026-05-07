# Portal do Paciente Crônico — Product Requirements Document (PRD)

## 0. CREDENCIAIS DE TESTE (PRÉ-CARREGADAS NO LOCALSTORAGE)

> **IMPORTANTE PARA TESTES AUTOMATIZADOS**: O sistema injeta automaticamente os 4 usuários abaixo no `localStorage` na primeira carga de qualquer página. **Não há cadastro prévio necessário**. **NÃO** pedir credenciais ao usuário durante os testes.
>
> **Senha universal de teste: `123`**

| # | Perfil | Nome | CPF (formato exibido) | CPF (puro) | Senha | Vínculo |
|---|---|---|---|---|---|---|
| 1 | **Paciente** | João Silva | `123.456.789-00` | `12345678900` | `123` | — |
| 2 | **Paciente** | Maria Souza | `987.654.321-00` | `98765432100` | `123` | — |
| 3 | **Cuidador** | Alan Cuidador | `477.447.980-23` | `47744798023` | `123` | Linkado a João Silva |
| 4 | **Médico** | Dra. Ana | `111.111.111-11` | `11111111111` | `123` | CRM 12345-MG |

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
- **Bibliotecas externas (CDN)**: Lucide Icons, Chart.js
- **Servidor**: Nginx (Docker), porta `8080`
- **URL base de teste**: `http://localhost:8080/index.html`
- **Idioma**: Português (Brasil)

## 2. Perfis de Usuário

A aplicação suporta três perfis distintos, selecionáveis no login:

| Perfil | Descrição | Tela inicial após login |
|---|---|---|
| **Paciente** | Usuário principal, registra suas próprias aferições | `pages/dashboard.html` |
| **Cuidador** | Familiar/responsável vinculado a um paciente, edita em nome dele | `pages/dashboard.html` (do paciente vinculado) |
| **Médico** | Visualiza pacientes e registra prontuário | `pages/clinical-dashboard.html` |

## 3. Contas de Teste (já populadas em `localStorage` na inicialização)

| Perfil | CPF (com máscara) | CPF (sem máscara) | Senha | Nome |
|---|---|---|---|---|
| Paciente | `123.456.789-00` | `12345678900` | `123` | João Silva |
| Paciente | `987.654.321-00` | `98765432100` | `123` | Maria Souza |
| Cuidador | `477.447.980-23` | `47744798023` | `123` | Alan Cuidador (vinculado a João Silva) |
| Médico | `111.111.111-11` | `11111111111` | `123` | Dra. Ana (CRM 12345-MG) |

**Conta primária para testes automatizados**: CPF `123.456.789-00`, senha `123`, perfil **Paciente**.

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

Cabeçalho com saudação personalizada ("Olá, João"), data de hoje, avatar (clicável → vai para perfil).

**Próximos Remédios (Hoje)**: lista os 3 primeiros medicamentos com botão de "check" que persiste o estado de "tomado" por dia (via chave `ppc_meds_taken_YYYY-MM-DD` no localStorage).

**Gráfico de Glicemia** (Chart.js): linha temporal das medições.
**Gráfico de Pressão Arterial** (Chart.js): duas linhas (sistólica/diastólica).

**Botão FAB "+"**: abre bottom-sheet com 3 abas:
- **Pressão**: campos sistólica e diastólica
- **Glicemia**: campo valor mg/dL
- **Sintomas**: chips selecionáveis (Tontura, Dor de cabeça, Cansaço, Falta de ar) + textarea livre

Botão "Salvar":
- Pressão: exige sys e dia preenchidos. Após salvar, **gráfico de pressão atualiza automaticamente**.
- Glicemia: exige valor. Após salvar, **gráfico de glicemia atualiza automaticamente**.
- Sintomas: exige ao menos um chip ou descrição. Após salvar, registro aparece no histórico.

**Bottom-nav**: Início / Histórico / Remédios / Perfil

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
  - Editar / Excluir cuidador
- Botão **"Gerar Relatório Clínico PDF"** abre `report.html` em nova aba (versão imprimível)
- Botão **"Sair da Conta"**: confirma e limpa `ppc_currentUser` antes de redirecionar para login

### 4.7 Painel Médico (`/pages/clinical-dashboard.html`)

- Sidebar mostra **médico real logado** (nome + CRM)
- Busca de pacientes por nome (`#patient-search`)
- Lista de pacientes ativos (cards): clicar seleciona o paciente
- Ao selecionar paciente, abre painel de detalhe:
  - **Ficha Clínica** (idade, sexo, tipo sanguíneo, alergias, condições)
  - **Gráficos** com botões "Glicemia" / "Pressão" para alternar
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

## 5. Modelo de Dados (localStorage)

```
ppc_users        : Array<User>
ppc_currentUser  : User (sessão ativa)
ppc_data         : { [patientId]: { medications: [], vitals: { pressure, glycemia, history, symptoms }, observations: [] } }
ppc_meds_taken_YYYY-MM-DD : Array<medId>  (estado de "tomei o remédio hoje")
```

`User`:
```js
{ id, name, cpf, password, profile: 'paciente'|'cuidador'|'medico',
  birthDate?, sex?, bloodType?, allergies?, conditions?: string[],
  crm?, linkedPatientId? }
```

## 6. Critérios de Aceitação Globais

1. **Segurança de autenticação**: nenhum perfil pode logar sem CPF + senha válidos. Não pode haver bypass de médico.
2. **Acesso a páginas internas**: tentar abrir `/pages/*.html` sem estar logado deve redirecionar imediatamente para `/index.html`.
3. **Sair da Conta**: ao clicar em logout (em qualquer perfil), a sessão deve ser limpa de tal forma que voltar (browser back) leve de volta ao login.
4. **CPF**: máscara automática, validação de 11 dígitos, prevenção de duplicatas no cadastro.
5. **Reatividade dos gráficos**: ao adicionar uma medição (pressão ou glicemia), o gráfico correspondente deve atualizar **sem reload manual da página**.
6. **Botão check de remédio**: estado de "tomado" deve persistir após reload da página (no mesmo dia).
7. **Cadastro de cuidador via perfil**: o cuidador pode então fazer login e visualiza dashboard do paciente vinculado (não o seu próprio).
8. **Médico só vê pacientes**: ao selecionar um paciente, mostra dados clínicos, gráficos, medicações e sintomas reais daquele paciente.
9. **Prontuário do médico**: salvar conduta deve persistir e aparecer no "Histórico de Condutas" sem reload.
10. **Busca/filtro do histórico**: filtros e busca textual devem afetar a lista em tempo real.

## 7. Fora de Escopo (não testar)

- Integração com banco real
- Backend / API
- Notificações push reais (apenas alert simulado)
- Geração real de PDF (a tela `report.html` é HTML imprimível)
- Validação de algoritmo de CPF (apenas formato 11 dígitos)
