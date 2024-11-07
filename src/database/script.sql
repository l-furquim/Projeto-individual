CREATE DATABASE TarnishedsHelp;

USE TarnishedsHelp;

-- Criação da tabela dos maculados (usuarios)

CREATE TABLE Maculado
(
idMaculado INT PRIMARY KEY AUTO_INCREMENT,
nome VARCHAR(45),
email VARCHAR(45),
senha VARCHAR(45),
dtCriacao DATE,
contribuicoes INT,
maculadosAjudados INT
);

-- Criação da tabela de contribuição(posts)

CREATE TABLE Contribuicao
(
idContribuicao INT AUTO_INCREMENT,
titulo VARCHAR(45),
conteudo VARCHAR(300),
dtContribuicao DATETIME,
contribuicaoFechada BOOLEAN,
fkComentarioResponsavel INT,
votos INT,
comentarios INT,
tipo VARCHAR(20),
tag VARCHAR(45),
conteudoTag VARCHAR(45),
fkMaculado INT,
CONSTRAINT FOREIGN KEY (fkMaculado) REFERENCES Maculado(idMaculado),
/* CONSTRAINT FOREIGN KEY (fkComentarioResponsavel) REFERENCES Comentario(idComentario), */
CONSTRAINT PRIMARY KEY(idContribuicao, fkMaculado),
CONSTRAINT CHECK (tipo IN ("Ajuda", "Celebrar", "Dica")),
CONSTRAINT CHECK (tag IN ("Bosses", "Armas"))
);



-- Criação da tabela de Comentario

CREATE TABLE Comentario(
  idComentario INT AUTO_INCREMENT,
  conteudo VARCHAR(100),
  fkContribuicao INT,
  fkMaculado INT,
  responsavelPorFechar BOOLEAN,
  qtdVotos INT,
  dtComentario DATETIME,

  CONSTRAINT FOREIGN KEY (fkContribuicao)
     REFERENCES Contribuicao(idContribuicao),

  CONSTRAINT FOREIGN KEY(fkMaculado)
    REFERENCES Maculado(idMaculado),

  CONSTRAINT PRIMARY KEY(idComentario, fkContribuicao, fkMaculado)
);

-- Criação da tabela de votos (likes)

CREATE TABLE Voto ( 
idVoto INT AUTO_INCREMENT, 
fkContribuicao INT, 
fkMaculado INT, 
CONSTRAINT FOREIGN KEY (fkContribuicao)
   REFERENCES Contribuicao(idContribuicao), 
CONSTRAINT FOREIGN KEY (fkMaculado) 
  REFERENCES Maculado(idMaculado), 
CONSTRAINT PRIMARY KEY(idVoto, fkContribuicao, fkMaculado)
);