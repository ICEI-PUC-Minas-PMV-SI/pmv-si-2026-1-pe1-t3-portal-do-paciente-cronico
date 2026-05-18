# Template Padrão — Etapa 2

Este documento reúne o **template visual inicial** que serviu como ponto de partida do projeto de interface, junto com um resumo de como ele evoluiu até a versão final implementada.

> 🎯 **Como ler este documento:** o template registrado aqui representa **a primeira iteração de design** discutida pela equipe na Etapa 2 do plano de desenvolvimento. A versão **detalhada e atual** das telas, com todos os refinamentos e componentes derivados, está documentada em [`docs/interface.md`](interface.md).

---

## 1. Template Original

📄 **[Template.pdf](https://github.com/user-attachments/files/26800900/Template.pdf)** — Arquivo PDF com o template visual base utilizado como referência para o projeto.

O template estabeleceu os primeiros padrões estruturais do produto:

- **Layout em três blocos** (cabeçalho · conteúdo · rodapé) — mantido em todas as telas finais
- **Bottom-nav** com 4 abas (Início · Histórico · Remédios · Perfil) para os perfis paciente/cuidador
- **Sidebar lateral** para o perfil profissional de saúde
- **FAB** (botão flutuante) para registro rápido no dashboard
- Paleta inicial com azul como cor primária

---

## 2. Como o Template Evoluiu até a Versão Final

A equipe expandiu o template em **componentes mais ricos** e introduziu **padrões UI adicionais** ao longo das Etapas 3 e 4 (programação de funcionalidades), conforme detalhamento abaixo:

| Componente | No template original | Na versão final |
|---|---|---|
| **Botão de novo registro** | FAB redondo com apenas o ícone `+` | FAB estendido em formato pílula, com ícone `+` **e texto "Novo Registro"** (deixa o propósito explícito) |
| **Bottom-sheet de registro** | Modal simples com 3 abas e inputs lineares | Header com ícone, abas em pílula, **value cards** com números grandes e faixa informativa de referências clínicas |
| **Identificação do cuidador** | Não previsto | **Banner laranja persistente** no topo de todas as telas mostrando o paciente representado |
| **Tutorial de primeiro acesso** | Não previsto | **Tour guiado interativo** com spotlight pulsante, setas e contador de passos (RNF-11) |
| **Status / Alertas no Dashboard** | Cartão estático de boas-vindas | **Status card adaptativo** (verde/azul/vermelho) que muda conforme as últimas medições |
| **Lista de pacientes do médico** | Cards com badge único "Estável" | Cards com **badge dinâmico** ("Estável" ou "Alerta!") + descrição do motivo abaixo do CPF |
| **Paleta** | Azul primário | Azul primário + **laranja de acento** (CTAs, banner do cuidador, FAB) |

---

## 3. Onde Ver a Interface Atual

- 🔗 **Aplicação rodando online:** [GitHub Pages do projeto](https://icei-puc-minas-pmv-si.github.io/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/src/)
- 🎨 **Projeto de Interface completo:** [`docs/interface.md`](interface.md) — descrição detalhada de cada tela, componentes reutilizáveis e design system
- 🛠️ **Mapeamento RF → tela → código:** [`docs/development.md`](development.md)
- 🎨 **Design System (variáveis CSS):** [`src/css/variables.css`](../src/css/variables.css) e [`src/css/components.css`](../src/css/components.css)
