DROP DATABASE IF EXISTS fotografia;
DROP DATABASE IF EXISTS ´fotografia´;
CREATE DATABASE fotografia;
USE fotografia;

CREATE TABLE `admin` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(45) NOT NULL,
  `contrasena` char(60) NOT NULL,
  `cookie_hash` char(60) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;


INSERT INTO `admin` (`id`, `email`, `contrasena`, `cookie_hash`, `created_at`, `updated_at`) VALUES
(1, 'deamorindamian@gmail.com', '$2a$10$ly7z5TfmEYB9OjunbN2CfevempMyfna0Wh4QRU/Llih0wucLxPaoq', '', '2021-01-05 23:12:38', '2021-01-06 00:06:36');


CREATE TABLE `overview` (
  `id` int(10) UNSIGNED NOT NULL,
  `ruta` varchar(45) NOT NULL,
  `nombre` varchar(45) NOT NULL,
  `descripcion` varchar(500) DEFAULT NULL,
  `lugar` varchar(45) NOT NULL,
  `fecha` date,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `view` varchar(45) NOT NULL,
  `checkindex` smallint(6) NOT NULL,
  `rating` smallint(6) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
--
-- Indices de la tabla `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `overview`
--
ALTER TABLE `overview`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `overview`
--
ALTER TABLE `overview`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;
COMMIT;
