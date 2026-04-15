# Especificações do Projeto

## Perfis de Usuários
### Paciente Crônico

<table>
  <tr>
    <td><strong>Descrição:</strong></td>
    <td>Adulto ou idoso portador de condições como diabetes ou hipertensão, que possui familiaridade básica ou intermediária com smartphones e necessita de acompanhamento contínuo de saúde.</td>
  </tr>
  <tr>
    <td><strong>Necessidades:</strong></td>
    <td>Interface simples e com botões grandes; facilidade para registrar medições diárias (glicose, pressão); lembretes visuais e sonoros para horários fracionados de medicamentos.</td>
  </tr>
</table>

### Familiar / Cuidador

<table>
  <tr>
    <td><strong>Descrição:</strong></td>
    <td>Pessoa responsável por auxiliar ou monitorar o tratamento do paciente (filho, neto ou profissional), com bom domínio tecnológico.</td>
  </tr>
  <tr>
    <td><strong>Necessidades:</strong></td>
    <td>Capacidade de registrar dados em nome do paciente; acesso rápido a relatórios de adesão ao tratamento; compartilhamento de informações de forma ágil.</td>
  </tr>
</table>

### Profissional de Saúde (UBS)

<table>
  <tr>
    <td><strong>Descrição:</strong></td>
    <td>Médico ou enfermeiro da rede de Atenção Primária que realiza o acompanhamento periódico do paciente. Tem tempo de consulta limitado e lida com alto volume de atendimentos.</td>
  </tr>
  <tr>
    <td><strong>Necessidades:</strong></td>
    <td>Visualização de um painel (dashboard) resumido e gráfico do histórico do paciente; leitura rápida e clara das tendências de saúde (ex: picos de glicemia ou pressão) para embasar decisões clínicas rápidas.</td>
  </tr>
</table>


## Histórias de Usuários

Com base na análise das personas forma identificadas as seguintes histórias de usuários:

|     EU COMO... `PERSONA`     | QUERO/PRECISO ... `FUNCIONALIDADE` |PARA ... `MOTIVO/VALOR`                 |
|-----------------------------|------------------------------------------|---------------------------------|
|Paciente Crônico  | registrar minha medição de glicemia/pressão diária em poucos cliques e de forma intuitiva | manter um histórico preciso e não precisar anotar em cadernos de papel que posso perder.     |
|Paciente Crônico  | receber alertas no celular nos horários fracionados exatos dos meus medicamentos (ex: 8h, 12h, 18h)  | não esquecer, atrasar ou duplicar nenhuma dose do meu tratamento contínuo. |
|Paciente Crônico  | confirmar que tomei o remédio clicando diretamente na própria notificação do celular | não ter o trabalho de abrir o aplicativo e navegar em menus apenas para uma ação rotineira, evitando a fadiga do uso.  |
|Paciente Crônico  | visualizar um gráfico simples e colorido com a minha própria evolução | me sentir motivado ao ver que a minha pressão ou glicose está estabilizando graças ao meu esforço. |
|Paciente Crônico  | ter um campo rápido para registrar sintomas do dia (ex: "senti tontura", "dor de cabeça") | não esquecer de relatar esses eventos importantes para o médico na minha próxima consulta presencial.|
|Paciente Crônico  |exportar meu histórico de saúde em formato PDF ou enviar por WhatsApp |poder compartilhar rapidamente meus dados caso eu vá a uma emergência ou seja atendido por um médico de fora da minha UBS. |
|Familiar / Cuidador| receber uma notificação no meu celular caso o paciente atrase a medicação em mais de uma hora| poder ligar para ele e lembrá-lo, evitando o descontrole da doença e possíveis complicações.|
|Familiar / Cuidador| poder gerenciar mais de um perfil de paciente no mesmo aplicativo (ex: mãe e pai)|centralizar o cuidado da saúde da minha família em um único lugar, sem precisar de várias contas.|
|Familiar / Cuidador| registrar a data e horário da próxima consulta médica ou ida ao posto de saúde | organizar a minha rotina com antecedência para poder acompanhá-lo no dia do atendimento.|
|Profissional de Saúde| visualizar um painel (dashboard) com o gráfico de saúde dos últimos 30 dias gerado pelo celular do paciente| ajustar a dosagem da medicação com base em dados reais e atualizados, sem depender apenas da memória do paciente durante a consulta. |
|Profissional de Saúde| visualizar alertas ou destaques visuais (em vermelho, por exemplo) nas medições que fugiram da meta| identificar rapidamente picos de pressão ou hipoglicemia, economizando tempo de análise durante a consulta curta.|
|Profissional de Saúde| visualizar a lista consolidada de quais medicamentos o paciente marcou como "em uso" no aplicativo| cruzar com o meu receituário para garantir que ele entendeu a prescrição e evitar interações medicamentosas perigosas.|


## Requisitos

As tabelas que se seguem apresentam os requisitos funcionais e não funcionais que detalham o escopo do projeto.

### Requisitos Funcionais

