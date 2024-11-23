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
dtFechamento DATETIME,
fkMaculado INT,
CONSTRAINT FOREIGN KEY (fkMaculado) REFERENCES Maculado(idMaculado),
/* CONSTRAINT FOREIGN KEY (fkComentarioResponsavel) REFERENCES Comentario(idComentario), */
CONSTRAINT PRIMARY KEY(idContribuicao, fkMaculado),
CONSTRAINT CHECK (tipo IN ("ajuda", "celebrar", "dica")),
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

ALTER  TABLE Contribuicao ADD FOREIGN KEY (fkComentarioResponsavel) REFERENCES
    Comentario(idComentario);


    -- Inserts para dados ficticios: 

    INSERT INTO Maculado (nome, email, senha, dtCriacao, contribuicoes, maculadosAjudados) VALUES
('Ranni', 'ranni@eldenring.com', 'darkmoon123', '2023-01-01', 10, 50),
('Blaidd', 'blaidd@eldenring.com', 'howlofwar', '2023-01-05', 5, 10),
('Radahn', 'radahn@eldenring.com', 'scarletrot', '2023-02-10', 15, 5),
('Malenia', 'malenia@eldenring.com', 'goddessofrot', '2023-03-15', 20, 12),
('Torrent', 'torrent@eldenring.com', 'fastandfury', '2023-04-20', 2, 25),
('Melina', 'melina@eldenring.com', 'guidinglight', '2023-05-25', 8, 30),
('Godfrey', 'godfrey@eldenring.com', 'firstlord', '2023-06-30', 7, 20),
('Margit', 'margit@eldenring.com', 'fellomenace', '2023-07-10', 3, 5),
('Fia', 'fia@eldenring.com', 'deathbedcompanion', '2023-08-05', 4, 15),
('Rykard', 'rykard@eldenring.com', 'serpentlord', '2023-09-01', 12, 18),
('Mogh', 'mogh@eldenring.com', 'lordofblood', '2023-10-15', 9, 8),
('Marika', 'marika@eldenring.com', 'queenoflands', '2023-11-01', 25, 50),
('Mohg', 'mohg@eldenring.com', 'bloodyshard', '2023-12-25', 11, 6),
('Maliketh', 'maliketh@eldenring.com', 'blackblade', '2023-01-30', 14, 12),
('Seluvis', 'seluvis@eldenring.com', 'puppetsmaster', '2023-02-14', 5, 1),
('Dungeater', 'dungeater@eldenring.com', 'curseoftheomen', '2023-03-01', 2, 0),
('Rogier', 'rogier@eldenring.com', 'magicblade', '2023-04-01', 7, 15),
('Patches', 'patches@eldenring.com', 'trickster123', '2023-05-10', 1, 3),
('TheLoathsome', 'loathsome@eldenring.com', 'dungeater', '2023-06-15', 6, 4),
('Gideon', 'gideon@eldenring.com', 'allknowing', '2023-07-20', 18, 40),
('Sellen', 'sellen@eldenring.com', 'glintstonewitch', '2023-08-01', 9, 22);



