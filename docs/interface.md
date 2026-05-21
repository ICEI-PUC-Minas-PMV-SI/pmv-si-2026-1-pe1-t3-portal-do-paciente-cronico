[painel médico template.pdf](https://github.com/user-attachments/files/28124550/painel.medico.template.pdf)[painel cuidador template.pdf](https://github.com/user-attachments/files/28124538/painel.cuidador.template.pdf)[painel paciente template.pdf](https://github.com/user-attachments/files/28124490/painel.paciente.template.pdf)# Projeto de Interface

Este documento apresenta a visão geral da interação do usuário com o **Portal do Paciente Crônico**, descrevendo o fluxo de navegação (*user flow*), os protótipos de baixa fidelidade e o detalhamento de cada tela do sistema. Também documenta os **componentes reutilizáveis** e o **design system** que sustenta a consistência visual em todo o produto.

> 🔗 Para ver as telas em ação, acesse a [aplicação rodando no GitHub Pages](https://icei-puc-minas-pmv-si.github.io/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/src/).
>
> 📌 **Sobre os screenshots:** A maioria das imagens foi atualizada para refletir a versão mais recente da interface (FAB estendido "Novo Registro", banner do cuidador, painel do médico com badges de alerta, etc.). Algumas telas auxiliares (cadastro de cuidador/médico, Remédios e Perfil) ainda usam capturas de uma versão anterior — a equipe atualizará esses prints em uma próxima iteração. As **descrições textuais** já estão alinhadas com a interface vigente.

---

## 1. User Flow

O fluxo do usuário descreve como cada perfil navega entre as telas a partir do login até as ações principais do sistema.

📄 [Diagrama completo (Flow.pdf)](https://github.com/user-attachments/files/26802084/Flow.pdf)

### Resumo dos fluxos por perfil

- **Paciente:** Login → Dashboard (gráficos + remédios + alertas) → Novo Registro (pressão/glicose/sintomas) → Histórico → Remédios → Perfil → Sair
- **Cuidador:** Login → Dashboard **do paciente vinculado** (com banner de identificação em todas as telas) → demais telas no mesmo contexto do paciente representado
- **Profissional de Saúde:** Login → Painel Clínico → Selecionar Paciente → Ficha + Gráficos + Prescrição → Registrar Conduta

Para o detalhamento dos perfis e histórias de usuário, consulte [`docs/especification.md`](especification.md). Para a relação RF → tela → arquivo de código, consulte [`docs/development.md`](development.md).

---

## 2. Protótipo de Baixa Fidelidade

As telas seguem uma estrutura comum dividida em **três grandes blocos**:

- **Cabeçalho:** identificação do usuário (nome, avatar) e contexto (data, banner do paciente representado, no caso do cuidador).
- **Conteúdo:** área principal da tela, varia conforme a função (cartão de status, gráficos, lista de medicamentos, timeline, etc.).
- **Rodapé:** barra de navegação inferior (paciente/cuidador) ou sidebar lateral (médico).

### Tela – Paciente / Cuidador

O paciente vê seu próprio painel; o cuidador vê o painel **do paciente vinculado**, com o nome dele em destaque no banner laranja superior. Em ambos os casos:

- **Cabeçalho:** saudação personalizada, data, avatar clicável
- **Conteúdo:** cartão de status (verde quando estável, vermelho quando há alerta), lista de remédios do dia com checkbox, gráficos de evolução glicêmica e pressão arterial
- **Rodapé:** barra de navegação fixa com Início · Histórico · Remédios · Perfil, e botão flutuante **"Novo Registro"** sempre acessível

📄 [Wireframe — Paciente (painel paciente template.pdf)](https://github.com/user-attachments/files/28124933/painel.paciente.template.pdf) 
📄 [Wireframe — Cuidador (painel cuidador template.pdf)](https://github.com/user-attachments/files/28124940/painel.cuidador.template.pdf)




### Tela – Médico

O profissional de saúde acessa um layout específico, com mais espaço lateral para listas e detalhes clínicos:

- **Sidebar:** identificação do médico (nome, CRM), atalhos para gestão de pacientes, botão de sair
- **Cabeçalho:** título da seção, barra de busca por nome de paciente
- **Conteúdo:** lista de pacientes ativos à esquerda; ao selecionar, abre o painel detalhado à direita com ficha clínica, gráficos, prescrição atual, sintomas e formulário de conduta

📄 [Wireframe — Médico (painel médico template.pdf)](https://github.com/user-attachments/files/28125014/painel.medico.template.pdf) 


---

## 3. Telas em Alta Fidelidade

A seguir, o detalhamento visual e funcional de cada tela do sistema.

### 3.1 Tela de Cadastro

Permite a inserção dos dados pessoais conforme o perfil escolhido:

- **Paciente:** Nome completo, CPF, senha, data de nascimento, sexo, tipo sanguíneo, alergias, doenças crônicas (checkboxes) e aceite obrigatório dos termos da **LGPD**.
- **Cuidador:** o fluxo de cuidador **não passa pela tela de cadastro pública** — ele é vinculado a um paciente por meio do formulário "Adicionar Cuidador" na tela de Perfil do paciente principal.
- **Médico:** Nome, CPF, senha e **CRM**.

Validações em tempo real: máscara de CPF, mínimo de 11 dígitos, senha de pelo menos 4 caracteres, prevenção de CPFs duplicados. Implementação em [`src/register.html`](../src/register.html) + [`src/js/auth.js`](../src/js/auth.js).

![cadastro - perfil paciente](./img/cadastro-paciente.png)
![cadastro - perfil cuidador](./img/Captura%20de%20tela%202026-04-16%20085359.png)
![cadastro - perfil médico](./img/Captura%20de%20tela%202026-04-16%20085410.png)

*Telas de cadastro para cada um dos três perfis. O print do perfil Paciente já reflete a versão atual; os de Cuidador e Médico serão atualizados na próxima iteração.*

---

### 3.2 Tela de Login

Concentra os campos de autenticação e a **seleção do perfil** em formato de cards visuais clicáveis (Paciente · Cuidador · Médico). A escolha do perfil é obrigatória e validada contra o cadastro do CPF: tentar entrar com um perfil divergente bloqueia o acesso com mensagem amigável.

Recursos adicionais:
- Link **"Esqueci minha senha"** com fluxo de recuperação por CPF + data de nascimento
- Link **"Cadastre-se"** que leva à tela de cadastro
- Toggle de exibição de senha (ícone de olho)

Implementação em [`src/index.html`](../src/index.html) + [`src/js/auth.js`](../src/js/auth.js).

![login](./img/login.png)

*Tela de acesso à conta do usuário, com seletor visual de perfil.*

---

### 3.3 Tela Home (Dashboard do Paciente)

A página inicial concentra o que o paciente precisa **ver e fazer no dia**. Estrutura de cima para baixo:

1. **Saudação personalizada** com nome, data e avatar clicável (vai para o Perfil)
2. **Cartão de Status (`#status-card`)** — gradiente azul quando tudo está em dia, **gradiente vermelho** quando há medições fora do alvo (PA ≥ 140/90 mmHg ou glicemia > 180 mg/dL), com mensagem explícita do motivo
3. **Meus Remédios do dia** — cards com nome, horário e dose, e um botão de check que persiste o estado de "tomado" por dia
4. **Gráficos lado a lado em desktop** (empilhados em mobile) — Evolução Glicêmica e Pressão Arterial, renderizados via Chart.js e **reativos**: atualizam imediatamente após um novo registro
5. **Botão flutuante "Novo Registro"** sempre acessível no rodapé — formato pílula com ícone `+` e texto explícito (não é mais um botão genérico com apenas `+`)
6. **Bottom-nav** com 4 abas: Início · Histórico · Remédios · Perfil

> 🟧 **Para cuidadores logados,** um **banner laranja** aparece no topo identificando o paciente representado (ver Seção 4.3).

Implementação em [`src/pages/dashboard.html`](../src/pages/dashboard.html).

![dashboard home](./img/dashboard-paciente.png)

*Dashboard do paciente João Silva, com cartão de status, lista de remédios, gráficos de glicemia e pressão e o FAB estendido "Novo Registro" no rodapé.*

#### Bottom-sheet "Novo Registro"

Ao clicar no FAB, abre-se um bottom-sheet (em mobile) ou modal centralizada (em desktop) com 3 abas e value cards. Detalhes na Seção 4.2.

![bottom-sheet novo registro](./img/novo-registro.png)

*Bottom-sheet "Novo Registro" aberto na aba Pressão, com value cards para sistólica e diastólica e faixa informativa com referências clínicas.*

---

### 3.4 Tela Histórico

Linha do tempo consolidada com **todas as medições, sintomas e exames** já registrados, com:

- **KPIs no topo** mostrando a contagem de cada tipo (Pressão, Glicemia, Sintomas, Exames)
- **Busca textual em tempo real** filtra a tabela conforme o usuário digita (sem precisar clicar em buscar)
- **Botão "Anexar Exame/Laudo"** abre formulário inline para adicionar um exame ao histórico (título + nome do arquivo simulado)
- **Tabela com badges coloridos por tipo de registro** (pressão, glicemia, sintoma, exame)
- Registros ordenados pelo timestamp mais recente

Implementação em [`src/pages/history.html`](../src/pages/history.html).

![histórico](./img/historico.png)

*Tela de Histórico com timeline consolidada e busca em tempo real.*

---

### 3.5 Tela Remédios

Gerencia a lista de medicamentos contínuos do paciente:

- **KPIs:** Total · Em dia · Atenção
- **Botão "Novo Medicamento"** abre formulário inline com Nome, Dosagem, Primeira dose (time picker), Frequência
- **Tabela** com nome, dosagem, primeira dose, frequência (badge) e ações de Editar / Excluir
- **Exclusão** com confirmação modal

Implementação em [`src/pages/medications.html`](../src/pages/medications.html).

![remédios](./img/Screenshot%202026-05-06%20083600.png)

*Tela de gestão de medicamentos com CRUD completo (captura de versão anterior — será atualizada).*

---

### 3.6 Tela Perfil

Centraliza identidade, dados clínicos básicos e controle de cuidadores vinculados:

- **Avatar grande** com inicial do nome
- **Accordion "Dados Clínicos Básicos"** — idade (calculada da data de nascimento), sexo, tipo sanguíneo, alergias, condições crônicas. Botão **Editar Dados** abre formulário e salva no banco
- **Accordion "Meus Cuidadores"** (oculto para o próprio cuidador) — lista cuidadores vinculados; botão **Adicionar Cuidador** abre formulário (Nome, CPF com máscara, senha provisória) com **validação anti-sequestro de conta**
- **Botão "Gerar Relatório Clínico PDF"** abre [`src/pages/report.html`](../src/pages/report.html) em nova aba e dispara a janela de impressão
- **Botão "Rever Tutorial de Boas-vindas"** reseta as flags do tutorial e leva à dashboard, fazendo o tour guiado disparar novamente
- **Botão "Sair da Conta"** com confirmação modal

Implementação em [`src/pages/profile.html`](../src/pages/profile.html).

![perfil](./img/Screenshot%202026-05-06%20083637.png)

*Tela de Perfil com dados clínicos editáveis e gestão de cuidadores (captura de versão anterior — será atualizada).*

---

### 3.7 Tela Gestão de Pacientes (Médico)

A entrada do fluxo do médico, com **sidebar** identificando o profissional e área central listando os pacientes:

- **Sidebar:** logo "Portal Clínico", nome do médico, CRM, atalho "Meus Pacientes" e botão "Sair"
- **Cabeçalho central:** título "Gestão de Pacientes", subtítulo "Visão geral de monitoramento remoto" e **barra de busca** que filtra a lista em tempo real
- **Lista "Meus Pacientes Ativos":** cards com nome, CPF e **badge de status** verde ("Estável") ou **vermelho ("Alerta!")** quando há sinais vitais fora do alvo (PA ≥ 140/90 ou glicemia > 180 / < 70). Cards com alerta também exibem o **motivo abaixo do CPF** (ex.: *"PA 172/105 mmHg"*)
- Borda lateral colorida do card reforça o status (verde/vermelho)

Implementação em [`src/pages/clinical-dashboard.html`](../src/pages/clinical-dashboard.html).

![médico - gestão de pacientes](./img/painel-medico.png)

*Lista de pacientes ativos vista pela Dra. Ana, com badges de status (verde "Estável" / vermelho "Alerta!") e indicação do motivo do alerta abaixo do CPF.*

---

### 3.8 Tela Detalhes do Paciente (Médico)

Ao selecionar um paciente da lista, abre-se o painel detalhado à direita:

- **Card "Ficha Clínica"** (fundo azulado quando selecionado) com idade, sexo e tipo sanguíneo
- **Card "Alertas"** (acentos vermelhos) com alergias e condições crônicas
- **Área central de gráficos** com botões para alternar entre **Glicemia** e **Pressão**, expandindo automaticamente o eixo Y para picos críticos (Ana Beatriz com glicemia de 240 mg/dL, Carlos com PA 172/105 mmHg)

![médico - detalhes do paciente](./img/prontuario-carlos.png)

*Prontuário completo do paciente Carlos Eduardo Pereira (hipertensão crítica) aberto pela Dra. Ana, com ficha clínica, alertas, gráficos, prescrição, sintomas e formulário de conduta clínica.*

---

### 3.9 Tela Prontuário, Sintomas e Conduta Médica

Logo abaixo da área de gráficos (visível no mesmo print da seção anterior):

- **Card "Prescrição Atual"** lista os medicamentos do paciente com dosagem e frequência
- **Card "Últimos Sintomas"** mostra os 3 sintomas mais recentes em ordem reversa, destacando data/hora em vermelho
- **Seção "Prontuário e Conduta"** com:
  - Textarea **"Observação Clínica / Anamnese Remota"** para o profissional registrar o raciocínio
  - Campo **"Ajuste de Prescrição"** para mudanças nas dosagens ou novos medicamentos
  - Botão **"Salvar e Notificar o Paciente"** que persiste a conduta em `ppc_data[id].observations[]` e exibe imediatamente no **"Histórico de Condutas"** abaixo do formulário
  - Confirmação visual via toast de sucesso

A função no JS é [`saveObservation()` em `store.js`](../src/js/store.js).

---

### 3.10 Banner do Cuidador

Quando o usuário logado é um cuidador, todas as páginas internas (Início, Histórico, Remédios, Perfil) ganham um **banner laranja no topo** identificando o paciente representado. Essa identificação é crítica para evitar que o cuidador confunda em nome de quem está agindo.

![banner do cuidador na dashboard](./img/dashboard-cuidador.png)

*Dashboard do paciente João Silva sendo acompanhado pelo cuidador Alan. O banner laranja no topo, a saudação personalizada ("Olá, Alan · Acompanhando João Silva") e o título de seção ("Remédios de João") deixam o contexto explícito.*

---

## 4. Componentes e Padrões UI

Esta seção documenta os componentes reutilizáveis que aparecem em múltiplas telas e que foram desenhados para sustentar a consistência visual e funcional do app.

### 4.1 FAB Estendido "Novo Registro"

O botão de ação principal do paciente — laranja, em formato de **pílula**, centralizado no rodapé (mobile) e à direita (desktop). Substituiu a versão antiga que era apenas um círculo com `+` (que confundia usuários novos sobre o propósito).

**Características:**
- Ícone `plus-circle` + texto **"Novo Registro"** sempre visíveis
- Animação sutil de pulso para chamar atenção em primeira visita
- Sempre acessível na dashboard (não rola junto com o conteúdo)

Implementação visual em [`src/css/onboarding.css`](../src/css/onboarding.css) (regras `.fab-extended`).

### 4.2 Bottom-sheet "Novo Registro"

Aberto pelo FAB. Repaginado para parecer um app médico premium:

- **Header com ícone** azul à esquerda + título "Novo Registro" + subtítulo
- **Abas em pílula** (Pressão · Glicose · Sintomas) com fundo cinza claro e aba ativa em "card branco elevado", padrão consistente com iOS/Material Design
- **Value Cards** para Pressão (sistólica e diastólica lado a lado, com separador `/` visual) e Glicose (card único com número grande em azul)
- **Faixa informativa azul** com referências clínicas (ex.: *"Ideal: até 120/80 mmHg · Atenção: a partir de 140/90 mmHg"*)
- **Chips de sintomas** em grade 2×2 com hover azul e estado selecionado com sombra suave
- **Botões com ícones**: `✗ Cancelar` e `✓ Salvar Registro`
- Em desktop, o bottom-sheet vira modal centralizada com largura máxima de 520 px

### 4.3 Banner do Cuidador

Quando o usuário logado é um **cuidador**, um banner laranja aparece **no topo de todas as páginas** identificando o paciente que ele está acompanhando. Isso elimina a confusão de "em nome de quem estou agindo agora?"

**Conteúdo do banner:**
- Avatar circular azul com a inicial do paciente
- Tag *"Você está acompanhando"* em laranja
- **Nome do paciente em destaque (negrito grande)**
- Linha discreta abaixo: *"Cuidador logado: {nome do cuidador}"*

Adicionalmente, na dashboard:
- A saudação muda de "Olá, Alan" para "Olá, Alan · Acompanhando João Silva"
- O título "Meus Remédios" vira "Remédios de João"

Implementação em [`src/js/caregiver-banner.js`](../src/js/caregiver-banner.js).

### 4.4 Tutorial Guiado de Primeiro Acesso

Atende ao **RNF-11** (curva de aprendizado). Na primeira visita de cada tela, dispara automaticamente um **tour interativo**:

- **Overlay escuro** com *spotlight pulsante azul* destacando o elemento que está sendo explicado
- **Tooltip com seta** apontando para o elemento, com título + descrição
- **Contador** "1/4", **bolinhas de progresso** e botões **Voltar / Próximo / Pular**
- **Tours diferentes por perfil** (paciente, cuidador e médico) — cada um vê passos contextuais à sua realidade
- Suporte a teclado (← → para navegar, Esc para sair)
- Cada tela é marcada como "visto" uma única vez (`ppc_onboarding_done_<userId>_<screenKey>`); o usuário pode reabrir pelo botão **"Rever Tutorial de Boas-vindas"** no Perfil

Implementação em [`src/js/onboarding.js`](../src/js/onboarding.js) e estilos em [`src/css/onboarding.css`](../src/css/onboarding.css).

### 4.5 Status Card (Cartão de Alertas)

O cartão de saudação no topo da dashboard adapta-se ao estado clínico do paciente:

- **Estado "Comece agora"** (sem medições) — gradiente neutro com ícone de estrelas
- **Estado "Muito bem!"** (medições em dia) — gradiente azul com ícone de medalha
- **Estado "Atenção!"** (PA ou glicemia fora do alvo) — gradiente vermelho com ícone de triângulo de alerta e mensagem descritiva do motivo

A lógica vive em `updateStatusCard()` dentro de [`src/pages/dashboard.html`](../src/pages/dashboard.html).

### 4.6 Toasts e Confirmações

Substituem os `alert()`/`confirm()` nativos do navegador:

- **Toasts** não-bloqueantes no topo da tela, em três cores: sucesso (verde), erro (vermelho), info (azul). Auto-fechamento em 2,5 s.
- **Confirmações modais** com Promise (`showConfirm`) para ações destrutivas como excluir medicamento ou sair da conta

Implementação em [`src/js/toast.js`](../src/js/toast.js).

---

## 5. Design System

A consistência visual é sustentada por **variáveis CSS centralizadas** em [`src/css/variables.css`](../src/css/variables.css), reaproveitadas em [`src/css/components.css`](../src/css/components.css) e nas páginas.

### Paleta

| Função | Cor | Uso |
|---|---|---|
| Primária (azul) | `#2563EB` | Identidade do produto, botões principais, gráficos |
| Acento (laranja) | `#F97316` | FAB, banner do cuidador, destaques de ação |
| Sucesso | `#16A34A` | Status estável, confirmações |
| Atenção | `#D97706` | Avisos amarelos |
| Perigo | `#DC2626` | Alertas, exclusões, status crítico |
| Texto principal | `#0F172A` | Tipografia primária |
| Fundo da página | `#F8FAFC` | Off-white para reduzir cansaço visual |

### Tipografia

- Família: **Inter** (via Google Fonts) — moderna, neutra, ótima legibilidade em mobile
- Pesos: 400 (regular), 500 (medium), 600 (semibold), 700 (bold)
- Tamanhos: variáveis controladas via CSS para fácil ajuste de acessibilidade

### Espaçamento e Raios

- Escala de espaçamento em `rem` (`--sp-1` a `--sp-12`) para consistência entre componentes
- Raios padronizados (`--radius-sm` a `--radius-2xl`) — botões usam radius médio, cards usam radius grande, FAB e overlays usam raio máximo

### Acessibilidade

- **Contraste WCAG AA** garantido nas combinações principais
- **Áreas de toque** mínimas de 44×44 px (botões, FAB, chips, bottom-nav)
- **Modo responsivo mobile-first** com breakpoints em 600 px e 768 px
- **Suporte a teclado** em tutoriais e modais (Esc fecha, setas navegam)

---

## 6. Documentação Complementar

| Tema | Documento |
|---|---|
| Contexto, problema, público-alvo | [`docs/context.md`](context.md) |
| Personas, histórias de usuário, requisitos | [`docs/especification.md`](especification.md) |
| Mapeamento RF → tela → código | [`docs/development.md`](development.md) |
| Plano e cenários de testes | [`docs/tests.md`](tests.md) |
| Bibliografia | [`docs/references.md`](references.md) |
| Especificação detalhada (PRD) | [`PRD.md`](../PRD.md) |
| Roteiro da apresentação | [`presentation/README.md`](../presentation/README.md) |

---

## 7. Links Úteis sobre Wireframing e Prototipagem

> - [Protótipos vs Wireframes (Nielsen Norman Group)](https://www.nngroup.com/videos/prototypes-vs-wireframes-ux-projects/)
> - [Ferramentas de Wireframes (Rock Content)](https://rockcontent.com/blog/wireframes/)
> - [Figma](https://www.figma.com/)
> - [MarvelApp](https://marvelapp.com/developers/documentation/tutorials/)
> - [Adobe XD](https://www.adobe.com/br/products/xd.html)
> - [Axure (Licença Educacional)](https://www.axure.com/edu)
> - [InvisionApp (Licença Educacional)](https://www.invisionapp.com/)
