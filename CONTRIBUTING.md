# Guia de Contribuição

Bem-vindo(a) ao **Portal do Paciente Crônico**! Este documento descreve o fluxo de trabalho adotado pela equipe e os padrões esperados para colaboração no projeto.

> O projeto faz parte da disciplina **Projeto - Aplicações Web** do curso de Sistemas de Informação da PUC Minas. As convenções abaixo refletem decisões coletivas tomadas em reuniões de planejamento e revisão por pares.

---

## 📌 Sumário

1. [Antes de começar](#1-antes-de-começar)
2. [Como rodar localmente](#2-como-rodar-localmente)
3. [Fluxo de trabalho (branches e PRs)](#3-fluxo-de-trabalho-branches-e-prs)
4. [Convenção de commits](#4-convenção-de-commits)
5. [Padrões de código](#5-padrões-de-código)
6. [Estrutura de pastas](#6-estrutura-de-pastas)
7. [Revisão por pares (code review)](#7-revisão-por-pares-code-review)
8. [Checklist antes de abrir um PR](#8-checklist-antes-de-abrir-um-pr)
9. [Reportar problemas](#9-reportar-problemas)

---

## 1. Antes de começar

Familiarize-se com a documentação:

- 📖 [`README.md`](README.md) — visão geral do projeto e navegação rápida
- 📋 [`PRD.md`](PRD.md) — especificação técnica completa (modelo de dados, fluxos, contas de teste)
- 🏗️ [`docs/development.md`](docs/development.md) — mapeamento de requisitos → arquivos de código
- 🎨 [`docs/interface.md`](docs/interface.md) — design system e padrões de UI

E tenha instalado:

- **Git** (qualquer versão recente)
- **Python 3** OU **Docker** (para rodar a aplicação localmente — escolha um)
- Um editor de código (sugerimos **VS Code**)
- Um navegador moderno (Chrome, Firefox, Safari ou Edge)

---

## 2. Como rodar localmente

### Opção 1 — Servidor Python (mais simples)

```bash
cd src
python3 -m http.server 8080
# Abrir http://localhost:8080/index.html
```

### Opção 2 — Docker + Nginx

```bash
docker compose up
# Abrir http://localhost:8080
```

### Contas de teste pré-carregadas

A aplicação injeta automaticamente os usuários de teste no `localStorage` no primeiro acesso. Veja a lista completa em [`src/README.md`](src/README.md#-contas-de-teste). Senha universal: `123`.

---

## 3. Fluxo de trabalho (branches e PRs)

Adotamos um modelo simples baseado em **branches por feature/correção + Pull Requests**.

### Branches

- `main` — branch principal, **sempre estável** e refletindo o estado entregue do projeto. Toda mudança chega aqui via Pull Request mergeado.
- `claude/<descrição>` ou `feat/<descrição>` — branch de trabalho para uma feature, correção ou ajuste pontual.

### Passo a passo de uma contribuição

1. Atualize sua main local:
   ```bash
   git checkout main
   git pull origin main
   ```

2. Crie uma branch para sua mudança:
   ```bash
   git checkout -b feat/cadastro-de-cuidador
   ```

3. Faça as alterações, commite (ver [Seção 4](#4-convenção-de-commits)) e dê push:
   ```bash
   git add <arquivos>
   git commit -m "feat: descrição clara da mudança"
   git push -u origin feat/cadastro-de-cuidador
   ```

4. Abra um **Pull Request** no GitHub apontando para `main`. Preencha título, descrição e marque o PR com:
   - **O que foi feito** (objetivo)
   - **Por quê** (motivação / requisito atendido)
   - **Como testar** (passos para verificar manualmente)

5. Aguarde a **revisão por pares** (ver [Seção 7](#7-revisão-por-pares-code-review)). Após aprovação, faça o **merge** e delete a branch.

---

## 4. Convenção de commits

Seguimos um estilo inspirado em [Conventional Commits](https://www.conventionalcommits.org/pt-br/), porém **adaptado para português** e ao contexto acadêmico do projeto.

### Estrutura

```
<tipo>(<escopo opcional>): <descrição curta no infinitivo>

<corpo opcional explicando o porquê>

Co-Authored-By: Nome <email>
```

### Tipos mais usados

| Tipo | Quando usar |
|---|---|
| **`feat`** | Adicionar funcionalidade nova ao sistema |
| **`fix`** | Corrigir um bug ou comportamento incorreto |
| **`docs`** | Mudar apenas documentação (`.md`, comentários) |
| **`style`** | Ajustar formatação, CSS, sem mudar lógica |
| **`refactor`** | Reorganizar código sem mudar comportamento |
| **`test`** | Adicionar ou ajustar testes |
| **`chore`** | Tarefas auxiliares (config, build, dependências) |

### Exemplos reais do projeto

```
feat: adiciona banner de cuidador identificando paciente representado

fix: corrige bug que sobrescrevia a senha de qualquer usuário default para "123"

docs: reescreve docs/tests.md com plano e cenários reais do projeto

refactor: extrai escapeHtml para módulo compartilhado em toast.js
```

### Co-autoria obrigatória

Como o trabalho é coletivo, todos os commits substantivos devem incluir os demais integrantes da equipe como **coautores**, mesmo quando apenas um membro digitou o código.

**Regra simples:** quem está commitando entra como **autor** principal automaticamente (porque o Git usa o `user.email` configurado). Os outros integrantes — **menos quem está commitando** — entram como `Co-Authored-By` no final da mensagem.

Identidades de cada integrante para uso nos trailers:

| Integrante | `Co-Authored-By` |
|---|---|
| Alan Alencar da Silva | `Co-Authored-By: Alan Alencar <alanalencar.office@gmail.com>` |
| Alex Gabriel Rocha Santos | `Co-Authored-By: Alex Gabriel Rocha Santos <rochaalexgabriel@gmail.com>` |
| Marcela Fernandes de Castro Melo | `Co-Authored-By: Marcela Fernandes <marcelafernandes0099@gmail.com>` |
| Sara Zschaber de Souza | `Co-Authored-By: Sara Zschaber <zschaberlu@gmail.com>` |

**Exemplos por integrante:**

Se quem está commitando é **Alan**, adicione ao final da mensagem:
```
Co-Authored-By: Alex Gabriel Rocha Santos <rochaalexgabriel@gmail.com>
Co-Authored-By: Marcela Fernandes <marcelafernandes0099@gmail.com>
Co-Authored-By: Sara Zschaber <zschaberlu@gmail.com>
```

Se quem está commitando é **Alex**, adicione:
```
Co-Authored-By: Alan Alencar <alanalencar.office@gmail.com>
Co-Authored-By: Marcela Fernandes <marcelafernandes0099@gmail.com>
Co-Authored-By: Sara Zschaber <zschaberlu@gmail.com>
```

E assim por diante para **Marcela** e **Sara** — sempre adicionando os 3 que **não são quem está commitando**.

> **Sobre Bernardo Santos Torres:** Ele participa do grupo mas não possui conta no GitHub, por isso não pode ser incluído como `Co-Authored-By` no git (que exige um e-mail vinculado a um usuário). Mesmo assim, ele está formalmente reconhecido como **autor do projeto** no [`CITATION.cff`](CITATION.cff) e nos demais documentos acadêmicos, refletindo sua participação no trabalho coletivo.

O GitHub reconhece automaticamente esses trailers e mostra os avatares de todos os contribuidores no commit. No gráfico de "Contributors" do repositório, todos aparecem creditados.

---

## 5. Padrões de código

### HTML

- **HTML5 semântico**: use `<header>`, `<nav>`, `<main>`, `<section>`, `<article>` quando apropriado em vez de `<div>` genérico.
- **Acessibilidade**: forneça `aria-label` em ícones de ação; mantenha contraste de cor adequado; preserve a ordem natural de tabulação.
- **Não use JavaScript inline excessivo** (`onclick="..."`) — prefira *event listeners* registrados via JS, exceto em casos pontuais já documentados.

### CSS

- **Use as variáveis** definidas em [`src/css/variables.css`](src/css/variables.css) para cores, espaçamentos e raios. Evite hard-coded de valores.
- **Mobile-first**: escreva o estilo base para mobile e adicione `@media (min-width: 600px)` ou `768px` para desktop.
- **Componentes reutilizáveis** ficam em [`src/css/components.css`](src/css/components.css); estilos exclusivos de uma tela ficam no `<style>` da própria página HTML.

### JavaScript

- **Vanilla JS (ES6+)** — não introduzir frameworks (React, Vue, jQuery, etc.).
- **Sempre escapar conteúdo dinâmico** inserido via `innerHTML` usando a função `escapeHtml()` global (definida em [`src/js/toast.js`](src/js/toast.js)). XSS é a maior vulnerabilidade do projeto por usarmos `localStorage` como banco.
- **Preferir `textContent` sobre `innerHTML`** quando estiver apenas inserindo texto.
- **Não use `alert()` ou `confirm()` nativos** — use `showToast(msg, tipo)` e `showConfirm(msg, opts)` do `toast.js`.
- **Camada de dados**: toda leitura/escrita no `localStorage` deve passar por [`src/js/store.js`](src/js/store.js). Não acesse `localStorage` direto das páginas.
- **Versionamento de assets**: ao alterar um CSS ou JS, atualize o `?v=20260518a` para forçar refresh do cache do navegador.

### Markdown (documentação)

- Use **títulos hierárquicos** corretos (`#`, `##`, `###`).
- Prefira **tabelas Markdown** em vez de `<table>` HTML inline.
- **Cross-link com caminhos relativos** — facilita navegação local e no GitHub.
- Linhas de texto em torno de 80–120 caracteres (não obrigatório, mas ajuda na revisão).

---

## 6. Estrutura de pastas

```
src/
├── index.html              ← Tela de login
├── register.html           ← Tela de cadastro
├── css/                    ← Estilos (variáveis, componentes, telas específicas)
├── js/                     ← Lógica (store, auth, security, modal, etc.)
└── pages/                  ← Telas internas (dashboard, history, profile, etc.)

docs/
├── context.md              ← Problema, justificativa, público-alvo
├── especification.md       ← Personas, histórias de usuário, requisitos
├── interface.md            ← Telas, componentes, design system
├── development.md          ← Mapeamento RF → arquivo de código
├── tests.md                ← Plano e cenários de teste
├── references.md           ← Bibliografia (ABNT)
├── template.md             ← Template visual inicial (Etapa 2)
└── img/                    ← Wireframes e capturas de tela

presentation/               ← Slides e vídeo de demonstração
docker/                     ← Configuração do Nginx
```

Para a estrutura completa do `src/` (com descrição de cada arquivo), ver [`src/README.md`](src/README.md#-estrutura-de-pastas).

---

## 7. Revisão por pares (code review)

Toda mudança passa por **revisão por ao menos um outro integrante da equipe** antes de ser mergeada na `main`. Isso garante:

- Detecção precoce de bugs e regressões
- Disseminação do conhecimento entre todos os integrantes (todos sabem o que está acontecendo no projeto)
- Verificação de aderência aos padrões de código deste documento

### O que verificar em uma revisão

- ✅ O código resolve o problema descrito no PR?
- ✅ Há regressões em outras partes do sistema?
- ✅ A lógica é clara e bem nomeada?
- ✅ Não há `alert()`/`confirm()` nativos, `innerHTML` sem escape, ou hard-coded de cores?
- ✅ O cache-busting (`?v=...`) foi atualizado se necessário?
- ✅ A documentação relacionada foi atualizada (ex.: `development.md` se um novo arquivo foi criado)?
- ✅ Os commits estão bem escritos e incluem os coautores?

### Como deixar um comentário

- Seja **gentil e construtivo**: aponte o problema, sugira solução.
- Use **sugestões do GitHub** (botão "+") para propor mudanças linha a linha.
- Para discussões maiores, abra uma conversa no PR ou marque uma reunião rápida.

---

## 8. Checklist antes de abrir um PR

Antes de clicar em "Create Pull Request", revise:

- [ ] Roda localmente sem erros no console do navegador
- [ ] Testei manualmente o fluxo principal afetado pela mudança
- [ ] Testei pelo menos um caso de borda (entrada inválida, lista vazia, etc.)
- [ ] Funciona em **mobile** (DevTools → modo responsivo)
- [ ] Mensagens de commit seguem a [convenção](#4-convenção-de-commits)
- [ ] Coautores incluídos nos commits substantivos
- [ ] Cache-busting atualizado se mexi em CSS ou JS
- [ ] Documentação relacionada atualizada (se aplicável)
- [ ] PR tem título e descrição claros, com instruções de teste

---

## 9. Reportar problemas

Se você encontrou um bug ou tem uma sugestão de melhoria:

1. Verifique se já não existe uma **issue aberta** no GitHub.
2. Caso contrário, abra uma nova issue descrevendo:
   - **O que aconteceu** vs. **o que era esperado**
   - **Passos para reproduzir** (perfil usado, ações realizadas)
   - **Navegador e sistema operacional**
   - Print da tela ou texto do erro no console, se aplicável

---

## 🙏 Obrigado por contribuir!

Cada pequena melhoria — em código, documentação ou design — fortalece o projeto e o aprendizado coletivo da equipe.

> **Equipe atual:** Alan Alencar da Silva · Alex Gabriel Rocha Santos · Bernardo Santos Torres · Marcela Fernandes de Castro Melo · Sara Zschaber de Souza
>
> **Orientador:** Prof. Clóvis Lemos Tavares
