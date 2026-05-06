
# Projeto de Interface

Visão geral da interação do usuário pelas telas do sistema e protótipo interativo das telas com as funcionalidades que fazem parte do sistema (wireframes)
## User Flow
[Flow.pdf](https://github.com/user-attachments/files/26802084/Flow.pdf)

Nesse documento, apresentamos a interface principal do nosso aplicativo, explicando as suas seguintes funcionalidades e como elas pode ser utilizadas pelo usuário para que ele cumpra o próposito de auxiliar tanto o paciente, quanto os cuidadores, que possuem o espelho do perfil do indivíduo no qual ele zela, além dos profissionais da saúde, que assim, conseguem ter acesso ao registro de todos os seus pacientes, podendo organizar melhor seus prontuários, mas também ter um controle muito maior sobre o bem-estar deles no dia-a-dia. 


## Protótipo de baixa fidelidade

As telas do sistema apresentam uma estrutura comum que é apresentada na figura 2. Nesta estrutura existem 3 grandes blocos, descritos a seguir. São eles:
<ul>
  <li>Cabeçalho - local onde estão dispostos o nome da aplicação web e navegação principal do site (menu da aplicação);</li>
  <li>Conteúdo - apresenta o conteúdo da tela em questão;</li>
  <li>Rodapé - apresenta informações sobre os direitos autorais.</li>
</ul>

<figure> 
  <img src="https://user-images.githubusercontent.com/100447878/164074128-7b006e50-8621-4964-b0fd-07a90e626673.png"
    <figcaption>Figura 2 - Estrutura padrão do site
</figure> 
<hr>

<h3><b>Tela – Cadastro</b></h3>
<p>A tela de cadastro apresenta os seguintes campos para a inserção das informações pessoais do usuário paciente: Nome Completo, CPF, Senha, data de nascimento, sexo do paciente, qual a doença crônica, tipo sanguineo, alergias, opção para aceitar os termos de uso e botão de cadastro.</p> <p>Também tem a o cadastro para o Cuidador, que assim como o paciente apresenta CPF e senha.</p> <p>E para finalizar a area de cadastro, temos o cadastro do médico, que requer nome completo, CPF, CRM, e senha.</p>
  
  ![cadastro](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/blob/main/docs/img/Captura%20de%20tela%202026-04-16%20085202.png)
  ![cadastro](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/blob/main/docs/img/Captura%20de%20tela%202026-04-16%20085359.png)
![cadastro](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/blob/main/docs/img/Captura%20de%20tela%202026-04-16%20085410.png)

<figure> 
    <figcaption> - Tela de cadastro de usuários
</figure>
<hr> 

<h3><b>Tela – Login</b></h3>
<p>A tela de Login apresenta campos para a inserção da ocupação do usuario ( paciente, cuidador e médico), do CPF/e-mail, da senha, e a funcionalidade de recuperar a senha caso tenha esquecido.</p>

![login](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/blob/main/docs/img/Captura%20de%20tela%202026-04-16%20094527.png)


<figure> 
    <figcaption> - Tela de acesso à conta do usuário
</figure>
<hr>

<h3><b>Tela - Home page</b></h3>
<p>A tela de home page tem funções focadas no controle de medicamentos com visual limpo e moderno, focado em acompanhamento diário. Apresenta algumas funcionalidades disponiveis, como a seção “Próximos Remédios (Hoje)”, contendo medicamentos em cartões separados.<br> Cada item possui um botão circular à direita, para marcar o remédio como tomado.<p> Mais abaixo existe a seção “Evolução Glicêmica”, com um gráfico de linha azul mostrando a variação da glicemia do paciente ao decorrer de alguns dias.</p> <p>No canto inferior direito há um botão flutuante laranja com símbolo de “+”, sugerindo adicionar nova medição ou medicamento.</p><p> Na parte inferior da tela existe uma barra de navegação com 4 abas:</p> <br>

Início (selecionada em azul)
Histórico
Remédios
Perfil   </p>

![homepage](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/blob/main/docs/img/Screenshot%202026-05-06%20083449.png)

<figure> 
  <figcaption> - Tela home page
</figure> 
<hr>

<h3><b>Tela- Histórico</b></h3>
<p>A tela mostra a seção “Meu Histórico” focada no acompanhamento cronológico de registros médicos e medições.</p>
<p>No topo há:<br>
o título “Meu Histórico”;
 uma barra de pesquisa com o texto: 
 “Buscar por exames, consultas…”;
e um botão de filtro com ícone de funil ao lado.</p>

<P>Logo abaixo existe um botão grande com borda azul escrito:
“Anexar Exame/Laudo”
com um ícone de upload, indicando envio de documentos médicos.</p>
<p>Na parte inferior há uma barra de navegação com:

Início, 
Histórico (selecionado em azul), 
Remédios e 
Perfil assim como na tela anterior</p>

![Histórico](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/blob/main/docs/img/Screenshot%202026-05-06%20083536.png)

<figure> 
  <figcaption> - Tela Histórico
</figure> 
<hr>

<h3><b>Tela - Remédios</b></h3>
<p>A tela mostra a seção “Meus Medicamentos” voltada para gerenciamento de remédios e horários.<br>
No topo há:<br>

O título “Meus Medicamentos”;<br>
Um botão grande com borda azul escrito:<br>
“+ Novo Medicamento” usado para adicionar novos remédios.</p>
<p>Abaixo aparecem cards individuais para cada medicamento cadastrado. Todos seguem um layout semelhante:<br>

Nome do remédio em destaque;<br>
Horário inicial;<br>
Frequência de uso em uma etiqueta verde;<br>
Botões de editar e excluir no canto direito.</p>

![Remédios](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/blob/main/docs/img/Screenshot%202026-05-06%20083600.png)

<figure> 
  <figcaption> - Tela Remédios
</figure> 
<hr>

<h3><b>Tela - Perfil</b></h3>
<p>Essa tela representa a aba de Perfil do aplicativo, com foco nas informações pessoais e gestão de cuidadores.<br>
No topo aparece o nome de usuário e abaixo o CPF<br>
Dados Clínicos Básicos; Um card com informações de saúde:<br>
Idade, 
 Sexo biológico, 
 Tipo sanguíneo, 
 Alergias, 
 Condições crônicas. <br>
 A segunda seção é “Meus Cuidadores”, também em um card expansível. Ela mostra o nome do cuidador, o CPF e um selo para indicar se ele esta ativo ou inativo.<br>
Abaixo existem dois botões se referindo ao cuidador:<br>

Editar (azul)<br>
Excluir (vermelho)<br>

E logo abaixo:<br>

botão “+ Adicionar Cuidador”.<br>

Mais abaixo aparece um botão azul sólido grande:<br>
“Gerar Relatório Clínico PDF” com ícone de documento, sugerindo exportação do histórico médico.<br>

Na parte inferior da tela há parcialmente visível um botão vermelho claro:<br>
“Sair da Conta”

![Perfil](https://github.com/ICEI-PUC-Minas-PMV-SI/pmv-si-2026-1-pe1-t3-portal-do-paciente-cronico/blob/main/docs/img/Screenshot%202026-05-06%20083637.png)

<figure> 
  <figcaption> - Tela Perfil
</figure> 
<hr>
</p>



 
> **Links Úteis**:
> - [Protótipos vs Wireframes](https://www.nngroup.com/videos/prototypes-vs-wireframes-ux-projects/)
> - [Ferramentas de Wireframes](https://rockcontent.com/blog/wireframes/)
> - [MarvelApp](https://marvelapp.com/developers/documentation/tutorials/)
> - [Figma](https://www.figma.com/)
> - [Adobe XD](https://www.adobe.com/br/products/xd.html#scroll)
> - [Axure](https://www.axure.com/edu) (Licença Educacional)
> - [InvisionApp](https://www.invisionapp.com/) (Licença Educacional)