|ID      | Descrição do Requisito  | Prioridade | 
|--------|-----------------|----| 
|RF-01| Autenticação e Cadastro: O sistema deve permitir o cadastro e o acesso seguro (login/logout) para pacientes, cuidadores e profissionais de saúde.  | ALTA |
|RF-02| Perfil de Saúde: O sistema deve permitir que o paciente cadastre e edite informações básicas de saúde (doenças crônicas, alergias, tipo sanguíneo). | ALTA | 
|RF-03| Registro de Medicamentos: O sistema deve permitir que o usuário registre seus medicamentos de uso contínuo, informando dosagem e horários fracionados. | ALTA |
|RF-04| Sistema de Alertas: O sistema deve emitir notificações/alertas visuais na interface para lembrar o paciente sobre o horário exato da medicação. | ALTA |
|RF-05| Registro de Medições Diárias: O sistema deve disponibilizar um formulário simplificado para o registro rápido de medições de rotina (ex: glicemia e pressão arterial). | ALTA |
|RF-06| Registro de Sintomas: O sistema deve permitir que o paciente registre sintomas diários (descrição e data) para acompanhamento da evolução clínica. | MÉDIA |
|RF-07| Histórico de Exames e Consultas: O sistema deve permitir o cadastro de exames realizados e de consultas médicas, incluindo datas e envio de anexos simples (PDF/Imagens). | MÉDIA |
|RF-08| Dashboard do Paciente (Gráficos): O sistema deve gerar um painel visual (dashboard) com gráficos mostrando a evolução das medições e a adesão ao tratamento nos últimos 30 dias. |ALTA|
|RF-09|Exportação e Compartilhamento: O sistema deve permitir que o paciente exporte seus dados de saúde e histórico (ex: formato PDF) para compartilhar com profissionais fora da plataforma.| MÉDIA|
|RF-10| Busca e Filtro: O sistema deve disponibilizar uma ferramenta de busca para que o usuário localize rapidamente exames, consultas ou medicamentos antigos.| BAIXA|
|RF-11| Perfil Cuidador: O sistema deve permitir o cadastro de um "Perfil Cuidador", que poderá visualizar e ajudar a gerenciar a rotina de saúde do paciente principal|MÉDIA|
|RF-12| Acesso Autorizado do Médico: O sistema deve permitir que o médico acesse o perfil de saúde do paciente (mediante autorização) garantindo a privacidade dos dados.|ALTA|
|RF-13| Visualização Clínica (Dashboard do Médico): O sistema deve permitir que o médico consulte a linha do tempo de sintomas, exames e medições do paciente de forma clara e consolidada.|ALTA|
|RF-14|Observações e Prescrições Médicas: O sistema deve permitir que o médico registre observações clínicas rápidas e atualize a lista de prescrições ativas diretamente no perfil do paciente.|MÉDIA|



### Requisitos não Funcionais

|ID     | Descrição do Requisito  |Prioridade |
|-------|-------------------------|----|
|RNF-01| Acessibilidade Visual: A interface deve possuir botões grandes, tipografia legível (opção de ajuste de tamanho) e alto contraste, visando a facilidade de uso por pacientes idosos ou com visão reduzida. | ALTA | 
|RNF-02| Responsividade: A aplicação Web (Front-end) deve ser totalmente responsiva, com layout que se adapte perfeitamente às telas de smartphones (mobile-first), tablets e desktops. | ALTA | 
|RNF-03| Segurança e Privacidade (LGPD): O sistema deve exigir o aceite de um termo de consentimento explícito para o tratamento de dados sensíveis de saúde, em total conformidade com a LGPD. | ALTA | 
|RNF-04| Eficiência de Uso (Usabilidade): O fluxo principal do sistema (registro diário de medições e confirmação de medicamentos) não deve ultrapassar 3 cliques a partir da tela inicial. | ALTA | 
|RNF-05| Desempenho (Tempo de Carregamento): A interface deve ser otimizada para carregar as telas principais em menos de 3 segundos em redes móveis (3G/4G), considerando que muitos usuários podem acessar da rua ou de UBSs. | ALTA | 
|RNF-06| Segurança da Comunicação: Toda a troca de informações entre o navegador do usuário e o sistema deve ser criptografada, utilizando o protocolo de segurança HTTPS. | ALTA | 
|RNF-07| Segurança de Acesso (Timeout): O sistema deve encerrar a sessão do usuário (logout automático) após 15 minutos de inatividade, evitando a exposição de dados médicos caso o paciente esqueça o celular desbloqueado. | MÉDIA | 
|RNF-08| Tratamento de Erros Amigável: O sistema deve exibir mensagens de erro claras e em linguagem não técnica (ex: "A pressão informada parece incorreta, verifique os números"), evitando jargões de programação que assustem o usuário idoso. | ALTA | 
|RNF-09| Prevenção de Perda de Dados: Em caso de perda momentânea de conexão com a internet, o sistema deve manter os dados digitados no formulário (via cache/local storage do navegador) para que o paciente não precise redigitar tudo. | MÉDIA | 
|RNF-10| Compatibilidade de Navegadores: O Front-end deve ser homologado para funcionar perfeitamente nas versões mais recentes dos principais navegadores do mercado (Google Chrome, Safari, Firefox e Edge). | ALTA | 
|RNF-11| Curva de Aprendizado (Onboarding): No primeiro acesso do paciente, o sistema deve apresentar um rápido tutorial visual e interativo (tooltips) ensinando como registrar o primeiro medicamento e a primeira medição. | BAIXA | 
|RNF-12| Clareza Legal: Os Termos de Uso e Políticas de Privacidade devem ser escritos em linguagem simples e acessível, evitando "juridiquês" excessivo, garantindo que o paciente leigo entenda com o que está concordando. | MÉDIA | 

