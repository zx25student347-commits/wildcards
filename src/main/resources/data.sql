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
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (2003, 2, 'Ixalan', '2017-09-29', 'XLN', 289);

--ONEPIECE
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (30, 4, 'Romance Dawn', '2022-12-02', 'OP-01', 121);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (31, 4, 'Wings of the Captain', '2024-03-15', 'OP-06', 126);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (32, 4, '500 Years in the Future', '2024-06-28', 'OP-07', 126);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (33, 4, 'Two Legends', '2024-09-13', 'OP-08', 126);

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
VALUES (101, 350, 'Oscuridad', 'Stage 2', 'Haunter', 'Void Gale', 'Lucha', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (102, 'Victini ex', '077/SV-P', 'Promo', 'Criatura', 350.00, ' Fue encerrado durante 200 años en la Isla Libertad por un antiguo guardián para proteger su inmenso poder.', '/img/Victiniex.png', 1, 7, 5, 'Indonesio');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (102, 190, 'Fuego', 'Básico', 'Ninguna', 'Serangan Mundur, Victory Flame', 'Agua', 'Ninguna', 1);

-- INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
-- VALUES (103, 'N', '180/171', 'Full Art Rare', 'Entrenador', 190.00, 'Each player shuffles their hand into their deck and draws a card for each of their remaining Prize cards.', '/img/N.jpg', 1, 10, 2, 'Japonés');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (104, 'Mega Latias ex', '100/132', 'Ultra Rare', 'Criatura', 0.50, 'Este color morado es la mezcla del rojo de Latias y el color azul de Latios, simbolizando su fuerte vínculo.', '/img/ML.png', 1, 1, 4, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (104, 280, 'Dragón', 'Mega Evolution', 'Latias', 'Strafe, Illusory Impulse', 'Hada', 'Ninguna', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (105, 'Lillie’s Clefairy ex', '765/742', 'Special Art Rare', 'Criatura', 120.00, 'La ilustración de esta carta subraya el profundo vínculo emocional entre Lillie y este Pokémon.', '/img/LL.png', 1, 5, 3, 'Japonés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (105, 190, 'Psíquico', 'Básico', 'Ninguna', 'Fairy Zone, Full Moon Rondó', 'Metal', 'Ninguna', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (106, 'M-Rayquaza-EX', '98/98', 'Ultra Rare', 'Criatura', 700.00, 'Se dice que vive en la capa de ozono, alimentándose de meteoritos y protegiendo al mundo de las amenazas externas.', '/img/M-Rayquaza-EX.png', 1, 4, 20, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (106, 220, 'Incoloro', 'Mega', 'Rayquaza-EX', 'Emerald Break', 'Rayo', 'Lucha', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (107, 'M-Sceptile-EX', '85/98', 'Ultra Rare', 'Criatura', 80.00, 'Es considerado un depredador máximo en su hábitat natural, donde la vegetación crece densamente gracias a su energía.', '/img/M-Sceptile-EX.png', 1, 4, 33, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (107, 220, 'Planta', 'Mega', 'Sceptile-EX', 'Jagged Saber', 'Fuego', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (108, 'Marnie''s Morpeko', '206', 'Promo', 'Criatura', 35.00, 'Morpeko fue un regalo de su hermano mayor, Nerio, cuando ella tenía cinco años, lo que la hizo más feliz y ayudó a definir su personalidad..', '/img/Marnies-Morpeko.png', 1, 2, 50, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (108, 70, 'Oscuridad', 'Básico', 'Ninguna', 'Spiky Wheel', 'Planta', 'Ninguna', 0);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (109, 'Kingambit', '130', 'Promo Rare', 'Criatura', 1.00, 'Es un Pokémon tipo Siniestro/Acero basado en un rey de ajedrez y un shogun japonés, caracterizado por su movimiento lento que imita el paso corto del rey en el tablero', '/img/Kingambit.png', 1, 2, 60, 'Portugués');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (109, 180, 'Metal', 'Fase 2', 'Bisharp', 'Derrocada, Laceração Massiva', 'Fuego', 'Planta', 4);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (110, 'Raging Bolt ex', '166/131', 'Special Illustration Rare', 'Criatura', 85.00, 'Está basado en un saurópodo (dinosaurio de cuello largo), y su diseño combina la majestuosidad de Raikou con un aspecto de "lagarto trueno" prehistórico.', '/img/Raging-Bolt-ex.png', 1, 2, 54, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (110, 240, 'Dragón', 'Básico', 'Ninguna', 'Burst Roar, Bellowing Thunder', 'Ninguna', 'Ninguna', 3);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (111, 'Mega Lopunny ex', '128/094', 'Ultra Rare Star', 'Criatura',25.00, 'The Mega-Evolved form of Lopunny.', '/img/Mega-Lopunny-ex.png', 1, 1, 37, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (111, 330, 'Incoloro', 'Stage 1', 'Buneary', 'Gale Thrust, Spiky Hopper', 'Lucha', 'Ninguna', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (112, 'Mega Sharpedo ex', '127/094', 'Ultra Rare Star', 'Criatura', 45.00, 'The Mega-Evolved form of Sharpedo.', '/img/Mega-Sharpedo.png', 1, 1, 18, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (112, 330, 'Oscuridad', 'Stage 1', 'Carvanha', 'Greedy Fang, Hungry Jaws', 'Planta', 'Ninguna', 0);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (113, 'Umbreon ex', '161/131', 'Special Illustration Rare', 'Criatura', 900.00, 'Tera Pokémon ex', '/img/Umbreon-ex.png', 1, 6, 2, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (113, 280, 'Oscuridad', 'Fase 1', 'Eevee', 'Moon Mirage, Onyx', 'Planta', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (114, 'Sylveon ex', '156/131', 'Special Illustration Rare', 'Criatura', 270.00, 'Tera Pokémon ex', '/img/Sylveon-ex.png', 1, 6, 3, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (114, 270, 'Psíquico', 'Fase 1', 'Eevee', 'Magical Charm, Angelite', 'Metal', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (115, 'Iono', '269/193', 'Special Illustration Rare', 'Entrenador', 90.00, 'Iono.', '/img/Iono.png', 1, 8, 67, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (115, NULL, 'Soporte', 'Entrenador', 'Ninguna', 'Cada jugador baraja su mano y la pone en el fondo de su baraja. Si alguno de los jugadores puso alguna carta en el fondo de su baraja de esta manera, cada jugador roba una carta por cada una de sus cartas de Premio restantes.', NULL, NULL, NULL);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma)
VALUES (116, 'Dendra', '266/193', 'Special Illustration Rare', 'Entrenador', 10.00, 'Dendra.', '/img/Dendra.png', 1, 8, 120, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada)
VALUES (116, NULL, 'Soporte', 'Entrenador', 'Ninguna', 'Pon una carta de tu mano en el fondo de tu baraja. Si lo haces, roba cartas hasta que tengas 5 cartas en tu mano. (Si no tienes otras cartas en tu mano, no puedes usar esta carta).', NULL, NULL, NULL);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (117, 'Slowking ex', '238/193', 'Ultra Rare', 'Criatura', 5.00, 'Tera Pokémon ex: Mientras este Pokémon esté en tu Banca, evita todo el daño infligido a este Pokémon por ataques.', '/img/Slowking-ex.png', 1, 8, 88, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (117, 270, 'Psíquico', 'Fase 1', 'Slowpoke', 'Wise Headbutt, Psych Up', 'Oscuridad', 'Ninguna', 3);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (118, 'Quaquaval ex', '260/193', 'Special Illustration Rare', 'Criatura', 25.00, 'Baila de una manera que evoca tierras lejanas.', '/img/Quaquaval-ex.png', 1, 8, 46, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (118, 320, 'Agua', 'Fase 2', 'Quaxwell', 'Exciting Dance, Spiral Shot', 'Rayo', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (119, 'Eri', '136/131', 'Special Illustration Rare', 'Entrenador', 1.30, 'Mira la mano de tu rival y descarta hasta 2 cartas de Objeto que encuentres allí.', '/img/Eri.png', 1, 6, 79, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (119, NULL, 'Soporte', 'Entrenador', 'Ninguna', 'Tu rival revela su mano y tu descartas hasta 2 cartas objeto que encuentres allí', NULL, NULL, NULL);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (120, 'Espeon ex', '155/131', 'Special Illustration Rare', 'Criatura', 400.00, 'Tera Pokémon ex. Astral Type.', '/img/Espeon.png', 1, 6, 20, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (120, 270, 'Psíquico', 'Fase 1', 'Eevee', 'Psych Out, Amazez', 'Psíquico', 'Ninguna', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (121, 'Leafeon ex', '155/131', 'Special Illustration Rare', 'Criatura', 246.00, 'Tera Pokémon ex. Astral Type.', '/img/Leafeon.png', 1, 6, 15, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (121, 270, 'Planta', 'Fase 1', 'Eevee', 'Verdant Storm, Moss Agate', 'Fuego', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (122, 'Sparkling Crystal', '129/131', 'ACE SPEC Rare', 'Objeto', 0.70, 'Herramienta: Los ataques del Pokémon Tera al que esté unida esta carta cuestan 1 Energía menos (de cualquier tipo).', '/img/Sparkling-Crystal.png', 1, 6, 200, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (122, NULL, 'Herramienta', 'ACE SPEC', 'Ninguna', 'Cuando el Pokémon Tera al que esté unida esta carta usa un ataque que cuesta 1 energía (La energía puede ser de cualquier tipo)', NULL, NULL, NULL);




-- 2. Tabla padre 'cartas' (ID 200)
INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (200, 'Black Lotus', 'N/A', 'Rare', 'Artifact', 50000.00, 'Adds 3 mana of any single color.', '/img/BlackLotus.png', 2, 2, 1, 'Inglés');

-- 3. Tabla hija 'magic_cartas' (ID 200)
INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (200, '0', 'Artifact', NULL, NULL, 'Sacrifice Black Lotus: Add three mana.', 'Colorless');

-- INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
-- VALUES (201, 'Yue, the Moon Spirit', 'R 0083', 'Rare', 'Legendary Creature', 12.00, 'Flying, vigilance, Waterbend', '/img/yue.jpg', 2, 5004, 2, 'Inglés');

-- INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
-- VALUES (201, '{3}{U}', 'Legendary Creature — Spirit Ally', 3, 3, 'Flying, vigilance, Waterbend 5, T: cast noncreature spell for free', 'Blue');

-- -- Day of Black Sun (Conjuro)
-- INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
-- VALUES (202, 'Day of Black Sun', 'R 0094', 'Rare', 'Sorcery', 8.50, 'Destroy creatures with mana value X or less', '/img/sol_negro.jpg', 2, 5004, 3, 'Inglés');

-- INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
-- VALUES (202, '{X}{B}{B}', 'Sorcery', NULL, NULL, 'Each creature with mana value X or less loses all abilities and is destroyed', 'Black');



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
VALUES (215, 'Odd-Eyes Vortex Dragon (Giant Card)', 'DOCS-EN045', 'Super Rare', 'Monstruo', 500000.00, 'Cuando esta carta es Invocada de Modo Especial: puedes seleccionar 1 monstruo en Posición de Ataque boca arriba que controle tu adversario; devuélvelo a la mano.', '/img/Dragon_vortice.jpg', 3, 4012, 1, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (215, 7, 'VIENTO', 'Dragón / Fusión / Efecto', 2500, 3000, '1 monstruo "Ojos Anómalos" + 1 Monstruo de Péndulo. Cuando esta carta es Invocada de Modo Especial: puedes devolver 1 monstruo en ataque del rival a la mano. Durante el turno de cualquier jugador, cuando se activa una carta o efecto: puedes barajar 1 Monstruo de Péndulo boca arriba en tu Deck Extra al Deck, niega la activación y destruye la carta.');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (216, 'Pot of Greed', 'BP01-EN034', 'Rare', 'Mágica', 2.50, 'Roba 2 cartas.', '/img/potOfGreed.jpg', 3, 4004, 5, 'Inglés');

INSERT INTO yugioh_cartas (carta_id, nivel, atributo, tipo_detalle, ataque, defensa, texto_efecto) 
VALUES (216, NULL, 'MÁGICA', 'Magia Normal', NULL, NULL, 'Roba 2 cartas.');



-- 1. Tabla padre 'cartas' (ID 300)
INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (300, 'Monkey D. Luffy', 'OP01-001', 'Leader', 'Personaje', 15.00, 
'Capitán de los Piratas del Sombrero de Paja.', '/img/luffy.png', 4, 3, 25, 'Japonés');

-- 2. Tabla hija 'onepiece_cartas' (ID 300)
INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (300, 'Rojo', 5, 6000, 1000, 'Puede atacar activo si tiene 2 o más DON!!');


INSERT INTO accesorios (nombre, tipo, descripcion, precio, imagen_Url, stock) 
VALUES ('Tapete de Juego Pokemon Kanto', 'Tapete', 'Tapete de juego oficial con diseño artístico de alta definición. Presenta a los iniciales de la región de Kanto. Aproximadamente 24 x 13,5 pulgadas y se mantiene completamente plano. Superficie de tela suave para proteger las cartas y base de goma antideslizante para mayor estabilidad durante su uso. Color NEGRO.', 29.95, '/img/tapete-pk.png', 20
);


-- CARRITO DE COMPRA (Ejemplo para user@wildcards.com)
INSERT INTO carrito_compra (carrito_id, cliente_id, session_id, fecha_creacion, updated_at, carrito_activo) 
VALUES (1, 2, 'manual-insert-session', '2024-01-01 10:00:00', '2024-01-01 10:00:00', 1);

-- ITEMS DEL CARRITO (Mega-Charizard x)
INSERT INTO carrito_items (carrito_item_id, carrito_id, carta_id, cantidad, precio_unidad) 
VALUES (1, 1, 100, 1, 150.00);
