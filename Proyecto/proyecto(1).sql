-- phpMyAdmin SQL Dump
-- version 4.8.5
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-06-2019 a las 08:11:26
-- Versión del servidor: 10.1.40-MariaDB
-- Versión de PHP: 7.3.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `item`
--

CREATE TABLE `item` (
  `id` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `fechaAlta` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `fechaBaja` date DEFAULT NULL,
  `fechaAviso` date DEFAULT NULL,
  `imagen` varchar(100) NOT NULL,
  `lista` int(11) NOT NULL,
  `orden` int(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `item`
--

INSERT INTO `item` (`id`, `nombre`, `descripcion`, `fechaAlta`, `fechaBaja`, `fechaAviso`, `imagen`, `lista`, `orden`) VALUES
(2, 'sdfas', 'sdfasdf', '2019-06-14 10:54:51', NULL, '2019-06-27', 'vsadvasdva', 1, 10),
(9, 'asdad', 'sdasdasd', '2019-06-14 17:23:59', '2019-06-14', '2019-06-05', '1560510416_7.png', 2, 1),
(39, 'aa', 'fasdfasdf', '2019-06-14 11:12:39', NULL, '2019-06-04', '1560510312_3.jpg', 2, 2),
(40, 'Cámbiame el nombre', '', '2019-06-14 11:11:44', NULL, NULL, '', 2, 0),
(41, 'asdfasdfasdf', '', '2019-06-14 11:12:59', NULL, NULL, '', 6, 0),
(42, 'asdfasdfas', '', '2019-06-14 11:13:00', NULL, NULL, '', 6, 0),
(43, 'Cámbiame el nombre', '', '2019-06-14 11:35:37', NULL, NULL, '', 2, 0),
(44, 'Cámbiame el nombre', '', '2019-06-14 11:36:33', NULL, NULL, '', 7, 0),
(45, 'asdadadad', 'asdasdasdasda', '2019-06-14 12:07:53', NULL, '2019-06-18', '1560513691_3.jpg', 9, 2),
(46, 'sadas2', 'asdadsd', '2019-06-14 12:11:34', NULL, '2019-06-12', '', 9, 0),
(48, 'Cámbiame el nombre', '', '2019-06-14 17:24:50', '2019-06-14', NULL, '', 7, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `lista`
--

CREATE TABLE `lista` (
  `id` int(11) NOT NULL,
  `usuarioPropietario` varchar(9) NOT NULL,
  `eliminada` tinyint(1) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `lista`
--

INSERT INTO `lista` (`id`, `usuarioPropietario`, `eliminada`, `nombre`) VALUES
(1, '49129628H', 1, 'lista'),
(2, '11111111A', 0, 'lista1'),
(6, '11111111A', 1, 'asdfasdf'),
(7, '11111112B', 0, 'asdasd'),
(8, '11111112B', 0, 'asdasdasda'),
(9, '11111112B', 0, 'czxzcxczxcz'),
(12, '11111111A', 0, 'lista2'),
(13, '11111111A', 0, 'lista3');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion`
--

CREATE TABLE `notificacion` (
  `id` int(11) NOT NULL,
  `descripcion` varchar(100) NOT NULL,
  `usuarioEnvia` varchar(30) NOT NULL,
  `usuarioRecibe` varchar(9) NOT NULL,
  `leida` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notificacion-item`
--

CREATE TABLE `notificacion-item` (
  `item` int(11) NOT NULL,
  `notificacion` int(11) NOT NULL,
  `fechaAviso` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `dni` varchar(9) NOT NULL,
  `password` varchar(15) NOT NULL,
  `nombre` varchar(15) NOT NULL,
  `apellidos` varchar(30) NOT NULL,
  `usuario` varchar(15) NOT NULL,
  `rol` tinyint(1) NOT NULL,
  `email` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`dni`, `password`, `nombre`, `apellidos`, `usuario`, `rol`, `email`) VALUES
('11111111A', 'usuario', 'usuario', 'usuario', 'usuario', 1, 'usuario@usuario.es'),
('11111111B', 'zarco', 'zarco', 'zarco', 'zarco', 1, 'zarco@zarco.es'),
('11111112B', 'zarco1', 'zarco', 'zarco', 'zarco1', 1, 'zarco1@zarco.es'),
('11111113B', 'zarco2', 'zarco', 'zarco', 'zarco2', 1, 'zarco2@zarco.es'),
('11111114B', 'zarco4', 'zarco', 'zarco', 'zarco4', 1, 'zarco4@zarco.es'),
('11111115B', 'zarco5', 'zarco', 'zarco', 'zarco5', 1, 'zarco5@zarco.es'),
('22222222B', 'usuarioPrueba', 'usuarioPrueba', 'usuarioPrueba', 'usuarioPrueba', 1, 'usuario@usuario.com'),
('49129618H', 'usuario', 'usuario', 'usuario', 'usuarioooooooo', 1, 'usuarioooooooooooo@usuario.es'),
('49129628H', 'admin', 'admin', 'admin', 'admin', 0, 'usuario@usuario.us'),
('49129678H', 'usuario', 'usuario', 'usuario', 'usuariooooooooo', 1, 'usuariooooooooooooo@usuario.es');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario-lista`
--

CREATE TABLE `usuario-lista` (
  `usuarioNoPropietario` varchar(9) NOT NULL,
  `listaCompartida` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Volcado de datos para la tabla `usuario-lista`
--

INSERT INTO `usuario-lista` (`usuarioNoPropietario`, `listaCompartida`) VALUES
('11111111A', 7),
('11111111A', 8),
('11111111A', 9),
('11111111B', 2),
('11111112B', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `item`
--
ALTER TABLE `item`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lista` (`lista`);

--
-- Indices de la tabla `lista`
--
ALTER TABLE `lista`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD KEY `usuarioPropietario` (`usuarioPropietario`);

--
-- Indices de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `usuarioRecibe` (`usuarioRecibe`);

--
-- Indices de la tabla `notificacion-item`
--
ALTER TABLE `notificacion-item`
  ADD KEY `item` (`item`),
  ADD KEY `notificacion` (`notificacion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`dni`);

--
-- Indices de la tabla `usuario-lista`
--
ALTER TABLE `usuario-lista`
  ADD PRIMARY KEY (`usuarioNoPropietario`,`listaCompartida`),
  ADD KEY `lista` (`listaCompartida`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `item`
--
ALTER TABLE `item`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `lista`
--
ALTER TABLE `lista`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT de la tabla `notificacion`
--
ALTER TABLE `notificacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `item`
--
ALTER TABLE `item`
  ADD CONSTRAINT `item_ibfk_1` FOREIGN KEY (`lista`) REFERENCES `lista` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `lista`
--
ALTER TABLE `lista`
  ADD CONSTRAINT `lista_ibfk_1` FOREIGN KEY (`usuarioPropietario`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notificacion`
--
ALTER TABLE `notificacion`
  ADD CONSTRAINT `notificacion_ibfk_1` FOREIGN KEY (`usuarioRecibe`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE;

--
-- Filtros para la tabla `notificacion-item`
--
ALTER TABLE `notificacion-item`
  ADD CONSTRAINT `notificacion-item_ibfk_1` FOREIGN KEY (`item`) REFERENCES `item` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `notificacion-item_ibfk_2` FOREIGN KEY (`notificacion`) REFERENCES `notificacion` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `usuario-lista`
--
ALTER TABLE `usuario-lista`
  ADD CONSTRAINT `usuario-lista_ibfk_1` FOREIGN KEY (`listaCompartida`) REFERENCES `lista` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `usuario-lista_ibfk_2` FOREIGN KEY (`usuarioNoPropietario`) REFERENCES `usuario` (`dni`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
