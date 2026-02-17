-- ROLES
INSERT INTO roles (id, nombre) VALUES (1, 'ROLE_ADMIN');
INSERT INTO roles (id, nombre) VALUES (2, 'ROLE_USER');

-- USUARIOS (Contraseña para ambos: "1234")
-- La contraseña está hasheada con BCrypt
INSERT INTO usuarios (id, username, password, enabled) VALUES (1, 'admin@wildcards.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1);
INSERT INTO usuarios (id, username, password, enabled) VALUES (2, 'user@wildcards.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 1);

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

--MAGIC
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (2, 2, 'Alpha', '1993-08-05', 'LEA', 295);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (8, 2, 'Outlaws of Thunder Junction', '2024-04-19', 'OTJ', 271);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (9, 2, 'Bloomburrow', '2024-08-02', 'BLB', 281);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (10, 2, 'Duskmourn: House of Horror', '2024-09-27', 'DSK', 276);

--ONEPIECE
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (3, 4, 'Romance Dawn', '2022-12-02', 'OP-01', 121);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (11, 4, 'Wings of the Captain', '2024-03-15', 'OP-06', 126);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (12, 4, '500 Years in the Future', '2024-06-28', 'OP-07', 126);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (13, 4, 'Two Legends', '2024-09-13', 'OP-08', 126);

--YUGIOH
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4, 3, 'Legend of Blue Eyes', '2002-03-08', 'LOB', 126);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (14, 3, 'Legacy of Destruction', '2024-04-26', 'LEDE', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (15, 3, 'The Infinite Forbidden', '2024-07-19', 'INFO', 100);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (16, 3, 'Rage of the Abyss', '2024-10-11', 'ROTA', 100);



INSERT INTO cartas (carta_id, nombre, numero_carta, rareza, tipo, precio, descripcion, imagen_url, juego_id, set_id, stock, idioma) 
VALUES (100, 'Mega-Charizard x', '4/102', 'Rare', 'Criatura', 150.00, 'Escupe fuego que derrite rocas.', '/img/MCX.png', 1, 1, 10, 'Español');

-- 3. Insertamos en la tabla hija 'pokemon_cartas' usando el MISMO ID (100)
INSERT INTO pokemon_cartas (carta_id, hp, pokemon_tipo, fase, evoluciona_de, ataques, debilidad, resistencia, coste_retirada) 
VALUES (100, 120, 'Fuego', 'Stage 2', 'Charmeleon', 'Lanzallamas, Giro Fuego', 'Agua', 'Lucha', 3);

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
