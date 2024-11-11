# Tarnished's Help <img src="public/assets/images/logo3.svg.svg" alt="Logo do Projeto" width="200" height="200">


**Tarnished's Help** é um projeto dedicado à comunidade de *Elden Ring*, um RPG de mundo aberto lançado em fevereiro de 2022. O jogo conquistou rapidamente o título de *Jogo do Ano* e continua extremamente popular entre os jogadores. O objetivo do projeto é criar uma plataforma onde os jogadores possam se unir, compartilhar experiências, pedir ajuda e celebrar conquistas.

Este site oferece um espaço para a comunidade de *Elden Ring* colaborar, com funcionalidades como:

- **Fórum de Ajuda:** Jogadores podem fazer perguntas sobre desafios ou pedir ajuda para encontrar o caminho.
- **Celebração de Conquistas:** Espaços para comemorar vitórias e conquistas no jogo, onde todos podem celebrar os feitos dos outros.

O objetivo é facilitar a interação entre jogadores, permitindo que todos se ajudem mutuamente e compartilhem suas experiências de jogo.

<img src="public/assets/images/primeiraPrint.png" alt="Inicio do site" width="300" height="800">

## Funcionalidades

- **Fórum de Discussão:** Os jogadores podem criar tópicos de discussão, pedir dicas ou respostas para problemas específicos.
- **Sistema de Ajuda:** Jogadores mais experientes podem responder aos pedidos de ajuda, oferecendo dicas ou soluções.
- **Celebração de Conquistas:** Um espaço para comemorar vitórias, derrotas de bosses difíceis, ou qualquer outra conquista no jogo.
- **Comunidade Ativa:** Um espaço para a troca constante de dicas, estratégias e experiências entre os jogadores.

## Tecnologias Usadas

- **Frontend:** *HTML* *CSS* *JS*
- **Backend:** *Node.js*, *Express*
- **Banco de Dados:** *MySQL*


## Instalação e Execução Local

1. Clone este repositório:
   ```bash
   git clone https://github.com/l-furquim/Tarnisheds-Help.git

2. Instale as dependências do projeto: 
   ```bash
   cd Tarnisheds-Help
   npm install

3. Mude o arquivo app.js para o ambiente que deseja (Tire o comentário da primeira linha e comente a segunda para desenvolvimento de vice versa):
   ```javascript
   // var ambiente_processo = 'producao';
   var ambiente_processo = 'desenvolvimento';
   
   var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';

4. Configure seu banco de dados baseado no ambiente escolhido:
   ```dotenv
   AMBIENTE_PROCESSO=producao

   # Configurações de conexão com o banco de dados
   DB_HOST='seusDadosAqui'
   DB_DATABASE='seusDadosAqui'
   DB_USER='seusDadosAqui'
   DB_PASSWORD='seusDadosAqui'
   DB_PORT='seusDadosAqui'
   
   # Configurações do servidor de aplicação
   APP_PORT=8080
   APP_HOST=localhost
   
   # importante: caso sua senha contenha caracteres especiais, insira-a entre 'aspas'

5. Inicie a aplicação e faça proveito dela !
   ```bash
   npm start