INSERT INTO Contribuicao (titulo, conteudo, dtContribuicao, contribuicaoFechada, fkComentarioResponsavel, votos, comentarios, tipo, tag, conteudoTag, dtFechamento, fkMaculado) VALUES
('Como derrotar Margit?', 'Preciso de ajuda com Margit. Ele é muito rápido!', '2023-01-10 15:00:00', TRUE, NULL, 15, 8, 'ajuda', 'Bosses', 'Margit', '2023-01-12 18:00:00', 1),
('Build mágica para Malenia', 'Qual a melhor build mágica para enfrentar Malenia?', '2023-02-05 12:00:00', TRUE, NULL, 25, 15, 'ajuda', 'Bosses', 'Malenia', '2023-02-06 15:00:00', 3),
('Melhor farm de runas', 'Onde posso farmar runas de maneira eficiente?', '2023-03-15 10:30:00', FALSE, NULL, 18, 10, 'dica', 'Armas', 'Runas', NULL, 2),
('Radahn caiu!', 'Consegui derrotar Radahn com uma build de força!', '2023-04-01 18:45:00', TRUE, NULL, 30, 12, 'celebrar', 'Bosses', 'Radahn', '2023-04-02 20:00:00', 6),
('Ajuda com Godrick', 'Godrick parece impossível de derrotar. Alguma dica?', '2023-05-10 14:00:00', FALSE, NULL, 12, 5, 'ajuda', 'Bosses', 'Godrick', NULL, 4),
('Como sobreviver à Scarlet Rot?', 'Estou preso em Aeonia e não consigo evitar a podridão escarlate.', '2023-06-01 09:00:00', FALSE, NULL, 18, 6, 'ajuda', 'Bosses', 'Scarlet Rot', NULL, 7),
('Melhores armas para magia', 'Qual arma escala melhor com Inteligência?', '2023-06-15 14:30:00', FALSE, NULL, 20, 8, 'dica', 'Armas', 'Inteligência', NULL, 5),
('Derrotei Malenia sem tomar dano!', 'Após várias tentativas, consegui vencer sem ser atingido!', '2023-07-05 17:00:00', TRUE, NULL, 50, 10, 'celebrar', 'Bosses', 'Malenia', '2023-07-06 20:00:00', 3),
('Ajuda com Rykard', 'Preciso de ajuda para entender a mecânica da Lança do Matador de Serpentes.', '2023-07-25 12:00:00', FALSE, NULL, 15, 4, 'ajuda', 'Bosses', 'Rykard', NULL, 9),
('Melhor farm no Monte Gelmir', 'Alguém conhece boas rotas de farm no Monte Gelmir?', '2023-08-01 10:00:00', FALSE, NULL, 12, 5, 'dica', 'Armas', 'Monte Gelmir', NULL, 10),
('Como abrir o Cofre de Radahn?', 'Ouvi dizer que há um cofre após derrotar Radahn, como acesso ele?', '2023-08-15 11:30:00', FALSE, NULL, 14, 3, 'ajuda', 'Bosses', 'Radahn', NULL, 6),
('Build para PvP eficiente', 'Qual build funciona melhor em duelos PvP?', '2023-09-05 16:00:00', TRUE, NULL, 35, 12, 'dica', 'Armas', 'PvP', '2023-09-06 19:00:00', 8),
('Cheguei ao Platô Altus!', 'Finalmente desbloqueei o elevador. O que vem agora?', '2023-09-25 08:45:00', TRUE, NULL, 25, 8, 'celebrar', 'Armas', 'Altus', '2023-09-26 12:00:00', 12),
('Ajuda para Elden Beast', 'O último chefe é impossível! Alguma estratégia?', '2023-10-01 14:15:00', FALSE, NULL, 28, 10, 'ajuda', 'Bosses', 'Elden Beast', NULL, 11),
('Armas para matar dragões', 'Qual a melhor arma contra dragões? Sinto que sempre morro muito rápido.', '2023-10-10 19:30:00', FALSE, NULL, 16, 5, 'dica', 'Armas', 'Dragões', NULL, 15),
('Melhores summons para bosses', 'Quais summons ajudam mais nos combates contra bosses?', '2023-10-20 18:30:00', FALSE, NULL, 22, 7, 'dica', 'Armas', 'Summons', NULL, 14),
('Por que a lua está vermelha?', 'Algo mudou em minha sessão, e agora tudo está sombrio. O que aconteceu?', '2023-11-01 21:00:00', TRUE, NULL, 10, 3, 'ajuda', 'Bosses', 'Lua Vermelha', '2023-11-02 11:00:00', 18),
('Dicas para explorar Nokron', 'Preciso de ajuda para encontrar os itens escondidos em Nokron.', '2023-11-10 15:45:00', TRUE, NULL, 18, 4, 'ajuda', 'Armas', 'Nokron', '2023-11-11 16:30:00', 16),
('Qual a melhor armadura leve?', 'Estou procurando uma armadura leve que proteja bem. Alguma sugestão?', '2023-11-20 13:00:00', FALSE, NULL, 12, 5, 'dica', 'Armas', 'Armadura Leve', NULL, 13),
('Segredo do Castelo de Stormveil', 'Encontrei uma porta trancada em Stormveil. Alguém sabe como abrir?', '2023-12-01 09:30:00', TRUE, NULL, 30, 9, 'ajuda', 'Bosses', 'Stormveil', '2023-12-02 18:00:00', 20),
('Dicas para derrotar o Radagon', 'Radagon pode ser derrotado se você focar na evasão e usar magias de longo alcance...', '2024-11-23 10:00:00', FALSE, NULL, 15, 3, 'ajuda', 'Bosses', 'Radagon', NULL, 1),
('Como conseguir a Espada do Elden', 'A espada do Elden pode ser obtida na caverna escondida...', '2024-11-22 12:30:00', FALSE, NULL, 25, 10, 'dica', 'Armas', 'Espada do Elden', NULL, 2),
('Vitoria sobre a Malenia', 'Se você conseguir evitar os ataques de Malenia durante a fase 2...', '2024-11-21 08:15:00', TRUE, 2, 50, 5, 'celebrar', 'Bosses', 'Malenia', '2024-11-23 14:00:00', 3);



