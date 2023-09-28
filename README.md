# ProdNote

[![Licence](https://img.shields.io/badge/license-AGPLv3-green.svg?style=flat)](https://choosealicense.com/licenses/agpl-3.0/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-green.svg?style=flat)](http://commitizen.github.io/cz-cli/)
![Jest friendly](https://img.shields.io/badge/tested%20with-JEST-brightgreen.svg?style=flat&logo=jest)
![TypeScript](https://img.shields.io/badge/Made%20with-typescript-%23007ACC.svg?style=flat&logo=typescript)

O _**"ProdNote"**_ é uma aplicação web para PCP (Planejamento e Controle de Produção), ela permite registrar a quantidade de itens produzidos através da leitura de QrCodes, gerar relatórios de produção, realizar análise dos indicadores de produção com dashboards, além de contar com um sistema de usuários que possibilita segmentar o acesso aos recursos de acordo com as permissões de cada usuário.

![image2](https://raw.githubusercontent.com/leandrosantino/prodnote/master/docs/image2.PNG)
![image1](https://raw.githubusercontent.com/leandrosantino/prodnote/master/docs/image1.PNG)

## Como surgiu a ideia do projeto

O ***"prodnote"*** foi idealizado para solucionar o problema de uma fábrica de tetos e revestimentos internos para veículos. Eles estavam com dificuldade para gerenciar a quantidade de peças produzidas por dia. Antes da implementação do projeto essa gestão era feita de forma totalmente manual, o que gerava muitos erros e gargalos no processo.

Então o ***"prodnote"*** veio com o objetivo de facilitar o gerenciamento dos produtos através da automatização das tarefas que antes eram feitas de forma manual, e isso seria feito através de etiquetas com qrCodes que seriam coladas na embalagem do produto, e então o produto só seria liberado para o estoque quando essas etiquetas fossem registradas no sistema.

Esta solução não só resolveria o problema do gargalo na gestão dos produtos, mas também permitiria o surgimento de uma base de dados centralizada com o histórico de produção da fábrica, e através desses dados seria possível a criação de relatórios e dashboards, que seriam utilizados para auxiliar a tomada de decisões no setor administrativo.

Com a ideia pronta, um MVP do sistema foi criado e testado. Ele funcionou perfeitamente bem, foi necessário alguns ajustes durante o o processo, mas o objetivo foi atingido. Durante os teste foi notado que com as informações armazenadas pelo sistema poderia ser gerado os valores de alguns indicadores importantes da fábrica como o OEE (Overall Equipment Effectiveness), mas para isso seria necessário mais algumas informações. Então foi decidido que seria criado um sistema centralizado que captaria todos esses dados, e gerenciaria tudo isso para fornecer as informações necessárias. Dai surgiu a ideia dos usuários para restringir o acesso as funcionalidades entre os setores da fábrica. por fim tudo isso levou a construção do ***"prodnote"*** como um sistema de PCP (Planejamento e Controle de Produção).

## Veja o ProdNote funcionando
[![tamb](https://raw.githubusercontent.com/leandrosantino/prodnote/master/docs/tamb.png)](https://youtu.be/t-G0onpEY_E)

#### Link para o Repositório

[github.com/leandrosantino/prodnote](https://github.com/leandrosantino/prodnote)

#### Post no Linkeding

[Linkedin - LeandroSantino_ProdNote](https://www.linkedin.com/posts/leandro-santino-7b2717215_fala-galera-blz-estou-desenvolvendo-um-activity-7076725026552524800-2bD2?utm_source=share&utm_medium=member_desktop)

## Funcionalidades

- **Gerar de Etiquetas**
  * Criar etiquetas de produtos produzido, já com o qrCode e com códigos de identificação únicos.
  * Alterar a quantidades das embalagem em caso de embalagens fracionadas

- **Gerenciar Produtos**
  * Registrar Produtos
  * Atualizar as Informações
  * Excluir Produtos ***(adm)***

- **Gestão de Eficiência de Produção**
  * Formulário de Registro
  * Dashboard

- **Usuário Administrativo**
  * Acesso a todas as outras funcionalidades

## Stack utilizada

**Front-end:**
  - [React](https://react.dev/);
  - [typescript](https://www.typescriptlang.org/);
  - [styledComponents](https://styled-components.com/);
  - [react-router-dom](https://reactrouter.com/en/main).

**Back-end:**
  - [Node](https://nodejs.org/en)
  - [typescript](https://www.typescriptlang.org/)
  - [fastify](https://www.fastify.io/)
  - [trpc](https://trpc.io/)
  - [zod](https://zod.dev/)


## Instalação

Para rodar o projeto na sua máquina, você pode clonar o repositprio con o comando:

```bash
  git clone https://github.com/leandosantino/prodnote.git
```
Depois de clonado entre na pasta do projeto.

Para inicializar o sistema será necessário executar dois comando, um para o servidor e outro para o react, cada comando deve ser executado em um instância do cmd.

### Servidor:

```bash
  npm run server
```
### React:

```bash
  npm run dev
```
Pronto o sistema estará funcionando na sua rede local.

## Aprendizados

Com o desenvolvimento deste projeto pude aplicar diversos conceitos de programação que aumentaram significativamente o meu conhecimento, como:

- **Programação orientada a objetos:** minha linguagem mãe é o javascript, que a no geral é utilizada com o paradigma funcional, por isso a minha forma de pensar sempre foi do ponto de vista funcional, com o ***"prodnote"*** optei por sair da zona de conforto e aplicar o paradigma de orientação a objetos, esta escolha me trouxe um ponto de vista completamento novo, o que expandiu os meus horizontes, trazendo flexibilidade na forma como eu construo as minhas soluções.

- **SOLID**: quando comecei a estudar POO, acabei descobrindo os princípios SOLID, e decidir aproveitar a deste projeto para estudar estes conceitos e poder aplicar-los ná prática.

- **Design Patterns**: junto com o SOLID, vinharam alguns padrões de design como o "Repository Pattern", que eram necessários para a implementação do mesmo, o que mes fez conhecer padrões muito interessantes, que com certeza levarei por toda minha carreira.

- **Testes Automatizados**: o ***"prodnote"*** também me permitiu aplicar pela primeira vês, testes automatizados, com isso tive a oportunidade de aprender muito sobre a utilização do "jest" e nos métodos de testes.

Além dos pontos citados também testei e aprendi a utilizar bibliotecas como: **commitzen, commintLint, lintstage, husk e eslint**. Essas libs me permitiram padronizar o projeto tanto no código quanto nas mensagens de commits do repositório.

## Licença

Este software é licenciado sob a [AGPLv3](https://github.com/leandrosantino/prodnote/blob/master/LICENSE)
