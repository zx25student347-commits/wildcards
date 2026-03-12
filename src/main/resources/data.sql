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
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (1, 1, 'Base Set', '1999-01-09', 'BS', 102);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (5, 1, 'Temporal Forces', '2024-03-22', 'TEF', 218);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (6, 1, 'Twilight Masquerade', '2024-05-24', 'TWM', 226);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (7, 1, 'Shrouded Fable', '2024-08-02', 'SFA', 99);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (8, 1, 'XY - Phantom Forces', '2014-11-05', 'PHF', 122);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (9, 1, 'Scarlet & Violet Promos (ID)', '2023-03-01', 'SV-P', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (10, 1, 'The Best of XY', '2017-04-21', 'XY', 188);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (11, 1, 'XY - Ancient Origins', '2015-08-12', 'AOR', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (12, 1, 'Lillie’s Clefairy ex Special Set', '2025-02-01', 'SV-P', 742);

--MAGIC
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (2, 2, 'Alpha', '1993-08-05', 'LEA', 295);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (44, 2, 'Outlaws of Thunder Junction', '2024-04-19', 'OTJ', 271);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (55, 2, 'Bloomburrow', '2024-08-02', 'BLB', 281);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (66, 2, 'Duskmourn: House of Horror', '2024-09-27', 'DSK', 276);

--ONEPIECE
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (3, 4, 'Romance Dawn', '2022-12-02', 'OP-01', 121);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (77, 4, 'Wings of the Captain', '2024-03-15', 'OP-06', 126);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (88, 4, '500 Years in the Future', '2024-06-28', 'OP-07', 126);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (13, 4, 'Two Legends', '2024-09-13', 'OP-08', 126);

--YUGIOH
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4, 3, 'Legend of Blue Eyes', '2002-03-08', 'LOB', 126);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (14, 3, 'Legacy of Destruction', '2024-04-26', 'LEDE', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (15, 3, 'The Infinite Forbidden', '2024-07-19', 'INFO', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (16, 3, 'Rage of the Abyss', '2024-10-11', 'ROTA', 100);



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

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (103, 'N', '180/171', 'Full Art Rare', 'Entrenador', 190.00, 'Each player shuffles their hand into their deck and draws a card for each of their remaining Prize cards.', '/img/N.jpg', 1, 10, 2, 'Japonés');

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (104, 'Mega Latias ex', '100/132', 'Ultra Rare', 'Criatura', 0.50, 'The Mega-Evolved form of Latias.', '/img/ML.png', 1, 11, 4, 'Inglés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (104, 280, 'Dragón', 'Mega Evolution', 'Latias', 'Strafe, Illusory Impulse', 'Hada', 'Ninguna', 1);

INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (105, 'Lillie’s Clefairy ex', '765/742', 'Special Art Rare', 'Criatura', 120.00, 'A Pokémon belonging to the trainer Lillie.', '/img/LL.png', 1, 12, 3, 'Japonés');

INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (105, 190, 'Psíquico', 'Básico', 'Ninguna', 'Fairy Zone, Full Moon Rondó', 'Metal', 'Ninguna', 1);



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
