# Documentação de Contexto

## Introdução

A gestão da saúde no Brasil, especialmente na **Atenção Primária à Saúde (UBS)**, enfrenta o desafio de acompanhar pacientes fora do ambiente clínico. Doenças crônicas, como **diabetes** e **hipertensão arterial**, exigem monitoramento diário e disciplina no tratamento.

Apesar de existirem sistemas voltados à gestão hospitalar, ainda há uma lacuna em ferramentas focadas na rotina e no engajamento do paciente. Isso dificulta o acompanhamento contínuo e a adesão ao tratamento.

Este projeto propõe uma interface de **Registro Pessoal de Saúde** (do inglês *Personal Health Record* — PHR), permitindo que o usuário monitore sua evolução de forma simples e contínua, promovendo mais autonomia e cuidado com a própria saúde.

## Problema

O principal problema é a **baixa adesão dos pacientes ao acompanhamento diário de doenças crônicas**, causada pela falta de praticidade e pela fadiga no registro de informações. Isso leva à negligência no uso de medicamentos e na frequência das medições.

No contexto da Atenção Primária à Saúde no Brasil, especialmente nas Unidades Básicas de Saúde (UBS), os sistemas atuais não apoiam a rotina diária do paciente, resultando em perda de dados importantes. Essa falha compromete o acompanhamento clínico e contribui para a sobrecarga do sistema público de saúde.

## Objetivos

O objetivo geral deste projeto é desenvolver uma **aplicação Web** (focada inicialmente em Front-end) que atue como um Registro Pessoal de Saúde otimizado para a rotina de pacientes crônicos.

Como objetivos específicos, o projeto visa:

* **Projetar uma interface (UX/UI) altamente intuitiva** que reduza o atrito no registro diário de dados de saúde (medicamentos tomados, medições de rotina), com tutorial guiado no primeiro acesso para facilitar o aprendizado.
* **Estruturar um painel visual (dashboard)** que consolide o histórico do paciente, com alertas visuais para medições fora do alvo clínico, facilitando a rápida leitura e a tomada de decisão pelo profissional de saúde durante o atendimento na UBS.
* **Apoiar o cuidado compartilhado**, oferecendo um perfil específico para familiares/cuidadores que possam acompanhar e registrar dados em nome do paciente principal.
* **Criar um ambiente digital que respeite as diretrizes de privacidade** previstas na Lei Geral de Proteção de Dados — **LGPD** ([Lei nº 13.709/2018](../docs/references.md)) — servindo como uma camada complementar que empodera o paciente a ser o dono dos seus próprios dados de saúde.


## Justificativa

A escolha do tema se justifica pela **alta incidência de doenças crônicas no Brasil**, que afetam parcela significativa da população adulta e impactam o sistema de saúde. Segundo a Pesquisa Nacional de Saúde (PNS 2019) do IBGE e o relatório *Noncommunicable Diseases Country Profiles* da Organização Mundial da Saúde (OMS), as doenças crônicas não transmissíveis representam a principal causa de morbi-mortalidade no país. A baixa adesão ao tratamento aumenta o risco de complicações e internações evitáveis.

O trabalho foca no acompanhamento de pacientes com condições como **diabetes mellitus tipo 2** e **hipertensão arterial sistêmica**, que exigem monitoramento contínuo e seguem protocolos clínicos bem estabelecidos pela Sociedade Brasileira de Diabetes e pelas Diretrizes Brasileiras de Hipertensão. A relevância é sustentada por dados oficiais consultáveis em [`docs/references.md`](references.md), que reúne a bibliografia completa do projeto.

## Público-Alvo

O público da aplicação está organizado em **três perfis distintos**, detalhados como personas com necessidades específicas em [`docs/especification.md`](especification.md):

* **Pacientes com doenças crônicas** atendidos na Atenção Primária, especialmente adultos e idosos que precisam monitorar sua saúde diariamente e possuem familiaridade básica com tecnologia.
* **Familiares ou cuidadores**, com maior domínio de smartphones e foco na praticidade, que ajudam a gerenciar a rotina de tratamento do paciente principal.
* **Profissionais de saúde da UBS** (médicos e enfermeiros), que utilizam sistemas digitais e precisam de informações claras e consolidadas para apoiar decisões clínicas durante o tempo limitado de consulta.

---

## Documentação Complementar

| Tema | Documento |
|---|---|
| Personas, histórias de usuário e requisitos | [`docs/especification.md`](especification.md) |
| Telas, wireframes e design system | [`docs/interface.md`](interface.md) |
| Mapeamento de requisitos para arquivos de código | [`docs/development.md`](development.md) |
| Plano de testes e cenários de usabilidade | [`docs/tests.md`](tests.md) |
| Bibliografia (ABNT) | [`docs/references.md`](references.md) |
| Especificação detalhada (PRD) | [`../PRD.md`](../PRD.md) |
