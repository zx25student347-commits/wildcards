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
INSERT INTO juego (juego_id, nombre, descripcion, web_oficial) VALUES (1, 'Pokemon', 'Pokémon Trading Card Game', 'https://tcg.pokemon.com');
INSERT INTO juego (juego_id, nombre, descripcion, web_oficial) VALUES (2, 'Magic', 'Magic: The Gathering', 'https://magic.wizards.com');
INSERT INTO juego (juego_id, nombre, descripcion, web_oficial) VALUES (3, 'OnePiece', 'One Piece Card Game', 'https://en.onepiece-cardgame.com');
INSERT INTO juego (juego_id, nombre, descripcion, web_oficial) VALUES (4, 'Yugioh', 'Yu-Gi-Oh! TCG', 'https://www.yugioh-card.com');

-- SETS
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (1, 1, 'Base Set', '1999-01-09', 'BS', 102);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (2, 2, 'Alpha', '1993-08-05', 'LEA', 295);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (3, 3, 'Romance Dawn', '2022-12-02', 'OP-01', 121);
INSERT INTO cartas_sets (set_id, juego_id, nombre, fecha_salida, codigo_set, cartas_total) VALUES (4, 4, 'Legend of Blue Eyes', '2002-03-08', 'LOB', 126);


