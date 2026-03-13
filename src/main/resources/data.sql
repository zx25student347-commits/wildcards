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

--MAGIC
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (7, 2, 'Alpha', '1993-08-05', 'LEA', 295);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (8, 2, 'Outlaws of Thunder Junction', '2024-04-19', 'OTJ', 271);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (9, 2, 'Bloomburrow', '2024-08-02', 'BLB', 281);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (10, 2, 'Duskmourn: House of Horror', '2024-09-27', 'DSK', 276);

--ONEPIECE
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (11, 4, 'Romance Dawn', '2022-12-02', 'OP-01', 121);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (12, 4, 'Wings of the Captain', '2024-03-15', 'OP-06', 126);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (13, 4, '500 Years in the Future', '2024-06-28', 'OP-07', 126);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (14, 4, 'Two Legends', '2024-09-13', 'OP-08', 126);

--YUGIOH
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (15, 3, 'Legend of Blue Eyes', '2002-03-08', 'LOB', 126);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (16, 3, 'Legacy of Destruction', '2024-04-26', 'LEDE', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (17, 3, 'The Infinite Forbidden', '2024-07-19', 'INFO', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (18, 3, 'Rage of the Abyss', '2024-10-11', 'ROTA', 100);



INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (100, 'Mega-Charizard x', '4/102', 'Rare', 'Criatura', 2.50, 'Escupe fuego que derrite rocas.', '/img/MCX.png', 1, 8, 10, 'Inglés');

-- 3. Insertamos en la tabla hija 'pokemon_cartas' usando el MISMO ID (100)
INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (100, 360, 'Fuego', 'Stage 2', 'Charmeleon', 'Lanzallamas, Giro Fuego', 'Agua', 'Lucha', 3);


INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (101, 'Mega Gengar ex', '056/094', 'Ultra Rare', 'Criatura', 1.00, 'The Mega-Evolved form of Gengar.', '/img/MG.png', 1, 8, 5, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (101, 350, 'Oscuridad', 'Stage 2', 'Haunter', 'Void Gale', 'Lucha', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (102, 'Victini ex', '077/SV-P', 'Promo', 'Criatura', 350.00, 'Pokémon Victoria.', '/img/Victiniex.png', 1, 9, 5, 'Indonesio');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (102, 190, 'Fuego', 'Básico', 'Ninguna', 'Serangan Mundur, Victory Flame', 'Agua', 'Ninguna', 1);

-- INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
-- VALUES (103, 'N', '180/171', 'Full Art Rare', 'Entrenador', 190.00, 'Each player shuffles their hand into their deck and draws a card for each of their remaining Prize cards.', '/img/N.jpg', 1, 10, 2, 'Japonés');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (104, 'Mega Latias ex', '100/132', 'Ultra Rare', 'Criatura', 0.50, 'The Mega-Evolved form of Latias.', '/img/ML.png', 1, 11, 4, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (104, 280, 'Dragón', 'Mega Evolution', 'Latias', 'Strafe, Illusory Impulse', 'Hada', 'Ninguna', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (105, 'Lillie’s Clefairy ex', '765/742', 'Special Art Rare', 'Criatura', 120.00, 'A Pokémon belonging to the trainer Lillie.', '/img/LL.png', 1, 12, 3, 'Japonés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (105, 190, 'Psíquico', 'Básico', 'Ninguna', 'Fairy Zone, Full Moon Rondó', 'Metal', 'Ninguna', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (106, 'M-Rayquaza-EX', '98/98', 'Ultra Rare', 'Criatura', 700.00, 'Evolves from Rayquaza-EX', '/img/M-Rayquaza-EX.png', 1, 4, 20, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (106, 220, 'Incoloro', 'Mega', 'Rayquaza-EX', 'Emerald Break', 'Rayo', 'Lucha', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (107, 'M-Sceptile-EX', '85/98', 'Ultra Rare', 'Criatura', 80.00, 'Evolves from Sceptile-EX', '/img/M-Sceptile-EX.png', 1, 4, 33, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (107, 220, 'Planta', 'Mega', 'Sceptile-EX', 'Jagged Saber', 'Fuego', 'Ninguna', 2);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (108, 'Marnie''s Morpeko', '206', 'Promo', 'Criatura', 35.00, 'Marnie''s companion.', '/img/Marnies-Morpeko.png', 1, 2, 50, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (108, 70, 'Oscuridad', 'Básico', 'Ninguna', 'Spiky Wheel', 'Planta', 'Ninguna', 0);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (109, 'Kingambit', '130', 'Promo Rare', 'Criatura', 1.00, 'Evolui de Bisharp', '/img/Kingambit.png', 1, 2, 60, 'Portugués');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (109, 180, 'Metal', 'Fase 2', 'Bisharp', 'Derrocada, Laceração Massiva', 'Fuego', 'Planta', 4);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (110, 'Raging Bolt ex', '166/131', 'Special Illustration Rare', 'Criatura', 85.00, 'Ancient Pokémon', '/img/Raging-Bolt-ex.png', 1, 2, 54, 'Inglés');

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



-- 2. Tabla padre 'cartas' (ID 200)
INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (200, 'Black Lotus', 'N/A', 'Rare', 'Artifact', 50000.00, 'Adds 3 mana of any single color.', '/img/BlackLotus.png', 2, 2, 1, 'Inglés');

-- 3. Tabla hija 'magic_cartas' (ID 200)
INSERT INTO magic_cartas (carta_id, mana_cost, card_type, power, toughness, abilities, colors) 
VALUES (200, '0', 'Artifact', NULL, NULL, 'Sacrifice Black Lotus: Add three mana.', 'Colorless');

-- 1. Tabla padre 'cartas' (ID 300)
INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (300, 'Monkey D. Luffy', 'OP01-001', 'Leader', 'Personaje', 15.00, 
'Capitán de los Piratas del Sombrero de Paja.', '/img/luffy.png', 4, 3, 25, 'Japonés');

-- 2. Tabla hija 'onepiece_cartas' (ID 300)
INSERT INTO onepiece_cartas (carta_id, color, coste, power, counter, effect) 
VALUES (300, 'Rojo', 5, 6000, 1000, 'Puede atacar activo si tiene 2 o más DON!!');

-- 1. Tabla padre 'cartas' (ID 400)
INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (400, 'Blue-Eyes White Dragon', 'LOB-001', 'Ultra Rare', 'Monstruo', 35.00, 
'Este legendario dragón es una poderosa máquina de destrucción.', '/img/blueeyes.png', 3, 4, 15, 'Inglés');

-- 2. Tabla hija 'yugioh_cartas' (ID 400)
INSERT INTO yugioh_cartas (carta_id, atributo, tipo_detalle, nivel, ataque, defensa, texto_efecto) 
VALUES (400, 'Luz', 'Dragón', 8, 3000, 2500, 'Monstruo Normal');

-- CARRITO DE COMPRA (Ejemplo para user@wildcards.com)
INSERT INTO carrito_compra (carrito_id, cliente_id, session_id, fecha_creacion, updated_at, carrito_activo) 
VALUES (1, 2, 'manual-insert-session', '2024-01-01 10:00:00', '2024-01-01 10:00:00', 1);

-- ITEMS DEL CARRITO (Mega-Charizard x)
INSERT INTO carrito_items (carrito_item_id, carrito_id, carta_id, cantidad, precio_unidad) 
VALUES (1, 1, 100, 1, 150.00);