INSERT INTO Comentario (conteudo, fkContribuicao, fkMaculado, responsavelPorFechar, qtdVotos, dtComentario) VALUES
('Use uma arma sangrenta contra Margit!', 1, 2, TRUE, 25, '2023-01-11 10:00:00'),
('Magia ajuda muito contra Margit!', 1, 3, FALSE, 20, '2023-01-11 12:00:00'),
('Para Malenia, foque em status de sangramento.', 2, 4, TRUE, 30, '2023-02-05 14:00:00'),
('Tente invocar aliados para enfrentar Radahn.', 4, 5, FALSE, 15, '2023-04-01 20:00:00'),
('Godrick é fraco contra fogo. Use bombas incendiárias!', 5, 6, FALSE, 12, '2023-05-11 16:00:00'),
('Use bolos preservativos para evitar a Scarlet Rot.', 6, 3, FALSE, 15, '2023-06-01 10:00:00'),
('Magias de cura ajudam bastante em Aeonia.', 6, 5, FALSE, 20, '2023-06-01 12:00:00'),
('A Moonveil é incrível para builds mágicas!', 7, 6, FALSE, 35, '2023-06-15 16:00:00'),
('Tente usar o cajado de Lusat para mais dano.', 7, 7, FALSE, 40, '2023-06-15 18:00:00'),
('Parabéns por derrotar Malenia! Build muito boa!', 8, 4, TRUE, 50, '2023-07-05 18:30:00'),
('Para Rykard, abuse da Lança do Matador de Serpentes.', 9, 8, FALSE, 30, '2023-07-25 13:00:00'),
('Farm no Monte Gelmir: enfrente os Magos da Academia.', 10, 9, FALSE, 18, '2023-08-01 11:00:00'),
('Depois de Radahn, vá para Nokron. Está relacionado.', 11, 10, FALSE, 25, '2023-08-15 12:00:00'),
('Use escudos leves para evitar o dano de PvP.', 12, 11, TRUE, 30, '2023-09-05 17:00:00'),
('Para Altus, siga até a Árvore Sagrada.', 13, 12, FALSE, 15, '2023-09-25 09:00:00'),
('Elden Beast é vulnerável à Holy Damage.', 14, 11, FALSE, 28, '2023-10-01 15:00:00'),
('Invocações como Mimic Tear são muito úteis.', 15, 14, FALSE, 22, '2023-10-20 19:00:00'),
('A lua vermelha é causada pelo final de Ranni.', 16, 18, TRUE, 10, '2023-11-01 22:00:00'),
('Nokron esconde uma grande espada, procure no altar.', 17, 16, FALSE, 18, '2023-11-10 16:00:00'),
('Armaduras leves como a de Melina são ótimas.', 18, 13, FALSE, 12, '2023-11-20 13:30:00');


INSERT INTO Voto (fkContribuicao, fkMaculado) VALUES
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(3, 6),
(4, 7),
(5, 8),
(1, 9),
(2, 10),
(3, 11),
(4, 12),
(5, 13),
(1, 14),
(2, 15),
(3, 16),
(4, 17),
(5, 18),
(1, 19),
(2, 20),
(3, 21);

UPDATE Contribuicao c
SET fkComentarioResponsavel = (
    SELECT idComentario
    FROM Comentario com
    WHERE com.fkContribuicao = c.idContribuicao
    AND com.responsavelPorFechar = TRUE
    LIMIT 1
)
WHERE contribuicaoFechada = TRUE;
