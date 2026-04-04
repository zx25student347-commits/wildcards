-- ROLES
INSERT INTO roles (id, nombre) VALUES (1, 'ROLE_ADMIN');
INSERT INTO roles (id, nombre) VALUES (2, 'ROLE_USER');

-- USUARIOS (Contraseña para ambos: "1234")
-- La contraseña está hasheada con BCrypt
INSERT INTO usuarios (id, username, password, enabled) VALUES (1, 'admin@wildcards.com', '$2a$10$q/JMM6FUS4XXmdKbvOwHW.D07r8PppiIQG/WWop.4hDpEk.Wkfvh6', 1);
INSERT INTO usuarios (id, username, password, enabled) VALUES (2, 'user@wildcards.com', '$2a$10$q/JMM6FUS4XXmdKbvOwHW.D07r8PppiIQG/WWop.4hDpEk.Wkfvh6', 1);

-- USUARIOS_ROLES
INSERT INTO usuarios_roles (usuario_id, rol_id) VALUES (1, 1); -- Admin tiene ROLE_ADMIN
INSERT INTO usuarios_roles (usuario_id, rol_id) VALUES (1, 2); -- Admin tiene ROLE_USER
INSERT INTO usuarios_roles (usuario_id, rol_id) VALUES (2, 2); -- User tiene ROLE_USER

-- JUEGOS
INSERT INTO juego (juego_id, nombre, descripcion, web_oficial) VALUES (1, 'Pokémon TCG', 'Pokémon Trading Card Game', 'https://tcg.pokemon.com');
INSERT INTO juego (juego_id, nombre, descripcion, web_oficial) VALUES (2, 'Magic: The Gathering', 'Magic: The Gathering', 'https://magic.wizards.com');
INSERT INTO juego (juego_id, nombre, descripcion, web_oficial) VALUES (3, 'Yu-Gi-Oh!', 'Yu-Gi-Oh! TCG', 'https://www.yugioh-card.com');
INSERT INTO juego (juego_id, nombre, descripcion, web_oficial) VALUES (4, 'One Piece Card Game', 'One Piece Card Game', 'https://en.onepiece-cardgame.com');

-- SETS
--POKEMON
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (1, 1, 'XY - Phantom Forces', '2014-11-05', 'PHF', 122);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (2, 1, 'Scarlet & Violet Promos (ID)', '2023-03-01', 'SV-P', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (3, 1, 'The Best of XY', '2017-04-21', 'XY', 188);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4, 1, 'XY - Ancient Origins', '2015-08-12', 'AOR', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (5, 1, 'Lillie’s Clefairy ex Special Set', '2025-02-01', 'SV-P', 742);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (6, 1, 'Prismatic Evolutions', '2025-01-17', 'PRE', 175);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (7, 1, 'XY - Breakthrough', '2015-02-11', 'BKT', 122);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (8, 1, 'Scarlet & Violet—Paldea Evolved', '2023-06-09', 'PAL', 193);

--MAGIC
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (2000, 2, 'Alpha', '1993-08-05', 'LEA', 295);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (2001, 2, 'Teenage Mutant Ninja Turtles', '2024-08-01', 'TMT', 4);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (2002, 2, 'Avatar: The Last Airbender', '2025-01-01', 'TLA', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (2003, 2, 'Primal Genesis', '2024-01-01', 'PRML', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (2004, 2, 'TMNT Villains Edition', '2024-01-01', 'TMNV', 1);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (2005, 2, 'Reinos del Eclipse', '2024-03-19', 'RECL', 80);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (2006, 2, 'Leyendas del Multiverso', '2024-03-19', 'LMULT', 50);

--ONEPIECE
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (30, 4, 'Romance Dawn', '2022-12-02', 'OP-01', 156);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (31, 4, 'Paramount War', '2023-03-10', 'OP-02', 155);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (32, 4, 'Pillars of Strength', '2023-06-30', 'OP-03', 155);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (34, 4, 'Kingdoms of Intrigue', '2023-09-22', 'OP-04', 150);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (35, 4, 'Awakening of the New', '2023-12-08', 'OP-05', 155);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (36, 4, 'Wings of the Captain', '2024-03-15', 'OP-06', 152);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (37, 4, '500 Years in the Future', '2024-06-28', 'OP-07', 152);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (38, 4, 'Two Legends', '2024-09-13', 'OP-08', 126);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (39, 4, 'Emperors in the New World', '2024-08-31', 'OP-09', 160);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (40, 4, 'Royal Blood', '2025-03-21', 'OP-10', 156);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (41, 4, 'A Fist of Divine Speed', '2025-03-01', 'OP-11', 156);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (42, 4, 'Legacy of the Master', '2025-08-22', 'OP-12', 157);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (43, 4, 'Carrying on his Will', '2025-11-07', 'OP-13', 179);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (44, 4, 'The Azure Sea`s Seven', '2025-11-22', 'OP-14', 158);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (45, 4, 'Adventure on Kami`s Island', '2026-02-28', 'OP-15', 154);


--YUGIOH
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4000, 3, 'Eternity Code', '2020-05-01', 'ETCO', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4001, 3, 'Maximum Crisis', '2017-05-05', 'MACR', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4002, 3, 'Mechanical Companion Pack', '2024-01-01', 'MECH', 30);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4003, 3, 'Phantom Rage', '2020-11-06', 'PHRA', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4004, 3, 'Exor Special Collection', '2024-01-01', 'EXOR', 50);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4005, 3, 'Solar Eclipse Promo', '2024-01-01', 'SOLE', 20);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4006, 3, 'Gaming Legends Series', '2024-01-01', 'GALE', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4007, 3, 'Solar Eclipse Promo', '2024-01-01', 'SOLE', 20);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4008, 3, 'Dimension Force', '2022-05-20', 'DIFO', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4009, 3, 'Tuner Support Edition', '2024-01-01', 'TUNE', 40);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4010, 3, 'Yu-Gi-Oh! Duel Monsters National Tournament', '1999-02-21', 'NONE', 1);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4011, 3, 'Yu-Gi-Oh! Championship Series 2023 Prize Cards', '2023-01-01', 'YCSW', 2);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4012, 3, 'Dimension of Chaos', '2015-11-06', 'DOCS', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4013, 3, 'Battle Pack: Epic Dawn', '2012-05-24', 'BP01', 220);


INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (100, 'Mega-Charizard x', '4/102', 'Rare', 'Criatura', 2.50, 'Es uno de los pocos Pokémon en tener dos megaevoluciones distintas (X e Y).', '/img/MCX.png', 1, 8, 10, 'Inglés');

-- 3. Insertamos en la tabla hija 'pokemon_cartas' usando el MISMO ID (100)
INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (100, 360, 'Fuego', 'Stage 2', 'Charmeleon', 'Lanzallamas, Giro Fuego', 'Agua', 'Lucha', 3);


INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (101, 'Mega Gengar ex', '056/094', 'Ultra Rare', 'Criatura', 1.00, 'Una curiosidad clave es su tercer ojo amarillo en la frente, que nunca parpadea y le permite ver dimensiones ocultas..', '/img/MG.png', 1, 8, 5, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (101, 350, 'Oscuridad', 'Stage 2', 'Haunter', 'Vendaval del Vacío', 'Lucha', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (102, 'Victini ex', '077/SV-P', 'Promo', 'Criatura', 350.00, ' Fue encerrado durante 200 años en la Isla Libertad por un antiguo guardián para proteger su inmenso poder.', '/img/Victiniex.png', 1, 7, 5, 'Indonesio');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (102, 190, 'Fuego', 'Básico', 'Ninguna', 'Ataque en Retirada, Llama de la Victoria', 'Agua', 'Ninguna', 1);

-- INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
-- VALUES (103, 'N', '180/171', 'Full Art Rare', 'Entrenador', 190.00, 'Each player shuffles their hand into their deck and draws a card for each of their remaining Prize cards.', '/img/N.jpg', 1, 10, 2, 'Japonés');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (104, 'Mega Latias ex', '100/132', 'Ultra Rare', 'Criatura', 0.50, 'Este color morado es la mezcla del rojo de Latias y el color azul de Latios, simbolizando su fuerte vínculo.', '/img/ML.png', 1, 1, 4, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (104, 280, 'Dragón', 'Mega Evolution', 'Latias', 'Pasada, Impulso Ilusorio', 'Hada', 'Ninguna', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (105, 'Lillie’s Clefairy ex', '765/742', 'Special Art Rare', 'Criatura', 120.00, 'La ilustración de esta carta subraya el profundo vínculo emocional entre Lillie y este Pokémon.', '/img/LL.png', 1, 5, 3, 'Japonés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (105, 190, 'Psíquico', 'Básico', 'Ninguna', 'Zona Hada, Rondó de Luna Llena', 'Metal', 'Ninguna', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (106, 'M-Rayquaza-EX', '98/98', 'Ultra Rare', 'Criatura', 700.00, 'Se dice que vive en la capa de ozono, alimentándose de meteoritos y protegiendo al mundo de las amenazas externas.', '/img/M-Rayquaza-EX.png', 1, 4, 20, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (106, 220, 'Incoloro', 'Mega', 'Rayquaza-EX', 'Rotura Esmeralda', 'Rayo', 'Lucha', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (107, 'M-Sceptile-EX', '85/98', 'Ultra Rare', 'Criatura', 80.00, 'Es considerado un depredador máximo en su hábitat natural, donde la vegetación crece densamente gracias a su energía.', '/img/M-Sceptile-EX.png', 1, 4, 33, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (107, 220, 'Planta', 'Mega', 'Sceptile-EX', 'Sable Dentado', 'Fuego', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (108, 'Marnie''s Morpeko', '206', 'Promo', 'Criatura', 35.00, 'Morpeko fue un regalo de su hermano mayor, Nerio, cuando ella tenía cinco años, lo que la hizo más feliz y ayudó a definir su personalidad..', '/img/Marnies-Morpeko.png', 1, 2, 50, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (108, 70, 'Oscuridad', 'Básico', 'Ninguna', 'Rueda de Pinchos', 'Planta', 'Ninguna', 0);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (109, 'Kingambit', '130', 'Promo Rare', 'Criatura', 1.00, 'Es un Pokémon tipo Siniestro/Acero basado en un rey de ajedrez y un shogun japonés, caracterizado por su movimiento lento que imita el paso corto del rey en el tablero', '/img/Kingambit.png', 1, 2, 60, 'Portugués');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (109, 180, 'Metal', 'Fase 2', 'Bisharp', 'Derribo, Laceración Masiva', 'Fuego', 'Planta', 4);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (110, 'Raging Bolt ex', '166/131', 'Special Illustration Rare', 'Criatura', 85.00, 'Está basado en un saurópodo (dinosaurio de cuello largo), y su diseño combina la majestuosidad de Raikou con un aspecto de "lagarto trueno" prehistórico.', '/img/Raging-Bolt-ex.png', 1, 2, 54, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (110, 240, 'Dragón', 'Básico', 'Ninguna', 'Rugido Explosivo, Trueno Bramante', 'Ninguna', 'Ninguna', 3);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (111, 'Mega Lopunny ex', '128/094', 'Ultra Rare Star', 'Criatura',25.00, 'El pelaje oscuro de sus piernas no es solo color; simula las mallas de compresión que usan los atletas para mejorar la circulación y el rendimiento.', '/img/Mega-Lopunny-ex.png', 1, 1, 37, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (111, 330, 'Incoloro', 'Stage 1', 'Buneary', 'Impulso de Vendaval, Saltador con Pinchos', 'Lucha', 'Ninguna', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (112, 'Mega Sharpedo ex', '127/094', 'Ultra Rare Star', 'Criatura', 45.00, 'Las marcas amarillas en su cuerpo son una referencia directa a las marcas de advertencia en los proyectiles militares.', '/img/Mega-Sharpedo.png', 1, 1, 18, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (112, 330, 'Oscuridad', 'Stage 1', 'Carvanha', 'Colmillo Avaro, Mandíbulas Hambrientas', 'Planta', 'Ninguna', 0);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (113, 'Umbreon ex', '161/131', 'Special Illustration Rare', 'Criatura', 900.00, 'Cuando se siente amenazado, Umbreon secreta un sudor venenoso por sus poros para protegerse.', '/img/Umbreon-ex.png', 1, 6, 2, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (113, 280, 'Oscuridad', 'Fase 1', 'Eevee', 'Espejismo Lunar, Ónice', 'Planta', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (114, 'Sylveon ex', '156/131', 'Special Illustration Rare', 'Criatura', 270.00, 'Sus colores (rosa, blanco y azul) y sus cintas voladoras son una referencia directa a las transformaciones de estas heroínas.', '/img/Sylveon-ex.png', 1, 6, 3, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (114, 270, 'Psíquico', 'Fase 1', 'Eevee', 'Encanto Mágico, Angelita', 'Metal', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (115, 'Iono', '269/193', 'Special Illustration Rare', 'Entrenador', 90.00, 'Mucha gente piensa que los dos Magnemite que lleva en la cabeza son Pokémon reales o accesorios mecánicos, pero la realidad es que no son reales son pinzas para el pelo de gran tamaño.', '/img/Iono.png', 1, 8, 67, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (115, NULL, 'Soporte', 'Entrenador', 'Ninguna', 'Cada jugador baraja su mano y la pone en el fondo de su baraja. Si alguno de los jugadores puso alguna carta en el fondo de su baraja de esta manera, cada jugador roba una carta por cada una de sus cartas de Premio restantes.', NULL, NULL, NULL);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma)
VALUES (116, 'Dendra', '266/193', 'Special Illustration Rare', 'Entrenador', 10.00, 'Siempre está corriendo por el patio de la Academia. Si hablas con ella, suele estar sin aliento o a punto de empezar una serie de 100 flexiones. Representa la filosofía de "mente sana en cuerpo sano".', '/img/Dendra.png', 1, 8, 120, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada)
VALUES (116, NULL, 'Soporte', 'Entrenador', 'Ninguna', 'Pon una carta de tu mano en el fondo de tu baraja. Si lo haces, roba cartas hasta que tengas 5 cartas en tu mano. (Si no tienes otras cartas en tu mano, no puedes usar esta carta).', NULL, NULL, NULL);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (117, 'Slowking ex', '238/193', 'Ultra Rare', 'Criatura', 5.00, 'Slowking es uno de los poquísimos Pokémon que ha demostrado poder hablar el lenguaje humano.', '/img/Slowking-ex.png', 1, 8, 88, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (117, 270, 'Psíquico', 'Fase 1', 'Slowpoke', 'Cabezazo Sabio, Más Psique', 'Oscuridad', 'Ninguna', 3);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (118, 'Quaquaval ex', '260/193', 'Special Illustration Rare', 'Criatura', 25.00, 'Sus plumas traseras no son solo una cola; imitan los grandes y coloridos tocados de plumas que usan los pasistas.', '/img/Quaquaval-ex.png', 1, 8, 46, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (118, 320, 'Agua', 'Fase 2', 'Quaxwell', 'Danza Apasionante, Disparo Espiral', 'Rayo', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (119, 'Eri', '136/131', 'Special Illustration Rare', 'Entrenador', 1.30, 'Era una estudiante modelo y una atleta de élite, pero sufrió bullying precisamente por ser "demasiado perfecta" o destacar demasiado. Esto es lo que la llevó a unirse a Cassiopea; ella no es una "rebelde" por mala conducta, sino por protección a sus amigos..', '/img/eri.jpg', 1, 6, 79, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (119, NULL, 'Soporte', 'Entrenador', 'Ninguna', 'Tu rival revela su mano y tu descartas hasta 2 cartas objeto que encuentres allí', NULL, NULL, NULL);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (120, 'Espeon ex', '155/131', 'Special Illustration Rare', 'Criatura', 400.00, 'Mucha gente cree que la gema roja en su frente es solo un adorno, pero es un órgano vital.', '/img/Espeon.png', 1, 6, 20, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (120, 270, 'Psíquico', 'Fase 1', 'Eevee', 'Psicocambio, Asombro', 'Psíquico', 'Ninguna', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (121, 'Leafeon ex', '155/131', 'Special Illustration Rare', 'Criatura', 246.00, 'Su estructura celular es similar a la de los vegetales, lo que le permite realizar la fotosíntesis para obtener energía sin necesidad de comer.', '/img/Leafeon.png', 1, 6, 15, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (121, 270, 'Planta', 'Fase 1', 'Eevee', 'Tormenta Verde, Ágata Musgo', 'Fuego', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (122, 'Sparkling Crystal', '129/131', 'ACE SPEC Rare', 'Objeto', 0.70, 'En la mineralogía real, el diamante (el material más duro de la Tierra) cristaliza naturalmente en forma de octaedro de ahí viene la referencia para hacer esta carta.', '/img/Sparkling-Crystal.png', 1, 6, 200, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (122, NULL, 'Herramienta', 'ACE SPEC', 'Ninguna', 'Cuando el Pokémon Tera al que esté unida esta carta usa un ataque que cuesta 1 energía (La energía puede ser de cualquier tipo)', NULL, NULL, NULL);








INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (201, 'Ghost Mourner & Moonlit Chill', 'ETCO-EN036', 'Secret Rare', 'Monstruo', 0.50, 'Cuando tu adversario Invoca de Modo Especial uno o más monstruos boca arriba (excepto durante el Damage Step): puedes descartar esta carta, y después seleccionar 1 de esos monstruos; niega sus efectos hasta el final de este turno, y además, si ese monstruo boca arriba deja el campo este turno, su controlador recibe daño igual a su ATK original.', '/img/ghostMourner.jpg', 3, 4000, 60, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (201, 3, 'VIENTO', 'Zombi / Cantante / Efecto', 0, 1800, 'Cuando tu adversario Invoca de Modo Especial uno o más monstruos boca arriba (excepto durante el Damage Step): puedes descartar esta carta, y después seleccionar 1 de esos monstruos; niega sus efectos hasta el final de este turno, y además, si ese monstruo boca arriba deja el campo este turno, su controlador recibe daño igual a su ATK original. Solo puedes usar este efecto de "Ghost Mourner & Moonlit Chill" una vez por turno.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (202, 'Duoterion', 'MACR-EN019', 'Super Rare', 'Monstruo', 1.50, 'Puedes descartar esta carta; añade a tu mano 1 Magia/Trampa "Bonding" en tu Deck. Si esta carta es Invocada de Modo Normal o Especial: puedes seleccionar 1 "Hydrogeddon", "Oxygeddon" o "Duoterion" en tu Cementerio; Invócalo de Modo Especial.', '/img/duoterion.jpg', 3, 4001, 3, 'Japonés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (202, 5, 'AGUA', 'Dinosaurio / Efecto', 2000, 1400, 'Puedes descartar esta carta; añade a tu mano 1 Magia/Trampa "Bonding" en tu Deck. Si esta carta es Invocada de Modo Normal o Especial: puedes seleccionar 1 "Hydrogeddon", "Oxygeddon" o "Duoterion" en tu Cementerio; Invócalo de Modo Especial. Solo puedes usar cada efecto de "Duoterion" una vez por turno.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (203, 'K-9', 'MECH-EN01', 'Common', 'Monstruo', 0.50, 'Un compañero mecánico leal. Si controlas un monstruo de Nivel 3, puedes Invocar esta carta de Modo Especial desde tu mano. Si esta carta es destruida, puedes añadir 1 monstruo Máquina de Nivel 3 de tu Deck a tu mano.', '/img/k9.jpg', 3, 4002, 56, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (203, 5, 'VIENTO', 'Guerrero / XYZ / Efecto', 2300, 1800, 'Si controlas un monstruo de Nivel 3, puedes Invocar esta carta de Modo Especial desde tu mano. Si esta carta es destruida, puedes añadir 1 monstruo Máquina de Nivel 3 de tu Deck a tu mano.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (204, 'Penguin Brave', 'PHRA-EN042', 'Ultra Rare', 'Monstruo', 2.00, '1 Cantante + 1+ monstruos que no sean Cantantes. Tu adversario no puede seleccionar monstruos en Posición de Defensa boca abajo con efectos de cartas. Solo puedes usar cada uno de los siguientes efectos de "Penguin Brave" una vez por turno. Si esta carta es Invocada por Sincronía: puedes Invocar de Modo Especial, desde tu Deck, 1 monstruo "Penguin" en Posición de Defensa boca abajo.', '/img/penguin.jpg', 3, 4003, 34, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (204, 1, 'AGUA', 'Bestia Alada / Efecto', 100, 100, '1 Cantante + 1+ monstruos que no sean Cantantes. Tu adversario no puede seleccionar monstruos en Posición de Defensa boca abajo con efectos de cartas. Si esta carta es Invocada por Sincronía: puedes Invocar de Modo Especial, desde tu Deck, 1 monstruo "Penguin" en Posición de Defensa boca abajo. Cuando tu adversario activa el efecto de un monstruo: puedes voltear boca arriba 1 monstruo de AGUA en Posición de Defensa boca abajo que controles.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (205, 'Exormana', 'EXOR-EN01', 'Ultra Rare', 'Monstruo', 5.00, '2+ Monstruos incluyendo un monstruo "Exor". Esta carta no puede ser destruida por efectos de cartas de tu adversario mientras apunte a un monstruo. Una vez por turno (Efecto Rápido): puedes seleccionar 1 monstruo al que esta carta apunte; cámbialo a Posición de Defensa boca abajo.', '/img/Exormana.jpg', 3, 4004, 32, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (205, 4, 'OSCURIDAD', 'Hada / XYZ / Efecto', 2600, 1800, '2+ Monstruos incluyendo un monstruo "Exor". Esta carta no puede ser destruida por efectos de cartas de tu adversario mientras apunte a un monstruo. Una vez por turno (Efecto Rápido): puedes seleccionar 1 monstruo al que esta carta apunte; cámbialo a Posición de Defensa boca abajo.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (206, 'Shina the Total Solar Eclipse', 'SOLE-EN01', 'Ultra Rare', 'Monstruo', 5.00, 'Si esta carta es Invocada de Modo Normal o Especial: puedes cambiar todos los monstruos boca arriba en el campo a Posición de Defensa boca abajo. Ningún jugador puede activar cartas o efectos en respuesta a la activación de este efecto.', '/img/shina.jpg', 3, 4005, 27, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (206, 9, 'OSCURIDAD', 'Dragon / Efecto', 2900, 1200, 'Si esta carta es Invocada de Modo Normal o Especial: puedes cambiar todos los monstruos boca arriba en el campo a Posición de Defensa boca abajo. Ningún jugador puede activar cartas o efectos en respuesta a la activación de este efecto.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (208, 'Lucina', 'GALE-EN02', 'Secret Rare', 'Monstruo', 20.00, 'Una guerrera de un futuro condenado que viaja en el tiempo. Si tu adversario controla un monstruo y tú no controlas ninguno, puedes Invocar esta carta de Modo Especial desde tu mano.', '/img/lucina.jpg', 3, 4006, 1, 'Japonés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (208, 6, 'FUEGO', 'Guerrero / Efecto', 2500, 1800, 'Si tu adversario controla un monstruo y tú no controlas ninguno, puedes Invocar esta carta de Modo Especial desde tu mano. Una vez por turno, esta carta no puede ser destruida en batalla.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (209, 'Tina the Total Solar Eclipse', 'SOLE-EN02', 'Ultra Rare', 'Monstruo', 5.00, 'Si esta carta es mandada al Cementerio: puedes cambiar todos los monstruos en el campo a Posición de Defensa boca abajo. Ningún jugador puede activar cartas o efectos en respuesta a la activación de este efecto.', '/img/tina.jpg', 3, 4007, 45, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (209, 6, 'AGUA', 'Hechicero / Efecto', 2400, 1800, 'Si esta carta es mandada al Cementerio: puedes cambiar todos los monstruos en el campo a Posición de Defensa boca abajo. Ningún jugador puede activar cartas o efectos en respuesta a la activación de este efecto.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (210, 'Elfnote', 'DIFO-EN026', 'Common', 'Monstruo', 0.20, 'Si esta carta es mandada al Cementerio: puedes seleccionar 1 monstruo en tu Cementerio; Invócalo de Modo Especial, pero sus efectos son negados. Puedes seleccionar 1 monstruo que controles; cambia su Nivel por el de esta carta hasta el final de este turno. Solo puedes usar cada efecto de "Elfnote" una vez por turno.', '/img/elfnote.jpg', 3, 4008, 45, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (210, 6, 'LUZ', 'Hechicero / Efecto', 2200, 1800, 'Si esta carta es mandada al Cementerio: puedes seleccionar 1 monstruo en tu Cementerio; Invócalo de Modo Especial, pero sus efectos son negados. Puedes seleccionar 1 monstruo que controles; cambia su Nivel por el de esta carta hasta el final de este turno. Solo puedes usar cada efecto de "Elfnote" una vez por turno.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (211, 'Kewl', 'TUNE-EN01', 'Super Rare', 'Monstruo', 1.50, 'Si controlas un monstruo Cantante, puedes Invocar esta carta de Modo Especial (desde tu mano). Solo puedes Invocar a "Kewl" de Modo Especial una vez por turno de esta forma. Si esta carta es mandada al Cementerio como material para una Invocación por Sincronía: puedes robar 1 carta.', '/img/kewl.jpg', 3, 4009, 16, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (211, 2, 'OSCURIDAD', 'Trueno / Cantante / Efecto', 800, 1000, 'Si controlas un monstruo Cantante, puedes Invocar esta carta de Modo Especial (desde tu mano). Solo puedes Invocar a "Kewl" de Modo Especial una vez por turno de esta forma. Si esta carta es mandada al Cementerio como material para una Invocación por Sincronía: puedes robar 1 carta.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (212, 'Kewl Tune', 'TUNE-EN02', 'Rare', 'Mágica', 2.00, 'Selecciona 1 monstruo Cantante boca arriba que controles; Invoca de Modo Especial, desde tu mano, 1 monstruo que no sea Cantante con un Nivel igual o menor al del monstruo seleccionado. Solo puedes activar 1 "Kewl Tune" por turno.', '/img/kewlTune.jpg', 3, 4009, 24, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (212, 3, 'LUZ', 'Hada / Cantante Efecto', 900, 1900, 'Selecciona 1 monstruo Cantante boca arriba que controles; Invoca de Modo Especial, desde tu mano, 1 monstruo que no sea Cantante con un Nivel igual o menor al del monstruo seleccionado. Solo puedes activar 1 "Kewl Tune" por turno.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (213, 'Kanan the Swordmistress', 'NONE', 'Ultra Rare', 'Monstruo', 20000.00, 'Una mujer guerrera armada con espada y escudo, flota como una mariposa y pica como una abeja.', '/img/kanan.jpg', 3, 4010, 1, 'Japonés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (213, 4, 'TIERRA', 'Guerrero / Normal', 1400, 1400, 'Una mujer guerrera armada con espada y escudo, flota como una mariposa y pica como una abeja.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (214, 'Anotherverse Dragon', 'YCSW-EN013', 'Ultra Rare', 'Monstruo', 30000.00, 'Este dragón secreto ha conquistado muchas dimensiones, pero solo puede ser visto por el campeón del tiempo.', '/img/AnotherDragon.jpg', 3, 4011, 1, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (214, 8, 'TIERRA', 'Dragón / Normal', 2500, 2000, 'Este dragón secreto ha conquistado muchas dimensiones, pero solo puede ser visto por el campeón del tiempo.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (215, 'Odd-Eyes Vortex Dragon', 'DOCS-EN045', 'Super Rare', 'Monstruo', 500000.00, 'Cuando esta carta es Invocada de Modo Especial: puedes seleccionar 1 monstruo en Posición de Ataque boca arriba que controle tu adversario; devuélvelo a la mano.', '/img/Dragon_vortice.jpg', 3, 4012, 1, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (215, 7, 'VIENTO', 'Dragón / Fusión / Efecto', 2500, 3000, '1 monstruo "Ojos Anómalos" + 1 Monstruo de Péndulo. Cuando esta carta es Invocada de Modo Especial: puedes devolver 1 monstruo en ataque del rival a la mano. Durante el turno de cualquier jugador, cuando se activa una carta o efecto: puedes barajar 1 Monstruo de Péndulo boca arriba en tu Deck Extra al Deck, niega la activación y destruye la carta.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (216, 'Pot of Greed', 'BP01-EN034', 'Rare', 'Mágica', 2.50, 'Roba 2 cartas.', '/img/potOfGreed.jpg', 3, 4004, 5, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (216, NULL, 'MÁGICA', 'Magia Normal', NULL, NULL, 'Roba 2 cartas.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (217, 'Dinomorfia Rexterm', 'DIFO-038', 'Starlight Rare', 'Monstruo', 30.00 , 'Dinomorfia Rexterm significa (el rey que extremina todo) y su manera de pensar era esta cuando intentas controlar la vida... acabas creando algo que te supera.', '/img/Dinomorfia-Rexterm.jpg', 3, 4008, 3, 'Japonés');  

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (217, 8, 'OSCURIDAD', 'Dinosaurio / Fusión / Efecto', 3000, 0, '2 monstruos "Dinomorfia, Mientras tus LP sean menores o iguales a los de tu adversario, tu oponente no puede activar efectos de monstruos con ATK mayor que tus LP. Si recibes daño de efecto: puedes pagar hacer que el daño que recibas sea 0, y si lo haces reduce a la mitad tus LP. Solo puedes usar este efecto una vez por turno.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (218, 'Pintora Meteorológica Arco Iris Lunas', 'DIFO-050', 'Starlight Rare', 'Monstruo', 30.00 , 'Su nombre proviene de un arcoiris nocturno creado por la luz de la luna este fenomeno es muy dificil de ver.', '/img/pintora.jpg', 3, 4008, 3, 'Japonés');  

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (218, 0, 'OSCURIDAD', 'Hada / Link / Efecto', 2400, 0, '2+ monstruos "The Weather". Los monstruos "The Weather" en las zonas a las que apunta esta carta ganan este efecto. puedes desterrar esta carta; Invoca de Modo Especial 1 monstruo "The Weather" desde tu Deck. Solo puedes usar este efecto de "The Weather Painter Moonbow una vez por turno.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (219, 'Terrogarra Tri-Heart', 'DIFO-049', 'Secret Rare', 'Monstruo', 15.00 , 'Su nombre represnta tres corazonnes / tres volutades dentro de una sola criatura.', '/img/Terrogarra.jpg', 3, 4008, 3, 'Japonés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (219, 0, 'OSCURIDAD', 'Bestia Guerrero / Link / Efecto', 3000, 0, '3 monstruos de efecto. Los monstruos en Posición de Defensa no pueden activar sus efectos. Esta carta puede atacar a todos los monstruos en Posición de Defensa que controle tu adversario, una vez a cada uno. Una vez tu turno: puedes invocar de Modo Especial 1 monstruo "Scareclaw" desde tu Cementerio a una zona a la que apunte esta carta en Posicón de Defensa.');




-- 2. Tabla padre 'cartas' (ID 200)
INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (300, 'Black Lotus', 'N/A', 'Rare', 'Artifact', 50000.00, 'En los años 90, antes de que valiera lo que un coche de lujo, se rumorea que algunos jugadores usaban el Black Lotus sin protectores en las mesas de los parques, o que incluso rompían la carta después de usarla porque malinterpretaron el texto de "sacrificar" (pensando que debías destruirla físicamente).', '/img/BlackLotus.png', 2, 2000, 1, 'Inglés');

-- 3. Tabla hija 'magic_cartas' (ID 200)
INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (300, '0', 'Artifact', NULL, NULL, '{T}, sacrificar el Black Lotus: Agrega tres manás de un color cualquiera a tu reserva de maná.', 'Colorless');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (301, 'Yue, the Moon Spirit', 'R 0083', 'Rare', 'Legendary Creature', 12.00, 'La Princesa Yue nació con una enfermedad incurable. Para salvarla, su padre la sumergió en el Oasis Sagrado, donde el Espíritu de la Luna (Tui) le transfirió parte de su vida. Este milagro no solo la sanó, sino que vinculó su alma al espíritu y volvió su cabello blanco plateado para siempre.', '/img/yue.jpg', 2, 2002, 2, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (301, '{3}{U}', 'Legendary Creature — Spirit Ally', 3, 3, 'Vuela, vigilancia, Maestría Agua 5, {T}: Puedes lanzar un hechizo que no sea de criatura de tu mano sin pagar su coste de maná. (Mientras pagas un coste de maestría agua, puedes girar tus artefactos y criaturas para ayudar. Cada uno paga {1}).', 'Azul');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (302, 'Day of Black Sun', 'R 0094', 'Rare', 'Sorcery', 8.50, 'Los artistas se inspiraron en el planetario de Wan Shi Tong. El diseño de la carta busca que sientas que estás viendo el mapa astral que Sokka usó para predecir el ataque.', '/img/sol-negro.jpg', 2, 2002, 3, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (302, '{X}{B}{B}', 'Sorcery', NULL, NULL, 'Cada criatura con valor de maná X o menos pierde todas las habilidades hasta el final del turno. Destruye esas criaturas.', 'Black');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (303, 'Leonardo', 'TMNT-01', 'Rare', 'Criatura Legendaria', 3650.00, 'El líder disciplinado del grupo. Experto en el uso de las katanas y en la estrategia táctica para proteger a sus hermanos.', '/img/leonardo.jpg', 2, 2001, 3, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (303, '1WUB', 'Legendary Creature - Turtle Ninja', '2', '4', 'Dañar primero, Vigilancia. Al comienzo del combate en tu turno, otra criatura objetivo que controles obtiene +1/+1 y gana la habilidad de Indestructible hasta el final del turno.', 'Azul, Blanco, Negro');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (304, 'Michelangelo', 'TMNT-02', 'Rare', 'Criatura Legendaria', 2000.00, 'El alma de la fiesta. Su estilo de combate con nunchakus es tan impredecible como su sentido del humor.', '/img/michelangelo.jpg', 2, 2001, 6, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (304, '1RGW', 'Legendary Creature - Turtle Ninja', '4', '2', 'Prisa. Cuando Michelangelo entre al campo de batalla, crea dos fichas de artefacto Comida. Siempre que sacrifiques una Comida, pon un contador +1/+1 sobre cada criatura que controles.', 'Rojo, Verde, Blanco');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (305, 'Raphael', 'TMNT-04', 'Rare', 'Criatura Legendaria', 3200.00, 'El guerrero más feroz y rebelde. Su ira es su mayor fuerza, permitiéndole atacar con una agresividad inigualable.', '/img/raphael.jpg', 2, 2001, 5, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (305, '1BRG', 'Legendary Creature - Turtle Ninja', '3', '3', 'Arrollar. Siempre que Raphael reciba daño, pon esa misma cantidad de contadores +1/+1 sobre él. Al comienzo de tu paso final, Raphael puede luchar contra la criatura objetivo que no controles.', 'Negro, Rojo, Verde');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (306, 'Donatello', 'TMNT-03', 'Rare', 'Criatura Legendaria', 4300.00, 'El genio del equipo. Capaz de convertir cualquier chatarra en una maravilla tecnológica para ganar ventaja en el campo.', '/img/donatello.jpg', 2, 2001, 4, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (306, '1GUW', 'Legendary Creature - Turtle Ninja', '1', '5', 'Alcance. Siempre que lances un hechizo de artefacto, puedes robar una carta. {2}, {T}: Endereza el artefacto objetivo que controles.', 'Verde, Azul, Blanco');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (307, 'El Portador de la Noche', 'TMNV-01', 'Mythic Rare', 'Criatura Legendaria', 15.50, 'Una figura imponente que acecha desde las sombras del Clan del Pie. Su sola presencia debilita la voluntad de sus enemigos y fortalece a sus aliados oscuros.', '/img/portador.jpg', 2, 2004, 2, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (307, '3BB', 'Legendary Creature - Zombie Ninja', '5', '4', 'Menaza (Esta criatura no puede ser bloqueada excepto por dos o más criaturas). Siempre que El Portador de la Noche haga daño de combate a un jugador, ese jugador descarta una carta y tú robas una carta.', 'Negro');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (308, 'Dinosaurio Rugidor', 'PRML-01', 'Rare', 'Criatura', 8.50, 'Una fuerza de la naturaleza imparable. Su rugido se escucha a kilómetros de distancia, anunciando la llegada de una era de destrucción para aquellos que osen invadir su territorio.', '/img/Dinosaur.jpg', 2, 2005, 5, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (308, '4GG', 'Creature - Dinosaur', '6', '6', 'Arrollar (Esta criatura puede asignar el exceso de daño de combate al jugador o planeswalker defensor). Cuando el Dinosaurio Rugidor entre al campo de batalla, puedes hacer que luche contra la criatura objetivo que no controles.', 'Verde');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (309, 'Reinos Eclipsados', 'RECL-01', 'Rare', 'Tierra', 5.50, 'Un paisaje donde la luz y la sombra se entrelazan eternamente bajo un sol oscuro.', '/img/rainos-eclipsados.jpg', 2, 2005, 10, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (309, NULL, 'Land', NULL, NULL, '{T}: Agrega {C}. {T}, pagar 1 vida: Agrega {B} o {W} a tu reserva de maná.', 'Icoloro');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (310, 'Palacio de las Nubes', 'RECL-02', 'Mythic Rare', 'Encantamiento', 12.00, 'Una fortaleza mística que flota más allá del alcance de los mortales.', '/img/palacio-nubes.jpg', 2, 2005, 23, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (310, '2UU', 'Enchantment', NULL, NULL, 'Las criaturas que controlas con la habilidad de volar obtienen +1/+1. Al comienzo de tu paso final, si controlas tres o más criaturas con la habilidad de volar, roba una carta.', 'Azul');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (311, 'Ajani, Guerrero de la Garra', 'LMULT-01', 'Mythic Rare', 'Criatura Legendaria', 88.50, 'Un líder noble cuya fuerza solo es superada por su lealtad a su manada.', '/img/ajani.jpg', 2, 2006, 2, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (311, '2WW', 'Legendary Creature - Cat Warrior', '4', '4', 'Dañar primero, Vínculo vital. Siempre que otra criatura que controles entre al campo de batalla, puedes poner un contador +1/+1 sobre Ajani, Guerrero de la Garra.', 'Blanco');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (312, 'Demonio del Vacío', 'LMULT-02', 'Rare', 'Criatura', 39.00, 'Una entidad nacida del hambre eterna de los planos oscuros.', '/img/demonio.jpg', 2, 2006, 5, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (312, '3BB', 'Creature - Demon', '5', '5', 'Vuela. Al comienzo de tu mantenimiento, sacrifica otra criatura. Si no puedes, el Demonio del Vacío te hace 5 puntos de daño.', 'Negro');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (313, 'Espadachina del Destino', 'LMULT-03', 'Uncommon', 'Criatura', 6.00, 'Su hoja ha sido forjada en las estrellas y nunca falla su blanco.', '/img/espadachina.jpg', 2, 2006, 8, 'Japonés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (313, '1RW', 'Creature - Human Knight', '3', '2', 'Prisa. Siempre que esta criatura ataque, otra criatura atacante objetivo obtiene +2/+0 hasta el final del turno.', 'Rojo, Blaco');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (314, 'The Ooze', '0177', 'Rare', 'Artefacto Legendario', 8.50, 'El mutágeno que lo cambió todo.', '/img/ooze.jpg', 2, 2001, 15, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (314, '2', 'Legendary Artifact', NULL, NULL, 'Siempre que una criatura que controles con un contador +1/+1 deje el campo de batalla, crea una ficha de Mutágeno por cada contador +1/+1 que tuviera. {T}: Exilia la carta objetivo de un cementerio. Crea una ficha de Mutágeno.', 'Incoloro');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (315, 'Técnica de Karai', '0152', 'Uncommon', 'Conjuro', 4.50, 'La disciplina del Clan del Pie es implacable.', '/img/karai.jpg', 2, 2001, 55, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (315, '1WB', 'Sorcery', NULL, NULL, 'Escabullir {W}{B} (Puedes lanzar este hechizo por {W}{B} si también devuelves un atacante no bloqueado que controles a la mano durante el paso de declaración de bloqueadores). Elige uno o ambos — La criatura objetivo obtiene +3/+3 hasta el final del turno; La criatura objetivo obtiene -3/-3 hasta el final del turno.', 'Blanco, Negro');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (316, 'Tortugas por Siempre', '0027', 'Rare', 'Instantáneo', 12.00, '"Nos vemos por el multiverso, hermanos." —Un Leonardo u otro.', '/img/tortugas-siempre.jpg', 2, 2001, 37, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (316, '3W', 'Instant', NULL, NULL, 'Busca en tu biblioteca y/o fuera del juego exactamente cuatro cartas de criatura legendaria que poseas con nombres diferentes, luego muestra esas cartas. Un oponente elige dos de ellas. Pon las cartas elegidas en tu mano y baraja el resto en tu biblioteca.', 'Blanco');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (317, 'Bovino Transdimensional', '0134', 'Rare', 'Criatura', 7.00, '"La naturaleza de una cabeza de vaca cíborg gigante y incorpórea que viaja a través del tiempo y el espacio plantea innumerables preguntas. Pero a Cudley no le gusta hablar con la boca llena."', '/img/bovido.jpg', 2, 2001, 6, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (317, '2G', 'Creature — Ox Avatar', '0', '4', 'Vuela. {T}: Agrega dos manás de cualquier color.', 'Verde');


INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (318, 'Sheoldred, la Susurradora', 'MUL-0081', 'Mythic', 'Criatura legendaria', 15.00, 'Una de las siete Siete de Nueva Pirexia.', '/img/susurradora.png', 2, 2006, 4, 'Español');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (318, '5BB', 'Legendary Creature — Phyrexian Praetor', '6', '6', 'Cruza pantanos. Al comienzo de tu mantenimiento, regresa la carta de criatura objetivo de tu cementerio al campo de batalla. Al comienzo del mantenimiento de cada oponente, ese jugador sacrifica una criatura.', 'Negro');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (319, 'Anafenza, espíritu del árbol familiar', 'MUL-0001', 'Rare', 'Criatura legendaria', 3.50, 'La Legión de las Máquinas codiciaba su fuerza, pero un espíritu de arena, sol y recuerdos es imposible de perfeccionar.', '/img/espiritu-arbol.png', 2, 2006, 12, 'Español');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (319, 'WW', 'Legendary Creature — Spirit Soldier', '2', '2', 'Siempre que otra criatura que no sea ficha entre al campo de batalla bajo tu control, fortalece 1. (Elige una criatura con la menor resistencia entre las criaturas que controlas y pon un contador +1/+1 sobre ella.)', 'Blanco');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (320, 'Ragavan, ratero hábil', 'MUL-0021', 'Mythic', 'Criatura legendaria', 45.00, 'El pirata más famoso de Kaladesh.', '/img/ragavan.jpg', 2, 2006, 2, 'Español');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (320, 'R', 'Legendary Creature — Monkey Pirate', '2', '1', 'Siempre que Ragavan, ratero hábil haga daño de combate a un jugador, crea una ficha de Tesoro y exilia la primera carta de la biblioteca de ese jugador. Hasta el final del turno, puedes lanzar esa carta. Rapidez {1}{R}.', 'Rojo');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (321, 'Contemplar el Multiverso', 'KHM-046', 'Common', 'Instantáneo', 0.50, 'Ante Niko se abrieron un sinnúmero de mundos, y todos necesitaban héroes.', '/img/contemplar.jpg', 2, 2006, 25, 'Español');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (321, '3U', 'Instant', NULL, NULL, 'Adivina 2, luego roba dos cartas. Profetizar {1}{U}. (Durante tu turno, puedes pagar {2} y exiliar esta carta de tu mano boca abajo. Puedes lanzarla en un turno posterior pagando su coste de profetizar).', 'Azul');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (322, 'Veneno psíquico', '5ED-104', 'Common', 'Encantamiento', 0.40, 'Una mente envenenada solo encuentra dolor en el esfuerzo.', '/img/venono-psiquico.jpg', 2, 2000, 15, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (322, '1U', 'Enchant Land', NULL, NULL, 'Siempre que la tierra objetivo sea girada, el Veneno psíquico hace 2 puntos de daño al controlador de esa tierra.', 'Azul');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (323, 'Parálisis', '5ED-181', 'Common', 'Encantamiento', 0.35, 'El cuerpo se vuelve una prisión de carne inmóvil.', '/img/paralisis.jpg', 2, 2000, 20, 'Inglés');

INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (323, 'B', 'Enchant Creature', NULL, NULL, 'La criatura objetivo no se endereza de forma normal durante el paso de enderezar a menos que se paguen {4}. Gira la criatura objetivo cuando la Parálisis sea lanzada.', 'Negro');







INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (401, 'Dr. Vegapunk', 'OP07-097', 'Leader', 'Líder', 60.00, 'El genio científico de la Marina y líder de Egghead.', '/img/vegapunk.png', 4, 37, 13, 'Japonés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (401, 'Amarillo', 0, 5000, 0, '[Activación: Principal] [Una vez por turno] Puedes añadir 1 carta de Personaje con el tipo {Egghead} y un coste de 5 o menos desde tu mano a la parte superior de tus cartas de Vida boca arriba.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (402, 'Boa Hancock', 'OP07-051', 'SR', 'Personaje', 605.00, 'Emperatriz de Amazon Lily, posee la fruta Mero Mero no mi, una fruta de tipo (Paramecia) que permite convertir en piedra a quien sienten atracción por ella, incluso con sus ataques.', '/img/boa-manga.png', 4, 37, 2, 'Japonés/Inglés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (402, 'Azul', 6, 8000, 0, '[Bloqueador] [Al bloquear] [Al atacar] Si tienes 5 o menos cartas en tu mano, roba 1 carta.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (403, 'Kaido & Linlin', 'OP07-077', 'R', 'Event', 2.00, 'Arte alternativo que muestra la alianza de los dos Yonko en Onigashima. Una de las cartas más poderosas y visualmente impactantes del set 500 Years into the Future.', '/img/kaido-bigMom.png', 4, 37, 12, 'Japonés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (403, 'Morado', 1, 0, 0, '[Al jugar] DON!! -2: Si tu líder tiene los tipos {Los Cuatro Emperadores}, roba 1 carta, y esta criatura gana [Banish] y [Double Attack] durante este turno. Luego, añade hasta 1 carta de la parte superior de tu mazo a tus cartas de vida.');

-- INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
-- VALUES (404, 'Charlotte Linlin', 'OP07-114', 'SR', 'Personaje', 34.00, 'La capitana de los Piratas de Big Mom y emperatriz del mar (Yonkou), posee la Soru Soru no Mi, una fruta tipo (Paramecia) que le permite manipular las almas, extraer la vida de otros y dar vida a objetos creando así sus propios sirvientes.', '/img/linlin.png', 4, 300, 5, 'Japonés');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (405, 'Buggy (Wanted Poster)', 'OP07-005', 'SP', 'Personaje', 55.00, 'Edición Especial "SP" con diseño de cartel de recompensa. Una pieza de colección altamente cotizada por los fans de Cross Guild.', '/img/cartel-buggy.png', 4, 37, 5, 'Japonés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (405, 'Azul', 10, 12000, 0, '[Al jugar] Mira las 5 cartas superiores de tu mazo, revela hasta una carta de tipo {Cross Guild} (que no sea Buggy) y añádela a tu mano. Luego, pon el resto en la parte inferior de tu mazo.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (406, 'Yamato', 'OP01-121', 'SEC', 'Personaje', 75.50, 'Yamato utiliza un arma llamada kanabo, un arma tradicional japonesa asociada a los onis(demonios).', '/img/yamato.png', 4, 30, 10, 'Inglés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (406, 'Verde', 5, 5000, 1000, '[Doble Ataque] [En tu turno] Si tu oponente tiene 2 o menos cartas de vida, este líder gana +1000 de poder.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (407, 'Perona', 'OP01-077', 'UC', 'Personaje', 14.00, 'Perona posee Horo Horo no Mi, una fruta de tipo (Paramecia) que le permite crear fantasmas negativos y explosivos, pertenece a la tripulacion de Thriller Bark Pirates.', '/img/perona.png', 4, 30, 8, 'Inglés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (407, 'Azul', 1, 2000, 1000, '[Activación: Principal] [Una vez por turno] Elige uno: Descansa hasta 1 de los personajes de tu oponente de coste 4 o menos; o reduce el coste de 1 personaje de tu oponente en -1 durante este turno.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (408, "Who's-Who", 'OP01-109', 'UC', 'Personaje', 1.00, 'Who`s. Who tiene una fruta Neko Neko no Mi, una fruta tipo (Zoan) que le permite convertirse en un tigre dientes de sable, miembro de los Tobiroppo y los Piratas de las Bestias.', '/img/who.png', 4, 30, 3, 'Inglés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (408, 'Morado', 2, 3000, 1000, '[Al jugar] Si tu líder tiene el tipo {Piratas de las Bestias}, K.O. a un personaje de tu oponente de coste 3 o menos.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (409, 'In Two Years at Sabaody Archipelago', 'OP01-030', 'UC', 'Evento', 0.50, 'Representa la reunión de los Sombrero de Paja tras el salto temporal.', '/img/In-two-years.png', 4, 30, 20, 'Inglés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (409, 'Rojo', 1, 0, 0, '[Principal] Mira 5 cartas de la parte superior de tu mazo, revela hasta 1 carta de tipo {Straw Hat Crew} y añádela a tu mano.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (410, 'Shanks', 'OP01-120', 'SEC', 'Personaje', 2150.00, 'Shanks llamado el (pelirrojo) es uno de los emperadores del mar (Yonko) que no posee fruta del diablo basando su poder en el haki y su habilidad con la espada. Su sombrero paso de su capitan a el y de el a Luffy', '/img/shanks-manga.png', 4, 30, 2, 'Inglés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (410, 'Rojo', 9, 10000, 0, '[Al jugar] Si tu líder es Rojo, descarta 2 cartas de tu mano: K.O. a todos los personajes del oponente con 10000 de poder o menos. Esta carta gana [Prisa] durante este turno.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (411, 'Zephyr', 'OP02-072', 'AA', 'Líder', 0.02, 'Z, el Brazo Negro, líder de la Neo Marina y antagonista principal de One Piece Film: Z. Antiguo almirante y maestro de Kizaru y Aokiji, su objetivo es erradicar en los piratas tras sufrir pérdidas muy duras haciendo que pierda la fe en la justicia.', '/img/zephyr.png', 4, 31, 53, 'Inglés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (411, 'Morado/Negro', 0, 5000, 0, '[Al Atacar] DON!! -4: K.O. hasta a 1 de los personajes de tu oponente con un coste de 3 o menos. Después, este Líder gana +1000 de poder durante este turno.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (412, 'Yamato', 'OP02-042', 'R', 'Personaje', 0.10, 'Yamato utiliza un arma llamada kanabo, un arma tradicional japonesa asociada a los onis(demonios).', '/img/yamato_(op-02).png', 4, 31, 16, 'Inglés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (412, 'Verde', 4, 6000, 0, 'Trata el nombre de esta carta también como [Kouzuki Oden]. [Al jugar] Descansa hasta 1 de los personajes de tu oponente con un coste de 6 o menos.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (413, 'Portgas.D.Ace', 'OP02-013', 'M', 'Personaje', 850.00, 'Portgas.D.Ace comandante de la segunda división de los Piratas de Edward Newgate (Barba blanca) y hermano de Monkey.D.Luffy, posee Mera Mera no Mi una fruta tipo (Logia) que le premite crear, controlar y convertirse en fuego.', '/img/ace-manga.png', 4, 31, 2, 'Inglés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (413, 'Rojo', 7, 7000, 0, '[Al jugar] Da a hasta 2 personajes de tu oponente -3000 de poder. Si tu Líder es "Piratas de Barbablanca", esta carta gana [Prisa].');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (414, 'Kouzuki Toki', 'OP02-031', 'R', 'Personaje', 3.10, 'Kouzuki Toki es una mujer misteriosa del País de Wano y esposa de Kozuki Oden, posee una fruta del diablo llamada Toki Toki no Mi tipo (Paramecia) que le permite viajar hacia el futuro en el tiempo. ', '/img/toki.png', 4, 31, 32, 'Inglés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (414, 'Verde', 1, 0, 1000, 'Si tienes un Personaje [Kouzuki Oden], este Personaje gana [Bloqueador].');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (415, 'Squard', 'OP02-009', 'AA', 'Personaje', 1.00, 'Squard Capitán de los Piratas de la Vorágine y aliado de Barbablanca durante la guerra de Marineford.', '/img/squard.png', 4, 31, 31, 'Inglés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (415, 'Rojo', 3, 5000, 0, '[Al jugar] Si tu Líder incluye "Piratas de Barbablanca" en su tipo, da a hasta 1 personaje de tu oponente -4000 de poder durante este turno y añade 1 carta de la parte superior de tus cartas de Vida a tu mano.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (416, 'Shanks', 'OP-DON', 'PROMO', 'DON!! Card', 2.30, 'Shanks llamado el (pelirrojo) es uno de los emperadores del mar (Yonko) que no posee fruta del diablo basando su poder en el haki y su habilidad con la espada. Su sombrero paso de su capitan a el y de el a Luffy.', '/img/shanks-don.png', 4, 31, 10, 'Inglés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (416, 'Incoloro', 0, 0, 0, '[Tu Turno] El Personaje o Líder al que esté ligada esta carta gana +1000 de poder.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (417, 'Sakazuki', 'OP02-099', 'AA', 'Personaje', 35.00, 'Sakazuki conocido también por Akainu es el almirante de Flota de la Marina. Poseedor de la fruta Magu Magu no Mi una fruta (Logia) que le permite crear y controlar magma. Un líder implacable centrado en la Justicia Absoluta.', '/img/sakazuki.png', 4, 31, 71, 'Japonés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (417, 'Negro', 6, 7000, 0, '[Activate: Main] [Once Per Turn] Roba 1 carta y descarta 1 carta de tu mano. [Al Atacar] Da a hasta 1 de los personajes de tu oponente -1 de coste durante este turno.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (418, 'Kizaru', 'OP02-114', 'AA', 'Personaje', 5.00, 'Almirante de la Marina con el poder de la fruta Pika Pika no Mi una fruta de tipo (Logia) que le permite convertirse en luz y moverse a la velocidad de la luz. Sigue una justicia ambigua', '/img/kizaru.png', 4, 31, 22, 'Japonés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (418, 'Negro', 4, 5000, 1000, '[Bloqueador] [Tu Turno] Si este Personaje está descansado, no puede ser K.O. por efectos de cartas. [Al Bloquear] Este personaje gana +1000 de poder durante esta batalla.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (419, 'Little Sadi', 'OP02-073', 'AA', 'Personaje', 3.50, ' Little Sadi es una guardia de Impel Down famosa por su carácter sádico, disfruta castigando a los prisioneros y comanda a las Bestias Carcelarias.', '/img/little-sadi.png', 4, 31, 44, 'Japonés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (419, 'Morado', 3, 3000, 2000, '[Al jugar] Puedes jugar 1 Personaje de tipo [Jailer Beast] con un coste de 4 o menos desde tu mano en modo descansado.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (420, 'Monkey.D.Garp', 'OP02-002', 'AA', 'Líder', 28.50, 'Monkey.D.Garp también conocido por el Héroe de la Marina es vicealmirante de la Marina. Conocido por su fuerza física devastadora y por acorralar al Rey de los Piratas.', '/img/garp.png', 4, 31, 12, 'Japonés');

INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (420, 'Rojo/Negro', 0, 5000, 0, '[Al Atacar] Da a hasta 1 de los personajes de tu oponente con un coste de 0: K.O. [Tu Turno] Cuando el coste de un personaje es reducido, este personaje gana +2000 de poder durante este turno.');


INSERT INTO accesorios (nombre, tipo, descripcion, precio, imagen_Url, stock) 
VALUES ('Tapete de Juego Pokemon Kanto', 'Tapete', 'Tapete de juego oficial con diseño artístico de alta definición. Presenta a los iniciales de la región de Kanto. Aproximadamente 24 x 13,5 pulgadas y se mantiene completamente plano. Superficie de tela suave para proteger las cartas y base de goma antideslizante para mayor estabilidad durante su uso. Color NEGRO.', 29.95, '/img/tapete-pk.png', 20
);

INSERT INTO accesorios (nombre, tipo, descripcion, precio, imagen_Url, stock) 
VALUES ('Tapete de Juego Nami & Zeus', 'Tapete', 'Tapete de juego premium con diseño artístico de Nami y Zeus. Superficie de tela suave de alta calidad para proteger las cartas durante el juego y base de goma antideslizante para evitar desplazamientos. Ideal para One Piece Card Game.', 34.95, '/img/tapete-Nami&Zeus.png', 15
);

INSERT INTO accesorios (nombre, tipo, descripcion, precio, imagen_Url, stock) 
VALUES ('Álbum de Coleccionista Eevee', 'Álbum', 
    'Carpeta de 9 bolsillos con diseño artístico de Eevee. Material libre de ácido y PVC para una protección segura a largo plazo. Capacidad para 360 cartas con carga lateral para evitar caídas.', 24.50, '/img/album-eevee.png', 20
);



-- CARRITO DE COMPRA (Ejemplo para user@wildcards.com)
INSERT INTO carrito_compra (carrito_id, cliente_id, session_id, fecha_creacion, updated_at, carrito_activo) 
VALUES (1, 2, 'manual-insert-session', '2024-01-01 10:00:00', '2024-01-01 10:00:00', 1);

-- ITEMS DEL CARRITO (Mega-Charizard x)
INSERT INTO carrito_items (carrito_item_id, carrito_id, carta_id, cantidad, precio_unidad) 
VALUES (1, 1, 100, 1, 150.00);
